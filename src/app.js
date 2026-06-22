const screens = document.querySelectorAll('.screen');
const navLinks = document.querySelectorAll('[data-view]');
const statusFilterButtons = document.querySelectorAll('[data-status]');
const leadTableBody = document.getElementById('leadTableBody');
const teamTableBody = document.getElementById('teamTableBody');
const teamForm = document.getElementById('teamForm');
const eventTableBody = document.getElementById('eventTableBody');
const eventForm = document.getElementById('eventForm');
const activeEventLabel = document.getElementById('activeEventLabel');
const currentEventInputs = document.querySelectorAll('.current-event');
const chartSelectors = document.querySelectorAll('[data-chart]');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const sidebar = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');

const leads = [
  {company:'1NIQ COMERCIAL LTDA', contact:'Isabela Borges', status:'Novo', interest:'Quente', type:'Pré-Captação', executive:'Executivo B', date:'22/06/2026'},
  {company:'EMPRESA LEGAL LTDA', contact:'Roberto Silva', status:'Qualificado', interest:'Morno', type:'Pré-Captação', executive:'Executivo A', date:'20/06/2026'},
  {company:'ABC TRANSPORTES LTDA', contact:'Mariana Costa', status:'Agendado', interest:'Quente', type:'Pré-Captação', executive:'Executivo C', date:'21/06/2026'},
  {company:'LOGÍSTICA SUL LTDA', contact:'Paulo Mendes', status:'Em Atendimento', interest:'Frio', type:'Captação', executive:'Executivo A', date:'22/06/2026'},
  {company:'GRUPO VALE INDústria', contact:'Fernanda Lima', status:'Negociação', interest:'Morno', type:'Pré-Captação', executive:'Executivo B', date:'18/06/2026'}
];

const statusMap = {
  Novo: 'badge-novo',
  Qualificado: 'badge-qualificado',
  Agendado: 'badge-agendado',
  'Em Atendimento': 'badge-atendimento',
  'Proposta Enviada': 'badge-proposta',
  Negociação: 'badge-negociacao',
  'Fechado Ganho': 'badge-ganho',
  'Fechado Perdido': 'badge-perdido'
};

const teamMembers = [
  { name: 'Executivo A', role: 'Executivo de Vendas', type: 'Ambos', status: 'Ativo', note: 'Preferência para leads quentes' },
  { name: 'Executivo B', role: 'Especialista em Pré-Captação', type: 'Pré-Captação', status: 'Ativo', note: 'Foco em leads qualificados' },
  { name: 'Executivo C', role: 'Closer', type: 'Captação', status: 'Ativo', note: 'Recebe leads com reunião agendada' }
];

function activateView(view) {
  screens.forEach((screen) => screen.classList.toggle('active', screen.id === view));
  navLinks.forEach((link) => link.classList.toggle('active', link.dataset.view === view));
  if (view === 'dashboard') {
    renderCharts();
  }
  if (view === 'management') {
    renderLeadTable();
  }
}

function renderLeadTable(status = 'all') {
  if (!leadTableBody) return;
  leadTableBody.innerHTML = '';
  const filtered = status === 'all' ? leads : leads.filter((lead) => lead.status === status);
  filtered.forEach((lead) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${lead.company}</strong></td>
      <td>${lead.contact}</td>
      <td>${lead.type}</td>
      <td>${lead.interest}</td>
      <td>${lead.date}</td>
      <td><span class="badge ${statusMap[lead.status] || 'badge-novo'}">${lead.status}</span></td>
      <td>${lead.executive}</td>
      <td><div class="tbl-actions"><i class="fa-solid fa-eye"></i><i class="fa-solid fa-pen-to-square"></i></div></td>
    `;
    leadTableBody.appendChild(row);
  });
}

function renderTeamTable() {
  if (!teamTableBody) return;
  teamTableBody.innerHTML = '';
  teamMembers.forEach((member) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${member.name}</strong></td>
      <td>${member.role}</td>
      <td>${member.type}</td>
      <td>${member.status}</td>
      <td>${member.note || '-'}</td>
    `;
    teamTableBody.appendChild(row);
  });
}

