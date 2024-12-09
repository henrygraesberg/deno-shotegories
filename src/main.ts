import { serveFile } from "@std/http/file-server"

const httpPort = Number(Deno.env.get("HTTP_PORT")) || 3000

const sendShotegory = async (req: Request): Promise<Response> => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  let categories: Array<string> = []
  
  try {
    categories = (await import("./data/categories.json", {
      with: {
      type: "json"
      }
    })).default as Array<string>
  } catch (err) {
    return Response.json({error: "Internal server error", errorStack: err}, {status: 500})
  }

  const withLetter = new URL(req.url).searchParams.get("withLetter")

  const response = withLetter == "true"
  ?
  {
    category: categories[Math.floor(Math.random() * categories.length)],
    letter: alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  :
  {
    category: categories[Math.floor(Math.random() * categories.length)],
  }
  
  return Response.json(response)
}

Deno.serve({ port: httpPort, hostname: "localhost" }, (req) => {
  const pathname = new URL(req.url).pathname

  if (pathname == "/") {
    return serveFile(req, "./src/views/index.html")
  } 
  if (pathname == "/index_html.js") {
    return serveFile(req, "./src/js/index_html.js")
  }
  if (pathname == "/index_html.css") {
    return serveFile(req, "./src/css/index_html.css")
  }

  if (pathname == "/api") {
    return sendShotegory(req)
  }
  
  return serveFile(req, "./src/views/404.html")
})
