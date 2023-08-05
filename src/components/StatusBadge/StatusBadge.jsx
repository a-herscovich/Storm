import React from "react";
import "./StatusBadge.scss";

// Takes label and variant props.
// Variant options (type string) change colour of the badge.
// Options: default (violet), active (green), warning (yellow), error (red).
const StatusBadge = ({ label, variant = "default" }) => {
  return (
    <div className={`status ${variant}`}>
      <span>{label}</span>
    </div>
  );
};

export default StatusBadge;
