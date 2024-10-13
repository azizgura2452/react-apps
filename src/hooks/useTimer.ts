import React, { useEffect, useState } from "react";

const useTimer = () => {
    const [counter, setCounter] = useState(0);
    const [activeTimer, setActiveTimer] = useState(true);
    const [timerId, setTimerId] = useState();

    const startTimer = () => {
        let t;
        if (activeTimer) {
            t = setInterval(() => {
                setCounter(prev => prev + 1);
            }, 1000);
            setActiveTimer(!activeTimer)
            setTimerId(prev => t);
        }
    };

    const clearTimer = () => {
        clearInterval(timerId);
        setCounter(0);
        setActiveTimer(!activeTimer);
    }

    return {startTimer, counter, timerId, clearTimer}
}

export default useTimer;