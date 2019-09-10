import React,{createContext,useState,useContext,useEffect,useCallback,useRef} from 'react';
import FixButton from './button'
const BatteryContext=createContext()
const OnlineContext=createContext(false)

const Middle=(props)=>{
	return (
		<Leaf/>
	)
}
const Leaf=()=>{
	const battery=useContext(BatteryContext)
	const online=useContext(OnlineContext)
	
	
	return (
		// <BatteryContext.Consumer>
			
				// {
				// 	battery=>(
					// <OnlineContext.Consumer>
						<h1>battery:{battery},online: {String(online)}</h1>
					// </OnlineContext.Consumer>
				// 	)
				
				// }
			
		// </BatteryContext.Consumer>
	)
}

function useSize(){
    const [size,setSize]=useState({width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight})
    const _onResize=()=>{
        setSize(
            {
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
        )
    }
    useEffect(()=>{
        window.addEventListener('resize',_onResize,false)
        return ()=>window.removeEventListener('resize',_onResize,false)
    },[])
    return size
}
function App(props) {
	const [battery,setBattery]=useState(60)
	const [isOnline,setIsOnline]=useState(false)
    const btnRef=useRef()
    const size=useSize()
	const [count,setCount]=useState(()=>{
		console.log('init')
		return 0
	})
	const [obj,setObj]=useState({a:1})
	const obj2={}
	console.log(12313)
	useEffect(() => {
		console.log('effect')	
		console.log(props.a)
	},[props.a])
	
	const _handleClick=useCallback(
		()=>{
			// setObj({a:1})
			console.log(count)
			console.log(btnRef)
			console.log('click')
		},[count]
	);
	var it=useRef()
	var countRef=useRef()
	useEffect(() => {
		// it.current=setInterval(()=>{
			
		// 	setCount(count=>{
		// 		countRef.current=count+1
		// 		return count+1
		// 	})
		// },1000)
		
	}, []);
	useEffect(()=>{
		if(count>=10){
			console.log(countRef.current,count)
			clearInterval(it.current)
		}
	},[count])
	return (
		<>
			<button onClick={()=>{setBattery(battery+1);}}>充电</button>
			<button onClick={()=>setIsOnline(!isOnline)}>切换状态</button>
			<button onClick={()=>setCount(count+1)}>count++</button>
            <div>width:{size.width},height:{size.height}</div>
			<FixButton text={count} onClick={_handleClick} />
			<BatteryContext.Provider value={battery}>
				<OnlineContext.Provider value={isOnline}>
					<Middle/>
				</OnlineContext.Provider>
			</BatteryContext.Provider>
		</>
	);
}

class App2 extends React.Component{
    state={
        count:0,
        size:{width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight}
    }
    _changeClick=()=>{
        console.log(this)
        this.setState({
            count:this.state.count+1
        })
    }
    _onResize=()=>{
        this.setState({
            size:{
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
            
        })
    }
    componentDidMount(){
        window.addEventListener('resize',this._onResize,false)
	}
	
    render(){
        return (
            <div>
                <button onClick={()=>this._changeClick()}>改变count</button>
                <div>{this.state.size.width}x{this.state.size.height}</div>
                <div>count : {this.state.count}</div>
            </div>
        )
    }
}
export default App;
