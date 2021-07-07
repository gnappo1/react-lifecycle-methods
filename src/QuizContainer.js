import React, { Component } from "react";
import Clock from "./Clock";
import DefinitionsList from "./DefinitionsList"

class QuizContainer extends Component {

    state = {
        definitions: [],
        hasStarted: false
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
            this.setState({hasStarted: true})
            e.target.innerText = "Submit Quiz"
        } else if (e.target.innerText === "Submit Quiz") {
            this.handleQuizComplete()
        }
    }

    handleQuizComplete() {

    }

    formatDefinitionsList = () => {
        const definitions = this.shuffleArray(this.state.definitions).slice(0, 7)
        return definitions.map(def => {
            return {id: def.id, description: def.description}
        })
    }

    render(){
        return(
            <div>
                <Clock hasStarted={this.state.hasStarted} />
                {this.state.hasStarted && <DefinitionsList definitions={this.formatDefinitionsList()} />}
                <button onClick={this.handleClick}>Start Quiz</button>
            </div>
        )
    }
}

export default QuizContainer;