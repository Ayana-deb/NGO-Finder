// script.js

// ------------------------------
// SKILLS CONFIGURATION
// ------------------------------
const skillDisplay = {
  education: "📚 Education",
  health: "🏥 Health & Healthcare",
  environment: "🌱 Environment",
  women: "👩 Women Empowerment",
  animals: "🐾 Animal Welfare",
  technology: "💻 Technology",
  fundraising: "💰 Fundraising",
  content: "✍️ Content Writing",
  design: "🎨 Graphic Design",
  marketing: "📱 Digital Marketing",
  legal: "⚖️ Legal Aid",
  mentalhealth: "🧠 Mental Health",
  research: "🔬 Research",
  community: "🤝 Community Outreach",
  mentoring: "🌟 Mentoring",
  sports: "⚽ Sports & Recreation"
};

const skillsList = Object.entries(skillDisplay).map(([value, label]) => ({ value, label, icon: getSkillIcon(value) }));

function getSkillIcon(skill) {
  const icons = {
    education:'fa-book', health:'fa-heartbeat', environment:'fa-leaf', women:'fa-female',
    animals:'fa-paw', technology:'fa-laptop-code', fundraising:'fa-hand-holding-usd',
    content:'fa-pen', design:'fa-paint-brush', marketing:'fa-chart-line', legal:'fa-gavel',
    mentalhealth:'fa-brain', research:'fa-flask', community:'fa-users', mentoring:'fa-user-graduate',
    sports:'fa-futbol'
  };
  return icons[skill] || 'fa-star';
}

// ------------------------------
// GLOBAL STATE
// ------------------------------
let allNGOs = [];            // will be populated from API
let currentMatches = [];
let favoriteNGOs = JSON.parse(localStorage.getItem('favoriteNGOs')) || [];
let darkMode = localStorage.getItem('darkMode') === 'true';

// ------------------------------
// DOM ELEMENTS
// ------------------------------
const themeToggle = document.getElementById('themeToggle');
const clearSkillsBtn = document.getElementById('clearSkills');
const advancedFiltersBtn = document.getElementById('advancedFiltersBtn');
const locationFilter = document.getElementById('locationFilter');
const matchThreshold = document.getElementById('matchThreshold');
const thresholdValue = document.getElementById('thresholdValue');
const sortBy = document.getElementById('sortBy');
const saveResultsBtn = document.getElementById('saveResultsBtn');
const findMatchesBtn = document.getElementById('findMatchesBtn');
const vNameInput = document.getElementById('vName');
const skillsGrid = document.querySelector('.skills-grid');
const matchesContainer = document.getElementById('matches');
const resultsCountSpan = document.getElementById('resultsCount');
const selectedCountSpan = document.getElementById('selectedCount');

// ------------------------------
// INITIALIZATION
// ------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  populateSkills();
  setupEventListeners();
  if (darkMode) enableDarkMode();
  updateFavoritesUI();

  // Show loading state
  matchesContainer.innerHTML = `<div class="welcome-message"><i class="fas fa-spinner fa-pulse"></i><p>Loading latest NGO data...</p></div>`;
  
  // Fetch live NGO data
  await fetchLiveNGOData();
});

async function fetchLiveNGOData() {
  // Replace this URL with your own live API endpoint that returns an array of NGO objects
  // Expected JSON format: same structure as the default array below
  const API_URL = 'https://api.jsonbin.io/v3/b/67f4bb178960c979ec5b7eb2/latest'; // example public mock endpoint
  
  try {
    const response = await fetch(API_URL, { headers: { 'X-Master-Key': '$2a$10$yourkey' } }); // remove headers if not needed
    if (!response.ok) throw new Error('Network response not ok');
    const data = await response.json();
    // The actual array might be nested. Adjust according to your API response.
    allNGOs = Array.isArray(data) ? data : (data.record || data.data || []);
    if (!allNGOs.length) throw new Error('Empty data');
    console.log(`✅ Loaded ${allNGOs.length} NGOs from API`);
  } catch (error) {
    console.warn('Could not fetch live data, using fallback dataset:', error);
    allNGOs = getFallbackNGOs();
  }
  // Refresh UI if any skills were already selected?
  if (document.querySelectorAll('input[type="checkbox"]:checked').length > 0) {
    findMatches();
  } else {
    matchesContainer.innerHTML = `<div class="welcome-message"><i class="fas fa-arrow-up"></i><p>Select your skills and click "Find Matching NGOs" to get started!</p></div>`;
    resultsCountSpan.textContent = '0 NGOs found';
  }
}

