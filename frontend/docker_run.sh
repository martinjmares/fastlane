docker rm -f fastlane-frontend  || true
docker run -d -p 8080:8080 --name fastlane-frontend fastlane/frontend:v1
