/* ...existing code... */
import anime from "animejs";

const ANUNCIOS_PATH = 'anuncios/';
const SAMPLE_SIGNUP = 'https://docs.google.com/forms/d/e/1FAIpQLSc0UNUHpCMmY0f-umWe5G1D7wvw1zp5P0uU0yp11q6zEiQ8Fg/viewform?usp=dialog';

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('logo').src = ''; // deja vacío; el usuario puede poner su link

// mobile nav toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navList = document.getElementById('nav-list');
mobileToggle.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
  mobileToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('show');
});

// theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  // small pulse animation
  themeToggle.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 260 });
});

// Hero animation using anime.js
setTimeout(() => {
  const el = document.getElementById('hero-visual');
  el.animate([{ transform: 'translateY(8px)' }, { transform: 'translateY(-10px)' }, { transform: 'translateY(0)' }], { duration: 4200, iterations: Infinity });
}, 200);

// Participants sample data — en producción, podrías cargar JSON
const participants = [
  { name: 'Aldo', avatar: 'https://i.imgur.com/7kQEsHU.png', info: ['Rango: Alcalde', 'Horas: 412'] },
  { name: 'Marta', avatar: 'https://i.imgur.com/3G5jKZ5.png', info: ['Rango: Guardabosques', 'Horas: 289'] },
  { name: 'Tito', avatar: 'https://i.imgur.com/8Km9tLL.png', info: ['Rango: Herrero', 'Horas: 134'] },
  { name: 'Luna', avatar: 'https://i.imgur.com/5QfXhZ4.png', info: ['Rango: Médica', 'Horas: 221'] }
];

const grid = document.getElementById('participants-grid');
participants.forEach(p => {
  const card = document.createElement('article');
  card.className = 'card participant';
  card.innerHTML = `
    <img class="player-avatar" src="${p.avatar}" alt="${p.name} avatar" loading="lazy" />
    <h4 class="player-name">${p.name}</h4>
    <div class="player-meta">${p.info.map(i => `<span>${i}</span>`).join('<span>·</span>')}</div>
  `;
  grid.appendChild(card);
});

// Load anuncios from carpeta (cada .txt con formato: titulo||descripcion||imagenUrl)
async function loadAnunciosList() {
  try {
    // En este entorno no podemos leer carpeta directamente; asumimos lista fija o demander al servidor.
    // Para demo, cargamos el archivo de ejemplo.
    const res = await fetch(ANUNCIOS_PATH + 'sample.txt');
    if (!res.ok) return;
    const txt = await res.text();
    // split por líneas y procesar si hay varios anuncios (separador '---' opcional)
    const blocks = txt.split('\n---\n').map(s => s.trim()).filter(Boolean);
    const anuncios = blocks.map(b => {
      const parts = b.split('||').map(x => x.trim());
      return { title: parts[0]||'Sin título', desc: parts[1]||'', img: parts[2]||'' };
    });
    // store for other pages
    localStorage.setItem('gaspacho_anuncios', JSON.stringify(anuncios));
  } catch (e) {
    console.warn('No se pudieron cargar anuncios', e);
  }
}
loadAnunciosList();
/* ...existing code... */
