import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import sanitizeHtml, { IOptions } from "sanitize-html";
import { zodResolver } from "@hookform/resolvers/zod";

const sanitizeOptions: IOptions = {
  allowedTags: [], // No HTML tags allowed
  allowedAttributes: {}, // No HTML attributes allowed
  disallowedTagsMode: "recursiveEscape", // Valid value for DisallowedTagsModes
};

const sanitizeInput = (input: string): string => {
  return sanitizeHtml(input, sanitizeOptions);
};

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  company: z.string().optional(),
  email: z.string().email("Format d'email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const sanitizedData = {
        name: sanitizeInput(data.name),
        company: data.company ? sanitizeInput(data.company) : undefined,
        email: sanitizeInput(data.email),
        message: sanitizeInput(data.message),
      };

      const response = await fetch("https://api.quentinsautiere.com/portfolio/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) throw new Error("Erreur d'envoi");

      reset();
      alert("Message envoyé avec succès");
    } catch (error) {
      alert(`Erreur lors de l'envoi du message ${error}`);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group\/design-root overflow-x-hidden font-[Manrope]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight">
                  Créons ensemble quelque chose de génial
                </p>
                <p className="text-[#637588] text-sm font-normal leading-normal">
                  Remplissez le formulaire ci-dessous pour me contacter et discuter de votre projet, je vous répondrais au plus vite.
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111418] text-base font-medium leading-normal pb-2">
                    Nom
                  </p>
                  <input
                    {...register("name", { required: "Le nom est obligatoire" })}
                    placeholder="Votre nom"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111418] text-base font-medium leading-normal pb-2">
                    Votre entreprise ou organisation
                  </p>
                  <input
                    {...register("company")}
                    placeholder="Votre entreprise ou organisation"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  />
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111418] text-base font-medium leading-normal pb-2">
                    Email
                  </p>
                  <input
                    {...register("email", { required: "L'email est requis" })}
                    placeholder="Votre email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111418] text-base font-medium leading-normal pb-2">
                    Message
                  </p>
                  <textarea
                    {...register("message", { required: "Le message est requis" })}
                    placeholder="Votre message"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] min-h-36 placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm">
                      {errors.message.message}
                    </span>
                  )}
                </label>
              </div>
              <a
                href="mailto:contact@quentinsautiere.com"
                className="flex max-w-[480px] flex-wrap items-end gap-4 px-6 text-[#1980e6]"
              >
                Ouvrir dans une mail app
              </a>
              <div className="flex px-4 py-3 justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#1980e6] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#0f70c0] focus:outline-0 focus:ring-0 focus:border-[#1980e6]"
                >
                  <span className="truncate">
                    {isSubmitting ? "Envoi..." : "Envoyer"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;