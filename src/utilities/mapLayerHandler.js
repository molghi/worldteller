import geojsonData from "../data/50m_countries.json";
import capitalsData from "../data/countryCapitalsQuickInfo.json";
import fetchCountryFacts from "../utilities/fetchCountryFacts";
import getRandomColour from "./getRandomColour";

// ================================================================================================

function mapLayerHandler(L, map, setModalShown, setModalData, setLoader, setCountryClicked) {
    // Create GeoJSON layer
    // const geoJsonLayer =
    L.geoJSON(geojsonData, {
        style: style, // applying the styling function
        onEachFeature: (feature, layer) => {
            layer.on({
                mouseover: async (e) => {
                    // happens on hover
                    layer.setStyle({
                        fillColor: `rgb(125, 134, 142)`,
                        fillOpacity: 1,
                    });
                    const countryName = feature.properties.ADMIN; // Getting it from the geoJSON file  (or feature.properties.NAME)

                    const country = capitalsData.find((country) => {
                        if (countryName === "United States of America") return country.name === "United States";
                        if (countryName === "The Bahamas") return country.name === "Bahamas";
                        if (countryName === "Democratic Republic of the Congo") return country.name === "DR Congo";
                        if (countryName === "United Republic of Tanzania") return country.name === "Tanzania";
                        if (countryName === "Swaziland") return country.name === "Eswatini";
                        if (countryName === "East Timor") return country.name === "Timor-Leste";
                        if (countryName === "Macedonia") return country.name === "North Macedonia";
                        if (countryName === "Republic of Serbia") return country.name === "Serbia";
                        if (countryName === "South Georgia and the Islands") return country.name === "South Georgia";
                        if (countryName === "Saint Helena")
                            return country.name === "Saint Helena, Ascension and Tristan da Cunha";
                        if (countryName === "Cabo Verde") return country.name === "Cape Verde";
                        return country.name === countryName;
                    }); // getting the capital data from the 'capitalsData' file

                    const coords = country?.capitalCoords; // capital coords
                    const popupContent = `<span class='leaflet-popup-content'>
                            ${country?.name || "unidentified"} <span>${country?.flag || ""}</span>
                        <span class="popup-capital">Capital: ${country?.capital || "..."}</span>
                        <span class="text">Click to know more</span>
                        </span>`; // content of the popup

                    layer
                        .bindPopup(popupContent, { closeButton: false, autoPan: false, className: "custom-popup" })
                        .openPopup(coords); // Open popup at 'coords', do not show close btn, do not move the map automatically
                },

                mouseout: (e) => {
                    // on unhover
                    layer.closePopup();
                    layer.setStyle({
                        fillColor: getRandomColour(),
                        fillOpacity: 0.5,
                    });
                },

                click: async (e) => {
                    // on click
                    // console.log("Clicked on:", feature.properties.NAME);
                    setCountryClicked(feature.properties.NAME);
                    layer.unbindPopup(); // Unbind the popup on click, so it doesn't open
                    setLoader(true); // show 'Loading...'
                    const data = await fetchCountryFacts(feature.properties.NAME); // fetch
                    setLoader(false); // hide 'Loading...'
                    setModalShown(true); // modal is shown now
                    setModalData(data); // setting modal content
                },
            });
        },
    }).addTo(map);
}

// ================================================================================================

// Styling helper function to apply to each country
function style(feature) {
    return {
        fillColor: getRandomColour(), // Random colour for each country
        fillOpacity: 0.5,
        weight: 2, // Border width
        opacity: 1,
        color: "black", // Border colour
        dashArray: "1", // Border style
    };
}

// ================================================================================================

export default mapLayerHandler;
