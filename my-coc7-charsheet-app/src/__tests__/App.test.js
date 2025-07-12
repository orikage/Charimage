
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { parseCharacterSheet } from '../utils/dataParser';
import html2canvas from 'html2canvas';

// モジュールのモック
jest.mock('../utils/dataParser');
jest.mock('html2canvas');

// jest.setup.jsでjest-canvas-mockをセットアップ済みなので、toDataURLは自動的にモックされる

describe('<App />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // html2canvasの基本的なモック設定
    const mockCanvas = document.createElement('canvas');
    html2canvas.mockResolvedValue(mockCanvas);
  });

  it('should perform a full image generation cycle successfully', async () => {
    const mockParsedData = {
      name: 'テスト成功キャラ',
      plName: 'テストPL',
      attributes: { STR: 50 },
      skills: [{ name: 'キック', value: 25 }],
      weapons: [],
      equipment: '',
      // 他のプロパティも必要に応じて追加
    };
    parseCharacterSheet.mockReturnValue(mockParsedData);

    render(<App />);

    // 1. テキストを入力
    const textarea = screen.getByPlaceholderText('ここにCoC7版のキャラクターシートのテキストを貼り付けてください...');
    fireEvent.change(textarea, { target: { value: 'valid character sheet text' } });

    // 2. ボタンをクリック
    const generateButton = screen.getByRole('button', { name: '画像生成' });
    fireEvent.click(generateButton);

    // 3. ローディング表示を確認
    expect(await screen.findByText('画像を生成中...')).toBeInTheDocument();

    // 4. プレビューとダウンロードボタンが表示されるのを待つ
    await waitFor(() => {
      expect(screen.getByText('プレビュー')).toBeInTheDocument();
    });
    expect(screen.getByAltText('生成されたキャラクターシート')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ダウンロード' })).toBeInTheDocument();

    // エラーメッセージが表示されていないことを確認
    expect(screen.queryByText(/エラーが発生しました/)).toBeNull();
  });

  it('should display an error message when parsing fails', async () => {
    const errorMessage = 'パースに失敗しました';
    parseCharacterSheet.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    render(<App />);

    // 1. テキストを入力
    const textarea = screen.getByPlaceholderText('ここにCoC7版のキャラクターシートのテキストを貼り付けてください...');
    fireEvent.change(textarea, { target: { value: 'invalid text' } });

    // 2. ボタンをクリック
    const generateButton = screen.getByRole('button', { name: '画像生成' });
    fireEvent.click(generateButton);

    // 3. エラーメッセージが表示されるのを待つ
    await waitFor(() => {
      expect(screen.getByText(`エラーが発生しました:`)).toBeInTheDocument();
    });
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

    // プレビューが表示されていないことを確認
    expect(screen.queryByText('プレビュー')).toBeNull();
  });
});
