import express from "express";
import cors from "cors";

const app = express();

console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "*"
      : "https://quentinsautiere.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Conversion en nombre avec parseInt
const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
