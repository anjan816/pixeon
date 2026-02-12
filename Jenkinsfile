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
                withCredentials([
                    string(credentialsId: 'imagekit-public', variable: 'IMAGEKIT_PUBLIC_KEY'),
                    string(credentialsId: 'imagekit-private', variable: 'IMAGEKIT_PRIVATE_KEY'),
                    string(credentialsId: 'imagekit-url', variable: 'IMAGEKIT_URL_ENDPOINT')
                ]) {
                    sh '''
                    docker build \
                      --build-arg IMAGEKIT_PUBLIC_KEY=$IMAGEKIT_PUBLIC_KEY \
                      --build-arg IMAGEKIT_PRIVATE_KEY=$IMAGEKIT_PRIVATE_KEY \
                      --build-arg IMAGEKIT_URL_ENDPOINT=$IMAGEKIT_URL_ENDPOINT \
                      -t pixeon .
                    '''
                }
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