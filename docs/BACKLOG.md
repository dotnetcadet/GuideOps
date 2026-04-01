# GuideOps Production Backlog

**Target Deadline:** June 2026
**Current State:** POC approved for production
**Security Model:** Microsoft Entra ID (unchanged)

---

## Epic 1: Infrastructure & App Registration

> Stand up production-grade Azure resources and Entra ID app registrations.

### Story 1.1 — Register Entra ID Application

> **As an** infrastructure engineer, **I want** a single Entra ID app registration shared by the API (BFF) and Admin portal **so that** authentication is straightforward with minimal configuration overhead.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 1.1.1 | Register a single **GuideOps** app in Entra ID | P0 | Shared by the Admin SPA and the backend API (BFF pattern). Configure SPA redirect URIs for the Admin portal and client credentials for MS Graph user sync. |
| 1.1.2 | Configure standard permissions: `openid`, `profile`, `User.Read` | P0 | No custom API scopes needed. Standard OpenID Connect + basic user info. |
| 1.1.3 | Document app registration ID, tenant ID, and redirect URIs for team onboarding | P1 | |

### Story 1.2 — Migrate Database to PostgreSQL

> **As a** platform engineer, **I want** to switch from SQL Server to PostgreSQL **so that** we align with our production database standards and reduce licensing costs.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 1.2.1 | Replace `Microsoft.EntityFrameworkCore.SqlServer` with `Npgsql.EntityFrameworkCore.PostgreSQL` in `GuideOps.Api.csproj` | P0 | |
| 1.2.2 | Update `DbContext` configuration to use `UseNpgsql()` instead of `UseSqlServer()` | P0 | |
| 1.2.3 | Update connection string format in `appsettings.json` / environment config for PostgreSQL | P0 | |
| 1.2.4 | Re-generate EF Core migrations for PostgreSQL (drop existing SQL Server migration) | P0 | Audit column types (e.g., `nvarchar` → `varchar`/`text`, `datetime2` → `timestamptz`). |
| 1.2.5 | Validate all existing queries, indexes, and seed data against PostgreSQL | P1 | |
| 1.2.6 | Provision Azure Database for PostgreSQL Flexible Server (or equivalent) for production | P1 | |

### Story 1.3 — Set Up Deployment Pipeline

> **As a** DevOps engineer, **I want** containerized builds and a CI/CD pipeline **so that** we can deploy reliably across environments.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 1.3.1 | Create Dockerfile for `GuideOps.Api` | P1 | |
| 1.3.2 | Create Dockerfile / static site build for `GuideOps.Admin` | P1 | |
| 1.3.3 | Set up CI/CD pipeline (build, test, deploy) | P1 | GitHub Actions or Azure DevOps. |
| 1.3.4 | Configure environment-specific settings (dev, staging, prod) | P1 | Connection strings, Entra IDs, CORS origins. |
| 1.3.5 | Set up production CORS origins for Admin portal and Edio domains | P0 | Currently hardcoded to `localhost:5173`/`5174`. |

### Story 1.4 — Split into Separate Repositories

> **As a** DevOps engineer, **I want** the SDK, backend API, and admin frontend in separate repositories **so that** each component has its own CI/CD pipeline conforming to our GitLab source control and deployment setup.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 1.4.1 | Create separate GitLab repository for `guideops-sdk` (npm package) | P0 | Currently lives under `src/guideops-sdk` in the monorepo. |
| 1.4.2 | Create separate GitLab repository for `GuideOps.Api` (.NET backend) | P0 | Currently lives under `src/GuideOps.Api` in the monorepo. |
| 1.4.3 | Create separate GitLab repository for `GuideOps.Admin` (React frontend) | P0 | Currently lives under `src/GuideOps.Admin` in the monorepo. |
| 1.4.4 | Update SDK package references — Admin and Demo apps consume SDK via registry (not `file:` link) | P0 | Depends on SDK being published to a package registry (Story 11.2). |
| 1.4.5 | Set up independent CI/CD pipelines per repository in GitLab | P1 | Build, test, deploy per component. |
| 1.4.6 | Document cross-repo dependency versions and release workflow | P1 | SDK version pinning in Admin/API, coordinated releases. |

---

