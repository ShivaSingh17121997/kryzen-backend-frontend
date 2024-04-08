require("dotenv").config()
const mongoose = require("mongoose");

const connction = mongoose.connect(process.env.CONNECTION);

module.exports = {
    connction
}