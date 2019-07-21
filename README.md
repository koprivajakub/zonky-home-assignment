# Build the project

During build use env variable `REACT_APP_BASE_URL` to specify the URL where is running the Zonky API. Or your CORS proxy.

```
yarn install
REACT_APP_BASE_URL=https://api.zonky.cz yarn build
docker build -t zonky-hw ./
```

# Run the project

The application is running on port 80 inside the docker container.

```
docker run -p 80:80 zonky-hw
```

# ENV BUILD VARIABLES

| Variable name | Description | Example |
|---|---|---|
| `REACT_APP_BASE_URL` | Base url of zonky API | `https://api.zonky.cz` OR `http://localhost:3001` |

# Example run command of the build docker image

```
docker run --rm -it --name zonky-hw -p 80:80 zonky-hw
```