## Epic 2: Project-Level Multi-Application Support

> GuideOps must support managing guides and handbooks across multiple applications (e.g., Edio, future products) from a single platform. All content, assignments, and tracking are scoped to a project.

### Story 2.1 — Project Entity & Data Model

> **As an** admin, **I want** to create and manage projects representing different applications **so that** I can scope guides, handbooks, segments, and user assignments to a specific product.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 2.1.1 | Create `Project` entity (`Id`, `Name`, `Slug`, `Description`, `IsActive`, `CreatedAt`, `UpdatedAt`) | P0 | Slug is a URL-safe identifier (e.g., `edio`, `admin-portal`). |
| 2.1.2 | Add `ProjectId` foreign key to `Guide` model | P0 | All guides are scoped to a project. |
| 2.1.3 | Add `ProjectId` foreign key to `Handbook` model | P0 | All handbooks are scoped to a project. |
| 2.1.4 | Add `ProjectId` foreign key to `Segment` model (Epic 4) | P0 | Segments are project-scoped so different apps can define different audience groups. |
| 2.1.5 | Create `ProjectUser` join table (`ProjectId`, `UserId`, `Role`, `IsActive`, `JoinedAt`) | P0 | Users can belong to multiple projects with different roles per project. |
| 2.1.6 | Migrate existing data: create a default "Edio" project, assign all existing records to it | P1 | Backward-compatible migration. |

### Story 2.2 — Project-Scoped API Queries

> **As an** SDK consumer, **I want** API queries filtered by project **so that** my application only receives guides and handbooks intended for it.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 2.2.1 | Add `projectId` or `projectSlug` parameter to `GetAssignedGuides` query | P0 | SDK passes its project identifier; API filters accordingly. |
| 2.2.2 | Add `projectId` or `projectSlug` parameter to `GetPendingHandbooks` query | P0 | |
| 2.2.3 | Add GraphQL CRUD mutations for `Project` (create, update, deactivate) | P0 | Admin-only. |
| 2.2.4 | Add GraphQL queries: `GetProjects`, `GetProjectById`, `GetProjectBySlug` | P0 | |
| 2.2.5 | Add mutations to manage `ProjectUser` membership (add/remove users to projects) | P1 | |
| 2.2.6 | All existing list queries (`GetGuides`, `GetHandbooks`, etc.) must support optional project filtering | P1 | Admin portal can filter by project. |

### Story 2.3 — SDK Project Configuration

> **As a** developer integrating the SDK, **I want** to pass a project identifier in the SDK config **so that** my app only loads its own guides and handbooks.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 2.3.1 | Add `projectSlug` (or `projectId`) to `GuideOpsConfig` type | P0 | Required field. |
| 2.3.2 | SDK client passes project identifier on all API calls | P0 | |
| 2.3.3 | Validate project exists and user has access; return clear error if not | P1 | |

### Story 2.4 — Admin Portal Project Switcher

> **As an** admin, **I want** to switch between projects in the admin portal **so that** I can manage guides and handbooks for each application independently.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 2.4.1 | Add project selector/switcher in Admin portal sidebar or top nav | P0 | Persist selection in session/localStorage. |
| 2.4.2 | All Admin CRUD pages (Guides, Handbooks, Segments, Assignments) filter by selected project | P0 | |
| 2.4.3 | Add Project management page (list, create, edit, deactivate projects) | P0 | |
| 2.4.4 | Add Project Users page — manage which users belong to a project and their project-level role | P1 | |
| 2.4.5 | Dashboard stats scoped to selected project | P2 | |

---

## Epic 3: Guide Persistence — "Keep Appearing Until Accepted"

> Guides must re-appear on every session/page load until the user explicitly clicks "I Accept." Closing (X) or navigating away does NOT count as acceptance.

### Story 3.1 — Backend Acceptance Tracking

