"use client";

import { useState } from "react";

type HistoryItem = { year: string; title: string; text: string };
type Purpose = { number: string; title: string; text: string };
type Day = { id: string; label: string; date: string; items: string[] };
type Program = { tag: string; title: string; text: string; details: string[] };
type Photo = { src: string; alt: string; caption: string; position: string };
type Stat = { value: string; label: string; detail: string };
type Participant = { country: string; name: string; english: string; gender: string; birth: string; age: number; role: string };

const history: HistoryItem[] = [
  { year: "1977", title: "JDM의 시작", text: "청년 제자도를 세우는 모임이 시작되었습니다." },
  { year: "1997", title: "현지 간사 개발", text: "각 나라의 현지 스태프를 세우는 사역이 본격적으로 시작되었습니다." },
  { year: "2009", title: "Staff Academy", text: "현지 리더를 위한 집중 훈련 과정, Staff Academy가 문을 열었습니다." },
  { year: "2017", title: "ISTS로 이름을 잇다", text: "International Staff Training & Sharing이라는 이름으로 세계가 연결되었습니다." },
  { year: "2022", title: "팬데믹의 자리에서", text: "멈추지 않고 온라인으로 만나며 새로운 동역의 방식을 배웠습니다." },
  { year: "2026", title: "여섯 번째 ISTS", text: "사람을 세우고 사역을 재생산하는 여섯 번째 학교로 다시 모입니다." },
];

const purposes: Purpose[] = [
  { number: "01", title: "부르심", text: "AI시대에도 변하지 않는 제자도의 본질과 부르심을 다시 확인합니다." },
  { number: "02", title: "배움", text: "모임의 역사와 정신을 배우고 각 나라의 사역을 함께 나눕니다." },
  { number: "03", title: "현장", text: "재생산이 일어나는 현장을 탐방하며 서로의 사역을 격려합니다." },
  { number: "04", title: "가족", text: "국경을 넘어 한 가족임을 누리고 오래 함께할 동역을 만듭니다." },
  { number: "05", title: "파송", text: "배운 것을 각자의 자리로 가져가 다시 사람을 세우도록 파송합니다." },
];

const days: Day[] = [
  { id: "mon", label: "MON", date: "07.13", items: ["시작 예배", "모임론 1", "현지사역 소개 1·2", "조별 모임"] },
  { id: "tue", label: "TUE", date: "07.14", items: ["Q·T", "모임론 2", "간사론 1", "현지사역 소개 5·6"] },
  { id: "wed", label: "WED", date: "07.15", items: ["Q·T", "모임론 3", "GD 1·2", "현지사역 소개 9·10"] },
  { id: "thu", label: "THU", date: "07.16", items: ["Q·T", "모임론 4", "Outing", "목요채플"] },
  { id: "fri", label: "FRI", date: "07.17", items: ["Q·T", "마침 예배", "함께 식사", "다시 파송"] },
];

const programs: Program[] = [
  { tag: "01 / HISTORY", title: "모임의 역사와 재생산의 비전", text: "우리가 어디서 시작했고 어디로 가는지, 선배들의 이야기에서 다음 세대의 방향을 찾습니다.", details: ["JDM 사역자의 연구와 자기계발", "JDM 선교 역사", "JDM 재생산 사역", "JDM의 비전 성취"] },
  { tag: "02 / LEADERSHIP", title: "간사의 소명과 팀 사역", text: "현지 간사의 소명과 성장, 선교사와 함께 만드는 팀 사역을 이야기합니다.", details: ["간사의 소명과 헌신", "간사의 성장과 발전", "현지 간사와 선교사의 팀 사역"] },
  { tag: "03 / PRACTICE", title: "함께 만드는 재생산의 교안", text: "각자의 현장에 바로 가져갈 수 있는 교안을 함께 쓰고 서로의 언어로 다듬습니다.", details: ["교안 작성 워크숍", "현장별 피드백", "다음 세대를 위한 적용"] },
];

