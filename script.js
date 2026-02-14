// Enhanced NGO database with 50+ Indian NGOs
const ngos = [
  // Education NGOs
  {
    name: "Teach For India",
    skills: ["education", "community", "content", "research", "mentoring"],
    cause: "education",
    description: "Fellowship program placing outstanding graduates and professionals in low-income schools to teach full-time for two years.",
    website: "https://www.teachforindia.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Education",
    volunteerNeeds: "high",
    impact: "Reached 1M+ children",
    founded: 2008
  },
  {
    name: "Pratham Education Foundation",
    skills: ["education", "research", "community", "content", "technology"],
    cause: "education",
    description: "Working to improve learning outcomes for millions of underprivileged children through innovative teaching methods.",
    website: "https://pratham.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Education",
    volunteerNeeds: "medium",
    impact: "Reached 50M+ children",
    founded: 1994
  },
  {
    name: "eVidyaloka",
    skills: ["education", "technology", "content", "community", "design"],
    cause: "education",
    description: "Volunteer online teachers for rural government schools through digital classrooms.",
    website: "https://www.evidyaloka.org/volunteer",
    location: "Pan-India",
    city: "Remote",
    type: "Education",
    volunteerNeeds: "high",
    impact: "100+ rural schools",
    founded: 2011
  },
  {
    name: "Akshaya Patra Foundation",
    skills: ["fundraising", "marketing", "content", "community"],
    cause: "education",
    description: "Mid-day meal program for school children. Volunteers help with fundraising and awareness.",
    website: "https://www.akshayapatra.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Food & Education",
    volunteerNeeds: "medium",
    impact: "2M+ meals daily",
    founded: 2000
  },
  {
    name: "Make A Difference (MAD)",
    skills: ["education", "mentoring", "community", "content", "fundraising"],
    cause: "education",
    description: "Ensure equal opportunities for children in shelters through education and mentorship.",
    website: "https://makeadiff.in/volunteer",
    location: "Pan-India",
    city: "23 Cities",
    type: "Education & Mentoring",
    volunteerNeeds: "high",
    impact: "5000+ children",
    founded: 2006
  },

  // Health NGOs
  {
    name: "HelpAge India",
    skills: ["health", "mentalhealth", "community", "fundraising"],
    cause: "health",
    description: "Elderly care, healthcare camps, and senior citizen support programs.",
    website: "https://www.helpageindia.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Elderly Care",
    volunteerNeeds: "medium",
    impact: "30L+ elderly served",
    founded: 1978
  },
  {
    name: "Smile Foundation",
    skills: ["education", "health", "women", "community", "mentalhealth"],
    cause: "multicause",
    description: "Education, healthcare, livelihood, and women empowerment projects across India.",
    website: "https://www.smilefoundationindia.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Multicause",
    volunteerNeeds: "high",
    impact: "15L+ children impacted",
    founded: 2002
  },
  {
    name: "CARE India",
    skills: ["women", "health", "education", "community", "research"],
    cause: "health",
    description: "Women's empowerment, health, and education programs in rural areas.",
    website: "https://www.careindia.org/volunteer",
    location: "Pan-India",
    city: "9 States",
    type: "Health & Women",
    volunteerNeeds: "medium",
    impact: "50M+ people",
    founded: 1950
  },
  {
    name: "Sankara Eye Foundation",
    skills: ["health", "fundraising", "community", "marketing"],
    cause: "health",
    description: "Providing free eye care and surgeries to underprivileged communities.",
    website: "https://www.giftofvision.org/volunteer",
    location: "Pan-India",
    city: "11 Cities",
    type: "Healthcare",
    volunteerNeeds: "medium",
    impact: "3.5M+ eye surgeries",
    founded: 1977
  },
  {
    name: "Child In Need Institute (CINI)",
    skills: ["health", "education", "women", "community", "research"],
    cause: "health",
    description: "Maternal and child health, nutrition, and education in West Bengal.",
    website: "https://www.cini-india.org/support-us",
    location: "East India",
    city: "Kolkata",
    type: "Child Health",
    volunteerNeeds: "low",
    impact: "5M+ beneficiaries",
    founded: 1974
  },

  // Environment NGOs
  {
    name: "WWF India",
    skills: ["environment", "research", "community", "content", "marketing"],
    cause: "environment",
    description: "Wildlife conservation, habitat protection, and environmental education.",
    website: "https://www.wwfindia.org/get_involved/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Conservation",
    volunteerNeeds: "medium",
    impact: "200+ conservation projects",
    founded: 1969
  },
  {
    name: "Greenpeace India",
    skills: ["environment", "community", "marketing", "content", "research", "design"],
    cause: "environment",
    description: "Environmental campaigns and climate action through peaceful protests and awareness.",
    website: "https://www.greenpeace.org/india/en/get-involved",
    location: "Pan-India",
    city: "Bengaluru",
    type: "Environmental Activism",
    volunteerNeeds: "high",
    impact: "100+ campaigns",
    founded: 2001
  },
  {
    name: "Environmentalist Foundation of India",
    skills: ["environment", "community", "research", "design"],
    cause: "environment",
    description: "Lake and water-body conservation through scientific restoration.",
    website: "https://indiaenvironment.org/volunteer",
    location: "Pan-India",
    city: "12 Cities",
    type: "Water Conservation",
    volunteerNeeds: "high",
    impact: "50+ lakes restored",
    founded: 2007
  },
  {
    name: "SayTrees",
    skills: ["environment", "community", "marketing", "design"],
    cause: "environment",
    description: "Afforestation and urban greening projects across multiple cities.",
    website: "https://saytrees.org/volunteer",
    location: "Pan-India",
    city: "8 Cities",
    type: "Afforestation",
    volunteerNeeds: "high",
    impact: "5M+ trees planted",
    founded: 2007
  },
  {
    name: "Chintan Environmental Group",
    skills: ["environment", "research", "community", "legal", "content"],
    cause: "environment",
    description: "Waste management, sustainable livelihoods, and environmental justice.",
    website: "https://chintan-india.org/support-us",
    location: "North India",
    city: "Delhi NCR",
    type: "Environmental Justice",
    volunteerNeeds: "medium",
    impact: "100K+ waste workers",
    founded: 1999
  },

  // Animal Welfare NGOs
  {
    name: "People for Animals",
    skills: ["animals", "community", "research", "content", "fundraising"],
    cause: "animals",
    description: "India's largest animal welfare network with 26 hospitals and 60+ units.",
    website: "https://www.peopleforanimalsindia.org/volunteer",
    location: "Pan-India",
    city: "60+ Cities",
    type: "Animal Welfare",
    volunteerNeeds: "high",
    impact: "500K+ animals treated",
    founded: 1992
  },
  {
    name: "Wildlife SOS",
    skills: ["animals", "environment", "community", "content", "design"],
    cause: "animals",
    description: "Rescue and rehabilitation of bears, elephants, leopards, and other wildlife.",
    website: "https://wildlifesos.org/get-involved/volunteer",
    location: "Pan-India",
    city: "10 States",
    type: "Wildlife Rescue",
    volunteerNeeds: "medium",
    impact: "25K+ animals rescued",
    founded: 1995
  },
  {
    name: "Blue Cross of India",
    skills: ["animals", "community", "health"],
    cause: "animals",
    description: "Animal rescue, ABC programmes, shelters, and adoption drives.",
    website: "https://bluecrossofindia.org/volunteer",
    location: "South India",
    city: "Chennai",
    type: "Animal Rescue",
    volunteerNeeds: "high",
    impact: "100K+ animals",
    founded: 1964
  },
  {
    name: "CUPA (Compassion Unlimited Plus Action)",
    skills: ["animals", "health", "community", "fundraising"],
    cause: "animals",
    description: "Animal rescue, shelter, and adoption center in Bangalore.",
    website: "https://cupabangalore.org/volunteer",
    location: "South India",
    city: "Bengaluru",
    type: "Animal Welfare",
    volunteerNeeds: "high",
    impact: "15K+ animals/year",
    founded: 1991
  },

  // Women Empowerment
  {
    name: "SEWA (Self-Employed Women's Association)",
    skills: ["women", "community", "legal", "research", "fundraising"],
    cause: "women",
    description: "Trade union empowering women workers in the informal sector.",
    website: "https://www.sewa.org/get-involved",
    location: "Pan-India",
    city: "Gujarat & Pan-India",
    type: "Women Empowerment",
    volunteerNeeds: "medium",
    impact: "2M+ women members",
    founded: 1972
  },
  {
    name: "Azad Foundation",
    skills: ["women", "education", "community", "marketing", "design"],
    cause: "women",
    description: "Empowering women from resource-poor communities through livelihood training.",
    website: "https://azadfoundation.com/get-involved",
    location: "North India",
    city: "Delhi, Jaipur, Kolkata",
    type: "Women Livelihood",
    volunteerNeeds: "medium",
    impact: "10K+ women trained",
    founded: 2008
  },
  {
    name: "Mann Deshi Foundation",
    skills: ["women", "education", "fundraising", "marketing", "legal"],
    cause: "women",
    description: "Supporting rural women entrepreneurs through business training and microfinance.",
    website: "https://manndeshi.org/volunteer",
    location: "West India",
    city: "Maharashtra",
    type: "Women Entrepreneurship",
    volunteerNeeds: "medium",
    impact: "600K+ women",
    founded: 1996
  },
  {
    name: "Breakthrough India",
    skills: ["women", "legal", "marketing", "content", "design"],
    cause: "women",
    description: "Making gender-based violence and discrimination unacceptable through culture and law.",
    website: "https://inbreakthrough.org/get-involved",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Gender Justice",
    volunteerNeeds: "medium",
    impact: "10M+ youth reached",
    founded: 2000
  },

  // Child Rights & Development
  {
    name: "CRY (Child Rights and You)",
    skills: ["education", "community", "research", "fundraising", "marketing"],
    cause: "child",
    description: "Ensuring happy childhoods for every child through rights-based approach.",
    website: "https://www.cry.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Child Rights",
    volunteerNeeds: "high",
    impact: "3M+ children",
    founded: 1979
  },
  {
    name: "Butterflies",
    skills: ["education", "community", "research", "legal", "content"],
    cause: "child",
    description: "Working with street and working children through education and advocacy.",
    website: "https://butterflieschildrights.org/support-us",
    location: "North India",
    city: "Delhi",
    type: "Child Rights",
    volunteerNeeds: "medium",
    impact: "100K+ children",
    founded: 1989
  },
  {
    name: "Childline India Foundation",
    skills: ["child", "legal", "community", "research", "mentalhealth"],
    cause: "child",
    description: "24/7 helpline for children in distress. Volunteers support outreach and awareness.",
    website: "https://www.childlineindia.org/volunteer",
    location: "Pan-India",
    city: "600+ Districts",
    type: "Child Protection",
    volunteerNeeds: "high",
    impact: "10M+ calls handled",
    founded: 1996
  },

  // Disaster Relief & Rural Development
  {
    name: "Goonj",
    skills: ["women", "community", "environment", "fundraising", "marketing"],
    cause: "rural",
    description: "Urban-rural connection through disaster relief, rural development, and dignity of work.",
    website: "https://goonj.org/get-involved",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Rural Development",
    volunteerNeeds: "high",
    impact: "2500+ villages",
    founded: 1999
  },
  {
    name: "SEEDS (Sustainable Environment and Ecological Development Society)",
    skills: ["environment", "community", "research", "technology"],
    cause: "disaster",
    description: "Disaster preparedness, response, and resilient rebuilding.",
    website: "https://www.seedsindia.org/support-us",
    location: "Pan-India",
    city: "Disaster-prone areas",
    type: "Disaster Management",
    volunteerNeeds: "medium",
    impact: "3M+ people helped",
    founded: 1994
  },
  {
    name: "Gram Vikas",
    skills: ["community", "health", "environment", "research", "technology"],
    cause: "rural",
    description: "Rural development through water, sanitation, livelihood, and education.",
    website: "https://gramvikas.org/support-us",
    location: "East India",
    city: "Odisha",
    type: "Rural Development",
    volunteerNeeds: "low",
    impact: "2000+ villages",
    founded: 1979
  },

  // Disability & Inclusion
  {
    name: "Enable India",
    skills: ["technology", "education", "community", "mentalhealth", "research"],
    cause: "disability",
    description: "Empowering persons with disabilities through livelihood and independence.",
    website: "https://enableindia.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Disability Inclusion",
    volunteerNeeds: "high",
    impact: "60K+ persons",
    founded: 1999
  },
  {
    name: "ADAPT (Able Disable All People Together)",
    skills: ["education", "health", "research", "technology"],
    cause: "disability",
    description: "Education and rehabilitation for children with disabilities.",
    website: "https://adaptssi.org/support-us",
    location: "West India",
    city: "Mumbai",
    type: "Disability",
    volunteerNeeds: "medium",
    impact: "10K+ children",
    founded: 1972
  },

  // Digital & Technology
  {
    name: "Digital Empowerment Foundation",
    skills: ["technology", "education", "community", "research", "marketing"],
    cause: "digital",
    description: "Bridging the digital divide through digital literacy programs.",
    website: "https://defindia.org/volunteer",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Digital Inclusion",
    volunteerNeeds: "high",
    impact: "10M+ people",
    founded: 2002
  },
  {
    name: "HasGeek",
    skills: ["technology", "community", "design", "marketing", "content"],
    cause: "technology",
    description: "Tech community organizing conferences and meetups for social good.",
    website: "https://hasgeek.com/contribute",
    location: "Pan-India",
    city: "Bengaluru",
    type: "Tech Community",
    volunteerNeeds: "medium",
    impact: "100+ events",
    founded: 2010
  },

  // Livelihood & Skill Development
  {
    name: "Magic Bus India Foundation",
    skills: ["education", "community", "mentoring", "sports", "research"],
    cause: "youth",
    description: "Using sports and activity-based learning for youth development.",
    website: "https://www.magicbusindia.org/volunteer",
    location: "Pan-India",
    city: "22 States",
    type: "Youth Development",
    volunteerNeeds: "medium",
    impact: "1M+ children",
    founded: 1999
  },
  {
    name: "Dr. Reddy's Foundation",
    skills: ["education", "research", "community", "technology", "mentalhealth"],
    cause: "livelihood",
    description: "Skill development and sustainable livelihoods for youth.",
    website: "https://drreddysfoundation.org/get-involved",
    location: "Pan-India",
    city: "Multiple Cities",
    type: "Skill Development",
    volunteerNeeds: "low",
    impact: "500K+ youth",
    founded: 1996
  }
];