> **As a** product owner, **I want** guides to persist until the user explicitly clicks "I Accept" **so that** critical information is not skipped.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 3.1.1 | Add `RequiresAcceptance` boolean field to the `Guide` model | P0 | Default `true`. Determines whether a guide needs explicit acceptance vs. simple completion (dismiss). |
| 3.1.2 | Rename/refactor `GuideCompletion` to `GuideAcceptance` (or add an `AcceptedAt` field) to distinguish "accepted" from "dismissed/closed" | P0 | Only accepted guides stop re-appearing. POC's `RecordGuideCompletion` currently fires on close — this must change. |
| 3.1.3 | Update `GetAssignedGuides` query to only filter out guides where the user has an **acceptance** record, not a mere completion | P0 | |
| 3.1.4 | Add GraphQL mutation `AcceptGuide(azureAdObjectId, guideId)` that records acceptance | P0 | |
| 3.1.5 | Keep existing `RecordGuideCompletion` as a "viewed/dismissed" event for analytics — do NOT remove guide from assigned list | P1 | |

### Story 3.2 — SDK Accept / Dismiss UX

> **As a** student, **I want** to see an "I Accept" button on guides **so that** I can acknowledge the content, and if I close without accepting, the guide returns until I do.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 3.2.1 | Add "I Accept" button to the guide step popover (shown on the final step or as a standalone action) | P0 | |
| 3.2.2 | Keep the X (close) button but make it dismiss without accepting — guide returns next session/page load | P0 | **Open question from stakeholder:** Possibility of removing X entirely and forcing acceptance. Make this configurable per guide (`allowDismiss` flag). |
| 3.2.3 | Call `AcceptGuide` mutation only when user clicks "I Accept" | P0 | |
| 3.2.4 | Call `RecordGuideCompletion` (dismiss/view event) when user clicks X — do not suppress guide in future | P1 | |
| 3.2.5 | On page load / session start, always re-fetch assigned guides so un-accepted guides reappear | P0 | |

---

## Epic 4: Segments — Role-Based & Group-Based Targeting

> Attach guides and handbooks to user segments so only specific audiences see them.

### Story 4.1 — Segment Data Model

> **As an** admin, **I want** to define audience segments (e.g., "All Students", "All Caretakers", custom groups) **so that** I can target guides and handbooks to specific user populations.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 4.1.1 | Create `Segment` entity (`Id`, `ProjectId`, `Name`, `Description`, `Type`, `CreatedAt`, `UpdatedAt`) | P0 | `Type` = `Role`, `Custom`, etc. Scoped to project (Epic 2). |
| 4.1.2 | Create `SegmentRule` entity to define membership criteria (e.g., role = "Student", role = "Caretaker") | P0 | Supports rule-based membership: filter by `Role`, or by explicit user list. |
| 4.1.3 | Create `SegmentUser` join table for explicit user-to-segment assignment (for custom segments beyond role) | P1 | |
| 4.1.4 | Migrate existing `GuideAssignment.AssignToRole` and `HandbookAssignment.AssignToRole` to use the new `Segment` model | P0 | Replace string-based role matching with segment FK. Backward compatible migration. |

### Story 4.2 — Segment-Based Assignment Queries

> **As an** SDK consumer, **I want** the API to resolve segment membership when fetching assigned guides **so that** only the correct users see each guide.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 4.2.1 | Update `GuideAssignment` to reference `SegmentId` instead of `AssignToRole` | P0 | |
| 4.2.2 | Update `HandbookAssignment` to reference `SegmentId` instead of `AssignToRole` | P0 | |
| 4.2.3 | Update `GetAssignedGuides` query to resolve segment membership (role-based rules + explicit user lists) | P0 | |
| 4.2.4 | Update `GetPendingHandbooks` query to resolve segment membership | P0 | |
| 4.2.5 | Seed default segments per project: "All Students", "All Caretakers", "All Teachers", "All Users" | P1 | |

### Story 4.3 — Admin Segment Management UI

> **As an** admin, **I want** a segments page in the admin portal **so that** I can create, edit, and assign segments to guides and handbooks.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 4.3.1 | Add Segments CRUD page in Admin portal (list, create, edit, delete) | P0 | Scoped to selected project. |
| 4.3.2 | Segment editor: define rules (by role) or manually add users | P1 | |
| 4.3.3 | Update Guide and Handbook editors to assign segments instead of raw role strings | P0 | |
| 4.3.4 | Show segment membership count on segment list page | P2 | |

---

## Epic 5: Handbook Access & "I Accept" Tracking

