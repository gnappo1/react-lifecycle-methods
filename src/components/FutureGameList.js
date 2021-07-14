import {NavLink, Route} from 'react-router-dom'
import Game from "./Game"
import ErrorPage from "./ErrorPage"

const FutureGameList = (props) => {
    const link = {
        width: "100px",
        padding: "12px",
        margin: "1em",
        background: "blueviolet",
        textDecoration: "none",
        color: "white"
    }

    const games = [
        {name: "Combo Tetris", description: "A super fun tetris game for the family!"},
        {name: "Snake Revolution", description: "Snake like you've never seen before!"},
        {name: "Mini Golf", description: "An interactive game for golf lovers!"}
    ]

    const slugify = (name) => {
        return name.toLowerCase().split(" ").join("-")
    }

    const findGameByName = (slugName) => {
        return games.find(game => slugify(game.name) === slugName)
    }

    const formatGamesForNav = () => {
        return games.map((gameObj, idx) => {
            return (
                <NavLink
                    to={`${props.match.url}/${slugify(gameObj.name)}`}
                    exact
                    key={idx}
                    style={link}
                    activeStyle={{
                        background: "blue"
                    }}
                >
                    {gameObj.name}
                </NavLink>
            )
        })
    }
     const marginStyle = {margin: "3em"}
    return (
        <div style={marginStyle}>
            {formatGamesForNav()}
            <Route path="/future-games/:name" render={(routeProps) => {
                const game = findGameByName(routeProps.match.params.name)
                return game ? (
                    <Game routeProps={routeProps} game={game}/>
                ) : (
                    <ErrorPage />
                )
            }}/>
        </div>
    )
}

export default FutureGameList;