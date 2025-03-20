import { useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import Map from "./Map";
import Modal from "./Modal";

function Main() {
    const { modalShown, setModalShown, modalData, setModalData, loader, setLoader } = useContext(MyContext);

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
