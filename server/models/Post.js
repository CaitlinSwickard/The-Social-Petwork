// const mongoose = require("mongoose");

// const PostSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },
//     desc: {
//       type: String,
//       max: 500
//     },
//     img: {
//       type: String
//     },
//     likes: {
//       type: Array,
//       default: [],
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Post", PostSchema);

const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ],
  likes: [
    {
      username: String,
      createdAt: String
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Post", postSchema);