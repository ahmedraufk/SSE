import React, {useState} from 'react';
import {Modal,Button} from "react-bootstrap";

function Popup() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                I don't know my polling place
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This link is taking you to https://www.mvp.sos.ga.gov, Georgia's polling place locator.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Ok</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default Popup;