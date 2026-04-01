# GuideOps Production Backlog — Summary

**Target Deadline:** June 2026 | **Security Model:** Microsoft Entra ID | **28 Stories across 11 Epics**

| Epic | Summary | Story | Requirements | Notes |
|------|---------|-------|-------------|-------|
| 1. Infrastructure & App Registration | Stand up production-grade Azure resources and Entra ID app registration. | **1.1 — Register Entra ID Application** | 1. Register a single **GuideOps** app in Entra ID | Shared by Admin SPA and backend API (BFF pattern). Configure SPA redirect URIs and client credentials for MS Graph user sync. |
| | | | 2. Configure standard permissions: `openid`, `profile`, `User.Read` | No custom API scopes needed. Standard OpenID Connect + basic user info. |
| | | | 3. Document app registration ID, tenant ID, and redirect URIs for team onboarding | |
| | | **1.2 — Migrate Database to PostgreSQL** | 1. Replace `Microsoft.EntityFrameworkCore.SqlServer` with `Npgsql.EntityFrameworkCore.PostgreSQL` | |
| | | | 2. Update `DbContext` configuration to use `UseNpgsql()` | |
| | | | 3. Update connection string format in `appsettings.json` for PostgreSQL | |
| | | | 4. Re-generate EF Core migrations for PostgreSQL | Audit column types (`nvarchar` → `varchar`/`text`, `datetime2` → `timestamptz`). |
| | | | 5. Validate all existing queries, indexes, and seed data against PostgreSQL | |
| | | | 6. Provision Azure Database for PostgreSQL Flexible Server for production | |
| | | **1.3 — Set Up Deployment Pipeline** | 1. Create Dockerfile for `GuideOps.Api` | |
| | | | 2. Create Dockerfile / static site build for `GuideOps.Admin` | |
| | | | 3. Set up CI/CD pipeline (build, test, deploy) | GitHub Actions or Azure DevOps. |
| | | | 4. Configure environment-specific settings (dev, staging, prod) | Connection strings, Entra IDs, CORS origins. |
| | | | 5. Set up production CORS origins for Admin portal and Edio domains | Currently hardcoded to `localhost:5173`/`5174`. |
| | | **1.4 — Split into Separate Repositories** | 1. Create separate GitLab repository for `guideops-sdk` (npm package) | Currently lives under `src/guideops-sdk` in the monorepo. |
| | | | 2. Create separate GitLab repository for `GuideOps.Api` (.NET backend) | Currently lives under `src/GuideOps.Api` in the monorepo. |
| | | | 3. Create separate GitLab repository for `GuideOps.Admin` (React frontend) | Currently lives under `src/GuideOps.Admin` in the monorepo. |
| | | | 4. Update SDK package references — consume SDK via registry (not `file:` link) | Depends on SDK being published to a package registry (Story 11.2). |
| | | | 5. Set up independent CI/CD pipelines per repository in GitLab | Build, test, deploy per component. |
| | | | 6. Document cross-repo dependency versions and release workflow | SDK version pinning, coordinated releases. |
| 2. Project-Level Multi-Application Support | GuideOps must support managing guides and handbooks across multiple applications from a single platform. All content, assignments, and tracking are scoped to a project. | **2.1 — Project Entity & Data Model** | 1. Create `Project` entity (`Id`, `Name`, `Slug`, `Description`, `IsActive`, `CreatedAt`, `UpdatedAt`) | Slug is a URL-safe identifier (e.g., `edio`, `admin-portal`). |
| | | | 2. Add `ProjectId` foreign key to `Guide` model | All guides are scoped to a project. |
| | | | 3. Add `ProjectId` foreign key to `Handbook` model | All handbooks are scoped to a project. |
| | | | 4. Add `ProjectId` foreign key to `Segment` model | Segments are project-scoped so different apps can define different audience groups. |
| | | | 5. Create `ProjectUser` join table (`ProjectId`, `UserId`, `Role`, `IsActive`, `JoinedAt`) | Users can belong to multiple projects with different roles per project. |
| | | | 6. Migrate existing data: create a default "Edio" project, assign all existing records to it | Backward-compatible migration. |
| | | **2.2 — Project-Scoped API Queries** | 1. Add `projectId` or `projectSlug` parameter to `GetAssignedGuides` query | SDK passes its project identifier; API filters accordingly. |
| | | | 2. Add `projectId` or `projectSlug` parameter to `GetPendingHandbooks` query | |
| | | | 3. Add GraphQL CRUD mutations for `Project` (create, update, deactivate) | Admin-only. |
| | | | 4. Add GraphQL queries: `GetProjects`, `GetProjectById`, `GetProjectBySlug` | |
| | | | 5. Add mutations to manage `ProjectUser` membership (add/remove users to projects) | |
| | | | 6. All existing list queries must support optional project filtering | Admin portal can filter by project. |
| | | **2.3 — SDK Project Configuration** | 1. Add `projectSlug` (or `projectId`) to `GuideOpsConfig` type | Required field. |
| | | | 2. SDK client passes project identifier on all API calls | |
| | | | 3. Validate project exists and user has access; return clear error if not | |
| | | **2.4 — Admin Portal Project Switcher** | 1. Add project selector/switcher in Admin portal sidebar or top nav | Persist selection in session/localStorage. |
| | | | 2. All Admin CRUD pages filter by selected project | |
| | | | 3. Add Project management page (list, create, edit, deactivate projects) | |
| | | | 4. Add Project Users page — manage which users belong to a project and their role | |
| | | | 5. Dashboard stats scoped to selected project | Nice-to-have. |
| 3. Guide Persistence | Guides must re-appear on every session/page load until the user explicitly clicks "I Accept." Closing (X) or navigating away does NOT count as acceptance. | **3.1 — Backend Acceptance Tracking** | 1. Add `RequiresAcceptance` boolean field to the `Guide` model | Default `true`. |
| | | | 2. Refactor `GuideCompletion` to `GuideAcceptance` (or add `AcceptedAt` field) to distinguish accepted from dismissed | Only accepted guides stop re-appearing. |
| | | | 3. Update `GetAssignedGuides` query to only filter out guides with an acceptance record | |
| | | | 4. Add GraphQL mutation `AcceptGuide(azureAdObjectId, guideId)` | |
| | | | 5. Keep `RecordGuideCompletion` as a viewed/dismissed event for analytics | Do NOT remove guide from assigned list on dismiss. |
| | | **3.2 — SDK Accept / Dismiss UX** | 1. Add "I Accept" button to the guide step popover | Shown on the final step or as a standalone action. |
| | | | 2. Keep X (close) button but make it dismiss without accepting — guide returns next session | Open question: may remove X entirely. Make configurable per guide (`allowDismiss` flag). |
| | | | 3. Call `AcceptGuide` mutation only when user clicks "I Accept" | |
| | | | 4. Call `RecordGuideCompletion` (dismiss/view event) when user clicks X | Do not suppress guide in future. |
| | | | 5. On page load / session start, always re-fetch assigned guides so un-accepted guides reappear | |
| 4. Segments | Attach guides and handbooks to user segments so only specific audiences see them. | **4.1 — Segment Data Model** | 1. Create `Segment` entity (`Id`, `ProjectId`, `Name`, `Description`, `Type`, `CreatedAt`, `UpdatedAt`) | `Type` = `Role`, `Custom`, etc. Scoped to project. |
| | | | 2. Create `SegmentRule` entity to define membership criteria (e.g., role = "Student") | Supports rule-based membership. |
| | | | 3. Create `SegmentUser` join table for explicit user-to-segment assignment | For custom segments beyond role. |
| | | | 4. Migrate existing `AssignToRole` fields to use the new `Segment` model | Backward compatible migration. |
| | | **4.2 — Segment-Based Assignment Queries** | 1. Update `GuideAssignment` to reference `SegmentId` instead of `AssignToRole` | |
| | | | 2. Update `HandbookAssignment` to reference `SegmentId` instead of `AssignToRole` | |
| | | | 3. Update `GetAssignedGuides` query to resolve segment membership | Role-based rules + explicit user lists. |
| | | | 4. Update `GetPendingHandbooks` query to resolve segment membership | |
| | | | 5. Seed default segments per project: "All Students", "All Caretakers", "All Teachers", "All Users" | |
| | | **4.3 — Admin Segment Management UI** | 1. Add Segments CRUD page in Admin portal | Scoped to selected project. |
| | | | 2. Segment editor: define rules (by role) or manually add users | |
| | | | 3. Update Guide and Handbook editors to assign segments instead of raw role strings | |
| | | | 4. Show segment membership count on segment list page | Nice-to-have. |
| 5. Handbook Access & Tracking | Students must be able to access the learner handbook and all handbooks. Track when they open and when they accept. | **5.1 — Track Document Opens and Acceptance** | 1. Add `DocumentOpenedAt` tracking via new `HandbookView` entity | Distinct from acknowledgment. |
| | | | 2. SDK: fire `RecordHandbookView` mutation when handbook modal content loads | |
| | | | 3. Track `StudentId` (or mapped user identifier) on the acknowledgment record | Confirm `User.AzureAdObjectId` or `User.Email` satisfies "tied to student ID number." |
| | | | 4. Admin portal: acknowledgment report shows both "Opened" and "Accepted" timestamps per user | |
| | | **5.2 — Handbook Library for Revisiting Documents** | 1. SDK: expose `useHandbooks()` hook returning all handbooks assigned to user (not just pending) | For a "Handbook Library" view. |
| | | | 2. Add GraphQL query `GetAllAssignedHandbooks` (includes already-acknowledged) | |
| | | | 3. SDK: provide `<HandbookLibrary />` component for host apps | Nice-to-have. |
| 6. Display Options | Ability to display guides as banners or popups anywhere on the page — mainly top or center. | **6.1 — Support Multiple Guide Display Types** | 1. Extend `Guide.Type` to support: `Walkthrough`, `Popup`, `Banner` | POC only has `Walkthrough` and `Announcement`. |
| | | | 2. Add `DisplayPosition` field to `Guide` model (`top`, `center`, `bottom`, `element`) | |
| | | | 3. Admin portal: Guide editor includes display type and position selection | |
| | | **6.2 — SDK Banner Rendering** | 1. SDK renders a top-of-page or bottom-of-page sticky banner with guide content and actions | Configurable: `top` or `bottom`. |
| | | | 2. Banner includes title, description, and action buttons matching approved WCAG template | |
| | | **6.3 — SDK Popup/Modal Rendering** | 1. SDK renders centered modal overlay for popup-type guides | Replaces centered-popover fallback with proper modal. |
| | | | 2. Walkthrough rendering remains as-is: step-by-step element-anchored popovers | Already implemented in POC. |
| 7. WCAG Accessibility Compliance | All guides, popups, and banners must be WCAG 2.1 AA compliant. Provide an approved template. | **7.1 — Accessibility Audit & Remediation** | 1. Audit and fix all SDK components for WCAG 2.1 AA: focus management, keyboard nav, ARIA | Popover, modal, banner, overlay. |
| | | | 2. Guide popover: trap focus when active, return focus on close | |
| | | | 3. Handbook modal: trap focus, `role="dialog"`, `aria-labelledby`, `aria-describedby`, ESC to close | |
| | | | 4. Banner: `role="alert"` or `role="status"`, keyboard-dismissible | |
| | | | 5. All interactive elements must have visible focus indicators (3:1 contrast) | |
| | | | 6. All text must meet 4.5:1 contrast ratio (normal) / 3:1 (large) | Verify indigo-on-white and gray palette. |
| | | | 7. Screen reader announcements for step changes and modal open/close | `aria-live` regions. |
| | | | 8. Support `prefers-reduced-motion`: disable animations | |
| | | **7.2 — WCAG Compliant Templates** | 1. Create approved, accessible popup template that passes WCAG 2.1 AA audit | Default for all new guides. |
| | | | 2. Create approved, accessible banner template | |
| | | | 3. Admin portal: start from approved template, prevent freeform HTML | Template-first: structured fields (title, description, CTA) not raw HTML. |
| | | | 4. Run automated accessibility testing (axe-core) in CI pipeline | Nice-to-have. |
| 8. Scheduling | Pre-schedule when guides appear and automatically expire them. | **8.1 — Backend Scheduling Fields** | 1. Add `ActivationDate` (`DateTimeOffset?`) to `Guide` model | Guide not shown before this date. |
| | | | 2. Add `RemovalDate` (`DateTimeOffset?`) to `Guide` model | Guide auto-hidden after this date. |
| | | | 3. Add `ActivationDate` and `RemovalDate` to `Handbook` model | Same scheduling for handbooks. |
| | | | 4. Update `GetAssignedGuides` query to filter by activation/removal dates | `ActivationDate <= now AND (RemovalDate is null OR RemovalDate >= now)`. |
| | | | 5. Update `GetPendingHandbooks` query with same date filtering | |
| | | | 6. Background job or query-time check to mark expired guides inactive | Query-time filtering may suffice. Nice-to-have. |
| | | **8.2 — Admin Scheduling UI** | 1. Guide editor: add date pickers for activation and removal dates | |
| | | | 2. Handbook editor: add date pickers for activation and removal dates | |
| | | | 3. Guide/Handbook list: show scheduling status (Scheduled, Active, Expired) | |
| | | | 4. Calendar or timeline view of scheduled guides | Nice-to-have. |
| 9. Admin Portal Hardening | The POC admin portal needs polish for production use. | **9.1 — Admin Authentication** | 1. Enforce Entra ID authentication on all admin routes using the shared app registration (Story 1.1) | POC has `AuthGuard` but needs the production app registration. |
| | | **9.2 — Admin UX Polish** | 1. Add confirmation dialogs for destructive actions (delete guide, delete handbook) | |
| | | | 2. Add form validation on all editor pages (required fields, max lengths) | Match DB constraints. |
| | | | 3. Add error handling / toast notifications for mutation failures | |
| | | | 4. Add loading states and empty states across all pages | |
| | | | 5. Dashboard: summary stats (active guides, pending acknowledgments, upcoming scheduled) | Nice-to-have. |
| 10. API Hardening | Production-grade the GraphQL API with auth enforcement, validation, and observability. | **10.1 — API Authentication** | 1. Enforce JWT bearer auth on all GraphQL queries/mutations | Uses the shared Entra ID app registration (Story 1.1). POC registers auth but doesn't enforce `[Authorize]`. |
| | | **10.2 — API Reliability & Observability** | 1. Add input validation on all mutations (max length, required fields, enum validation) | |
| | | | 2. Add structured logging (Serilog or similar) | |
| | | | 3. Add health check endpoint | Nice-to-have. |
| | | | 4. Rate limiting for SDK endpoints | Prevent abuse from client-side calls. Nice-to-have. |
| | | | 5. Add integration tests for GraphQL queries and mutations | |
| 11. SDK Hardening | Production-grade the SDK with error resilience, testing, and distribution. | **11.1 — SDK Error Resilience** | 1. Add error boundary component to prevent SDK errors from crashing host app | |
| | | | 2. Add retry logic with exponential backoff for GraphQL requests | |
| | | | 3. Add `onError` callback in `GuideOpsConfig` for host app error handling | |
| | | **11.2 — SDK Testing & Distribution** | 1. Add unit tests for hooks and components | |
| | | | 2. Publish SDK as versioned npm package (private registry or GitHub Packages) | Currently linked via `file:` reference. |
| | | | 3. Add SDK usage documentation for Edio integration team | |
