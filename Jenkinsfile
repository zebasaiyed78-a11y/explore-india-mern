
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                bat 'npm ci --prefix backend'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                bat 'npm ci --prefix frontend'
            }
        }

        stage('Check Backend Syntax') {
            steps {
                bat 'node --check backend/server.js'
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'npm run build --prefix frontend'
            }
        }

        stage('Build Docker Image') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'explore-india-jwt-secret',
                        variable: 'JWT_SECRET'
                    )
                ]) {
                    bat 'docker compose build app'
                }
            }
        }

        stage('Deploy Application') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'explore-india-jwt-secret',
                        variable: 'JWT_SECRET'
                    )
                ]) {
                    bat 'docker compose up -d'
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'docker compose ps'
                bat 'curl.exe --fail --silent --show-error http://localhost:5000/api/health'
            }
        }
    }

    post {
        success {
            echo 'Explore India CI/CD pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Open Console Output and inspect the failed stage.'
        }
    }
}
