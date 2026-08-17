import express from "express";
import aboutRouter from "./routes/aboutRouter.js";
import { db } from "./db.js"


const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});

app.use("/about", aboutRouter);

app.listen(8080);
