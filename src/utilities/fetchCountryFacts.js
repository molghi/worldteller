// import { TimeZoneDBAPIKey, OpenWeatherMapAPIKey } from "../config";

async function fetchCountryFacts(countryName, additionalFetchFlag = true) {
    try {
        if (countryName === "United States of America") countryName = "United States"; // correction

        const name = encodeURIComponent(countryName.toLowerCase());
        const req = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!req.ok) throw new Error("Something failed...");
        const data = await req.json();

        const result = data.find((res) => res.name.common === countryName); // finding one because it can return multiple results
        let dataFiltered;

        if (!result) dataFiltered = "Not found";
        else dataFiltered = filterCountryResponse(result);

        if (!additionalFetchFlag) return dataFiltered; // returning without fetching capital time and weather

        // dataFiltered.capitalLocalTime = await getCapitalTime(dataFiltered.capitalCoords[0], dataFiltered.capitalCoords[1]);
        // dataFiltered.capitalAirTemp = await getCapitalTemp(dataFiltered.capitalCoords[0], dataFiltered.capitalCoords[1]);
        console.log(dataFiltered);
        return dataFiltered;
    } catch (error) {
        console.error(`💥💥💥 Something failed...`, error);
        return {};
    }
}

// ================================================================================================

// helper function of 'fetchCountryFacts'
function filterCountryResponse(result) {
    let nativeName = `${Object.values(result.name.nativeName)[0].common} (${Object.values(result.name.nativeName)[0].official})`;
    if (result.name.common === "Israel")
        nativeName = `${Object.values(result.name.nativeName)[1].common} (${Object.values(result.name.nativeName)[1].official})`;
    return {
        capital: result.capital.join(", "),
        capitalCoords: result.capitalInfo.latlng,
        capitalLocalTime: null,
        capitalAirTemp: null,
        flagIcon: result.flag,
        flagImg: result.flags.png,
        population: result.population,
        galaxy: "Milky Way",
        galaxyGroup: "Local Group",
        galaxyCluster: "Virgo Supercluster",
        galaxySupercluster: "Laniakea Supercluster",
        universe: "Observable Universe",
        system: "Solar System",
        planet: "Terra",
        continent: result.continents.join("-"),
        region: result.region,
        subregion: result.subregion,
        languages: Object.values(result.languages).join(", "),
        nameEnglish: `${result.name.common} (${result.name.official})`,
        nameNative: nativeName,
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

// called in 'fetchCountryFacts'
// async function getCapitalTime(latitude, longitude) {
//     try {
//         const res = await fetch(
//             ` http://api.timezonedb.com/v2.1/get-time-zone?key=${TimeZoneDBAPIKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`
//         );
//         if (!res.ok) throw new Error("Failed fetching capital time");
//         const data = await res.json();
//         return data.formatted;
//     } catch (error) {
//         console.error(`💥💥💥 Something failed while fetching capital time...`, error);
//     }
// }

// ================================================================================================

// called in 'fetchCountryFacts'
// async function getCapitalTemp(latitude, longitude) {
//     try {
//         const res = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OpenWeatherMapAPIKey}&units=metric`
//         );
//         if (!res.ok) throw new Error("Failed fetching capital temp");
//         const data = await res.json();
//         return `${Math.round(data.main.temp)}°C - ${data.weather[0].main}`;
//     } catch (error) {
//         console.error(`💥💥💥 Something failed while fetching capital weather...`, error);
//     }
// }

// ================================================================================================

export default fetchCountryFacts;
