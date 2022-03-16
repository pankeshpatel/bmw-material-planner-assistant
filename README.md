## backend

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

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

### File Structure

Within the download you'll find the following directories and files:

```
frontend

┌── .eslintrc.json
├── .gitignore
├── CHANGELOG.md
├── jsconfig.json
├── LICENSE.md
├── package.json
├── README.md
├── public
└── src
	├── __mocks__
	├── components
	├── icons
	├── theme
	├── utils
	└── pages
		├── 404.js
		├── _app.js
		├── _document.js
		├── account.js
		├── customers.js
		├── index.js
		├── login.js
		├── products.js
		├── register.js
		└── settings.js
```
