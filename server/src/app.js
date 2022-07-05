const express = require("express");
const cors = require("cors");
//const session = require('express-session');

const database = require("./config/database");

//const passportAuth = require("./middlewares/passportGoogleAuth")

const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");
const bookmarkRoute = require("./routes/bookmarkAnswerRoute");

const app = express();

// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: 'bla bla bla' 
// }));

app.use(cors());

// app.use(passportAuth.initialize())
// app.use(passportAuth.session());

// === || Increasing limit of the server || ===
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// === || Connecting to Database || === //
database.connect();

//=== Inititzaling Passport Middleware===//


// === || Routes || ===
app.use("/api/user", userRoute);
app.use("/api/question", questionRoute);
app.use("/api/answer", answerRoute);
app.use("/api/bookmark", bookmarkRoute);

module.exports = app;
