import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

//css
import 'bulma/css/bulma.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import 'bulma-divider/dist/css/bulma-divider.min.css'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
