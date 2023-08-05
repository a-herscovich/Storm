import React, { useState, useEffect, useRef } from "react";
import "./ProductInfoModal.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ProductInfoModal = ({ product, show, handleClose }) => {
  const [width, setWidth] = useState(0);
  const screenWidth = useRef(window.innerWidth);

  useEffect(() => {
    setWidth(screenWidth.current)
  }, [screenWidth])

  return (
    // Bootstrap styling for modal - modal is centered for desktop and fullScreen for mobile
    <Modal
      centered={width > 390}
      fullscreen={width <= 390}
      className="modal"
      show={show}
      onHide={handleClose}
    >
      {/* Display logo and title in mobile header for fullScreen mobile */}
      <div className="modalLogoAndMenu">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1>STORM</h1>
        </div>
        <div className="mobileMenu">
          <i class="bi bi-list fs-3"></i>
        </div>
      </div>

      {/* header displays the name of the selected product from props */}
      <div className="modalHeader">
        <span className="productName">{product}</span>
        {/* Modal can be closed by clicking top right "x" button or Button component */}
        <i className="bi bi-x fs-3" onClick={() => handleClose()}></i>
      </div>
      {/* static image per Figma */}
      <div className="imageAndDescription">
        <div className="productImage">
          <img src="/productImage.png" alt="product" />
        </div>
        {/* static information per Figma */}
        <div className="info">
          <span>Key Features</span>
          <ul>
            <li>2.6 Ghz Intel Core i7 6-Core (9th Gen)</li>
            <li>16GB of 2666 MHz DDR4 RAM | 8TB SSD</li>
            <li>16" 3072 x 1920 Retina Display</li>
            <li>AMD Radeon Pro 5600M GPU (8GB HBM2)</li>
          </ul>
          <p>
            The Apple 16" MacBook Pro features a 16" Retina Display, a Magic
            Keyboard with a redesigned scissor mechanism, a six-speaker
            high-fidelity sound system, and an advanced thermal design. This
            MacBook Pro also features an AMD Radeon Pro 5600M graphics card, a
            7nm mobile discrete GPU designed for pro users. With 8GB of HBM2
          </p>
        </div>
      </div>
      <Button className="closeButton" onClick={() => handleClose()}>
        Close
      </Button>
    </Modal>
  );
};

export default ProductInfoModal;
