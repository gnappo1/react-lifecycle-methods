import React, {Component} from 'react'
class Clock extends Component {
    state = {
        timeLeft: 30
    }

    componentDidUpdate() {
        if (!!this.props.hasStarted && this.state.timeLeft === 30) {

            this.timerId = setInterval(() => {
                this.setState(prevState => {
                    return {timeLeft: --prevState.timeLeft }
                })
            }, 1000)
        } else if (this.state.timeLeft === 0) {
            
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        return (
            <div>Time left: {this.state.timeLeft} </div>
        )
    }
}

export default Clock;