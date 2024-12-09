import { serveFile } from "@std/http/file-server"
import apiHandler from "./js/api.ts"

const httpPort = Number(Deno.env.get("HTTP_PORT")) || 3000

Deno.serve({ port: httpPort, hostname: "localhost" }, (req) => {
  const pathname = new URL(req.url).pathname

  if (pathname == "/") {
    return serveFile(req, "./src/views/index.html")
  } 
  if (pathname == "/index.html.js") {
    return serveFile(req, "./src/js/index.html.js")
  }
  if (pathname == "/index.html.css") {
    return serveFile(req, "./src/css/index.html.css")
  }

  if (pathname == "/api") {
    return apiHandler(req)
  }
  
  return serveFile(req, "./src/views/404.html")
})
