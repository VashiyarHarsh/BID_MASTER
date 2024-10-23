//CODE FOR SERVER CONNECTION

const express = require("express");
const app = express();
const router = require("./router/auth-router");
require("./utils/db.js")

app.use(express.json());
app.use("/", router);
//app.use("/api/auth", router);
const PORT = 5000;

// Starting the server without .catch
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});



