import Locations from '@/_shared/domain/Locations';

describe('Locations', () => {
  it('should have the correct values', () => {
    expect(Locations.ACORUNA).toBe('A Coruña');
    expect(Locations.MADRID).toBe('Madrid');
    expect(Locations.REMOTO).toBe('Remoto');
  });

  it('should have all expected locations', () => {
    const expectedLocations = [
      'A Coruña',
      'Madrid',
      'Remoto'
    ];

    const allLocations = Object.values(Locations);
    expect(allLocations).toHaveLength(expectedLocations.length);

    expectedLocations.forEach(location => {
      expect(allLocations).toContain(location);
    });
  });
});
