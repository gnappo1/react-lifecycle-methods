// import React, { Component, PureComponent } from "react";
import {useState, useEffect} from 'react'
import Clock from "./Clock";
import "./QuizContainer.css";
import DefinitionsList from "./DefinitionsList"


const QuizContainer = (props)=> {
    const [definitions, setDefinitions] = useState([])
    const [hasStarted, setHasStarted] = useState(false)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [score, setScore] = useState(0)
    
    const formatDefinitionsList = (array) => {
        const definitions = shuffleArray(array).slice(0, 7)
        return definitions.map(def => {
            return {id: def.id, description: def.description}
        })
    }

    useEffect(
        () => {
            const fetchSpells = () => {
                fetch("http://localhost:3000/spells_by_letter")
                .then(resp => resp.json())
                .then(json => setDefinitions(Object.values(json).flat()))
            }
            fetchSpells()
        }, []
    )

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    const handleClick = (e) => {
        if (!hasStarted) {
            setHasStarted(true) 
            setQuizCompleted(false) 
            setScore(0)
        } else {
            handleQuizComplete(e)
        }
    }

    const findDefinitionAnswerByID = (id) => {
        return definitions.find(def => def.id === parseInt(id))
    }

    const handleQuizComplete = (e) => {
        const score = calculateScore()
        setScore(score)
        setQuizCompleted(true)
        setHasStarted(false)
    }

    const calculateScore = () => {
        let score = 0
        const inputs = document.querySelectorAll(".definition input")
        for (let input of inputs) {
            const id = input.id.split("-")[1]
            const def = findDefinitionAnswerByID(id)
            if (input.value.toLowerCase() === def.spell_name.toLowerCase()) {
                score += 10
            } else if (input.value === "") {
                score += 0
            } else {
                score -= 5
            }
        }
        return score;
    }

    const handleTimeOut = () => {
        setHasStarted(false)
    }

    const formatButtonTitle = () => {
        return !!hasStarted ? "Submit Quiz" : "Start Quiz"
    }

    return(
        <div className="space-y-2">
            {hasStarted && <Clock handleTimeOut={handleTimeOut} hasStarted={hasStarted} />}
            {quizCompleted && <h3>Your score is: {score}</h3>}
            {hasStarted && <DefinitionsList definitions={formatDefinitionsList(definitions)} />}
            <button id="quiz-button" onClick={handleClick}>{formatButtonTitle()}</button>
        </div>
    )
}

export default QuizContainer;