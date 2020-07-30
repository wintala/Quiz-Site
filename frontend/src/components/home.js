import React, {useState} from "react"
import gameService from "../services/game"
import { Redirect } from "react-router-dom"
import {useDispatch} from "react-redux"
import {setGame} from "../reducers/game"

const  Home = () => {
	const [redirect, setRedirect] = useState(null)
	const dispatch = useDispatch()

	if (redirect) {
		return <Redirect to={redirect} />
	}

	const handleSearch = (e) => {
		e.preventDefault()
		const search = e.target.search.value
		gameService.findGame(search).then(g => {
			dispatch(setGame(g))
			setRedirect(`/playing/${g.id}`)
			
		})
	}


	return(
		<div className="home-view">
			<div className="banner">
				<h1>CUSTOM QUIZ</h1>
			</div>
			<form onSubmit={handleSearch} className="form">
				<h2>Search game</h2>
				<div>
					<input
						placeholder="Game name"
						name="search"
					/>
				</div>
				<button id="search-button">Search</button>
			</form>
		</div>
	)
}

export default Home