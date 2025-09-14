# Lead Management System - Frontend


## Tech Stack
- React 18 + Vite
- Tailwind CSS
- AG Grid Community
- React Router v6
- Axios
- React Hook Form
- Lucide React (icons)

## Prerequisites
- Node.js 16+
- Running backend server: https://github.com/tayyab-ilyas/lms-be

## Installation
```bash
git clone <frontend-repo>
cd lead-management-frontend
npm install
```
## Environment Variables
- Create .env:
```bash
VITE_API_URL=http://localhost:3001
```
## Run
```bash
# Start development server
npm run dev
```

## Structure
```bash
src/
├── components/
│   ├── auth/           
│   ├── layout/         
│   └── ui/             
├── pages/              
├── services/        
├── hooks/              
├── context/           
└── utils/             
```

## Key Features
- JWT authentication with httpOnly cookies
- AG Grid data table with server-side pagination
- Advanced filtering system (status, source, company, score range)
- Complete CRUD operations for leads
- Responsive design with Tailwind CSS
- Protected routes with automatic redirects
- Form validation with React Hook Form
- Modal dialogs for create/edit operations

## Main Components
### Auth
- Login/Register forms with validation
- Protected route guards
- Automatic token refresh

### Lead Management
- AG Grid with sortable columns
- Server-side pagination (configurable page sizes)
- Multi-field filtering
- Create/Edit/Delete operations
- Real-time UI updates

### UI Component
- Reusable Button, Input, Modal components
- Consistent styling with Tailwind
- Loading states and error handling

### Test Credentials

- Email: test@example.com
- Password: password123
