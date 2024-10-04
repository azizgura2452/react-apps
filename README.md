
## Available Scripts

In the project directory, you can run:
### `npm install`

To start webpack dev-server:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Running tests

To run E2E tests in Cypress environment:
### `npm run test`

## Live App
Please visit [https://react-bayzat.vercel.app](https://react-bayzat.vercel.app/) to see the deployed app

## Feature

1. Ability to toggle between standard (std left to right evaluation) and scientific (BODMAS evaluation) calculator
2. Ability to use a keyboard
3. Ability to observe complete expression
4. E2E testing with Cypress

## Edge Cases (Managed)

1. Calculation to be done only if an operator (+-/*) is detected at the end of expression
2. Handling of division by zero
3. Debouncing the user input to properly manage asynchronous state update in react
4. Handled consecutive operator scenario

## Future scope

1. Todo: Handle expression in SCI calculator starting with negative integer
