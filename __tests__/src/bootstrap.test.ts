/**
 * @jest-environment jsdom
 */

import { initializeApp } from '@/bootstrap';
//import { JSDOM } from 'jsdom';

// Mock dependencies
jest.mock('@/CurriculumVitae/domain/models/CVDeveloper');
jest.mock('@/CurriculumVitae/infraestructura/LocalStorageCurriculumVitae');
jest.mock('@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase');
jest.mock('@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer');

const MockCVDeveloper = require('@/CurriculumVitae/domain/models/CVDeveloper').default;
const MockLocalStorage = require('@/CurriculumVitae/infraestructura/LocalStorageCurriculumVitae').default;
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
        mockRender = jest.fn();

        mockUseCase = {
            execute: mockExecute
        };
        mockRenderer = {
            render: mockRender
        };

        MockCVDeveloper.mockImplementation(() => mockDeveloper);
        MockLocalStorage.mockImplementation(() => mockRepository);
        MockUseCase.mockImplementation(() => mockUseCase);
        MockRenderer.mockImplementation(() => mockRenderer);
    });

    it('should initialize app successfully', async () => {
        await initializeApp();

        // Verify developer creation
        expect(MockCVDeveloper).toHaveBeenCalledWith(
            '9f863328-1fb1-432e-a56b-70189492c37b',
            'Cristobal V. Terceiro',
            'crsitojvt@gmail.com',
            '+34697356153',
            expect.any(Array),
            expect.any(String),
            'https://www.linkedin.com/in/cristobal-terceiro/',
            'https://cristoj.github.io',
            expect.any(Array)
        );

        // Verify skills were added
        expect(mockDeveloper.addSkills).toHaveBeenCalledTimes(5);

        // Verify use case execution
        expect(mockExecute).toHaveBeenCalledWith(mockDeveloper);

        // Verify repository and use case creation
        expect(MockLocalStorage).toHaveBeenCalled();
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

        expect(MockRenderer).toHaveBeenCalledWith(mockDeveloper);
        expect(mockRender).toHaveBeenCalled();
    });

    it('should handle use case execution errors', async () => {
        const mockError = new Error('Use case failed');
        mockExecute.mockRejectedValue(mockError);

        await expect(initializeApp()).rejects.toThrow('Use case failed');
    });
});
