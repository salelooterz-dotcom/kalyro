# Kalyro

## Overview

Kalyro is a modern web application showcasing smart AI solutions for businesses, focused on reducing hiring costs through intelligent automation. Built as a marketing/portfolio website, it presents information about automation services, team members, projects, and client testimonials. The application uses a full-stack TypeScript architecture with React on the frontend and Express on the backend, connected to a PostgreSQL database through Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.
UI Style: Pastel editorial design inspired by Upnow Studio's "Smart Digital Agency" (Dribbble shot 22150515) — soft peach/cream pastel page background (`#F4D4C8` / `#FFF5F0`), pure black (`#0A0A0A`) text, warm yellow accent (`#FFE552`), coral highlight (`#FF8B7A`). Centered giant black headlines ("Smart AI Agency / For Your Business / to Succeed"), floating dark stat cards (rounded-3xl, soft drop shadow), pill-shaped buttons (rounded-full, dark with neon-yellow icon circle), rotating circular sticker badge in hero, tag pills row. Custom utilities: `.bg-peach`, `.bg-cream`, `.bg-ink`, `.text-accent`, `.bg-accent`, `.text-coral`, `.soft-shadow`, `.ring-glow`, `.pill-dark`, `.pill-light`, `.rotate-slow` (in `index.css`). Plus Jakarta Sans 900-weight typography, smooth Framer Motion entrances throughout.

Site Structure: ONLY 3 routes total — `/` (one-page home with all content sections), `/contact` (contact form), `/store` (Kalyro Store with templates, blueprints, bundles, and done-for-you services). All previous separate pages (services, work, about, faq, pricing, how-it-works, solutions, policy) have been merged into the home page as anchored sections (`#services`, `#process`, `#solutions`, `#portfolio`, `#pricing`, `#about`, `#faq`).

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing instead of React Router
- Framer Motion for declarative animations and transitions

**UI Component Strategy**
- shadcn/ui component library in "new-york" style with Radix UI primitives
- Tailwind CSS v4 (using @tailwindcss/vite) for utility-first styling with CSS variables for theming
- Custom modern light theme optimized for a "clean productivity" aesthetic
- Typography using Plus Jakarta Sans (display) and Inter (sans-serif) fonts

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- Custom query client with automatic error handling
- Form handling with React Hook Form and Zod validation through @hookform/resolvers

**Key Design Decisions**
- Single Page Application (SPA) with client-side routing
- All API calls go through a centralized `apiRequest` helper that handles credentials and error states
- Toast notifications for user feedback using custom toast hook
- Responsive design with mobile-first approach using Tailwind breakpoints

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Node.js HTTP server for handling connections
- Custom logging middleware that tracks request duration and response status
- Body parsing with JSON verification support for webhook integrations

**API Design**
- RESTful API endpoints under `/api` prefix
- Validation using Zod schemas from drizzle-zod
- Error handling with try-catch blocks returning appropriate HTTP status codes
- CORS not explicitly configured (assumes same-origin or proxy setup)

**Development vs Production**
- Vite dev server integrated in development mode with middleware mounting
- Static file serving from `dist/public` in production
- Build script bundles server code with esbuild, bundling critical dependencies while externalizing others
- Separate client and server build processes coordinated through npm scripts

### Data Storage

**Database**
- PostgreSQL as the primary database
- Neon serverless PostgreSQL driver (@neondatabase/serverless) for connection pooling
- Database schema defined in `shared/schema.ts` for type sharing between client and server

**ORM Layer**
- Drizzle ORM for type-safe database queries
- Schema-first approach with automatic TypeScript type generation
- Migration system using drizzle-kit with migrations stored in `./migrations`

**Data Models**
- **Contacts**: Stores contact form submissions with name, email, company, phone, message
- **Projects**: Portfolio projects with title, description, category, featured flag, tags, results
- **Team Members**: Team profiles with name, role, bio, social links, display order
- **Services**: Service offerings with title, description, icon identifier, features array
- **Testimonials**: Client testimonials (schema referenced but implementation not shown)

**Storage Pattern**
- Interface-based storage abstraction (`IStorage`) allows for future storage implementations
- DatabaseStorage class implements all CRUD operations
- Methods return typed entities using Drizzle's inferred types

### External Dependencies

**Database**
- Neon PostgreSQL (serverless): Cloud-hosted PostgreSQL database
- Connection string provided via `DATABASE_URL` environment variable
- Drizzle ORM handles connection pooling and query building

**UI Libraries**
- Radix UI: Headless UI components for accessibility
- Lucide React: Icon library
- shadcn/ui: Pre-built component patterns
- Framer Motion: Animation library
- TanStack Query: Server state management

**Development Tools**
- Vite: Frontend build tool and dev server
- ESBuild: Server-side bundling for production
- TypeScript: Type checking across full stack
- Tailwind CSS: Utility-first styling

**Replit Integration**
- @replit/vite-plugin-runtime-error-modal: Development error overlay
- @replit/vite-plugin-cartographer: Code navigation in development
- @replit/vite-plugin-dev-banner: Development environment indicator
- Custom vite-plugin-meta-images: Auto-updates OpenGraph images for Replit deployments

**Asset Management**
- Generated images stored in `attached_assets/generated_images/`
- Static assets served from `client/public/`
- Custom Vite plugin updates meta tags with correct Replit domain URLs
