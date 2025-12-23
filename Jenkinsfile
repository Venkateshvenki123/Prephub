pipeline {
    agent any
    
    tools {
        nodejs 'Node 18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "✅ Repository checked out successfully"
            }
        }
        
        stage('Frontend Build') {
            steps {
                dir('my-personal-site') {
                    bat '''
                        npm install
                        npm run build
                        echo Frontend build completed successfully!
                    '''
                    archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
                }
            }
        }
        
        stage('Backend Setup') {
            steps {
                dir('backend') {
                    bat '''
                        python -m venv venv
                        call venv\\Scripts\\activate
                        pip install -r requirements.txt
                        echo Backend dependencies installed!
                    '''
                }
            }
        }
        
        stage('Success') {
            steps {
                echo '🎉 CI Pipeline completed! Ready for deployment.'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            emailext (
                subject: "SUCCESS: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: "Build succeeded! Check artifacts: ${env.BUILD_URL}",
                to: "your-email@example.com"
            )
        }
        failure {
            emailext (
                subject: "FAILED: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: "Build failed! Check logs: ${env.BUILD_URL}",
                to: "your-email@example.com"
            )
        }
    }
}