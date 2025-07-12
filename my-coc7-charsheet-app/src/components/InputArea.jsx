import React from 'react';

const InputArea = ({ rawText, onTextChange, onGenerateClick, isLoading }) => (
  <div className="input-area">
    <h2>キャラクターシートのテキストを貼り付け</h2>
    <textarea
      value={rawText}
      onChange={onTextChange}
      placeholder="ここにCoC7版のキャラクターシートのテキストを貼り付けてください..."
      rows={15}
      disabled={isLoading}
    />
    <button onClick={onGenerateClick} disabled={isLoading || !rawText.trim()}>
      {isLoading ? '生成中...' : '画像生成'}
    </button>
    <style>{`
      .input-area {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .input-area textarea {
        width: 100%;
        padding: 10px;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .input-area button {
        padding: 10px 20px;
        font-size: 1.2em;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        transition: background-color 0.3s;
      }
      .input-area button:hover:not(:disabled) {
        background-color: #0056b3;
      }
      .input-area button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    `}</style>
  </div>
);

export default InputArea;
