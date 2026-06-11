# ExpenseTracker
Build an expense tracker that lets a user log their daily spending across categories and see a summary of where their money is going.

**Live Demo**
- Frontend: https://expense-tracker-peach-xi-95.vercel.app
- Backend: https://expense-tracker-h0xa.onrender.com

##Tech Stack
Frontend: React 19, Vite, React Router v7
Charts: Recharts v3
Backend: Node.js Express v5
Database: PostgreSQL (Supabase hosted)
Deployment: Vercel (frontend) , Render(backend)

##Project Structure
ExpenseTracker/
├── client/
|   |── public/
|   |   |──favicon-32x32.png
│   ├── src/
│   │   ├── Components/
│   │   │   ├── SubComponents/
|   |   |   |   |── Navbar.jsx
│   │   │   │   └── Spinner.jsx
│   │   │   ├── CategoryChart.jsx
│   │   │   ├── EditExpense.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseRow.jsx
│   │   │   ├── ExportButton.jsx
│   │   │   ├── FilterExpense.jsx
│   │   │   └── SummaryPanel.jsx
│   │   ├── constants/
│   │   │   ├── categories.js
│   │   │   └── color.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
|   |──package-lock.json
|   |──vite.config.js
|   |──index.html
│   └── package.json
│
└── server/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── expenseController.js
    ├── middleware/
    │   └── errorCheck.js
    ├── routes/
    │   └── expenseRoute.js
    ├── .env
    ├── index.js
    |──package-lock.json
    └── package.json
    
## API Documentation
### Base URL
https://expense-tracker-h0xa.onrender.com

### Endpoints
#### GET /api/expenses
Returns all expenses sorted newest first.
**Response**
```json
[
  {
    "id": 1,
    "title": "Grocery",
    "amount": "500.00",
    "category": "Food",
    "created_at": "2026-06-10T09:30:00.000Z"
  }
]
```

#### POST /api/expenses
Add a new expense.

**Request Body**
```json
{
  "title": "Grocery",
  "amount": 500,
  "category": "Food"
}
```

**Response**
```json
{
  "id": 1,
  "title": "Grocery",
  "amount": "500.00",
  "category": "Food",
  "created_at": "2026-06-10T09:30:00.000Z"
}
```

#### PUT /api/expenses/:id
Update an existing expense.

**Request Body**
```json
{
  "title": "Grocery run",
  "amount": 600,
  "category": "Food"
}
```

**Response**
```json
{
  "id": 1,
  "title": "Grocery run",
  "amount": "600.00",
  "category": "Food",
  "created_at": "2026-06-10T09:30:00.000Z"
}
```

#### DELETE /api/expenses/:id
Delete an expense by ID.

**Response**
```json
{
  "message": "Deleted successfully"
}
```

## Features

- Add expenses with title, amount and category
- Edit expenses inline in the table
- Delete expenses
- Filter by category and date range (this month, last month, custom)
- Summary panel — total spent, per category, highest expense
- Pie chart of spend by category (updates live with filters)
- Export filtered expenses to CSV
- Responsive layout —> works on mobile, tablet and desktop

## Next Steps

What I would add with more time:
- **Authentication** - user accounts so each person sees only their own expenses
- **Improve responsive Layout** - currently uses Tailwind breakpoints for basic 
  responsiveness; would redesign mobile view to use card-based layout instead of 
  a table, and add a bottom navigation bar for mobile users instead of the top navbar.
- **Pagination** - Currently all expenses load at once which works fine for small data.
  For scaling I'd move to server side pagination using LIMIT & OFFSET in PostgreSQL.This
  keeps the payload small regardless of how many rows are in DB.
- **Budget limits** - set a monthly limit per category and alert when exceeded.
