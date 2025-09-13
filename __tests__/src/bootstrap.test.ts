/**
 * @jest-environment jsdom
 */

import { initializeApp } from '@/bootstrap';
//import { JSDOM } from 'jsdom';

// Mock dependencies
jest.mock('@/CurriculumVitae/domain/models/CVDeveloper');
jest.mock('@/CurriculumVitae/infraestructura/InMemoryCurriculumVitae'); // <-- Cambio aquí
jest.mock('@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase');
jest.mock('@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer');

const MockCVDeveloper = require('@/CurriculumVitae/domain/models/CVDeveloper').default;
const MockInMemoryCV = require('@/CurriculumVitae/infraestructura/InMemoryCurriculumVitae').default; // <-- Cambio aquí
const MockUseCase = require('@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase').default;
const MockRenderer = require('@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer').default;

describe('bootstrap.ts', () => {
    let mockDeveloper: any;
    let mockRepository: any;
    let mockUseCase: any;
    let mockRenderer: any;
    let mockExecute: jest.Mock;
    let mockRender: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        /*
        // Setup DOM
        const dom = new JSDOM('<!DOCTYPE html><html lang="es"><body></body></html>');
        global.document = dom.window.document;
        global.window = dom.window as any;
         */

        // Setup mocks
        mockDeveloper = {
            addSkills: jest.fn()
        };
        mockRepository = {};
        mockExecute = jest.fn().mockResolvedValue(undefined);
        mockRender = jest.fn().mockResolvedValue(undefined); // <-- Añadir mockResolvedValue

        mockUseCase = {
            execute: mockExecute
        };
        mockRenderer = {
            render: mockRender
        };

        MockCVDeveloper.mockImplementation(() => mockDeveloper);
        MockInMemoryCV.mockImplementation(() => mockRepository); // <-- Cambio aquí
        MockUseCase.mockImplementation(() => mockUseCase);
        MockRenderer.mockImplementation(() => mockRenderer);
    });

    it('should initialize app successfully', async () => {
        await initializeApp();

        // Verify developer creation
        expect(MockCVDeveloper).toHaveBeenCalledWith(
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(Array),
            expect.any(String),
            expect.any(String),
            expect.any(String),
            expect.any(Array),
            expect.any(Array),
            expect.any(Array),
        );

        // Verify skills were added
        expect(mockDeveloper.addSkills).toHaveBeenCalledTimes(5);

        // Verify use case execution
        expect(mockExecute).toHaveBeenCalledWith(mockDeveloper);

        // Verify repository and use case creation
        expect(MockInMemoryCV).toHaveBeenCalled(); // <-- Cambio aquí
        expect(MockUseCase).toHaveBeenCalledWith(mockRepository);
    });

    it('should setup DOM event listener', async () => {
        const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

        await initializeApp();

        expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
    });

    it('should render CV when DOM is loaded', async () => {
        await initializeApp();

        // Simulate DOMContentLoaded event
        const event = new Event('DOMContentLoaded');
        document.dispatchEvent(event);

        // Esperar a que se resuelvan las promesas
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(MockRenderer).toHaveBeenCalledWith(mockDeveloper, undefined); // <-- Añadir segundo parámetro
        expect(mockRender).toHaveBeenCalled();
    });

    it('should handle use case execution errors', async () => {
        const mockError = new Error('Use case failed');
        mockExecute.mockRejectedValue(mockError);

        await expect(initializeApp()).rejects.toThrow('Use case failed');
    });
});
