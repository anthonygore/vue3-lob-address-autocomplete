import {ref} from "vue";

export default function () {
  const suggestions = ref([])
  async function getSuggestions() {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        "address_prefix": '5 sugg'
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('test_pub_9a5604627e4b263421579519c905160:')
      })
    }
    try {
      const res = await fetch('https://api.lob.com/v1/us_autocompletions', config)
      const data = await res.json()
      suggestions.value = data.suggestions.map((suggestion, index) => ({
        id: index,
        data: suggestion,
        name: [suggestion.primary_line, suggestion.city, suggestion.state, suggestion.zip_code].join(' ')
      }))
    } catch (err) {
      console.log(err)
    }
  }
  return {
    suggestions, getSuggestions
  }
}
