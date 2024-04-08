const mongoose = require("mongoose");

const connction = mongoose.connect("mongodb://localhost:27017/taskBuilder");

module.exports = {
    connction
}