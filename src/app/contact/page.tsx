import { Metadata } from "next";
import { Mail, Phone, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | Lisandro Dev",
  description: "Contáctame para tu proyecto web. Desarrollo profesional para PyMEs.",
};

export default function ContactPage() {
  return (
    <div className="section">
      <h1 className="section-title">Contacto</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="card mb-8">
          <h2 className="text-lg font-semibold mb-4">Envíame un mensaje</h2>
          <p className="text-[var(--muted)] mb-6">
            Cuéntame sobre tu proyecto y te respondo en 24-48 horas.
          </p>
          
          <form 
            action="https://formspree.io/f/lisandrodev239@gmail.com"
            method="POST"
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
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
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)]"
                placeholder="Nombre de tu empresa"
              />
            </div>
            
            <div>
              <label htmlFor="need" className="block text-sm font-medium mb-2">¿Qué necesitas?</label>
              <select
                id="need"
                name="need"
                required
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
              <label htmlFor="message" className="block text-sm font-medium mb-2">Mensaje</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] focus:outline-none focus:border-[var(--primary)] resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send size={18} /> Enviar mensaje
            </button>
          </form>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">其他 formas de contacto</h2>
          <div className="space-y-3">
            <a 
              href="https://wa.me/549113xxxxxxx" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              <Phone className="w-5 h-5 text-[var(--primary)]" />
              <span>WhatsApp</span>
            </a>
            <a 
              href="https://instagram.com/tuusuario" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              <Mail className="w-5 h-5 text-[var(--primary)]" />
              <span>Instagram</span>
            </a>
            <a 
              href="https://github.com/tuusuario" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            >
              <Mail className="w-5 h-5 text-[var(--primary)]" />
              <span>GitHub</span>
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