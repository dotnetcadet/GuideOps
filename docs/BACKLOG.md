# GuideOps Production Backlog

**Target Deadline:** June 2026  
**Current State:** POC approved for production  
**Security Model:** Microsoft Entra ID (unchanged)

---

## Epic 1: Infrastructure & App Registration

> Stand up production-grade Azure resources and Entra ID app registrations.

### 1.1 Create Microsoft Entra ID App Registrations

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 1.1.1 | Register **GuideOps API** app in Entra ID (server/daemon) | P0 | Expose API permissions (scopes) for GraphQL access. Configure client credentials for MS Graph user sync. |
| 1.1.2 | Register **GuideOps Admin Portal** app in Entra ID (SPA) | P0 | Single-page application redirect URIs. Request API scopes from 1.1.1. Restrict to admin roles via App Roles or group claims. |
| 1.1.3 | Register **GuideOps SDK / Edio Integration** app in Entra ID (SPA) | P0 | SPA redirect URIs for Edio host app. Request read-only API scopes from 1.1.1. |
| 1.1.4 | Configure API permission scopes (e.g., `Guides.Read`, `Guides.Write`, `Handbooks.Read`, `Handbooks.Write`, `Users.Read`) | P0 | Define granular scopes on the API registration. Admin portal requests write scopes; SDK requests read-only. |
| 1.1.5 | Configure App Roles in Entra ID (`Admin`, `Editor`) for the Admin portal | P1 | Used to restrict who can create/edit guides and handbooks in the admin UI. |
| 1.1.6 | Document app registration IDs, tenant ID, and scope URIs for team onboarding | P1 | |

### 1.2 Switch Database from SQL Server to PostgreSQL

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 1.2.1 | Replace `Microsoft.EntityFrameworkCore.SqlServer` with `Npgsql.EntityFrameworkCore.PostgreSQL` in `GuideOps.Api.csproj` | P0 | |
| 1.2.2 | Update `DbContext` configuration to use `UseNpgsql()` instead of `UseSqlServer()` | P0 | |
| 1.2.3 | Update connection string format in `appsettings.json` / environment config for PostgreSQL | P0 | |
| 1.2.4 | Re-generate EF Core migrations for PostgreSQL (drop existing SQL Server migration) | P0 | Audit column types (e.g., `nvarchar` -> `varchar`/`text`, `datetime2` -> `timestamptz`). |
| 1.2.5 | Validate all existing queries, indexes, and seed data against PostgreSQL | P1 | |
| 1.2.6 | Provision Azure Database for PostgreSQL Flexible Server (or equivalent) for production | P1 | |

### 1.3 Deployment & CI/CD

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 1.3.1 | Create Dockerfile for `GuideOps.Api` | P1 | |
| 1.3.2 | Create Dockerfile / static site build for `GuideOps.Admin` | P1 | |
| 1.3.3 | Set up CI/CD pipeline (build, test, deploy) | P1 | GitHub Actions or Azure DevOps. |
| 1.3.4 | Configure environment-specific settings (dev, staging, prod) | P1 | Connection strings, Entra IDs, CORS origins. |
| 1.3.5 | Set up production CORS origins for Admin portal and Edio domains | P0 | Currently hardcoded to `localhost:5173`/`5174`. |

---

## Epic 2: Guide Persistence — "Keep Appearing Until Accepted"

> Guides must re-appear on every session/page load until the user explicitly clicks "I Accept." Closing (X) or navigating away does NOT count as acceptance.

### 2.1 Backend Changes

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 2.1.1 | Add `RequiresAcceptance` boolean field to the `Guide` model | P0 | Default `true`. Determines whether a guide needs explicit acceptance vs. simple completion (dismiss). |
| 2.1.2 | Rename/refactor `GuideCompletion` to `GuideAcceptance` (or add an `AcceptedAt` field) to distinguish "accepted" from "dismissed/closed" | P0 | Only accepted guides stop re-appearing. POC's `RecordGuideCompletion` currently fires on close — this must change. |
| 2.1.3 | Update `GetAssignedGuides` query to only filter out guides where the user has an **acceptance** record, not a mere completion | P0 | |
| 2.1.4 | Add GraphQL mutation `AcceptGuide(azureAdObjectId, guideId)` that records acceptance | P0 | |
| 2.1.5 | Keep existing `RecordGuideCompletion` as a "viewed/dismissed" event for analytics — do NOT remove guide from assigned list | P1 | |