function getFallbackNGOs() {
  // Comprehensive fallback dataset (same as before, but with all fields)
  return [
    { name: "Teach For India", skills: ["education", "community", "content", "research", "mentoring"], cause: "education", description: "Fellowship program placing graduates in low-income schools.", website: "https://www.teachforindia.org/volunteer", location: "Pan-India", type: "Education", volunteerNeeds: "high", impact: "1M+ children", founded: 2008 },
    { name: "Pratham Education Foundation", skills: ["education", "research", "community", "content", "technology"], cause: "education", description: "Improving learning outcomes for underprivileged children.", website: "https://pratham.org/volunteer", location: "Pan-India", type: "Education", volunteerNeeds: "medium", impact: "50M+ children", founded: 1994 },
    { name: "eVidyaloka", skills: ["education", "technology", "content", "community", "design"], cause: "education", description: "Volunteer online teachers for rural government schools.", website: "https://www.evidyaloka.org/volunteer", location: "Pan-India", type: "Education", volunteerNeeds: "high", impact: "100+ schools", founded: 2011 },
    { name: "Blue Cross of India", skills: ["animals", "community", "health"], cause: "animals", description: "Animal rescue, ABC programmes, shelters, adoption drives.", website: "https://bluecrossofindia.org/volunteer", location: "South India", type: "Animal Rescue", volunteerNeeds: "high", impact: "100K+ animals", founded: 1964 },
    { name: "People for Animals", skills: ["animals", "community", "research", "content", "fundraising"], cause: "animals", description: "India's largest animal welfare network.", website: "https://www.peopleforanimalsindia.org/volunteer", location: "Pan-India", type: "Animal Welfare", volunteerNeeds: "high", impact: "500K+ animals", founded: 1992 },
    { name: "WWF India", skills: ["environment", "research", "community", "content", "marketing"], cause: "environment", description: "Wildlife conservation and habitat protection.", website: "https://www.wwfindia.org/get_involved/volunteer", location: "Pan-India", type: "Conservation", volunteerNeeds: "medium", impact: "200+ projects", founded: 1969 },
    { name: "Greenpeace India", skills: ["environment", "community", "marketing", "content", "research", "design"], cause: "environment", description: "Environmental campaigns for climate action.", website: "https://www.greenpeace.org/india/en/get-involved", location: "Pan-India", type: "Activism", volunteerNeeds: "high", impact: "100+ campaigns", founded: 2001 },
    { name: "HelpAge India", skills: ["health", "mentalhealth", "community", "fundraising"], cause: "health", description: "Elderly care, healthcare camps, and senior citizen support.", website: "https://www.helpageindia.org/volunteer", location: "Pan-India", type: "Elderly Care", volunteerNeeds: "medium", impact: "30L+ elderly", founded: 1978 },
    { name: "CRY (Child Rights and You)", skills: ["education", "community", "research", "fundraising", "marketing"], cause: "child", description: "Ensuring happy childhoods through rights-based approach.", website: "https://www.cry.org/volunteer", location: "Pan-India", type: "Child Rights", volunteerNeeds: "high", impact: "3M+ children", founded: 1979 }
  ];
}

// ------------------------------
// UI HELPERS
// ------------------------------
function populateSkills() {
  skillsGrid.innerHTML = skillsList.map(skill => `
    <label class="skill-checkbox">
      <input type="checkbox" value="${skill.value}">
      <span class="skill-label"><i class="fas ${skill.icon}"></i> ${skill.label}</span>
    </label>
  `).join('');
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', updateSelectedCount));
}

