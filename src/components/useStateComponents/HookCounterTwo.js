import React, { useState } from 'react';
//contatore che incrementa, decrementa e resetta
const HookCounterTwo = () => {

    const [count, setCount] = useState(0)

    const incrementCount = () => setCount(count + 1)
    const decrementCount = () => setCount(count - 1)
    const resetCount = () => setCount(0)
    const incrementFive = () => {
        for (let i = 0; i < 5; i++) {
            setCount(prevCount => prevCount + 1)
        }
    }

    return (
        <div>
            <button onClick={incrementCount}>+</button>
            <button onClick={decrementCount}>-</button>
            <button onClick={resetCount}>reset</button>
            <button onClick={incrementFive}>increment five</button>

            <h2>{count}</h2>

        </div>
    );
};

export default HookCounterTwo;