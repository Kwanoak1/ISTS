import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026 ISTS | 국제간사훈련학교",
  description: "세계를 향한 제자도의 산실, 2026 국제간사훈련학교 ISTS",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
