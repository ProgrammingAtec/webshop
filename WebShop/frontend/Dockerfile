FROM node:latest

LABEL "project authors"="Alexander Duvanov & Chingiz Egamberdiv"
LABEL "github accounts"="AlexanderDuvanov & ProgrammingAtec"
LABEL "frontend author"="Chingiz Egamberdiev"

WORKDIR /usr/app
COPY package*.json ./
RUN ["/bin/sh", "-c", "npm install -l"]

COPY ./ /usr/app

EXPOSE 4200

CMD ["/usr/app/node_modules/@angular/cli/bin/ng", "serve"]
