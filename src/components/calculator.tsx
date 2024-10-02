import React, { useState } from "react";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { buttonStyle } from "../assets/styles/components/button";
import { calculatorContainer } from "../assets/styles/components/calculator";

const Calculator = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const handleButtonClick = (operand: number | string) => {
    if (operand === "*") operand = "x";
    setExpression((prev) => prev + operand);
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      const newExpression = expression.replace("x", "*");
      const result: number = eval(newExpression);
      const fixedResult = result.toFixed(3);
      if (isFinite(result)) setResult(fixedResult);
      else setResult("Cannot divide by zero");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={calculatorContainer}>
      <Box height={"100px"} pb={2}>
        <Typography align={"left"} variant="h3" gutterBottom>
          {expression}
        </Typography>
        <Typography align={"right"} variant="h3" gutterBottom>
          {result}
        </Typography>
      </Box>

      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={6}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={handleClear}
          >
            AC
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("%")}
          >
            %
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("/")}
          >
            /
          </Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("7")}
          >
            7
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("8")}
          >
            8
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("9")}
          >
            9
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("*")}
          >
            X
          </Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("4")}
          >
            4
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("5")}
          >
            5
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("6")}
          >
            6
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("-")}
          >
            -
          </Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("1")}
          >
            1
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("2")}
          >
            2
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("3")}
          >
            3
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("+")}
          >
            +
          </Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} mt={2}>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick("0")}
          >
            0
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick(".")}
          >
            .
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button sx={buttonStyle} variant="contained" fullWidth>
            Backspace
          </Button>
        </Grid2>
        <Grid2 size={3}>
          <Button
            sx={buttonStyle}
            variant="contained"
            fullWidth
            onClick={handleCalculate}
          >
            =
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Calculator;
