import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputArea from '../InputArea';

describe('InputArea', () => {
  it('should render textarea and button', () => {
    render(
      <InputArea
        rawText=""
        onTextChange={jest.fn()}
        onGenerateClick={jest.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByPlaceholderText('ここにCoC7版のキャラクターシートのテキストを貼り付けてください...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '画像生成' })).toBeInTheDocument();
  });

  it('should call onTextChange when textarea value changes', () => {
    const mockOnTextChange = jest.fn();
    render(
      <InputArea
        rawText=""
        onTextChange={mockOnTextChange}
        onGenerateClick={jest.fn()}
        isLoading={false}
      />
    );

    const textarea = screen.getByPlaceholderText('ここにCoC7版のキャラクターシートのテキストを貼り付けてください...');
    // fireEvent.changeは、イベントオブジェクトのtargetプロパティに直接valueを設定する
    // 実際のDOMイベントでは、targetはDOM要素であり、そのvalueプロパティが変更される
    // テストでは、これをシミュレートするために、targetにvalueプロパティを持つオブジェクトを渡す
    fireEvent.change(textarea, { target: { value: 'new text' } });

    expect(mockOnTextChange).toHaveBeenCalledTimes(1);
    expect(mockOnTextChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object),
      })
    );
  });

  it('should call onGenerateClick when button is clicked', () => {
    const mockOnGenerateClick = jest.fn();
    render(
      <InputArea
        rawText="some text"
        onTextChange={jest.fn()}
        onGenerateClick={mockOnGenerateClick}
        isLoading={false}
      />
    );

    const button = screen.getByRole('button', { name: '画像生成' });
    fireEvent.click(button);

    expect(mockOnGenerateClick).toHaveBeenCalledTimes(1);
  });

  it('should disable button when isLoading is true', () => {
    render(
      <InputArea
        rawText="some text"
        onTextChange={jest.fn()}
        onGenerateClick={jest.fn()}
        isLoading={true}
      />
    );

    const button = screen.getByRole('button', { name: '生成中...' });
    expect(button).toBeDisabled();
  });

  it('should disable button when rawText is empty', () => {
    render(
      <InputArea
        rawText=""
        onTextChange={jest.fn()}
        onGenerateClick={jest.fn()}
        isLoading={false}
      />
    );

    const button = screen.getByRole('button', { name: '画像生成' });
    expect(button).toBeDisabled();
  });
});