> Students must be able to access the learner handbook (and all handbooks). Track when they open and when they accept.

### Story 5.1 — Track Document Opens and Acceptance

> **As an** admin, **I want** to see when a student opened a handbook and when they clicked "I Accept" **so that** I have an audit trail of engagement tied to their student ID.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 5.1.1 | Add `DocumentOpenedAt` tracking — record when a user actually opens/views the handbook content | P0 | New entity: `HandbookView { UserId, HandbookId, OpenedAt }`. Distinct from acknowledgment. |
| 5.1.2 | SDK: fire a `RecordHandbookView` mutation when the handbook modal content loads or when iframe/HTML is rendered | P0 | |
| 5.1.3 | Track `StudentId` (or mapped user identifier) on the acknowledgment record | P0 | The `Acknowledgment` already ties to `UserId`. Ensure the admin can see which student ID acknowledged. Confirm `User.AzureAdObjectId` or `User.Email` satisfies "tied to student ID number." |
| 5.1.4 | Admin portal: acknowledgment report should show both "Opened" and "Accepted" timestamps per user | P0 | |

### Story 5.2 — Handbook Library for Revisiting Documents

> **As a** student, **I want** to access all handbooks assigned to me (even after acknowledging) **so that** I can revisit policies and documents at any time.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 5.2.1 | SDK: expose a `useHandbooks()` hook that returns all handbooks assigned to the user (not just pending) | P1 | For a "Handbook Library" view where students can revisit handbooks after acknowledgment. |
| 5.2.2 | Add GraphQL query `GetAllAssignedHandbooks` (includes already-acknowledged ones) | P1 | |
| 5.2.3 | SDK: provide a `<HandbookLibrary />` component or render prop for host apps to display a handbook list | P2 | |

---

## Epic 6: Display Options — Banners, Popups, Positioning

> Ability to display guides as banners or popups anywhere on the page — mainly top or center.

### Story 6.1 — Support Multiple Guide Display Types

> **As an** admin, **I want** to choose whether a guide renders as a walkthrough, popup, or banner **so that** I can match the format to the content and urgency.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 6.1.1 | Extend `Guide.Type` to support: `Walkthrough`, `Popup`, `Banner` | P0 | POC only has `Walkthrough` and `Announcement`. |
| 6.1.2 | Add `DisplayPosition` field to `Guide` model (`top`, `center`, `bottom`, `element`) | P1 | |
| 6.1.3 | Admin portal: Guide editor includes display type and position selection | P0 | |

### Story 6.2 — SDK Banner Rendering

> **As a** student, **I want** to see important announcements as a banner at the top of the page **so that** I notice them without being blocked from using the app.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 6.2.1 | SDK renders a top-of-page or bottom-of-page sticky banner with guide content, "I Accept" / dismiss actions | P0 | Configurable: `top` or `bottom`. |
| 6.2.2 | Banner includes title, description, and action buttons matching the approved WCAG template | P0 | |

### Story 6.3 — SDK Popup/Modal Rendering

> **As a** student, **I want** critical guides to appear as a centered popup **so that** I cannot miss them.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 6.3.1 | SDK renders a centered modal overlay (similar to current HandbookModal) for popup-type guides | P0 | Replaces current centered-popover fallback with a proper modal layout. |
| 6.3.2 | Walkthrough rendering remains as-is: step-by-step popover behavior (element-anchored) | P0 | Already implemented in POC. |

---

## Epic 7: WCAG Accessibility Compliance

> All guides, popups, and banners must be WCAG 2.1 AA compliant. Provide an approved template.

### Story 7.1 — Accessibility Audit & Remediation

