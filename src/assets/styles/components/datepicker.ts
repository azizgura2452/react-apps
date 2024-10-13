export const datepickerStyles = {
    container: {
        padding: '12px',
        width: '80%',
        margin: 'auto',
    },
    calendarHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
        marginTop: 2,
        gap: 2
    },
    calendarGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
    },
    dayOfWeek: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#555',
        fontSize: '14px',
    },
    dateCell: {
        textAlign: 'center',
        padding: '12px',
        borderRadius: '2px',
        cursor: 'pointer',
        backgroundColor: '#f5f5f5',
        color: '#333',
        transition: 'background-color 0.3s',
    },
    dateSelected: {
        backgroundColor: '#1976d2', 
        color: '#fff',
    },
    dateDisabled: {
        backgroundColor: '#e0e0e0',
        color: '#888',
        pointerEvents: 'none',
    },
    dateHighlighted: {
        backgroundColor: 'rgba(173, 216, 230, 0.5)', 
        color: '#333',
    },
    predefinedRangeButton: {
        margin: '10px',
        padding: '8px 16px',
        cursor: 'pointer',
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    predefinedRangeButtonHover: {
        backgroundColor: '#155a8a',
    }
};