import React from 'react';

const SkillsSection = ({ skills }) => {
  // 仮のカテゴリ分け（実際にはdataParserでパースされるべき）
  const categorizedSkills = {
    '器術': [],
    '体術': [],
    '忍術': [],
    '謀術': [],
    '戦術': [],
    '妖術': [],
    'その他': [],
  };

  skills.forEach(skill => {
    // ここでスキル名に基づいてカテゴリを割り当てるロジックを実装
    // 現状は仮で「その他」に分類
    categorizedSkills['その他'].push(skill);
  });

  return (
    <div className="skills-section">
      <h2>技能</h2>
      <div className="skills-grid">
        {Object.entries(categorizedSkills).map(([category, skillList]) => (
          skillList.length > 0 && (
            <div key={category} className="skill-category">
              <h3>{category}</h3>
              <ul>
                {skillList.map((skill, index) => (
                  <li key={index}><span>{skill.name}</span>: <span>{skill.value}%</span></li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;

export default SkillsSection;
