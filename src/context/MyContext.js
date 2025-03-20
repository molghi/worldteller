import { createContext, useState } from "react";

const MyContext = createContext();

// ================================================================================================

function Provider({ children }) {
    const [modalShown, setModalShown] = useState(false);
    const [modalData, setModalData] = useState();
    const [loader, setLoader] = useState(false);

    const toExport = { modalShown, setModalShown, modalData, setModalData, loader, setLoader };

    return <MyContext.Provider value={toExport}>{children}</MyContext.Provider>;
}

// ================================================================================================

export default MyContext;
export { Provider };
