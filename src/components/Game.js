const Game = ({game, routeProps}) => {
    return (
        <>
            <h1>{game.name}</h1>
            <p>{game.description}</p>
            <button onClick={() =>routeProps.history.go(-1)}>Back</button>
        </>
    )
}

export default Game;