import { useState } from 'react';
import html2canvas from 'html2canvas';
import { parseCharacterSheet } from '../utils/dataParser';
import { downloadImage } from '../utils/imageDownloader';

export const useCharacterSheetGenerator = () => {
  const [rawText, setRawText] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextChange = (e) => {
    setRawText(e.target.value);
  };

  const generateImage = async (elementId) => {
    setIsLoading(true);
    setError('');
    setParsedData(null);
    setImageUrl('');

    try {
      // 1. テキストを解析
      const data = parseCharacterSheet(rawText);
      setParsedData(data);

      // 2. 少し待ってからDOM要素を取得して画像化
      setTimeout(async () => {
        try {
          const element = document.getElementById(elementId);
          if (!element) {
            throw new Error('画像化対象の要素が見つかりません。');
          }
          const canvas = await html2canvas(element);
          const url = canvas.toDataURL('image/png');
          setImageUrl(url);
        } catch (err) {
          setError(err.message || '画像生成中にエラーが発生しました。' + (err.message ? ': ' + err.message : ''));
        } finally {
          setIsLoading(false);
        }
      }, 100); // データがDOMに反映されるのを少し待つ

      // キャラクター画像URLをセット
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }

    } catch (err) {
      setError(err.message || '不明なエラーが発生しました。');
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl && parsedData) {
      downloadImage(imageUrl, `${parsedData.name || 'character'}_sheet.png`);
    }
  };

  return {
    rawText,
    parsedData,
    imageUrl,
    isLoading,
    error,
    handleTextChange,
    generateImage,
    handleDownload,
    setImageUrl, // For testing
    setParsedData, // For testing
  };
};
