import { TimeZoneDBAPIKey, OpenWeatherMapAPIKey } from "../config";

async function fetchCountryFacts(countryName) {
    try {
        if (countryName === "United States of America") countryName = "United States"; // correction

        const name = encodeURIComponent(countryName.toLowerCase());
        const req = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!req.ok) throw new Error("Something failed...");
        const data = await req.json();

        // console.log(data);
        const result = data.find((res) => res.name.common === countryName);
        // console.log(result);
        let dataFiltered;
        if (!result) dataFiltered = "Not found";
        else dataFiltered = filterCountryResponse(result);
        dataFiltered.capitalLocalTime = await getCapitalTime(dataFiltered.capitalCoords[0], dataFiltered.capitalCoords[1]);
        dataFiltered.capitalAirTemp = await getCapitalTemp(dataFiltered.capitalCoords[0], dataFiltered.capitalCoords[1]);
        console.log(dataFiltered);
    } catch (error) {
        console.log(error);
    }
}

// ================================================================================================

// helper function of 'fetchCountryFacts'
function filterCountryResponse(result) {
    return {
        capital: result.capital.join(", "),
        capitalCoords: result.capitalInfo.latlng,
        capitalLocalTime: null,
        capitalAirTemp: null,
        flagIcon: result.flag,
        flagImg: result.flags.png,
        population: result.population,
        locationStart: "Milky Way, Solar System, Planet Terra,",
        continent: result.continents.join("-"),
        region: result.region,
        subregion: result.subregion,
        languages: Object.values(result.languages).join(", "),
        nameEnglish: `${result.name.common} or ${result.name.official}`,
        nameNative: `${Object.values(result.name.nativeName)[0].common} or ${Object.values(result.name.nativeName)[0].official}`,
        nameOnly: result.name.common,
        currencies: Object.values(result.currencies)
            .map((x) => x.name)
            .join(", "),
        countryCodes: `${result.cca2}, ${result.cca3}, ${result.ccn3}`,
        borders: `${result?.borders?.length} ${result?.borders?.length === 1 ? "country" : "countries"}`,
        area: result.area,
    };
}

// ================================================================================================

async function getCapitalTime(latitude, longitude) {
    try {
        const res = await fetch(
            ` http://api.timezonedb.com/v2.1/get-time-zone?key=${TimeZoneDBAPIKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
        );
        if (!res.ok) throw new Error("Failed fetching capital time");
        const data = await res.json();
        return data.formatted;
    } catch (error) {
        console.log(error);
    }
}

// ================================================================================================

async function getCapitalTemp(latitude, longitude) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OpenWeatherMapAPIKey}&units=metric`
        );
        if (!res.ok) throw new Error("Failed fetching capital temp");
        const data = await res.json();
        return `${Math.round(data.main.temp)}°C - ${data.weather[0].main}`;
    } catch (error) {
        console.log(error);
    }
}

// ================================================================================================

export default fetchCountryFacts;
