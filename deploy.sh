# Dockerイメージをビルド
docker build -t todo-app-frontend-image .

# DockerイメージをAWS ECRにプッシュする前に、ECRリポジトリを作成する
aws ecr create-repository --repository-name your-repo-name

# ECRリポジトリのURLを取得
aws ecr describe-repositories --repository-names your-repo-name --query 'repositories[0].repositoryUri' --output text

# ECRリポジトリにログイン
aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-ecr-repo-url

# DockerイメージをECRリポジトリにプッシュ
docker tag todo-app-frontend-image:latest your-ecr-repo-url/todo-app-frontend-image:latest
docker push your-ecr-repo-url/todo-app-frontend-image:latest
