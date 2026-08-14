import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { apiKey } = await request.json();
  if (!apiKey?.trim()) return NextResponse.json({ ok: false, error: "키를 입력해주세요" }, { status: 400 });

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return NextResponse.json({ ok: false, error: data?.error?.message ?? "유효하지 않은 키입니다" }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "네트워크 오류" }, { status: 500 });
  }
}
