
export function PlayBtn({ onBtnClick }) {
    return (
        <div className="play-btn-container">
            <div className="blur"></div>
            <button onClick={onBtnClick}>
                <img src="/src/assets/img/play.png" />
            </button>
        </div>
    )
}
