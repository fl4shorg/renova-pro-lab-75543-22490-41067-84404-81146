# Neext APIs Documentation Platform

## Overview
This is a React-based API documentation platform built with Vite, TypeScript, and shadcn-ui. It provides interactive API endpoint testing with real-time health monitoring and live documentation.

**Current State**: Production-ready. The application is fully functional and running on Replit.

## Recent Changes
- **2025-10-04**: Major API expansion and Replit setup completed
  - Installed npm dependencies
  - Verified Vite configuration for Replit environment (port 5000, host 0.0.0.0, allowedHosts enabled)
  - Configured deployment settings for autoscale deployment
  - Expanded API documentation from 33 to 100 endpoints across 10 categories
  - Added new categories: Anime (4 endpoints), nsfwhub (37 endpoints), Hentai/sfmcompile (15 endpoints)
  - Enhanced existing categories with new endpoints:
    - Download: Added Pornhub and Facebook downloads
    - Pesquisa: Added Lyrics Search and Wikipedia
    - Frases: Added Pensador search
    - Jornal: Added ESPN news
    - Figurinhas: Added Coreana, Desenho, Raiva, Roblox, Engraçadas

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Components**: shadcn-ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM with HashRouter
- **Form Handling**: react-hook-form with Zod validation

### Project Structure
```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn-ui components
│   ├── ApiEndpoint.tsx
│   ├── CategoryGroup.tsx
│   ├── EndpointForm.tsx
│   ├── Header.tsx
│   ├── ResponseViewer.tsx
│   ├── SearchBar.tsx
│   ├── ServerSelector.tsx
│   └── StatsDisplay.tsx
├── data/             # Mock API data and configurations
├── hooks/            # Custom React hooks
├── integrations/     # External service integrations (Supabase)
├── lib/              # Utility functions
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── App.tsx           # Main application component
```

### Key Features
- **Live API Documentation**: Interactive documentation for 33 API endpoints
- **Server Selection**: Switch between production and development servers
- **Endpoint Testing**: Test API endpoints directly from the UI
- **Real-time Health Monitoring**: Track API health status
- **Search Functionality**: Filter endpoints by path, alias, or category
- **Responsive Design**: Mobile-friendly interface

### Development Configuration
- **Dev Server**: Runs on `0.0.0.0:5000`
- **Hot Module Replacement**: Configured for Replit proxy environment
- **Workflow**: Single "Start application" workflow running `npm run dev`

### Deployment Configuration
- **Deployment Target**: Autoscale (stateless frontend)
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview`

### Dependencies Notes
- Uses Supabase for backend integration
- Includes comprehensive Radix UI component library
- Lovable tagger for component tracking in development mode

## User Preferences
None specified yet.

## Environment
- **Port**: 5000 (frontend)
- **Host**: 0.0.0.0 for development
- **Build Output**: dist/
