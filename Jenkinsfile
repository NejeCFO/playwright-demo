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
                    bat 'npm install'
                    bat 'npx playwright install chromium'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                ansiColor('xterm') {
                    script {
                        def testStatus = bat returnStatus: true, script: 'npx playwright test'
                        if (testStatus != 0) {
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                    // catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    //     bat 'npx playwright test'
                    // }
                }
            }
        }
    }

    post {
        always {
            ansiColor('xterm') {
                bat 'node src/scripts/reportSummary.js'
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'src/reports/html',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
                archiveArtifacts artifacts: 'src/reports/html/index.html', fingerprint: true
            }
        }
        failure {
            echo '❌ Las pruebas han fallado. Revisa los logs.'
        }
        success {
            echo '✅ Todas las pruebas pasaron exitosamente!'
        }
        unstable {
            echo '⚠️ Algunas pruebas han fallado. Revisa los logs.'
        }
    }
}