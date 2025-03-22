import getRandomColour from "./getRandomColour";

function highlightCountry(layers, countryName, quickInfo, setSearchError) {
    const allLayerClasses = Object.values(layers.current);
    const highlightedOnes = allLayerClasses.filter((x) => x.options.fillOpacity === 1); // only the highlighted layers
    if (highlightedOnes && highlightedOnes.length > 0)
        highlightedOnes.forEach((layer) => {
            layer.closePopup();
            layer.setStyle({
                fillColor: getRandomColour(),
                fillOpacity: 0.5,
            }); // de-highlighting and removing popup first (if any)
        });

    if (countryName === "United States") countryName = "United States of America"; // correction
    const neededLayer = layers.current[countryName]; // finding the needed layer

    if (!neededLayer) {
        console.error(`Layer not found.`);
        return setSearchError("Unfortunately not found");
    }

    neededLayer.setStyle({
        fillColor: `rgb(125, 134, 142)`,
        fillOpacity: 1,
    }); // highlighting it

    const popupContent = `<span class='leaflet-popup-content'>
                            ${quickInfo?.name || "unidentified"} <span>${quickInfo?.flag || ""}</span>
                        <span class="popup-capital">Capital: ${quickInfo?.capital || "..."}</span>
                        <span class="text">Click to know more</span>
                        </span>`;
    neededLayer.bindPopup(popupContent, { closeButton: false, className: "custom-popup" }).openPopup(quickInfo.capitalCoords); // showing the country-capital popup
}

export default highlightCountry;
