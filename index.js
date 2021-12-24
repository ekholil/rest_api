const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to server of employeelist");
});

app.listen(port, () => {
  console.log("server is running at ", port);
});

const uri = `mongodb+srv://travelist:ClrwXqUly9jwCqsJ@cluster0.odpvs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const employeeCollection = client.db("employee").collection("list");
    console.log("Database connected");

    // find all employees
    app.get("/employees", async (req, res) => {
      const result = await employeeCollection.find({}).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
