## run container sonar
> docker-compose -f docker-compose.sonar.yml up -d

## generate report in sonarqube
> npm run sonar

## stop docker-compose service
> docker-compose -f docker-compose.sonar.yml stop

## Guide [Nodejs Code Evaluation Using Jest, SonarQube and Docker](https://medium.com/swlh/nodejs-code-evaluation-using-jest-sonarqube-and-docker-f6b41b2c319d)