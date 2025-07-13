
import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterSheetDisplay from '../CharacterSheetDisplay';

describe('<CharacterSheetDisplay />', () => {
  const mockData = {
    name: 'テストキャラ',
    plName: 'テストPL',
    occupation: 'テスト職業',
    attributes: { STR: 80, DEX: 70 },
    skills: [{ name: '図書館', value: 75 }],
    weapons: [{ name: 'ショットガン', damage: '4d6' }],
    equipment: '懐中電灯',
    backstory: 'テスト履歴',
    beliefs: 'テスト信念',
    significantPeople: 'テスト大切な人々',
    meaningfulLocations: 'テスト意味のある場所',
    treasuredPossessions: 'テスト財産',
    traits: 'テスト特徴',
    insanity: 'テスト狂気',
    injuries: 'テスト負傷',
  };

  it('should render nothing if no data is provided', () => {
    const { container } = render(<CharacterSheetDisplay data={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render all sections with the provided data', () => {
    render(<CharacterSheetDisplay data={mockData} elementId="sheet-display" />);

    // Check if the main container has the correct ID
    expect(screen.getByTestId('character-sheet-display')).toHaveAttribute('id', 'sheet-display');

    // Check content from various sections
    expect(screen.getByRole('heading', { name: 'テストキャラ' })).toBeInTheDocument();
    expect(screen.getByText('PL: テストPL')).toBeInTheDocument();
    expect(screen.getByText('テスト職業')).toBeInTheDocument();
    expect(screen.getByText('STR')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('図書館')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('ショットガン')).toBeInTheDocument();
    expect(screen.getByText('4d6')).toBeInTheDocument();
    expect(screen.getByText('懐中電灯')).toBeInTheDocument();
    expect(screen.getByText('テスト履歴')).toBeInTheDocument();
    expect(screen.getByText('テスト信念')).toBeInTheDocument();
    expect(screen.getByText('テスト大切な人々')).toBeInTheDocument();
    expect(screen.getByText('テスト意味のある場所')).toBeInTheDocument();
    expect(screen.getByText('テスト財産')).toBeInTheDocument();
    expect(screen.getByText('テスト特徴')).toBeInTheDocument();
    expect(screen.getByText('テスト狂気')).toBeInTheDocument();
    expect(screen.getByText('テスト負傷')).toBeInTheDocument();
  });
});
