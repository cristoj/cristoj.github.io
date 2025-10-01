import PortfolioMapper, { PortfolioDTO } from '@/Portfolio/domain/mappers/PortfolioMapper';
import { Portfolio } from '@/Portfolio/domain/models/Portfolio';
import { PortfolioError } from '@/Portfolio/domain/errors/PortfolioError';

describe('PortfolioMapper', () => {
  const baseDto: PortfolioDTO = {
    uuid: 'p-123',
    title: 'My Project',
    description: 'A cool project',
    technologies: ['TypeScript', 'Node.js'],
    imageUrl: 'https://example.com/image.png',
    url: 'https://example.com'
  };

  it('should convert Portfolio to JSON string and back', () => {
    const portfolio = new Portfolio(
      baseDto.uuid,
      baseDto.title,
      baseDto.description,
      baseDto.technologies,
      baseDto.imageUrl,
      baseDto.url
    );

    const json = PortfolioMapper.toJson(portfolio);
    const parsed = JSON.parse(json);

    expect(parsed).toEqual(baseDto);

    const restored = PortfolioMapper.fromJson(json);
    expect(restored.getUuid()).toBe(baseDto.uuid);
    expect(restored.getTitle()).toBe(baseDto.title);
    expect(restored.getDescription()).toBe(baseDto.description);
    expect(restored.getTechnologies()).toEqual(baseDto.technologies);
    expect(restored.getImageUrl()).toBe(baseDto.imageUrl);
    expect(restored.getUrl()).toBe(baseDto.url);
  });

  it('should throw PortfolioError when required fields are missing', () => {
    const invalid: any = { ...baseDto, title: '' }; // title missing
    const json = JSON.stringify(invalid);

    expect(() => PortfolioMapper.fromJson(json)).toThrow(PortfolioError);
  });

  it('should throw PortfolioError when technologies is empty', () => {
    const invalid: any = { ...baseDto, technologies: [] };
    const json = JSON.stringify(invalid);

    expect(() => PortfolioMapper.fromJson(json)).toThrow(PortfolioError);
  });
});
