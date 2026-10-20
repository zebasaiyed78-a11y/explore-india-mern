
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('1 - Checkout Code') {
            steps {
                checkout scm
                echo 'Source code downloaded from GitHub.'
            }
        }

        stage('2 - Check Tools') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('3 - Install Backend') {
            steps {
                bat 'npm ci --prefix backend'
            }
        }

        stage('4 - Install Frontend') {
            steps {
                bat 'npm ci --prefix frontend'
            }
        }

        stage('5 - Validate Backend') {
            steps {
                bat 'node --check backend/server.js'
                echo 'Backend syntax check passed.'
            }
        }

        stage('6 - Build Frontend') {
            steps {
                bat 'npm run build --prefix frontend'
            }
        }

        stage('7 - Validate Docker Compose') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'explore-india-jwt-secret',
                        variable: 'JWT_SECRET'
                    )
                ]) {
                    bat 'docker compose config --quiet'
                }
            }
        }

        stage('8 - Build Docker Image') {
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

        stage('9 - Deploy Application') {
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

        stage('10 - Verify Deployment') {
            steps {
                bat 'docker compose ps'
                bat 'curl.exe --retry 15 --retry-delay 2 --retry-connrefused --fail --silent --show-error http://localhost:5001/api/health'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Explore India CI/CD completed!'
            echo 'Application: http://localhost:5001'
            echo 'Health check: http://localhost:5001/api/health'
        }

        failure {
            echo 'FAILED: Check the first red stage and its Console Output.'
        }

        always {
            echo 'Explore India pipeline run finished.'
        }
    }
}
