import express from "express";
import cors from "cors";
import records from "./routes/record.js";
const PORT = process.env.PORT || 5050; // use the configured port, or 5050
const app = express(); // create the server application
app.use(cors()); // allow cross-origin calls
app.use(express.json()); // understand JSON sent by the browser
app.use("/record", records); // anything starting /record goes to the routes file
app.listen(PORT, () => { // start listening for requests
 console.log(`Server listening on port ${PORT}`);
});