> **As a** compliance officer, **I want** all SDK components to meet WCAG 2.1 AA standards **so that** the application is accessible to all users including those with disabilities.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 7.1.1 | Audit and fix all SDK components for WCAG 2.1 AA: focus management, keyboard navigation, ARIA attributes | P0 | Popover, modal, banner, overlay. |
| 7.1.2 | Guide popover: trap focus within popover when active, return focus to trigger element on close | P0 | |
| 7.1.3 | Handbook modal: trap focus, `role="dialog"`, `aria-labelledby`, `aria-describedby`, ESC to close | P0 | |
| 7.1.4 | Banner: `role="alert"` or `role="status"`, keyboard-dismissible | P0 | |
| 7.1.5 | All interactive elements must have visible focus indicators meeting 3:1 contrast ratio | P0 | |
| 7.1.6 | All text must meet 4.5:1 contrast ratio (normal text) / 3:1 (large text) | P0 | Verify current indigo-on-white and gray palette. |
| 7.1.7 | Screen reader announcements: announce when a guide step changes, when a modal opens/closes | P1 | `aria-live` regions. |
| 7.1.8 | Support `prefers-reduced-motion`: disable animations when user preference is set | P1 | |

### Story 7.2 — WCAG Compliant Templates

> **As an** admin, **I want** pre-approved accessible templates for popups and banners **so that** any guide I create is automatically WCAG compliant without manual effort.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 7.2.1 | Create an approved, accessible popup template (design + implementation) that passes WCAG 2.1 AA audit | P0 | This becomes the default for all new guides. |
| 7.2.2 | Create an approved, accessible banner template | P0 | |
| 7.2.3 | Admin portal: when creating a guide, start from the approved template — prevent freeform HTML that could break accessibility | P1 | Template-first approach: structured fields (title, description, CTA text) rather than raw HTML. |
| 7.2.4 | Run automated accessibility testing (axe-core or similar) in CI pipeline | P2 | |

---

## Epic 8: Scheduling — Activation & Removal Dates

> Pre-schedule when guides appear and automatically expire them.

### Story 8.1 — Backend Scheduling Fields

> **As an** admin, **I want** to set an activation date and removal date on guides **so that** they automatically appear before an event (e.g., Tech Tune-Up day) and disappear on the last day of school.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 8.1.1 | Add `ActivationDate` (`DateTimeOffset?`) to `Guide` model | P0 | Guide is not shown before this date. |
| 8.1.2 | Add `RemovalDate` (`DateTimeOffset?`) to `Guide` model | P0 | Guide is automatically hidden after this date. |
| 8.1.3 | Add `ActivationDate` and `RemovalDate` to `Handbook` model | P1 | Same scheduling for handbooks. |
| 8.1.4 | Update `GetAssignedGuides` query to filter by `ActivationDate <= now` and `(RemovalDate is null OR RemovalDate >= now)` | P0 | |
| 8.1.5 | Update `GetPendingHandbooks` query with the same date filtering | P1 | |
| 8.1.6 | Background job or query-time check to mark expired guides as inactive (optional — query-time filtering may suffice) | P2 | |

### Story 8.2 — Admin Scheduling UI

> **As an** admin, **I want** date pickers in the guide/handbook editors and a visual indicator of scheduling status **so that** I can plan content rollout ahead of time.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 8.2.1 | Guide editor: add date pickers for activation and removal dates | P0 | |
| 8.2.2 | Handbook editor: add date pickers for activation and removal dates | P1 | |
| 8.2.3 | Guide/Handbook list: show scheduling status (Scheduled, Active, Expired) | P1 | |
| 8.2.4 | Calendar or timeline view of scheduled guides | P2 | Nice-to-have. |

---

## Epic 9: Admin Portal — Production Hardening

> The POC admin portal needs polish for production use.

### Story 9.1 — Admin Authentication

> **As a** security admin, **I want** Entra ID authentication enforced on all admin routes **so that** only authenticated users can access the admin portal.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 9.1.1 | Enforce Entra ID authentication on all admin routes using the shared app registration (Story 1.1) | P0 | POC has `AuthGuard` but needs the production app registration. |

### Story 9.2 — Admin UX Polish

> **As an** admin, **I want** confirmation dialogs, form validation, error toasts, and loading states **so that** the portal is reliable and prevents accidental mistakes.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 9.2.1 | Add confirmation dialogs for destructive actions (delete guide, delete handbook) | P1 | |
| 9.2.2 | Add form validation on all editor pages (required fields, max lengths matching DB constraints) | P1 | |
| 9.2.3 | Add error handling / toast notifications for mutation failures | P1 | |
| 9.2.4 | Add loading states and empty states across all pages | P1 | |
| 9.2.5 | Dashboard: summary stats (active guides, pending acknowledgments, upcoming scheduled guides) | P2 | |