const photos: Photo[] = [
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85", alt: "함께 웃는 친구들", caption: "우리는 혼자 걷지 않습니다", position: "center" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85", alt: "서로 대화하는 사람들", caption: "경계를 넘어 듣고 나누는 시간", position: "center" },
  { src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=85", alt: "손을 맞잡은 사람들", caption: "사람이 사람을 세웁니다", position: "center" },
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85", alt: "함께 걷는 사람들", caption: "각자의 자리로 다시", position: "center" },
];

const stats: Stat[] = [
  { value: "1977", label: "시작된 해", detail: "JDM 제자도 사역" },
  { value: "5", label: "참여 국가", detail: "세네갈 · 우즈베키스탄 · 카메룬 · 태국 · 필리핀" },
  { value: "6th", label: "ISTS", detail: "2026년 여섯 번째 학교" },
  { value: "20", label: "현지 간사", detail: "배우고 다시 파송될 사람들" },
];

const participants: Participant[] = [
  ["세네갈", "디욘무싸", "Ndion Moussa", "남", "1990.02.26", 36, "사역"], ["세네갈", "이브라히마", "Adidara Ibrahima", "남", "1984.09.04", 42, "사역"], ["세네갈", "로갸이", "LO Gaye", "여", "1990.02.24", 36, "사역"],
  ["우즈베키스탄", "장바울", "TYAN PAVEL", "남", "1979.10.04", 47, "사역"], ["우즈베키스탄", "조스베따", "DYO SVETLANA", "여", "1981.01.21", 45, "협동"], ["우즈베키스탄", "장제니스", "TYAN DENIS", "남", "1979.01.04", 47, "사역"],
  ["카메룬", "시몽 삐에르", "Simon Pierre", "남", "1990.09.07", 36, "사역"], ["카메룬", "도날 은톨로", "Donald Ntolo", "남", "1992.10.20", 34, "사역"],
  ["태국 · 방콕", "누이", "SOMKID, CHAMNANWONG", "여", "1999.01.30", 27, "워커"], ["태국 · 우본", "허예지", "Heo yeji", "여", "1997.12.31", 29, "사역"], ["태국 · 우본", "빠우", "Patchara Mongkol", "남", "1997.04.21", 29, "사역"], ["태국 · 우본", "말리", "Maliwan Buaboo", "여", "1996.06.03", 30, "협동"], ["태국 · 치앙라이", "낸", "NAN", "여", "2000.11.06", 26, "사역"],
  ["필리핀", "알란", "Allan Tan Raya", "남", "1980.04.19", 46, "사역"], ["필리핀", "케니", "Kyne Joy Santos Raya", "여", "1979.07.23", 47, "사역"], ["필리핀", "켄", "Kenn Butch Cadosales Restificar", "여", "1987.12.17", 39, "사역"], ["필리핀", "조이", "Rowela Joy Papaya Ruiz", "여", "1986.09.11", 40, "사역"], ["필리핀", "월린", "Werlyn Royo Yap", "여", "2000.04.19", 26, "사역"], ["필리핀", "빅터", "Victor Hamili Alinsunurin", "남", "1996.05.14", 30, "협동"], ["필리핀", "조날린", "Jonalyn Garciano Nalzaro", "여", "1985.10.21", 41, "협동"],
].map(([country, name, english, gender, birth, age, role]) => ({ country, name, english, gender, birth, age, role } as Participant));

const fullSchedule = [
  ["07:00–08:00", "", "Q·T", "Q·T", "Q·T", "Q·T"], ["08:00–09:00", "", "아침 식사", "아침 식사", "아침 식사", "아침 식사"], ["09:00–10:30", "", "모임론 1–4", "모임론 1–4", "모임론 1–4", "모임론 1–4"], ["10:30–12:00", "", "현지사역 소개 3·4", "현지사역 소개 7·8", "현지사역 소개", "마침 예배"], ["12:00–13:30", "", "점심 식사", "점심 식사", "점심 식사", "점심 식사"], ["13:30–15:00", "시작 예배", "GD 1·2", "GD 1·2", "Outing", ""], ["15:00–17:00", "", "간사론 1–3", "간사론 1–3", "Outing", ""], ["17:00–19:00", "저녁 식사", "저녁 식사", "저녁 식사", "저녁 식사", ""], ["19:00–20:30", "현지사역 소개 1·2", "현지사역 소개 5·6", "현지사역 소개 9·10", "목요채플", ""], ["20:30–22:00", "조별 모임", "조별 모임", "조별 모임", "조별 모임", ""], ["22:00", "취침", "취침", "취침", "취침", ""],
];

