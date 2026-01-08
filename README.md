📝 Insights Page
A Scalable, Microservices-Based Blogging Platform

Insights Page is a high-performance, distributed blogging platform built using a microservices architecture. It combines a modern Next.js 14 frontend with a robust Node.js / Express backend ecosystem.

Designed with scalability, resilience, and performance in mind, the platform leverages RabbitMQ for asynchronous service communication and Redis for aggressive caching strategies.
To enhance content creation, Google Gemini AI is integrated to provide intelligent, AI-assisted writing tools—delivering a modern and intuitive blogging experience.

✨ Key Features
🔐 Authentication & Identity

Google OAuth 2.0 – Seamless and secure authentication

JWT-Based Auth – Stateless and scalable security model

Route Protection – Middleware-driven access control

Profile Management – Full CRUD for avatars, bios, and social links

✍️ Content Engine

Rich Text Editor – Advanced WYSIWYG editing experience

Media Handling – Optimized image uploads via Cloudinary

Categorization & Search – Fast filtering and keyword-based discovery

RBAC – Author-only permissions for blog updates and deletion

🤖 GenAI Integration (Google Gemini)

AI-Generated Titles – Context-aware blog title generation

Grammar & Style Correction – Intelligent content refinement

Content Enhancement – Converts raw input into polished output

Sanitized Responses – Clean, frontend-ready AI outputs

❤️ Social Interactions

Bookmarking System – Save / unsave blogs for later reading

Commenting Engine – Secure, authorization-gated discussions

⚡ Performance & Infrastructure

Event-Driven Architecture – RabbitMQ for cache invalidation & messaging

High-Speed Caching – Redis (Read-Through strategy) to reduce DB load

Microservices Design – Independent scaling & fault isolation

End-to-End Type Safety – 100% TypeScript for reliability

🛠 Tech Stack
Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS + shadcn/ui

Google OAuth Client

Backend (Microservices)

Node.js + Express

TypeScript

JWT Authentication

PostgreSQL

Redis

RabbitMQ

Google Gemini AI

DevOps & Deployment

Docker & Docker Hub

Render (Backend Deployment)

Multi-Stage Docker Builds

Environment-Based Configuration
