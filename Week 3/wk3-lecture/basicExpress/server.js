import express from "express";

const app = express(); //Server app created

app.get("/", (req, res) => {
	res.send("root");
})

app.get("/about", (req, res) => {
	res.send("about");
})

//Optional Segment
app.get("/optional/:var1{..:ext}/:var2", (req, res) => {
	const var1 = req.params.var1
	const ext = req.params.ext
	const var2 = req.params.var2
    res.send(`var1: ${var1}, ext: ${ext}, var2: ${var2}, `);
})

app.get("/ping", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.post("/subjects", (req, res) => {
  const newSubject = { subjectId: "SUB-00042", name: "Linear Algebra" };
  res.status(201).json(newSubject);   // 201 = Created
});

//Query Strings
app.get("/infoQuery", (req, res) => {
	const name = req.query.name;
	const age = req.query.age;
	res.send(`My name is ${name}, and my age is ${age}`)
});

//Path Segments
app.get("/pathSeg/:name/:age", (req, res) => {
	const name = req.params.name;
	const age = req.params.id;
	res.send(`My name is ${name}, and my age is ${age}`)
});

app.get("/calc/:op/:no1/:no2", (req, res) => {
	const op = req.params.op;
	const no1 = Number(req.params.no1);
	const no2 = Number(req.params.no2);

    const calculate = (op, no1, no2) => {
        switch (op) {
        case "add":
            return no1 + no2;
        case "sub":
            return no1 - no2;
        }
    }

	res.send(`${no1} ${op} ${no2} is ${calculate(op, no1, no2)}`)
});

// Express 5 — rejected promises are forwarded to error-handling middleware automatically
app.get("/user/:id", async (req, res) => {
  const user = await getUserById(req.params.id);   // if this rejects, Express handles it
  res.json(user);
});

//Match Any
app.get("/{*any}", (req, res) => {
	res.send("any");
})


app.listen(8080, () => {
	console.log("Server running at http://localhost:8080/");
})
