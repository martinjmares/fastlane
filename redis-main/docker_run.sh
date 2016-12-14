docker rm -f fastlane-redis-main || true
docker run -d -p 6379:6379 --name fastlane-redis-main fastlane/redis-main:v1
