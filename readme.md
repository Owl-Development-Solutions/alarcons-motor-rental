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
## USER profile
  [x] creat profile Logic faction 
## Booking Modules

- [ ] **Car Booking**
  - [x] List/search available cars
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
  - [x] Add/edit car details
  - [x] Add/edit motor details
  - [x] Upload images
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

# REST API

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/v1/register` |
| POST | `/api/v1/login` |


# Sample Request Payloads

## Register

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "username": "customer",
    "email": "customer@rental.com",
    "phone_number": "09234115672",
    "address": "Lapu-lapu cebu",
    "password": "12345678",
    "password_confirmation": "12345678"
}
```

---

## Login

```json
{
  "username": "customer",
  "password": "12345678"
}
```


### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## Progress Notes


:white_check_mark: [Backend] Done with the register and login module July 10, 2026


- _Add dated notes here as you build each feature._

---

_Last updated: 2026-07-10_
