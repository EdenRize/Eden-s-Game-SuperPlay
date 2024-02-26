import { useEffect, useRef, useState } from 'react';

export function Game() {
    const [foods, setFoods] = useState([
        { src: '/src/assets/img/fruit.png', name: 'fruit', isEaten: false },
        { src: '/src/assets/img/strawberry.png', name: 'strawberry', isEaten: false },
        { src: '/src/assets/img/candy.png', name: 'candy', isEaten: false },
        { src: '/src/assets/img/apple.png', name: 'apple', isEaten: false },
        { src: '/src/assets/img/cupcake.png', name: 'cupcake', isEaten: false },
        { src: '/src/assets/img/chocolate-apple.png', name: 'chocolate-apple', isEaten: false },
    ]);

    const [score, setScore] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isOverFeedContainer, setIsOverFeedContainer] = useState(false);
    const clickedFoodRef = useRef(null);

    useEffect(() => {
        if (clickedFoodRef.current) {
            clickedFoodRef.current.style.top = `${mousePosition.y - 42}px`;
            clickedFoodRef.current.style.left = `${mousePosition.x - 38}px`;
        }
    }, [mousePosition]);

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
                setScore(prevScore => prevScore++)
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
            <ul className="clean-list foods-list">
                {foods.map((food, idx) => (
                    <li key={idx}>
                        {food.isEaten ? (
                            <div className="food"></div>
                        ) : (
                            <img
                                src={food.src}
                                className={`food ${food.name}`}
                                onMouseDown={handleFoodMouseDown}
                                onTouchStart={handleFoodMouseDown}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
