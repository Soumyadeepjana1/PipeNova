
pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t buildora:v1 .'
            }
        }

        stage('Docker Deploy') {
            steps {
                sh 'docker rm -f buildora-demo || true'
                sh 'docker run -d --name buildora-demo -p 8080:80 buildora:v1'
            }
        }
    }
}
