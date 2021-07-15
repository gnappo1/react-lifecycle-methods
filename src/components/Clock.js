import {useState, useEffect} from 'react'

const Clock = ({hasStarted, handleTimeOut}) => {
    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(
        () => {
            let timerId = null;
            const setTimer = () => {
                console.log("I was fired with timeleft: ",timeLeft)
                timerId = setInterval(() => {
                    setTimeLeft(timeLeft - 1)
                }, 1000)
            }

            setTimer()
            return () => {
                console.log("unmounting!")
                clearInterval(timerId)
                if (timeLeft === 0) {
                    setTimeLeft(20)
                    handleTimeOut()
                }
            }
        },
        [timeLeft, handleTimeOut]
    )

    const handleFormatTime = () => {
        return timeLeft > 0 ? timeLeft : "Time has run out! You scored 0 points."
    }

    return (
        <div>Time left: {handleFormatTime()} </div>
    )
}

export default Clock;