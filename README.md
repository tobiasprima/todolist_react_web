# React TodoList Website

This project is hosted on https://tobiasprima.github.io/todolist_react_web/


Go Backend for this project is on https://github.com/tobiasprima/todolistapi

<img width="1436" alt="Screenshot 2024-03-22 at 12 52 37 AM" src="https://github.com/tobiasprima/todolist_react_web/assets/88434271/0fceb531-22ff-4ad7-b4a8-b17ab8c6d85e">



## Quick Start
1. Clone Frontend
```bash
git clone https://github.com/tobiasprima/todolist_react_web
```
2. Run on localhost
```bash
npm start
```
3. Open localhost:3000

## This Project uses Go Backend that is connected with MongoDB
To test this project without backend
1. Open src/app/api/apiSlice.js
2. Set baseQuery to an empty string
```bash
 baseQuery: fetchBaseQuery({ baseUrl: 'https://todolistapi-kcjj.onrender.com' }),
```
To 
```bash
 baseQuery: fetchBaseQuery({ baseUrl: '' }),
```
