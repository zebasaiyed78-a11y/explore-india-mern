
pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        JWT_SECRET = credentials('explore-india-jwt-secret')
    }

    stages {
        stage('01 - Check Tools') {
            steps {
                echo 'Checking required tools...'
                bat '''
                    @echo off
                    git --version
                    node --version
                    npm --version
                    docker --version
                    docker compose version
                '''
            }
        }

        stage('02 - Validate Project Files') {
            steps {
                echo 'Checking project files...'
                bat '''
                    @echo off
                    if not exist "Dockerfile" exit /b 1
                    if not exist "docker-compose.yml" exit /b 1
                    if not exist "backend\\package.json" exit /b 1
                    if not exist "frontend\\package.json" exit /b 1
                    echo Project files found.
                '''
            }
        }

        stage('03 - Validate Docker Compose') {
            steps {
                echo 'Validating Docker Compose configuration...'
                bat 'docker compose -p explore-india-ci config --quiet'
            }
        }

        stage('04 - Build Docker Images') {
            steps {
                echo 'Building the Explore India Docker images...'
                bat 'docker compose -p explore-india-ci build'
            }
        }

        stage('05 - Deploy Application') {
            steps {
                echo 'Starting the application and MongoDB...'
                bat 'docker compose -p explore-india-ci up -d'
            }
        }

        stage('06 - Verify Deployment') {
            steps {
                echo 'Testing the Explore India API...'
                bat '''
                    @echo off
                    curl.exe --retry 30 --retry-delay 2 --retry-all-errors --retry-max-time 90 --fail --silent --show-error http://localhost:5001/api/health

                    if errorlevel 1 (
                        echo.
                        echo ERROR: API health check failed.
                        echo Container status:
                        docker compose -p explore-india-ci ps
                        echo Application logs:
                        docker compose -p explore-india-ci logs --tail 100 app
                        exit /b 1
                    )

                    echo.
                    echo SUCCESS: API health check passed.
                '''
            }
        }
    }

    post {
        always {
            echo 'Final Docker container status:'
            bat 'docker compose -p explore-india-ci ps'
        }
    }
}
