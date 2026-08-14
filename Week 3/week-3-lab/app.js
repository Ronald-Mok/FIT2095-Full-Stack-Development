import express from "express";

const VIEWS_PATH = `${import.meta.dirname}/views`;
const PORT_NUMBER = 8080;

const app = express();

app.use(express.static(`${import.meta.dirname}/node_modules/bootstrap/dist/css`));

app.get("/", (req, res) => {
  res.sendFile(`${VIEWS_PATH}/index.html`);
});

//Task 2
app.get("/add/:no1/:no2", (req, res) => {
  const number1 = Number(req.params.no1);
  const number2 = Number(req.params.no2);
  res.json({ operation: "add", result: number1 + number2 });
});

//Task 3
app.get("/sub/:no1/:no2", (req, res) => {
  const number1 = Number(req.params.no1);
  const number2 = Number(req.params.no2);
  res.json({ operation: "subtract", result: number1 - number2 });
});

//query params (http://localhost:8080/sub?no1=5&no2=3)
app.get("/sub/", (req, res) => {
  const number1 = Number(req.query.num1);
  const number2 = Number(req.query.no2);
  res.json({ operation: "subtract", result: number1 - number2 });
});

//Task 4: Redirecting to another page
app.get("/info", (req, res) => {
  res.sendFile(`${VIEWS_PATH}/info.html`);
});





app.listen(PORT_NUMBER, () => {
  console.log(`Listening on port ${PORT_NUMBER}`);
});


