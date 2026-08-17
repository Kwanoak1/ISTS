type Participant = {
  country: string;
  name: string;
  english: string;
  gender: string;
  birth: string;
  age: number;
  role: string;
};

const participants: Participant[] = [
  ["세네갈", "디욘무싸", "Ndion Moussa", "남", "1990.02.26", 36, "사역"],
  ["세네갈", "이브라히마", "Adidara Ibrahima", "남", "1984.09.04", 42, "사역"],
  ["세네갈", "로갸이", "LO Gaye", "여", "1990.02.24", 36, "사역"],
  ["우즈베키스탄", "장바울", "TYAN PAVEL", "남", "1979.10.04", 47, "사역"],
  ["우즈베키스탄", "조스베따", "DYO SVETLANA", "여", "1981.01.21", 45, "협동"],
  ["우즈베키스탄", "장제니스", "TYAN DENIS", "남", "1979.01.04", 47, "사역"],
  ["카메룬", "시몽 삐에르", "Simon Pierre", "남", "1990.09.07", 36, "사역"],
  ["카메룬", "도날 은톨로", "Donald Ntolo", "남", "1992.10.20", 34, "사역"],
  ["태국 · 방콕", "누이", "SOMKID, CHAMNANWONG", "여", "1999.01.30", 27, "워커"],
  ["태국 · 우본", "허예지", "Heo yeji", "여", "1997.12.31", 29, "사역"],
  ["태국 · 우본", "빠우", "Patchara Mongkol", "남", "1997.04.21", 29, "사역"],
  ["태국 · 우본", "말리", "Maliwan Buaboo", "여", "1996.06.03", 30, "협동"],
  ["태국 · 치앙라이", "낸", "NAN", "여", "2000.11.06", 26, "사역"],
  ["필리핀", "알란", "Allan Tan Raya", "남", "1980.04.19", 46, "사역"],
  ["필리핀", "케니", "Kyne Joy Santos Raya", "여", "1979.07.23", 47, "사역"],
  ["필리핀", "켄", "Kenn Butch Cadosales Restificar", "여", "1987.12.17", 39, "사역"],
  ["필리핀", "조이", "Rowela Joy Papaya Ruiz", "여", "1986.09.11", 40, "사역"],
  ["필리핀", "월린", "Werlyn Royo Yap", "여", "2000.04.19", 26, "사역"],
  ["필리핀", "빅터", "Victor Hamili Alinsunurin", "남", "1996.05.14", 30, "협동"],
  ["필리핀", "조날린", "Jonalyn Garciano Nalzaro", "여", "1985.10.21", 41, "협동"],
].map(([country, name, english, gender, birth, age, role]) => ({ country, name, english, gender, birth, age, role } as Participant));

const schedule = [
  ["07:00–08:00", "", "Q·T", "Q·T", "Q·T", "Q·T"],
  ["08:00–09:00", "", "아침 식사", "아침 식사", "아침 식사", "아침 식사"],
  ["09:00–10:30", "", "모임론 1–4", "모임론 1–4", "모임론 1–4", "모임론 1–4"],
  ["10:30–12:00", "", "현지사역 소개 3·4", "현지사역 소개 7·8", "현지사역 소개", "마침 예배"],
  ["12:00–13:30", "", "점심 식사", "점심 식사", "점심 식사", "점심 식사"],
  ["13:30–15:00", "시작 예배", "GD 1·2", "GD 1·2", "Outing", ""],
  ["15:00–17:00", "", "간사론 1–3", "간사론 1–3", "Outing", ""],
  ["17:00–19:00", "저녁 식사", "저녁 식사", "저녁 식사", "저녁 식사", ""],
  ["19:00–20:30", "현지사역 소개 1·2", "현지사역 소개 5·6", "현지사역 소개 9·10", "목요채플", ""],
  ["20:30–22:00", "조별 모임", "조별 모임", "조별 모임", "조별 모임", ""],
  ["22:00", "취침", "취침", "취침", "취침", ""],
];

const fieldMinistry = [
  ["01", "세네갈"], ["02", "카메룬"], ["03", "우즈벡"], ["04", "태국 · 방콕"], ["05", "태국 · 치앙라이"],
  ["06", "태국 · 우본"], ["07", "필리핀 · 앙겔레스"], ["08", "필리핀 · 다바오"], ["09", "독일 · 프랑크푸르트"], ["10", "캐나다 · 밴쿠버"],
];

