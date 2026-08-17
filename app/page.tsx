"use client";

import { useEffect, useRef, useState } from "react";

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
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=85", alt: "함께 웃는 국제 공동체", caption: "우리는 혼자 걷지 않습니다", position: "center" },
  { src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=85", alt: "서로 대화하는 공동체 사람들", caption: "경계를 넘어 듣고 나누는 시간", position: "center" },
  { src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=900&q=85", alt: "손을 맞잡고 배우는 사람들", caption: "사람이 사람을 세웁니다", position: "center" },
  { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85", alt: "함께 여행하며 걷는 사람들", caption: "각자의 자리로 다시", position: "center" },
  { src: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=900&q=85", alt: "함께 기도하는 사람들", caption: "기도로 서로를 보냅니다", position: "center" },
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
const budget = [
  ["수입", "6,000,000원"],
  ["지출", "6,000,000원"],
  ["식비", "3,250,000원"],
  ["장소", "1,000,000원"],
  ["활동", "1,000,000원"],
  ["사무", "100,000원"],
  ["진행", "100,000원"],
  ["관리", "100,000원"],
  ["간식", "200,000원"],
  ["예비비", "250,000원"],
] as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedDay, setSelectedDay] = useState("mon");
  const [openProgram, setOpenProgram] = useState<number | null>(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dayTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeHistory = history.find((item) => item.year === selectedYear) ?? history[0];

  useEffect(() => {
    if (!menuOpen) return;

    const handleMenuKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [menuOpen]);

  const handleDayKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % days.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + days.length) % days.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = days.length - 1;
    if (nextIndex === index) return;

    event.preventDefault();
    setSelectedDay(days[nextIndex].id);
    dayTabRefs.current[nextIndex]?.focus();
  };

  return (
    <main className="editorial-shell">
      <header className="site-header">
        <a className="brand" href="#top">ISTS<small>INTERNATIONAL STAFF TRAINING & SHARING</small></a>
        <nav id="mobile-navigation" className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="주요 메뉴">
          <a href="#story" onClick={() => setMenuOpen(false)}>OUR STORY</a><a href="#purpose" onClick={() => setMenuOpen(false)}>PURPOSE</a><a href="#program" onClick={() => setMenuOpen(false)}>PROGRAM</a><a href="#support" onClick={() => setMenuOpen(false)}>SUPPORT</a>
        </nav>
        <button ref={menuButtonRef} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>MENU</button>
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

       <section className="section"><div className="section-head"><span className="section-no">03 / TOGETHER</span><div><p className="eyebrow">THE PEOPLE</p><h2>다른 언어, 같은<br />마음의 방향.</h2></div></div><div className="photo-mosaic">{photos.slice(1).map((photo) => <figure className="photo" key={photo.src}><img src={photo.src} alt={photo.alt} style={{ "--position": photo.position } as React.CSSProperties} /><figcaption>{photo.caption}</figcaption></figure>)}</div><div className="stats">{stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span><small>{stat.detail}</small></div>)}</div></section>

       <section className="section"><div className="feature"><article className="feature-copy"><p className="eyebrow">06TH ISTS · 2026</p><h2>여섯 번째 학교,<br />다시 사람을 세우다.</h2><p>모임을 시작하고, 사람을 일으키고, 또 다른 리더를 세우는 현지 간사들. 여섯 번째 ISTS는 그들의 오늘을 축하하고 내일을 준비합니다.</p></article><aside className="feature-mark infographic-card"><div><p className="micro">THE CYCLE OF DISCIPLESHIP</p><h2>현지 사령관을 키우는 재생산의 산실</h2><div className="flow">사람 → 훈련<br />↓<br />관계 → 재생산</div><b>한 사람의 성장이<br />다음 세대의 시작입니다.</b><div className="infographic-stats">{stats.slice(1).map((stat) => <div key={stat.label}><strong>{stat.value}</strong><small>{stat.label}<br />{stat.detail}</small></div>)}</div><small>6TH ISTS · 2026</small></div></aside></div></section>

       <section className="section source-details"><div className="section-head"><span className="section-no">03 / SOURCE</span><div><p className="eyebrow">THE MANUSCRIPT</p><h2>한 주의 사람과<br />현장을 더 자세히.</h2></div></div><div className="details-grid">
         <details><summary>참가자 20명 상세 보기</summary><div className="detail-table"><table><thead><tr><th>나라</th><th>이름</th><th>English name</th><th>성별</th><th>생년월일</th><th>나이</th><th>직분</th></tr></thead><tbody>{participants.map((person) => <tr key={person.english}><td>{person.country}</td><td>{person.name}</td><td>{person.english}</td><td>{person.gender}</td><td>{person.birth}</td><td>{person.age}</td><td>{person.role}</td></tr>)}</tbody></table></div></details>
          <details><summary>전체 일일 일정 보기</summary><div className="detail-table"><table><thead><tr><th>시간</th><th>13일 · 월</th><th>14일 · 화</th><th>15일 · 수</th><th>16일 · 목</th><th>17일 · 금</th></tr></thead><tbody>{fullSchedule.map((row) => <tr key={row[0]}>{row.map((item, index) => index === 0 ? <th key={item}>{item}</th> : <td key={`${row[0]}-${index}`}>{item || "-"}</td>)}</tr>)}</tbody></table></div></details>
          <details><summary>프로그램 기여자와 현지 사역 보기</summary><div className="source-copy"><ul>{contributors.map((person) => <li key={person}>{person}</li>)}</ul><p><strong>현지사역 소개 10개:</strong> {fieldMinistry.join(" · ")}</p><p>모임 선교 사역이 없는 5개국의 해외 선교사들이 특강 시간에 사역과 협력 요청사항을 나눕니다.</p><p><strong>예배:</strong> 시작 예배 서관옥 선교사 · 마침 예배 최민철 선교사</p><p><strong>교제:</strong> 목요채플 장제니스 간사 · Outing 춘천지구 · 서울(양화진)</p></div></details>
          <details><summary>원고 예산 상세 보기</summary><div className="detail-table"><table><thead><tr><th>항목</th><th>금액</th></tr></thead><tbody>{budget.map(([label, amount]) => <tr key={label}><th>{label}</th><td>{amount}</td></tr>)}</tbody></table><p className="source-copy">식비 산출 근거: 10,000원 × 13끼 × 25명</p></div></details>
        </div></section>

       <section className="section program" id="program"><div className="section-head"><span className="section-no">04 / PROGRAM</span><div><p className="eyebrow">A WEEK TO REMEMBER</p><h2>배움과 나눔이<br />일상이 되는 5일.</h2></div></div><div className="day-tabs" role="tablist" aria-label="일정 선택">{days.map((day, index) => <button ref={(element) => { dayTabRefs.current[index] = element; }} id={`tab-${day.id}`} key={day.id} type="button" role="tab" tabIndex={selectedDay === day.id ? 0 : -1} aria-selected={selectedDay === day.id} aria-controls={`panel-${day.id}`} onClick={() => setSelectedDay(day.id)} onKeyDown={(event) => handleDayKeyDown(event, index)}><strong>{day.label}</strong><small>{day.date}</small></button>)}</div>{days.map((day) => <div id={`panel-${day.id}`} key={day.id} className="day-schedule" role="tabpanel" aria-labelledby={`tab-${day.id}`} aria-live="polite" hidden={selectedDay !== day.id}>{day.items.map((item, index) => <div key={`${day.id}-${item}`}><span>0{index + 1} / {day.date}</span>{item}</div>)}</div>)}<div className="program-grid">{programs.map((program, index) => { const isOpen = openProgram === index; return <article className="program-card" key={program.tag}><p className="micro">{program.tag}</p><h3>{program.title}</h3><p>{program.text}</p><button type="button" aria-expanded={isOpen} onClick={() => setOpenProgram(isOpen ? null : index)}>{isOpen ? "내용 접기 ↑" : "자세히 보기 ↓"}</button>{isOpen && <ul className="program-details">{program.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</article>; })}</div></section>

       <section className="section closing" id="support"><p className="eyebrow">SEND THEM WELL</p><h2>함께 기도하고,<br />함께 보내주세요.</h2><p>한 사람의 배움이 한 나라의 변화가 됩니다. 2026년 7월, 세계의 현지 간사들이 다시 일어설 수 있도록 기도와 후원으로 함께해 주세요.</p><a className="anchor-cta" href="#program">프로그램 자세히 보기</a></section>
       <footer className="site-footer"><strong>ISTS · 2026</strong><span>AI시대, 흔들리지 않는 비전 · 재생산 사역</span><span>JDM</span></footer>
      </div>
    </main>
  );
}
