
pipeline {
    agent any

    environment {
        JWT_SECRET = credentials('explore-india-jwt-secret')
    }

    options {
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('01 - Checkout Code') {
            steps {
                echo 'Checking out Explore India source code...'
                checkout scm
            }
        }

        stage('02 - Check Tools') {
            steps {
                echo 'Checking Node.js, npm and Docker...'
                bat 'node --version'
                bat 'npm --version'
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('03 - Install Backend') {
            steps {
                echo 'Installing backend dependencies...'
                bat 'npm ci --prefix backend'
            }
        }

        stage('04 - Install Frontend') {
            steps {
                echo 'Installing frontend dependencies...'
                bat 'npm ci --prefix frontend'
            }
        }

        stage('05 - Validate Backend') {
            steps {
                echo 'Checking backend JavaScript syntax...'
                bat 'node --check backend/server.js'
            }
        }

        stage('06 - Build Frontend') {
            steps {
                echo 'Building the frontend for production...'
                bat 'npm run build --prefix frontend'
            }
        }

        stage('07 - Validate Compose') {
            steps {
                echo 'Validating Docker Compose configuration...'
                bat 'docker compose config --quiet'
            }
        }

        stage('08 - Build Docker Images') {
            steps {
                echo 'Building Explore India Docker images...'
                bat 'docker compose build app'
            }
        }

        stage('09 - Deploy Application') {
            steps {
                echo 'Starting the application and database...'
                bat 'docker compose up -d'
            }
        }

        stage('10 - Verify Deployment') {
            steps {
                echo 'Checking container status...'
                bat 'docker compose ps'

                echo 'Checking the application health endpoint...'
                bat 'curl.exe --retry 15 --retry-delay 2 --retry-connrefused --fail --silent --show-error http://localhost:5001/api/health'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: All Explore India pipeline stages completed!'
        }
        failure {
            echo 'FAILED: Check the first failed stage in Console Output.'
        }
        always {
            echo 'Explore India CI/CD pipeline execution finished.'
        }
    }
}