### 2.2 SDK Changes

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 2.2.1 | Add "I Accept" button to the guide step popover (shown on the final step or as a standalone action) | P0 | |
| 2.2.2 | Keep the X (close) button but make it dismiss without accepting — guide returns next session/page load | P0 | **Open question from stakeholder:** Possibility of removing X entirely and forcing acceptance. Make this configurable per guide (`allowDismiss` flag). |
| 2.2.3 | Call `AcceptGuide` mutation only when user clicks "I Accept" | P0 | |
| 2.2.4 | Call `RecordGuideCompletion` (dismiss/view event) when user clicks X — do not suppress guide in future | P1 | |
| 2.2.5 | On page load / session start, always re-fetch assigned guides so un-accepted guides reappear | P0 | |

---

## Epic 3: Segments — Role-Based & Group-Based Targeting

> Attach guides and handbooks to user segments so only specific audiences see them.

### 3.1 Segment Model

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 3.1.1 | Create `Segment` entity (`Id`, `Name`, `Description`, `Type`, `CreatedAt`, `UpdatedAt`) | P0 | `Type` = `Role`, `Custom`, etc. |
| 3.1.2 | Create `SegmentRule` entity to define membership criteria (e.g., role = "Student", role = "Caretaker") | P0 | Supports rule-based membership: filter by `Role`, or by explicit user list. |
| 3.1.3 | Create `SegmentUser` join table for explicit user-to-segment assignment (for custom segments beyond role) | P1 | |
| 3.1.4 | Migrate existing `GuideAssignment.AssignToRole` and `HandbookAssignment.AssignToRole` to use the new `Segment` model | P0 | Replace string-based role matching with segment FK. Backward compatible migration. |

### 3.2 Segment Assignment

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 3.2.1 | Update `GuideAssignment` to reference `SegmentId` instead of `AssignToRole` | P0 | |
| 3.2.2 | Update `HandbookAssignment` to reference `SegmentId` instead of `AssignToRole` | P0 | |
| 3.2.3 | Update `GetAssignedGuides` query to resolve segment membership (role-based rules + explicit user lists) | P0 | |
| 3.2.4 | Update `GetPendingHandbooks` query to resolve segment membership | P0 | |
| 3.2.5 | Seed default segments: "All Students", "All Caretakers", "All Teachers", "All Users" | P1 | |

### 3.3 Admin Portal — Segment Management

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 3.3.1 | Add Segments CRUD page in Admin portal (list, create, edit, delete) | P0 | |
| 3.3.2 | Segment editor: define rules (by role) or manually add users | P1 | |
| 3.3.3 | Update Guide and Handbook editors to assign segments instead of raw role strings | P0 | |
| 3.3.4 | Show segment membership count on segment list page | P2 | |

---

## Epic 4: Handbook Access & "I Accept" Tracking

> Students must be able to access the learner handbook (and all handbooks). Track when they open and when they accept.

### 4.1 Handbook Document Tracking

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 4.1.1 | Add `DocumentOpenedAt` tracking — record when a user actually opens/views the handbook content | P0 | New entity or field: `HandbookView { UserId, HandbookId, OpenedAt }`. Distinct from acknowledgment. |
| 4.1.2 | SDK: fire a `RecordHandbookView` mutation when the handbook modal content loads or when iframe/HTML is rendered | P0 | |
| 4.1.3 | Track `StudentId` (or mapped user identifier) on the acknowledgment record | P0 | The `Acknowledgment` already ties to `UserId`. Ensure the admin can see which student ID acknowledged. Confirm `User.AzureAdObjectId` or `User.Email` satisfies "tied to student ID number." |
| 4.1.4 | Admin portal: acknowledgment report should show both "Opened" and "Accepted" timestamps per user | P0 | |

