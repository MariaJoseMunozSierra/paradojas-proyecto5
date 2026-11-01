# ParadoX :

# Frontend
Aplicación web de ParadoX, una red social donde los usuarios crean y debaten paradojas filosóficas.

## Enlaces :
- Frontend desplegado: https://paradojas-frontend.vercel.app
- Backend desplegado: https://paradojas-backend.onrender.com
- Documentación del backend (Swagger): https://paradojas-backend.onrender.com/api-docs
- Repositorio del backend: https://github.com/MariaJoseMunozSierra/paradojas-proyecto5-backend

## Pruebas :
Administrador -> Usuario : esceptico_1 -> Contraseña : password123
Usuario normal -> Usuario : esceptico_2 -> Contraseña : password123

## Tecnologías :
- React con Vite
- Redux Toolkit
- React Router
- Axios, con un interceptor que envía el token JWT en cada petición

## Cómo correrlo en tu computador :
1. Clona el repositorio
2. Instala las dependencias:
   npm install
3. Crea un archivo `.env` en la raíz (usa `.env.example` como guía):
   VITE_API_URL=https://paradojas-backend.onrender.com/api
4. Corre el proyecto:
   npm run dev

## Funcionalidades :
- Registro, inicio y cierre de sesión con JWT
- Rutas protegidas según sesión y rol
- Crear, ver, editar y eliminar paradojas (eliminar solo para administrador)
- Debate por capas, votos, duelos y ranking de filósofos

## Endpoints principales : 
- POST /auth/registro y /auth/login
- GET, POST, PUT y DELETE /paradojas
- /respuestas, /votos y /duelos
- GET /ranking

## Autores : 
- María José Muñoz (@MariaJoseMunozSierra)
- Matías Gómez Gutiérrez (@mgomezg1042)