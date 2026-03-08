import './style.css';

// Types
interface Fund {
  id: string;
  title: string;
  organization: string;
  description: string;
  deadline: string;
  category: 'Gobierno' | 'Patrimonio' | 'Educación' | 'Agrupación Social' | 'Agro y Rural' | 'Conservación y Medioambiente';
  link: string;
}

// Mock Data representing the domains the user wants
const MOCK_FUNDS: Fund[] = [
  {
    id: '1',
    title: 'Fondo del Patrimonio Cultural - Línea Concurso Regional',
    organization: 'Servicio Nacional del Patrimonio Cultural (Gobierno)',
    description: 'Orientado a proyectos que salvaguarden, restauren y promuevan el patrimonio cultural material e inmaterial en regiones.',
    deadline: '30 de Nov, 2026',
    category: 'Patrimonio',
    link: 'https://www.fondos.gob.cl'
  },
  {
    id: '2',
    title: 'Fondo de Fomento al Arte en la Educación (FAE)',
    organization: 'Ministerio de las Culturas, las Artes y el Patrimonio',
    description: 'Financia proyectos de educación artística para establecimientos públicos y particulares subvencionados, incluyendo colegios de educación de adultos (tercera jornada).',
    deadline: '15 de Dic, 2026',
    category: 'Educación',
    link: 'https://www.fondos.gob.cl'
  },
  {
    id: '3',
    title: 'Fondo Nacional para el Fomento del Deporte (FONDEPORTE) - Organizaciones Comunitarias',
    organization: 'Instituto Nacional de Deportes (Agrupación)',
    description: 'Permite a organizaciones deportivas y agrupaciones con fines sociales postular a iniciativas de desarrollo comunitario y prevención social mediante el deporte.',
    deadline: '10 de Ene, 2027',
    category: 'Agrupación Social',
    link: 'https://www.fondos.gob.cl'
  },
  {
    id: '4',
    title: 'Fondo Nacional de Desarrollo Regional (FNDR) - 8% Social y Educación',
    organization: 'Gobiernos Regionales (GORE)',
    description: 'Fondo que destina porcentaje del presupuesto a proyectos de impacto social, cultural y educativo, incluyendo apoyo a estudiantes de tercera jornada.',
    deadline: '05 de Mar, 2027',
    category: 'Gobierno',
    link: 'https://www.fondos.gob.cl'
  },
  {
    id: '5',
    title: 'Subvenciones Presidenciales - Línea Social',
    organization: 'Ministerio del Interior',
    description: 'Apoyo directo a agrupaciones que cuenten con una línea de trabajo patrimonial comunitaria y apoyo a personas en situación de vulnerabilidad.',
    deadline: 'Ventana Abierta',
    category: 'Agrupación Social',
    link: 'https://www.fondos.gob.cl'
  },
  {
    id: '6',
    title: 'Fondo de Mejoramiento Integral de Infraestructura Escolar Pública',
    organization: 'Ministerio de Educación (MINEDUC)',
    description: 'Focalizado en mejorar las instalaciones de escuelas de educación básica, media y Centros de Educación Integral de Adultos (CEIA).',
    deadline: '20 de Oct, 2026',
    category: 'Educación',
    link: 'https://www.fondos.gob.cl'
  },
  {
    id: '7',
    title: 'Fondo de Conservación de Bosque Nativo',
    organization: 'CONAF (Región de Ñuble)',
    description: 'Postulación para la protección, recuperación y manejo sustentable del bosque nativo y formaciones xerofíticas. Ideal para predios en San Fabián de Alico.',
    deadline: '15 de May, 2026',
    category: 'Conservación y Medioambiente',
    link: 'https://www.conaf.cl'
  },
  {
    id: '8',
    title: 'Convocatoria Nacional de Proyectos de Innovación Agraria (FIA)',
    organization: 'Fundación para la Innovación Agraria',
    description: 'Buscamos apoyar proyectos que introduzcan innovaciones en el sector silvoagropecuario y la cadena agroalimentaria, aumentando la competitividad rural.',
    deadline: '30 de Mar, 2026',
    category: 'Agro y Rural',
    link: 'https://www.fia.cl'
  },
  {
    id: '9',
    title: 'Programa de Desarrollo Local (PRODESAL) / Incentivos INDAP',
    organization: 'INDAP (San Fabián, Ñuble)',
    description: 'Cofinanciamiento para inversiones productivas agrícolas, compra de maquinaria, insumos y riego intrapredial para potenciar terrenos en el área de San Fabián.',
    deadline: 'Ventana Abierta',
    category: 'Agro y Rural',
    link: 'https://www.indap.gob.cl'
  }
];

