const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

mongoose
  .connect(
    "formfillup-shard-00-02-zasik.mongodb.net:27017/twitter",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err.message));
