export default function () {
  async function getSuggestions(val) {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        "address_prefix": import.meta.env.PROD ? val : '5 sugg'
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_LOB_API_KEY}:`)
      })
    }
    try {
      const res = await fetch('https://api.lob.com/v1/us_autocompletions', config)
      const data = await res.json()
      return data.suggestions.map((suggestion, index) => ({
        id: index,
        data: suggestion,
        name: [suggestion.primary_line, suggestion.city, suggestion.state, suggestion.zip_code].join(' ')
      }))
    } catch (err) {
      console.log(err)
    }
  }
  return {
    getSuggestions
  }
}
