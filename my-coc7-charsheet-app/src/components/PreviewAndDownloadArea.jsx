import React from 'react';

const PreviewAndDownloadArea = ({ imageUrl, onDownloadClick, isLoading }) => {
  if (isLoading) return null;
  if (!imageUrl) return null;

  return (
    <div className="preview-download-area">
      <h2>プレビュー</h2>
      <img src={imageUrl} alt="生成されたキャラクターシート" />
      <button onClick={onDownloadClick}>
        ダウンロード
      </button>
      <style>{`
        .preview-download-area {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .preview-download-area img {
          max-width: 100%;
          border: 1px solid #ccc;
        }
        .preview-download-area button {
          padding: 10px 20px;
          font-size: 1.2em;
          cursor: pointer;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        .preview-download-area button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default PreviewAndDownloadArea;
