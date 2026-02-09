

# Broker OS — Implementation Plan

## Overview
A modern financial reconciliation dashboard for ticket brokers, built with a sidebar-nav layout, Supabase backend (Postgres + Edge Functions), and Supabase Auth. We'll focus on the **core reconciliation flow** first and expand incrementally.

---

## Phase 1: Foundation & Auth

### Authentication
- Email/password signup & login with Supabase Auth
- Google OAuth integration
- Role-based access: Admin, Operator, Read-only (stored in a `user_roles` table)
- Profile creation on signup with auto-trigger
- Protected routes that redirect unauthenticated users

### App Shell & Navigation
- Modern sidebar navigation with collapsible sections
- Top bar with user avatar, role badge, and logout
- Pages: Dashboard, Remittances, Deposits, Matching, Payment Lines, Watchlist, Rules, Settings, Audit Log
- Responsive layout with mobile hamburger menu

---

## Phase 2: Three-Stream Data Ingestion

### Bank Transactions (Stream 1)
- Database table: `bank_transactions` with append-only raw storage + normalized columns
- CSV upload UI with column mapping and preview
- Connector interface designed for future Plaid integration (placeholder)
- Idempotent upserts using `(source, external_id)`

### Payment Lines / Invoices (Stream 2)
- Database table: `payment_lines` with `amount_signed` convention (payments positive, fees negative, adjustments ±)
- CSV and PDF remittance upload with a normalization pipeline
- Connector interface for future marketplace API integrations
- Source tracking and normalization versioning

### POS Purchases (Stream 3)
- Database table: `pos_purchases` with CSV upload + scheduled import placeholder
- Connector interface for future POS API integrations

### Ingestion Infrastructure
- `ingestion_runs` audit log table tracking every import (source, status, row counts, errors)
- High-water marks / sync cursors per connector
- Error alerting surfaced in the System Health dashboard

---

## Phase 3: Remittance Rollups & Stability

### Remittance Aggregation
- `remittances` table aggregating payment lines per marketplace payout period
- Computed fields: `gross_payments`, `fees_total`, `adjustments_total`, `net_expected_deposit = SUM(amount_signed)`
- Rollup recalculation on payment line changes

### Stability System
- State machine: `DRAFT` → `STABLE` / `LOCKED`
- Tracking fields: `is_stable`, `stable_at`, `last_line_change_at`
- `remittance_hash` and `remittance_version` — late adjustments bump version
- Rule: deposit matching blocked unless remittance is stable

### Remittances UI
- Filterable table view with stability badge (Draft/Stable/Locked)
- Drill-down into payment lines per remittance
- Rollup summary cards showing gross, fees, adjustments, net expected

---

## Phase 4: Deposit Matching

### Match Engine
- `deposit_match_edges` table with `allocated_amount` supporting 1→N splits and N→1 combinations
- Match state machine: UNMATCHED → CANDIDATES_FOUND → AUTO_MATCHED (1:1, split, combined) → MANUAL_MATCHED → MISMATCHED → EXPLAINED_EXCEPTION → VOIDED
- Scoring algorithm with currency locking, directional date bias, configurable date window, uniqueness checks
- Auto-match triggers when confidence and separation thresholds are met

### Matching UI (inspired by Reveal screenshot)
- Bank account selector dropdown
- Status filter tabs: For Review / Matched / Excluded
- Date buffer and amount buffer controls
- Transaction table with Find action to locate matching candidates
- Manual allocation modal for split/combined matches
- Variance explanation taxonomy for exceptions
- Auto Match and Export buttons

---

## Phase 5: Watchlist & Dashboard

### Watchlist
- Overdue receivables detection using configurable marketplace payment terms
- Expected pay date computation and aging buckets
- Priority scoring and escalation notes
- Filterable table with aging indicators

### Dashboard
- Coverage metrics: % matched, % unmatched, % exceptions
- Unexplained variance summary
- Recent ingestion status cards
- System health: connector statuses, last sync times, error counts
- Quick-action links to items needing attention

---

## Phase 6: Supporting Features

### Rules Engine
- Configurable rules for auto-ignoring transactions or triggering actions
- Rules table with conditions and action types
- UI for creating, editing, and toggling rules

### Settings
- Tenant/organization management
- Bank account configuration
- Marketplace account settings
- Connector configuration

### Audit Log
- Comprehensive activity log of all user and system actions
- Filterable by date, user, action type
- Detail view for each log entry

---

## API Contract
- An `openapi.yaml` file documenting all Supabase Edge Function endpoints (bank_txns, payment_lines, remittances, deposit_match_edges, watchlist, rules, ingestion_runs)
- Structured for future Swagger UI hosting

---

## Design Direction
- Modern sidebar dashboard with clean data tables
- Card-based summary panels on dashboard
- Status badges and color-coded states throughout
- Dark/light mode support
- Consistent filter bars and action toolbars on data pages