function updateSelectedCount() {
  const count = document.querySelectorAll('input[type="checkbox"]:checked').length;
  selectedCountSpan.textContent = count;
}

function setupEventListeners() {
  themeToggle.addEventListener('click', toggleTheme);
  clearSkillsBtn.addEventListener('click', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateSelectedCount();
  });
  advancedFiltersBtn.addEventListener('click', () => document.getElementById('filtersPanel').classList.toggle('hidden'));
  locationFilter.addEventListener('change', () => applyFilters());
  matchThreshold.addEventListener('input', (e) => {
    thresholdValue.textContent = e.target.value + '%';
    applyFilters();
  });
  sortBy.addEventListener('change', () => applyFilters());
  saveResultsBtn.addEventListener('click', saveCurrentMatches);
  findMatchesBtn.addEventListener('click', findMatches);
}

function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  darkMode ? enableDarkMode() : disableDarkMode();
}
function enableDarkMode() { document.body.classList.add('dark-mode'); themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; }
function disableDarkMode() { document.body.classList.remove('dark-mode'); themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; }

// ------------------------------
// MATCHING ENGINE
// ------------------------------
function findMatches() {
  const selectedSkills = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
  
  if (selectedSkills.length === 0) {
    showNotification('Please select at least one skill', 'warning');
    matchesContainer.innerHTML = `<div class="no-matches"><i class="fas fa-exclamation-circle"></i><h3>No skills selected</h3><p>Select your skills above to find matching NGOs</p></div>`;
    resultsCountSpan.textContent = '0 NGOs found';
    currentMatches = [];
    return;
  }

  // Calculate match percentage based on overlap
  currentMatches = allNGOs.map(ngo => {
    const matchedSkills = ngo.skills.filter(s => selectedSkills.includes(s));
    const matchPercent = selectedSkills.length > 0 ? Math.round((matchedSkills.length / selectedSkills.length) * 100) : 0;
    return { ...ngo, matchedSkills, matchPercent };
  }).filter(ngo => ngo.matchedSkills.length > 0);

  applyFilters();
  
  const vName = vNameInput.value.trim();
  if (vName) displayGreeting(vName);
}

function applyFilters() {
  const loc = locationFilter.value;
  const min = parseInt(matchThreshold.value);
  const sort = sortBy.value;
  
  let filtered = [...currentMatches];
  if (loc !== 'all') filtered = filtered.filter(ngo => ngo.location.includes(loc));
  filtered = filtered.filter(ngo => ngo.matchPercent >= min);
  
  if (sort === 'name') filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (sort === 'skills') filtered.sort((a,b) => b.skills.length - a.skills.length);
  else filtered.sort((a,b) => b.matchPercent - a.matchPercent);
  
  displayMatches(filtered);
  resultsCountSpan.textContent = `${filtered.length} NGO${filtered.length !== 1 ? 's' : ''} found`;
}

