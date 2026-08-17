import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the about page");
})

router.get("/about2", (req, res) => {
    res.send("Welcome to about page 2");
})

export default router;
