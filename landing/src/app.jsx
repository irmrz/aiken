import './app.css'
import { CanvasScrub } from './components/CanvasScrub';
import { Analytics } from '@vercel/analytics/next';

export function App() {
  return (
    <main>
      {/* El menú lateral que se queda fijo */}
      <nav className="side-nav">
        <a href="#instagram" className="nav-link">INSTAGRAM
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    className="icon"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
</a>
        <a href="#portafolio">PORTAFOLIO</a>
        <a href="#contacto">CONTACTO</a>
      </nav>

      {/* El Header que desaparece al scrollear */}
      {/* El título ahora flota sobre el primer CanvasScrub */}
      <header className="hero-header">
        <h1 className="main-title">AIKEN</h1>
      </header>

      <section className="video-section">
        <CanvasScrub 
          startFrame={159} 
          endFrame={326} 
          folderPath="/scrubbing/clip1" 
          extension="webp" 
        />
        <div className="video-overlay-grain" />
  <div className="color-overlay" />
      </section>
      
      {/* Secciones siguientes */}
      <section style={{ height: '200vh', background: 'var(--bg-primary)' }}>
        {/* Más contenido */}
      </section>
      <Analytics />
    </main>
  );
}
