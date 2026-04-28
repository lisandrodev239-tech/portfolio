import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lisandro Dev | Desarrollo Web Full Stack",
  description: "Desarrollo web profesional para PyMEs y emprendedores. Landing pages, dashboards administrativos, sistemas de gestión e inventario.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-[var(--border)]">
          <nav className="container flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold">
              Lisandro<span className="text-[var(--primary)]">Dev</span>
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-[var(--primary)] transition-colors">
                Inicio
              </Link>
              <Link href="/about" className="hover:text-[var(--primary)] transition-colors">
                Sobre mí
              </Link>
              <Link href="/projects" className="hover:text-[var(--primary)] transition-colors">
                Proyectos
              </Link>
              <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">
                Contacto
              </Link>
              <Link href="/admin" className="hover:text-[var(--primary)] transition-colors text-[var(--muted)]">
                Admin
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[var(--border)] py-8">
          <div className="container text-center text-sm text-[var(--muted)]">
            <p>© {new Date().getFullYear()} Lisandro Dev. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}