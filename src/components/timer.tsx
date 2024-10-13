import React, { useEffect, useState } from 'react';
import useTimer from '../hooks/useTimer';
import { Box, Button, Typography } from '@mui/material';

const Timer = () => {
    const { counter, startTimer } = useTimer();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h2'>Timer</Typography>
            <Typography variant='h1'>{counter}</Typography>
            <Box>
                <Button onClick={startTimer} variant='contained' sx={{ width: '200px' }}>Start Timer</Button>
            </Box>
        </Box>
    );
}

export default Timer;
