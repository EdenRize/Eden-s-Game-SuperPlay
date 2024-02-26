import { Game } from "./Game";

export function GameContainer() {
    return (
        <div className="game-container">
            <img className="background" src="/src/assets/img/background.jpg" />

            <Game />
        </div>
    )
}