---

## Epic 10: API — Production Hardening

### Story 10.1 — API Authentication

> **As a** security engineer, **I want** JWT bearer auth enforced on all GraphQL operations **so that** only authenticated users can access the API.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 10.1.1 | Enforce JWT bearer authentication on all GraphQL queries/mutations (POC registers auth but doesn't enforce `[Authorize]`) | P0 | Uses the shared Entra ID app registration (Story 1.1). |

### Story 10.2 — API Reliability & Observability

> **As a** platform engineer, **I want** input validation, structured logging, health checks, and rate limiting **so that** the API is production-grade and observable.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 10.2.1 | Add input validation on all mutations (max length, required fields, enum validation) | P1 | |
| 10.2.2 | Add structured logging (Serilog or similar) | P1 | |
| 10.2.3 | Add health check endpoint | P2 | |
| 10.2.4 | Rate limiting for SDK endpoints (prevent abuse from client-side calls) | P2 | |
| 10.2.5 | Add integration tests for GraphQL queries and mutations | P1 | |

---

## Epic 11: SDK — Production Hardening

### Story 11.1 — SDK Error Resilience

> **As a** developer integrating the SDK, **I want** error boundaries and retry logic **so that** SDK failures don't crash the host application.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 11.1.1 | Add error boundary component to prevent SDK errors from crashing host app | P0 | |
| 11.1.2 | Add retry logic with exponential backoff for GraphQL requests | P1 | |
| 11.1.3 | Add `onError` callback in `GuideOpsConfig` for host app error handling | P1 | |

### Story 11.2 — SDK Testing & Distribution

> **As a** developer, **I want** the SDK published as a versioned npm package with tests and documentation **so that** integration teams can adopt it reliably.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 11.2.1 | Add unit tests for hooks and components | P1 | |
| 11.2.2 | Publish SDK as a versioned npm package (private registry or GitHub Packages) | P1 | Currently linked via `file:` reference. |
| 11.2.3 | Add SDK usage documentation for Edio integration team | P1 | |

---

## Summary

### Priority Map

| Priority | Count | Description |
|----------|-------|-------------|
| **P0** | ~35 | Must-have for June launch |
| **P1** | ~27 | Should-have, important for production quality |
| **P2** | ~8 | Nice-to-have, can follow after launch |

### Story Count by Epic

| Epic | Stories | Focus |
|------|---------|-------|
| 1. Infrastructure & App Registration | 4 | Entra ID, PostgreSQL, CI/CD, repo split |
| 2. Project-Level Multi-App Support | 4 | Project entity, scoped queries, SDK config, admin switcher |
| 3. Guide Persistence | 2 | Acceptance tracking, accept/dismiss UX |
| 4. Segments | 3 | Segment model, assignment queries, admin UI |
| 5. Handbook Access & Tracking | 2 | Open/accept tracking, handbook library |
| 6. Display Options | 3 | Display types, banner rendering, popup rendering |
| 7. WCAG Compliance | 2 | Accessibility audit, approved templates |
| 8. Scheduling | 2 | Backend date fields, admin date pickers |
| 9. Admin Hardening | 2 | Auth/authz, UX polish |
| 10. API Hardening | 2 | Auth/authz, reliability |
| 11. SDK Hardening | 2 | Error resilience, testing/distribution |
| **Total** | **28 stories** | |

### Suggested Sprint Breakdown (April–June)

| Sprint | Focus |
|--------|-------|
| **April Sp1** | Epic 1 (Infra, App Regs, PostgreSQL), Epic 10 Stories 10.1 (API auth) |
| **April Sp2** | Epic 2 (Project model + scoped queries + admin switcher), Epic 3 (Guide persistence/acceptance) |
| **May Sp1** | Epic 4 (Segments model + backend + admin UI), Epic 6 (Display types — banner, popup) |
| **May Sp2** | Epic 7 (WCAG audit + templates), Epic 8 (Scheduling) |
| **June Sp1** | Epic 5 (Handbook tracking), Epic 9 (Admin hardening), Epic 11 (SDK hardening) |
| **June Sp2** | Integration testing, bug fixes, deployment, stakeholder sign-off |
