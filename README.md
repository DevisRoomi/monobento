# MonoBento (Dev / Tech Portfolio)

> Minimalist Monochromatic Bento Grid Developer Portfolio & CMS engineered with **Golang Standard Library** backend and **React 19 + TypeScript + TanStack Query** frontend, integrated with **Laravel Herd** virtual hosts and **FlyEnv MySQL**.

Curriculum implementation based on the book *"Fullstack Developer Golang React Untuk Pemula"*.

---

## ⚡ Tech Stack & Architecture

- **Backend**:
  - Language: **Golang 1.27**
  - Routing: Native `net/http` `ServeMux` (zero-external-framework architecture)
  - Security: **JWT (JSON Web Token)** with `HMAC-SHA256` signature verification & Bearer middleware
  - Storage: Thread-safe Mutex file store (`sync.RWMutex`) with relational schema mapping
  - Telemetry: Real-time runtime stats (`runtime.ReadMemStats`, active goroutines, uptime)

- **Frontend**:
  - Library: **React 19** with **TypeScript**
  - Data Fetching: **TanStack React Query v5** (queries, mutations, cache invalidation)
  - State Management: Native React **Context API** (`AuthContext`) + **Custom Hooks** (`useAuth`, `useProjects`, `useHealth`, `useClipboard`)
  - Styling: **Tailwind CSS v3** with monochromatic dark mode system (`#080808`, `#111111`, `#222222`)
  - Tooling: **Vite 6** & **Bun 1.4**

- **Local Host & Environment**:
  - **Laravel Herd**: Local Nginx web gateway serving `http://monobento.test`
  - **FlyEnv**: MySQL engine support on port `3306`

---

## 🚀 Quick Start

### 1. Run Go Backend API
```bash
cd backend
go run main.go
# Server listens on http://127.0.0.1:8081
```

### 2. Run Frontend Dev Server (or Build for Herd)
```bash
cd frontend
bun install

# Development with HMR & API proxy:
bun run dev

# Production build straight to Laravel Herd public folder:
bun run build
```

### 3. Access via Laravel Herd
Open browser to:
```
http://monobento.test
```

---

## 🔐 Demo Credentials
- **Username**: `admin`
- **Password**: `gopher123`
- Unlocks bento node creation and deletion powered by Golang JWT API.

---

## 👤 Author
**Devis Roomi**  
- GitHub: [@DevisRoomi](https://github.com/DevisRoomi)  
- Role: Fullstack Golang & React Engineer  