// Skill display mapping
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

// Skill categories for display
const skillsList = Object.entries(skillDisplay).map(([value, label]) => ({
  value,
  label,
  icon: getSkillIcon(value)
}));

function getSkillIcon(skill) {
  const icons = {
    education: 'fa-book',
    health: 'fa-heartbeat',
    environment: 'fa-leaf',
    women: 'fa-female',
    animals: 'fa-paw',
    technology: 'fa-laptop-code',
    fundraising: 'fa-hand-holding-usd',
    content: 'fa-pen',
    design: 'fa-paint-brush',
    marketing: 'fa-chart-line',
    legal: 'fa-gavel',
    mentalhealth: 'fa-brain',
    research: 'fa-flask',
    community: 'fa-users',
    mentoring: 'fa-user-graduate',
    sports: 'fa-futbol'
  };
  return icons[skill] || 'fa-star';
}

// State management
let favoriteNGOs = JSON.parse(localStorage.getItem('favoriteNGOs')) || [];
let currentMatches = [];
let darkMode = localStorage.getItem('darkMode') === 'true';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  populateSkills();
  setupEventListeners();
  if (darkMode) enableDarkMode();
  updateFavoritesUI();
});

function populateSkills() {
  const skillsGrid = document.querySelector('.skills-grid');
  skillsGrid.innerHTML = skillsList.map(skill => `
    <label class="skill-checkbox">
      <input type="checkbox" value="${skill.value}">
      <span class="skill-label">
        <i class="fas ${skill.icon}"></i>
        ${skill.label}
      </span>
    </label>
  `).join('');
}

