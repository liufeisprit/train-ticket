import React,{useState,useEffect,useCallback,useRef,memo} from 'react';
import * as createAction from './action'
import './index.css'
// import combineReducers from './reducers'
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
const reducers={
    todos(state,action){
        const {type,payload}=action
        console.log(state,payload)
        switch (type){
            case 'set': return payload;
            case 'add': return [...state,payload];
            case 'remove':return state.filter(todo=>todo.id!==payload);
            case 'toggle':
                return state.map(todo=>
                    todo.id===payload?
                    {
                        ...todo,
                        complete:!todo.complete
                    }
                    :todo
                );
            
            default:return state
        }
    },
    incrementCount(state,action){
        const {type}=action
        switch(type){
            case 'set' :
            case 'add' :
                return state+1
            default:return state
        }
    }
}

// const reducer=combineReducers(reducers)
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
                    //有删除操作时候key如果为index会刷新多遍
                    <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}></TodoItem>
                ))
            }
        </ul>
    )
})
const LS_KEY='_$todo_'
function TodoList (){
    console.log('TodoList render')
    const [todos,setTodos]=useState([])
    const [incrementCount,setIncrementCount]=useState(0)
    
    function reducer(state,action){
        const {type,payload}=action
        const {todos,incrementCount}=state
        switch(type){
            case 'set':
                return {...state,todos:payload}
            case 'add':
                return {...state,todos:[...todos,payload]}
            case 'remove':
                return {...state,todos:todos.filter(todo=>todo.id!==payload)}
            case 'toggle':
                return {...state,todos:todos.map(todo=>
                        todo.id===payload?
                        {
                            ...todo,
                            complete:!todo.complete
                        }
                        :todo)
                    }
            default : return state
        }
    }

    const dispatch=useCallback((action)=>{
       const state={
           todos,
           incrementCount
       }
       const setters={
           todos:setTodos,
           incrementCount:setIncrementCount
       }
       console.log(state,'state')
       const newState=reducer(state,action)
       console.log(newState,'newState')
       for(let key in newState){
            setters[key](todo=>newState[key])
       }
    },[todos,incrementCount])
    // const dispatch=useCallback((action)=>{
    //     const {type,payload}=action
    //     switch(type){
    //         case 'set':
    //             setTodos(payload)
    //             break;
    //         case 'add':
    //             setTodos(todos=>[...todos,payload])
    //             break;
    //         case 'remove':
    //             setTodos(todos=>todos.filter(todo=>todo.id!==payload))
    //             break;
    //         case 'toggle':
    //             setTodos(todos=>todos.map(todo=>{
    //                     return todo.id===payload?
    //                     {
    //                         ...todo,
    //                         complete:!todo.complete
    //                     }
    //                     :todo
    //             }))
    //             break;
    //         default:
    //     }
    // },[])

    useEffect(()=>{
        const todos=JSON.parse(localStorage.getItem(LS_KEY))||[]
        dispatch({type:'set',payload:todos})
    },[])
    useEffect(()=>{
        localStorage.setItem(LS_KEY,JSON.stringify(todos))
    },[todos])
    
    // const reducer=function(state,action){
    //     const {type,payload}=action
    //     const {todos,incrementCount}=state
    //     switch (type){
    //         case 'set': return {...state,todos:payload,incrementCount:incrementCount+1};
    //         case 'add': return {
    //             ...state,
    //             todos:[...todos,payload],
    //             incrementCount:incrementCount+1
    //         };
    //         case 'remove':return{
    //             ...state,todos:todos.filter(todo=>todo.id!==payload)
    //         };
    //         case 'toggle':return{
    //             ...state,todos:todos.map(todo=>
    //                  todo.id===payload?
    //                 {
    //                     ...todo,
    //                     complete:!todo.complete
    //                 }
    //                 :todo
    //             )
    //         };
    //         default:return state
    //     }
        
    // }
    
    return (
        <div className='todo-list'>
            <Control 
                {...useCallback(bindActionCreateors({
                    addTodo:createAction.createAdd
                },dispatch),[dispatch])}
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