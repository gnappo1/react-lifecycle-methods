import React, {Component} from 'react'
class Clock extends Component {
    state = {
        timeLeft: 10
    }

    componentDidUpdate() {
        if (!!this.props.hasStarted && this.state.timeLeft === 10) {

            this.timerId = setInterval(() => {
                this.setState(prevState => {
                    return {timeLeft: --prevState.timeLeft }
                })
            }, 1000)
        } else if (this.state.timeLeft === 0) {
            clearInterval(this.timerId)
            this.setState({timeLeft: 10})
            this.props.handleTimeOut()
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    handleFormatTime() {
        return this.state.timeLeft > 0 ? this.state.timeLeft : "Time has run out! You scored 0 points."
    }

    render() {
        return (
            <div>Time left: {this.handleFormatTime()} </div>
        )
    }
}

export default Clock;