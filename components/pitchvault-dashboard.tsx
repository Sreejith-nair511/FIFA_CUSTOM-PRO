'use client'

import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import PitchvaultPage from './pitchvault-pages'
import {
  Archive,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Command,
  Crown,
  Globe2,
  Grid2X2,
  Layers3,
  Menu,
  Plus,
  Search,
  Settings2,
  Shield,
  Sparkles,
  Trophy,
  UserRound,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  ['OVERVIEW', Grid2X2], ['CAREER', UserRound], ['SEASONS', CalendarDays], ['MATCHES', Shield],
  ['TRANSFERS', ArrowUpRight], ['CLUBS', Layers3], ['INTERNATIONAL', Globe2], ['TROPHIES', Trophy],
  ['AWARDS', Crown], ['ATTRIBUTES', BarChart3], ['TIMELINE', BookOpen], ['RECORDS', Zap], ['ARCHIVE', Archive],
] as const

const seasons = [
  { season: '2025/26', club: 'Manchester United', goals: 64, assists: 22, apps: 18, rating: '8.9', ovr: 91 },
  { season: '2024/25', club: 'FC Barcelona', goals: 176, assists: 80, apps: 57, rating: '8.7', ovr: 89 },
  { season: '2023/24', club: 'FC Barcelona', goals: 91, assists: 34, apps: 49, rating: '8.4', ovr: 84 },
  { season: '2022/23', club: 'AS Saint-Étienne', goals: 42, assists: 16, apps: 36, rating: '8.1', ovr: 78 },
]

const moments = [
  { year: '2025', type: 'TRANSFER', title: 'Manchester United complete €300M transfer for Sakai Sree', body: 'A new chapter begins at Old Trafford. The biggest move in career mode history.' },
  { year: '2024', type: 'TROPHY', title: 'Barcelona win UEFA Champions League', body: 'Sree delivers on the biggest stage as Barcelona lift the European crown.' },
  { year: '2022', type: 'INTERNATIONAL', title: 'New Zealand win FIFA World Cup', body: 'Seven goals against France. Player of the Tournament. A legacy is born.' },
]

const trophies = ['UEFA CHAMPIONS LEAGUE', 'LA LIGA', 'COPA DEL REY', 'PREMIER LEAGUE', 'FA CUP', 'FIFA WORLD CUP']

