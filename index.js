import express from "express";
import mongoose from "mongoose";
import { PORT, DATABASE_URL } from "./config.js";
import TodoRoutes from "./routes/TodoRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API description",
    },
  },
  // Define the paths to your API route files with JSDoc comments
  apis: ["./routes/TodoRoutes.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// middleware for parsing request body
app.use(express.json());

// to check if server is connected to port
// app.listen(PORT, () => console.log(`port running on ${PORT}`));

app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});

app.use("/todos", TodoRoutes);

// connecting mongoose to Database
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
