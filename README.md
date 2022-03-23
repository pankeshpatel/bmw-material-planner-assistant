## backend

### to install dependences

```
pip install -r requirements.txt
```


```
cd backend
uvicorn main:app --reload
```

mysql docker

```
docker run --name mysqldb --platform linux/x86_64 -e MYSQL_DATABASE=admin -e MYSQL_ROOT_PASSWORD=admin -p 3306:3306 mysql:latest
```

API Server
```
http://localhost:8000/docs

```

## frontend

```
cd frontend

```

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

### frontend deployment to EC2

[Guide](https://medium.com/today-i-solved/how-to-deploy-next-js-on-aws-ec2-with-ssl-https-7980ec6fe8d3)


