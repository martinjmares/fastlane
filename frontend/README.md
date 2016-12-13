# Frontend usage

## API by examples

### Login

```
curl -H "Content-Type: application/json" -X POST -d '{"username":"bart","password":"simpson"}' http://localhost:8080/login
curl -H "Content-Type: application/json" -H "fastlane-auth: 15392c38-7c44-4be3-b2e9-99aafcbdae51" -X GET http://localhost:8080/login
```