/**
 * CoC7版キャラクターシートのテキストを解析し、構造化されたJavaScriptオブジェクトに変換します。
 * @param {string} text - キャラクターシートのテキスト。
 * @returns {object} - 解析されたキャラクターデータオブジェクト。
 */
export const parseCharacterSheet = (text) => {
  try {
    const parsedData = JSON.parse(text);
    // If JSON parsing succeeds, process as JSON
    if (parsedData && parsedData.kind === 'character' && parsedData.data) {
      const charData = parsedData.data;
      const data = {
        name: charData.name || '',
        plName: charData.plName || '',
        occupation: charData.occupation || '',
        attributes: {},
        skills: [],
        backstory: charData.backstory || '',
        beliefs: charData.beliefs || '',
        significantPeople: charData.significantPeople || '',
        meaningfulLocations: charData.meaningfulLocations || '',
        treasuredPossessions: charData.treasuredPossessions || '',
        traits: charData.traits || '',
        insanity: charData.insanity || '',
        injuries: charData.injuries || '',
        weapons: [],
        equipment: charData.equipment || '',
      };

      if (charData.params) {
        charData.params.forEach(param => {
          if (['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU'].includes(param.label)) {
            data.attributes[param.label] = parseInt(param.value, 10);
          }
        });
      }

      if (!data.name) {
        throw new Error('JSONデータにキャラクター名が見つかりません。');
      }
      return data;
    }
    // If it's a valid JSON but not in the expected character format, fall back to text parsing.
    // This allows for more flexible input, where a JSON might not be a character sheet.

  } catch (e) {
    // If JSON.parse failed (SyntaxError) or if it's a JSON format error
    if (e.message === 'JSONデータにキャラクター名が見つかりません。') {
      throw e; // Re-throw specific JSON errors
    }
    // For other JSON parsing errors (e.g., SyntaxError), fall back to text parsing
  }

  // Original text parsing logic
  
  const data = {
    name: '',
    plName: '',
    occupation: '',
    attributes: {},
    skills: [],
    backstory: '',
    beliefs: '',
    significantPeople: '',
    meaningfulLocations: '',
    treasuredPossessions: '',
    traits: '',
    insanity: '',
    injuries: '',
    weapons: [],
    equipment: '',
  };

  const nameMatch = text.match(/(?:キャラクター名|名前)\s*[:：]\s*(.+)/);
  if (nameMatch) data.name = nameMatch[1].trim();

  const plNameMatch = text.match(/(?:プレイヤー名|PL名?)\s*[:：]\s*(.+)/);
  if (plNameMatch) data.plName = plNameMatch[1].trim();

  const occupationMatch = text.match(/(?:職業)\s*[:：](.+)/);
  if (occupationMatch) data.occupation = occupationMatch[1].trim();

  const attributesMatch = text.matchAll(/([A-Z]{3})\s*[:：]?\s*(\d+)/g);
  for (const match of attributesMatch) {
      const attr = match[1];
      const value = parseInt(match[2], 10);
      if (['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU'].includes(attr)) {
        data.attributes[attr] = value;
      }
  }

  const skillsSectionMatch = text.match(/技能\s*[:：]([\s\S]+?)(?:武器|所持品|戦闘|プロフィール|探索者の履歴|信念|大切な人々|意味のある場所|財産|特徴|狂気|負傷|$)/);
  if (skillsSectionMatch) {
      const skillsText = skillsSectionMatch[1];
      const skillMatches = skillsText.matchAll(/(.+?)\s*[:：]?\s*(\d+)/g);
      for (const match of skillMatches) {
          const skillName = match[1].trim();
          if (skillName && !skillName.match(/^[A-Z]{3}$/)) {
            data.skills.push({ name: skillName, value: parseInt(match[2], 10) });
          }
      }
  }

  const backstoryMatch = text.match(/探索者の履歴\s*[:：]([\s\S]+?)(?:信念|大切な人々|意味のある場所|財産|特徴|狂気|負傷|武器|所持品|$)/);
  if (backstoryMatch) data.backstory = backstoryMatch[1].trim();

  const beliefsMatch = text.match(/信念\s*[:：]([\s\S]+?)(?:大切な人々|意味のある場所|財産|特徴|狂気|負傷|武器|所持品|$)/);
  if (beliefsMatch) data.beliefs = beliefsMatch[1].trim();

  const significantPeopleMatch = text.match(/大切な人々\s*[:：]([\s\S]+?)(?:意味のある場所|財産|特徴|狂気|負傷|武器|所持品|$)/);
  if (significantPeopleMatch) data.significantPeople = significantPeopleMatch[1].trim();

  const meaningfulLocationsMatch = text.match(/意味のある場所\s*[:：]([\s\S]+?)(?:財産|特徴|狂気|負傷|武器|所持品|$)/);
  if (meaningfulLocationsMatch) data.meaningfulLocations = meaningfulLocationsMatch[1].trim();

  const treasuredPossessionsMatch = text.match(/財産\s*[:：]([\s\S]+?)(?:特徴|狂気|負傷|武器|所持品|$)/);
  if (treasuredPossessionsMatch) data.treasuredPossessions = treasuredPossessionsMatch[1].trim();

  const traitsMatch = text.match(/特徴\s*[:：]([\s\S]+?)(?:狂気|負傷|武器|所持品|$)/);
  if (traitsMatch) data.traits = traitsMatch[1].trim();

  const insanityMatch = text.match(/狂気\s*[:：]([\s\S]+?)(?:負傷|武器|所持品|$)/);
  if (insanityMatch) data.insanity = insanityMatch[1].trim();

  const injuriesMatch = text.match(/負傷\s*[:：]([\s\S]+?)(?:武器|所持品|$)/);
  if (injuriesMatch) data.injuries = injuriesMatch[1].trim();

  const weaponsSectionMatch = text.match(/武器\s*[:：]([\s\S]+?)(?:所持品|$)/);
  if (weaponsSectionMatch) {
    const weaponsText = weaponsSectionMatch[1];
    const weaponMatches = weaponsText.matchAll(/(.+?)\s*[:：]?\s*(\d+d\d+)(?:ダメージ)?/g);
    for (const match of weaponMatches) {
      data.weapons.push({ name: match[1].trim(), damage: match[2].trim() });
    }
  }

  const equipmentMatch = text.match(/所持品\s*[:：]([\s\S]+?)$/);
  if (equipmentMatch) data.equipment = equipmentMatch[1].trim();

  if (!data.name) {
    throw new Error('キャラクター名が見つかりません。テキスト形式を確認してください。');
  }

  return data;
};