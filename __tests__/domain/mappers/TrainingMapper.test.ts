import TrainingMapper, { TrainingDTO } from '@/Training/domain/mappers/TrainingMapper';
import { Training } from '@/Training/domain/models/Training';
import { TrainingError } from '@/Training/domain/errors/TrainingError';

describe('TrainingMapper', () => {
  const baseDto: TrainingDTO = {
    uuid: 't-123',
    title: 'Curso de TypeScript',
    description: 'Formación avanzada en TS',
    location: 'Online',
    date_from: '2025',
    date_to: '2025',
  };

  it('should convert Training to JSON string and back', () => {
    const training = new Training(
      baseDto.uuid,
      baseDto.title,
      baseDto.description,
      baseDto.location,
      baseDto.date_from,
      baseDto.date_to
    );

    const json = TrainingMapper.toJson(training);
    const parsed = JSON.parse(json);

    expect(parsed).toEqual(baseDto);

    const restored = TrainingMapper.fromJson(json);
    expect(restored.getUuid()).toBe(baseDto.uuid);
    expect(restored.getTitle()).toBe(baseDto.title);
    expect(restored.getDescription()).toBe(baseDto.description);
    expect(restored.getLocation()).toBe(baseDto.location);
    expect(restored.getDateFrom()).toBe(baseDto.date_from);
    expect(restored.getDateTo()).toBe(baseDto.date_to);
  });

  it('should throw TrainingError when required fields are missing', () => {
    const invalid: any = { ...baseDto, title: '' };
    const json = JSON.stringify(invalid);

    expect(() => TrainingMapper.fromJson(json)).toThrow(TrainingError);
  });
});
