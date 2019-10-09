import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import resized from './utils/resized'

import App from './App'
import { unregister } from './serviceWorker'

// import api from './testdb'

// const origin = window.location.origin
//
// window.fetch(`${origin}/admin/api`)
//   .then((response) => {
//     if (response.status >= 400) {
//       throw new Error("Bad response from server")
//     }
//     return response.json()
//   })
//   .then((data) => {
//     ReactDOM.render(<App data={data} />, document.getElementById('root'))
//     unregister()
//     resized()
//   })

ReactDOM.render(<App />, document.getElementById('root'))
unregister()
resized()
