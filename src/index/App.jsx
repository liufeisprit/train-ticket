import React from 'react'
import {connect} from 'react-redux'
import './App.css'
import Header from '../common/Header/Header.jsx'
import DepartDate from '../components/DepartDate/DepartDate.jsx'
import HighSpeed from '../components/HighSpeed/HighSpeed.jsx'
import Journey from '../components/Journey/Journey.jsx'
import Submit from '../components/Submit/Submit.jsx'
import {jsonp} from '../utils/jsonp'
function App(props) {
    jsonp({
        url: 'http://localhost:5000/api',
        params: {
          a: 1,
          b: 2
        },
        callbackName:'test'
      }).then(data => {
        // 拿到数据进行处理
        console.log(data); // 数据包
      })
    return (
        <>
           <Header/> 
           <Journey/>
           <DepartDate/>
           <HighSpeed/>
           <Submit/>
        </>
    )
}
export default connect(
    state=>state,
    dispatch=>{
        return {dispatch}
    }
)(App)