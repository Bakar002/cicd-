pipeline {
    agent any

    environment {
        DOCKER_IMAGE_FRONTEND = 'my-dockerhub-account/frontend:latest'
        DOCKER_IMAGE_BACKEND = 'my-dockerhub-account/backend:latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE_BACKEND ./backend'
                    sh 'docker build -t $DOCKER_IMAGE_FRONTEND ./frontend'
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                        sh 'docker push $DOCKER_IMAGE_BACKEND'
                        sh 'docker push $DOCKER_IMAGE_FRONTEND'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker system prune -f'
        }
    }
}

