import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userController from "./users/userController.js";

const PORT = 5003;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

userController(app);

try {
  await mongoose.connect("mongodb+srv://varuni:Px2CNU0AkQZ8fIsT@personalproject.1coi1pq.mongodb.net/", {
    dbName: "recipe",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    writeConcern : { w: "majority"}
  });



  console.log("connected to mongodb");
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
