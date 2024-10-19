// import React from "react";
// import "./Model.css";

// const Modal = ({ show, handleClose, title, message }) => {
//   return (
//     <div className={`modal ${show ? "show" : ""}`}>
//       <div className="modal-content">
//         <span className="close" onClick={handleClose}>
//           &times;
//         </span>
//         <h2>{title}</h2>
//         <p>{message}</p>
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from 'react';
import './Model.css';

const Modal = ({ show, handleClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

