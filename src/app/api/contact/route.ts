import { NextRequest, NextResponse } from "next/server";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br/>");
}

export async function POST(req: NextRequest) {
  const { name, company, email, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;

  // 환경변수 미설정 시 콘솔 로그만 남기고 성공 반환 (개발/미설정 환경 fallback)
  if (!apiKey || !toEmail) {
    console.log("[contact] submission (env not configured):", { name, company, email });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Siriai Contact <onboarding@resend.dev>",
      to: [toEmail],
      reply_to: email,
      subject: `[Siriai 문의] ${name}${company ? ` · ${company}` : ""}`,
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#333;max-width:520px;border-collapse:collapse">
          <tr><td style="padding:6px 0;font-weight:600;width:80px">이름</td><td style="padding:6px 12px">${esc(name)}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600">회사</td><td style="padding:6px 12px">${esc(company ?? "—")}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600">이메일</td><td style="padding:6px 12px">${esc(email)}</td></tr>
          <tr><td colspan="2" style="padding:20px 0 8px;font-weight:600;border-top:1px solid #eee">문의 내용</td></tr>
          <tr><td colspan="2" style="padding:0;color:#555;line-height:1.7">${esc(message)}</td></tr>
        </table>
      `,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error:", res.status, await res.text());
    return NextResponse.json({ error: "전송 실패" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
