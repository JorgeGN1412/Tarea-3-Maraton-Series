const tours = [
  {
    id: 1,
    nombre: 'Volcán Arenal',
    descripcion: 'Caminata por senderos de lava y aguas termales.',
    precio: 85,
    imagen: 'https://picsum.photos/seed/arenal/600/400',
  },
  {
    id: 2,
    nombre: 'Manuel Antonio',
    descripcion: 'Playas de arena blanca y monos cariblancos.',
    precio: 70,
    imagen: 'https://picsum.photos/seed/manuelantonio/600/400',
  },
  {
    id: 3,
    nombre: 'Monteverde',
    descripcion: 'Puentes colgantes sobre el bosque nuboso.',
    precio: 95,
    imagen: 'https://picsum.photos/seed/monteverde/600/400',
  },
];
const reservas = [
  {
    id: 1,
    cliente: 'Ana Mora',
    tour: 'Volcán Arenal',
    fecha: '2026-11-02',
    personas: 2,
    estado: 'Confirmada',
  },
  {
    id: 2,
    cliente: 'Luis Rojas',
    tour: 'Monteverde',
    fecha: '2026-11-05',
    personas: 4,
    estado: 'Pendiente',
  },
  {
    id: 3,
    cliente: 'María Solano',
    tour: 'Manuel Antonio',
    fecha: '2026-11-09',
    personas: 3,
    estado: 'Confirmada',
  },
  {
    id: 4,
    cliente: 'Carlos Vega',
    tour: 'Volcán Arenal',
    fecha: '2026-11-12',
    personas: 1,
    estado: 'Cancelada',
  },
];
const enlacesMenu = [
  {
    texto: 'Inicio',
    url: '#inicio',
  },
  {
    texto: 'Tours',
    url: '#tours',
  },
  {
    texto: 'Reservas',
    url: '#reservas',
  },
  {
    texto: 'Contacto',
    url: '#contacto',
  },
];

// Los datos son constantes del laboratorio; el contenido externo debe usar textContent.
function crearMenu() {
  const lista = document.getElementById('lista-menu');
  enlacesMenu.forEach((enlace) => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    const a = document.createElement('a');
    a.className = 'nav-link';
    a.href = enlace.url;
    a.textContent = enlace.texto;
    li.appendChild(a);
    lista.appendChild(li);
  });
}
function crearCards() {
  const lista = document.getElementById('lista-tours');
  tours.forEach((tour) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `<article class="card card-tour h-100 shadow-sm"><img src="${tour.imagen}" alt="${tour.nombre}" class="card-img-top"><div class="card-body d-flex flex-column"><h3 class="h5 card-title">${tour.nombre}</h3><p class="card-text">${tour.descripcion}</p><p class="precio mt-auto">$${tour.precio}</p><a href="#reservas" class="btn btn-success">Reservar</a></div></article>`;
    lista.appendChild(col);
  });
}
function obtenerColorEstado(estado) {
  if (estado === 'Confirmada') return 'bg-success';
  if (estado === 'Pendiente') return 'bg-warning text-dark';
  return 'bg-danger';
}
function crearTabla() {
  const cuerpo = document.getElementById('cuerpo-reservas');
  reservas.forEach((r) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${r.id}</td><td>${r.cliente}</td><td>${r.tour}</td><td>${r.fecha}</td><td>${r.personas}</td><td><span class="badge ${obtenerColorEstado(r.estado)}">${r.estado}</span></td>`;
    cuerpo.appendChild(fila);
  });
}
// Espera a que existan los contenedores antes de buscarlos.
document.addEventListener('DOMContentLoaded', () => {
  crearMenu();
  crearCards();
  crearTabla();
});
