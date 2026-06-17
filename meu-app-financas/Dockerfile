FROM node:18

# Allow Expo devtools to bind to 0.0.0.0 so host can access the dev server
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
ENV EXPO_CLI_NO_UPDATE_NOTIFIER=1

WORKDIR /app

# copy package files first to leverage Docker cache
COPY package.json package-lock.json ./

# install dependencies (keeps node_modules in image so `expo start` uses local binary)RUN npm install

COPY . .

# optional: run project build if a build script exists (no failure if not)
RUN if npm run | grep -q " build"; then npm run build || true; fi

# Expo / Metro ports + backend default port
EXPOSE 19000 19001 19002 3000

# Start Expo and make it listen on all interfaces so you can connect from host
# Pass flags via npm start; extra args after -- are forwarded to the script
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--tunnel", "--non-interactive"]