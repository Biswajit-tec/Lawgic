# LAWgic Web — Feature Modules

This directory contains feature-specific components, hooks, and utilities.
Each feature is self-contained and does not import from other features
(shared code lives in `components/`, `lib/`, or `@lawgic/` packages).

## Feature Modules

| Feature | Description | Status |
|---------|-------------|--------|
| `auth/` | Login, signup, auth state management | TODO |
| `documents/` | Document upload, management, status | TODO |
| `analyses/` | Document analysis results and citations | TODO |
| `conversations/` | Legal Q&A conversations | TODO |
| `cases/` | Legal case tracking | TODO |
| `legal/` | Legal source browser | TODO |
| `profile/` | User profile and settings | TODO |
| `settings/` | Application settings | TODO |

## Conventions

- Feature components are NOT reusable outside their domain
- Shared UI components go in `components/ui/`
- Domain types come from `@lawgic/types`
- Validation schemas come from `@lawgic/validation`
- API calls use the `api-client` package or feature-specific hooks
