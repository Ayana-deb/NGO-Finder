
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(50) UNIQUE NOT NULL,
    display_label VARCHAR(50) NOT NULL,
    icon_class VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS ngos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(100),
    description TEXT,
    location VARCHAR(100),
    founded INT,
    impact VARCHAR(200),
    volunteer_needs VARCHAR(50),
    website VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS ngo_skills (
    ngo_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (ngo_id, skill_id),
    FOREIGN KEY (ngo_id) REFERENCES ngos(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);


CREATE TABLE IF NOT EXISTS user_skills (
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);


CREATE TABLE IF NOT EXISTS favorites (
    user_id INT NOT NULL,
    ngo_id INT NOT NULL,
    PRIMARY KEY (user_id, ngo_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (ngo_id) REFERENCES ngos(id)
);


INSERT IGNORE INTO skills (skill_name, display_label, icon_class) VALUES
('education', 'Education', 'fa-book'),
('health', 'Health', 'fa-heartbeat'),
('environment', 'Environment', 'fa-leaf'),
('women', 'Women Empowerment', 'fa-female'),
('animals', 'Animal Welfare', 'fa-paw'),
('technology', 'Technology', 'fa-laptop-code'),
('fundraising', 'Fundraising', 'fa-hand-holding-usd'),
('content', 'Content Writing', 'fa-pen'),
('design', 'Design', 'fa-paint-brush'),
('marketing', 'Marketing', 'fa-chart-line'),
('legal', 'Legal', 'fa-gavel'),
('mentalhealth', 'Mental Health', 'fa-brain'),
('research', 'Research', 'fa-flask'),
('community', 'Community Service', 'fa-users'),
('mentoring', 'Mentoring', 'fa-user-graduate'),
('sports', 'Sports', 'fa-futbol');


INSERT IGNORE INTO ngos (name, type, description, location, founded, impact, volunteer_needs, website) VALUES
('Education For All', 'Education', 'Providing quality education to underprivileged children', 'New Delhi', 2015, 'Impacting 5000+ students', 'high', 'https://educationforall.org'),
('Green Earth Initiative', 'Environment', 'Working towards environmental conservation and sustainability', 'Bangalore', 2018, 'Planted 100K+ trees', 'medium', 'https://greenearthinitiative.org'),
('Women Rise', 'Women Empowerment', 'Empowering women through skill development and job placement', 'Mumbai', 2016, 'Trained 2000+ women', 'high', 'https://womenrise.org'),
('Health Heroes', 'Health', 'Providing affordable healthcare to rural communities', 'Chennai', 2019, 'Served 10000+ patients', 'medium', 'https://healthheroes.org');


INSERT IGNORE INTO ngo_skills (ngo_id, skill_id) VALUES
(1, 1), (1, 14), (1, 9), (1, 10),
(2, 2), (2, 13), (2, 8),
(3, 3), (3, 10), (3, 9),
(4, 4), (4, 8), (4, 14);
