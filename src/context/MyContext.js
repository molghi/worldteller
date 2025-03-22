import { createContext, useState, useRef } from "react";
import capitalsInfo from "../data/countryCapitalsQuickInfo.json";
import highlightCountry from "../utilities/highlightCountry";

const MyContext = createContext();

// ================================================================================================

function Provider({ children }) {
    const [modalShown, setModalShown] = useState(false); // is shown or not?
    const [modalData, setModalData] = useState();
    const [loader, setLoader] = useState(false); // 'Loading...'
    const [countryClicked, setCountryClicked] = useState();
    const [search, setSearch] = useState(); // Find a country
    const [searchBox, setSearchBox] = useState(false); // is the search input shown or not?
    const [searchError, setSearchError] = useState("");
    const layersRef = useRef({});

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const submittedCountryName = [...e.target.elements].find((x) => x.tagName === "INPUT").value.trim(); // 'e' is form; happens on form submit
        const quickInfo = capitalsInfo.find((x) => x.name.toLowerCase() === submittedCountryName.toLowerCase());
        if (!quickInfo) {
            console.error(`Country not found.`);
            setSearchError("Country not found. Perhaps there’s a spelling mistake.");
            return;
        }
        setSearchError("");
        setModalShown(false);
        setCountryClicked("");
        const countryName = quickInfo.name;
        setSearch("");
        highlightCountry(layersRef, countryName, quickInfo, setSearchError);
    };

    const toggleSearchForm = (e) => {
        const opposite = !searchBox;
        setSearchBox(opposite);
        setSearchError("");
        setSearch("");
    };

    const toExport = {
        modalShown,
        setModalShown,
        modalData,
        setModalData,
        loader,
        setLoader,
        countryClicked,
        setCountryClicked,
        search,
        setSearch,
        searchBox,
        setSearchBox,
        handleSearchSubmit,
        toggleSearchForm,
        layersRef,
        searchError,
        setSearchError,
    };

    return <MyContext.Provider value={toExport}>{children}</MyContext.Provider>;
}

// ================================================================================================

export default MyContext;
export { Provider };
