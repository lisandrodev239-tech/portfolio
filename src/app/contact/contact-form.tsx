"use client";

import { useState } from "react";
import { Mail, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    need: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar mensaje");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        need: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="section">
      <h1 className="section-title">Contacto</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-lg font-semibold mb-4">Envíame un mensaje</h2>
          <p className="text-[var(--muted)] mb-6">
            Cuéntame sobre tu proyecto y te respondo en 24-48 horas.
          </p>
          
          {status === "success" ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
              <p className="text-[var(--muted)] mb-4">
                Gracias por contactarme. Te responderé pronto.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-secondary"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {status === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}
            
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">Empresa (opcional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]"
                  placeholder="Nombre de tu empresa"
                />
              </div>
              
              <div>
                <label htmlFor="need" className="block text-sm font-medium mb-2">¿Qué necesitas?</label>
                <select
                  id="need"
                  name="need"
                  value={formData.need}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="landing">Landing Page</option>
                  <option value="web">Sitio Web</option>
                  <option value="dashboard">Dashboard Admin</option>
                  <option value="sistema">Sistema/Inventario</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">Presupuesto estimado</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]"
                >
                  <option value="">Selecciona un rango</option>
                  <option value="150-300">$150 - $300</option>
                  <option value="300-500">$300 - $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000-2500">$1000 - $2500</option>
                  <option value="2500+">$2500+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)] resize-none"
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "loading" ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send size={18} /> Enviar mensaje
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Otras formas de contacto</h2>
          <div className="space-y-3">
            <a 
              href="https://wa.me/549113xxxxxxx" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              <Phone className="w-5 h-5 text-[var(--primary)]" />
              <span>WhatsApp</span>
            </a>
            <a 
              href="mailto:lisandrodev239@gmail.com"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              <Mail className="w-5 h-5 text-[var(--primary)]" />
              <span>lisandrodev239@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}