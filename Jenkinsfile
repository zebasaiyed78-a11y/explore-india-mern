
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