const staff = [
  ["총무", "서관옥 선교사"], ["진행", "김인호 선교사 · 시몽 간사 · 박찬묵 간사"], ["사무", "허예지 간사"],
  ["재정", "최민철 선교사"], ["관리", "박지훈 간사"], ["찬양", "태국 간사들"], ["촬영 및 영상", "박찬묵 간사"],
];

const budget = [
  ["식비", "3,250,000원", "10,000원 × 13끼 × 25명 (참가자 및 운영진)"], ["장소 사용료", "1,000,000원", ""],
  ["활동비", "1,000,000원", "캠퍼스 탐방·전도, 차량 대여 및 연료비, 지구 탐방 지원"], ["사무비", "100,000원", ""],
  ["진행비", "100,000원", ""], ["관리비", "100,000원", ""], ["간식비", "200,000원", ""], ["예비비", "250,000원", ""],
];

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <div className="section-heading"><span className="section-number">{number}</span><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div></div>;
}

export default function Home() {
  return (
    <main className="document-shell">
      <section className="cover page-break-after">
        <div className="cover-top"><span>JDM · INTERNATIONAL TRAINING & SHARING</span><span>01 / 07</span></div>
        <div className="cover-content">
          <p className="cover-kicker">2026 INTERNATIONAL TRAINING & SHARING</p>
          <h1>2026<br /><em>ISTS</em> 계획서</h1>
          <div className="cover-rule" />
          <p className="cover-theme">AI시대, 흔들리지 않는 비전<br /><strong>재생산 사역</strong></p>
          <div className="cover-meta"><div><small>기간</small><strong>2026. 07. 13 – 17</strong></div><div><small>장소</small><strong>JDM 훈련 센터 · 대전 비전센터</strong></div></div>
        </div>
        <div className="cover-footer"><span>작성자</span><strong>서관옥 · 최민철 · 김인호 선교사</strong></div>
      </section>

      <section className="section overview">
        <SectionHeading number="01" eyebrow="WHY WE GATHER" title="목적과 요람" />
        <div className="purpose-grid">
          {["급변하는 AI 시대에도 변함없는 부르심을 확인한다.", "모임 정신과 역사를 배우고 각 나라의 모임 사역을 공유한다.", "재생산의 현장인 국내 모임을 탐방하고 해외 간사들의 사역을 격려한다.", "해외 간사들이 모임 안에서 한 가족임을 누리는 시간을 갖는다."].map((text, index) => <div className="purpose-card" key={text}><span>0{index + 1}</span><p>{text}</p></div>)}
        </div>
        <div className="facts-grid">
          <div><small>대상</small><strong>5개국 · 20명의<br />현지 간사</strong></div><div><small>훈련자</small><strong>대표 · 모임 선교사<br />현지 시니어 간사</strong></div><div><small>숙박</small><strong>JDM 본부</strong></div>
        </div>
      </section>

      <section className="section page-break-before">
        <SectionHeading number="02" eyebrow="PEOPLE" title="참가자 명단" />
        <p className="section-lead">다섯 나라에서 모인 20명의 현지 간사와 함께 배우고, 나누고, 다시 파송됩니다.</p>
        <div className="table-wrap"><table className="participants-table"><thead><tr><th>나라</th><th>이름</th><th>English name</th><th>성별</th><th>생년월일</th><th>나이</th><th>직분</th></tr></thead><tbody>{participants.map((person) => <tr key={person.english}><td>{person.country}</td><td className="strong">{person.name}</td><td className="latin">{person.english}</td><td>{person.gender}</td><td className="latin">{person.birth}</td><td>{person.age}</td><td><span className="role-pill">{person.role}</span></td></tr>)}</tbody></table></div>
      </section>

      <section className="section schedule-section page-break-before">
        <SectionHeading number="03" eyebrow="WEEK AT A GLANCE" title="전체 일정" />
        <p className="section-lead">배움과 나눔, 예배와 교제가 균형을 이루는 5일간의 여정입니다.</p>
        <div className="table-wrap"><table className="schedule-table"><thead><tr><th>시간</th><th>13일 · 월</th><th>14일 · 화</th><th>15일 · 수</th><th>16일 · 목</th><th>17일 · 금</th></tr></thead><tbody>{schedule.map((row) => <tr key={row[0]}><th>{row[0]}</th>{row.slice(1).map((item, index) => <td className={item ? `schedule-${index + 1}` : "empty"} key={`${row[0]}-${index}`}>{item}</td>)}</tr>)}</tbody></table></div>
      </section>

      <section className="section page-break-before">
        <SectionHeading number="04" eyebrow="PROGRAM" title="프로그램 상세" />
        <div className="program-grid">
          <article className="program-card featured"><div className="program-card-top"><span>4T</span><small>모임론 강의</small></div><h3>모임의 역사와<br />재생산의 비전</h3><ol><li>JDM 사역자의 연구와 자기계발 <b>엄상섭 목사</b></li><li>JDM 선교 역사 <b>손귀연 목사</b></li><li>JDM 재생산 사역 <b>서관옥 선교사</b></li><li>JDM의 비전 성취 <b>윤태호 목사</b></li></ol></article>
          <article className="program-card"><div className="program-card-top"><span>3T</span><small>간사론 강의 및 토의</small></div><h3>간사의 소명과<br />팀 사역</h3><ol><li>간사의 소명과 헌신 <b>케니 · 조이</b></li><li>간사의 성장과 발전 <b>껫 간사</b></li><li>현지 간사와 선교사의 팀 사역 <b>알란</b></li></ol></article>
          <article className="program-card"><div className="program-card-top"><span>GD</span><small>교안작성 · 2T</small></div><h3>함께 만드는<br />재생산의 교안</h3><p>최민철 선교사의 안내로 알란, 케니, 켄, 조이가 함께 교안을 작성합니다.</p></article>
        </div>
        <div className="ministry-block"><div className="subheading"><span>10T</span><h3>현지사역 소개</h3><p>각 나라에서 일어나는 재생산의 현장을 공유합니다.</p></div><div className="ministry-list">{fieldMinistry.map(([number, country]) => <div key={number}><span>{number}</span><strong>{country}</strong></div>)}</div></div>
        <div className="sharing-note"><span className="quote-mark">“</span><div><h3>모임 선교 사역 나눔</h3><p>현지 간사들이 없는 5개국의 해외 선교사들이 선지세 기간의 특강 시간에 사역을 소개하고 협력 요청사항을 나눕니다.</p></div></div>
      </section>

      <section className="section page-break-before">
        <SectionHeading number="05" eyebrow="PEOPLE BEHIND THE WEEK" title="운영과 섬김" />
        <div className="staff-grid">{staff.map(([role, name]) => <div className="staff-card" key={role}><small>{role}</small><strong>{name}</strong></div>)}</div>
        <div className="other-programs"><div><span className="mini-label">예배</span><p>시작 예배 <strong>서관옥 선교사</strong> · 마침 예배 <strong>최민철 선교사</strong></p></div><div><span className="mini-label">경건의 시간</span><p>화 세네갈 로갸이 · 수 카메룬 도날 · 목 우즈벡 장바울 · 금 태국 빠우</p></div><div><span className="mini-label">교제</span><p>목요채플 <strong>장제니스 간사</strong> · Outing <strong>춘천지구 · 서울(양화진)</strong></p></div></div>
      </section>

      <section className="section budget-section page-break-before">
        <SectionHeading number="06" eyebrow="BUDGET" title="예산안" />
        <div className="budget-summary"><div><small>수입</small><strong>6,000,000원</strong></div><div><small>지출</small><strong>6,000,000원</strong></div><div><small>식비 기준</small><strong>25명 · 13끼</strong></div></div>
        <div className="table-wrap"><table className="budget-table"><thead><tr><th>항목</th><th>금액</th><th>산출 및 비고</th></tr></thead><tbody>{budget.map(([item, amount, note]) => <tr key={item}><td className="strong">{item}</td><td className="amount">{amount}</td><td>{note || "-"}</td></tr>)}</tbody><tfoot><tr><th>총 지출</th><th>6,000,000원</th><td>행사 운영을 위한 총 예산</td></tr></tfoot></table></div>
      </section>

      <footer className="document-footer"><strong>2026 ISTS</strong><span>AI시대, 흔들리지 않는 비전 · 재생산 사역</span><span>JDM</span></footer>
    </main>
  );
}
