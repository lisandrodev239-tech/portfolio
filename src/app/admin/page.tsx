"use client";

import { useState, useEffect } from "react";
import { supabase, ContactMessage, Project } from "@/lib/supabase";
import { MessageSquare, Folder, CheckCircle, Trash2, Eye, EyeOff, Lock, Plus, Image } from "lucide-react";
import ImageUploader from "@/components/image-uploader";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "projects" | "add">("messages");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [newProject, setNewProject] = useState({
    title: "",
    slug: "",
    description: "",
    image_url: "",
    demo_url: "",
    github_url: "",
    status: "completado",
    percentage: 100,
    technologies: "",
    year: new Date().getFullYear(),
    featured: false,
  });
  const [saving, setSaving] = useState(false);

  const ADMIN_PASSWORD = "lisandro2024";

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [messagesRes, projectsRes] = await Promise.all([
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
      ]);

      if (messagesRes.data) setMessages(messagesRes.data);
      if (projectsRes.data) setProjects(projectsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const technologiesArray = newProject.technologies.split(",").map(t => t.trim()).filter(Boolean);
      
      const { data, error } = await supabase.from("projects").insert([
        {
          title: newProject.title,
          slug: newProject.slug,
          description: newProject.description,
          image_url: newProject.image_url,
          demo_url: newProject.demo_url,
          github_url: newProject.github_url,
          status: newProject.status,
          percentage: newProject.percentage,
          technologies: technologiesArray,
          year: newProject.year,
          featured: newProject.featured,
        },
      ]).select();

      if (error) throw error;

      if (data) {
        setProjects([...data, ...projects]);
        setNewProject({
          title: "",
          slug: "",
          description: "",
          image_url: "",
          demo_url: "",
          github_url: "",
          status: "completado",
          percentage: 100,
          technologies: "",
          year: new Date().getFullYear(),
          featured: false,
        });
        alert("Proyecto agregado");
        setActiveTab("projects");
      }
    } catch (error) {
      alert("Error al agregar proyecto");
    }
    setSaving(false);
  };

  const markAsRead = async (id: string) => {
    await supabase.from("contact_messages").update({ read: true }).eq("id", id);
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("¿Eliminar este mensaje?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages(messages.filter(m => m.id !== id));
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("projects").update({ featured: !current }).eq("id", id);
    setProjects(projects.map(p => p.id === id ? { ...p, featured: !current } : p));
  };

  const deleteProject = async (id: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    await supabase.from("projects").delete().eq("id", id);
    setProjects(projects.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="section">
        <div className="max-w-md mx-auto card">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 mx-auto mb-4 text-[var(--primary)]" />
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-[var(--muted)]">Ingresa tu contraseña</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] mb-4"
            />
            <button type="submit" className="btn-primary w-full">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="section">
      <h1 className="section-title">Panel de Admin</h1>

      <div className="flex gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            activeTab === "messages" 
              ? "bg-[var(--primary)] text-white" 
              : "bg-[var(--secondary)]"
          }`}
        >
          <MessageSquare size={18} />
          Mensajes
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            activeTab === "projects" 
              ? "bg-[var(--primary)] text-white" 
              : "bg-[var(--secondary)]"
          }`}
        >
          <Folder size={18} />
          Proyectos
        </button>
        <button
          onClick={() => setActiveTab("add")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            activeTab === "add" 
              ? "bg-[var(--primary)] text-white" 
              : "bg-[var(--secondary)]"
          }`}
        >
          <Plus size={18} />
          Agregar Proyecto
        </button>
      </div>

      {loading ? (
        <p className="text-center">Cargando...</p>
      ) : activeTab === "add" ? (
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleAddProject} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título *</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-")})}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                  placeholder="Mi Proyecto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  type="text"
                  value={newProject.slug}
                  onChange={(e) => setNewProject({...newProject, slug: e.target.value})}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                  placeholder="mi-proyecto"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                placeholder="Descripción del proyecto..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Imagen del proyecto</label>
              <ImageUploader
                value={newProject.image_url}
                onChange={(url) => setNewProject({...newProject, image_url: url})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Demo URL</label>
              <input
                type="url"
                value={newProject.demo_url}
                onChange={(e) => setNewProject({...newProject, demo_url: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                value={newProject.github_url}
                onChange={(e) => setNewProject({...newProject, github_url: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                placeholder="https://github.com/..."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                >
                  <option value="completado">Completado</option>
                  <option value="en-progreso">En progreso</option>
                  <option value="planificado">Planificado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Porcentaje</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newProject.percentage}
                  onChange={(e) => setNewProject({...newProject, percentage: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Año</label>
                <input
                  type="number"
                  value={newProject.year}
                  onChange={(e) => setNewProject({...newProject, year: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tecnologías (separadas por coma)</label>
              <input
                type="text"
                value={newProject.technologies}
                onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)]"
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={newProject.featured}
                onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
              />
              <label htmlFor="featured">Destacado</label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full"
            >
              {saving ? "Guardando..." : "Agregar Proyecto"}
            </button>
          </form>
        </div>
      ) : activeTab === "messages" ? (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-[var(--muted)]">No hay mensajes</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`card ${!msg.read ? "border-l-4 border-l-[var(--primary)]" : ""}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{msg.name}</h3>
                    <p className="text-sm text-[var(--muted)]">{msg.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {!msg.read && (
                      <button
                        onClick={() => markAsRead(msg.id)}
                        className="p-2 hover:bg-[var(--secondary)] rounded"
                        title="Marcar como leído"
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {msg.company && <p className="text-sm mb-1"><strong>Empresa:</strong> {msg.company}</p>}
                {msg.need && <p className="text-sm mb-1"><strong>Necesidad:</strong> {msg.need}</p>}
                {msg.budget && <p className="text-sm mb-1"><strong>Presupuesto:</strong> {msg.budget}</p>}
                <p className="mt-2 text-[var(--muted)]">{msg.message}</p>
                <p className="text-xs text-[var(--muted)] mt-2">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.length === 0 ? (
            <p className="text-center text-[var(--muted)] col-span-2">No hay proyectos</p>
          ) : (
            projects.map((proj) => (
              <div key={proj.id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{proj.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFeatured(proj.id, proj.featured)}
                      className={`p-2 rounded ${proj.featured ? "text-yellow-500" : "text-[var(--muted)]"}`}
                      title={proj.featured ? "Quitar de destacado" : "Destacar"}
                    >
                      {proj.featured ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">{proj.description}</p>
                <div className="flex gap-2 text-xs text-[var(--muted)]">
                  <span>{proj.status}</span>
                  <span>•</span>
                  <span>{proj.percentage}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}