function setupEventListeners() {
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Skills counter
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateSelectedCount);
  });
  
  // Clear skills button
  document.getElementById('clearSkills').addEventListener('click', clearAllSkills);
  
  // Advanced filters toggle
  document.getElementById('advancedFiltersBtn').addEventListener('click', toggleFilters);
  
  // Filter listeners
  document.getElementById('locationFilter').addEventListener('change', applyFilters);
  document.getElementById('matchThreshold').addEventListener('input', (e) => {
    document.getElementById('thresholdValue').textContent = e.target.value + '%';
    applyFilters();
  });
  document.getElementById('sortBy').addEventListener('change', applyFilters);
  
  // Save results button
  document.getElementById('saveResultsBtn').addEventListener('click', saveCurrentMatches);
}

function updateSelectedCount() {
  const count = document.querySelectorAll('input[type="checkbox"]:checked').length;
  document.getElementById('selectedCount').textContent = count;
}

function clearAllSkills() {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  updateSelectedCount();
}

function toggleFilters() {
  const panel = document.getElementById('filtersPanel');
  panel.classList.toggle('hidden');
}

function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  if (darkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  document.getElementById('themeToggle').innerHTML = '<i class="fas fa-moon"></i>';
}

function findMatches() {
  const vName = document.getElementById('vName').value.trim();
  const selectedSkills = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  const resultDiv = document.getElementById('matches');
  
  if (selectedSkills.length === 0) {
    showNotification('Please select at least one skill', 'warning');
    resultDiv.innerHTML = `
      <div class="no-matches">
        <i class="fas fa-exclamation-circle"></i>
        <h3>No skills selected</h3>
        <p>Select your skills above to find matching NGOs</p>
      </div>
    `;
    return;
  }

  // Calculate matches with advanced algorithm
  currentMatches = calculateMatches(selectedSkills);
  
  // Apply initial filters
  applyFilters();
  
  // Show personalized greeting
  displayGreeting(vName);
  
  // Update results count
  document.getElementById('resultsCount').textContent = `${currentMatches.length} NGOs found`;
}

