# timer

Timer Description to be added...

# Developer Instructions

To run / work on this project first clone this repo (or a fork of the repo) then install the npm dependencies

```bash
    npm install
```

To run the site in a browser build the TS into JS and serve the index.html file to the browser in your preferred method
OR
use the provided script to do this for you
```bash
    npm start
```

This will build the TS into a single JS file using esbuild and serve the site using http-server (usually port :8080, but check your terminal output for the actual port number)

If you don't want to install npm etc. Install VSCode and Docker, open the cloned repository in VSCode and click yes on the popup to open in devcontainer.
After it loads `F5` will open Chrome and serve the project with "watch" mode so you can edit without reloading and "sourcemap" for debugging.