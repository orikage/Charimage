import React from 'react';

const EquipmentSection = ({ equipment }) => (
  <div className="equipment-section">
    <h2>所持品</h2>
    <p>{equipment}</p>
  </div>
);

export default EquipmentSection;