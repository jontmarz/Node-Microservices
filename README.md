# 🧩 Prueba Técnica - Ingeniero Integrador

Solución basada en microservicios para gestionar productos e inventario, con un frontend integrado para administrar visualmente los recursos. Cada servicio está containerizado, documentado y probado con cobertura.

---

## 📌 Tabla de contenidos

- [🧠 Arquitectura General](#arquitectura-general)
- [🧰 Stack Tecnológico](#stack-tecnológico)
- [⚙️ Instalación y Ejecución](#instalación-y-ejecución)
- [🔐 Seguridad y Autenticación](#seguridad-y-autenticación)
- [🔁 Comunicación entre Servicios](#comunicación-entre-servicios)
- [📊 Testing](#testing)
- [📘 Documentación Swagger](#documentación-swagger)
- [🧱 Decisiones Técnicas](#decisiones-técnicas)
- [🧭 Futuras Mejoras](#futuras-mejoras)

---

## 🧠 Arquitectura General

```
             +----------------------+
             |     Frontend UI     |
             |  (React + Tailwind) |
             +----------+----------+
                        |
                        ▼
        +---------------+---------------+
        |         Product Service        |
        |     (Node.js + SQLite)         |
        +---------------+---------------+
                        |
                        ▼
        +---------------+---------------+
        |        Inventory Service       |
        |     (Node.js + SQLite)         |
        +-------------------------------+
```

---

## 🧰 Stack Tecnológico

### Backend
- Node.js + TypeScript + ESModules
- Express.js
- SQLite (modo memoria para agilidad en pruebas)
- Axios (comunicación entre servicios)
- Jest + Supertest (pruebas)
- Swagger/OpenAPI (documentación)

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS
- Axios

### Infraestructura
- Docker + Docker Compose
- NGINX (para servir el frontend en producción)

---

## ⚙️ Instalación y Ejecución

### ✅ Requisitos previos

- Docker y Docker Compose instalados

### ▶️ Levantar todo con un solo comando

```bash
docker-compose up --build
```

Servicios disponibles:

| Servicio            | URL                           |
|---------------------|-------------------------------|
| Frontend            | http://localhost:5173         |
| Product Service API | http://localhost:3001/api     |
| Inventory API       | http://localhost:3002/api     |

---

## 🔐 Seguridad y Autenticación

- Comunicación entre servicios protegida con `x-api-key`.
- Middleware en Express valida la clave antes de aceptar peticiones.

---

## 🔁 Comunicación entre Servicios

- `inventory-service` valida si un producto existe en `product-service` usando HTTP (`/productos/:id`).
- En caso de error o timeouts, se devuelve mensaje estructurado según JSON:API.

---

## 📊 Testing

Pruebas automáticas incluidas:

- CRUD de productos
- Verificación y actualización de inventario
- Mock de llamadas externas (`axios`)
- Cobertura superior al 80%

```bash
# Ejecutar pruebas manualmente desde cada servicio
npm run test
```

---

## 📘 Documentación Swagger

Documentación en formato OpenAPI (`swagger.yaml`) disponible en cada carpeta de servicio:

- `product-service/swagger/swagger.yaml`
- `inventory-service/swagger/swagger.yaml`

Puedes visualizarla en [Swagger Editor](https://editor.swagger.io/).

---

## 🧱 Decisiones Técnicas

| Decisión                              | Justificación                                                |
|---------------------------------------|---------------------------------------------------------------|
| **SQLite en memoria**                 | Ligero, rápido y sin configuración para entornos de prueba    |
| **Arquitectura modular por capas**    | Facilita el testing, escalabilidad y mantenimiento            |
| **Frontend React minimalista**        | Permite validar los servicios sin usar herramientas externas  |
| **Docker multi-stage builds**         | Imágenes ligeras y listas para producción                     |
| **Estándar JSON:API**                 | Comunicación consistente entre frontend y backend             |

---

## 🧭 Futuras Mejoras

- Uso de base de datos persistente (PostgreSQL o MongoDB)
- Mensajería real con RabbitMQ o Kafka para eventos de inventario
- Logs estructurados con Winston o Pino
- Despliegue en nube con CI/CD
- Validaciones con Zod o Joi
- Test E2E usando Cypress

---

## 📩 Contacto

Desarrollado por **Jon Tmarz**  
📌 [LinkedIn](https://www.linkedin.com/in/john-tmarz/)
📌 [Github](https://jontmarz.com)  
🧠 Prueba técnica para posición: **Ingeniero Integrador**
