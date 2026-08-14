import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "교회광고영상 AI",
  description: "Gemini로 만드는 교회 광고 영상",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
