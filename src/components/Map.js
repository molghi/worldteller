import "./Map.css";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "../data/50m_countries.json";
import getRandomColour from "../utilities/getRandomColour";
import getCountryFromCoords from "../utilities/getCountryFromCoords";
import fetchCountryFacts from "../utilities/fetchCountryFacts";

// ================================================================================================

function Map() {
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
                layer.on({
                    mouseover: (e) => {
                        const countryName = feature.properties.ADMIN; // Or feature.properties.NAME
                        console.log(countryName); // Log the country name
                        fetchCountryFacts(countryName);
                        // const coords = e.latlng; // Get latitude and longitude
                        // console.log(coords.lat, coords.lng);
                        layer.setStyle({
                            fillColor: `rgb(125, 134, 142)`,
                            fillOpacity: 1,
                        });
                    },
                    mouseout: (e) => {
                        layer.setStyle({
                            fillColor: getRandomColour(),
                            fillOpacity: 0.5,
                        });
                    },
                });
            },
        }).addTo(map);

        map.on("mousemove", function (e) {
            // const coords = e.latlng; // Get latitude and longitude
            // console.log(coords.lat, coords.lng);
        });

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
