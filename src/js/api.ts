interface RequestBody {
  preventCategories?: string[]
}

const rollRandomCategory = (categories: Array<string>, preventedCategories?: string[]): string => {
  let category = categories[Math.floor(Math.random() * categories.length)]

  if (preventedCategories != null && preventedCategories.filter((cat) => cat == category).length != 0) {
    category = rollRandomCategory(categories, preventedCategories)
  }

  return category
}

const sendShotegory = async (req: Request): Promise<Response> => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  let categories: Array<string> = []
  
  try {
    categories = (await import("@/data/categories.json", {
      with: {
      type: "json"
      }
    })).default as Array<string>
  } catch (err) {
    return Response.json({error: "Internal server error", errorStack: err}, {status: 500})
  }

  const withLetter = new URL(req.url).searchParams.get("withLetter") == "true"

  let body: RequestBody | null = null

  try {
    body = await req.json() as RequestBody
  }
  catch {
    body = null
  }

  const response = withLetter ? {
    category: rollRandomCategory(categories, body?.preventCategories),
    letter: alphabet[Math.floor(Math.random() * alphabet.length)]
  } : {
    category: rollRandomCategory(categories, body?.preventCategories),
  }
  
  return Response.json(response)
}

export default sendShotegory
