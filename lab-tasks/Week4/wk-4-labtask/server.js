import express from "express";

const PORT = 8080;

let studentID = 2;
const records = [
    { id: 1, title: "Blue Valentine", artist: "Tom Waits", priceAud: 42 },
    { id: 2, title: "Rumours", artist: "Fleetwood Mac", priceAud: 35 }
]


const app = express();

app.get("/34057919", (req, res) => {
    res.status(200).json(records)
})

app.get("/34057919/addrecord/", (req, res) => {
    const newTitle = req.query.title;
    const newArtist = req.query.artist;
    const newPriceAud = req.query.priceAud;

    if (newTitle === undefined|| newArtist === undefined || newPriceAud === undefined || newTitle === "" || newArtist === "" || newPriceAud === "") {
        res.status(400).json("Invalid Entry");
        return;
    }
    
    studentID++;
    const newRecord = {id: studentID, title: newTitle, artist: newArtist, priceAud: Number(newPriceAud)}
    records.push(newRecord);
    res.status(201).json(newRecord);
})

app.get("/34057919/deleterecord/:id", (req, res) => {
    const delID = req.params.id;

    if (delID === "" || delID === undefined) {
        res.status(404).send("Invalid Entry");
        return;
    }
    
    const index = records.findIndex((p) => p.id === Number(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ error: `No record with id ${req.params.id}` });
    
    }
    records.splice(index, 1)
    res.status(200).json(`Record ID: ${delID} successfully deleted!`)
})

app.get("/34057919/store/", (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/infoPage.html`)
})

app.use((req, res) => {res.status(404).send("Page Not Found");});

app.listen(PORT)
