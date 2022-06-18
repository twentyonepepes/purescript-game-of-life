## About

A simple application which shows a procedural game of life in any web browser. Uses PureScript for the logic, and JavaScript for the presentation.

## Usage
1. Install dependencies `npm install`
2. Compile the purescript code (the game) `npm run watch:purs`
3. Compile the javascript code (the app) `npm run watch:js`
4. Start the application `npm start`
5. Open http://127.0.0.1:8080 using any web browser

## Using this application to learn PureScript

This application contains PureScript code in the /src directory. By studying this code, you can learn the following:

- Seperating PureScript concerns into multiple files
- Use of currying
- Implementation of the Matrix package
- Usage of maybe values
- Declarative use of pattern maching
- Exporting a PS application into JS
- Using Webpack to compile PS and JS together
- ... and much more!