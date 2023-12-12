FROM node:21

WORKDIR /app
COPY ["package.json","package-lock.json","/app/"]
RUN npm install
RUN npm install -g @angular/cli

COPY . /app
EXPOSE 4200
RUN ng build
CMD ng serve --host 0.0.0.0 --port 4200
