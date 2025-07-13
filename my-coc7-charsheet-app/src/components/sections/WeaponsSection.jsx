import React from 'react';

const WeaponsSection = ({ weapons }) => (
  <div className="weapons-section">
    <h2>武器</h2>
    <ul>
      {weapons.map((weapon, index) => (
        <li key={index}><span>{weapon.name}</span> (<span>{weapon.damage}</span>)</li>
      ))}
    </ul>
  </div>
);

export default WeaponsSection;