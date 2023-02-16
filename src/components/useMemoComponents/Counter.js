import React, { useState, useMemo } from 'react';

const Counter = () => {

    const [counterOne, setCounterOne] = useState(0)
    const [counterTwo, setCounterTwo] = useState(0)

    const incrementOne = () => {
        setCounterOne(counterOne + 1)
    }

    const incrementTwo = () => {
        setCounterTwo(counterTwo + 1)
    }

    const isEven = useMemo(() => {
        let i = 0
        while (i < 2000000000) i++ // con il solo scopo di rallentare l'esecuzione
        return counterOne % 2 === 0
    }, [counterOne])

    // const isEven = () => {
    //     let i = 0
    //     while (i < 200000000) i++ // con il solo scopo di rallentare l'esecuzione
    //     return counterOne % 2 === 0
    // }

    return (
        <>
            <div>
                <button onClick={incrementOne}>Count One : {counterOne}</button>
                <span>{isEven ? ' Even ' : ' Odd '}</span>
            </div>
            <div>
                <button onClick={incrementTwo}>Count Two : {counterTwo}</button>
            </div>
        </>
    );
};

export default Counter;