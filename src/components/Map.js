import "./Map.css";
import { useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "../data/50m_countries.json";
import getRandomColour from "../utilities/getRandomColour";
import getCountryFromCoords from "../utilities/getCountryFromCoords";
import fetchCountryFacts from "../utilities/fetchCountryFacts";

// ================================================================================================

function Map() {
    const { setModalShown, setModalData } = useContext(MyContext);
    const initialCoords = [31.7683, 35.2137];

    useEffect(() => {
        const map = L.map("map", {
            center: initialCoords,
            zoom: 3,
            minZoom: 2, // minimum zoom level allowed
            maxZoom: 5, // maximum zoom level allowed
            zoomControl: true, // enable zoom control
            scrollWheelZoom: "center", // allow mouse wheel zoom (zooms to center)
            dragging: true, // enable dragging
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>',
            noWrap: true, // prevents tiles from wrapping horizontally
        }).addTo(map);

        const bounds = L.latLngBounds([
            [-90, -180],
            [90, 180],
        ]);
        map.setMaxBounds(bounds); // confines the map to valid coordinates, stopping horizontal scrolling

        // Styling function to apply to each country
        const style = (feature) => {
            return {
                fillColor: getRandomColour(), // Random colour for each country
                fillOpacity: 0.5, // Fill opacity
                weight: 2, // Border width
                opacity: 1,
                color: "black", // Border colour
                dashArray: "1", // Border style
            };
        };

        // Create GeoJSON layer
        const geoJsonLayer = L.geoJSON(geojsonData, {
            style: style,
            onEachFeature: (feature, layer) => {
                // let marker;
                layer.on({
                    mouseover: async (e) => {
                        layer.setStyle({
                            fillColor: `rgb(125, 134, 142)`,
                            fillOpacity: 1,
                        });
                        const countryName = feature.properties.ADMIN; // Or feature.properties.NAME
                        console.log(countryName); // Log the country name
                        const info = await fetchCountryFacts(feature.properties.NAME, false);
                        console.log(info);
                        const coords = { lat: info.capitalCoords[0], lng: info.capitalCoords[1] };
                        const popupContent = `<span class='leaflet-popup-content'>
                            ${info.capital}, ${info.nameOnly} <span>${info.flagIcon}</span><span class="text">Click to know more</span>
                        </span>`; // Example content
                        layer.bindPopup(popupContent, { closeButton: false }).openPopup(coords); // Open at cursor position
                    },
                    mouseout: (e) => {
                        layer.closePopup();
                        layer.setStyle({
                            fillColor: getRandomColour(),
                            fillOpacity: 0.5,
                        });
                    },
                    click: async (e) => {
                        console.log("Clicked on:", feature.properties.NAME);
                        layer.unbindPopup(); // Unbind the popup on click, so it won't open
                        const data = await fetchCountryFacts(feature.properties.NAME);
                        setModalShown(true);
                        setModalData(data);
                    },
                });
            },
        }).addTo(map);

        return () => {
            map.remove(); // Clean up on unmount
        };
    }, []);

    return (
        <div className="map-box">
            <h1 title="Geographical, historical and cultural facts about countries">Worldteller</h1>
            <div id="map"></div>
        </div>
    );
}

// ================================================================================================

export default Map;

/* 
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>',
}).addTo(map);

L.tileLayer("https://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://stamen.com/">Stamen Design</a>',
        }).addTo(map);
*/