const fieldMinistry = ["세네갈", "카메룬", "우즈벡", "태국 · 방콕", "태국 · 치앙라이", "태국 · 우본", "필리핀 · 앙겔레스", "필리핀 · 다바오", "독일 · 프랑크푸르트", "캐나다 · 밴쿠버"];
const contributors = ["총무: 서관옥 선교사", "진행: 김인호 선교사 · 시몽 간사 · 박찬묵 간사", "사무: 허예지 간사", "재정: 최민철 선교사", "관리: 박지훈 간사", "찬양: 태국 간사들", "촬영 및 영상: 박찬묵 간사"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedDay, setSelectedDay] = useState("mon");
  const [openProgram, setOpenProgram] = useState<number | null>(0);
  const activeHistory = history.find((item) => item.year === selectedYear) ?? history[0];

  return (
    <main className="editorial-shell">
      <style jsx global>{`
        :root { --navy: #162b3b; --blue: #2d5665; --gold: #c69a5a; --cream: #f3efe7; --paper: #fffdf8; --ink: #253038; --muted: #69777a; --line: #d9ded9; }
        * { box-sizing: border-box; } html { scroll-behavior: smooth; } body { margin: 0; background: var(--cream); color: var(--ink); font-family: Arial, "Noto Sans KR", sans-serif; } button { font: inherit; }
         .editorial-shell { background: var(--paper); } .editorial-content { overflow: hidden; } .site-header { position: sticky; top: 0; z-index: 5; display: flex; justify-content: space-between; align-items: center; padding: 19px clamp(22px, 5vw, 74px); background: rgb(255 253 248 / 92%); border-bottom: 1px solid var(--line); backdrop-filter: blur(12px); } .brand { color: var(--navy); font-weight: 800; letter-spacing: .14em; } .brand small { display: block; margin-top: 3px; color: var(--gold); font-size: 9px; letter-spacing: .18em; } .site-nav { display: flex; gap: 26px; } .site-nav a { color: var(--muted); font-size: 12px; text-decoration: none; } .site-nav a:hover { color: var(--gold); } .menu-button { display: none; border: 0; background: none; color: var(--navy); font-size: 11px; letter-spacing: .1em; }
        .hero { min-height: 720px; padding: 120px clamp(24px, 11vw, 170px) 82px; color: white; background: radial-gradient(circle at 83% 15%, rgb(198 154 90 / 32%), transparent 22%), linear-gradient(120deg, #122737, #38606a); } .hero-kicker, .eyebrow, .micro { color: var(--gold); font-size: 11px; letter-spacing: .19em; } .hero h1 { max-width: 900px; margin: 35px 0 25px; font-size: clamp(48px, 8vw, 112px); line-height: 1.02; letter-spacing: -.09em; } .hero h1 span { color: var(--gold); } .hero-theme { color: rgb(255 255 255 / 75%); font-size: 18px; line-height: 1.8; } .hero-meta { display: flex; gap: 34px; margin-top: 70px; color: rgb(255 255 255 / 72%); font-size: 12px; } .hero-meta strong { display: block; margin-top: 7px; color: white; } .anchor-cta { display: inline-flex; margin-top: 38px; padding: 14px 20px; color: var(--navy); background: var(--gold); text-decoration: none; font-size: 12px; font-weight: 700; }
        .section { max-width: 1240px; margin: auto; padding: 115px clamp(24px, 8vw, 110px); } .section-head { display: grid; grid-template-columns: 90px 1fr; gap: 20px; margin-bottom: 55px; } .section-no { color: var(--gold); font-size: 12px; letter-spacing: .14em; } h2 { max-width: 700px; margin: 9px 0 0; color: var(--navy); font-size: clamp(32px, 5vw, 65px); line-height: 1.08; letter-spacing: -.08em; } .intro-copy { max-width: 680px; margin: 0 0 0 110px; color: var(--muted); font-size: 16px; line-height: 2; }
        .timeline { display: grid; grid-template-columns: 1.1fr 1fr; gap: 70px; align-items: end; } .year-list { display: flex; flex-wrap: wrap; gap: 9px; } .year-list button, .day-tabs button { border: 1px solid var(--line); color: var(--muted); background: transparent; cursor: pointer; } .year-list button { padding: 12px 16px; } .year-list button[aria-pressed="true"], .day-tabs button[aria-selected="true"] { color: white; background: var(--navy); border-color: var(--navy); } .timeline-story { padding: 32px; border-top: 2px solid var(--gold); background: var(--cream); } .timeline-story strong { display: block; color: var(--gold); font-size: 42px; } .timeline-story h3 { margin: 13px 0; color: var(--navy); font-size: 25px; letter-spacing: -.06em; } .timeline-story p { margin: 0; color: var(--muted); line-height: 1.8; }
        .purpose-grid { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 1px solid var(--line); } .purpose-card { min-height: 245px; padding: 25px 20px 20px 0; border-right: 1px solid var(--line); } .purpose-card + .purpose-card { padding-left: 20px; } .purpose-card:last-child { border-right: 0; } .purpose-card b { color: var(--gold); font-size: 12px; } .purpose-card h3 { margin: 55px 0 15px; color: var(--navy); font-size: 21px; } .purpose-card p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.8; }
        .photo-mosaic { display: grid; grid-template-columns: 1.3fr 1fr 1fr; grid-template-rows: 210px 210px; gap: 10px; } .photo { position: relative; min-height: 190px; overflow: hidden; background: var(--navy); } .photo:first-child { grid-row: span 2; } .photo img { width: 100%; height: 100%; object-fit: cover; object-position: var(--position); transition: transform .5s; } .photo:hover img { transform: scale(1.04); } .photo figcaption { position: absolute; right: 15px; bottom: 14px; left: 15px; color: white; font-size: 12px; text-shadow: 0 1px 5px #000; }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 50px; background: var(--line); } .stat { padding: 28px 22px; background: var(--cream); } .stat strong { display: block; color: var(--navy); font-size: 37px; letter-spacing: -.08em; } .stat span { display: block; margin: 10px 0 4px; color: var(--gold); font-size: 12px; } .stat small { color: var(--muted); }
         .feature { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; } .feature-copy { padding: 48px; color: white; background: var(--navy); } .feature-copy h2 { color: white; } .feature-copy p { max-width: 450px; color: rgb(255 255 255 / 68%); line-height: 1.9; } .feature-mark { display: flex; align-items: center; justify-content: center; min-height: 360px; padding: 35px; color: var(--navy); background: var(--gold); text-align: center; } .infographic-card { border: 1px solid rgb(22 43 59 / 20%); } .infographic-card h2 { margin: 18px auto 0; color: var(--navy); font-size: clamp(27px, 4vw, 48px); } .infographic-card .flow { margin: 34px 0; font-size: clamp(20px, 3vw, 38px); letter-spacing: -.08em; } .infographic-card b { display: block; font-size: 23px; letter-spacing: -.07em; } .infographic-card small { display: block; margin-top: 13px; } .infographic-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 30px; text-align: left; background: rgb(22 43 59 / 18%); } .infographic-stats div { padding: 13px; background: rgb(255 253 248 / 35%); } .infographic-stats strong { display: block; font-size: 25px; } .infographic-stats small { margin-top: 5px; font-size: 10px; line-height: 1.5; }
         .details-grid { display: grid; gap: 12px; } .details-grid details { border-top: 1px solid var(--line); background: var(--cream); } .details-grid summary { padding: 19px 20px; color: var(--navy); font-weight: 700; cursor: pointer; } .detail-table { overflow-x: auto; padding: 0 20px 20px; } .detail-table table { min-width: 780px; } .source-copy { padding: 0 20px 20px; color: var(--muted); font-size: 13px; line-height: 1.9; } .source-copy ul { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 25px; padding-left: 20px; }
        .program { background: var(--cream); } .day-tabs { display: flex; gap: 8px; margin-bottom: 18px; } .day-tabs button { min-width: 86px; padding: 13px 10px; } .day-tabs strong, .day-tabs small { display: block; } .day-tabs small { margin-top: 5px; font-size: 10px; } .day-schedule { display: grid; grid-template-columns: repeat(4, 1fr); margin-bottom: 56px; border-top: 2px solid var(--navy); } .day-schedule div { min-height: 110px; padding: 18px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); color: var(--muted); font-size: 13px; line-height: 1.7; } .day-schedule span { display: block; margin-bottom: 16px; color: var(--gold); font-size: 10px; letter-spacing: .12em; } .program-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; } .program-card { padding: 27px; border: 1px solid var(--line); background: var(--paper); } .program-card h3 { min-height: 58px; margin: 35px 0 15px; color: var(--navy); font-size: 23px; letter-spacing: -.07em; } .program-card p { min-height: 78px; color: var(--muted); font-size: 13px; line-height: 1.8; } .program-card button { width: 100%; padding: 12px 0; border: 0; border-top: 1px solid var(--line); color: var(--navy); background: transparent; text-align: left; cursor: pointer; } .program-details { margin: 15px 0 0; padding-left: 18px; color: var(--muted); font-size: 12px; line-height: 2; }
        .closing { color: white; background: var(--blue); text-align: center; } .closing h2 { margin-right: auto; margin-left: auto; color: white; } .closing p { max-width: 560px; margin: 22px auto; color: rgb(255 255 255 / 72%); line-height: 1.9; } .site-footer { display: flex; justify-content: space-between; padding: 25px clamp(24px, 8vw, 110px); color: rgb(255 255 255 / 64%); background: var(--navy); font-size: 11px; } .site-footer strong { color: var(--gold); }
         @media (max-width: 760px) { .site-nav { display: none; position: absolute; top: 65px; right: 20px; left: 20px; padding: 18px; background: var(--paper); border: 1px solid var(--line); } .site-nav.open { display: grid; gap: 16px; } .menu-button { display: block; } .hero { min-height: 650px; padding-top: 80px; } .hero-meta { flex-wrap: wrap; margin-top: 45px; } .section { padding-top: 75px; padding-bottom: 75px; } .section-head, .intro-copy { margin-left: 0; } .section-head { grid-template-columns: 45px 1fr; } .purpose-grid, .stats, .feature, .program-grid { grid-template-columns: 1fr; } .purpose-card, .purpose-card + .purpose-card { min-height: auto; padding: 22px 0; border-right: 0; border-bottom: 1px solid var(--line); } .purpose-card h3 { margin-top: 22px; } .timeline { grid-template-columns: 1fr; gap: 30px; } .photo-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 190px 190px 190px; } .photo:first-child { grid-row: span 2; } .photo:last-child { grid-column: span 2; } .day-tabs { overflow-x: auto; } .day-schedule { grid-template-columns: 1fr 1fr; } .day-schedule div { min-height: 100px; } .feature-copy { padding: 32px 24px; } .infographic-stats { grid-template-columns: 1fr; } .source-copy ul { grid-template-columns: 1fr; } .site-footer { flex-wrap: wrap; gap: 10px; } }
      `}</style>

      <header className="site-header">
        <a className="brand" href="#top">ISTS<small>INTERNATIONAL STAFF TRAINING & SHARING</small></a>
        <nav id="mobile-navigation" className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="주요 메뉴">
          <a href="#story" onClick={() => setMenuOpen(false)}>OUR STORY</a><a href="#purpose" onClick={() => setMenuOpen(false)}>PURPOSE</a><a href="#program" onClick={() => setMenuOpen(false)}>PROGRAM</a><a href="#support" onClick={() => setMenuOpen(false)}>SUPPORT</a>
        </nav>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>MENU</button>
      </header>
      <div className="editorial-content">
      <section className="hero" id="top">
        <p className="hero-kicker">JDM · 2026 INTERNATIONAL STAFF TRAINING & SHARING</p>
        <h1>세계를 향한<br /><span>제자도의 산실</span></h1>
        <p className="hero-theme">AI시대, 흔들리지 않는 비전<br /><strong>재생산 사역</strong></p>
        <div className="hero-meta"><div>DATE<strong>2026. 07. 13 – 17</strong></div><div>VENUE<strong>JDM 훈련 센터 · 대전 비전센터</strong></div></div>
        <a className="anchor-cta" href="#program">프로그램 자세히 보기 ↘</a>
      </section>

      <section className="section" id="story"><div className="section-head"><span className="section-no">01 / STORY</span><div><p className="eyebrow">A LIVING HERITAGE</p><h2>한 사람을 세우는 일은<br />세계를 움직입니다.</h2></div></div><p className="intro-copy">ISTS는 세계 각지의 현지 간사들이 한자리에 모여 배우고, 나누고, 다시 파송되는 제자도 학교입니다. 1977년 시작된 JDM의 정신은 사람을 통해 이어지고 있습니다.</p><div className="timeline"><div className="year-list" role="list" aria-label="ISTS 연혁">{history.map((item) => <button key={item.year} type="button" aria-pressed={selectedYear === item.year} onClick={() => setSelectedYear(item.year)}>{item.year}</button>)}</div><article className="timeline-story"><strong>{activeHistory.year}</strong><h3>{activeHistory.title}</h3><p>{activeHistory.text}</p></article></div></section>

      <section className="section" id="purpose"><div className="section-head"><span className="section-no">02 / WHY</span><div><p className="eyebrow">WHY WE GATHER</p><h2>다섯 가지 이유로<br />우리는 다시 만납니다.</h2></div></div><div className="purpose-grid">{purposes.map((purpose) => <article className="purpose-card" key={purpose.number}><b>{purpose.number}</b><h3>{purpose.title}</h3><p>{purpose.text}</p></article>)}</div></section>

      <section className="section"><div className="section-head"><span className="section-no">03 / TOGETHER</span><div><p className="eyebrow">THE PEOPLE</p><h2>다른 언어, 같은<br />마음의 방향.</h2></div></div><div className="photo-mosaic">{photos.map((photo) => <figure className="photo" key={photo.src}><img src={photo.src} alt={photo.alt} style={{ "--position": photo.position } as React.CSSProperties} /><figcaption>{photo.caption}</figcaption></figure>)}</div><div className="stats">{stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span><small>{stat.detail}</small></div>)}</div></section>

       <section className="section"><div className="feature"><article className="feature-copy"><p className="eyebrow">06TH ISTS · 2026</p><h2>여섯 번째 학교,<br />다시 사람을 세우다.</h2><p>모임을 시작하고, 사람을 일으키고, 또 다른 리더를 세우는 현지 간사들. 여섯 번째 ISTS는 그들의 오늘을 축하하고 내일을 준비합니다.</p></article><aside className="feature-mark infographic-card"><div><p className="micro">THE CYCLE OF DISCIPLESHIP</p><h2>현지 사령관을 키우는 재생산의 산실</h2><div className="flow">사람 → 훈련<br />↓<br />관계 → 재생산</div><b>한 사람의 성장이<br />다음 세대의 시작입니다.</b><div className="infographic-stats">{stats.slice(1).map((stat) => <div key={stat.label}><strong>{stat.value}</strong><small>{stat.label}<br />{stat.detail}</small></div>)}</div><small>6TH ISTS · 2026</small></div></aside></div></section>

       <section className="section source-details"><div className="section-head"><span className="section-no">03 / SOURCE</span><div><p className="eyebrow">THE MANUSCRIPT</p><h2>한 주의 사람과<br />현장을 더 자세히.</h2></div></div><div className="details-grid">
         <details><summary>참가자 20명 상세 보기</summary><div className="detail-table"><table><thead><tr><th>나라</th><th>이름</th><th>English name</th><th>성별</th><th>생년월일</th><th>나이</th><th>직분</th></tr></thead><tbody>{participants.map((person) => <tr key={person.english}><td>{person.country}</td><td>{person.name}</td><td>{person.english}</td><td>{person.gender}</td><td>{person.birth}</td><td>{person.age}</td><td>{person.role}</td></tr>)}</tbody></table></div></details>
         <details><summary>전체 일일 일정 보기</summary><div className="detail-table"><table><thead><tr><th>시간</th><th>13일 · 월</th><th>14일 · 화</th><th>15일 · 수</th><th>16일 · 목</th><th>17일 · 금</th></tr></thead><tbody>{fullSchedule.map((row) => <tr key={row[0]}>{row.map((item, index) => index === 0 ? <th key={item}>{item}</th> : <td key={`${row[0]}-${index}`}>{item || "-"}</td>)}</tr>)}</tbody></table></div></details>
         <details><summary>프로그램 기여자와 현지 사역 보기</summary><div className="source-copy"><ul>{contributors.map((person) => <li key={person}>{person}</li>)}</ul><p><strong>현지사역 소개 10개:</strong> {fieldMinistry.join(" · ")}</p><p>모임 선교 사역이 없는 5개국의 해외 선교사들이 특강 시간에 사역과 협력 요청사항을 나눕니다.</p><p><strong>예배:</strong> 시작 예배 서관옥 선교사 · 마침 예배 최민철 선교사</p><p><strong>교제:</strong> 목요채플 장제니스 간사 · Outing 춘천지구 · 서울(양화진)</p></div></details>
       </div></section>

       <section className="section program" id="program"><div className="section-head"><span className="section-no">04 / PROGRAM</span><div><p className="eyebrow">A WEEK TO REMEMBER</p><h2>배움과 나눔이<br />일상이 되는 5일.</h2></div></div><div className="day-tabs" role="tablist" aria-label="일정 선택">{days.map((day) => <button id={`tab-${day.id}`} key={day.id} type="button" role="tab" aria-selected={selectedDay === day.id} aria-controls={`panel-${day.id}`} onClick={() => setSelectedDay(day.id)}><strong>{day.label}</strong><small>{day.date}</small></button>)}</div>{days.map((day) => <div id={`panel-${day.id}`} key={day.id} className="day-schedule" role="tabpanel" aria-labelledby={`tab-${day.id}`} aria-live="polite" hidden={selectedDay !== day.id}>{day.items.map((item, index) => <div key={`${day.id}-${item}`}><span>0{index + 1} / {day.date}</span>{item}</div>)}</div>)}<div className="program-grid">{programs.map((program, index) => { const isOpen = openProgram === index; return <article className="program-card" key={program.tag}><p className="micro">{program.tag}</p><h3>{program.title}</h3><p>{program.text}</p><button type="button" aria-expanded={isOpen} onClick={() => setOpenProgram(isOpen ? null : index)}>{isOpen ? "내용 접기 ↑" : "자세히 보기 ↓"}</button>{isOpen && <ul className="program-details">{program.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</article>; })}</div></section>

      <section className="section closing" id="support"><p className="eyebrow">SEND THEM WELL</p><h2>함께 기도하고,<br />함께 보내주세요.</h2><p>한 사람의 배움이 한 나라의 변화가 됩니다. 2026년 7월, 세계의 현지 간사들이 다시 일어설 수 있도록 기도와 후원으로 함께해 주세요.</p><a className="anchor-cta" href="#top">ISTS를 위해 함께하기 ↗</a></section>
       <footer className="site-footer"><strong>ISTS · 2026</strong><span>AI시대, 흔들리지 않는 비전 · 재생산 사역</span><span>JDM</span></footer>
      </div>
    </main>
  );
}