### 4.2 Handbook Library Access

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 4.2.1 | SDK: expose a `useHandbooks()` hook that returns all handbooks assigned to the user (not just pending) | P1 | For a "Handbook Library" view where students can revisit handbooks after acknowledgment. |
| 4.2.2 | Add GraphQL query `GetAllAssignedHandbooks` (includes already-acknowledged ones) | P1 | |
| 4.2.3 | SDK: provide a `<HandbookLibrary />` component or render prop for host apps to display a handbook list | P2 | |

---

## Epic 5: Display Options — Banners, Popups, Positioning

> Ability to display guides as banners or popups anywhere on the page — mainly top or center.

### 5.1 Guide Display Types

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 5.1.1 | Extend `Guide.Type` to support: `Walkthrough`, `Popup`, `Banner` | P0 | POC only has `Walkthrough` and `Announcement`. |
| 5.1.2 | **Banner rendering**: SDK renders a top-of-page or bottom-of-page banner with guide content, "I Accept" / dismiss actions | P0 | Sticky positioning. Configurable: `top` or `bottom`. |
| 5.1.3 | **Popup/Modal rendering**: SDK renders a centered modal overlay (similar to current HandbookModal) for guide content | P0 | Replaces current centered-popover fallback with a proper modal layout. |
| 5.1.4 | **Walkthrough rendering**: Keep existing step-by-step popover behavior (element-anchored) | P0 | Already implemented in POC. |
| 5.1.5 | Add `DisplayPosition` field to `Guide` model (`top`, `center`, `bottom`, `element`) | P1 | |
| 5.1.6 | Admin portal: Guide editor includes display type and position selection | P0 | |

---

## Epic 6: WCAG Accessibility Compliance

> All guides, popups, and banners must be WCAG 2.1 AA compliant. Provide an approved template.

### 6.1 SDK Accessibility

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 6.1.1 | Audit and fix all SDK components for WCAG 2.1 AA: focus management, keyboard navigation, ARIA attributes | P0 | Popover, modal, banner, overlay. |
| 6.1.2 | Guide popover: trap focus within popover when active, return focus to trigger element on close | P0 | |
| 6.1.3 | Handbook modal: trap focus, `role="dialog"`, `aria-labelledby`, `aria-describedby`, ESC to close | P0 | |
| 6.1.4 | Banner: `role="alert"` or `role="status"`, keyboard-dismissible | P0 | |
| 6.1.5 | All interactive elements must have visible focus indicators meeting 3:1 contrast ratio | P0 | |
| 6.1.6 | All text must meet 4.5:1 contrast ratio (normal text) / 3:1 (large text) | P0 | Verify current indigo-on-white and gray palette. |
| 6.1.7 | Screen reader announcements: announce when a guide step changes, when a modal opens/closes | P1 | `aria-live` regions. |
| 6.1.8 | Support `prefers-reduced-motion`: disable animations when user preference is set | P1 | |

### 6.2 WCAG Compliant Templates

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 6.2.1 | Create an approved, accessible popup template (design + implementation) that passes WCAG 2.1 AA audit | P0 | This becomes the default for all new guides. |
| 6.2.2 | Create an approved, accessible banner template | P0 | |
| 6.2.3 | Admin portal: when creating a guide, start from the approved template — prevent freeform HTML that could break accessibility | P1 | Template-first approach: structured fields (title, description, CTA text) rather than raw HTML. |
| 6.2.4 | Run automated accessibility testing (axe-core or similar) in CI pipeline | P2 | |

---

## Epic 7: Scheduling — Activation & Removal Dates

> Pre-schedule when guides appear and automatically expire them.

### 7.1 Backend

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 7.1.1 | Add `ActivationDate` (`DateTimeOffset?`) to `Guide` model | P0 | Guide is not shown before this date. |
| 7.1.2 | Add `RemovalDate` (`DateTimeOffset?`) to `Guide` model | P0 | Guide is automatically hidden after this date. |
| 7.1.3 | Add `ActivationDate` and `RemovalDate` to `Handbook` model | P1 | Same scheduling for handbooks. |
| 7.1.4 | Update `GetAssignedGuides` query to filter by `ActivationDate <= now` and `(RemovalDate is null OR RemovalDate >= now)` | P0 | |
| 7.1.5 | Update `GetPendingHandbooks` query with the same date filtering | P1 | |
| 7.1.6 | Background job or query-time check to mark expired guides as inactive (optional — query-time filtering may suffice) | P2 | |

