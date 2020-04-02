import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import './index.css'
import App from './App.jsx'
import 'normalize.css/normalize.css'
ReactDom.render(
    <Provider store={store}><App/></Provider>
    ,document.getElementById('root')
)