
import { downloadImage } from '../imageDownloader';

describe('downloadImage', () => {
  let appendChildSpy;
  let removeChildSpy;
  let clickSpy;

  beforeEach(() => {
    appendChildSpy = jest.spyOn(document.body, 'appendChild');
    removeChildSpy = jest.spyOn(document.body, 'removeChild');
    clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  });

  afterEach(() => {
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
    clickSpy.mockRestore();
  });

  it('should create a link and trigger a download', () => {
    const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    const filename = 'test-image.png';

    downloadImage(dataUrl, filename);

    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(removeChildSpy).toHaveBeenCalledTimes(1);

    const link = appendChildSpy.mock.calls[0][0];
    expect(link.href).toBe(dataUrl);
    expect(link.download).toBe(filename);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
