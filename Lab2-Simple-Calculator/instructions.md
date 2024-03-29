# Lab 2 - Node.JS Simple Calculator

This lab is for you to practice working with Node and NPM.  

## To complete the lab

- Create a node application called lab2
- Initialize npm and create package.json via the wizard
- Install the connect module with npm and save it to package.json
- Create server.js

- Link to the connect and url packages

- Write a calculate function that parses the url for 3 parameters: method, x, and y
- Possible values for the method parameter are: "add", "subtract", "multiply", and "divide"
- If the method value is anything else, show an error message
- Determine which math operation to run based on the value of the method parameter
- Perform this math operation on the other 2 values (x and y)
- Display the full math operation and its result on the page in this format: x [method] y = [result]

  - Sample URL: <http://localhost:3000/lab2?method=add&x=16&y=4>

            Sample Output: 16 + 4 = 20
  - Sample URL: <http://localhost:3000/lab2?method=subtract&x=16&y=4>

            Sample Output: 16 - 4 = 12
  - Sample URL: <http://localhost:3000/lab2?method=multiply&x=16&y=4>

            Sample Output: 16 * 4 = 64
  - Sample URL: <http://localhost:3000/lab2?method=divide&x=16&y=4>

            Sample Output: 16 / 4 = 4
- Install npm and use the wizard to create your package.json file
- Install the nodemon module so your application automatically restarts any time a change is saved to your server.js file
