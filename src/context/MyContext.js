import { createContext, useState } from "react";

const MyContext = createContext();

// ================================================================================================

function Provider({ children }) {
    const [modalShown, setModalShown] = useState(false); // is shown or not?
    const [modalData, setModalData] = useState();
    const [loader, setLoader] = useState(false); // 'Loading...'
    const [countryClicked, setCountryClicked] = useState();

    const toExport = { modalShown, setModalShown, modalData, setModalData, loader, setLoader, countryClicked, setCountryClicked };

    return <MyContext.Provider value={toExport}>{children}</MyContext.Provider>;
}

// ================================================================================================

export default MyContext;
export { Provider };