function displayMatches(matches) {
  if (!matches.length) {
    matchesContainer.innerHTML = `<div class="no-matches"><i class="fas fa-search"></i><h3>No matches found</h3><p>Try adjusting your filters or selecting more skills</p></div>`;
    return;
  }
  
  const cardsHtml = matches.map((match, idx) => {
    const isFavorite = favoriteNGOs.includes(match.name);
    const badgeClass = match.volunteerNeeds === 'high' ? 'high' : 'medium';
    const badgeText = match.volunteerNeeds === 'high' ? 'Urgent Need' : 'Active';
    return `
      <div class="ngo-card glass-effect" data-ngo-name="${escapeHtml(match.name)}" style="animation-delay: ${idx * 0.1}s">
        <div class="card-badge ${badgeClass}">${badgeText}</div>
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-favorite-ngo="${escapeHtml(match.name)}">
          <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
        </button>
        <div class="card-header">
          <h3>${escapeHtml(match.name)}</h3>
          <span class="ngo-type">${escapeHtml(match.type)}</span>
        </div>
        <div class="match-indicator">
          <div class="match-bar"><div class="match-fill" style="width: ${match.matchPercent}%"></div></div>
          <span class="match-percent">${match.matchPercent}% Match</span>
        </div>
        <div class="skills-matched">
          <strong>Your skills needed:</strong>
          <div class="skill-tags">
            ${match.matchedSkills.map(s => `<span class="skill-tag"><i class="fas ${getSkillIcon(s)}"></i> ${skillDisplay[s] || s}</span>`).join('')}
          </div>
        </div>
        <p class="ngo-description">${escapeHtml(match.description)}</p>
        <div class="ngo-meta">
          <div class="meta-item"><i class="fas fa-map-marker-alt"></i><span>${escapeHtml(match.location)}</span></div>
          <div class="meta-item"><i class="fas fa-calendar-alt"></i><span>Since ${match.founded}</span></div>
          <div class="meta-item"><i class="fas fa-users"></i><span>${escapeHtml(match.impact)}</span></div>
        </div>
        <div class="card-actions">
          <a href="${escapeHtml(match.website)}" target="_blank" class="volunteer-btn"><i class="fas fa-hand-holding-heart"></i> Volunteer Now</a>
          <button class="share-btn" data-share-ngo="${escapeHtml(match.name)}"><i class="fas fa-share-alt"></i></button>
        </div>
      </div>
    `;
  }).join('');
  
  matchesContainer.innerHTML = cardsHtml;
  
  // Attach event listeners
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.getAttribute('data-favorite-ngo');
      if (name) toggleFavorite(name);
    });
  });
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.getAttribute('data-share-ngo');
      if (name) shareNGO(name);
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function displayGreeting(name) {
  const existing = document.querySelector('.greeting-message');
  if (existing) existing.remove();
  const greetingDiv = document.createElement('div');
  greetingDiv.className = 'greeting-message';
  greetingDiv.innerHTML = `<i class="fas fa-smile-wink"></i><h3>Hi ${escapeHtml(name)}! 👋</h3><p>We found some amazing NGOs that match your skills</p>`;
  const firstChild = matchesContainer.firstChild;
  if (firstChild) matchesContainer.insertBefore(greetingDiv, firstChild);
  else matchesContainer.appendChild(greetingDiv);
}

// ------------------------------
// FAVORITES & SHARE & SAVE
// ------------------------------
function toggleFavorite(ngoName) {
  const idx = favoriteNGOs.indexOf(ngoName);
  if (idx === -1) {
    favoriteNGOs.push(ngoName);
    showNotification('Added to favorites!', 'success');
  } else {
    favoriteNGOs.splice(idx, 1);
    showNotification('Removed from favorites', 'info');
  }
  localStorage.setItem('favoriteNGOs', JSON.stringify(favoriteNGOs));
  updateFavoritesUI();
  if (currentMatches.length) applyFilters();
}

function updateFavoritesUI() {
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const name = btn.getAttribute('data-favorite-ngo');
    if (name && favoriteNGOs.includes(name)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else if (name) {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });
}

function shareNGO(ngoName) {
  const ngo = allNGOs.find(n => n.name === ngoName);
  if (ngo) {
    if (navigator.share) navigator.share({ title: ngo.name, text: `Check out ${ngo.name}`, url: ngo.website });
    else navigator.clipboard.writeText(ngo.website).then(() => showNotification('Link copied!', 'success'));
  }
}

function saveCurrentMatches() {
  if (!currentMatches.length) { showNotification('No matches to save', 'warning'); return; }
  const saved = JSON.parse(localStorage.getItem('savedMatches') || '[]');
  saved.push({ timestamp: new Date().toLocaleString(), skills: Array.from(document.querySelectorAll('input:checked')).map(cb => cb.value), matches: currentMatches.slice(0,5) });
  localStorage.setItem('savedMatches', JSON.stringify(saved));
  showNotification('Matches saved!', 'success');
}

function showNotification(msg, type = 'info') {
  const notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':type==='warning'?'fa-exclamation-triangle':'fa-info-circle'}"></i><span>${msg}</span>`;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('show'), 10);
  setTimeout(() => { notif.classList.remove('show'); setTimeout(() => notif.remove(), 300); }, 3000);
}