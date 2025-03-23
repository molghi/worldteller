import "./Map.css";
import { useEffect, useContext } from "react";
import MyContext from "../context/MyContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapLayerHandler from "../utilities/mapLayerHandler";
import { ReactComponent as SearchIcon } from "../images/magnifying-glass.svg";

// ================================================================================================

function Map() {
    const {
        setModalShown,
        setModalData,
        setLoader,
        setCountryClicked,
        searchBox,
        setSearchBox,
        handleSearchSubmit,
        search,
        setSearch,
        toggleSearchForm,
        layersRef,
        searchError,
    } = useContext(MyContext);

    useEffect(() => {
        const map = L.map("map", {
            center: [31.7683, 35.2137], // Yerushalayim
            zoom: 3, // initial zoom level
            minZoom: 2, // minimum zoom level allowed
            maxZoom: 5, // maximum zoom level allowed
            zoomControl: true, // enable zoom control?
            scrollWheelZoom: "center", // allow mouse wheel zoom (zooms to center)
            dragging: true, // enable dragging
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>', // setting the general style of the map (tiles style)
            noWrap: true, // prevents tiles from wrapping horizontally
        }).addTo(map);

        const bounds = L.latLngBounds([
            [-90, -180],
            [90, 180],
        ]);
        map.setMaxBounds(bounds); // confines the map to valid coordinates, stopping horizontal scrolling (map doesn't repeat horizontally)

        mapLayerHandler(L, map, setModalShown, setModalData, setLoader, setCountryClicked, layersRef, setSearchBox); // handling the styling of each country, and actions on hover, unhover and click

        return () => {
            map.remove(); // clean up on component unmount
        };
    }, [setLoader, setModalData, setModalShown, setCountryClicked, layersRef, setSearchBox]);

    return (
        <div className="map-box">
            <button onClick={toggleSearchForm} className="map-search" title="Find a country">
                <SearchIcon />
            </button>
            <h1 title="Geographical, historical and cultural facts about countries">Worldteller</h1>
            {searchBox && (
                <form onSubmit={handleSearchSubmit} className="map-form">
                    <input
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        setLayer
                        className="map-search-input"
                        placeholder="Type and press Enter"
                    />
                    {searchError && <span className="map-search-error">{searchError}</span>}
                </form>
            )}
            <div id="map"></div>
        </div>
    );
}

// ================================================================================================

export default Map;

/* 
TILES STYLES

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
