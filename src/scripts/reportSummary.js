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
                    const titleParts = spec.title.split(' @');
                    const testCaseName = titleParts[0];
                    const testCaseId = titleParts[1] || 'N/A';
                    if (result === 'passed') {
                        totalOk++;
                        console.log(`JLR>\t${testCaseId}\t${testCaseName} - OK\t\t\t1\t\t0`);
                    } else {
                        totalFailed++;
                        console.log(`JLR>\t${testCaseId}\t${testCaseName} - NOT OK\t\t\t0\t\t1`);
                    }
                });
            });
        });
    };

    // Imprimir la tabla
    //console.log('----------------------------------------');
    console.log('JLR>\tID TSC/TC\t\tNOMBRE TSC/TC\t\t\tPASS\t\tFAIL');
    printTable(report.suites);

    // Imprimir el resumen
    console.log('JLR>\tResumen_Regresion\tTC PASADOS:' + totalOk + '\t\tTC FALLADOS:' + totalFailed + '\t\tTC TOTALES:' + totalCases);
    //console.log('----------------------------------------');
});