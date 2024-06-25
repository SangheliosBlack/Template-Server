# Template Node.js Server

<p align="center">
  <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js Logo">
</p>

Este repositorio proporciona una plantilla base para construir increíbles servidores utilizando Node.js. Ya sea que estés empezando un nuevo proyecto o buscando inspiración para mejorar tu servidor existente, esta plantilla está diseñada para ayudarte a comenzar con buen pie.

![Versión](https://img.shields.io/badge/Version-1.0.0-00d679?style=for-the-badge&logo=V&labelColor=00d679&color=00d679)
![AWS SDK](https://img.shields.io/badge/AWS_SDK-FF9900?style=for-the-badge&logo=Amazon-AWS&logoColor=fffff&labelColor=232F3E&color=FF9900)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white&labelColor=000000&color=000000)
![Firebase Admin](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=FFCA28&labelColor=007ACC&color=007ACC)
![Socket.io](https://img.shields.io/badge/Socket.io-000000?style=for-the-badge&logo=Socket.io&logoColor=white)
![Google Maps](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=Google-Maps&logoColor=white&labelColor=4285F4&color=4285F4)
![Mongoose](https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![Gitlab](https://img.shields.io/badge/Gitlab-FFFFFF?style=for-the-badge&logo=Gitlab&logoColor=#D74A2C)
![Mockito](https://img.shields.io/badge/Mockito-DBDFFF?style=for-the-badge&logo=Dart&logoColor=black)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white&labelColor=85EA2D&color=85EA2D)
![Stripe](https://img.shields.io/badge/Stripe-7455E8?style=for-the-badge&logo=Stripe&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white)


## Descripcion

Con un diseño extensible y modular, esta plantilla proporciona la flexibilidad necesaria para adaptarse a cualquier tipo de proyecto. Ya sea que estés construyendo una aplicación de comercio electrónico, una aplicación de productividad o una innovadora aplicación de medios, esta plantilla ofrece una base sólida que puedes personalizar y ampliar según tus necesidades específicas

## Tabla de Contenidos

- [Template Node.js Server](#template-nodejs-server)
- [Descripción](#descripcion)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Uso](#uso)
- [Características](#características)
- [Interfaz de Usuario de Swagger](#interfaz-de-usuario-de-swagger)
- [Pruebas](#pruebas)
- [Contribución](#contribución)
- [Estado del Proyecto](#estado-del-proyecto)
- [Cómo Contribuir](#cómo-contribuir)
- [Pautas de Codificación](#pautas-de-codificación)
- [Code of Conduct](#code-of-conduct)
- [FAQ (Preguntas Frecuentes)](#faq-preguntas-frecuentes)
- [Licencia](#licencia)
- [Notas de la Versión](#notas-de-la-versión)
- [Enlaces de Soporte](#enlaces-de-soporte)
- [Contribuidores](#contribuidores)


## Requisitos Previos

- Node.js y npm instalados
- MongoDB instalado y en ejecución (o el sistema de base de datos que estás utilizando)
- Otros requisitos específicos...

## Instalación

1. **Clona este repositorio :**

   ```bash
   git clone https://github.com/tuusuario/tuservidor.git

   ```

2. **Instala las dependencias :**

   ```bash
   npm install

   ```

3. **Inicia el servidor :**

   ```bash
   npm run dev

   ```

4. **Configuracion de Variables de Entorno**
   - Crea un archivo .env en el directorio raíz.
   - Sigue el formato especificado en .env.example.

## Estructura del Proyecto

El proyecto sigue una estructura organizada para facilitar la comprensión y mantenimiento del código. A continuación, se detalla la estructura del proyecto:

- **/database:** Contiene la configuración de la base de datos.
  - `config.js`: Configuración de la conexión a la base de datos.
- **/utils:** Directorio de utilidades y configuraciones adicionales.
  - `swagger_config.js`: Configuración de Swagger para documentación de la API.
  - `cors_config.js`: Configuración de CORS.
  - `trim_json_values.js`: Middleware para recortar valores JSON.
- **/public:** Contiene archivos estáticos (si los hay).

- **/routes:** Definición de rutas de la API.
  - `autentificacion.js`: Rutas relacionadas con la autenticación.
  - `usuarios.js`: Rutas relacionadas con los usuarios.
- **/config:** Configuraciones adicionales.
  - `authentication.js`: Configuración de autenticación utilizando Passport.
- **/sockets:** Contiene configuraciones y lógica del socket.
  - `socket.js`: Configuración y lógica del socket.

## Interfaz de Usuario de Swagger

Puedes acceder a la interfaz de usuario de Swagger para explorar la documentación de la API mediante el siguiente enlace:

[Interfaz de Usuario de Swagger](/api-docs)

También puedes acceder a la documentación completa de la API en formato JSON:

[Documentación de la API en formato JSON](/api-docs.json)

## Configuración

Instrucciones sobre cómo configurar el servidor, incluyendo variables de entorno y otros ajustes necesarios.

## Uso

Detalles sobre cómo usar el servidor, ejemplos de llamadas a la API, y cualquier otra información relevante.

# Características

El proyecto cuenta con las siguientes características:

- **Express:** Marco de aplicación web para Node.js. [Documentación de Express](https://expressjs.com/)

- **Socket.io:** Comunicación bidireccional en tiempo real. [Documentación de Socket.io](https://socket.io/)

- **MongoDB y Mongoose:** Sistema de base de datos NoSQL y ODM. [Documentación de MongoDB](https://docs.mongodb.com/) y [Documentación de Mongoose](https://mongoosejs.com/)

- **xss-clean:** Middleware para prevenir ataques XSS. [Documentación de xss-clean](https://www.npmjs.com/package/xss-clean)

- **Cors:** Middleware para habilitar el control de acceso a recursos del servidor. [Documentación de Cors](https://www.npmjs.com/package/cors)

- **Morgan:** Middleware de registro para solicitudes HTTP. [Documentación de Morgan](https://www.npmjs.com/package/morgan)

- **Passport:** Middleware para autenticación. [Documentación de Passport](http://www.passportjs.org/)

- **Express-swagger-generator:** Genera documentación Swagger automáticamente. [Documentación de Swagger](https://swagger.io/) y [Documentación de Express-swagger-generator](https://www.npmjs.com/package/express-swagger-generator)

## Pruebas

El proyecto cuenta con un conjunto de pruebas unitarias y de integración para garantizar su calidad y estabilidad. A continuación se detallan las instrucciones sobre cómo ejecutar estas pruebas y cómo contribuir escribiendo nuevas pruebas para el proyecto:

### Ejecutar Pruebas

1. **Instalación de Dependencias**: Asegúrate de que todas las dependencias estén instaladas ejecutando:

   ```bash
   npm install
   ```

2. **Ejecutar Pruebas**: Utiliza el siguiente comando para ejecutar todas las pruebas:
   ```bash
   npm test
   ```

### Contribuir con Nuevas Pruebas

¡Agradecemos mucho las contribuciones de nuevas pruebas para mejorar la cobertura y la robustez del proyecto! Si deseas contribuir escribiendo nuevas pruebas, sigue estos pasos:

1. **Fork del Repositorio**: Haz un fork del repositorio desde la interfaz de GitHub.

2. **Clonar el Repositorio Forked**: Clona tu repositorio forked en tu máquina local:

   ```bash
   git clone https://github.com/tuusuario/tuservidor.git
   ```

3. **Crear un Nuevo Branch**: Crea un nuevo branch para tu contribución:

   ```bash
   git checkout -b feature/nueva-prueba
   ```

4. **Escribir las Pruebas**: Escribe tus nuevas pruebas en el directorio de pruebas del proyecto.

5. **Ejecutar las Pruebas**: Asegúrate de que tus nuevas pruebas pasen ejecutando:

   ```bash
   npm test
   ```

6. **Hacer Commit de tus Cambios**: Haz commit de tus cambios:

   ```bash
   git commit -m "Agregadas nuevas pruebas"
   ```

7. **Hacer Push a tu Repositorio Forked**: Sube tus cambios a tu repositorio forked:

   ```bash
   git push origin feature/nueva-prueba
   ```

8. **Crear un Pull Request**: Crea un Pull Request desde tu repositorio forked a este repositorio principal. Describe tus cambios y por qué crees que deberían ser fusionados.

Una vez que hayas enviado tu Pull Request, revisaremos tus cambios y los fusionaremos en el proyecto principal si se consideran apropiados. ¡Gracias por contribuir!

## Contribuye a Mi Increíble Proyecto

Gracias por tu interés en contribuir a este increíble proyecto. Por favor, sigue estas pautas para contribuir de manera efectiva.

## Estado del Proyecto

El proyecto se encuentra en desarrollo activo y se mantiene regularmente. Actualmente, se considera estable para su uso en producción, pero aún se están realizando mejoras y agregando nuevas características de forma continua.

### Nivel de Estabilidad

El proyecto se ha probado exhaustivamente en entornos de desarrollo y producción. La mayoría de las características principales han sido implementadas y están funcionando de manera confiable. Sin embargo, pueden surgir algunos problemas menores en ciertas circunstancias, por lo que se recomienda estar atento a las actualizaciones y parches.

### Próximas Características

Estamos trabajando en varias nuevas características emocionantes para mejorar aún más el proyecto. Algunas de las características planeadas incluyen:

- Mejoras en el rendimiento y la escalabilidad.
- Integraciones con servicios de terceros.
- Mejoras en la documentación y la facilidad de uso.

### Cómo Contribuir

¡Agradecemos enormemente cualquier contribución al proyecto! Si estás interesado en contribuir, aquí hay algunas formas en las que puedes ayudar:

1. **Reportar Problemas**: Si encuentras algún problema o error, por favor repórtalo en la sección de "Issues" del repositorio. Asegúrate de proporcionar detalles suficientes para que podamos reproducir el problema.

2. **Contribuir con Código**: Si deseas contribuir con código, puedes enviar Pull Requests con nuevas características, correcciones de errores o mejoras en el código existente. Asegúrate de seguir las directrices de contribución del proyecto.

3. **Proporcionar Comentarios**: Si tienes ideas o sugerencias sobre cómo mejorar el proyecto, ¡nos encantaría escucharlas! Puedes compartir tus ideas en la sección de "Issues" o en el canal de discusión del proyecto.

¡Gracias por tu interés en contribuir al proyecto y ayudar a que siga creciendo y mejorando!

## Cómo Contribuir

1. Haz un "fork" del repositorio.
2. Clona tu repositorio bifurcado: `git clone https://github.com/tu-nombre-de-usuario/tu-proyecto.git`.
3. Instala las dependencias: `npm install`.
4. Crea una nueva rama para tu funcionalidad: `git checkout -b feature/tu-funcionalidad`.
5. Realiza tus cambios y pruébalos exhaustivamente.
6. Haz commit de tus cambios: `git commit -m 'Agregar tu funcionalidad'`.
7. Sube tu rama a tu repositorio bifurcado: `git push origin feature/tu-funcionalidad`.
8. Envía una solicitud de extracción ("pull request").


## Pautas de Codificación

Por favor, sigue las pautas de codificación descritas en el proyecto. Si tienes dudas, consulta el [CONTRIBUTORS](CONTRIBUTORS).

## Código de Conducta

Ten en cuenta que este proyecto se rige por un Código de Conducta para Contribuyentes. Al participar en este proyecto, aceptas cumplir con sus términos.

¡Gracias por contribuir a Template Server!

## FAQ (Preguntas Frecuentes)

### 1. ¿Cómo puedo reportar un problema o error en el proyecto?

Si encuentras algún problema o error en el proyecto, por favor abre un issue en la sección de "Issues" del repositorio en GitHub. Asegúrate de proporcionar detalles suficientes para que podamos entender y abordar el problema de manera efectiva.

### 2. ¿Cómo puedo contribuir al proyecto?

¡Nos encantaría recibir tu contribución! Por favor sigue las instrucciones detalladas en la sección de "Contribución" del README para obtener información sobre cómo contribuir al proyecto de manera efectiva.

### 3. ¿Qué debo hacer si tengo una pregunta que no está cubierta en esta sección de FAQ?

Si tienes alguna pregunta que no está cubierta en esta sección de preguntas frecuentes, no dudes en contactarnos a través de los enlaces de soporte proporcionados en la sección correspondiente del README. Estamos aquí para ayudarte y responder a todas tus preguntas.

### 4. ¿Cuál es la política de licencia del proyecto?

El proyecto está bajo la Licencia MIT, lo que significa que puedes utilizar, modificar y distribuir el software sin restricciones significativas. Para obtener más detalles, consulta el archivo LICENSE en este repositorio.

### 5. ¿Cómo puedo obtener ayuda adicional o soporte técnico?

Si necesitas ayuda adicional o soporte técnico, puedes visitar nuestros recursos de soporte en la sección de "Enlaces de Soporte" del README. También puedes contactarnos directamente a través de los medios de contacto proporcionados.



## Licencia

Este proyecto está bajo la Licencia MIT.

### Resumen de la Licencia MIT:

La Licencia MIT es una licencia de software permisiva que permite a las personas utilizar, modificar y distribuir el software sin restricciones significativas. Algunos puntos clave de la Licencia MIT incluyen:

- **Uso Comercial**: Se permite el uso del software con fines comerciales.
- **Modificación**: Se permite modificar el software y distribuir esas modificaciones.
- **Distribución**: Se permite la distribución del software y cualquier modificación bajo la misma licencia.

Para obtener más detalles, consulta el archivo [LICENSE](LICENSE) en este repositorio.

## Notas de la Versión

### Versión 1.0.0 (Fecha)

- Nueva característica: Agregada funcionalidad de autenticación de usuarios utilizando Passport.
- Mejora: Optimización del rendimiento en las consultas a la base de datos.
- Corrección de errores: Solucionado un problema con la validación de datos en la ruta de registro de usuarios.
- Actualización de dependencias: Se han actualizado las dependencias del proyecto a las versiones más recientes.

### Versión 0.2.0 (Fecha)

- Nueva característica: Implementada integración con Google Maps para mostrar la ubicación de los usuarios en tiempo real.
- Mejora: Mejoras en la documentación de la API utilizando Swagger.
- Corrección de errores: Solucionado un problema de seguridad en el manejo de sesiones de usuarios.
- Actualización de dependencias: Se han actualizado las dependencias del proyecto a las versiones más recientes.

### Versión 0.1.0 (Fecha)

- Versión inicial del proyecto.
- Características principales: Express, Socket.io, MongoDB y Mongoose.
- Configuración básica de rutas y controladores.


## Enlaces de Soporte

Si necesitas ayuda o tienes alguna pregunta sobre el proyecto, puedes visitar nuestros recursos de soporte:

- **Foro de Discusión PROXIMAMENE**
- **Correo electronico**: [Mi correo personal :)](julio.villagrana.sanghelios2)
- **Sistema de Tickets PROXIMAMENTE**:

¡Estamos aquí para ayudarte! No dudes en contactarnos si necesitas asistencia adicional.

## Contribuidores

[![Julio Villagrana](https://avatars.githubusercontent.com/u/50421116?s=96&v=4)](https://github.com/SangheliosBlack)

Julio Villagrana

¡Gracias por tu interés en contribuir al proyecto Template Server!

---

Julio Villagrana <3

