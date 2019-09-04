import React,{lazy,Suspense,useEffect} from 'react';
const App1=lazy(()=>import(/* webpackChunkName: "App" */ './App.1'))
class ErrorBoundary extends React.Component{
	state={
		hasError :false
	}
	static getDerivedStateFromError(error){
		console.log(error)
		return {hasError:true}
	}
	render(){
		if (this.state.hasError) {
			// Error path
			return (
			  <div>
				<h2>Something went wrong.</h2>
			  </div>
			);
		  }
		  // Normally, just render children
		  return this.props.children||'';
		
	}
}

function App(props) {
	return (
		<>
			
				<ErrorBoundary>
					<Suspense fallback={<div>Loading....</div>}>
							<App1/>
					</Suspense>
				</ErrorBoundary>
				
				
				
				
				
		</>
			
			
	)
}


export default App;
