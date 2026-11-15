import 'dotenv/config'
import express from 'express'
import xlsx from 'xlsx'
import bcrypt from 'bcryptjs'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000
const usersFile = process.env.USERS_FILE || './users.xlsx'

// allow the front end (e.g. GitHub Pages) to call this API
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }))
app.use(express.json())             // lets the server read JSON sent from app.js
app.use(express.static('docs'))   // serves index.html, app.js, styles.css

// reads all users from the Excel sheet
function getUsers() {
    const workbook = xlsx.readFile(usersFile)
    const worksheet = workbook.Sheets['users']
    return xlsx.utils.sheet_to_json(worksheet)   // [{ username, password }, ...]
}

// POST /api/login  body: { username, password }
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Enter username and password' })
    }

    const user = getUsers().find(u => u.username === username)
    if (!user) {
        return res.status(401).json({ success: false, message: 'Wrong username or password' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(401).json({ success: false, message: 'Wrong username or password' })
    }

    res.json({ success: true, message: 'Logged in' })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
