import React, {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { useRouteMatch, Link } from "react-router-dom"
import gameService from "../services/game"
import {setGame} from "../reducers/game"


const PlayingView = () => {
	const [playing, setPlaying] = useState(false)
	const [gameEnded, setGameEnded] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(-1)
	const [currentText, setCurrentText] = useState("Click start to start (obviosly)")
	const [shuffeledQuestions, setShuffeledQuestions] = useState([])
	const [followShowed, setfollowShowed] = useState(true)
	const [players, setPlayers] = useState([])
	const game = useSelector(state => state.game)
	const dispatch = useDispatch()

	const match = useRouteMatch('/playing/:id')

	useEffect(() => {
		gameService.oneGame(match.params.id).then(g => {
			dispatch(setGame(g))
			const toBeShuffeled = [...g.questions]
			for(let i = toBeShuffeled.length - 1; i > 0; i--){
				const j = Math.floor(Math.random() * i)
				const temp = toBeShuffeled[i]
				toBeShuffeled[i] = toBeShuffeled[j]
				toBeShuffeled[j] = temp
				setShuffeledQuestions(toBeShuffeled)
			}
		})
}, [match.params.id, dispatch]);

 const handleNext = () => {
	 if (gameEnded) {
		setCurrentIndex(-1)
		setCurrentText("Play Again?")
		setfollowShowed(true)
		setGameEnded(false)
		return null
	 }

	const placePlayer = (question) => {
		return question.replace("##", players[Math.floor(Math.random()*players.length)])
	}

	 if (followShowed) {
		setCurrentIndex(currentIndex + 1)
		setCurrentText(placePlayer(shuffeledQuestions[currentIndex + 1].question))
		shuffeledQuestions[currentIndex + 1].followUpQuestion ? setfollowShowed(false) : void(0)
	 } else {
		setCurrentText(placePlayer(shuffeledQuestions[currentIndex].followUpQuestion))
		setfollowShowed(true)
		if (currentIndex === shuffeledQuestions.length - 1) {
			setGameEnded(true)
		}
	 }
 }

 const playerAddForm = () => {
	const handleAdd = (e) => {
		e.preventDefault()
		const newPlayer = e.target.player.value
		setPlayers(players.concat(newPlayer))
		e.target.player.value = ""
	}

	 return(
		<div>
			<ul>
				{players.map(p => <li key={p}>{p}</li>)}
			</ul>
			<form onSubmit={handleAdd}>
				<h2>Add Players</h2>
				<div>
					name
					<input
						name="player"
					/>
				</div>
				<button id="login-button">Add</button>
			</form>
		</div>
	 )
 }


	return(
		game ? 
			playing ?
			  <div>
					<div>
						{!gameEnded ? currentText : "Game ended."}
					</div>
					<button onClick={handleNext}>{currentIndex === -1 ? "Start" : "Next"}</button>
				</div>:
				<div>
					<h2>{game.name}</h2>
					<Link to={`/games/${game.id}`}>Info</Link>
					<button disabled={players.length < 2} onClick={() => setPlaying(true)}>Play</button>
					 {players.length < 2 ? <span> Min two players needed to start</span> : null}
					{playerAddForm()}
				</div> :
			null
	)
}

export default PlayingView