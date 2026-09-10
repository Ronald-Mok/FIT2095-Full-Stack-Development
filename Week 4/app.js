import express from "express";
import { Book } from "./models/book.js";

const PORT = 8000;
const app = express();
const db = [];

app.set("view engine", "ejs"); // looks for .ejs files in views/ automatically
app.use(express.urlencoded({ extended: true }));

// Your own static assets (the background image)
app.use(express.static(`${import.meta.dirname}/public`));
// Bootstrap's compiled CSS, served straight out of node_modules
app.use(express.static(`${import.meta.dirname}/node_modules/bootstrap/dist/css`));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add-book", (req, res) => {
  res.render("add-book");
});

app.post("/add-book", (req, res) => {
  const newBook = new Book(req.body.title, req.body.author, req.body.year);
  db.push(newBook);
  res.redirect("/view-books");
});

app.get("/view-books", (req, res) => {
  res.render("view-books", { records: db });
});

// Catch-all 404 — must be registered last
app.use((req, res) => {
  res.status(404).render("404");
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
