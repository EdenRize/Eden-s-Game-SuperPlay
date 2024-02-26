import { useState } from "react";
import { Game } from "./Game";
import { PlayBtn } from "./PlayBtn";

export function GameContainer() {
    const [isShowPlayBtn, setIsShowPlayBtn] = useState(true)

    function onGameOver() {
        setIsShowPlayBtn(true)
    }

    return (
        <div className="game-container">
            <img className="background" src="/src/assets/img/background.jpg" />

            <Game onGameOver={onGameOver} />
            {isShowPlayBtn && <PlayBtn onBtnClick={() => setIsShowPlayBtn(false)} />}
        </div>
    )
}
