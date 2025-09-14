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

### Media

<img width="1919" height="947" alt="Screenshot 2025-09-15 052227" src="https://github.com/user-attachments/assets/f615ef18-b45e-48a2-abcd-f161e00dffe9" />

<img width="1919" height="932" alt="Screenshot 2025-09-15 052318" src="https://github.com/user-attachments/assets/c92fced0-dd78-431b-a7fa-eed52ec62153" />

<img width="1919" height="942" alt="Screenshot 2025-09-15 052326" src="https://github.com/user-attachments/assets/029f933a-4c33-4c76-8fff-33d7ba57d044" />

<img width="1919" height="940" alt="Screenshot 2025-09-15 052549" src="https://github.com/user-attachments/assets/32976e8f-ac91-466d-882f-f41077f515cf" />

<img width="1918" height="947" alt="Screenshot 2025-09-15 052336" src="https://github.com/user-attachments/assets/f2282824-58e4-4cd5-ac53-f55d0d2acb68" />

<img width="1919" height="947" alt="Screenshot 2025-09-15 052711" src="https://github.com/user-attachments/assets/a910536e-21d2-480c-86f3-40406b07704d" />

<img width="1911" height="942" alt="Screenshot 2025-09-15 052717" src="https://github.com/user-attachments/assets/38fc06f8-6752-40be-b347-1f51192d4f26" />

