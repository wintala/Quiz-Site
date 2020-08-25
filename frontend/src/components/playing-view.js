import React, {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { useRouteMatch, Link } from "react-router-dom"
import gameService from "../services/game"
import {setGame} from "../reducers/game"


const PlayingView = () => {
	const [playing, setPlaying] = useState(false)
	const [gameEnded, setGameEnded] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(-1)
	const [currentText, setCurrentText] = useState(null)
	const [shuffeledQuestions, setShuffeledQuestions] = useState([])
	const [showFollow, setShowFollow] = useState(false)
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
			}
			setShuffeledQuestions(toBeShuffeled)
		})
}, [match.params.id, dispatch]);


	const handleNext = () => {
		if (gameEnded) {
			setCurrentIndex(-1)
			setCurrentText("Play Again?")
			setShowFollow(false)
			setGameEnded(false)
			return null
		}

		const placePlayer = (question) => {
			let modifiedQuestion = question
			let copyPlayers = [...players]

			while (modifiedQuestion.includes("##")) {
				if (copyPlayers.length === 0) {
					window.alert("Your game don't have enough players for this question, some player spots were not populated")
					break;
				} else {
					const placedPersonIndex = Math.floor(Math.random()*copyPlayers.length)
					modifiedQuestion = modifiedQuestion.replace("##", copyPlayers[placedPersonIndex])
					copyPlayers.splice(placedPersonIndex, 1);
				}
			}
			return modifiedQuestion
		}

		if (currentIndex === shuffeledQuestions.length - 1 && !showFollow) {
			setGameEnded(true)
		} else if (showFollow) {
			setCurrentText(placePlayer(shuffeledQuestions[currentIndex].followUpQuestion))
			setShowFollow(false)
		} else {
			setCurrentText(placePlayer(shuffeledQuestions[currentIndex + 1].question))
			shuffeledQuestions[currentIndex + 1].followUpQuestion !== "" ? setShowFollow(true) : void(0)
			setCurrentIndex(currentIndex + 1)
		}
 	}

 const playerAddForm = () => {
	const handleAdd = (e) => {
		e.preventDefault()
		const newPlayer = e.target.player.value
		if (newPlayer) {
			setPlayers(players.concat(newPlayer))
		}
		e.target.player.value = ""
	}

	 return(
		<div>
			<table>
				<tbody>
					{players.map(p => 
					<tr key={p}>
						<td>
							{p}
						</td>
						<td>
							<img 
							onClick={() => setPlayers(players.filter(x => x !== p))}
							src={require("../x-but.png")} 
							width="20" 
							height="20" 
							alt="delete"></img>
						</td>
					</tr>)}
				</tbody>
			</table>
			<form onSubmit={handleAdd}>
				<h3>Add Players</h3>
				<div>
					<input
					placeholder="name"
						name="player"
					/>
				</div>
				<button id="player-add-button">Add</button>
			</form>
		</div>
	 )
 }

 const randomColor = () => {
	 const colors = ["rgb(243, 115, 76)", "rgb(88, 116, 189)", "rgb(214, 177, 43)", "rgb(78, 192, 159)"]
	 return colors[Math.floor(Math.random() * colors.length)]
	}

 const randomColorStyle = {color: randomColor()}
 const randomBackGroundStyle = {backgroundColor: randomColor()}


	return(
		game ? 
			playing ?
				<div id="helper">
			  	<div id="playing-view">
						<div id="question-text" style={randomColorStyle}>
							{!gameEnded ? currentText : "Game ended."}
						</div>
						<button style={randomBackGroundStyle} onClick={handleNext}>{currentIndex === -1 ? "Start" : "Next"}</button>
					</div>
				</div>:
				<div id="game-init-page">
					<h1>{game.name}</h1>
					<button id="info-button">
						<Link to={`/games/${game.id}`}>Info</Link>
					</button>
					<button id="start-button" disabled={players.length < 2} onClick={() => setPlaying(true)}>
						Start
					</button>
					 {players.length < 2 ? <div> Min two players needed to start</div> : null}
					{playerAddForm()}
				</div> :
			null
	)
}

export default PlayingView