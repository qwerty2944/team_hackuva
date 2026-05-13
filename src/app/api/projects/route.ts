import { NextResponse } from "next/server";
import { projects } from "@/entities/project";

export function GET() {
  return NextResponse.json({ projects });
}
