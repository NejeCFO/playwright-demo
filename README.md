# Playwright Demo

![Playwright Version](https://img.shields.io/badge/Playwright-1.50.1-blue)
![Chromium Version](https://img.shields.io/badge/Chromium-91.0.4472.124-green)

## Descripción

Este proyecto es una demostración del uso de Playwright para pruebas automatizadas. Incluye la configuración necesaria para ejecutar pruebas en el navegador Chromium.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/NejeCFO/playwright-demo.git
    cd playwright-demo
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Instala Chromium:

    ```sh
    npx playwright install chromium
    ```

## Ejecución de Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```sh
npx playwright test