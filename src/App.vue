<template>
  <form class="form">
    <h3>Vue 3 Autocomplete Form</h3>
    <div class="fields">
      <div class="field">
        <label for="address">Address</label>
        <Autocomplete
            id="address"
            :results="suggestions"
            @input="onAddressInput"
            @onSelect="selected"
            :debounce="1000"
            ref="address"
        />
      </div>
      <div class="field">
        <label for="city">City</label>
        <div>
          <input type="text" name="city" id="city" v-model="city" />
        </div>
      </div>
      <div class="field">
        <label for="state">State</label>
        <div>
          <input type="text" name="state" id="state" v-model="state" />
        </div>
      </div>
      <div class="field">
        <label for="zip">Zip</label>
        <div>
          <input type="text" id="zip" name="city" v-model="zip" />
        </div>
      </div>
    </div>
    <input id="submit" class="submit" type="submit" value="Submit" />
  </form>
</template>

<script>
import { ref } from "vue";
import Autocomplete from 'vue3-autocomplete'
import useAddressSuggestions from "./useAddressSuggestions";
export default {
  name: "App",
  components: {
    Autocomplete
  },
  setup () {
    const address = ref()
    const city = ref()
    const state = ref()
    const zip = ref()
    const suggestions = ref([])
    function selected(suggestion) {
      address.value.setText(suggestion.data.primary_line)
      city.value = suggestion.data.city
      state.value = suggestion.data.state
      zip.value = suggestion.data.zip_code
      suggestions.value = []
    }
    const { getSuggestions } = useAddressSuggestions()
    async function onAddressInput (val) {
      suggestions.value = await getSuggestions(val)
    }
    return {
      address,
      city,
      state,
      zip,
      selected,
      onAddressInput,
      suggestions,
      getSuggestions
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  align-content: center;
  justify-content: center;
}

h3 {
  margin-bottom: 16px;
  font-size: 1.17em;
  font-weight: bold;
}

.form {
  background-color: #42b983;
  border-radius: 4px;
  box-shadow: 0 7px 14px rgb(50 50 93 / 10%), 0 3px 6px rgb(0 0 0 / 8%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.submit {
  margin-top: 12px;
  background-color: #0099d7;
  border-style: none;
  border-radius: 4px;
  color: white;
  padding: 8px 12px;
  text-transform: uppercase;
  transition: background-color 0.2s;
  font-weight: bold;
  &:hover {
    background-color: darken(#0099d7, 5%)
  }

}

.field {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
}

label {
  margin-right: 20px;
}

input {
  padding: 5px 10px;
  min-width: 200px;
  border-radius: 3px;
  border-width: 0;
}

.vue3-autocomplete-container {
  display: flex;
  flex-direction: column;
  position: relative;

  .vue3-results-container {
    position: absolute;
    top: 36px;
    border: 1px solid #35495E;
    border-radius: 4px;
    z-index: 99;
    font-size: 85%;
  }

  .vue3-results-item {
    list-style-type: none;
    padding: 5px 10px;
    border-bottom: 1px solid #eeeeee;
    background-color: white;
    transition: background-color 0.2s;

    &:hover {
      cursor: pointer;
      background-color: #eeeeee;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:nth-last-child(1) {
      border-bottom: none;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
