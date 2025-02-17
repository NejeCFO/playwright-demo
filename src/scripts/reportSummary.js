const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const reportPath = path.join(__dirname, '../reports/json/report.json');

// Leer el archivo JSON
fs.readFile(reportPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }

    // Parsear el contenido del archivo JSON
    const report = JSON.parse(data);

    // Inicializar contadores
    let totalCases = 0;
    let totalOk = 0;
    let totalFailed = 0;

    // Función para imprimir la tabla
    const printTable = (suites) => {
        suites.forEach(suite => {
            suite.suites.forEach(subSuite => {
                subSuite.specs.forEach(spec => {
                    totalCases++;
                    const result = spec.tests[0].results[0].status;
                    if (result === 'passed') {
                        totalOk++;
                    } else {
                        totalFailed++;
                    }
                    console.log(`Test Case: ${spec.title}, Resultado: ${result}`);
                });
            });
        });
    };

    // Imprimir la tabla
    console.log('----------------------------------------');
    console.log('Resumen de Casos de Prueba:');
    printTable(report.suites);

    // Imprimir el resumen
    console.log('\nResumen:');
    console.log(`Total de casos: ${totalCases}`);
    console.log(`Total de casos OK: ${totalOk}`);
    console.log(`Total de casos fallados: ${totalFailed}`);
    console.log('----------------------------------------');
});