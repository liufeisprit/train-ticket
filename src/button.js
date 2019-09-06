import React,{useMemo,useCallback} from 'react'
export default function FixButton(props){
    useMemo(()=>{
        console.log('fix btn')
    },[])
    return (
        <>
            {
                useMemo(()=>{console.log('btn render'); return <button>{props.text}</button>},[props.text])
            }
            {console.log('btn render')}
            <button>fix btn</button>
        </>
    )
}