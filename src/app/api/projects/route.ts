import { NextResponse } from "next/server";
import { listProjects } from "@/entities/project/server";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}
