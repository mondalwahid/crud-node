const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./model");
const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

// Create a users API below
app.post("/create", async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get list of users API below
app.get("/users", async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete users API below
app.delete("/delete_user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteUser = await userModel.findByIdAndDelete(userId);
    if (deleteUser) {
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Edit users API below
app.put("/update_user/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, age, designation } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        age: age,
        designation: designation,
      },
      { new: true }
    );

    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

mongoose.connect(
  "mongodb+srv://wahidmondal:waheed1234@crud-cluster.if65l6l.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
