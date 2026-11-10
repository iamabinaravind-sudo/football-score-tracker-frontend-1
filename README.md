# MATCHDAY — Football Score Tracker

A responsive React football match tracker built with Vite, Material UI, React Router, Axios, JSON Server, GSAP, AOS, FullCalendar and jsPDF.

## Run locally

Requirements: Node.js 20.19+ (or a compatible current Node release).

```bash
npm install
```

Open **two terminals** in this folder.

Terminal 1 — API:
```bash
npm run server
```

Terminal 2 — React app:
```bash
npm run dev
```

Open the local Vite URL printed in the terminal (usually http://localhost:5173).

## Demo login

- Email: `demo@matchday.com`
- Password: `Matchday123`

## Included

- Login and registration screens, protected routes and logout
- Dashboard with match and goal statistics
- Create, edit, delete and search matches
- Status/category filters and pagination
- Match details and player statistics
- FullCalendar month/week/day views
- PDF export for individual matches and complete match history
- Download history with delete action
- Dark/light theme preference stored in localStorage
- Responsive sidebar and mobile layout

## Important security note

This is a local educational demonstration, not production authentication. JSON Server is not an authentication server, and this sample stores demo passwords in `db.json`. Do not use real passwords or deploy this as-is. For production, use a backend with password hashing (Argon2/bcrypt), secure sessions or short-lived tokens, authorization checks on every request, and HTTPS.

## Notes

- The sample database contains demo fixtures dated around November 2026.
- Calendar events open the corresponding match details. Add or edit fixtures from the Matches page.
- PDF files are generated in the browser; download history stores report metadata, not the PDF binary.
