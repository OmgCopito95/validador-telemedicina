################################################################################
################################################################################

FROM node:22-alpine AS node-local

WORKDIR /workdir

EXPOSE 5173

CMD ["npm", "run", "dev"]

################################################################################
################################################################################

FROM node:22-alpine AS node-dev-builder

WORKDIR /workdir

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

################################################################################

FROM nginx:alpine AS nginx-desa

WORKDIR /usr/share/nginx/html

COPY --from=node-dev-builder --chown=nginx:nginx --chmod=400 /workdir/dist/ .

RUN chmod u+X -R .

################################################################################
################################################################################

FROM node:22-alpine AS node-nodev-builder

WORKDIR /workdir

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

################################################################################

FROM nginx:alpine AS nginx-prod

WORKDIR /usr/share/nginx/html

COPY --from=node-dev-builder --chown=nginx:nginx --chmod=400 /workdir/dist/ .

RUN chmod u+X -R .

################################################################################
################################################################################
