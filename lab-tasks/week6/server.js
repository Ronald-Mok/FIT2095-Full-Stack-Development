import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = 8080;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const client = new MongoClient(MONGODB_URI);

await client.connect();

const db = client.db(DB_NAME);
const shifts = db.collection("shifts");

const count = await shifts.countDocuments();

if (count === 0) {
  await shifts.insertMany([
    {
      volunteer: "Deja Marsh",
      task: "Gate",
      shiftTime: "09:00",
    },
    {
      volunteer: "Kofi Boateng",
      task: "First Aid",
      shiftTime: "12:00",
    },
  ]);
}


app.get("/34057919/", async (req, res) => {
  const allShifts = await shifts.find({}).toArray();
  res.status(200).json(allShifts);
});


app.get("/34057919/addshift", async (req, res) => {
  const { volunteer, task, shiftTime } = req.query;

  if (!volunteer || !task || !shiftTime) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  const newShift = {volunteer,task,shiftTime};
  const result = await shifts.insertOne(newShift);

  res.status(201).json({_id: result.insertedId, ...newShift});
});


app.get("/34057919/updateshift/:id", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Shift not found",
    });
  }

  const updates = {};

  if (req.query.volunteer !== undefined) {
    updates.volunteer = req.query.volunteer;
  }

  if (req.query.task !== undefined) {
    updates.task = req.query.task;
  }

  if (req.query.shiftTime !== undefined) {
    updates.shiftTime = req.query.shiftTime;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      error: "No fields supplied",
    });
  }

  const result = await shifts.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({
      error: "Shift not found",
    });
  }

  res.status(200).json({
    message: "Shift updated",
  });
});

app.get("/34057919/deleteshift/:id", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Shift not found",
    });
  }

  const result = await shifts.deleteOne({
    _id: new ObjectId(id),
  });

  if (result.deletedCount === 0) {
    return res.status(404).json({
      error: "Shift not found",
    });
  }

  res.status(200).json({
    message: "Shift deleted",
  });
});

app.get("/34057919/skatepark", (req, res) => {res.sendFile(`${import.meta.dirname}/skatepark.html`);});

app.use((req, res) => {res.status(404).send("Page Not Found");});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
