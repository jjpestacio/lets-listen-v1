import React from 'react'
import { render } from 'react-dom'
import { browserHistory, IndexRoute, Route, Router } from 'react-router'
import { Provider } from 'react-redux'

import configureStore from './store'

import App from './components'
import Home from './components/Pages/Home'
import JoinRoom from './components/Pages/JoinRoom'
import Login from './components/Pages/Login'

const store = configureStore;

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route name='app' path='/' component={App}>
				<IndexRoute component={JoinRoom} />
				<Route path=':roomId/login' component={Login} />
				<Route path=':roomId/home' component={Home} />
			</Route>	
		</Router>
	</Provider>

, document.getElementById('app'))