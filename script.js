// ======================== GLOBAL STATE ========================
let currentUserId = null;
let currentMatches = [];
let favoriteNGOs = [];       
let showOnlyFavorites = false;
let allSkills = [];          
const skillDisplay = {};     

// ======================== DOM ELEMENTS ========================
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
const showFavoritesBtn = document.getElementById('showFavoritesBtn');

// ======================== HELPER FUNCTIONS ========================
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function showNotification(msg, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerHTML = `<i class="fas ${type==='success'?'fa-check-circle':type==='warning'?'fa-exclamation-triangle':'fa-info-circle'}"></i><span>${msg}</span>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.classList.add('show'), 10);
    setTimeout(() => { notif.classList.remove('show'); setTimeout(() => notif.remove(), 300); }, 3000);
}

function getSkillIcon(skillName) {
    const icons = {
        education:'fa-book', health:'fa-heartbeat', environment:'fa-leaf', women:'fa-female',
        animals:'fa-paw', technology:'fa-laptop-code', fundraising:'fa-hand-holding-usd',
        content:'fa-pen', design:'fa-paint-brush', marketing:'fa-chart-line', legal:'fa-gavel',
        mentalhealth:'fa-brain', research:'fa-flask', community:'fa-users', mentoring:'fa-user-graduate',
        sports:'fa-futbol'
    };
    return icons[skillName] || 'fa-star';
}

// ======================== LOAD SKILLS – HARDCODED ICONS BY DISPLAY LABEL ========================
async function loadSkills() {
    try {
        const res = await fetch('/api/skills');
        const skills = await res.json();
        allSkills = skills;
        skills.forEach(s => { skillDisplay[s.skill_name] = s.display_label; });

        // ----- ULTRA-RELIABLE ICON MAP using the exact text you see on screen -----
        const labelToIcon = {
            "Animal Welfare": "fa-paw",
            "Community Outreach": "fa-users",
            "Content Writing": "fa-pen",
            "Graphic Design": "fa-paint-brush",
            "Education": "fa-book",
            "Environment": "fa-leaf",
            "Fundraising": "fa-hand-holding-usd",
            "Health & Healthcare": "fa-heartbeat",
            "Legal Aid": "fa-gavel",
            "Digital Marketing": "fa-chart-line",
            "Mental Health": "fa-brain",
            "Mentoring": "fa-user-graduate",
            "Research": "fa-flask",
            "Sports & Recreation": "fa-futbol",
            "Technology": "fa-laptop-code",
            "Women Empowerment": "fa-female"
        };

        // Also map by skill_name (lowercase, no spaces) as a fallback
        const nameToIcon = {
            "animals": "fa-paw",
            "community": "fa-users",
            "content": "fa-pen",
            "design": "fa-paint-brush",
            "education": "fa-book",
            "environment": "fa-leaf",
            "fundraising": "fa-hand-holding-usd",
            "health": "fa-heartbeat",
            "legal": "fa-gavel",
            "marketing": "fa-chart-line",
            "mentalhealth": "fa-brain",
            "mentoring": "fa-user-graduate",
            "research": "fa-flask",
            "sports": "fa-futbol",
            "technology": "fa-laptop-code",
            "women": "fa-female"
        };

        skillsGrid.innerHTML = skills.map(skill => {
            // Try to get icon from display label first, then from skill_name, then default to heart
            let iconClass = labelToIcon[skill.display_label] || nameToIcon[skill.skill_name] || "fa-heart";
            return `
                <label class="skill-checkbox">
                    <input type="checkbox" value="${skill.skill_name}">
                    <span class="skill-label"><i class="fas ${iconClass}"></i> ${skill.display_label}</span>
                </label>
            `;
        }).join('');

        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', updateSelectedCount));
    } catch (err) {
        console.error('Failed to load skills', err);
        showNotification('Could not load skills. Make sure backend is running.', 'danger');
    }
}

function updateSelectedCount() {
    const count = document.querySelectorAll('input[type="checkbox"]:checked').length;
    selectedCountSpan.textContent = count;
}

// ======================== AUTHENTICATION ========================
async function checkAuth() {
    try {
        const res = await fetch('/api/me', { credentials: 'include' });
        const data = await res.json();
        if (data.loggedIn) {
            currentUserId = data.userId;
            vNameInput.value = data.name;
            await loadFavorites();
            const authSpan = document.getElementById('authLinks');
            if (authSpan) {
                authSpan.innerHTML = `<span>Welcome, ${escapeHtml(data.name)} | <a href="#" id="logoutLink"><i class="fas fa-sign-out-alt"></i> Logout</a></span>`;
                document.getElementById('logoutLink')?.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
                    localStorage.clear();
                    window.location.href = 'index.html';
                });
            }
        } else {
            const authSpan = document.getElementById('authLinks');
            if (authSpan) {
                authSpan.innerHTML = `<a href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a> <a href="register.html"><i class="fas fa-user-plus"></i> Register</a>`;
            }
        }
    } catch (err) {
        console.error('Auth check failed', err);
    }
}

async function loadFavorites() {
    if (!currentUserId) return;
    try {
        const res = await fetch('/api/favorites', { credentials: 'include' });
        const favs = await res.json();
        favoriteNGOs = favs.map(f => f.id);
    } catch (err) {
        console.error('Failed to load favorites', err);
    }
}

// ======================== MATCHING & FILTERS ========================
async function findMatches() {
    if (!currentUserId) {
        if (confirm('Please login to see matches. Click OK to go to login page.')) {
            window.location.href = 'login.html';
        }
        return;
    }
    const selectedSkills = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    if (selectedSkills.length === 0) {
        showNotification('Please select at least one skill', 'warning');
        matchesContainer.innerHTML = `<div class="no-matches"><i class="fas fa-exclamation-circle"></i><h3>No skills selected</h3><p>Select your skills above to find matching NGOs</p></div>`;
        resultsCountSpan.textContent = '0 NGOs found';
        currentMatches = [];
        return;
    }
    try {
        await fetch('/api/user-skills', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ skills: selectedSkills })
        });
        const matchRes = await fetch('/api/matches', {
            method: 'POST',
            credentials: 'include'
        });
        currentMatches = await matchRes.json();
        applyFilters();
        const name = vNameInput.value.trim();
        if (name) displayGreeting(name);
    } catch (err) {
        console.error(err);
        showNotification('Error finding matches', 'danger');
    }
}

function applyFilters() {
    const loc = locationFilter.value;
    const min = parseInt(matchThreshold.value);
    const sort = sortBy.value;
    
    let filtered = [...currentMatches];
    if (loc !== 'all') filtered = filtered.filter(ngo => ngo.location.includes(loc));
    filtered = filtered.filter(ngo => ngo.matchPercent >= min);
    if (showOnlyFavorites) {
        filtered = filtered.filter(ngo => favoriteNGOs.includes(ngo.id));
    }
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
        const isFavorite = favoriteNGOs.includes(match.id);
        const badgeClass = match.volunteer_needs === 'high' ? 'high' : 'medium';
        const badgeText = match.volunteer_needs === 'high' ? 'Urgent Need' : 'Active';
        return `
            <div class="ngo-card glass-effect" data-ngo-id="${match.id}" style="animation-delay: ${idx * 0.1}s">
                <div class="card-badge ${badgeClass}">${badgeText}</div>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-favorite-ngo-id="${match.id}">
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
                    <button class="share-btn" data-share-ngo-name="${escapeHtml(match.name)}"><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
        `;
    }).join('');
    
    matchesContainer.innerHTML = cardsHtml;
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const ngoId = parseInt(btn.getAttribute('data-favorite-ngo-id'));
            await toggleFavorite(ngoId);
        });
    });
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = btn.getAttribute('data-share-ngo-name');
            shareNGO(name);
        });
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

async function shareNGO(ngoName) {
    try {
        const ngo = currentMatches.find(n => n.name === ngoName);
        if (ngo && ngo.website) {
            if (navigator.share) navigator.share({ title: ngo.name, url: ngo.website });
            else navigator.clipboard.writeText(ngo.website).then(() => showNotification('Link copied!', 'success'));
        }
    } catch(e) {}
}

async function toggleFavorite(ngoId) {
    if (!currentUserId) {
        alert('Please login to save favorites');
        return;
    }
    const isFav = favoriteNGOs.includes(ngoId);
    const action = isFav ? 'remove' : 'add';
    try {
        await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ ngoId, action })
        });
        if (action === 'add') {
            favoriteNGOs.push(ngoId);
            showNotification('Added to favorites', 'success');
        } else {
            favoriteNGOs = favoriteNGOs.filter(id => id !== ngoId);
            showNotification('Removed from favorites', 'info');
        }
        applyFilters();
    } catch (err) {
        showNotification('Error updating favorite', 'danger');
    }
}

function toggleTheme() {
    const dark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', dark);
    themeToggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
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
    saveResultsBtn.addEventListener('click', () => {
        if (currentMatches.length) {
            localStorage.setItem('savedMatches', JSON.stringify(currentMatches.slice(0,5)));
            showNotification('Matches saved locally!', 'success');
        } else {
            showNotification('No matches to save', 'warning');
        }
    });
    findMatchesBtn.addEventListener('click', findMatches);
    if (showFavoritesBtn) {
        showFavoritesBtn.addEventListener('click', () => {
            showOnlyFavorites = !showOnlyFavorites;
            if (showOnlyFavorites) {
                showFavoritesBtn.style.color = 'var(--danger)';
                showFavoritesBtn.style.backgroundColor = 'rgba(214, 48, 49, 0.1)';
            } else {
                showFavoritesBtn.style.color = '';
                showFavoritesBtn.style.backgroundColor = '';
            }
            applyFilters();
        });
    }
}

async function init() {
    await loadSkills();
    setupEventListeners();
    await checkAuth();
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    matchesContainer.innerHTML = `<div class="welcome-message"><i class="fas fa-arrow-up"></i><p>Select your skills and click "Find Matching NGOs" to get started!</p></div>`;
}

init();