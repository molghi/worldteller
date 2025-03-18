import { useContext, useEffect } from "react";
import MyContext from "../context/MyContext";
import Map from "./Map";
import Modal from "./Modal";

function Main() {
    const { modalShown, setModalShown, modalData, setModalData } = useContext(MyContext);
    console.log(modalShown);
    console.log(modalData);
    return (
        <>
            <Map />
            {modalShown && <Modal />}
        </>
    );
}

export default Main;
