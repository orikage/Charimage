import React from 'react';
import CharacterInfoSection from './sections/CharacterInfoSection';
import AttributesSection from './sections/AttributesSection';
import SkillsSection from './sections/SkillsSection';
import EquipmentSection from './sections/EquipmentSection';
import OccupationSection from './sections/OccupationSection';
import BackstorySection from './sections/BackstorySection';
import BeliefsSection from './sections/BeliefsSection';
import SignificantPeopleSection from './sections/SignificantPeopleSection';
import MeaningfulLocationsSection from './sections/MeaningfulLocationsSection';
import TreasuredPossessionsSection from './sections/TreasuredPossessionsSection';
import TraitsSection from './sections/TraitsSection';
import InsanitySection from './sections/InsanitySection';
import InjuriesSection from './sections/InjuriesSection';
import WeaponsSection from './sections/WeaponsSection';

const CharacterSheetDisplay = ({ data, elementId }) => {
  if (!data) return null;

  return (
    <div id={elementId} className="character-sheet-display" data-testid="character-sheet-display">
      <CharacterInfoSection name={data.name} plName={data.plName} />
      <OccupationSection occupation={data.occupation} />
      <AttributesSection attributes={data.attributes} />
      <SkillsSection skills={data.skills} />
      <WeaponsSection weapons={data.weapons} />
      <EquipmentSection equipment={data.equipment} />
      <BackstorySection backstory={data.backstory} />
      <BeliefsSection beliefs={data.beliefs} />
      <SignificantPeopleSection significantPeople={data.significantPeople} />
      <MeaningfulLocationsSection meaningfulLocations={data.meaningfulLocations} />
      <TreasuredPossessionsSection treasuredPossessions={data.treasuredPossessions} />
      <TraitsSection traits={data.traits} />
      <InsanitySection insanity={data.insanity} />
      <InjuriesSection injuries={data.injuries} />
      <style>{`
        .character-sheet-display {
          border: 1px solid #000;
          padding: 20px;
          width: 800px; /* A4比率に近い幅 */
          background-color: white;
          font-family: 'Helvetica', 'Arial', sans-serif;
        }
        .character-sheet-display h1, .character-sheet-display h2 {
          border-bottom: 2px solid #000;
          padding-bottom: 5px;
        }
        .character-sheet-display ul {
          list-style: none;
          padding: 0;
        }
        .character-sheet-display li {
          padding: 2px 0;
        }
      `}</style>
    </div>
  );
};

export default CharacterSheetDisplay;
