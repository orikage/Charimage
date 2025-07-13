
import { renderHook, act } from '@testing-library/react';
import { useCharacterSheetGenerator } from '../useCharacterSheetGenerator';
import { parseCharacterSheet } from '../../utils/dataParser';
import { downloadImage } from '../../utils/imageDownloader';
import html2canvas from 'html2canvas';

// モジュールのモック
jest.mock('../../utils/dataParser');
jest.mock('../../utils/imageDownloader');
jest.mock('html2canvas');

describe('useCharacterSheetGenerator', () => {
  beforeEach(() => {
    // 各テストの前にモックをクリア
    jest.clearAllMocks();
  });

  it('should have correct initial state', () => {
    const { result } = renderHook(() => useCharacterSheetGenerator());

    expect(result.current.rawText).toBe('');
    expect(result.current.characterImageUrl).toBe(''); // New assertion
    expect(result.current.parsedData).toBeNull();
    expect(result.current.imageUrl).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
  });

  it('should update rawText when handleTextChange is called', () => {
    const { result } = renderHook(() => useCharacterSheetGenerator());

    act(() => {
      result.current.handleTextChange({ target: { value: 'new text' } });
    });

    expect(result.current.rawText).toBe('new text');
  });

  it('should update characterImageUrl when handleCharacterImageUrlChange is called', () => {
    const { result } = renderHook(() => useCharacterSheetGenerator());

    act(() => {
      result.current.handleCharacterImageUrlChange({ target: { value: 'http://example.com/char.png' } });
    });

    expect(result.current.characterImageUrl).toBe('http://example.com/char.png');
  });

  it('should handle successful image generation', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useCharacterSheetGenerator());
    const mockParsedData = { name: 'Test Character' };
    const mockCanvas = document.createElement('canvas');
    const mockDataUrl = 'data:image/png;base64,test';
    const mockCharacterImageUrl = 'http://example.com/char.png';
    
    // モックの設定
    parseCharacterSheet.mockReturnValue(mockParsedData);
    html2canvas.mockResolvedValue(mockCanvas);
    jest.spyOn(mockCanvas, 'toDataURL').mockReturnValue(mockDataUrl);

    // DOM要素の準備
    const element = document.createElement('div');
    element.id = 'test-id';
    document.body.appendChild(element);

    // テキストと画像URLを設定
    act(() => {
      result.current.handleTextChange({ target: { value: 'character sheet text' } });
      result.current.handleCharacterImageUrlChange({ target: { value: mockCharacterImageUrl } });
    });

    // 画像生成を実行
    await act(async () => {
      result.current.generateImage('test-id');
    });

    // isLoadingがtrueになることを確認
    expect(result.current.isLoading).toBe(true);
    
    // パースが呼ばれることを確認
    expect(parseCharacterSheet).toHaveBeenCalledWith('character sheet text');
    expect(result.current.parsedData).toEqual({ ...mockParsedData, imageUrl: mockCharacterImageUrl }); // Updated assertion

    // setTimeout内の非同期処理を進める
    await act(async () => {
        jest.runAllTimers();
    });

    // html2canvasが呼ばれ、imageUrlが設定されることを確認
    expect(html2canvas).toHaveBeenCalledWith(element);
    expect(result.current.imageUrl).toBe(mockDataUrl); // This is the generated image, not the character image
    
    // isLoadingがfalseに戻ることを確認
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');

    document.body.removeChild(element);
    jest.useRealTimers();
  });

  it('should handle parsing error', async () => {
    const { result } = renderHook(() => useCharacterSheetGenerator());
    const errorMessage = 'Parsing failed';
    parseCharacterSheet.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    act(() => {
      result.current.handleTextChange({ target: { value: 'invalid text' } });
    });

    await act(async () => {
      result.current.generateImage('test-id');
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.imageUrl).toBe('');
    expect(result.current.parsedData).toBeNull();
    expect(result.current.characterImageUrl).toBe(''); // New assertion
  });

  it('should handle download correctly', () => {
    const { result } = renderHook(() => useCharacterSheetGenerator());
    const mockUrl = 'data:image/png;base64,test';
    const mockData = { name: 'Download Test' };

    act(() => {
      result.current.setImageUrl(mockUrl);
      result.current.setParsedData(mockData);
    });

    act(() => {
      result.current.handleDownload();
    });

    expect(downloadImage).toHaveBeenCalledTimes(1);
    expect(downloadImage).toHaveBeenCalledWith(mockUrl, 'Download Test_sheet.png');
  });
});
