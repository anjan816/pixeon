pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "pixeon"
        KUBE_DEPLOYMENT = "pixeon-app"
        CONTAINER_NAME = "pixeon-container"
    }

    stages {


        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE:$DOCKER_TAG'
            }
        }

        stage('Apply Kubernetes Manifests') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }

        stage('Update Image in Deployment') {
            steps {
                sh """
                kubectl set image deployment/$KUBE_DEPLOYMENT \
                $CONTAINER_NAME=$DOCKER_IMAGE:$DOCKER_TAG
                """
            }
        }

        stage('Rollout Restart') {
            steps {
                sh 'kubectl rollout restart deployment $KUBE_DEPLOYMENT'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'kubectl rollout status deployment $KUBE_DEPLOYMENT'
            }
        }
    }
}