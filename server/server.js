const express = require('express');
// const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require('cors');



// const userRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");

dotenv.config();

const { typeDefs, resolvers } = require('./schemas');
// Import `authMiddleware()` function to be configured with the Apollo Server
// const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Add context to our server so data from the `authMiddleware()` function can pass data to our resolver functions
  context: ({ req }) => ({ req})
});

server.applyMiddleware({ app });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));

// this is the storage for multer to pull from 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
// multer to load pics from a file
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

// app.use("/api/users", userRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/posts", postRoute);
// path for public/images folder on server side
app.use("/images", express.static(path.join(__dirname, "public/images")));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
