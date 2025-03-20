import "./Modal.css";
import { createPortal } from "react-dom";
import { useContext } from "react";
import MyContext from "../context/MyContext";
import getModalContent from "../utilities/getModalContent";

function Modal() {
    const { modalShown, modalData, setModalShown, setCountryClicked } = useContext(MyContext);

    const content = getModalContent(modalData, setModalShown, setCountryClicked); // getting all modal window content to display

    return modalShown && createPortal(content, document.querySelector(".modal"));
}

export default Modal;
