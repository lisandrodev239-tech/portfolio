import { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contacto | Lisandro Dev",
  description: "Contáctame para tu proyecto web. Desarrollo profesional para PyMEs.",
};

export default function ContactPage() {
  return <ContactForm />;
}