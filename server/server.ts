import express, { Application } from "express";
import cors from "cors";
import mailRoutes from "./routes/mails.js";
import transporter from "./config/nodemailer.js";

export const server: Application = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "*"
      : "https://quentinsautiere.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));
server.use(express.json());

server.use("/portfolio", mailRoutes);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Verification de la configuration du serveur de messagerie
transporter.verify((error) => {
  if (error) {
    console.log("Erreur:", error);
  } else {
    console.log("Serveur prêt à envoyer des emails");
  }
});

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
