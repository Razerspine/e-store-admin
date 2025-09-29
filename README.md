# 📦 EStore Admin

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version **20.2.1**.

---

## 🚀 Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to 👉 [http://localhost:4200/](http://localhost:4200/).  
The application will automatically reload whenever you modify any of the source files.

---

## 🛠 Code scaffolding

Angular CLI includes powerful scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as components, directives, or pipes), run:

```bash
ng generate --help
```

---

## 📦 Building

To build the project, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.  
By default, the production build optimizes your application for performance and speed.

---

## ✅ Running unit tests

To execute unit tests with the Karma test runner, use:

```bash
ng test
```

---

## 🌐 Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

⚠️ Angular CLI does not come with an end-to-end testing framework by default.  
You can choose one that suits your needs.

---

## 🏗 Architecture

The project follows a **feature-based architecture** for scalability and maintainability.

### 📂 Layers

- **core/** – global infrastructure: configs, guards, interceptors, base services, validators, and shared models.
- **features/** – business domains (e.g. products), each containing its own components, services, models, utils, and mappers.
- **shared/** – reusable UI components (e.g. tables, uploads, form, tabs) that can be used across features.
- **layout/** – application shell and structural components (header, footer, sidebar, etc.).
- **pages/** – standalone public pages (e.g. login, register).

---

### 📌 Example: `features/products`

```
products/
  ├── list/                 # product list page
  │   ├── product-list.component.ts/html/scss
  ├── detail/               # product detail page
  │   └── product-detail.component.ts/html/scss
  ├── models/               # product-specific types
  ├── services/             # product services, resolvers, actions
  ├── utils/                # product-specific helper functions
  └── mappers/              # mapping between API and UI models
```

---

### 📝 Naming conventions

- Components → `*.component.ts`
- Services → `*.service.ts`
- Resolvers → `*.resolver.ts`
- Guards → `*.guard.ts`
- Interceptors → `*.interceptor.ts`
- Models/Types → `*.type.ts`
- Mappers → `*.mapper.ts`
- Validators → `*.validator.ts`
- Utils → `*.util.ts` (or verb file names, if one function per file)

---

### 📊 Architecture diagram

```
src
├── app
│   ├── core        # global infrastructure
│   ├── features    # business domains (products, users, etc.)
│   ├── shared      # reusable UI components
│   ├── layout      # application shell (header, footer, sidebar)
│   └── pages       # standalone pages (login, register)
└── assets          # static resources
```

**Flow of dependencies:**

```
core   →  features
shared →  features
layout →  uses shared + features
pages  →  use core + shared
```

---

## 📚 Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the 👉 [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
