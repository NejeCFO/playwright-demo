pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NejeCFO/playwright-demo.git'
            }
        }

        stage('Setup Node.js & Dependencies') {
            steps {
                ansiColor('xterm') {
                    script {
                        def installStatus = bat returnStatus: true, script: '''
                            npm install
                            npx playwright install chromium
                        '''
                        if (installStatus != 0) {
                            error "❌ Error en la instalación de dependencias"
                        }
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                ansiColor('xterm') {
                    script {
                        def testStatus = bat returnStatus: true, script: 'npx playwright test'
                        if (testStatus != 0) {
                            echo "⚠️ Algunas pruebas fallaron"
                            currentBuild.result = 'UNSTABLE' // Permite ver que los tests fallaron, pero el pipeline no falla
                        } else {
                            echo "✅ Todas las pruebas pasaron exitosamente"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            ansiColor('xterm') {
                echo "📄 Generando el reporte de pruebas..."
                bat 'node src/scripts/reportSummary.js'

                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: './src/reports',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }

        success {
            echo "✅ El pipeline se ejecutó correctamente sin errores."
        }

        unstable {
            echo "⚠️ El pipeline terminó con tests fallidos, pero la compilación fue exitosa."
        }

        failure {
            echo "❌ Hubo un problema crítico en la ejecución del pipeline."
        }
    }
}
