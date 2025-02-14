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
                bat 'npm install'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
                bat 'node src/scripts/reportSummary.js'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'src/reports/html',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
            archiveArtifacts artifacts: 'src/reports/html/**', fingerprint: true
        }
        failure {
            echo '❌ Las pruebas han fallado. Revisa los logs.'
        }
        success {
            echo '✅ Todas las pruebas pasaron exitosamente!'
        }
    }
}
