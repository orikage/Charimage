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
import './CharacterSheetDisplay.css'; // Import the CSS file

const CharacterSheetDisplay = ({ data, elementId }) => {
  if (!data) return null;

  return (
    <div id={elementId} className="character-sheet-display" data-testid="character-sheet-display">
      <CharacterInfoSection name={data.name} plName={data.plName} />
      {data.imageUrl && (
        <div className="character-image-container">
          <img src={data.imageUrl} alt="キャラクター画像" className="character-image" crossOrigin="anonymous" />
        </div>
      )}
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
    </div>
  );
};

export default CharacterSheetDisplay;
