
pipeline {
    agent any

    environment {
        JWT_SECRET = credentials('explore-india-jwt-secret')
    }

    options {
        timestamps()
        
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
        echo 'Building and deploying Explore India...'
        bat 'docker compose -p explore-india-ci up -d --build'
    }
}

stage('10 - Verify Deployment') {
    steps {
        echo 'Waiting for Explore India API to become ready...'

        bat '''
            @echo off
            curl.exe --retry 30 --retry-delay 2 --retry-all-errors --retry-max-time 90 --fail --silent --show-error http://localhost:5001/api/health

            if errorlevel 1 (
                echo.
                echo ERROR: API health check failed.
                echo Docker container status:
                docker compose -p explore-india-ci ps
                echo Recent backend logs:
                docker compose -p explore-india-ci logs --tail 100 app
                exit /b 1
            )

            echo.
            echo SUCCESS: Explore India API health check passed.
        '''
    }
}