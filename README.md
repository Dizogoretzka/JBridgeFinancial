# J Bridge Financial Services

## About

J Bridge Financial Services is a professional financial services platform providing loans, credit solutions, and comprehensive financial consulting services.

## Features

- **Client Portal**: Secure dashboard for clients to manage their financial profiles, view credit scores, apply for loans, and upload documents
- **Employee Portal**: Administrative interface for financial advisors to manage client applications, review loan requests, and maintain blacklist records
- **Credit Scoring**: Advanced credit evaluation system
- **Document Management**: Secure file upload and management system
- **Real-time Updates**: Live data synchronization across all platforms

## Technology Stack

This application is built with modern web technologies:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **Backend**: Supabase (Database, Authentication, Real-time subscriptions)
- **State Management**: React Query for server state management
- **Routing**: React Router DOM

## Development

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd j-bridge-financials

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Client dashboard components
│   ├── employee/       # Employee portal components
│   └── ui/             # Base UI components (shadcn/ui)
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations (Supabase)
├── pages/              # Page components
└── lib/                # Utility functions
```

## License

Proprietary - J Bridge Financial Services