import React from 'react';

const AttributesSection = ({ attributes }) => (
  <div className="attributes-section">
    <h2>能力値</h2>
    <ul>
      {Object.entries(attributes).map(([key, value]) => (
        <li key={key}>{key}: {value}</li>
      ))}
    </ul>
  </div>
);

export default AttributesSection;
