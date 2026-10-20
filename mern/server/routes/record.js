import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router(); // a mini-app for /record addresses
router.get("/", async (req, res) => { // when someone sends GET /record ...
 let collection = db.collection("records"); // pick the "records" collection
 let results = await collection.find({}).toArray(); // {} = no filter, so get everything
 res.send(results); // send the list back as JSON
});
router.post("/", async (req, res) => {             // when someone sends POST /record ...
  try {
    let newDocument = {                            // build the document from the request body
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    let collection = db.collection("records");
    let result = await collection.insertOne(newDocument); // save it to Atlas
    res.status(201).send(result);                  // 201 = created
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.get("/:id", async (req, res) => {                 // GET one record
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid id");
  let collection = db.collection("records");
  let result = await collection.findOne({ _id: new ObjectId(req.params.id) });
  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

router.patch("/:id", async (req, res) => {               // update a record
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid id");
  try {
    const updates = { $set: { name: req.body.name, position: req.body.position, level: req.body.level } };
    let collection = db.collection("records");
    let result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, updates);
    if (result.matchedCount === 0) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

router.delete("/:id", async (req, res) => {              // delete a record
  if (!ObjectId.isValid(req.params.id)) return res.status(400).send("Invalid id");
  try {
    let collection = db.collection("records");
    let result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send("Not found");
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;