import { createContext, useState } from "react";

const MyContext = createContext();

// ================================================================================================

function Provider({ children }) {
    const [val, setVal] = useState();

    const toExport = { sth: 5 };

    return <MyContext.Provider value={toExport}>{children}</MyContext.Provider>;
}

// ================================================================================================

export default MyContext;
export { Provider };
