
export function FoodsList({ foods, handleFoodMouseDown }) {
    return (
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
    )
}
