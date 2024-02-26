import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export function Game() {
    const foods = [
        { src: '/src/assets/img/fruit.png', isEaten: false },
        { src: '/src/assets/img/strawberry.png', isEaten: false },
        { src: '/src/assets/img/candy.png', isEaten: false },
        { src: '/src/assets/img/apple.png', isEaten: false },
        { src: '/src/assets/img/cupcake.png', isEaten: false },
        { src: '/src/assets/img/chocolate-apple.png', isEaten: false },
    ];

    function handleDragEnd(result) {
        if (!result.destination) return

        if (result.destination.droppableId === 'feed-container') {
            foods[+result.draggableId].isEaten = true
            console.log('feed!');
        }

    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="game">
                {(provided) => (
                    <div className="game" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="peon-container">
                            <img className="peon" src="/src/assets/img/Peon.png" />
                            <Droppable droppableId="feed-container">
                                {(provided) => (

                                    <div className="feed-container" ref={provided.innerRef} {...provided.droppableProps}>
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <Droppable droppableId="food-list" direction="horizontal">
                            {(provided) => (
                                <ul className="clean-list foods-list" ref={provided.innerRef} {...provided.droppableProps}>
                                    {foods.map((food, idx) => (
                                        <Draggable key={idx} draggableId={`${idx}`} index={idx}>
                                            {(provided) => (
                                                <li>
                                                    {!food.isEaten ? <img ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        src={food.src}
                                                        className="food" />

                                                        :

                                                        <div className='food' ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} ></div>
                                                    }
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
