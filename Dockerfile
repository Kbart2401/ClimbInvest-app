# FROM node:12-alpine

# WORKDIR /frontend
# COPY frontend/. .

# ENV REACT_APP_BASE_URL=https://climbinvest.herokuapp.com/

# RUN npm install --production
# RUN npm run build

# ENV NODE_ENV=production

# WORKDIR /backend
# COPY backend/. .

# COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install --production

# COPY . .

# CMD ["npm", "start"]