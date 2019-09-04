import React,{createContext,useState,useContext,useEffect} from 'react';
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
			<button onClick={()=>setCount(0)}>count++</button>
			<BatteryContext.Provider value={battery}>
				<OnlineContext.Provider value={isOnline}>
					<Middle/>
				</OnlineContext.Provider>
			</BatteryContext.Provider>
		</>
	);
}

export default App;
