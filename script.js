const projects = {
  storefront: { title: '🏪 Store Front', icon: '🏪', desc: 'A fully functional digital shop with inventory management, cart, and checkout flow. Built with vanilla JS and local storage.', tags: ['HTML', 'CSS', 'JS'], link: null, imgs: ['images/storefront_1.png', 'images/storefront_2.png', 'images/storefront_3.png'] },
  weather: { title: '🌦️ Weather App', icon: '🌦️', desc: 'Real-time weather app with location search, current conditions, and 7-day forecasts. Pulls live data from a public weather API.', tags: ['Python', 'API', 'CSS'], link: null, imgs: ['images/weather_1.png', 'images/weather_2.png'] },
  portfolio: { title: '🚜 Portfolio Beta', icon: '🚜', desc: "The very farm you're standing on! A Stardew Valley-inspired pixel-art portfolio built completely from scratch — no frameworks, no templates.", tags: ['HTML', 'CSS', 'JS'], link: null, imgs: ['images/portfolio_1.png', 'images/portfolio_2.png'] },
  escape: { title: '🔐 Escape Room', icon: '🔐', desc: 'A puzzle escape room with multiple levels, inventory system, and branching storyline.', tags: ['HTML', 'CSS', 'JS'], link: null, imgs: ['images/escape_1.png', 'images/escape_2.png', 'images/escape_3.png'] },
  laser: { title: '✨ Laser Cutter Art', icon: '✨', desc: 'A physical art project carefully designed and precisely cut using a laser cutter. Combines digital design with tangible fabrication.', tags: ['Design', 'Fabrication', 'Art'], link: null, imgs: ['images/laser_1.png', 'images/laser_2.png'] }
};
let currentProject = null, carIdx = 0, dialogTimer;
function openDrawer(id) {
  const p = projects[id]; if (!p) return;
  currentProject = id; carIdx = 0;
  document.getElementById('drawerTitle').textContent = p.title;
  document.getElementById('drawerDesc').textContent = p.desc;
  document.getElementById('drawerTags').innerHTML = p.tags.map(t => `<span class="drawer-tag">${t}</span>`).join('');
  const lnk = document.getElementById('drawerLink');
  if (p.link) { lnk.href = p.link; lnk.className = 'drawer-link-btn'; lnk.textContent = '🔗 View Project'; }
  else { lnk.href = '#'; lnk.className = 'drawer-link-btn disabled'; lnk.textContent = '🔗 Link Coming Soon'; lnk.onclick = e => e.preventDefault(); }
  renderCarousel();
  document.getElementById('drawerOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() { document.getElementById('drawerOverlay').classList.remove('open'); document.body.style.overflow = ''; currentProject = null; }
function handleDrawerOverlay(e) { if (e.target === document.getElementById('drawerOverlay')) closeDrawer(); }
function renderCarousel() {
  if (!currentProject) return;
  const imgs = projects[currentProject].imgs, track = document.getElementById('carTrack'), dots = document.getElementById('carDots'), counter = document.getElementById('carCounter'), prev = document.getElementById('carPrev'), next = document.getElementById('carNext');
  if (!imgs.length) { track.innerHTML = `<div class="car-slide"><div class="car-empty"><span class="big">${projects[currentProject].icon}</span><span>No screenshots yet</span></div></div>`; dots.innerHTML = ''; counter.textContent = ''; prev.style.display = 'none'; next.style.display = 'none'; return; }
  track.innerHTML = imgs.map(src => `<div class="car-slide"><img src="${src}" alt="screenshot" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" /><div class="car-empty" style="display:none; position:absolute; inset:0; background:#6b500f;"><span class="big">⚠️</span><span>Image failed to load</span></div></div>`).join('');
  dots.innerHTML = imgs.map((_, i) => `<div class="dot${i === 0 ? ' act' : ''}" onclick="goSlide(${i})"></div>`).join('');
  prev.style.display = imgs.length > 1 ? 'flex' : 'none';
  next.style.display = imgs.length > 1 ? 'flex' : 'none';
  updateCarPos();
}
function updateCarPos() {
  const n = projects[currentProject].imgs.length || 1;
  carIdx = Math.max(0, Math.min(carIdx, n - 1));
  document.getElementById('carTrack').style.transform = `translateX(-${carIdx * 100}%)`;
  document.querySelectorAll('#carDots .dot').forEach((d, i) => d.classList.toggle('act', i === carIdx));
  if (projects[currentProject].imgs.length) document.getElementById('carCounter').textContent = `${carIdx + 1}/${projects[currentProject].imgs.length}`;
}
function carMove(dir) { carIdx += dir; updateCarPos(); }
function goSlide(i) { carIdx = i; updateCarPos(); }
function showDialog(name, text) { const box = document.getElementById('dialogBox'); document.getElementById('dialogName').textContent = '⚒ ' + name; document.getElementById('dialogText').textContent = text; box.classList.add('visible'); clearTimeout(dialogTimer); dialogTimer = setTimeout(hideDialog, 5000); }
function hideDialog() { document.getElementById('dialogBox').classList.remove('visible'); }
document.addEventListener('DOMContentLoaded', () => { document.querySelectorAll('.stat-bar-fill').forEach(f => { const w = f.style.width; f.style.width = '0%'; setTimeout(() => { f.style.width = w; }, 300); }); });
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowRight', 'b', 'a']; let konamiIdx = 0;
document.addEventListener('keydown', e => { if (e.key === konamiCode[konamiIdx]) { konamiIdx++; if (konamiIdx === konamiCode.length) { showDialog('???', '✨ You found the secret passage! The Wizard sends his regards. +500g has been added to your account. ✨'); konamiIdx = 0; } } else { konamiIdx = 0; } });
