/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        primary:"#279B00",
        dark:{
          hard:"0D2436",
          soft:"183B56"
        }
      }
    },
    fontFamily:{
      opensas:["'Poppins'", "sans-serif"],
      robot:["'Roboto'", "sans-serif"]
   
    },
    width:{
      "col-1":"8.33%",
      "col-2":"16.66%",
      "col-3":"25%",
      "col-4":"33.33%",
      "col-5":"41.66%",
      "col-6":"50%",
      "col-7":"58.33%",
      "col-8":"66.66%",
      "col-9":"75%",
      "col-10":"83.33%",
      "col-11":"91.66%",
      "col-12":"100%",
      "special":"100%"
    },
    height:{
      "row-1":"8.33%",
      "row-2":"16.66%",
      "row-3":"25%",
      "row-4":"33.33%",
      "row-5":"41.66%",
      "row-6":"50%",
      "row-7":"58.33%",
      "row-8":"66.66%",
      "row-9":"75%",
      "row-10":"83.33%",
      "row-11":"91.6%",
      "row-12":"100%",
      
    }
      
    

  },
  plugins: [],
  preflight: {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
}

