"use client";

import { useState } from "react";

export default function LandingPage() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/validate-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      });
      const data = await response.json();
      if (!data.ok) {
        setError(data.error ?? "키 확인 실패");
        return;
      }
      localStorage.setItem("gemini_api_key", apiKey);
      setDone(true);
    } catch {
      setError("네트워크 오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.wrap}>
      <section style={styles.card}>
        {done ? (
          <>
            <div style={styles.icon}>✅</div>
            <h1 style={styles.title}>준비 완료!</h1>
            <p style={styles.sub}>Gemini API 키가 등록되었습니다.<br />이제 교회 광고 영상을 만들 수 있어요.</p>
            <button style={styles.button} onClick={() => setDone(false)}>다시 확인하기</button>
          </>
        ) : (
          <>
            <div style={styles.icon}>⛪</div>
            <h1 style={styles.title}>교회광고영상 AI</h1>
            <p style={styles.sub}>무료로 사용하려면 <strong>Gemini API 키</strong> 하나만 입력하면 됩니다.<br />Google 계정이 있으면 무료로 발급받을 수 있어요.</p>
            <div style={styles.guide}>
              <p style={{ fontWeight: 600, margin: "0 0 8px" }}>🔑 키 발급 방법 (1분)</p>
              <ol style={{ paddingLeft: 20, lineHeight: 2, margin: 0 }}>
                <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={styles.link}>Google AI Studio 열기</a></li>
                <li>&quot;API 키 만들기&quot; 클릭</li>
                <li>생성된 키 복사 후 아래에 붙여넣기</li>
              </ol>
            </div>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <input type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="AIzaSy..." style={styles.input} autoComplete="off" />
              {error && <p style={styles.error}>⚠ {error}</p>}
              <button type="submit" style={{ ...styles.button, opacity: loading || !apiKey.trim() ? 0.5 : 1 }} disabled={loading || !apiKey.trim()}>{loading ? "확인 중..." : "시작하기"}</button>
            </form>
            <p style={styles.footer}>키는 내 기기에만 저장되며 서버에 전송되지 않습니다.</p>
          </>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", padding: 24 },
  card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "48px 40px", maxWidth: 480, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, backdropFilter: "blur(12px)" },
  icon: { fontSize: 48, marginBottom: 8 },
  title: { color: "#fff", fontSize: 28, fontWeight: 700, margin: 0, textAlign: "center" },
  sub: { color: "rgba(255,255,255,0.65)", fontSize: 15, textAlign: "center", lineHeight: 1.7, margin: 0 },
  guide: { background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px", width: "100%", color: "rgba(255,255,255,0.8)", fontSize: 14 },
  link: { color: "#60a5fa", textDecoration: "underline" },
  input: { width: "100%", padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 15, outline: "none", marginBottom: 8, boxSizing: "border-box" },
  button: { width: "100%", padding: "14px 0", borderRadius: 10, border: "none", background: "linear-gradient(90deg, #3b82f6, #8b5cf6)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", marginTop: 8 },
  error: { color: "#f87171", fontSize: 13, margin: "4px 0 0" },
  footer: { color: "rgba(255,255,255,0.3)", fontSize: 12, textAlign: "center", margin: 0 },
};
