import React from 'react'
import Loader from '../loader/Loader'
import Header from '../header/Header'
import ProgressBar from '../progressbar/ProgressBar'
import TodoItem from './TodoItem'
import ToggleSwitch from '../toggle/ToggleSwitch'
import TodoForm from './TodoForm'
import { useState, useEffect, useRef } from 'react'
import { 
    useGetTodosQuery,
    useAddTodoMutation,
    useDoneTodoMutation,
    useDeleteTodoMutation,
    useReorderTodoMutation,
    useResetTodoMutation,
} from '../../app/api/apiSlice'

const TodoList = () => {
    // State variables initialization

    // When there is connection to Database we need to reset order value to 0
    const [ isResetDone, setisResetDone ] = useState(false) // Indicates if todos reset is done
    const [ todoWithoutDB, setTodoWithoutDB ] = useState([]) // Stores todos without database interaction
    const [ newTodo, setNewTodo ] = useState('') // Stores new todo input
    const [ moveDoneToEnd, setMoveDoneToEnd ] = useState(false) // Indicates if done todos should move to the end
    const [ newTodoId, setNewTodoId ] = useState(null) // Stores id of newly added todo
    const scrollToRef = useRef(null) // Reference for scrolling to new todo


    // Custom hooks for fetching todos and database mutation
    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        refetch: refetchTodos
    } = useGetTodosQuery()
    const [ addTodo ] = useAddTodoMutation()
    const [ doneTodo ] = useDoneTodoMutation()
    const [ deleteTodo ] = useDeleteTodoMutation()
    const [ reorderTodo, { isLoading: reorderTodoLoading } ] = useReorderTodoMutation()
    const [ resetTodo, { isLoading: resetTodoLoading } ] = useResetTodoMutation()


    // Effect to load todos from local storage if there is cache
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (!todos && storedTodos) {
            // If there are cached todos, set them
            setTodoWithoutDB(storedTodos)
        } else if (!todos){
            // If no cached todos and no database todos, initialize as empty array
            setTodoWithoutDB([])
        }
    }, [todos])

    // Effect to reset todos' order when todos are fetched for the first time (When there is database connection)
    useEffect(()=> {
        if (todos && !isResetDone){
            resetTodo(todos)
            setisResetDone(true)
        }
    }, [todos, isResetDone, resetTodo])

    // Effect to save todos to local storage when todos change
    useEffect(() => {
        if (!todos){
            localStorage.setItem('todos', JSON.stringify(todoWithoutDB))
        }
    }, [todos, todoWithoutDB])

    // Effect to update local state when todos are fetched from the database
    useEffect(()=> {
        if (todos && !isError) {
            setTodoWithoutDB(todos)
        }
    }, [todos, isError])

    // Effect to scroll to the newly created todo
    useEffect(()=> {
        if(!moveDoneToEnd){
            if (scrollToRef.current) {
                scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest'})
            }
        }
    })

    // Handle submission of new todo
    const handleSubmit = (e)=> {
        e.preventDefault()
        if (newTodo.trim() === '') return // Prevent adding empty todos
        if (!isError){
            // If there is no error, add todo using database mutation
            addTodo({title: newTodo}).then((response) => {
                // Scroll to newly created todo
                setNewTodoId(response.data._id)
            })
        } else {
            // Handle adding todo without database interaction
            const newTodoWithoutDB = {_id: Date.now(), title: newTodo, status: false}
            if (moveDoneToEnd) {
                // If moving done todos to the end, insert new todo at the beginnign of the list
                setTodoWithoutDB((prevTodos) => [newTodoWithoutDB, ...prevTodos]);
            } else {
                // Otherwise, add new todo to the end
                setTodoWithoutDB((prevTodos) => [...prevTodos, newTodoWithoutDB]);
            }
            setNewTodoId(newTodoWithoutDB._id) // Scroll to newly created todo
        }
        
        setNewTodo('') // Clear input field after submission
    }

    // Handle toggling status of todo without database interaction
    const handleToggleStatus = (id) => {
        setTodoWithoutDB(prevTodos => 
            prevTodos.map(todo => todo._id === id ? {...todo, status: !todo.status} : todo
                )
            )
    }

    // Handle deletion of todo without database interaction
    const handleDeleteTodo = (id) => {
        setTodoWithoutDB(prevTodos => prevTodos.filter(todo => todo._id !== id))
    }

    // Handle moving done todos to the end of the list
    const handleMoveDoneToEnd = async () => {
        if(todos){
            await reorderTodo(todos);
            await refetchTodos();
        } else {
            // Toggle moveDoneToEnd state and reorder todos without database interaction
            setMoveDoneToEnd((prevMoveDoneToEnd) => !prevMoveDoneToEnd)
            setTodoWithoutDB((prevTodos) => {
                // Handle moving done todos without without database interaction
                const doneTodos = prevTodos.filter((todo)=> todo.status)
                const undoneTodos = prevTodos.filter((todo)=> !todo.status)
                return moveDoneToEnd ? [...doneTodos, ...undoneTodos] :
                [...undoneTodos, ...doneTodos]  
            })
        }
    }

    let content; // Define content based on loading state and success/error status
    if (isLoading || reorderTodoLoading || resetTodoLoading) {
        // Display loader if data is loading or mutations are in progress
        content = <Loader />
    } else if (isSuccess){
        // If todos are successfully fetched, display them
        let sortedTodos = todos;
        if (todos.length> 1){
            // Sort todos baded on order if there are multiple todos
            sortedTodos = todos.slice().sort((a, b) => {
                if (a.order !== 0 && b.order !==0){
                    return b.order - a.order
                }
                return a.order - b.order
            })
        }
        content = sortedTodos.map(todo => {
            // Map todos to TodoItem components
            return (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    newTodoId={newTodoId}
                    scrollToRef={scrollToRef}
                    doneTodo={doneTodo}
                    deleteTodo={deleteTodo}
                />
            )
        })  
    } else if (isError) {
        // If there's error(No database connection), display todos without database interaction
        content = (
            todoWithoutDB.map(todo => (
                <TodoItem
                key={todo._id}
                todo={todo}
                newTodoId={newTodoId}
                scrollToRef={scrollToRef}
                handleToggleStatus={handleToggleStatus}
                handleDeleteTodo={handleDeleteTodo}
            />
            ))
        )
    }

  return (
    <main>
        <Header />
        <hr />
        <ProgressBar todos={todoWithoutDB} />
        <div className="content">
            {content}
        </div>
        <hr />
        <ToggleSwitch handleMoveDoneToEnd={handleMoveDoneToEnd} />
        <div className="bottom-section">
            <p>Add to list</p>
            <TodoForm
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                handleSubmit={handleSubmit}
            />
        </div>
        <div className="infos">
            <span className="ps">Because the backend is hosted on a free cloud provider, the request may take a while.</span>
        </div>
    </main>
  )
}

export default TodoList