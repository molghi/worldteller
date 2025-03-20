import { useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import Map from "./Map";
import Modal from "./Modal";
import "./loading.css";

function Main() {
    const { modalShown, loader, countryClicked } = useContext(MyContext);

    useEffect(() => {
        if (countryClicked && countryClicked !== "") document.title = document.title + ` − ${countryClicked}`; // changing document title
        if (countryClicked === "") document.title = document.title.split(" ")[0]; // changing document title
    }, [countryClicked]);

    return (
        <>
            <Map />
            {modalShown && <Modal />}
            {loader && (
                <div className="loader-box">
                    <div className="loader"></div>
                </div>
            )}
        </>
    );
}

export default Main;