function addTeamMember(member) {
  teamMembers.push(member);
  renderTeamTable();
}

const events = [
  { name: 'CONARH 2026', location: 'São Paulo', start: '2026-06-22', end: '2026-06-24', status: 'Ativo', active: true }
];

let activeEvent = events.find((event) => event.active) || events[0] || null;

function getActiveEvent() {
  activeEvent = events.find((event) => event.active) || events[0] || null;
  return activeEvent;
}

function updateActiveEventDisplay() {
  const event = getActiveEvent();
  if (!event) return;
  const labelText = `${event.name} - ${event.location}`;
  activeEventLabel && (activeEventLabel.textContent = labelText);
  currentEventInputs.forEach((input) => { input.value = event.name; });
}

function setActiveEvent(eventName) {
  events.forEach((event) => {
    event.active = event.name === eventName;
    if (event.active) {
      event.status = 'Ativo';
      activeEvent = event;
    } else if (event.status === 'Ativo') {
      event.status = 'Inativo';
    }
  });
  renderEventTable();
  updateActiveEventDisplay();
}

function renderEventTable() {
  if (!eventTableBody) return;
  eventTableBody.innerHTML = '';
  events.forEach((event) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${event.name}</strong></td>
      <td>${event.location}</td>
      <td>${event.start}</td>
      <td>${event.end}</td>
      <td>${event.status}</td>
      <td>${event.active ? '<span class="badge badge-qualificado">Atual</span>' : `<button class="btn btn-outline-primary" data-event="${event.name}">Ativar</button>`}</td>
    `;
    eventTableBody.appendChild(row);
  });
  eventTableBody.querySelectorAll('button[data-event]').forEach((button) => {
    button.addEventListener('click', () => setActiveEvent(button.dataset.event));
  });
}

function addEvent(event) {
  if (event.status === 'Ativo') {
    events.forEach((existingEvent) => { existingEvent.active = false; if (existingEvent.status === 'Ativo') existingEvent.status = 'Inativo'; });
    event.active = true;
  }
  events.push(event);
  renderEventTable();
  updateActiveEventDisplay();
}

function getInterestCounts() {
  const counts = { Quente: 0, Morno: 0, Frio: 0 };
  leads.forEach((lead) => {
    if (counts[lead.interest] !== undefined) {
      counts[lead.interest] += 1;
    }
  });
  return counts;
}

function getWeeklySummary() {
  return {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    leads: [34, 42, 38, 50, 46, 56, 52],
    meetings: [12, 18, 20, 24, 20, 28, 30]
  };
}

const valueLabelPlugin = {
  id: 'valueLabelPlugin',
  afterDatasetsDraw(chart) {
    const ctx = chart.ctx;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      if (!meta.data) return;
      ctx.save();
      meta.data.forEach((element, index) => {
        const dataValue = dataset.data[index];
        const position = element.tooltipPosition();
        const fontSize = 12;
        ctx.font = `${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = dataset.borderColor || '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(dataValue, position.x, position.y - 10);
      });
      ctx.restore();
    });
  }
};

