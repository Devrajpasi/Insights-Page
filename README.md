# 📝 Insights Page
### A Scalable, Microservices-Based Blogging Platform

Insights Page is a high-performance, distributed blogging platform built using a microservices architecture.  
It combines a modern **Next.js 14 frontend** with a robust **Node.js / Express backend ecosystem**.

---

## ✨ Key Features

### 🔐 Authentication & Identity
- Google OAuth 2.0 — Seamless and secure authentication
- JWT-based Auth — Stateless and scalable security model
- Route Protection — Middleware-driven access control
- Profile Management — Full CRUD for avatars, bios, and social links

---

### ✍️ Content Engine
- Rich Text Editor — Advanced WYSIWYG writing experience
- Media Handling — Optimized image uploads via Cloudinary
- Categorization & Search — Fast filtering and keyword discovery
- RBAC — Author-only permissions for editing and deletion

---

### 🤖 AI-Powered Writing (Google Gemini)
- Smart Titles — Context-aware AI title generation
- Grammar Correction — AI-refined descriptions and text
- Content Enhancement — Clean, structured, sanitized AI output

---

### ❤️ Social Features
- Bookmarking — Save & unsave blogs for later reading
- Comments — Auth-protected discussion system

---

### ⚡ Performance & Infrastructure
- Event-Driven Architecture — RabbitMQ for async messaging
- Redis Caching — Read-through caching for blog feeds
- Microservices — Independently scalable backend services
- Type Safety — End-to-end TypeScript

---

## 🛠 Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Google OAuth Client

### Backend (Microservices)
- Node.js + Express
- TypeScript
- PostgreSQL
- Redis
- RabbitMQ
- Google Gemini AI

### DevOps & Deployment
- Docker & Docker Hub
- Render (Backend Deployment)
- Environment-based configuration
- Multi-stage Docker builds
