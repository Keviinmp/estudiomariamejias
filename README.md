# 💅 Estudio de Belleza María Mejías - Web Oficial

¡Bienvenido al repositorio de la web oficial de **Estudio de Belleza María Mejías**! Este proyecto es una Single Page Application (SPA) desarrollada con **Angular**, diseñada para ofrecer una experiencia visual elegante, profesional y moderna a las clientas de Alcalá de Guadaíra.

---

## 🎨 Temática del Proyecto
Es la web oficial de un centro de estética en Alcalá de Guadaíra, en este caso el de mi hermana. He buscado un diseño limpio y moderno que pegue con el estilo de su logo, usando tonos azules claritos y blancos para que se vea profesional y cuidado.

## 📍 Rutas Disponibles
La aplicación utiliza el `RouterModule` de Angular para una navegación fluida sin recargas de página:

* **`/` (Inicio):** Presentación del estudio, carrusel de trabajos realizados, sección "Sobre Mí", servicios del centro (Wi-Fi, Pet Friendly, etc.) y panel detallado de contacto.
* **`/servicios`:** Listado detallado de tratamientos de manicura, nivelación y extensiones.
* **`/resenas`:** Sección dedicada a la prueba social, integrando opiniones reales de Google Maps mediante el widget de SociableKIT.

## 🚀 Funcionalidades Principales
* **Catálogo Completo de Servicios:** Las clientas pueden consultar todos los servicios que se ofrecen en el local (manicuras, nivelación, nail art, etc.) con sus detalles, para que sepan exactamente qué elegir antes de ir.
* **Gestión de Citas Real:** La web es totalmente funcional. Las clientas pueden rellenar el formulario para pedir su cita de verdad, enviando la información directamente.
* **Confirmación de Citas con EmailJS:** Cuando una clienta pide cita, el sistema utiliza la API de EmailJS para enviarle automáticamente un correo electrónico con todos los detalles de su reserva.
* **Carrusel de fotos:** Para que se vean los diseños que hace.
* **Mapa interactivo:** Para que las clientas sepan cómo llegar al local en Calle General Prim.
* **Opiniones reales:** Integración de las reseñas de Google mediante SociableKIT.
* **Navbar y Footer:** Menús sencillos para navegar y una barrita final con el copyright.

## 🛠️ Instrucciones para Ejecutar la Aplicación

### Requisitos previos
1.  Tener instalado [Node.js](https://nodejs.org/).
2.  Tener instalado el [Angular CLI](https://angular.io/cli) de forma global:
    ```bash
    npm install -g @angular/cli
    ```

### Pasos para el despliegue local
1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/nombre-del-repo.git](https://github.com/tu-usuario/nombre-del-repo.git)
    ```
2.  **Instalar las dependencias:**
    ```bash
    npm install
    ```
3.  **Lanzar el servidor de desarrollo:**
    ```bash
    ng serve
    ```
4.  **Abrir en el navegador:**
    Ve a `http://localhost:4200/` para ver la aplicación funcionando.