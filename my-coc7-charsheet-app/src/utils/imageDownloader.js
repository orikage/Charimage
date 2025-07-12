/**
 * 画像のデータURLとファイル名を引数に取り、ダウンロード処理を実行します。
 * @param {string} dataUrl - 画像のデータURL。
 * @param {string} filename - 保存するファイル名。
 */
export const downloadImage = (dataUrl, filename) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
