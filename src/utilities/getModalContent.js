import { formatDateTime, formatPopulation, formatArea } from "../utilities/formatters";
import data from "../data/worldteller-countries-data-1-part-1.json";
import data2 from "../data/worldteller-countries-data-1-fragment.json";

// ================================================================================================

function getModalContent(modalData, setModalShown, setCountryClicked) {
    const hasAdditionalInfo = data.map((x) => x.country).includes(modalData.nameOnly);
    const additionalData = data.find((x) => x.country === modalData.nameOnly);

    const hasAdditionalInfo2 = data2.map((x) => x.country).includes(modalData.nameOnly);
    const additionalData2 = data2.find((x) => x.country === modalData.nameOnly);

    const closeModal = (e) => {
        if (e.target.classList.contains("modal-wrapper") || e.target.classList.contains("modal-close")) {
            setModalShown(false);
            setCountryClicked(""); // manipulating document title
        }
    };

    // =======================================================================

    // FORMING MORE SIZEABLE INFORMATION
    const additionalContent2 = !hasAdditionalInfo2 ? (
        ""
    ) : (
        <div className="modal-long-info">
            <div className="modal-row modal-row--big">
                <span>Notable Figures: </span>
                <span>
                    {additionalData2.notableFigures.split(/\\n/).map((text, index) => (
                        // regex in 'split' because \n in my JSON data was stored as a literal string ("\\n"), not an actual newline character
                        <span key={index}>
                            {text}
                            <br />
                            <br />
                        </span>
                    ))}
                </span>
            </div>
            <div className="modal-row modal-row--big">
                <span>Culture Note: </span>
                <span>
                    {additionalData2.culture.split(/\\n/).map((text, index) => (
                        <span key={index}>
                            {text}
                            <br />
                            <br />
                        </span>
                    ))}
                </span>
            </div>
            <div className="modal-row modal-row--big">
                <span>Weather and Climate: </span>
                <span>
                    {additionalData2.weatherClimate.split(/\\n/).map((text, index) => (
                        <span key={index}>
                            {text}
                            <br />
                            <br />
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );

    // =======================================================================

    // FORMING LESS SIZEABLE INFORMATION
    const additionalContent = !hasAdditionalInfo ? (
        ""
    ) : (
        <>
            <div className="modal-row">
                <span>Language Family: </span>
                <span>{additionalData.languageFamily}</span>
            </div>
            <div className="modal-row">
                <span>Languages Spoken: </span>
                <span>{additionalData.languagesSpoken}</span>
            </div>
            <div className="modal-row">
                <span>Religions Practised: </span>
                <span>{additionalData.religion}</span>
            </div>
            <div className="modal-row modal-row--ethnic">
                <span>Ethnic Groups: </span>
                <span>{additionalData.ethnicGroups}</span>
            </div>
            <div className="modal-row modal-row--possessions">
                <span>Former Possessions: </span>
                <span>{additionalData.formerPossessions}</span>
            </div>
            <div className="modal-row">
                <span title="Date of foundation of the current version of the country">Founding Date: </span>
                <span>{additionalData.foundingDate}</span>
            </div>
            <div className="modal-row modal-row--names">
                <span title="Country names in the past">Historical Names: </span>
                <span>{additionalData.historicalNames}</span>
            </div>
            <div className="modal-row">
                <span title="Country capitals in the past">Historical Capitals: </span>
                <span>{additionalData.historicalCapitals}</span>
            </div>
            <div className="modal-row">
                <span title="Area in the past">Historical Area: </span>
                <span>{additionalData.historicalArea}</span>
            </div>
            <div className="modal-row">
                <span title="Population in the past">Historical Population: </span>
                <span>{additionalData.historicalPopulation}</span>
            </div>
        </>
    );

    // =======================================================================

    // CONTENT TO RETURN
    const content = (
        <div onClick={closeModal} className="modal-wrapper">
            <div className="modal-window">
                <button onClick={closeModal} className="modal-close">
                    close
                </button>

                <div className="modal-title">
                    <span>{modalData.nameOnly}</span>
                    <span>{modalData.flagIcon}</span>
                </div>

                <div className="modal-row">
                    <span>{modalData.languages === "English" ? "Country name: " : "Country name in English: "}</span>
                    <span title="Common and Official">{modalData.nameEnglish}</span>
                </div>

                {modalData.languages !== "English" && (
                    <div className="modal-row">
                        <span>Country name in native language: </span>
                        <span title="Common and Official">{modalData.nameNative}</span>
                    </div>
                )}

                <div className="modal-row modal-location-wrapper">
                    <span>Location: </span>
                    <span className="modal-location">
                        <span title="All matter and energy observable for now">{modalData.universe}</span> →&nbsp;
                        <span title="Massive supercluster of galaxy groups">{modalData.galaxySupercluster}</span> →&nbsp;
                        <span title="Cluster of galaxy groups">{modalData.galaxyCluster}</span> →&nbsp;
                        <span title="Group of nearby galaxies">{modalData.galaxyGroup}</span> →&nbsp;
                        <span title="Our galaxy">{modalData.galaxy}</span> →&nbsp;
                        <span title="Sun and its orbiting bodies">{modalData.system}</span> →&nbsp;
                        <span title="Planet">{modalData.planet}</span> →&nbsp;
                        <span title="Continent">{modalData.continent}</span> →&nbsp;
                        <span title="Region">{modalData.region}</span> →&nbsp;
                        <span title="Subregion">{modalData.subregion}</span> →&nbsp;
                        <span title="Country">{modalData.nameOnly}</span>
                    </span>
                </div>

                <div className="modal-bigger-row">
                    <div className="modal-row">
                        <span>Capital: </span>
                        <span>{modalData.capital}</span>
                    </div>
                    <div className="modal-row">
                        <span>Capital Date-Time: </span>
                        <span>{formatDateTime(modalData.capitalLocalTime)}</span>
                    </div>
                    <div className="modal-row">
                        <span>Capital Weather: </span>
                        <span>{modalData.capitalAirTemp}</span>
                    </div>
                </div>

                <div className="modal-bigger-row">
                    <div className="modal-row">
                        <span>Population: </span>
                        <span>{formatPopulation(modalData.population)}</span>
                    </div>
                    <div className="modal-row">
                        <span>Area: </span>
                        <span>{formatArea(modalData.area)}</span>
                    </div>
                    <div className="modal-row">
                        <span>Borders: </span>
                        <span>{modalData.borders.includes("undefined") ? "no countries" : modalData.borders}</span>
                    </div>
                    <div className="modal-row">
                        <span>Country Codes: </span>
                        <span>{modalData.countryCodes}</span>
                    </div>
                </div>

                <div className="modal-row">
                    <span>Currencies: </span>
                    <span>{modalData.currencies}</span>
                </div>
                <div className="modal-row">
                    <span>Official Languages: </span>
                    <span>{modalData.languages}</span>
                </div>

                {additionalContent}
                {additionalContent2}
            </div>
        </div>
    );

    return content;
}

// ================================================================================================

export default getModalContent;
