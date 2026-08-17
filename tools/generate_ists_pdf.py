from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether
)

OUT = "public/2026-ISTS-plan.pdf"
FONT = "Malgun"
pdfmetrics.registerFont(TTFont(FONT, r"C:\Windows\Fonts\malgun.ttf"))

NAVY = colors.HexColor("#12243A")
NAVY2 = colors.HexColor("#1D3852")
GOLD = colors.HexColor("#C99B54")
CREAM = colors.HexColor("#F5F3EE")
INK = colors.HexColor("#1D252D")
MUTED = colors.HexColor("#66727C")
LINE = colors.HexColor("#DCE1E3")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="CoverKicker", fontName=FONT, fontSize=10, leading=14, textColor=GOLD, spaceAfter=18))
styles.add(ParagraphStyle(name="CoverTitle", fontName=FONT, fontSize=42, leading=44, textColor=colors.white, spaceAfter=20))
styles.add(ParagraphStyle(name="CoverTheme", fontName=FONT, fontSize=15, leading=25, textColor=colors.HexColor("#E9EDF0"), spaceAfter=30))
styles.add(ParagraphStyle(name="CoverMeta", fontName=FONT, fontSize=10, leading=16, textColor=colors.white))
styles.add(ParagraphStyle(name="SectionNo", fontName=FONT, fontSize=10, leading=12, textColor=GOLD))
styles.add(ParagraphStyle(name="Eyebrow", fontName=FONT, fontSize=8, leading=11, textColor=GOLD, spaceAfter=3))
styles.add(ParagraphStyle(name="SectionTitle", fontName=FONT, fontSize=25, leading=30, textColor=NAVY, spaceAfter=18))
styles.add(ParagraphStyle(name="Body", fontName=FONT, fontSize=9.5, leading=17, textColor=INK))
styles.add(ParagraphStyle(name="Small", fontName=FONT, fontSize=8, leading=12, textColor=MUTED))
styles.add(ParagraphStyle(name="Table", fontName=FONT, fontSize=7.5, leading=11, textColor=INK))
styles.add(ParagraphStyle(name="TableWhite", fontName=FONT, fontSize=7.5, leading=11, textColor=colors.white))
styles.add(ParagraphStyle(name="CardTitle", fontName=FONT, fontSize=13, leading=18, textColor=NAVY, spaceAfter=8))

def P(text, style="Body"):
    return Paragraph(text, styles[style])

def section(number, eyebrow, title):
    return [Table([[P(number, "SectionNo"), [P(eyebrow, "Eyebrow"), P(title, "SectionTitle")]]], colWidths=[15*mm, 150*mm], style=TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 0), ("RIGHTPADDING", (0,0), (-1,-1), 0), ("TOPPADDING", (0,0), (-1,-1), 0), ("BOTTOMPADDING", (0,0), (-1,-1), 0)])), Spacer(1, 4*mm)]

def styled_table(data, widths, header=True, small=False):
    t = Table(data, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [("FONTNAME", (0,0), (-1,-1), FONT), ("FONTSIZE", (0,0), (-1,-1), 7.5 if small else 8.5), ("LEADING", (0,0), (-1,-1), 11), ("GRID", (0,0), (-1,-1), .35, LINE), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("LEFTPADDING", (0,0), (-1,-1), 7), ("RIGHTPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 7), ("BOTTOMPADDING", (0,0), (-1,-1), 7)]
    if header:
        commands += [("BACKGROUND", (0,0), (-1,0), NAVY), ("TEXTCOLOR", (0,0), (-1,0), colors.white), ("FONTNAME", (0,0), (-1,0), FONT)]
        for row in range(1, len(data)):
            if row % 2 == 0: commands.append(("BACKGROUND", (0,row), (-1,row), colors.HexColor("#FAFAF7")))
    t.setStyle(TableStyle(commands))
    return t

def header_footer(canvas, doc):
    canvas.saveState()
    if doc.page > 1:
        canvas.setStrokeColor(LINE); canvas.line(18*mm, 286*mm, 192*mm, 286*mm)
        canvas.setFont(FONT, 7); canvas.setFillColor(MUTED); canvas.drawString(18*mm, 291*mm, "2026 ISTS  ·  INTERNATIONAL TRAINING & SHARING")
        canvas.drawRightString(192*mm, 10*mm, f"{doc.page:02d}")
    canvas.restoreState()

doc = BaseDocTemplate(OUT, pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=22*mm, bottomMargin=18*mm, title="2026 ISTS 계획서")
doc.addPageTemplates([PageTemplate(id="normal", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="content")], onPage=header_footer)])
story = []

# Cover
story += [Spacer(1, 25*mm), P("2026 INTERNATIONAL TRAINING & SHARING", "CoverKicker"), P("2026<br/><b>ISTS</b> 계획서", "CoverTitle"), Spacer(1, 6*mm), P("AI시대, 흔들리지 않는 비전<br/><b>재생산 사역</b>", "CoverTheme"), Spacer(1, 42*mm), P("기간  ·  2026년 7월 13일(월) 14:00 – 17일(금) 12:00<br/>장소  ·  JDM 훈련 센터, 대전 비전센터<br/>대상  ·  5개국 20명의 현지 간사", "CoverMeta"), Spacer(1, 50*mm), P("작성자  ·  서관옥 · 최민철 · 김인호 선교사", "CoverMeta"), PageBreak()]

# Overview
story += section("01", "WHY WE GATHER", "목적과 요람")
purposes = ["급변하는 AI 시대에도 변함없는 부르심을 확인한다.", "모임 정신과 역사를 배우고 각 나라의 모임 사역을 공유한다.", "재생산의 현장인 국내 모임을 탐방하고 해외 간사들의 사역을 격려한다.", "해외 간사들이 모임 안에서 한 가족임을 누리는 시간을 갖는다."]
story.append(styled_table([[P(f"0{i+1}", "SectionNo"), P(text)] for i, text in enumerate(purposes)], [16*mm, 154*mm], header=False))
story += [Spacer(1, 10*mm), styled_table([[P("대상", "TableWhite"), P("훈련자", "TableWhite"), P("숙박", "TableWhite")], [P("5개국 · 20명의 현지 간사"), P("대표 · 모임 선교사 · 현지 시니어 간사"), P("JDM 본부")]], [58*mm, 58*mm, 54*mm])]
story.append(PageBreak())

# Participants
story += section("02", "PEOPLE", "참가자 명단")
rows = [[P(x, "TableWhite") for x in ["나라", "이름", "English name", "성별", "생년월일", "나이", "직분"]]]
participants = [
    ["세네갈", "디욘무싸", "Ndion Moussa", "남", "1990.02.26", "36", "사역"], ["세네갈", "이브라이마", "Adidara Ibrahima", "남", "1984.09.04", "42", "사역"], ["세네갈", "로갸이", "LO Gaye", "여", "1990.02.24", "36", "사역"], ["우즈베키스탄", "장바울", "TYAN PAVEL", "남", "1979.10.04", "47", "사역"], ["우즈베키스탄", "조스베따", "DYO SVETLANA", "여", "1981.01.21", "45", "협동"], ["우즈베키스탄", "장제니스", "TYAN DENIS", "남", "1979.01.04", "47", "사역"], ["카메룬", "시몽 삐에르", "Simon Pierre", "남", "1990.09.07", "36", "사역"], ["카메룬", "도날 은톨로", "Donald Ntolo", "남", "1992.10.20", "34", "사역"], ["태국 · 방콕", "누이", "SOMKID, CHAMNANWONG", "여", "1999.01.30", "27", "워커"], ["태국 · 우본", "허예지", "Heo yeji", "여", "1997.12.31", "29", "사역"], ["태국 · 우본", "빠우", "Patchara Mongkol", "남", "1997.04.21", "29", "사역"], ["태국 · 우본", "말리", "Maliwan Buaboo", "여", "1996.06.03", "30", "협동"], ["태국 · 치앙라이", "낸", "NAN", "여", "2000.11.06", "26", "사역"], ["필리핀", "알란", "Allan Tan Raya", "남", "1980.04.19", "46", "사역"], ["필리핀", "케니", "Kyne Joy Santos Raya", "여", "1979.07.23", "47", "사역"], ["필리핀", "켄", "Kenn Butch Cadosales Restificar", "여", "1987.12.17", "39", "사역"], ["필리핀", "조이", "Rowela Joy Papaya Ruiz", "여", "1986.09.11", "40", "사역"], ["필리핀", "월린", "Werlyn Royo Yap", "여", "2000.04.19", "26", "사역"], ["필리핀", "빅터", "Victor Hamili Alinsunurin", "남", "1996.05.14", "30", "협동"], ["필리핀", "조날린", "Jonalyn Garciano Nalzaro", "여", "1985.10.21", "41", "협동"],
]
rows += [[P(x, "Table") for x in row] for row in participants]
story.append(styled_table(rows, [27*mm, 24*mm, 52*mm, 13*mm, 27*mm, 12*mm, 16*mm], small=True))
story.append(PageBreak())

# Schedule and programs
story += section("03", "WEEK AT A GLANCE", "전체 일정")
schedule = [["시간", "13일 · 월", "14일 · 화", "15일 · 수", "16일 · 목", "17일 · 금"], ["07:00–08:00", "", "Q·T", "Q·T", "Q·T", "Q·T"], ["08:00–09:00", "", "아침 식사", "아침 식사", "아침 식사", "아침 식사"], ["09:00–10:30", "", "모임론 1–4", "모임론 1–4", "모임론 1–4", "모임론 1–4"], ["10:30–12:00", "", "현지사역 소개 3·4", "현지사역 소개 7·8", "현지사역 소개", "마침 예배"], ["12:00–13:30", "", "점심 식사", "점심 식사", "점심 식사", "점심 식사"], ["13:30–15:00", "시작 예배", "GD 1·2", "GD 1·2", "Outing", ""], ["15:00–17:00", "", "간사론 1–3", "간사론 1–3", "Outing", ""], ["17:00–19:00", "저녁 식사", "저녁 식사", "저녁 식사", "저녁 식사", ""], ["19:00–20:30", "현지사역 소개 1·2", "현지사역 소개 5·6", "현지사역 소개 9·10", "목요채플", ""], ["20:30–22:00", "조별 모임", "조별 모임", "조별 모임", "조별 모임", ""], ["22:00", "취침", "취침", "취침", "취침", ""]]
story.append(styled_table([[P(x, "TableWhite") for x in schedule[0]]] + [[P(x, "Table") for x in row] for row in schedule[1:]], [25*mm, 29*mm, 29*mm, 29*mm, 29*mm, 29*mm], small=True))
story.append(PageBreak())
story += section("04", "PROGRAM", "프로그램 상세")
programs = [[P("모임론 강의 · 4T", "CardTitle"), P("GD · 2T", "CardTitle"), P("간사론 강의 및 토의 · 3T", "CardTitle")], [P("모임의 역사와 재생산의 비전<br/><br/>1. JDM 사역자의 연구와 자기계발 · 엄상섭 목사<br/>2. JDM 선교 역사 · 손귀연 목사<br/>3. JDM 재생산 사역 · 서관옥 선교사<br/>4. JDM의 비전 성취 · 윤태호 목사"), P("최민철 선교사의 안내로 알란, 케니, 켄, 조이가 함께 재생산 사역 교안을 작성합니다."), P("1. 간사의 소명과 헌신 · 케니, 조이<br/>2. 간사의 성장과 발전 · 껫 간사<br/>3. 현지 간사와 선교사의 팀 사역 · 알란")]]
story.append(styled_table(programs, [58*mm, 54*mm, 58*mm], header=False))
story += [Spacer(1, 10*mm), P("현지사역 소개 · 10T", "CardTitle"), P("세네갈 · 카메룬 · 우즈벡 · 태국(방콕, 치앙라이, 우본) · 필리핀(앙겔레스, 다바오) · 독일(프랑크푸르트) · 캐나다(밴쿠버)", "Body"), Spacer(1, 7*mm), P("모임 선교 사역 나눔", "CardTitle"), P("현지 간사들이 없는 5개국의 해외 선교사들이 선지세 기간의 특강 시간을 활용해 사역을 소개하고 협력 요청사항을 나눕니다.", "Body"), PageBreak()]

# Staff and budget
story += section("05", "PEOPLE BEHIND THE WEEK", "운영과 섬김")
staff = [["총무", "서관옥 선교사"], ["진행", "김인호 선교사 · 시몽 간사 · 박찬묵 간사"], ["사무", "허예지 간사"], ["재정", "최민철 선교사"], ["관리", "박지훈 간사"], ["찬양", "태국 간사들"], ["촬영 및 영상", "박찬묵 간사"]]
story.append(styled_table([[P("역할", "TableWhite"), P("담당", "TableWhite")]] + [[P(x, "Table") for x in row] for row in staff], [45*mm, 125*mm]))
story += [Spacer(1, 10*mm), P("기타 프로그램", "CardTitle"), P("시작 예배: 서관옥 선교사  ·  마침 예배: 최민철 선교사  ·  목요채플: 장제니스 간사<br/>경건의 시간: 화 세네갈 로갸이 · 수 카메룬 도날 · 목 우즈벡 장바울 · 금 태국 빠우<br/>Outing: 춘천지구, 서울(양화진)", "Body"), PageBreak()]
story += section("06", "BUDGET", "예산안")
story.append(styled_table([[P("수입", "TableWhite"), P("지출", "TableWhite"), P("식비 기준", "TableWhite")], [P("6,000,000원", "Body"), P("6,000,000원", "Body"), P("25명 · 13끼", "Body")]], [58*mm, 58*mm, 54*mm]))
budget = [["항목", "금액", "산출 및 비고"], ["식비", "3,250,000원", "10,000원 × 13끼 × 25명 (참가자 및 운영진)"], ["장소 사용료", "1,000,000원", ""], ["활동비", "1,000,000원", "캠퍼스 탐방·전도, 차량 대여 및 연료비, 지구 탐방 지원"], ["사무비", "100,000원", ""], ["진행비", "100,000원", ""], ["관리비", "100,000원", ""], ["간식비", "200,000원", ""], ["예비비", "250,000원", ""], ["총 지출", "6,000,000원", "행사 운영을 위한 총 예산"]]
story += [Spacer(1, 8*mm), styled_table([[P(x, "TableWhite") for x in budget[0]]] + [[P(x or "-", "Table") for x in row] for row in budget[1:]], [38*mm, 38*mm, 94*mm], small=True), Spacer(1, 16*mm), P("2026 ISTS  ·  AI시대, 흔들리지 않는 비전 · 재생산 사역", "Small")]

doc.build(story)
print(OUT)
