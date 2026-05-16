import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const { name, company, email, interest, message } = await req.json();

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log("[contact] submission (env not configured):", {
      name,
      company,
      email,
      interest,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from("contact_submissions").insert({
    name: name.trim(),
    company: company?.trim() || null,
    email: email.trim(),
    interest: interest || null,
    message: message?.trim() || null,
  });

  if (error) {
    console.error("[contact] Supabase error:", error);
    return NextResponse.json({ error: "전송 실패" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
