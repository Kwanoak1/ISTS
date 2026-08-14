import { useEffect, useRef, useState } from 'react'
import './styles.css'

const photos = [
  {
    id: 1,
    region: 'asia',
    regionLabel: '아시아',
    title: '함께 걸어가는 마을',
    description: '캄보디아의 작은 마을에서 현지 리더들과 다음 세대를 만납니다.',
    image: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1200&q=85',
    alt: '논길을 따라 마을로 걸어가는 사람들',
  },
  {
    id: 2,
    region: 'africa',
    regionLabel: '아프리카',
    title: '배움이 시작되는 교실',
    description: '케냐의 청년들이 서로의 이야기를 나누며 새로운 꿈을 키웁니다.',
    image: 'https://images.unsplash.com/photo-1494386346843-e12284507169?auto=format&fit=crop&w=1200&q=85',
    alt: '교실에서 함께 공부하는 아이들',
  },
  {
    id: 3,
    region: 'europe',
    regionLabel: '유럽',
    title: '도시에서 피어나는 만남',
    description: '유럽의 대학가에서 다양한 배경의 친구들과 진솔한 대화를 이어갑니다.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85',
    alt: '유럽 도시 공원에서 대화하는 친구들',
  },
  {
    id: 4,
    region: 'americas',
    regionLabel: '미주',
    title: '새로운 이웃이 된 하루',
    description: '미주 지역의 이웃들과 식탁을 나누며 서로의 삶을 알아갑니다.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85',
    alt: '식탁에 모여 웃으며 이야기하는 사람들',
  },
  {
    id: 5,
    region: 'asia',
    regionLabel: '아시아',
    title: '일상의 자리에서 만나요',
    description: '도시의 분주한 일상 한가운데서 따뜻한 환대와 우정을 배웁니다.',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
    alt: '야외 모임에서 이야기를 나누는 사람들',
  },
  {
    id: 6,
    region: 'africa',
    regionLabel: '아프리카',
    title: '서로의 손을 잡고',
    description: '현지 공동체와 함께 걸으며 작은 변화의 순간을 기록합니다.',
    image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=85',
    alt: '함께 손을 맞잡은 공동체 사람들',
  },
]

const regions = [
  { id: 'all', label: '전체' },
  { id: 'asia', label: '아시아' },
  { id: 'africa', label: '아프리카' },
  { id: 'europe', label: '유럽' },
  { id: 'americas', label: '미주' },
]

function UploadGuide({ onClose }) {
  return (
    <aside className="upload-guide" aria-labelledby="upload-title">
      <div>
        <p className="eyebrow">다음 단계</p>
        <h2 id="upload-title">사진 올리기는 준비 중이에요</h2>
        <p>지금은 샘플 사진으로 둘러보고, 아래 순서로 함께 만들어 갈 예정입니다.</p>
      </div>
      <button className="icon-button" type="button" onClick={onClose} aria-label="업로드 안내 닫기">×</button>
      <ol className="guide-steps">
        <li><strong>01</strong><span>로그인하고 사역 현장을 선택해요</span></li>
        <li><strong>02</strong><span>사진과 이야기를 올려요</span></li>
        <li><strong>03</strong><span>함께 보고 기도해요</span></li>
      </ol>
    </aside>
  )
}