export function PitchvaultDashboard() {
  const [mobileNav, setMobileNav] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [filter, setFilter] = useState('ALL')
  const [activePage, setActivePage] = useState('OVERVIEW')
  const [modalOpen, setModalOpen] = useState<'match' | 'transfer' | 'trophy' | 'award' | 'season' | 'attribute' | null>(null)
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setSearchOpen(true)
      }
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filters = useMemo(() => ['ALL', 'GOALS', 'ASSISTS', 'MOTM', 'WINS'], [])

  const onSubmit = async (data: any) => {
    try {
      let endpoint = '/api/matches'
      if (modalOpen === 'transfer') endpoint = '/api/transfers'
      if (modalOpen === 'trophy') endpoint = '/api/trophies'
      if (modalOpen === 'award') endpoint = '/api/awards'
      if (modalOpen === 'season') endpoint = '/api/seasons'
      if (modalOpen === 'attribute') endpoint = '/api/attributes'

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        alert(`${modalOpen} added!`)
        setModalOpen(null)
        reset()
      }
    } catch (err) {
      alert('Error: ' + err)
    }
  }

  return (
    <div className="pv-app">
      <aside className={`pv-sidebar ${mobileNav ? 'is-open' : ''}`}>
        <div className="pv-brand"><span className="pv-brand-mark">PV</span><div><strong>PITCHVAULT</strong><small>CAREER ARCHIVE</small></div><button className="pv-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X /></button></div>
        <nav className="pv-nav" aria-label="Primary navigation">
          <span className="pv-nav-label">PLAYER CAREER</span>
          {navItems.map(([label, Icon]) => <button key={label} onClick={() => { setActivePage(label); setMobileNav(false) }} className={`pv-nav-item ${label === activePage ? 'active' : ''}`}><Icon /><span>{label}</span>{label === activePage && <i />}</button>)}
        </nav>
        <div className="pv-sidebar-bottom"><button className="pv-nav-item" onClick={() => setSearchOpen(true)}><Search /><span>SEARCH</span><kbd>⌘ K</kbd></button><button className="pv-nav-item"><Settings2 /><span>SETTINGS</span></button><div className="pv-save"><span className="pv-online-dot" /> ARCHIVE SYNCED <b>NOW</b></div></div>
      </aside>

      <main className="pv-main">
        <header className="pv-mobile-header"><button onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu /></button><strong>PITCHVAULT</strong><button onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></button></header>
        <div className="pv-topline"><span>PLAYER CAREER / OVERVIEW</span><div><span className="pv-live"><i /> LIVE ARCHIVE</span><button className="pv-icon-button" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></button><button className="pv-icon-button" onClick={() => setModalOpen('match')} aria-label="Add record" title="Add Match"><Plus /></button></div></div>

        {activePage === 'OVERVIEW' ? <>
        <section className="pv-hero">
          <div className="pv-hero-grid" />
          <div className="pv-hero-copy"><span className="pv-eyebrow">THE ARCHIVE OF</span><h1>SAKAI<br /><em>SREE</em></h1><div className="pv-player-meta"><span className="pv-position">ST</span><span><b>MANCHESTER UNITED</b><small>Age 20 <i /> New Zealand</small></span></div><div className="pv-form"><span>FORM <b>8.2</b></span><span>RANK <b>1 <small>/ 35</small></b></span></div></div>
          <div className="pv-hero-player"><div className="pv-number">09</div><div className="pv-silhouette"><div className="pv-head" /><div className="pv-body" /></div><div className="pv-rating"><strong>91</strong><span>OVR</span></div><span className="pv-hero-caption">MAN. UTD / 2025—26</span></div>
        </section>

        <section className="pv-stat-strip">{[['57','APPEARANCES'], ['176','GOALS'], ['80','ASSISTS'], ['8.7','AVG RATING'], ['56','WINS'], ['12','TROPHIES']].map(([value, label]) => <div className="pv-stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>

        <section className="pv-section pv-chapter"><div className="pv-section-heading"><span className="pv-eyebrow">01 / CURRENT CHAPTER</span><span className="pv-section-rule" /></div><div className="pv-chapter-grid"><div><p className="pv-display-title">MANCHESTER<br /><em>UNITED</em></p><div className="pv-chapter-meta"><span><small>SEASON</small><b>2025/26</b></span><span><small>COMPETITION</small><b>PREMIER LEAGUE</b></span><span><small>FORM</small><b className="pv-accent-text">8.2 <ArrowUpRight /></b></span></div></div><div className="pv-pitch"><span className="pv-pitch-circle" /><span className="pv-pitch-line" /><div className="pv-pitch-label">CURRENT<br /><b>91 OVR</b></div></div></div></section>

        <section className="pv-section"><div className="pv-section-heading"><span className="pv-eyebrow">02 / CAREER JOURNEY</span><span className="pv-section-rule" /></div><div className="pv-journey">{[['AS','SAINT-ÉTIENNE','22/23 · 36 APP · 42 G'], ['FC','BARCELONA','23/24—24/25 · 106 APP · 267 G'], ['MU','MANCHESTER UNITED','25/26 · CURRENT']].map(([mark, club, detail], index) => <div className="pv-club" key={club}><div className={`pv-club-badge badge-${index}`}>{mark}</div><div><span>{index + 1} / CLUB</span><h3>{club}</h3><p>{detail}</p></div>{index < 2 && <ChevronRight className="pv-journey-arrow" />}</div>)}</div></section>

        <section className="pv-section pv-two-col"><div><div className="pv-section-heading"><span className="pv-eyebrow">03 / SEASON PERFORMANCE</span><span className="pv-section-rule" /></div><div className="pv-chart-header"><div><strong>GOALS BY SEASON</strong><span>Career output / all competitions</span></div><b>373 <small>TOTAL</small></b></div><div className="pv-chart"><div className="pv-chart-y"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><div className="pv-bars">{seasons.slice().reverse().map((item) => <div className="pv-bar-wrap" key={item.season}><div className="pv-bar" style={{ height: `${Math.max(28, item.goals / 2)}%` }}><b>{item.goals}</b></div><span>{item.season.slice(2, 4)}</span></div>)}</div></div></div><div className="pv-side-stat"><span className="pv-eyebrow">OVR PROGRESSION</span><strong>91</strong><p>+13 since arrival</p><div className="pv-mini-line"><i /><i /><i /><i /><i /></div><div className="pv-mini-labels"><span>78</span><span>84</span><span>89</span><span>91</span></div></div></section>

        <section className="pv-section pv-attributes"><div className="pv-section-heading"><span className="pv-eyebrow">04 / PLAYER PROFILE</span><span className="pv-section-rule" /></div><div className="pv-attribute-layout"><div className="pv-attribute-score"><span>OVERALL</span><strong>91</strong><p>LEVEL 25</p></div><div className="pv-attribute-bars">{[['PAC','93'], ['SHO','93'], ['PAS','54'], ['DRI','85'], ['DEF','33'], ['PHY','80']].map(([name, value]) => <div className="pv-attribute" key={name}><span>{name}</span><div><i style={{ width: `${Number(value)}%` }} /></div><b>{value}</b></div>)}</div><div className="pv-archetypes"><span className="pv-eyebrow">ARCHETYPES</span><div><b>FINISHER</b><b>BULL</b><b>CHEETAH</b><b>LYNX</b></div></div></div></section>

        <section className="pv-section pv-international"><div className="pv-int-copy"><span className="pv-eyebrow">05 / INTERNATIONAL CAREER</span><p className="pv-display-title">NEW<br /><em>ZEALAND</em></p><div className="pv-int-result"><span>FIFA WORLD CUP / 2022</span><strong>CHAMPIONS</strong><small>FINAL · NEW ZEALAND <b>7—2</b> FRANCE</small></div></div><div className="pv-int-feature"><div className="pv-star">★</div><span>PLAYER OF THE TOURNAMENT</span><strong>7</strong><small>GOALS IN THE FINAL</small></div></section>

        <section className="pv-section"><div className="pv-section-heading"><span className="pv-eyebrow">06 / RECENT CAREER MOMENTS</span><span className="pv-section-rule" /></div><div className="pv-timeline">{moments.map((moment) => <article className="pv-moment" key={moment.year}><div className="pv-moment-year">{moment.year}</div><div className="pv-moment-dot" /><div><span className="pv-tag">{moment.type}</span><h3>{moment.title}</h3><p>{moment.body}</p></div><ArrowUpRight /></article>)}</div></section>

        <section className="pv-section"><div className="pv-section-heading"><span className="pv-eyebrow">07 / THE CABINET</span><span className="pv-section-rule" /><span className="pv-count">12 HONOURS</span></div><div className="pv-trophies">{trophies.map((trophy, index) => <div className="pv-trophy" key={trophy}><div className="pv-trophy-icon"><Trophy /></div><span>{trophy}</span><small>{index === 5 ? 'NEW ZEALAND · 2022' : index < 3 ? 'FC BARCELONA · 2024' : 'MANCHESTER UNITED · 2025'}</small></div>)}</div></section>

        <section className="pv-section pv-bottom-grid"><div><div className="pv-section-heading"><span className="pv-eyebrow">08 / MATCH CENTER</span><span className="pv-section-rule" /></div><div className="pv-filter-row">{filters.map((item) => <button className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><div className="pv-match-table"><div className="pv-table-head"><span>DATE</span><span>OPPONENT</span><span>COMPETITION</span><span>RESULT</span><span>RATING</span><span>G/A</span></div><div className="pv-table-row"><span>17 JUL</span><b>France</b><span>World Cup</span><strong className="win">W 7—2</strong><b>10.0</b><b>7 / 1</b></div><div className="pv-table-row"><span>12 MAY</span><b>Arsenal</b><span>Premier League</span><strong className="win">W 4—1</strong><b>9.4</b><b>2 / 1</b></div><div className="pv-table-row"><span>04 MAY</span><b>Liverpool</b><span>Premier League</span><strong className="draw">D 2—2</strong><b>8.1</b><b>1 / 0</b></div></div></div><div className="pv-records"><div className="pv-section-heading"><span className="pv-eyebrow">CAREER RECORDS</span></div>{[['MOST GOALS IN A MATCH','7'], ['HIGHEST MATCH RATING','10.0'], ['MOST EXPENSIVE TRANSFER','€300M'], ['WORLD CUP GOALS','7']].map(([label, value]) => <div className="pv-record" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></section>

        </> : <PitchvaultPage page={activePage} />}

        <footer className="pv-footer"><div className="pv-brand"><span className="pv-brand-mark">PV</span><div><strong>PITCHVAULT</strong><small>EVERY MATCH. EVERY MOVE. EVERY LEGACY.</small></div></div><span>ARCHIVE BUILT FOR THE LONG GAME / 2026</span></footer>
      </main>

      <nav className="pv-bottom-nav"><button className={activePage === 'OVERVIEW' ? 'active' : ''} onClick={() => setActivePage('OVERVIEW')}><Grid2X2 /><span>HOME</span></button><button className={activePage === 'SEASONS' ? 'active' : ''} onClick={() => setActivePage('SEASONS')}><CalendarDays /><span>SEASONS</span></button><button onClick={() => setSearchOpen(true)}><Search /><span>SEARCH</span></button><button className={activePage === 'ARCHIVE' ? 'active' : ''} onClick={() => setActivePage('ARCHIVE')}><Archive /><span>ARCHIVE</span></button></nav>
      {searchOpen && <div className="pv-search-overlay" onClick={() => setSearchOpen(false)}><div className="pv-command" onClick={(event) => event.stopPropagation()}><div className="pv-command-input"><Search /><input autoFocus placeholder="Search the archive..." /><kbd>ESC</kbd></div><div className="pv-command-results"><span>QUICK ACCESS</span>{['Sakai Sree / Player profile', 'Manchester United / Current chapter', '2022 FIFA World Cup / International', 'UEFA Champions League / Trophy cabinet'].map((result) => <button key={result}><Command />{result}<ChevronRight /></button>)}</div><div className="pv-command-footer"><CircleHelp /> Search players, clubs, matches, trophies and news</div></div></div>}

      <div style={{ position: 'fixed', bottom: 80, right: 16, zIndex: 40, display: 'flex', gap: 8, flexDirection: 'column' }}>
        <button onClick={() => setModalOpen('match')} style={{ padding: '12px 16px', backgroundColor: '#9333ea', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>+ MATCH</button>
        <button onClick={() => setModalOpen('transfer')} style={{ padding: '12px 16px', backgroundColor: '#7c3aed', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>+ TRANSFER</button>
        <button onClick={() => setModalOpen('trophy')} style={{ padding: '12px 16px', backgroundColor: '#7c3aed', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>+ TROPHY</button>
        <button onClick={() => setModalOpen('award')} style={{ padding: '12px 16px', backgroundColor: '#7c3aed', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>+ AWARD</button>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50, padding: '16px' }} onClick={() => setModalOpen(null)}>
          <div style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '16px 16px 0 0', maxWidth: '100%', width: '100%', maxHeight: '90vh', overflowY: 'auto', animation: 'slideUp 0.3s ease-out' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '20px', textTransform: 'capitalize' }}>Add {modalOpen}</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              {modalOpen === 'match' && (
                <>
                  <input {...register('career_id')} placeholder="Career ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('season_id')} placeholder="Season ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('club_id')} placeholder="Club ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('competition_id')} placeholder="Competition ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('date')} type="datetime-local" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('opponent')} placeholder="Opponent *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <select {...register('home_away')} style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }}>
                    <option value="">Home/Away</option>
                    <option value="home">Home</option>
                    <option value="away">Away</option>
                  </select>
                  <input {...register('player_team_score')} type="number" placeholder="Your Score *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('opponent_score')} type="number" placeholder="Opponent Score *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <select {...register('result')} style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }}>
                    <option value="">Result</option>
                    <option value="win">Win</option>
                    <option value="draw">Draw</option>
                    <option value="loss">Loss</option>
                  </select>
                  <input {...register('player_rating')} type="number" step="0.1" placeholder="Rating 0-10 *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('goals')} type="number" placeholder="Goals *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('assists')} type="number" placeholder="Assists *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('minutes_played')} type="number" placeholder="Minutes *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('match_image_url')} placeholder="Image URL" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                </>
              )}
              {modalOpen === 'transfer' && (
                <>
                  <input {...register('career_id')} placeholder="Career ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('player_id')} placeholder="Player ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('from_club_id')} placeholder="From Club ID" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('to_club_id')} placeholder="To Club ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('transfer_date')} type="datetime-local" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('transfer_fee')} type="number" placeholder="Transfer Fee" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('transfer_image_url')} placeholder="Image URL" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                </>
              )}
              {modalOpen === 'trophy' && (
                <>
                  <input {...register('career_id')} placeholder="Career ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('competition_id')} placeholder="Competition ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('club_id')} placeholder="Club ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('date')} type="datetime-local" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('trophy_image_url')} placeholder="Image URL" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                </>
              )}
              {modalOpen === 'award' && (
                <>
                  <input {...register('career_id')} placeholder="Career ID *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('name')} placeholder="Award Name *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('category')} placeholder="Category *" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('date')} type="datetime-local" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                  <input {...register('award_image_url')} placeholder="Image URL" style={{ width: '100%', padding: '12px', backgroundColor: '#1f2937', color: 'white', borderRadius: 8, border: '1px solid #374151', fontSize: '16px' }} />
                </>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button type="submit" style={{ flex: 1, backgroundColor: '#9333ea', color: 'white', padding: '12px 8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>Save</button>
                <button type="button" onClick={() => setModalOpen(null)} style={{ flex: 1, backgroundColor: '#374151', color: 'white', padding: '12px 8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PitchvaultDashboard
