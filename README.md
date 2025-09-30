# 🧩 Admin Panel (Angular)

A modular admin panel built with **Angular v20**, featuring reactive forms, signals, facade architecture, and a scalable feature-first structure.

---

## 📁 Project Structure

```
src/
 ├── app/
 │   ├── core/        # Application core: configs, guards, models, services, utilities
 │   ├── features/    # Feature modules: users, products, etc.
 │   ├── layout/      # Layout and header components
 │   ├── pages/       # Auth pages: login, register
 │   ├── shared/      # Reusable UI components
 ├── assets/          # Fonts, images, global styles
 ├── environments/    # Environment configurations
```

---

## 🧠 Feature Architecture (example: `features/products`)

Each feature module is fully isolated and includes:

- `detail/` — Create/edit component
- `list/` — List view + table actions
- `models/` — Types: `product.type.ts`, `product-column.type.ts`, `product-form.type.ts`
- `services/`
  - `api/` — Backend communication
  - `store/` — Signal-based state management
  - `facade/` — Public interface for components
  - `product-form.service.ts` — Form generation logic
  - `product.resolver.ts` — Route-based data preloading
- `utils/` — Table builders, form formatters
- `mappers/` — Data transformation

---

## 🔁 Architectural Patterns

- **Signals + WritableSignal** — Local reactive state
- **Facade + Store** — Logic separation from components
- **Reactive Forms** — Dynamic validation and form building
- **Resolvers** — Preload data before route activation
- **Shared Components** — `table-caption`, `template-table`, `image-uploader`

---

## 🔐 Authentication

- `auth.guard.ts` — Route protection
- `auth.interceptor.ts` — Token injection
- `auth.service.ts` — Login, logout, current user

---

## 📦 Shared Models & Configs

- `core/models/` — Common types: `BaseColumnType`, `PaginatorType`, `TableConfigType`
- `core/configs/` — Static configs: languages, currencies, roles, categories

---

## 🧩 Shared Components

- `table-caption` — Table header with search, actions, and delete
- `template-table` — Config-driven generic table
- `image-uploader` — Drag-and-drop image upload
- `form-tabs` — Localization and currency tabbed forms

---

## 📌 API Endpoints

### Users
- `GET /api/users` — Fetch users
- `POST /api/users` — Create user
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

### Products
- `GET /api/products` — Fetch products
- `POST /api/products` — Create product
- `PUT /api/products/:id` — Update product
- `DELETE /api/products/:id` — Delete product

---

## 🧾 Forms

- Built via `user-form.service.ts`, `product-form.service.ts`
- Support dynamic validation (e.g. password required on create, optional on edit)
- Use `FormBuilder` and `FormGroup`

---

## 🔄 Signals & State

- `store.ts` — Holds `WritableSignal<T[]>`, `Signal<PaginatorType>`
- `facade.ts` — Exposes methods like `loadUsers()`, `updateUser()`, `createProduct()`
- Components subscribe directly to signals

---

## 🚀 Getting Started

```bash
npm install
npm run start
```

---

## 🛠️ Tech Stack

- Angular v20
- TypeScript
- Signals API
- RxJS (~7.8)
- SCSS
- REST API
- PrimeNG v20
- Quill v2

---

## 📚 Best Practices

- Use barrel files (`index.ts`) for clean imports
- Separate types, utilities, and configs by layer
- Follow feature-first architecture
- Use resolvers for route-based data loading
- Keep components dumb — delegate logic to facades  
