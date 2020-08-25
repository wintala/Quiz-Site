import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import gameReducer from "./reducers/game"

import App from './App'
import userReducer from './reducers/user'
import notiReducer from './reducers/notification'

const reducer = combineReducers({
  user: userReducer,
  game: gameReducer,
  notification: notiReducer
})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)