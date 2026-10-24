
# ⚽ FútbolStats

FútbolStats es una aplicación web desarrollada con React que permite registrar resultados de partidos de fútbol, consultar el historial de encuentros y visualizar una tabla de posiciones que se actualiza automáticamente.

El proyecto utiliza una interfaz clara y moderna, con detalles verdes inspirados en el fútbol.

## ✨ Funcionalidades

- **Listado de equipos:** muestra seis equipos de fútbol con sus escudos, ciudades y estadios.
- **Búsqueda de equipos:** permite encontrar equipos por su nombre.
- **Registro de partidos:** permite seleccionar los equipos local y visitante e ingresar sus respectivos goles.
- **Validación de resultados:** comprueba que los equipos sean diferentes y que los marcadores sean números enteros no negativos.
- **Historial de partidos:** muestra los encuentros registrados con sus escudos y marcadores.
- **Filtro por equipo:** permite consultar los partidos en los que participó un equipo específico.
- **Eliminación de resultados:** permite eliminar individualmente los partidos registrados.
- **Tabla de posiciones:** calcula partidos jugados, ganados, empatados y perdidos, goles a favor, goles en contra, diferencia de goles y puntos.
- **Clasificación automática:** ordena los equipos por puntos, diferencia de goles y goles a favor.
- **Diseño adaptable:** incorpora estilos para computadores, tabletas y celulares.

## 🛠️ Tecnologías utilizadas

- React
- JavaScript
- HTML y JSX
- CSS
- Vite

## 📋 Requisitos previos

Para ejecutar el proyecto necesitas tener instalado:

- [Node.js](https://nodejs.org/)
- npm, que se instala normalmente junto con Node.js.
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado).

## 🚀 Instalación y ejecución

1. Descarga o clona este repositorio.
2. Abre la carpeta del proyecto en Visual Studio Code.
3. Abre una terminal en la carpeta raíz del proyecto.
4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre en el navegador la dirección local que aparece en la terminal, normalmente `http://localhost:5173/`.

## 📊 Sistema de puntuación

La tabla de posiciones utiliza las siguientes reglas:

| Resultado | Puntos |
|---|---:|
| Victoria | 3 |
| Empate | 1 |
| Derrota | 0 |

Las estadísticas se recalculan al registrar o eliminar un partido.

La clasificación se ordena según estos criterios:

1. Mayor cantidad de puntos.
2. Mayor diferencia de goles.
3. Mayor cantidad de goles a favor.

## 📁 Estructura del proyecto

La estructura principal incluye:

```text
FutbolStats/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

La estructura puede variar según la configuración inicial del proyecto.

## 💾 Almacenamiento de datos

Los resultados se gestionan mediante el estado de React (`useState`). Por lo tanto, los partidos registrados se mantienen mientras la aplicación está en ejecución, pero no se conservan al recargar la página.

El proyecto no requiere una base de datos ni un backend.

## 🎓 Objetivo académico

Este proyecto permite aplicar conceptos de desarrollo web con React, incluyendo componentes funcionales, Hooks, manejo de estado, renderizado de listas, filtrado de datos, eventos, validaciones y cálculos dinámicos.

## 👨‍💻 Autor

Estudiante de Ingeniería de Sistemas  
Universidad de la Costa (CUC)
