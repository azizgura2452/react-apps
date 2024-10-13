import React, { useEffect, useState } from "react";

const useTimer = () => {
    const [counter, setCounter] = useState(0);
    const [activeTimer, setActiveTimer] = useState(true);

    const startTimer = () => {
        if (activeTimer) {
            setInterval(() => {
                setCounter(prev => prev + 1);
            }, 1000);
            setActiveTimer(!activeTimer)
        }
    };

    return {startTimer, counter}
}

export default useTimer;