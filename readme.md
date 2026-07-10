# Alarcon Car Rental Booking System

A booking platform with separate flows for **motor** and **car** rentals/bookings, built with a Laravel backend (API) and a Next.js frontend.

## Tech Stack

| Layer    | Tech                       |
| -------- | -------------------------- |
| Backend  | Laravel (REST API)         |
| Frontend | Next.js                    |
| Database | MySQL / PostgreSQL _(TBD)_ |
| Auth     | Laravel Sanctum _(TBD)_    |

## Project Structure

```
project-root/
├── backend/     # Laravel API
└── frontend/    # Next.js app
```

## Booking Modules

- [ ] **Car Booking**
  - [ ] List/search available cars
  - [ ] Booking form & date selection
  - [ ] Booking confirmation & status
- [ ] **Motor Booking**
  - [ ] List/search available motors
  - [ ] Booking form & date selection
  - [ ] Booking confirmation & status

## Admin Features

- [ ] **Dashboard**
  - [ ] Overview stats (total bookings, revenue, active vehicles)
  - [ ] Charts/graphs for bookings over time
- [ ] **Audit Trail**
  - [ ] Log admin actions (create/update/delete)
  - [ ] Filter by user, date, action type
- [ ] **Sales Records**
  - [ ] List of completed bookings/transactions
  - [ ] Export (CSV/Excel/PDF)
  - [ ] Filter by date range, vehicle type
- [ ] **Vehicle Management (Car/Motor)**
  - [ ] Add/edit car details
  - [ ] Add/edit motor details
  - [ ] Upload images
  - [ ] Set availability/status
- [ ] **Admin Settings**
  - [ ] Manage admin users/roles
  - [ ] General site/app settings
  - [ ] Notification settings

## Setup

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## Progress Notes

- _Add dated notes here as you build each feature._

---

_Last updated: 2026-07-10_
