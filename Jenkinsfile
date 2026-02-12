pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "anjan03/pixeon"
        DOCKER_TAG = "latest"
        KUBE_DEPLOYMENT = "pixeon-app"
        CONTAINER_NAME = "pixeon-container"
    }

    stages {


        stage('Build Docker Image') {
            steps {
                withCredentials([
                        string(credentialsId: 'convex-deployment', variable: 'CONVEX_DEPLOYMENT'),
                         string(credentialsId: 'convex-url', variable: 'NEXT_PUBLIC_CONVEX_URL'),
                         string(credentialsId: 'clerk-publishable', variable: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
                             string(credentialsId: 'clerk-secret', variable: 'CLERK_SECRET_KEY'),
                         string(credentialsId: 'clerk-issuer', variable: 'CLERK_JWT_ISSUER_DOMAIN'),
                        string(credentialsId: 'imagekit-public', variable: 'NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY'),
                        string(credentialsId: 'imagekit-url', variable: 'NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT'),
                        string(credentialsId: 'imagekit-private', variable: 'IMAGEKIT_PRIVATE_KEY'),
                        string(credentialsId: 'unsplash-access', variable: 'NEXT_PUBLIC_UNSPLASH_ACCESS_KEY')
         ]) {
                    sh '''
                         docker build \
                        --build-arg CONVEX_DEPLOYMENT=$CONVEX_DEPLOYMENT \
                        --build-arg NEXT_PUBLIC_CONVEX_URL=$NEXT_PUBLIC_CONVEX_URL \
                        --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
                        --build-arg CLERK_SECRET_KEY=$CLERK_SECRET_KEY \
                        --build-arg CLERK_JWT_ISSUER_DOMAIN=$CLERK_JWT_ISSUER_DOMAIN \
                        --build-arg NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=$NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY \
                        --build-arg NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=$NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT \
                        --build-arg IMAGEKIT_PRIVATE_KEY=$IMAGEKIT_PRIVATE_KEY \
                        --build-arg NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=$NEXT_PUBLIC_UNSPLASH_ACCESS_KEY \
                        -t $DOCKER_IMAGE:$DOCKER_TAG .
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

        stage('runn container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true

                docker run -d \
                  --name $CONTAINER_NAME \
                  -p 3001:3000 \
                  $DOCKER_IMAGE:$DOCKER_TAG
                  '''

            }
        }

        // stage('Update Image in Deployment') {
        //     steps {
        //         sh """
        //         kubectl set image deployment/$KUBE_DEPLOYMENT \
        //         $CONTAINER_NAME=$DOCKER_IMAGE:$DOCKER_TAG
        //         """
        //     }
        // }

        // stage('Rollout Restart') {
        //     steps {
        //         sh 'kubectl rollout restart deployment $KUBE_DEPLOYMENT'
        //     }
        // }

        // stage('Verify Deployment') {
        //     steps {
        //         sh 'kubectl rollout status deployment $KUBE_DEPLOYMENT'
        //     }
        // }
    }
}