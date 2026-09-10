import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const client = new MongoClient(process.env.MONGODB_URI);
let contacts;

async function connectToDatabase() {
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  contacts = db.collection("contacts");
  console.log("Connected to MongoDB");
}

// ---- Routes ----

// Home: add-contact form + full list
app.get("/", async (req, res) => {
  const allContacts = await contacts.find({}).sort({ name: 1 }).toArray();
  res.render("index", { contacts: allContacts });
});

// Create
app.post("/contacts", async (req, res) => {
  const { name, phone, email } = req.body;
  await contacts.insertOne({ name, phone, email });
  res.redirect("/");
});

// Edit form, pre-filled from the current document
app.get("/contacts/:id/edit", async (req, res) => {
  const contact = await contacts.findOne({ _id: new ObjectId(req.params.id) });
  if (!contact) {
    return res.status(404).render("404");
  }
  res.render("edit-contact", { contact });
});

// Update
app.post("/contacts/:id", async (req, res) => {
  const { name, phone, email } = req.body;
  await contacts.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { name, phone, email } }
  );
  res.redirect("/");
});

// Delete
app.post("/contacts/:id/delete", async (req, res) => {
  await contacts.deleteOne({ _id: new ObjectId(req.params.id) });
  res.redirect("/");
});

// 404 — registered last
app.use((req, res) => {
  res.status(404).render("404");
});

// ---- Startup: connect first, THEN listen ----
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
