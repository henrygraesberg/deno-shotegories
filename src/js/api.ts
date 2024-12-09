const sendShotegory = async (req: Request): Promise<Response> => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  let categories: Array<string> = []
  
  try {
    categories = (await import("../data/categories.json", {
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

export default sendShotegory