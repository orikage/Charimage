import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputArea from '../InputArea';

describe('InputArea', () => {
  const defaultProps = {
    rawText: '',
    onTextChange: jest.fn(),
    characterImageUrl: '',
    onCharacterImageUrlChange: jest.fn(),
    onGenerateClick: jest.fn(),
    isLoading: false,
  };

  it('should render textarea, image URL input, and button', () => {
    render(<InputArea {...defaultProps} />);

    expect(screen.getByPlaceholderText('ここにCoC7版のキャラクターシートのテキストを貼り付けてください...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ここにキャラクター画像のURLを貼り付けてください (例: http://example.com/image.png)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '画像生成' })).toBeInTheDocument();
  });

  it('should call onTextChange when textarea value changes', () => {
    const mockOnTextChange = jest.fn();
    render(<InputArea {...defaultProps} onTextChange={mockOnTextChange} />);

    const textarea = screen.getByPlaceholderText('ここにCoC7版のキャラクターシートのテキストを貼り付けてください...');
    fireEvent.change(textarea, { target: { value: 'new text' } });

    expect(mockOnTextChange).toHaveBeenCalledTimes(1);
    expect(mockOnTextChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object),
      })
    );
  });

  it('should call onCharacterImageUrlChange when image URL input value changes', () => {
    const mockOnCharacterImageUrlChange = jest.fn();
    render(<InputArea {...defaultProps} onCharacterImageUrlChange={mockOnCharacterImageUrlChange} />);

    const imageUrlInput = screen.getByPlaceholderText('ここにキャラクター画像のURLを貼り付けてください (例: http://example.com/image.png)');
    fireEvent.change(imageUrlInput, { target: { value: 'http://example.com/new_image.png' } });

    expect(mockOnCharacterImageUrlChange).toHaveBeenCalledTimes(1);
    expect(mockOnCharacterImageUrlChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object),
      })
    );
  });

  it('should call onGenerateClick when button is clicked', () => {
    const mockOnGenerateClick = jest.fn();
    render(<InputArea {...defaultProps} rawText="some text" onGenerateClick={mockOnGenerateClick} />);

    const button = screen.getByRole('button', { name: '画像生成' });
    fireEvent.click(button);

    expect(mockOnGenerateClick).toHaveBeenCalledTimes(1);
  });

  it('should disable button when isLoading is true', () => {
    render(<InputArea {...defaultProps} rawText="some text" isLoading={true} />);

    const button = screen.getByRole('button', { name: '生成中...' });
    expect(button).toBeDisabled();
  });

  it('should disable button when rawText is empty', () => {
    render(<InputArea {...defaultProps} rawText="" />);

    const button = screen.getByRole('button', { name: '画像生成' });
    expect(button).toBeDisabled();
  });
});