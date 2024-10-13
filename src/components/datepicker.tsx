import { Box, Button, Chip, Divider, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState, CSSProperties, useEffect } from 'react';
import { datepickerStyles } from '../assets/styles/components/datepicker';

type DateRange = {
    startDate: string;
    endDate: string;
};

const Datepicker = () => {
    const today = new Date();

    // Helper functions
    const formatDate = (date: Date): string => {
        const timezoneOffset = date.getTimezoneOffset() * 60000; // Handle timezone offset
        return new Date(date.getTime() - timezoneOffset).toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    };

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 6 || day === 0; // Saturday or Sunday
    };

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate(); // Get the number of days in a month
    };

    const calculateWeekdaysAndWeekends = (start: Date, end: Date) => {
        const weekdaysList: string[] = [];
        const weekendsList: string[] = [];

        const currentDate = new Date(start);
        while (currentDate <= end) {
            if (isWeekend(currentDate)) {
                weekendsList.push(formatDate(currentDate));
            } else {
                weekdaysList.push(formatDate(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setWeekdays(weekdaysList);
        setWeekends(weekendsList);
    };

    const handleDateClick = (day: number) => {
        const date = new Date(currentYear, currentMonth, day);
        const formattedDate = formatDate(date);

        if (selectingStartDate) {
            setDateRange({ startDate: formattedDate, endDate: '' });
            setSelectingStartDate(false);
        } else {
            if (new Date(formattedDate) < new Date(dateRange.startDate)) {
                setDateRange({ startDate: formattedDate, endDate: dateRange.startDate });
            } else {
                setDateRange({ ...dateRange, endDate: formattedDate });
            }
            setSelectingStartDate(true);
        }
    };

    const handlePredefinedRange = (range: 'last7' | 'last30') => {
        const today = new Date();
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);

        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);

        const startDate = range === 'last7' ? last7Days : last30Days;

        setDateRange({
            startDate: formatDate(startDate),
            endDate: formatDate(today),
        });

        // Calculate weekdays and weekends
        calculateWeekdaysAndWeekends(startDate, today);
    };

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentYear(parseInt(event.target.value));
    };

    const [dateRange, setDateRange] = useState<DateRange>({ startDate: formatDate(today), endDate: formatDate(today) });
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectingStartDate, setSelectingStartDate] = useState(true);
    const [weekdays, setWeekdays] = useState<string[]>([]);
    const [weekends, setWeekends] = useState<string[]>([]);

    // Trigger calculation after end date selection
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate);
            const end = new Date(dateRange.endDate);
            calculateWeekdaysAndWeekends(start, end);
        }
    }, [dateRange]);

    const renderDaysOfWeek = () => {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} style={datepickerStyles.dayOfWeek}>
                {day}
            </div>
        ));
    };

    const renderDateCells = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const dateCells = [];

        // Padding for the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            dateCells.push(<div key={`empty-${i}`} style={datepickerStyles.dateCell}></div>);
        }

        // Calculate the start and end dates for highlighting
        const startDate = new Date(dateRange.startDate);
        const endDate = new Date(dateRange.endDate);

        // Actual days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(currentYear, currentMonth, day);
            const formattedDate = formatDate(currentDate);
            const isSelected =
                (dateRange.startDate && formattedDate === dateRange.startDate) ||
                (dateRange.endDate && formattedDate === dateRange.endDate);
            const isWeekendDay = isWeekend(currentDate);
            const isWithinRange = dateRange.startDate && dateRange.endDate &&
                currentDate >= startDate && currentDate <= endDate;

            dateCells.push(
                <div
                    key={day}
                    style={{
                        ...datepickerStyles.dateCell,
                        ...(isSelected ? datepickerStyles.dateSelected : {}),
                        ...(isWeekendDay ? datepickerStyles.dateDisabled : {}),
                        ...(isWithinRange && !isSelected ? datepickerStyles.dateHighlighted : {}),
                    }}
                    onClick={() => !isWeekendDay && handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return dateCells;
    };

    return (
        <Box sx={datepickerStyles.container}>
            <Grid2 container spacing={3}>
                <Grid2 size={6}>
                    <Paper elevation={2} sx={{padding: 1}}>
                        <TextField
                            type="text"
                            label="Selected date range"
                            placeholder="YYYY-MM-DD to YYYY-MM-DD"
                            value={`${dateRange.startDate} to ${dateRange.endDate}`}
                            fullWidth
                            disabled
                            variant='filled'
                        />
                        <Box sx={datepickerStyles.calendarHeader}>
                            <FormControl fullWidth>
                                <InputLabel id="monthSelect">Select Month</InputLabel>
                                <Select value={currentMonth} onChange={handleMonthChange} labelId='monthSelect' label="Select Month">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <MenuItem key={i} value={i}>
                                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id='yearSelect'>Select Year</InputLabel>
                                <Select value={currentYear} onChange={handleYearChange} label="Select Year" labelId='yearSelect'>
                                    {Array.from({ length: 100 }).map((_, i) => (
                                        <MenuItem key={i} value={1950 + i}>
                                            {1950 + i}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={datepickerStyles.calendarGrid}>
                            {renderDaysOfWeek()}
                            {renderDateCells()}
                        </Box>

                        <Box style={{ margin: '20px 0', textAlign: 'center' }}>
                            <Button
                                style={datepickerStyles.predefinedRangeButton}
                                onClick={() => handlePredefinedRange('last7')}
                                variant='contained'
                            >
                                Last 7 Days
                            </Button>
                            <Button
                                style={datepickerStyles.predefinedRangeButton}
                                onClick={() => handlePredefinedRange('last30')}
                                variant='contained'
                            >
                                Last 30 Days
                            </Button>
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={6}>
                    {dateRange.startDate && dateRange.endDate && (
                        <Box sx={datepickerStyles.resultContainer}>
                            <Typography variant='h5'>Weekdays:</Typography>
                            {
                                weekdays.length > 0 && weekdays.map((w, i) => <Chip key={i} color='success' sx={{ marginRight: 1, marginTop: '8px' }} label={w} />)
                            }
                            <br />
                            <br />
                            <Typography variant='h5'>Weekends:</Typography>
                            {
                                weekends.length > 0 && weekends.map((w, i) => <Chip key={i} color='default' sx={{ marginRight: 1, marginTop: '8px' }} label={w} />)
                            }

                        </Box>
                    )}
                </Grid2>
            </Grid2>
        </Box>
    );
};
export default Datepicker;