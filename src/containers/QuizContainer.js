import React, { Component, PureComponent } from "react";
import Clock from "./Clock";
import "./QuizContainer.css";
import DefinitionsList from "../components/DefinitionsList"

class QuizContainer extends PureComponent {

    state = {
        definitions: [],
        hasStarted: false,
        quizCompleted: false,
        score: 0
    }

    componentDidMount() {
        fetch("http://localhost:3000/spells_by_letter")
        .then(resp => resp.json())
        .then(json => {
            this.setState({
                definitions: Object.values(json).flat()
            }, () => {
                console.log("State was updated", this.state)
            })
        })
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    handleClick = (e) => {
        if (e.target.innerText === "Start Quiz") {
            if (this.state.hasStarted === false) {
                this.setState({hasStarted: true, quizCompleted: false, score: 0})
                e.target.innerText = "Submit Quiz"
            } 
        } else if (e.target.innerText === "Submit Quiz") {
                this.handleQuizComplete(e)
        }
        // debugger
    }

    findDefinitionAnswerByID(id) {
        return this.state.definitions.find(def => def.id === parseInt(id))
    }

    handleQuizComplete(e) {
        const score = this.calculateScore()
        this.setState({score, quizCompleted: true, hasStarted: false})
        e.target.innerText = "Start Quiz"
    }

    calculateScore() {
        let score = 0
        const inputs = document.querySelectorAll(".definition input")
        for (let input of inputs) {
            const id = input.id.split("-")[1]
            const def = this.findDefinitionAnswerByID(id)
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

    formatDefinitionsList = () => {
        const definitions = this.shuffleArray(this.state.definitions).slice(0, 7)
        return definitions.map(def => {
            return {id: def.id, description: def.description}
        })
    }

    handleTimeOut = () => {
        this.setState({hasStarted: false})
        document.querySelector("#quiz-button").innerText = "Start Quiz"
    }

    render(){
        return(
            <div className="space-y-2">
                {this.state.hasStarted && <Clock handleTimeOut={this.handleTimeOut} hasStarted={this.state.hasStarted} />}
                {this.state.quizCompleted && <h3>Your score is: {this.state.score}</h3>}
                {this.state.hasStarted && <DefinitionsList definitions={this.formatDefinitionsList()} />}
                <button id="quiz-button" onClick={this.handleClick}>Start Quiz</button>
            </div>
        )
    }
}

export default QuizContainer;