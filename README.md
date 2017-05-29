# krkbars
Exercise project that will allow viewing bars and pubs near Main Square in Krakow

# How to start
First you need Google Places API key stored as environmental variable `GOOGLE_API_KEY`

Build a client 
 ```
krkbars/client> npm install
krkbars/client> npm run build
 ```
Run server (build client is required)
```
krkbars/client> npm install
krkbars/client> npm start
```
Open in browser [http://localhost:3003](http://localhost:3003)

Alternatively you can just push app to heroku it should work out of the box

# Testing
There are two kind of tests
 * `npm run test` - will run unit tests that test rest api with supertest
 * `npm run test:services` - will run test against Google API which require `GOOGLE_API_KEY` and will only work as a suite because test are dependant on each other

# REST API 
 * `GET /bars` - list bars near the Main Square in Krakow
 * `GET /bars/:id` - fetch a single bar
 * `GET /photos/:photo_reference` - redirects photo reference to image on google servers
 
