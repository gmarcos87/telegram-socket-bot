# telegram-sockets-bot

Bot para Telegram que interactua con una API de terceros y además publica los resultados de forma en real-time (WebSockets)
Está pensado para poder funcionar en un solo dyno de Heroku.

## Config ##

Solo es necesario obtener un token de bot de Telegram y agregarlo en el archivo `server.js`. El bot tiene que tener la propiedad de `change inline feedback` como `Enabled`

## Build & development

`npm install` para instalar las dependencias del servidor, en caso de querer modificar la web es neceasario instalar las dependencias de bower `bower install`


## Testing

:) Algún día...
