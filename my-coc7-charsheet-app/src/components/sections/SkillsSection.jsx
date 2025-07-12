import React from 'react';

const SkillsSection = ({ skills }) => (
  <div className="skills-section">
    <h2>技能</h2>
    <ul>
      {skills.map((skill, index) => (
        <li key={index}>{skill.name}: {skill.value}%</li>
      ))}
    </ul>
  </div>
);

export default SkillsSection;