function calculateMatches(selectedSkills) {
  return ngos
    .map(ngo => {
      const matchedSkills = ngo.skills.filter(s => selectedSkills.includes(s));
      const matchScore = matchedSkills.length / Math.max(ngo.skills.length, selectedSkills.length);
      
      // Calculate weighted score based on skill relevance
      const uniqueMatchBonus = matchedSkills.length > 0 ? 0.1 : 0;
      
      return {
        ...ngo,
        matchedSkills,
        matchScore,
        matchPercent: Math.round((matchedSkills.length / selectedSkills.length) * 100),
        matchWeightedScore: Math.min(100, Math.round((matchScore * 80 + uniqueMatchBonus * 20) * 100))
      };
    })
    .filter(ngo => ngo.matchedSkills.length > 0)
    .sort((a, b) => b.matchWeightedScore - a.matchWeightedScore);
}

function applyFilters() {
  const locationFilter = document.getElementById('locationFilter').value;
  const matchThreshold = parseInt(document.getElementById('matchThreshold').value) / 100;
  const sortBy = document.getElementById('sortBy').value;
  
  let filteredMatches = [...currentMatches];
  
  // Apply location filter
  if (locationFilter !== 'all') {
    filteredMatches = filteredMatches.filter(ngo => ngo.location.includes(locationFilter));
  }
  
  // Apply match threshold
  filteredMatches = filteredMatches.filter(ngo => ngo.matchScore >= matchThreshold);
  
  // Apply sorting
  switch(sortBy) {
    case 'name':
      filteredMatches.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'skills':
      filteredMatches.sort((a, b) => b.skills.length - a.skills.length);
      break;
    default: // match
      filteredMatches.sort((a, b) => b.matchWeightedScore - a.matchWeightedScore);
  }
  
  displayMatches(filteredMatches);
  document.getElementById('resultsCount').textContent = `${filteredMatches.length} NGOs found`;
}

