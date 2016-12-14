docker build \
--build-arg http_proxy=$http_proxy \
--build-arg https_proxy=$https_proxy \
-t gcr.io/fastlane-mmar/frontend:v1 .
