import { useEffect, useRef, useState } from 'react';
import { getFoods } from '../services/game';
import { FoodsList } from './FoodsList';

export function Game({ onGameOver }) {
    const [foods, setFoods] = useState(getFoods());
    const [isOverFeedContainer, setIsOverFeedContainer] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const clickedFoodRef = useRef(null);

    useEffect(() => {
        if (clickedFoodRef.current) {
            clickedFoodRef.current.style.top = `${mousePosition.y - 42}px`;
            clickedFoodRef.current.style.left = `${mousePosition.x - 38}px`;
        }
    }, [mousePosition]);

    useEffect(() => {
        if (isGameOver()) {
            setIsOverFeedContainer(true)
            setTimeout(() => {
                onGameOver()
                startGame()
            }, 1000);
        }
    }, [foods])

    function isGameOver() {
        return foods.every(food => food.isEaten)
    }

    function startGame() {
        setFoods(getFoods())
        setIsOverFeedContainer(false)
    }

    function handleFoodMouseDown(ev) {
        ev.preventDefault();
        const foodEl = ev.target;
        foodEl.classList.add('drag');
        clickedFoodRef.current = foodEl;
        foodEl.style.position = 'fixed';
        const clientX = ev.type === 'touchstart' ? ev.touches[0].clientX : ev.clientX;
        const clientY = ev.type === 'touchstart' ? ev.touches[0].clientY : ev.clientY;
        setMousePosition({ x: clientX, y: clientY });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
    }

    function handleMouseMove(ev) {
        ev.preventDefault();
        const clientX = ev.type === 'touchmove' ? ev.touches[0].clientX : ev.clientX;
        const clientY = ev.type === 'touchmove' ? ev.touches[0].clientY : ev.clientY;
        setMousePosition({ x: clientX, y: clientY });
        if (ev.target.classList.contains('feed-container')) {
            setIsOverFeedContainer(true);
        } else {
            setIsOverFeedContainer(false);
        }
    }

    function handleMouseUp(ev) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
        if (clickedFoodRef.current) {
            clickedFoodRef.current.classList.remove('drag');
            if (ev.target.classList.contains('feed-container')) {
                const foodName = clickedFoodRef.current.classList[1];
                const foodIdx = foods.findIndex(food => food.name === foodName);
                setFoods(prevFoods => {
                    const updatedFoods = [...prevFoods];
                    updatedFoods[foodIdx].isEaten = true;
                    return updatedFoods;
                });
            } else {
                clickedFoodRef.current.style.position = 'unset';
                clickedFoodRef.current.style.top = 'unset';
                clickedFoodRef.current.style.left = 'unset';
            }
            clickedFoodRef.current = null;
            setIsOverFeedContainer(false);
        }
    }

    return (
        <div className="game">
            <div className="peon-container">
                <img className="peon" src={isOverFeedContainer ? "/src/assets/img/Candy_peon.png" : "/src/assets/img/Peon.png"} />
                <div className="feed-container"></div>
            </div>
            <FoodsList foods={foods} handleFoodMouseDown={handleFoodMouseDown} />
        </div>
    );
}
