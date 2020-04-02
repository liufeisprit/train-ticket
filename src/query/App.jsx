import {connect} from 'react-redux'
import './App.css'
function App(props) {
    
}
export default connect(
    state=>state,
    dispatch=>{
        return {dispatch}
    }
)(App)