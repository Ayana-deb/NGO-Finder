const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

// Middleware
const allowedOrigins = ['http://localhost:5000', 'http://127.0.0.1:5000'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Session configuration
app.use(session({
    secret: 'skillbridge_secret_key_change_in_production',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// ========== AUTHENTICATION ENDPOINTS ==========

// Registration
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }
    try {
        // Check if user already exists
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        // Auto-login after registration
        req.session.userId = result.insertId;
        req.session.userName = name;
        res.json({ success: true, userId: result.insertId, name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    try {
        const [users] = await db.query('SELECT id, name, password FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        req.session.userId = user.id;
        req.session.userName = user.name;
        res.json({ success: true, userId: user.id, name: user.name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.json({ success: true });
    });
});

// Get current session user
app.get('/api/me', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, userId: req.session.userId, name: req.session.userName });
    } else {
        res.json({ loggedIn: false });
    }
});

// ========== PROTECTED ROUTES (require login) ==========

// Middleware to check authentication
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// Get all NGOs (public)
app.get('/api/ngos', async (req, res) => {
    try {
        const [ngos] = await db.query(`
            SELECT n.*, GROUP_CONCAT(s.skill_name) as skill_names
            FROM ngos n
            LEFT JOIN ngo_skills ns ON n.id = ns.ngo_id
            LEFT JOIN skills s ON ns.skill_id = s.id
            GROUP BY n.id
        `);
        const formatted = ngos.map(ngo => ({
            ...ngo,
            skills: ngo.skill_names ? ngo.skill_names.split(',') : []
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all skills (public)
app.get('/api/skills', async (req, res) => {
    try {
        const [skills] = await db.query('SELECT skill_name, display_label, icon_class FROM skills ORDER BY skill_name');
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Save user skills (protected)
app.post('/api/user-skills', requireAuth, async (req, res) => {
    const { skills } = req.body; // array of skill names
    const userId = req.session.userId;
    try {
        await db.query('DELETE FROM user_skills WHERE user_id = ?', [userId]);
        for (let skillName of skills) {
            const [skillRow] = await db.query('SELECT id FROM skills WHERE skill_name = ?', [skillName]);
            if (skillRow.length) {
                await db.query('INSERT INTO user_skills (user_id, skill_id) VALUES (?, ?)', [userId, skillRow[0].id]);
            }
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save skills' });
    }
});

// Get matches for logged-in user (protected)
app.post('/api/matches', requireAuth, async (req, res) => {
    const userId = req.session.userId;
    try {
        const [userSkills] = await db.query(`
            SELECT s.skill_name FROM user_skills us
            JOIN skills s ON us.skill_id = s.id
            WHERE us.user_id = ?
        `, [userId]);
        const selectedSkillNames = userSkills.map(row => row.skill_name);
        if (selectedSkillNames.length === 0) {
            return res.json([]);
        }
        const [matches] = await db.query(`
            SELECT n.*, 
                   GROUP_CONCAT(s.skill_name) as ngo_skills,
                   COUNT(us.skill_id) as matched_count,
                   (SELECT COUNT(*) FROM user_skills WHERE user_id = ?) as total_user_skills
            FROM ngos n
            JOIN ngo_skills ns ON n.id = ns.ngo_id
            JOIN skills s ON ns.skill_id = s.id
            LEFT JOIN user_skills us ON us.user_id = ? AND us.skill_id = s.id
            GROUP BY n.id
            HAVING matched_count > 0
        `, [userId, userId]);
        
        const formatted = matches.map(ngo => {
            const matchedSkillsList = ngo.ngo_skills ? ngo.ngo_skills.split(',') : [];
            const matchPercent = Math.round((ngo.matched_count / ngo.total_user_skills) * 100);
            return {
                ...ngo,
                skills: matchedSkillsList,
                matchedSkills: matchedSkillsList,
                matchPercent: matchPercent
            };
        });
        res.json(formatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Match error' });
    }
});

// Favorites (protected)
app.post('/api/favorites', requireAuth, async (req, res) => {
    const { ngoId, action } = req.body;
    const userId = req.session.userId;
    try {
        if (action === 'add') {
            await db.query('INSERT IGNORE INTO favorites (user_id, ngo_id) VALUES (?, ?)', [userId, ngoId]);
        } else if (action === 'remove') {
            await db.query('DELETE FROM favorites WHERE user_id = ? AND ngo_id = ?', [userId, ngoId]);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Favorite operation failed' });
    }
});

app.get('/api/favorites', requireAuth, async (req, res) => {
    const userId = req.session.userId;
    try {
        const [favorites] = await db.query(`
            SELECT n.*, GROUP_CONCAT(s.skill_name) as skill_names
            FROM favorites f
            JOIN ngos n ON f.ngo_id = n.id
            LEFT JOIN ngo_skills ns ON n.id = ns.ngo_id
            LEFT JOIN skills s ON ns.skill_id = s.id
            WHERE f.user_id = ?
            GROUP BY n.id
        `, [userId]);
        const formatted = favorites.map(ngo => ({
            ...ngo,
            skills: ngo.skill_names ? ngo.skill_names.split(',') : []
        }));
        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch favorites' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));