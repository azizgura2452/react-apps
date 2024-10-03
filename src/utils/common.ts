//fn to check if charcater is an operator
export const isOperator = (char: string) => {
    return ["+", "-", "*", "/", "x"].includes(char);
};

// Debouncing function to prevent rapid keypress issues
export const debounce = (fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};