const FILTERS = ['Todos', 'Gobierno', 'Patrimonio', 'Educación', 'Agrupación Social', 'Agro y Rural', 'Conservación y Medioambiente'];

let currentCategory = 'Todos';
let searchQuery = '';

// Icons
const ICONS = {
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  building: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`,
  external: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  empty: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
  bell: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="app-container">
    <header>
      <div class="header-top" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
        <div style="flex: 1;"></div>
        <button class="btn btn-outline" id="alertBtn" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(139, 92, 246, 0.1); border: 1px solid var(--accent-primary); font-size: 0.9rem; padding: 0.5rem 1rem;">
          ${ICONS.bell} Configurar Alertas
        </button>
      </div>
      <h1>Radar de Fondos</h1>
      <p>Navega y encuentra fondos para educación, patrimonio, desarrollo rural (agro) y conservación ambiental, con foco especial en Ñuble y San Fabián de Alico.</p>
    </header>

    <main>
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Buscar por nombre, organización o palabra clave..." />
        <button class="btn" id="searchBtn">
          Explorar Nav
        </button>
      </div>

      <div class="filters" id="filtersContainer">
        ${FILTERS.map(f => `<button class="filter-badge ${f === 'Todos' ? 'active' : ''}" data-category="${f}">${f}</button>`).join('')}
      </div>

      <div class="results-grid" id="resultsGrid">
        <!-- Rendered via JS -->
      </div>
    </main>
  </div>
`;

const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const resultsGrid = document.getElementById('resultsGrid')!;
const filterBtns = document.querySelectorAll('.filter-badge');

function renderLoader() {
  resultsGrid.innerHTML = `
    <div class="loader-container" style="grid-column: 1 / -1;">
      <div class="spinner"></div>
      <p style="color: var(--text-muted)">Buscando en portales de gobierno...</p>
    </div>
  `;
}

function renderFunds(funds: Fund[]) {
  if (funds.length === 0) {
    resultsGrid.innerHTML = `
      <div class="empty-state">
        ${ICONS.empty}
        <h3>No se encontraron fondos</h3>
        <p>Intenta ajustar tu búsqueda o categoría.</p>
      </div>
    `;
    return;
  }

  resultsGrid.innerHTML = funds.map((f, index) => `
    <div class="fund-card" style="animation-delay: ${index * 0.1}s">
      <div class="card-header">
        <span class="tag ${f.category === 'Conservación y Medioambiente' ? 'tag-green' : f.category === 'Agro y Rural' ? 'tag-yellow' : ''}">${f.category}</span>
      </div>
      <h3 class="fund-title">${f.title}</h3>
      <div class="fund-org">
        ${(f.category === 'Conservación y Medioambiente' || f.category === 'Agro y Rural') ? ICONS.leaf : ICONS.building} ${f.organization}
      </div>
      <p class="fund-desc">${f.description}</p>
      <div class="fund-footer">
        <div class="deadline">
          ${ICONS.calendar} ${f.deadline}
        </div>
        <a href="${f.link}" target="_blank" class="link-btn">
          Ver Bases ${ICONS.external}
        </a>
      </div>
    </div>
  `).join('');
}

function filterData() {
  renderLoader();

  // Simulate network request/scraping delay for a more realistic feel
  setTimeout(() => {
    let filtered = MOCK_FUNDS;

    if (currentCategory !== 'Todos') {
      filtered = filtered.filter(f => f.category === currentCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(f =>
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.organization.toLowerCase().includes(q)
      );
    }

    renderFunds(filtered);
  }, 600);
}

// Event Listeners
document.getElementById('alertBtn')?.addEventListener('click', () => {
  alert('¡Próximamente! Aquí podrás configurar tu número de WhatsApp para que el Robot te envíe un mensaje automático apenas encuentre un nuevo fondo en la región de Ñuble, San Fabián o a nivel nacional que coincida con tu perfil.');
});

searchInput.addEventListener('input', (e) => {
  searchQuery = (e.target as HTMLInputElement).value;
  filterData(); // Instant search but with simulated delay
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.target as HTMLButtonElement;

    // Update active class
    filterBtns.forEach(b => b.classList.remove('active'));
    target.classList.add('active');

    currentCategory = target.dataset.category || 'Todos';
    filterData();
  });
});

// Initial Render
renderFunds(MOCK_FUNDS);
