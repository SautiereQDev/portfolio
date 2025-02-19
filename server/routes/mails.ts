import express, { type Request, type Response } from "express";
import transporter from "../config/nodemailer.js";
import { limiter } from "../midleware/rateLimiter.js";
import { mailSchema } from "../utils/validator.js";
import { ZodError } from "zod";

const router = express.Router();

router.post(
  "/send-mail",
  limiter,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = mailSchema.parse(req.body);

      await transporter.sendMail({
        from: "contact@quentinsautiere.com",
        replyTo: validatedData.email,
        to: "contact@quentinsautiere.com",
        subject: `Nouveau message de ${validatedData.name}`,
        text: `Message de ${validatedData.name} (${validatedData.email}) : ${validatedData.message}`,
        html: `
        <p><strong>De :</strong> ${validatedData.name}</p>
        ${validatedData.company ? `<p><strong>Entreprise :</strong> ${validatedData.company}</p>` : ""}
        <p><strong>Email :</strong> ${validatedData.email}</p>
        <p><strong>Message :</strong></p>
        <p>${validatedData.message}</p>
      `,
      });

      res.status(200).json({ message: "Message envoyé" });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ message: "Données invalides", errors: error.issues });
        return;
      }
      res.status(500).json({ message: "Erreur serveur" });
    }
  },
);

export default router;
