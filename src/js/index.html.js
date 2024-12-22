// deno-lint-ignore-file

const redoForm = document.querySelector('form')

const categoryDiv = document.getElementById('category')
const letterDiv = document.getElementById('letter')

window.addEventListener("keydown", event => {
  if(event.key != "Enter") return

  newCategory({ preventDefault: () => {} })
})

async function newCategory(e) {
  e.preventDefault()

  const withLetter = redoForm.querySelector('input[name="withLetter"]').checked
  const preventLastCategory = redoForm.querySelector('input[name="preventLastCategory"]').checked

  let data = {}

  try {
    let httpStatus = null

    const lastCategory = preventLastCategory ? categoryDiv.querySelector('p').innerText : null

    categoryDiv.querySelector('p').innerText = "loading..."

    if (withLetter) {
      letterDiv.querySelector('p').innerText = "loading..."

      const response = await fetch(`/api?withLetter=true`,
        {
          method: 'POST',
          body: JSON.stringify({
            preventCategories: [lastCategory]
          })
        }
      )

      httpStatus = response.status

      data = await response.json()
    } else {
      letterDiv.querySelector('p').innerText = ""

      const response = await fetch(`/api`, {
        method: 'POST',
        body: JSON.stringify({
          preventCategories: [lastCategory]
        })
      })

      httpStatus = response.status

      data = await response.json()
    }

    if(httpStatus != 200 && httpStatus != 304) {
      throw new Error(`${httpStatus}`)
    }

    categoryDiv.querySelector('p').innerText = data.category
    letterDiv.querySelector('p').innerText = data.letter ? data.letter : ''
  } catch (err) {
    console.error(err)

    document.querySelector("body").innerHTML = `
    <div style="margin: 2ch;">
      <h1>An error occured</h1>
      <p>See console for more information</p>
    </div>
    `
  }
}

newCategory({ preventDefault: () => {} })
