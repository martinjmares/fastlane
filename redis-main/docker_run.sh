docker rm -f fastlane-redis-main || true
docker run -d -p 6379:6379 --name fastlane-redis-main gcr.io/fastlane-mmar/redis-main:v1
