# Cristoj | CV

Este proyecto es un CV interactivo desarrollado con TypeScript y Vite.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Construcción

```bash
npm run build
```

## Testing

El proyecto utiliza Jest para las pruebas unitarias e integración.

### Ejecutar tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### Estructura de tests

- `__tests__/models/`: Tests unitarios para los modelos
- `__tests__/integration/`: Tests de integración

## CI/CD

El proyecto utiliza GitHub Actions para la integración continua. Los tests se ejecutan automáticamente en cada push y pull request a la rama main.
