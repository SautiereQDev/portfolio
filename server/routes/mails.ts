import type { Request, Response } from "express";
import express from "express";
import transporter from "../config/nodemailer.js";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

router.post("/send-mail", async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  transporter
    .sendMail({
      // Envoi du message à soi-même
      from: "contact@quentinsautiere.com", // Utilisation de l'adresse autorisée
      replyTo: sanitizeHtml(email), // Pour permettre la réponse à l'expéditeur original
      to: "contact@quentinsautiere.com",
      subject: `Nouveau message de contact de ${sanitizeHtml(name)}`,
      text: `Message de ${sanitizeHtml(name)} (${sanitizeHtml(email)}) : ${sanitizeHtml(message)}`,
      html: `
        <p><p><strong>Email :</strong> ${sanitizeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <p>${sanitizeHtml(message)}</p>
      `,
    })
    .then(() => {
      console.log(
        `Message sent by ${sanitizeHtml(name)} (${sanitizeHtml(email)})`,
      );
      res.status(200).send("Message sent");
    })
    .catch((error) => {
      console.error(
        `Error while sending message by ${sanitizeHtml(name)} (${sanitizeHtml(email)}) : ${sanitizeHtml(error)}`,
      );
      res.status(500).send(`Error while sending message ${error}`);
    });
});

export default router;
