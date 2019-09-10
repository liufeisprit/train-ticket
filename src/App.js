import React,{useState,useEffect,useCallback,useRef} from 'react';
import './index.css'
var idSeq=0
function Control(props){
    const {addTodo}=props
    var inputRef=useRef()
    const onSubmit=(e)=>{
        e.preventDefault()
        const newText=inputRef.current.value.trim()
        if(newText.length===0){return}
        addTodo({
            id:idSeq++,
            text:newText,
            complete:false
        })
        inputRef.current.value=''
    }
    return <div className='control'>
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
            <input 
                type="text"
                ref={inputRef}
                className='new-todo'
                placeholder='what need to be done'
                />
        </form>
    </div>
}

function TodoItem(props){
    
}
function Todos(props){
    const {todos,romoveTodo,toggleTodo}=props;

    return (
        <ul>
            {
                todos.map(todo=>(
                    <li key={todo.id}></li>
                ))
            }
        </ul>
    )
}
function TodoList (){
    const [todos,setTodos]=useState([])
    const addTodo=useCallback((todo)=>{
        setTodos(todos=>[...todos,todo])
    },[])
    const romoveTodo=useCallback((id)=>{
        setTodos(todos=>todos.filter(todo=>todo.id!==id))
    },[])
    const toggleTodo=useCallback((id)=>{
        setTodos(todos=>todos.map(todo=>{
            return todo.id===id?
            {
                ...todo,
                complete:!todo.complete
            }
            :todo
        }))
    },[])
    return (
        <div className='todo-list'>
            <Control addTodo={addTodo}/>
            <Todos toggleTodo={toggleTodo} romoveTodo={romoveTodo} todos={todos}/>
        </div>
    )
}
export default TodoList