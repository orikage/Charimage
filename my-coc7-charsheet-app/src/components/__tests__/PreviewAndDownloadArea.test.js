
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PreviewAndDownloadArea from '../PreviewAndDownloadArea';

describe('<PreviewAndDownloadArea />', () => {
  const mockImageUrl = 'data:image/png;base64,test';
  const mockOnDownloadClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render nothing if imageUrl is not provided', () => {
    const { container } = render(
      <PreviewAndDownloadArea imageUrl={null} onDownloadClick={mockOnDownloadClick} isLoading={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if isLoading is true', () => {
    const { container } = render(
      <PreviewAndDownloadArea imageUrl={mockImageUrl} onDownloadClick={mockOnDownloadClick} isLoading={true} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render preview and download button when imageUrl is provided and not loading', () => {
    render(
      <PreviewAndDownloadArea imageUrl={mockImageUrl} onDownloadClick={mockOnDownloadClick} isLoading={false} />
    );

    expect(screen.getByText('プレビュー')).toBeInTheDocument();
    const image = screen.getByAltText('生成されたキャラクターシート');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockImageUrl);

    const downloadButton = screen.getByRole('button', { name: 'ダウンロード' });
    expect(downloadButton).toBeInTheDocument();
  });

  it('should call onDownloadClick when the download button is clicked', () => {
    render(
      <PreviewAndDownloadArea imageUrl={mockImageUrl} onDownloadClick={mockOnDownloadClick} isLoading={false} />
    );

    const downloadButton = screen.getByRole('button', { name: 'ダウンロード' });
    fireEvent.click(downloadButton);

    expect(mockOnDownloadClick).toHaveBeenCalledTimes(1);
  });
});
