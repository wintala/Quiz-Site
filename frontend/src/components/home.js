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
		<>
			<h1>Custom Quiz</h1>
			<form onSubmit={handleSearch}>
				<h2>Search game</h2>
				<div>
					<input
						name="search"
					/>
				</div>
				<button>Search</button>
			</form>
		</>
	)
}

export default Home