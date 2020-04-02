import React,{useMemo,useCallback,memo} from 'react'
export default memo(function FixButton(props){
    useMemo(()=>{
        console.log('fix btn')
    },[])
    const count=useMemo(() => {
        return props.text*2
    }, [props.text==3])
    // const Counter=memo(function Counter(props){
    //     console.log('counter render')
    //     return (<button>{props.count}</button>)
    // })
    {console.log('btn function')}
    return (
        <>
            {
                useMemo(()=>{console.log('btn useMemo render'); return <button>{props.text}</button>},[props.text])
            }
            {console.log('btn render')}
            <button onClick={()=>props.onClick()}>{count}</button>

            
        </>
    )
})