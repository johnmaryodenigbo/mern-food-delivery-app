import { MongoClient, ServerApiVersion } from "mongodb";
// const URI = process.env.ATLAS_URI || ""; // read the secret from config.env
// const client = new MongoClient(URI, {}); // prepare a connection
// await client.connect(); // really connect (waits for the answer)
// await client.db("admin").command({ ping: 1 });// ask Atlas "are you there?"
// let db = client.db("employees"); // choose the database to use
// export default db; // let other files use it

const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("You successfully connected to MongoDB!");
} catch (err) {
  console.error(err);
}

let db = client.db("employees");

export default db;