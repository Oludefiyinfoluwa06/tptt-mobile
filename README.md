# TPTT Mobile

Customer-facing mobile app for the **Travel & Tours Management** platform, built with Expo Router. Lets customers browse travel packages, submit booking requests, apply for visa assistance, upload documents, track application status, and receive notifications from the agency. Talks to the [tptt-api](../tptt-api) backend.

## Tech Stack

- Expo (React Native + Expo Router, file-based routing)
- TypeScript
- Axios + TanStack Query for API calls and server-state caching
- `expo-secure-store` for persisting the auth token
- Plain `StyleSheet` + small custom components (no UI library)

## Project Structure

```
src/
├── app/                    # Expo Router routes (kept thin — screens live in src/screens)
│   ├── _layout.tsx          # Root layout: providers + auth-gated Stack
│   ├── (auth)/                # Auth stack: login, register
│   └── (tabs)/                  # Main tabs: Home, Packages, My Requests, Notifications, Profile
├── screens/                 # Screen implementations + colocated *.styles.ts files
├── components/                # Shared UI primitives (Button, TextField, ThemedText/View, ...)
├── context/                     # React context providers (auth-context)
├── providers/                     # App-wide providers (TanStack Query)
├── api/                             # Axios client + per-resource API functions
├── lib/                               # Small framework-agnostic helpers (secure token storage)
└── constants/                           # Theme, spacing, env
```

Route files under `src/app/` are intentionally kept to a one-line re-export (`export { default } from '@/screens/...'`) — Expo Router treats every file inside `app/` as a route candidate, so screen logic and styles live in `src/screens/` instead to avoid polluting the route table.

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Copy the environment template and point it at your backend
   ```bash
   cp .env.example .env
   ```
3. Start the dev server
   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a development build, Android emulator, iOS simulator, or Expo Go.

## Environment Variables

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | Base URL of the `tptt-api` backend (e.g. `http://localhost:5000/api`) |

## Navigation

- **Auth Stack** (unauthenticated): Login, Register
- **Main Tabs** (authenticated): Home, Packages, My Requests, Notifications, Profile

Auth state gates which stack is shown via `Stack.Protected` in the root layout; the JWT is persisted in `expo-secure-store` so a logged-in session survives app restarts.

A tab that needs its own list/detail flow (e.g. Packages) nests a headerless `Stack` inside its route folder (`app/(tabs)/packages/_layout.tsx`) and renders its own `ScreenHeader` (back button + title) rather than the native Stack header — on web, `expo-router/unstable-native-tabs` draws a fixed floating pill over the top of the screen, which would otherwise sit on top of a native header. The same stack can hold a form screen too — `app/(tabs)/packages/book.tsx` (booking request) is reached via `router.push({ pathname, params })` rather than a deeper dynamic segment.

My Requests shows the signed-in customer's booking requests and visa requests as two sections (package/travel date/travelers, or country/visa type/purpose) via `StatusBadge`, a small component that maps a status string to a color tone and covers the statuses both features use. Its "+ New" applies-for-a-visa entry point (`app/(tabs)/my-requests/apply-visa.tsx`) follows the same nested-stack-in-tab pattern as Packages, since a visa request isn't tied to a package and so doesn't fit under `packages/`.

## Branch Workflow

Each feature is built on its own `feature/<name>` branch, pushed for review/merge before the next one starts.

## Roadmap

1. ✅ Auth (login/register/profile) + navigation shell
2. ✅ Packages (Home + Packages list/detail)
3. ✅ Bookings
4. ✅ Visa Requests
5. Documents (upload)
6. Notifications
