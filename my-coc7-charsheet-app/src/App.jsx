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
  } = useCharacterSheetGenerator(
    `{"kind":"character","data":{"name":"天乃 天(アマノ アメ)","initiative":60,"externalUrl":"https://charaeno.com/7th/2Cwt8oQH7Ekyahx8bmFig","status":[{"label":"HP","value":12,"max":12},{"label":"MP","value":17,"max":17},{"label":"SAN","value":85,"max":85}],"params":[{"label":"STR","value":"65"},{"label":"CON","value":"80"},{"label":"POW","value":"85"},{"label":"DEX","value":"60"},{"label":"APP","value":"85"},{"label":"SIZ","value":"45"},{"label":"INT","value":"40"},{"label":"EDU","value":"50"},{"label":"MOV","value":"9"},{"label":"DB","value":"+0"},{"label":"ビルド","value":"0"}],"commands":"CC<={SAN} 正気度ロール\nCC<=50 幸運\nCC<=65 STR\nCC<=80 CON\nCC<=85 POW\nCC<=60 DEX\nCC<=85 APP\nCC<=45 SIZ\nCC<=40 INT\nCC<=40 アイデア\nCC<=50 知識\nCC<=30 回避\nCC<=70 聞き耳\nCC<=25 近接戦闘（格闘）\nCC<=40 信用\nCC<=80 心理学\nCC<=75 説得\nCC<=35 図書館\nCC<=50 母国語（）\nCC<=65 目星\n1D3+{DB} 素手","memo":""}}`
  );

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