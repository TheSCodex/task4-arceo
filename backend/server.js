import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./src/db.js";
import userRoutes from "./src/routes/user.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: "Content-Type",
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.use("/task4", userRoutes);

const PORT = process.env.PORT || 8080;

connection
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database", err);
  });
