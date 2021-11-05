<template>
  <v-app>
    <v-container
    style="margin-top: 350px;">
      <v-row>
        <v-col cols="10" md="12" lg="9" xl="5" class="bg--light mx-auto">
          <div class="converter">
          <h1 class="text-center mb-6">Currency Converter</h1>
          </div>
          <v-row justify="space-between" no-gutters>
            <v-col cols="12" md="5">
              <v-row no-gutters>
                <v-col class="px-1" cols="3">
                  <v-select @change="convert" v-model="selected[0]" :items="countries" label="I have"></v-select>
                </v-col>

                <v-col class="px-1" cols="9">
                  <v-text-field @input="convert" v-model="inputed" :rules="[rules.onlyNumbers]"></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="5">
              <v-row no-gutters>
                <v-col class="px-1" cols="9">
                  <v-text-field v-model="result" type="number" readonly></v-text-field>
                </v-col>

                <v-col class="px-1" cols="3">
                  <v-select @change="convert" v-model="selected[1]" :items="countries" label="I will get"></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

const axios = require('axios').default;

export default {

  name: 'App',

  data() {
    return {
      valutes: {},
      selected: ['UAH', 'USD'],
      inputed: "",
      result: null,
      countries: ['UAH'],
      rules: {
        onlyNumbers: (value) => {
          const pattern = /^\d+$/.test(value);

          if (!pattern) this.inputed = this.inputed.replace(/\D/g, '');

          return true;
        }
      }
    }
  },

  methods: {
    convert() {
      let defaultValute = {
        Value: 1,
        Nominal: 1
      };

  
      let oneValute = this.valutes[this.selected[0]] ?? defaultValute,
          oneValuteValue = oneValute.Value * Number(this.inputed),
          oneValuteNominal = oneValute.Nominal;

    
      let secValute = this.valutes[this.selected[1]] ?? defaultValute,
          secValuteValue = secValute.Value,
          secValuteNominal = secValute.Nominal;

      
      let result = (oneValuteValue / oneValuteNominal) / (secValuteValue / secValuteNominal);

      // Rounding
      this.result = result ? Math.floor(result * 10000) / 10000 : null;
    }
  },

  mounted() {
    
    axios
      .get('https://www.cbr-xml-daily.ru/daily_json.js')
      .then(response => {
        this.valutes = response.data.Valute;
        
        for (let code in response.data.Valute) {
          this.countries.push(code)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
};

</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

#app {
	background: linear-gradient(-45deg, #e44110, #106c8d, #076e56);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}

.bg--light {
  background: #fcfcfc;
}
.v-application .mx-auto {
    margin-right: auto !important;
    margin-left: auto !important;
    border-radius: 25px;
}

.exchange {
  max-width: 100px;
}

</style>