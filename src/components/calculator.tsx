import React, { useState } from "react";
import { Box, Button, Divider, Grid2, styled, Typography } from "@mui/material";
import { calculatorContainer } from "../assets/styles/components/calculator";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { buttonStyle } from "../assets/styles/components/button";

const StyledButton = styled(Button)(buttonStyle);

const Calculator = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const handleClick = (operand: number | string) => {
    if (operand === "*") operand = "x";
    setExpression((prev) => prev + operand);
  };

  const handleBackspace = () => setExpression((prev) => prev.slice(0, -1));

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
        let newExpression = expression.replace(/x/g, "*");

        // Handle percentages in the expression
        newExpression = newExpression.replace(/(\d+(\.\d+)?)(%)?/g, (match, number, decimalPart, percentageSymbol) => {
            const num = parseFloat(number);
            if (percentageSymbol) {
                const previousExpression = newExpression.slice(0, newExpression.indexOf(match)).trim();
                const operatorMatch = previousExpression.match(/[+\-*/]/g);
                const lastOperator = operatorMatch ? operatorMatch[operatorMatch.length - 1] : null;

                // If after * or /, directly calculate percentage
                if (lastOperator === "*" || lastOperator === "/") {
                    return `(${num} / 100)`;
                } 
                // If after + or -, calculate percentage based on the previous number
                else if (lastOperator === "+" || lastOperator === "-") {
                    const prevNumberMatch = previousExpression.match(/[\d.]+(?=[^\d.]*$)/);
                    const prevNumber = prevNumberMatch ? parseFloat(prevNumberMatch[0]) : 1;
                    return `(${num} / 100) * ${prevNumber}`;
                } 
                // Handle percentage at the beginning of expression (no operator)
                else {
                    return `(${num} / 100)`;
                }
            }
            return number;
        });

        // Additional handling for percentages between two numbers without operator
        newExpression = newExpression.replace(/(\d+)%(\d+)/g, (match, p1, p2) => {
            const num1 = parseFloat(p1);
            const num2 = parseFloat(p2);
            return `(${num1} * ${num2} / 100)`;  // Calculate percentage of the second number
        });

        console.log("Modified expression with percentages:", newExpression);

        // Safely evaluate the expression
        const evaluatedResult = eval(newExpression);

        // Check for division by zero and handle it
        if (evaluatedResult === Infinity || evaluatedResult === -Infinity) {
            setResult("Cannot divide by zero");
            return;
        }

        let finalResult;

        // Check if the result has more than 2 decimal places
        if (typeof evaluatedResult === "number") {
            const decimalPart = evaluatedResult.toString().split(".")[1];

            // Apply precision formatting if there are more than 3 decimal places
            if (decimalPart && decimalPart.length > 3) {
                finalResult = evaluatedResult.toFixed(4); // Round to 4 decimal places
            } else {
                finalResult = evaluatedResult.toString();
            }

            // Handle large/small numbers with exponential notation
            if (Math.abs(Number(finalResult)) > 1e6) {
                finalResult = Number(finalResult).toExponential(4);
            }
        } else {
            finalResult = evaluatedResult.toString();
        }

        setResult(finalResult);
    } catch (e) {
        console.error(e);
        setResult("Error"); // Set result to "Error" in case of evaluation failure
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
            <StyledButton
              sx={{ background: "#3b605c" }}
              variant="contained"
              fullWidth
              onClick={() => handleClick("%")}
            >
              %
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
              onClick={() => handleClick("*")}
            >
              X
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
              variant="contained"
              fullWidth
              onClick={handleBackspace}
            >
              <BackspaceIcon />
            </StyledButton>
          </Grid2>
          <Grid2 size={3}>
            <StyledButton
              sx={{ background: "#009688" }}
              variant="contained"
              fullWidth
              onClick={handleCalculate}
            >
              =
            </StyledButton>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default Calculator;
