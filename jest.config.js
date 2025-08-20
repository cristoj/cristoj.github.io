export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    // Cambiar de setupFiles a setupFilesAfterEnv
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.test.json'
        }],

    },

    moduleNameMapper: {
        '\\.css\\?inline$': 'identity-obj-proxy',
        '\\.css$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },


    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ]
};
