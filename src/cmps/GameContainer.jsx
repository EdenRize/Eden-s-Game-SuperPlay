import { Game } from "./Game2";

export function GameContainer() {
    return (
        <div className="game-container">
            <img className="background" src="/src/assets/img/background.jpg" />

            <Game />
        </div>
    )
}