function renderCharts() {
  if (window.dashboardLine) return;
  const line = document.getElementById('chartActivity');
  const donut = document.getElementById('chartStatus');
  const weeklySummary = getWeeklySummary();
  const interestCounts = getInterestCounts();
  if (line) {
    window.dashboardLine = new Chart(line, {
      type: 'line',
      data: {
        labels: weeklySummary.labels,
        datasets: [
          { label: 'Leads', data: weeklySummary.leads, borderColor: '#E91E63', backgroundColor: 'rgba(233,30,99,.12)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#E91E63' },
          { label: 'Reuniões', data: weeklySummary.meetings, borderColor: '#2196F3', backgroundColor: 'rgba(33,150,243,.12)', tension: 0.4, fill: true, pointRadius: 5, pointBackgroundColor: '#2196F3' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.parsed.y}` } }
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: 'rgba(217,217,217,.6)' } }
        }
      },
      plugins: [valueLabelPlugin]
    });
  }
  if (donut) {
    new Chart(donut, {
      type: 'doughnut',
      data: {
        labels: ['Quente', 'Morno', 'Frio'],
        datasets: [{ data: [interestCounts.Quente, interestCounts.Morno, interestCounts.Frio], backgroundColor: ['#E91E63', '#F9A825', '#2196F3'], borderColor: '#fff', borderWidth: 2 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 10, generateLabels: (chart) => chart.data.labels.map((label, i) => ({ text: `${label} - ${chart.data.datasets[0].data[i]}`, fillStyle: chart.data.datasets[0].backgroundColor[i], strokeStyle: chart.data.datasets[0].backgroundColor[i], hidden: false, index: i })) } },
          tooltip: { callbacks: { label: (context) => `${context.label}: ${context.parsed} leads` } }
        }
      },
      plugins: [{
        id: 'doughnutLabelPlugin',
        afterDraw(chart) {
          const { ctx, chartArea: { width, height } } = chart;
          ctx.save();
          ctx.font = '700 18px Inter, sans-serif';
          ctx.fillStyle = '#111';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const total = chart.data.datasets[0].data.reduce((sum, value) => sum + value, 0);
          ctx.fillText(`${total} leads`, width / 2, height / 2 - 10);
          ctx.font = '400 12px Inter, sans-serif';
          ctx.fillText('por interesse', width / 2, height / 2 + 12);
          ctx.restore();
        }
      }]
    });
  }
}

function showStatus(status) {
  statusFilterButtons.forEach((button) => button.classList.toggle('active', button.dataset.status === status));
  renderLeadTable(status);
}

function openSidebar() {
  sidebar?.classList.add('open');
  sidebarBackdrop?.classList.add('open');
  mobileMenuButton?.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  sidebar?.classList.remove('open');
  sidebarBackdrop?.classList.remove('open');
  mobileMenuButton?.setAttribute('aria-expanded', 'false');
}

function submitForm(formId, message) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert(message);
    form.reset();
  });
}

function handleTeamForm() {
  if (!teamForm) return;
  teamForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('teamName')?.value.trim();
    const role = document.getElementById('teamRole')?.value.trim();
    const type = document.getElementById('teamType')?.value;
    const status = document.getElementById('teamStatus')?.value;
    const note = document.getElementById('teamNote')?.value.trim();
    if (!name || !role) {
      alert('Preencha o nome e o cargo do executivo.');
      return;
    }
    addTeamMember({ name, role, type, status, note });
    alert('Executivo cadastrado com sucesso.');
    teamForm.reset();
  });
}

function handleEventForm() {
  if (!eventForm) return;
  eventForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('eventName')?.value.trim();
    const location = document.getElementById('eventLocation')?.value.trim();
    const start = document.getElementById('eventStart')?.value;
    const end = document.getElementById('eventEnd')?.value;
    const status = document.getElementById('eventStatus')?.value;
    if (!name || !location || !start || !end) {
      alert('Preencha todos os campos do evento.');
      return;
    }
    addEvent({ name, location, start, end, status });
    alert('Evento cadastrado com sucesso.');
    eventForm.reset();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  navLinks.forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    activateView(link.dataset.view);
    closeSidebar();
  }));

  statusFilterButtons.forEach((button) => button.addEventListener('click', () => showStatus(button.dataset.status)));
  mobileMenuButton?.addEventListener('click', openSidebar);
  sidebarBackdrop?.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeSidebar(); });

  submitForm('precapForm', 'Lead de pré-captação registrado com sucesso.');
  submitForm('captureForm', 'Lead de captação registrado com sucesso.');
  handleTeamForm();
  handleEventForm();
  renderTeamTable();
  renderEventTable();
  updateActiveEventDisplay();
  activateView('dashboard');
});
