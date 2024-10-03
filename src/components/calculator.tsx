import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid2, Stack, styled, Switch, Typography } from "@mui/material";
import { calculatorContainer } from "../assets/styles/components/calculator";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { buttonStyle } from "../assets/styles/components/button";
import { debounce, isOperator } from "../utils/common";

const StyledButton = styled(Button)(buttonStyle);

const Calculator = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isBodmas, setIsBodmas] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expression]);

  const toggleSwitch = () => setIsBodmas(!isBodmas);

  const handleCalculate = (exp = expression) => {
    try {
      console.log(exp);
      let newExpression = exp.replace(/[+\-*/x]$/, "").replaceAll("x", "*");
      // Handle negative numbers at the start of the expression
      if (newExpression.startsWith("-")) {
        newExpression = "0" + newExpression; // Add a leading 0 for proper evaluation
      }
      console.log("Modified expression:", newExpression);
      let result;
      if (isBodmas) {
        result = eval(newExpression); // Safely evaluate the expression
      }
      else {
        // Split the expression into tokens (numbers and operators)
        const tokens = newExpression.match(/(-?\d+\.?\d*|\+|\-|\*|\/)/g);

        if (!tokens) {
          setResult("Invalid Expression");
          return;
        }

        // Initialize result with the first number
        result = parseFloat(tokens[0]);

        // Loop through tokens and perform calculations in left-to-right order
        for (let i = 1; i < tokens.length; i += 2) {
          const operator = tokens[i];
          const nextNumber = parseFloat(tokens[i + 1]);

          switch (operator) {
            case '+':
              result += nextNumber;
              break;
            case '-':
              result -= nextNumber;
              break;
            case '*':
              result *= nextNumber;
              break;
            case '/':
              // Check for division by zero
              if (nextNumber === 0) {
                setResult("Cannot divide by zero");
                return;
              }
              result /= nextNumber;
              break;
            default:
              setResult("Invalid Operator");
              return;
          }
        }
      }

      // Format the result
      let finalResult;
      const decimalPart = result?.toString().split(".")[1];

      // Apply precision formatting if there are more than 3 decimal places
      if (decimalPart && decimalPart.length > 3) {
        finalResult = result?.toFixed(4); // Round to 4 decimal places
      } else {
        finalResult = result?.toString();
      }

      // Handle large/small numbers with exponential notation
      if (Math.abs(Number(finalResult)) > 1e10) {
        finalResult = Number(finalResult).toExponential(4);
      }

      setResult(finalResult!);
    } catch (e) {
      console.error(e);
      setResult("Error"); // Set result to "Error" in case of evaluation failure
    }
  };

  // Function to handle click events
  const handleClick = (operand: number | string) => {
    // Replace '*' with 'x'
    if (operand === "*") operand = "x";

    // Get the last character from the current expression
    const lastChar = expression.charAt(expression.length - 1);

    // Check if the last character is an operator
    if (isOperator(lastChar) && isOperator(operand as string)) {
      // If the last character is an operator and the new operand is also an operator, replace it
      setExpression((prev) => prev.slice(0, -1) + operand);
      return;
    } else {
      // Otherwise, append the new operand to the expression
      setExpression((prev) => prev + operand);
    }

    // If the operand is an operator, calculate the result
    if (isOperator(operand as string)) {
      handleCalculate(expression + operand); // Use the updated expression for calculation
    }
  };

  // Debounced version of handleClick
  const debouncedHandleClick = debounce(handleClick, 125);

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleBackspace = () => {
    const newExpression = expression.slice(0, -1);
    if (newExpression.length <= 0) {
      handleClear();
      return;
    }

    setExpression((prev) => prev.slice(0, -1));

    // Get the last character from the current expression
    const lastChar = newExpression.charAt(expression.length - 1);

    // If the operand is an operator, calculate the result
    if (isOperator(lastChar)) {
      handleCalculate(newExpression);
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key;
    if (!isNaN(Number(key)) || ["+", "-", "*", "/", "."].includes(key)) {
      debouncedHandleClick(key);  // Use debounced function here
    } else if (key === "Enter") {
      e.preventDefault();
      handleCalculate();
    } else if (key === "Backspace") {
      handleBackspace();
    } else if (key === "Escape") {
      handleClear();
    }
  };


  return (
    <Box sx={calculatorContainer}>
      <Box className="scrollable">
        <Box sx={{ padding: 2 }} flexDirection={"row"}>
          <Typography
            sx={{ letterSpacing: "1px" }}
            align={"left"}
            variant="h3"
            gutterBottom
          >
            {expression}
          </Typography>
          <Typography align={"right"} variant="h2" gutterBottom>
            {result}
          </Typography>
        </Box>
      </Box>
      <Box padding={2} sx={{ background: "#0a1816" }}>
        <Grid2 container spacing={2} mt={2}>
          <Grid2 size={6}>
            <StyledButton
              sx={{ background: "#607d8b" }}
              variant="contained"
              fullWidth
              onClick={handleClear}
            >
              AC
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton variant="contained">
              <Stack direction={'column'} alignItems={'center'}>
                <Switch defaultChecked={isBodmas} size="medium" onChange={toggleSwitch} />
                <Typography variant="caption">{isBodmas ? 'SCI' : 'STD'}</Typography>
              </Stack>
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={handleBackspace}
              data-testid="Backspace"
            >
              <BackspaceIcon />
            </StyledButton>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} mt={2}>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("7")}
            >
              7
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("8")}
            >
              8
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("9")}
            >
              9
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              sx={{ background: "#3b605c" }}
              variant="contained"
              fullWidth
              onClick={() => handleClick("/")}
            >
              ÷
            </StyledButton>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} mt={2}>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("4")}
            >
              4
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("5")}
            >
              5
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("6")}
            >
              6
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              sx={{ background: "#3b605c" }}
              variant="contained"
              fullWidth
              onClick={() => handleClick("-")}
            >
              -
            </StyledButton>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} mt={2}>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("1")}
            >
              1
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("2")}
            >
              2
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("3")}
            >
              3
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              sx={{ background: "#3b605c" }}
              variant="contained"
              fullWidth
              onClick={() => handleClick("+")}
            >
              +
            </StyledButton>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} mt={2}>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick("0")}
            >
              0
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              variant="contained"
              fullWidth
              onClick={() => handleClick(".")}
            >
              .
            </StyledButton>
          </Grid2>

          <Grid2 size={3}>
            <StyledButton
              sx={{ background: "#009688" }}
              variant="contained"
              fullWidth
              onClick={() => handleCalculate()}
            >
              =
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              sx={{ background: "#3b605c" }}
              variant="contained"
              fullWidth
              onClick={() => handleClick("*")}
            >
              x
            </StyledButton>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Calculator;
