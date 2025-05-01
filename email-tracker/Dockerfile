FROM --platform=linux/arm64 node:22
RUN apt-get update && apt-get -y upgrade

COPY node-canvas-dependencies.txt /node-canvas-dependencies.txt

# Install dependencies for node-canvas library
RUN until xargs -a /node-canvas-dependencies.txt apt-get install -y; do \
    echo "Retrying apt install..."; \
    sleep 2; \
    done

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY src/ /usr/src/app/
RUN npm install --omit=dev
EXPOSE 3000
CMD [ "npm", "run", "start"]