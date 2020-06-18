const mongoose = require("mongoose");
const cors = require('cors');
const express = require("express");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("💻 Mondodb database Connected Successfully!!"))
    .catch(err => console.error(err));


const experciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
app.use('/exercises', experciseRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})