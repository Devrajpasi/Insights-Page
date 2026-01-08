📝 Insights Page — Microservices-Based Blogging Platform

Insights Page is a high-performance, distributed blogging platform engineered with a microservices architecture. It leverages Next.js 14 for a robust frontend and a Node.js/Express backend ecosystem.

Designed for scalability and resilience, the system utilizes RabbitMQ for asynchronous communication between services and Redis for aggressive caching strategies. It integrates Google Gemini to provide AI-assisted writing tools, ensuring a modern, intelligent content creation experience.

✨ Key Features
🔐 Authentication & Identity
OAuth 2.0 Integration: Seamless sign-in via Google.

Stateless Security: Robust JWT-based authentication flow.

Route Protection: Secure, middleware-based access control for protected resources.

Profile Management: Full CRUD operations for user profiles, avatars, bios, and social links.

✍️ Content Engine
Rich Text Editing: Advanced WYSIWYG editor for immersive writing.

Media Management: Optimized image uploads and delivery via Cloudinary.

Granular Taxonomy: Category-based filtering and optimized search functionality.

RBAC: Author-exclusive permissions for editing and deletion.

🤖 GenAI Integration (Google Gemini)
Smart Titles: Context-aware title generation based on blog content.

Grammar & Style: AI-driven description refinement and grammar correction.

Content Polish: Automated refinement of raw inputs into structured, professional output.

Sanitized Output: Parsed and formatted AI responses ready for frontend rendering.

❤️ Social Interactions
Engagement: Bookmarking system (Save/Unsave) for reading lists.

Discussions: Authorization-gated commenting system.

⚡ Performance & Infrastructure
Event-Driven Architecture: RabbitMQ orchestrates cache invalidation and inter-service messaging.

High-Speed Caching: Redis caching layer for blog feeds to minimize database reads (Read-Through pattern).

Microservices: Domain-driven service isolation for independent scaling and failure containment.

Type Safety: End-to-end TypeScript implementation for compile-time reliability.

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

Render (backend deployment)

Environment-based configuration

Multi-stage Docker builds

