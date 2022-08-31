const express = require('express');
const dotenv = require('dotenv')
const app = express();

dotenv.config({ path: './.env' })
require('./DB/conn')
app.use(express.json())

app.use(require('./router/auth'))

if (process.env.NODE_ENV == "production") {
    app.use(express.static("frontend/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`you are listening at port ${PORT}`);
})