### 7.2 Admin Portal

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 7.2.1 | Guide editor: add date pickers for activation and removal dates | P0 | |
| 7.2.2 | Handbook editor: add date pickers for activation and removal dates | P1 | |
| 7.2.3 | Guide/Handbook list: show scheduling status (Scheduled, Active, Expired) | P1 | |
| 7.2.4 | Calendar or timeline view of scheduled guides | P2 | Nice-to-have. |

---

## Epic 8: Admin Portal — Production Hardening

> The POC admin portal needs polish for production use.

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 8.1 | Enforce Entra ID authentication on all admin routes (POC has `AuthGuard` but needs real app registration) | P0 | |
| 8.2 | Role-based access: only users with `Admin` app role can access the admin portal | P0 | |
| 8.3 | Add confirmation dialogs for destructive actions (delete guide, delete handbook) | P1 | |
| 8.4 | Add form validation on all editor pages (required fields, max lengths matching DB constraints) | P1 | |
| 8.5 | Add error handling / toast notifications for mutation failures | P1 | |
| 8.6 | Add loading states and empty states across all pages | P1 | |
| 8.7 | Dashboard: summary stats (active guides, pending acknowledgments, upcoming scheduled guides) | P2 | |

---

## Epic 9: API — Production Hardening

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 9.1 | Enforce JWT bearer authentication on all GraphQL queries/mutations (POC registers auth but doesn't enforce `[Authorize]`) | P0 | |
| 9.2 | Add authorization policies: read-only for SDK consumers, read-write for admin | P0 | Map to Entra ID scopes from 1.1.4. |
| 9.3 | Add input validation on all mutations (max length, required fields, enum validation) | P1 | |
| 9.4 | Add structured logging (Serilog or similar) | P1 | |
| 9.5 | Add health check endpoint | P2 | |
| 9.6 | Rate limiting for SDK endpoints (prevent abuse from client-side calls) | P2 | |
| 9.7 | Add integration tests for GraphQL queries and mutations | P1 | |

---

## Epic 10: SDK — Production Hardening

| ID | Requirement | Priority | Notes |
|----|------------|----------|-------|
| 10.1 | Add retry logic with exponential backoff for GraphQL requests | P1 | |
| 10.2 | Add error boundary component to prevent SDK errors from crashing host app | P0 | |
| 10.3 | Add `onError` callback in `GuideOpsConfig` for host app error handling | P1 | |
| 10.4 | Add unit tests for hooks and components | P1 | |
| 10.5 | Publish SDK as a versioned npm package (private registry or GitHub Packages) | P1 | Currently linked via `file:` reference. |
| 10.6 | Add SDK usage documentation for Edio integration team | P1 | |

---

## Summary — Priority Map

| Priority | Count | Description |
|----------|-------|-------------|
| **P0** | ~30 | Must-have for June launch |
| **P1** | ~25 | Should-have, important for production quality |
| **P2** | ~8 | Nice-to-have, can follow after launch |

### Suggested Sprint Breakdown (April–June)

| Sprint | Focus |
|--------|-------|
| **April Sp1** | Epic 1 (Infra, App Regs, PostgreSQL switch), Epic 9.1–9.2 (API auth) |
| **April Sp2** | Epic 2 (Guide persistence/acceptance), Epic 3 (Segments model + backend) |
| **May Sp1** | Epic 5 (Display types — banner, popup), Epic 3.3 (Admin segment UI) |
| **May Sp2** | Epic 6 (WCAG audit + templates), Epic 7 (Scheduling) |
| **June Sp1** | Epic 4 (Handbook tracking), Epic 8 (Admin hardening), Epic 10 (SDK hardening) |
| **June Sp2** | Integration testing, bug fixes, deployment, stakeholder sign-off |
