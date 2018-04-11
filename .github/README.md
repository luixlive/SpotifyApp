# Spotify Stats
Simple webapp to see your user's Spotify statistics.

## Production site
https://luixlive-spotify-stats.herokuapp.com/

## Technologies
This project runs in top technologies:
- Back end: [Node JS](https://nodejs.org/en/) + [Express](https://expressjs.com/)
- Front end: [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [Semantic UI React](https://react.semantic-ui.com/introduction)
- plus other support libraries

## Quick Start
You will need to have [Node JS + NPM](https://nodejs.org/en/) in your environment. Or you can use the [version manager](https://github.com/creationix/nvm). Steps:

1. Clone the respository
```
$ git clone https://github.com/luixlive/spotify-stats.git
```
If you don't have git you can also download it manually.

2. Enter into the new folder
```
$ cd spotify-stats
```

3. Install dependencies
```
$ npm i
```
This step will build the project because of a post-install script. In order to run the project you will need the `dist/index.html`, but you can remove the rest of the files.

4. Create the logs file
```
$ mkdir logs && cd logs && touch spotifystats.log
```

5. Run the project in development mode
```
$ npm run dev
```

6. Open localhost:3000<br />
<b>Important:</b> You won't be able to log yourself using OAuth because it is not possible to set Spotify's OAuth callback to get you back to localhost. Also you need some secret environment variables.<br />
But you can "hijack" a valid session from the production site. Just login, and copy/paste the cookies using the developer tools.

## Testing
This project uses:
- [Jest](https://facebook.github.io/jest/)
- [Enzyme](https://github.com/airbnb/enzyme)
- [Nock](https://github.com/node-nock/nock)
- [Supertest](https://github.com/visionmedia/supertest)
- other React/Redux tools

Everything was installed with the dependencies. You just need to run
```
$ npm test
```

## Deployment
This project is being managed in [Heroku](https://www.heroku.com/) by luixlive.

## API
This project uses [Swagger UI](https://swagger.io/swagger-ui/) + [Swagger JSDoc](https://github.com/Surnet/swagger-jsdoc) to document the API. Just go to `localhost:3000/swagger/api-docs/` while project is running.
