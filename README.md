# Shotegories API
A rewrite of the [Shotegories API](https://github.com/henrygraesberg/Shotegories) using [Deno](https://deno.com/)

An API for getting a random category for a game of categories, and potentially a letter for a game of shotegories\
(Inpired by the drinking game that the [Godfrey Twins](https://www.youtube.com/@godfreytwins) like to play)

## Using the API
### With the public endpoint
The API is hosted on [glitch.com](https://glitch.com), and running on ["https://shotegories.glitch.me/api"](https://shotegories.glitch.me/api)\
From here it can be used the same as if it was running locally, with the query option ```?withLetter=true``` returning an object with a category and letter, and anything else returning only a category. A simple frontend is also hosted on Glitch, at the [root](https://shotegories.glitch.me), which queries the API and displays a category, with the option to include a letter in the response.

**NOTE:** Glitch puts projects to sleep after 5 minutes inactivity, so the first query could take longer, as the server has to start back up upon receiving your request (It also runs ```npm i``` every time it spools up for some reason, so it could take quite a few seconds actually)

### Locally
Once the repository has been cloned, run the commands
```bash
deno install

#then
deno run dev #If you want hot reload
#OR
deno run start #If you are deploying the API and don't need hot reload
```
to install dependencies and start the server. A frontend simply supplying an html file and a request to the api wil run on ```localhost:3000```, while the API will run on ```http://localhost:3000/api``` by default, but this can be changed by adding a ```.env``` file and setting ```HTTP_PORT``` to your desired port. Upon the server starting the port the server is running on will be printed to the console.

The response is an object matching the following TypeScript interface:
```ts
interface ShotegoriesResponse {
  category: string
}
```
if you do not have the query ```withLetter``` set to true, and
```ts
interface ShotegoriesResponse {
  category: string
  letter: string
}
```
if you do

Ergo, a response to a request sent to ```http://localhost:3000/api``` could look like:
```json
{
  "category": "Alcohol brands"
}
```
and a response to a request sent to ```http://localhost:3000/api?withLetter=true``` could look like:
```json
{
  "category": "Alcohol brands",
  "letter": "S"
}
```

## Developing
Follow the first steps of ["Using the API"](#using-the-api) to install dependencies and run the server.\

The project was built with [Deno](https://deno.com/), and you should be able to get far with the [Deno documentation](https://docs.deno.com/)
