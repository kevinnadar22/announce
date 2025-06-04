# Announce Frontend

A modern React frontend application built with TypeScript, Vite, and Tailwind CSS that provides an intuitive interface for accessing and viewing government announcements. This frontend consumes the Django REST Framework backend API to display processed government content in an accessible format.

## Tech Stack

- React, TypeScript, Vite
- Tailwind CSS (with Animate & Typography plugins)
- shadcn/ui components & Lucide icons
- TanStack Query & React Hook Form
- React Router DOM

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, or bun package manager

## Installation and Setup

### Local Development

1. **Clone and navigate to frontend**
```bash
git clone https://github.com/kevinnadar22/announce.git
cd announce/frontend_react
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the frontend_react directory:
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:8000/api
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

### Production Build

1. **Build for production**
```bash
npm run build
# or
yarn build
# or
bun run build
```

2. **Preview production build**
```bash
npm run preview
# or
yarn preview
# or
bun run preview
```

The build output will be in the `dist/` directory.

## Project Structure

```
frontend_react/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Shadcn/ui components
│   │   └── ...            # Custom components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and configurations
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── dist/                  # Production build output
├── components.json        # Shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```


## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Component Library

The project uses Shadcn/ui components built on top of Radix UI. Key components include:

To add new Shadcn/ui components:
```bash
npx shadcn-ui@latest add [component-name]
```


## Theme Configuration

Colors, fonts, and other design tokens are configured in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... other color variables
      }
    }
  }
}
```

## Deployment

### Vercel Deployment (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkevinnadar22%2Fannounce&project-name=announce-frontend&repository-name=announce&root-directory=frontend_react)

1. **Connect GitHub repository to Vercel**
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Root Directory: `/frontend_react`

3. **Set environment variables in Vercel dashboard**:
   - `VITE_API_URL`: Your backend API URL

4. **Deploy**:
   Vercel will automatically deploy on every push to the main branch.

### Netlify Deployment

1. **Connect GitHub repository to Netlify**
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

3. **Set environment variables**:
   - `VITE_API_URL`: Your backend API URL

## Contact

For support or feedback:
- Email: [kevinnadar22@gmail.com](mailto:kevinnadar22@gmail.com)
- GitHub: [kevinnadar22](https://github.com/kevinnadar22)


