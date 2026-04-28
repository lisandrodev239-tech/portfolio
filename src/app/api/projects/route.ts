import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { title, slug, description, image_url, demo_url, github_url, status, percentage, technologies, year, featured } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Título y slug son requeridos" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          slug,
          description: description || "",
          image_url: image_url || "",
          demo_url: demo_url || "",
          github_url: github_url || "",
          status: status || "completado",
          percentage: percentage || 100,
          technologies: technologies || [],
          year: year || new Date().getFullYear(),
          featured: featured || false,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}