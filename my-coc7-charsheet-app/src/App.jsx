import React from 'react';
import { useCharacterSheetGenerator } from './hooks/useCharacterSheetGenerator';
import InputArea from './components/InputArea';
import CharacterSheetDisplay from './components/CharacterSheetDisplay';
import PreviewAndDownloadArea from './components/PreviewAndDownloadArea';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import './App.css';

const App = () => {
  const {
    rawText,
    parsedData,
    imageUrl,
    isLoading,
    error,
    handleTextChange,
    generateImage,
    handleDownload,
  } = useCharacterSheetGenerator();

  const SHEET_ELEMENT_ID = 'character-sheet-for-image';

  return (
    <div className="App">
      <header className="App-header">
        <h1>CoC7版 キャラクターシート画像化ツール</h1>
      </header>
      <main>
        <InputArea
          rawText={rawText}
          onTextChange={handleTextChange}
          onGenerateClick={() => generateImage(SHEET_ELEMENT_ID)}
          isLoading={isLoading}
        />
        {error && <ErrorMessage message={error} />}
        
        {/* プレビューとダウンロードエリア */}
        <PreviewAndDownloadArea 
          imageUrl={imageUrl}
          onDownloadClick={handleDownload}
          isLoading={isLoading}
        />

        {/* 画像生成用の非表示コンポーネント */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <CharacterSheetDisplay data={parsedData} elementId={SHEET_ELEMENT_ID} />
        </div>

        {isLoading && !imageUrl && <LoadingSpinner />}

      </main>
    </div>
  );
};

export default App;