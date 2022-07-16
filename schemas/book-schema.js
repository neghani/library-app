const { default: mongoose } = require("mongoose");

const BookSchema = mongoose.Schema({
  id: { type: String, unique: true, require: true },
  name: { type: String, required: true },
  description: { type: String,  required: true },
  publisher: { type: String },
  publishedDate: { type: Date },
  author: { type: String  },
  location: { type: String},
  pagesCount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["IN", "OUT", "NA"],
    default: "IN",
    required: true,
  },
  genre: String,
  cover: String,
  reviews: [
    {
      rating: { type: Number, required: true },
      comment: { type: String },
      username: { type: String, required: true },
    },
  ],
});

module.exports = BookSchema;
