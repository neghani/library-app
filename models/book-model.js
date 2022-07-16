const { default: mongoose } = require("mongoose");
const BookSchema = require("../schemas/book-schema");
module.exports = mongoose.model("Book", BookSchema);
