echo Deploy redis main
kubectl run redis-main --image=gcr.io/fastlane-mmar/redis-main:v1 --port=6379
kubectl get deployments
kubectl get pods
#kubectl logs <pod_name>
kubectl expose deployment redis-main
kubectl get services redis-main

echo Deploy frontend
kubectl run frontend --image=gcr.io/fastlane-mmar/frontend:v1 --port=8080
kubectl get deployments
kubectl get pods
#kubectl logs <pod_name>
kubectl expose deployment frontend --type="LoadBalancer"
kubectl get services redis-main
