import countries from "world-countries"

//@ts-ignore
const formatedCountreis = countries.map((country) => ({
    label: country.name.common,
    value: country.cca2,
    flag: country.flag,
    lalng: country.latlng,
    region: country.region

    }))

const useCountries=()=>{
    const getAll=()=>formatedCountreis

const getValues=(value:string)=>{
          // @ts-ignore

    return formatedCountreis.filter((country)=>country.value===value)
}
return {
    getAll,
    getValues
}
}
export default useCountries