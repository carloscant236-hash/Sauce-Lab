const products = [
  {
    id: 'raccolto', name: 'Raccolto', subtitle: 'Cremosa y con carácter',
    image: 'assets/raccolto.jpg', accent: '#d48a22', category: ['plant'], badge: 'Proteína vegetal',
    short: 'Garbanzos blancos y tahini se unen en una textura cremosa pensada para acompañar comidas de un estilo de vida activo.',
    ingredients: ['Garbanzos blancos', 'Tahini (ajonjolí)'],
    profile: 'Cremosa, de sabor diferente y elaborada a partir de ingredientes de origen vegetal.',
    uses: ['Vegetales', 'Pan', 'Wraps', 'Bowls']
  },
  {
    id: 'yomi', name: 'Yomi', subtitle: 'Fresca, ácida y diferente',
    image: 'assets/yomi.jpg', accent: '#b13071', category: ['fresh'], badge: 'Proteína + fibra',
    short: 'Una mezcla de yogur griego natural, semillas de chía y maracuyá con un perfil fresco, ácido y agradable.',
    ingredients: ['Yogur griego natural', 'Semillas de chía', 'Maracuyá'],
    profile: 'Una combinación fresca y ligeramente exótica para quienes desean experimentar con nuevos sabores.',
    uses: ['Ensaladas', 'Aderezos', 'Acompañamientos']
  },
  {
    id: 'mr-rosso', name: 'Mr. Rosso', subtitle: 'El clásico toma otra forma',
    image: 'assets/mr-rosso.jpg', accent: '#e04432', category: ['fresh'], badge: 'Sin azúcar añadida',
    short: 'Tomate, albahaca, ajo y cebolla crean un perfil inspirado en la salsa pomodoro y aprovechan el dulzor natural del tomate.',
    ingredients: ['Tomate', 'Albahaca', 'Ajo', 'Cebolla'],
    profile: 'Sabor fresco inspirado en la tradición del tomate y las hierbas aromáticas.',
    uses: ['Pasta', 'Pizza', 'Pan']
  },
  {
    id: 'eden', name: 'Eden', subtitle: 'Verde, vegetal y suave',
    image: 'assets/eden.jpg', accent: '#298d62', category: ['plant','fresh'], badge: 'Completamente vegetal',
    short: 'Espinaca, albahaca y marañón crean una alternativa vegetal, fresca y cremosa para múltiples preparaciones.',
    ingredients: ['Espinaca', 'Albahaca', 'Marañón'],
    profile: 'Una salsa completamente vegetal inspirada en la naturaleza, con textura suave y cremosa.',
    uses: ['Pasta', 'Sándwiches', 'Wraps', 'Vegetales', 'Bowls']
  }
];

const grid = document.querySelector('#product-grid');
const modal = document.querySelector('#product-modal');
const modalContent = document.querySelector('#modal-content');

function renderProducts() {
  grid.innerHTML = products.map(p => `
    <article class="product-card reveal" data-category="${p.category.join(' ')}" style="--accent:${p.accent}">
      <div class="product-photo"><img src="${p.image}" alt="${p.name}, salsa de Sauce Lab" loading="lazy"><span class="product-badge">${p.badge}</span></div>
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3><div class="product-subtitle">${p.subtitle}</div>
        <p class="product-desc">${p.short}</p>
        <div class="product-meta">${p.ingredients.slice(0,3).map(x=>`<span class="chip">${x}</span>`).join('')}</div>
        <button class="product-more" type="button" data-product="${p.id}">Ver detalles</button>
      </div>
    </article>`).join('');
  observeReveals();
}

function openProduct(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;
  modalContent.innerHTML = `<div class="modal-grid">
    <img src="${p.image}" alt="${p.name}, salsa de Sauce Lab">
    <div class="modal-copy">
      <span class="eyebrow">${p.badge}</span><h2 id="modal-title">${p.name}</h2><p class="lead">${p.profile}</p>
      <h3>Ingredientes principales</h3><ul>${p.ingredients.map(x=>`<li>${x}</li>`).join('')}</ul>
      <h3>¿Cómo disfrutarla?</h3><div class="modal-tags">${p.uses.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
    </div></div>`;
  modal.showModal();
}

document.addEventListener('click', e => {
  const detail = e.target.closest('[data-product]');
  if (detail) openProduct(detail.dataset.product);
  const filter = e.target.closest('.filter');
  if (filter) {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
    filter.classList.add('is-active');
    const value = filter.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = value !== 'all' && !card.dataset.category.includes(value);
    });
  }
});

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}));

function observeReveals(){
  const els = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!('IntersectionObserver' in window)) { els.forEach(el=>el.classList.add('is-visible')); return; }
  const obs = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add('is-visible');obs.unobserve(entry.target);}
  }), {threshold:.12});
  els.forEach(el=>obs.observe(el));
}

renderProducts();
observeReveals();