function displayMatches(matches) {
  const resultDiv = document.getElementById('matches');
  
  if (matches.length === 0) {
    resultDiv.innerHTML = `
      <div class="no-matches">
        <i class="fas fa-search"></i>
        <h3>No matches found</h3>
        <p>Try adjusting your filters or selecting more skills</p>
      </div>
    `;
    return;
  }

  resultDiv.innerHTML = matches.map((match, index) => {
    const isFavorite = favoriteNGOs.includes(match.name);
    
    return `
      <div class="ngo-card glass-effect" style="animation-delay: ${index * 0.1}s">
        <div class="card-badge ${match.volunteerNeeds}">${match.volunteerNeeds === 'high' ? 'Urgent Need' : 'Active'}</div>
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite('${match.name}')">
          <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
        </button>
        
        <div class="card-header">
          <h3>${match.name}</h3>
          <span class="ngo-type">${match.type}</span>
        </div>
        
        <div class="match-indicator">
          <div class="match-bar">
            <div class="match-fill" style="width: ${match.matchWeightedScore}%"></div>
          </div>
          <span class="match-percent">${match.matchWeightedScore}% Match</span>
        </div>
        
        <div class="skills-matched">
          <strong>Your skills needed:</strong>
          <div class="skill-tags">
            ${match.matchedSkills.map(skill => 
              `<span class="skill-tag"><i class="fas ${getSkillIcon(skill)}"></i> ${skillDisplay[skill] || skill}</span>`
            ).join('')}
          </div>
        </div>
        
        <p class="ngo-description">${match.description}</p>
        
        <div class="ngo-meta">
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${match.location}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-calendar-alt"></i>
            <span>Since ${match.founded}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-users"></i>
            <span>${match.impact}</span>
          </div>
        </div>
        
        <div class="card-actions">
          <a href="${match.website}" target="_blank" class="volunteer-btn">
            <i class="fas fa-hand-holding-heart"></i>
            Volunteer Now
          </a>
          <button class="share-btn" onclick="shareNGO('${match.name}')">
            <i class="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function displayGreeting(name) {
  const greetingDiv = document.createElement('div');
  greetingDiv.className = 'greeting-message';
  greetingDiv.innerHTML = `
    <i class="fas fa-smile-wink"></i>
    <h3>Hi ${name || 'Volunteer'}! 👋</h3>
    <p>We found some amazing NGOs that match your skills</p>
  `;
  
  const resultDiv = document.getElementById('matches');
  if (!resultDiv.querySelector('.greeting-message')) {
    resultDiv.insertBefore(greetingDiv, resultDiv.firstChild);
  }
}

// Favorites management
function toggleFavorite(ngoName) {
  const index = favoriteNGOs.indexOf(ngoName);
  if (index === -1) {
    favoriteNGOs.push(ngoName);
    showNotification('Added to favorites!', 'success');
  } else {
    favoriteNGOs.splice(index, 1);
    showNotification('Removed from favorites', 'info');
  }
  
  localStorage.setItem('favoriteNGOs', JSON.stringify(favoriteNGOs));
  updateFavoritesUI();
  
  // Refresh current display if showing matches
  if (currentMatches.length > 0) {
    applyFilters();
  }
}

function updateFavoritesUI() {
  // Update all favorite buttons
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const ngoName = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
    if (favoriteNGOs.includes(ngoName)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });
}

function saveCurrentMatches() {
  if (currentMatches.length === 0) {
    showNotification('No matches to save', 'warning');
    return;
  }
  
  const savedMatches = JSON.parse(localStorage.getItem('savedMatches') || '[]');
  const timestamp = new Date().toLocaleString();
  
  savedMatches.push({
    timestamp,
    skills: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
    matches: currentMatches.slice(0, 5)
  });
  
  localStorage.setItem('savedMatches', JSON.stringify(savedMatches));
  showNotification('Matches saved! You can view them later.', 'success');
}

function shareNGO(ngoName) {
  const ngo = ngos.find(n => n.name === ngoName);
  if (ngo) {
    const shareText = `Check out ${ngo.name} - ${ngo.description} Find more at SkillBridge!`;
    
    if (navigator.share) {
      navigator.share({
        title: ngo.name,
        text: shareText,
        url: ngo.website
      });
    } else {
      navigator.clipboard.writeText(ngo.website).then(() => {
        showNotification('Link copied to clipboard!', 'success');
      });
    }
  }
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Export functionality
function exportMatches() {
  if (currentMatches.length === 0) return;
  
  const data = {
    timestamp: new Date().toISOString(),
    skills: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value),
    matches: currentMatches
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'skillbridge-matches.json';
  a.click();
}