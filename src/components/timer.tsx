import React, { useEffect, useState } from 'react';
import useTimer from '../hooks/useTimer';
import { Box, Button, Typography } from '@mui/material';

const Timer = () => {
    const { counter, startTimer, clearTimer } = useTimer();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant='h2'>Timer</Typography>
            <Typography variant='h1'>{counter}</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                marginTop: 2,
                gap: 2
            }}>
                <Button onClick={startTimer} color='success' variant='contained' sx={{ width: '200px' }}>Start Timer</Button>
                <Button onClick={clearTimer} color='error' variant='contained' sx={{ width: '200px' }}>Reset Timer</Button>
            </Box>
        </Box>
    );
}

export default Timer;
