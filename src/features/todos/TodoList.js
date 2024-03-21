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
    const [ isResetDone, setisResetDone ] = useState(false)
    const [ todoWithoutDB, setTodoWithoutDB ] = useState([])
    const [ newTodo, setNewTodo ] = useState('')
    const [ moveDoneToEnd, setMoveDoneToEnd ] = useState(false)
    const [ newTodoId, setNewTodoId ] = useState(null)
    const scrollToRef = useRef(null)

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        refetch: refetchTodos
    } = useGetTodosQuery()
    const [ addTodo, { isLoading: addTodoLoading } ] = useAddTodoMutation()
    const [ doneTodo, { isLoading: doneTodoLoading } ] = useDoneTodoMutation()
    const [ deleteTodo, { isLoading: deleteTodoLoading } ] = useDeleteTodoMutation()
    const [ reorderTodo, { isLoading: reorderTodoLoading } ] = useReorderTodoMutation()
    const [ resetTodo, { isLoading: resetTodoLoading } ] = useResetTodoMutation()


    // Effect to load todos from local storage if there is cache
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (!todos && storedTodos) {
            // Set todos to local storage's todos
            setTodoWithoutDB(storedTodos)
        } else if (!todos){
            // If there is no DB and nothing on cache, set the todos to empty array
            setTodoWithoutDB([])
        }
    }, [todos])

    // Reset Todos' Order to 0 when page first mounted
    useEffect(()=> {
        if (todos && !isResetDone){
            resetTodo(todos)
            setisResetDone(true)
        }
    }, [todos, isResetDone, resetTodo])

    // Effect to save todos to local storage when todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todoWithoutDB))
    }, [todoWithoutDB])

    // Effect to update local state when there is DB and todos are fetched
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

    // Handle New Todo
    const handleSubmit = (e)=> {
        e.preventDefault()
        if (newTodo.trim() === '') return // Prevent adding empty todos
        if (!isError){
            addTodo({title: newTodo}).then((response) => {
                // Scroll to newly created todo
                setNewTodoId(response.data._id)
            })
        } else {
            // Handle submit without database
            const newTodoWithoutDB = {_id: Date.now(), title: newTodo, status: false}
            if (moveDoneToEnd) {
                setTodoWithoutDB((prevTodos) => [newTodoWithoutDB, ...prevTodos]);
            } else {
                setTodoWithoutDB((prevTodos) => [...prevTodos, newTodoWithoutDB]);
            }
            setNewTodoId(newTodoWithoutDB._id) // Scroll to newly created todo
        }
        
        setNewTodo('')
    }

    // Handle Todos' complete checkbox without database
    const handleToggleStatus = (id) => {
        setTodoWithoutDB(prevTodos => 
            prevTodos.map(todo => todo._id === id ? {...todo, status: !todo.status} : todo
                )
            )
    }

    // Handle delete without database
    const handleDeleteTodo = (id) => {
        setTodoWithoutDB(prevTodos => prevTodos.filter(todo => todo._id !== id))
    }

    // Handle Moving Done Todos to Bottom of the list
    const handleMoveDoneToEnd = async () => {
        if(todos){
            await reorderTodo(todos);
            await refetchTodos();
        } else {
            setMoveDoneToEnd((prevMoveDoneToEnd) => !prevMoveDoneToEnd)
            setTodoWithoutDB((prevTodos) => {
                // Handle moving done todos without db
                const doneTodos = prevTodos.filter((todo)=> todo.status)
                const undoneTodos = prevTodos.filter((todo)=> !todo.status)
                return moveDoneToEnd ? [...doneTodos, ...undoneTodos] :
                [...undoneTodos, ...doneTodos]
                
            })
        }
    }

    let content;
    if (isLoading || addTodoLoading || doneTodoLoading || deleteTodoLoading || reorderTodoLoading || resetTodoLoading) {
        content = <Loader />
    } else if (isSuccess){
        let sortedTodos = todos;
        if (todos.length> 1){
            sortedTodos = todos.slice().sort((a, b) => {
                if (a.order !== 0 && b.order !==0){
                    return b.order - a.order
                }
                return a.order - b.order
            })
        }
        content = sortedTodos.map(todo => {
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
    </main>
  )
}

export default TodoList