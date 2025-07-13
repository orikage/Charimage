import { parseCharacterSheet } from '../dataParser';

describe('parseCharacterSheet', () => {
  // 共通の期待値ベース
  const baseExpected = {
    backstory: '',
    beliefs: '',
    equipment: '',
    injuries: '',
    insanity: '',
    meaningfulLocations: '',
    occupation: '',
    significantPeople: '',
    traits: '',
    treasuredPossessions: '',
    weapons: [],
    imageUrl: '',
  };

  it('should correctly parse basic character information from text', () => {
    const text = `
      キャラクター名：テストキャラ
      PL名：テストプレイヤー
    `;
    const expected = {
      ...baseExpected,
      name: 'テストキャラ',
      plName: 'テストプレイヤー',
      attributes: {},
      skills: [],
    };
    expect(parseCharacterSheet(text)).toEqual(expected);
  });

  it('should correctly parse attributes from text', () => {
    const text = `
      キャラクター名：ダミー
      STR: 60
      CON: 50
      POW: 70
      DEX: 80
      APP: 90
      SIZ: 40
      INT: 75
      EDU: 65
    `;
    const expected = {
      ...baseExpected,
      name: 'ダミー',
      plName: '',
      attributes: {
        STR: 60,
        CON: 50,
        POW: 70,
        DEX: 80,
        APP: 90,
        SIZ: 40,
        INT: 75,
        EDU: 65,
      },
      skills: [],
    };
    expect(parseCharacterSheet(text)).toEqual(expected);
  });

  it('should correctly parse skills from text', () => {
    const text = `
      キャラクター名：ダミー
      技能：
      言いくるめ: 65
      回避: 70
      目星: 50
      聞き耳: 45
      図書館: 30
      運転（自動車）: 20
      信用: 15
      心理学: 10
      医学: 5
      歴史: 1
    `;
    const expected = {
      ...baseExpected,
      name: 'ダミー',
      plName: '',
      attributes: {},
      skills: [
        { name: '言いくるめ', value: 65, category: 'その他' },
        { name: '回避', value: 70, category: 'その他' },
        { name: '目星', value: 50, category: 'その他' },
        { name: '聞き耳', value: 45, category: 'その他' },
        { name: '図書館', value: 30, category: 'その他' },
        { name: '運転（自動車）', value: 20, category: 'その他' },
        { name: '信用', value: 15, category: 'その他' },
        { name: '心理学', value: 10, category: 'その他' },
        { name: '医学', value: 5, category: 'その他' },
        { name: '歴史', value: 1, category: 'その他' },
      ],
    };
    expect(parseCharacterSheet(text)).toEqual(expected);
  });

  it('should throw an error if character name is missing in text', () => {
    const text = `
      PL名：テストプレイヤー
      STR: 60
    `;
    expect(() => parseCharacterSheet(text)).toThrow('キャラクター名が見つかりません。テキスト形式を確認してください。');
  });

  it('should correctly parse JSON character information', () => {
    const jsonText = `{"kind":"character","data":{"name":"天乃 天(アマノ アメ)","plName":"テストPL","occupation":"学生","backstory":"過去の出来事","beliefs":"真実の探求","significantPeople":"家族","meaningfulLocations":"古い図書館","treasuredPossessions":"懐中時計","traits":"好奇心旺盛","insanity":"なし","injuries":"なし","weapons":[{"name":"ナイフ","damage":"1d4"}],"equipment":"リュックサック"}}`;
    const expected = {
      name: '天乃 天(アマノ アメ)',
      plName: 'テストPL',
      occupation: '学生',
      attributes: {},
      skills: [],
      backstory: '過去の出来事',
      beliefs: '真実の探求',
      significantPeople: '家族',
      meaningfulLocations: '古い図書館',
      treasuredPossessions: '懐中時計',
      traits: '好奇心旺盛',
      insanity: 'なし',
      injuries: 'なし',
      weapons: [{ name: 'ナイフ', damage: '1d4' }],
      equipment: 'リュックサック',
      imageUrl: '',
    };
    expect(parseCharacterSheet(jsonText)).toEqual(expected);
  });

  it('should throw an error if character name is missing in JSON', () => {
    const jsonText = `{"kind":"character","data":{"initiative":60}}`;
    expect(() => parseCharacterSheet(jsonText)).toThrow('JSONデータにキャラクター名が見つかりません。');
  });

  it('should fall back to text parsing if JSON is invalid', () => {
    const invalidJsonText = `これはJSONではないテキストです。キャラクター名：テスト`;
    const expected = {
      ...baseExpected,
      name: 'テスト',
      plName: '',
      attributes: {},
      skills: [],
    };
    expect(parseCharacterSheet(invalidJsonText)).toEqual(expected);
  });

  it('should correctly parse image URL from text', () => {
    const text = `
      キャラクター名：画像テスト
      画像URL: https://example.com/image.png
    `;
    const expected = {
      ...baseExpected,
      name: '画像テスト',
      plName: '',
      attributes: {},
      skills: [],
      imageUrl: 'https://example.com/image.png',
    };
    expect(parseCharacterSheet(text)).toEqual(expected);
  });

  it('should correctly parse image URL from JSON', () => {
    const jsonText = `{"kind":"character","data":{"name":"JSON画像テスト","imageUrl":"https://example.com/json_image.jpg"}}`;
    const expected = {
      ...baseExpected,
      name: 'JSON画像テスト',
      plName: '',
      attributes: {},
      skills: [],
      imageUrl: 'https://example.com/json_image.jpg',
    };
    expect(parseCharacterSheet(jsonText)).toEqual(expected);
  });
});