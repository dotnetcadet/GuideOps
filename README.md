# GuideOps

A Pendo replacement Proof-of-Concept for Edio — providing in-app guides, student handbook acknowledgment tracking, and user provisioning.

## Architecture

```
GuideOps/
├── docker-compose.yml          # SQL Server container (Docker/Podman)
├── infra.sh                    # Infrastructure script (auto-detects runtime)
├── GuideOps.sln                # .NET solution
└── src/
    ├── GuideOps.Api/           # ASP.NET Web API + HotChocolate GraphQL
    ├── GuideOps.Admin/         # React Admin UI (Vite + TailwindCSS v4.2)
    ├── guideops-sdk/           # @guideops/sdk NPM package
    └── GuideOps.Demo/          # Demo app simulating Edio
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Database | SQL Server (Docker / Podman) |
| Backend | .NET 10, ASP.NET Web API, HotChocolate GraphQL, EF Core |
| Admin Frontend | React 19, Vite, TailwindCSS v4.2, urql, MSAL |
| SDK | React, driver.js, graphql-request |
| Auth | Microsoft Entra ID (Azure AD), JWT Bearer |

## Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 22+
- Docker **or** Podman (with `podman-compose` or the `compose` plugin)

### 1. Start SQL Server

The included `infra.sh` script auto-detects whether you have Docker or Podman:

```bash
./infra.sh up
```

Or use your runtime directly:

```bash
# Docker
docker compose up -d

# Podman
podman-compose up -d
# or
podman compose up -d
```

Other `infra.sh` commands:

```bash
./infra.sh status   # Show running containers
./infra.sh logs     # View logs
./infra.sh down     # Stop services
./infra.sh reset    # Stop and remove all data volumes
```

### 2. Run the API

```bash
cd src/GuideOps.Api
dotnet run
```

The GraphQL endpoint is available at `http://localhost:5000/graphql` with the built-in Nitro IDE.

### 3. Run the Admin App

```bash
cd src/GuideOps.Admin
npm install
npm run dev
```

Opens at `http://localhost:5173`

### 4. Run the Demo App

```bash
cd src/GuideOps.Demo
npm install
npm run dev
```

Opens at `http://localhost:5174`

## Core Features

### In-App Guides
- Create walkthroughs and announcements with step-by-step instructions
- Steps use CSS selectors to highlight elements (powered by driver.js)
- Assign guides to specific roles (Student, Teacher, All)
- Track guide completion per user

### Handbook Acknowledgment
- Create handbooks with content URLs (PDF) or inline HTML
- Block access to Edio until students acknowledge the handbook
- Per-user, per-school-year acknowledgment tracking with timestamps
- Admin reporting with completion statistics

### User Provisioning
- Azure AD sync for user management
- Role-based assignments (Student, Teacher, Admin)
- Designed to support 50K-100K+ MAUs

## SDK Integration (for Edio)

Install the package:
```bash
npm install @guideops/sdk
```

Usage:
```tsx
import { GuideOpsProvider, HandbookGate } from '@guideops/sdk';
import '@guideops/sdk/styles';

function App() {
  const config = {
    apiUrl: 'https://guideops-api.example.com/graphql',
    getAccessToken: async () => {
      // Acquire token from MSAL
      const response = await msalInstance.acquireTokenSilent({
        scopes: ['api://GUIDEOPS_API_CLIENT_ID/access_as_user'],
        account: accounts[0],
      });
      return response.accessToken;
    },
    schoolYear: '2025-2026',
  };

  return (
    <GuideOpsProvider config={config}>
      <HandbookGate>
        <YourAppContent />
      </HandbookGate>
    </GuideOpsProvider>
  );
}
```

## Azure AD Configuration

Two app registrations are needed:

1. **GuideOps-API** (Web API) — Exposes `api://<CLIENT_ID>/access_as_user` scope
2. **GuideOps-Admin** (SPA) — Redirect URI: `http://localhost:5173`

Update `src/GuideOps.Api/appsettings.json` with your tenant and client IDs.

## GraphQL API

Key queries and mutations:

| Operation | Description |
|-----------|-------------|
| `getUsers` | List users (paginated, filterable, sortable) |
| `getGuides` | List guides with steps |
| `getHandbooks` | List handbooks |
| `getPendingHandbooks` | Get handbooks needing acknowledgment (SDK) |
| `getAssignedGuides` | Get incomplete guides for a user (SDK) |
| `getAcknowledgmentStats` | Completion statistics |
| `syncUsersFromAzureAd` | Sync users from Azure AD |
| `createGuide` / `updateGuide` / `deleteGuide` | Guide CRUD |
| `createHandbook` / `updateHandbook` / `deleteHandbook` | Handbook CRUD |
| `recordAcknowledgment` | Record handbook acknowledgment |
| `recordGuideCompletion` | Record guide completion |
| `createAssignment` | Assign guide/handbook to role |
