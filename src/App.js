import React,{createContext,useState} from 'react';
const BatteryContext=createContext()
const OnlineContext=createContext(false)

const Middle=(props)=>{
	return (
		<Leaf/>
	)
}
const Leaf=()=>{
	return (
		<BatteryContext.Consumer>
			
				{
					battery=>(
					<OnlineContext.Consumer>
						{online=><h1>battery:{battery},online: {String(online)}</h1>}
					</OnlineContext.Consumer>
					)
				
				}
			
		</BatteryContext.Consumer>
	)
}
function App() {
	const [battery,setBattery]=useState(60)
	const [isOnline,setIsOnline]=useState(false)

	return (
		<>
			<button onClick={()=>setBattery(battery+1)}>充电</button>
			<button onClick={()=>setIsOnline(!isOnline)}>切换状态</button>

			<BatteryContext.Provider value={battery}>
				<OnlineContext.Provider value={isOnline}>
					<Middle/>
				</OnlineContext.Provider>
			</BatteryContext.Provider>
		</>
	);
}

export default App;
