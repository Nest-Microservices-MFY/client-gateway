<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">Gateway Microservice</h1>

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear el archivo `.env` basado en el `.env.template`
4. Correr NATS

   - ```bash
      docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
     ```

5. Ejecutar `npm run start:dev`
