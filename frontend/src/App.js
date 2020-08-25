import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import React, { useEffect} from "react"
import { useDispatch} from "react-redux"


// componenets
import NavBar from "./components/nav-bar"
import SignUpForm from "./components/signup-form"
import LoginForm from "./components/login-form"
import  GamePage  from "./components/games-page";
import  Game  from "./components/game";
import Home from "./components/home"
import PlayingView from "./components/playing-view"
import Notification from "./components/notification"

//services 
import userService from "./services/user"


//action creators
import { setUser } from "./reducers/user"

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const token = JSON.parse(loggedUserJSON)
			userService.getUserData(token).then(u => dispatch(setUser({...u, token})))
		}
	}, [dispatch])


	return (
		<>
			<NavBar />
			<Notification />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/games">
          <GamePage />
        </Route>
				<Route path="/games/:id">
					<Game />
				</Route>
				<Route path="/playing/:id">
					<PlayingView />
				</Route>
				<Route exact path="/login">
					<LoginForm />
				</Route>
				<Route exact path="/signup">
					<SignUpForm />
				</Route>
			</Switch>
		</>
	)
}

const RoutedApp = () => (
	<Router>
		<App/>
	</Router>
)

export default RoutedApp
