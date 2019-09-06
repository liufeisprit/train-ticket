import React,{createContext,useState,useContext,useEffect} from 'react';
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
function App() {
	const [battery,setBattery]=useState(60)
	const [isOnline,setIsOnline]=useState(false)
	const [count,setCount]=useState(()=>{
		console.log('init')
		return 0
	})
	console.log(12313)
	return (
		<>
			<button onClick={()=>setBattery(battery+1)}>充电</button>
			<button onClick={()=>setIsOnline(!isOnline)}>切换状态</button>
			<button onClick={()=>setCount(count+1)}>count++</button>
			<FixButton text={count}/>
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
export default App2;
