import React, {Component} from 'react'
class Clock extends Component {
    state = {
        timeLeft: 20
    }

    componentDidMount() {
        if (!!this.props.hasStarted && this.state.timeLeft === 20) {
            this.setTimer()
        } else if (this.state.timeLeft === 0) {
            clearInterval(this.timerId)
            this.setState({timeLeft: 20})
            this.props.handleTimeOut()
        }
    }

    setTimer() {
        this.timerId = setInterval(() => {
            this.setState(prevState => {
                return {timeLeft: --prevState.timeLeft }
            })
        }, 1000)
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