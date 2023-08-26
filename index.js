const express = require('express');
const math = require('mathjs');
const app = express();
const PORT = 3000;

const history = [];

app.get('/calculate', (req, res) => {
    let expression = req.query.expression;

    if (!expression) {
        res.send('Invalid ');
        return;
    }

    expression = expression.replace(/plus/g, '+');
    expression = expression.replace(/minus/g, '-');
    expression = expression.replace(/into/g, '*');
    expression = expression.replace(/div/g, '/');
    try {
        const result = math.evaluate(expression);
        res.send(`The result of ${expression} is ${result}`);
    } catch (error) {
        res.send('Error');
    }

  history.unshift(expression);
  if (history.length > 20) {
    history.pop();
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
