import React,{useState,useEffect,useCallback,useRef,memo} from 'react';
import * as createAction from './action'
import './index.css'

function bindActionCreateors(actionCreateors,dispatch){
    let ret={}
    //循环绑定函数时候要用到let或者闭包 不然最后key为最后的值
    for(let key in actionCreateors){
        ret[key]=function(...args){
            
            const actionCreateor=actionCreateors[key]
            const action=actionCreateor(...args)
            dispatch(action)
        }
    }
    return ret
}
const Control=memo(function Control(props){
    console.log('control render')
    const {addTodo}=props
    var inputRef=useRef()
    const onSubmit=(e)=>{
        e.preventDefault()
        const newText=inputRef.current.value.trim()
        if(newText.length===0){return}
        addTodo({
            id:Date.now(),
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
})

const TodoItem=memo(function TodoItem(props){
    console.log('TodoItem render')
    console.log(props.removeTodo.toString())
    const {
        todo:{
            id,
            text,
            complete
        },
    }=props
    return (
        <li className='todo-item'>
            <input type="checkbox" onChange={()=>props.toggleTodo(id)} checked={complete}/>
            <label className={complete?'complete':''}>{text}</label>
            <button onClick={()=>props.removeTodo(id)}>&#xd7;</button>
        </li>
    )
})

const Todos=memo(function Todos(props){
    console.log('Todos render')
    const {todos,removeTodo,toggleTodo}=props;

    return (
        <ul>
            {
                todos.map((todo,index)=>(
                    <TodoItem key={index} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}></TodoItem>
                ))
            }
        </ul>
    )
})
const LS_KEY='_$todo_'
function TodoList (){
    console.log('TodoList render')
    const [todos,setTodos]=useState([])
    
    const dispatch=useCallback((action)=>{
        const {type,payload}=action
        switch(type){
            case 'set':
                setTodos(payload)
                break;
            case 'add':
                setTodos(todos=>[...todos,payload])
                break;
            case 'remove':
                setTodos(todos=>todos.filter(todo=>todo.id!==payload))
                break;
            case 'toggle':
                setTodos(todos=>todos.map(todo=>{
                        return todo.id===payload?
                        {
                            ...todo,
                            complete:!todo.complete
                        }
                        :todo
                }))
                break;
            default:
        }
    },[])
    useEffect(()=>{
        const todos=JSON.parse(localStorage.getItem(LS_KEY))||[]
        dispatch({type:'set',payload:todos})
    },[])
    useEffect(()=>{
        localStorage.setItem(LS_KEY,JSON.stringify(todos))
    },[todos])
    return (
        <div className='todo-list'>
            <Control 
                {...useCallback(bindActionCreateors({
                    addTodo:createAction.createAdd
                },dispatch),[])}
            />
            <Todos 
                {...useCallback(bindActionCreateors({
                    toggleTodo:createAction.createToggle,
                    removeTodo:createAction.createRemove,
                },dispatch),[])}
            todos={todos}/>
        </div>
    )
}


export default TodoList