function PhotoModal({ photo, onClose }) {
  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()

      if (event.key !== 'Tab') return
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      const focusIsOutside = !modalRef.current.contains(document.activeElement)
      if (event.shiftKey && (document.activeElement === firstElement || focusIsOutside)) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && (document.activeElement === lastElement || focusIsOutside)) {
        event.preventDefault()
        firstElement.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    closeButtonRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <article ref={modalRef} className="photo-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
        <div className="modal-image photo-image">
          <img src={photo.image} alt={photo.alt} onError={(event) => event.currentTarget.classList.add('image-error')} />
        </div>
        <div className="modal-content">
          <span className="region-tag">{photo.regionLabel}</span>
          <h2 id="modal-title">{photo.title}</h2>
          <p>{photo.description}</p>
          <button className="button button-dark" type="button" onClick={onClose}>사진 닫기</button>
        </div>
        <button ref={closeButtonRef} className="modal-close icon-button" type="button" onClick={onClose} aria-label="사진 상세 닫기">×</button>
      </article>
    </div>
  )
}

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [showUploadGuide, setShowUploadGuide] = useState(false)
  const photoTriggerRef = useRef(null)
  const visiblePhotos = selectedRegion === 'all' ? photos : photos.filter((photo) => photo.region === selectedRegion)
  const closePhoto = () => {
    setSelectedPhoto(null)
    requestAnimationFrame(() => photoTriggerRef.current?.focus())
  }

  return (
    <div className="site-shell">
       <header className="site-header container">
         <a className="brand" href="#top" aria-label="JDM 국제 사역 공유 처음으로">
           <span className="brand-mark">J</span>
           <span><strong>JDM</strong><small>국제 사역 공유</small></span>
         </a>
         <nav className="site-nav" aria-label="주요 메뉴">
           <a href="#gallery">사역 이야기</a>
           <a href="#field-notes">현장 기록</a>
           <a href="#participate">참여하기</a>
         </nav>
         <button className="button button-outline" type="button" onClick={() => setShowUploadGuide(true)}>사진 올리기 <span aria-hidden="true">↗</span></button>
       </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">세계 곳곳의 사역 현장</p>
            <h1>보고, 함께<br /><em>기도하는</em> 이야기</h1>
            <p className="hero-description">JDM 국제 간사들이 만나는 사람과 마을의 이야기를 사진으로 나눕니다. 멀리 있어도 한마음으로 사역을 바라봐요.</p>
            <a className="button button-primary" href="#gallery">사역 둘러보기 <span aria-hidden="true">↓</span></a>
          </div>
         <div className="hero-collage" aria-label="사역 현장 샘플 사진">
            <div className="hero-photo hero-photo-main photo-image"><img src={photos[0].image} alt={photos[0].alt} /></div>
            <div className="hero-photo hero-photo-small photo-image"><img src={photos[3].image} alt={photos[3].alt} /></div>
           <span className="hero-note">작은 장면이<br />큰 기도가 됩니다.</span>
         </div>
       </section>

       <section className="impact-strip container" id="field-notes" aria-label="JDM 국제 사역 현황">
         <div className="impact-intro">
           <p className="eyebrow">한 장의 사진, 한 사람의 기도</p>
           <h2>멀리 있는 현장을<br /><em>가까이 만나는 방법</em></h2>
         </div>
         <div className="impact-stats">
           <div className="impact-stat"><strong>05</strong><span>함께 기록하는<br />지역</span></div>
           <div className="impact-stat"><strong>06</strong><span>이번 달의<br />현장 이야기</span></div>
           <div className="impact-stat"><strong>∞</strong><span>이어지는<br />기도와 만남</span></div>
         </div>
       </section>

       <section className="gallery-section container" id="gallery">
          <div className="section-heading"><div><p className="eyebrow">현장 기록</p><h2>사역의 장면들</h2></div><p className="section-caption">사진을 눌러 이야기를<br className="desktop-break" /> 자세히 살펴보세요.</p></div>
          <div className="filters" aria-label="지역별 사진 필터">
            {regions.map((region) => <button key={region.id} className={`filter-button ${selectedRegion === region.id ? 'is-active' : ''}`} type="button" aria-pressed={selectedRegion === region.id} onClick={() => setSelectedRegion(region.id)}>{region.label}</button>)}
          </div>
          <div className="photo-grid">
            {visiblePhotos.map((photo) => <button className="photo-card" type="button" key={photo.id} onClick={(event) => { photoTriggerRef.current = event.currentTarget; setSelectedPhoto(photo) }} aria-label={`${photo.title} 상세 보기`}>
              <div className="card-image photo-image"><img src={photo.image} alt={photo.alt} onError={(event) => event.currentTarget.classList.add('image-error')} /><span className="card-arrow" aria-hidden="true">↗</span></div>
              <div className="card-copy"><span className="region-tag">{photo.regionLabel}</span><h3>{photo.title}</h3><p>{photo.description}</p></div>
            </button>)}
          </div>
        </section>

         {showUploadGuide && <div className="container" id="participate"><UploadGuide onClose={() => setShowUploadGuide(false)} /></div>}
      </main>

      <footer className="site-footer"><div className="container footer-inner"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">J</span><span><strong>JDM</strong><small>국제 사역 공유</small></span></a><p>세계 곳곳의 사역 현장을 보고<br />함께 기도하는 공간입니다.</p></div><p className="version">JDM International Ministry<br /><span>Sample prototype · 2026</span></p></div></footer>
      {selectedPhoto && <PhotoModal photo={selectedPhoto} onClose={closePhoto} />}
    </div>
  )
}
