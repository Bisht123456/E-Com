// ConfirmationModal.js

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ConfirmationModal({ show, onHide, onConfirm }) {
  return (
    <Modal
      className="removerfromcart_modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
      <Modal.Footer>
        <Button className="removebut_cart" variant="danger" onClick={onConfirm}>
          Delete
        </Button>
        <Button className="cancelbut_removecart" variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
