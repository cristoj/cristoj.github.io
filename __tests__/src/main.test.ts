describe('main.ts', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        jest.resetModules();
    });

    it('should call initializeApp successfully', async () => {
        const mockInitializeApp = jest.fn().mockResolvedValue(undefined);

        // Mock solo bootstrap
        jest.doMock('@/bootstrap', () => ({
            initializeApp: mockInitializeApp
        }));

        await import('@/main');

        expect(mockInitializeApp).toHaveBeenCalled();
    });

    it('should handle initializeApp errors by showing error in DOM', async () => {
        const testError = new Error('Bootstrap failed');

        // Mock bootstrap para que falle
        jest.doMock('@/bootstrap', () => ({
            initializeApp: jest.fn().mockRejectedValue(testError)
        }));

        // Espiar console.error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Import main
        await import('@/main');

        // Esperar a que se procese el error
        await new Promise(resolve => setTimeout(resolve, 100));

        // Verificar que se renderizó el error en el DOM
        expect(document.body.innerHTML).toContain('❌ Error en la aplicación');
        expect(document.body.innerHTML).toContain('Bootstrap failed');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error', 'Bootstrap failed');

        consoleErrorSpy.mockRestore();
    });

    it('should handle non-Error objects', async () => {
        const testError = 'String error message';

        jest.doMock('@/bootstrap', () => ({
            initializeApp: jest.fn().mockRejectedValue(testError)
        }));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await import('@/main');
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(document.body.innerHTML).toContain('❌ Error en la aplicación');
        expect(document.body.innerHTML).toContain('Unknown error occurred: String error message');
        expect(consoleErrorSpy).toHaveBeenCalledWith(testError);

        consoleErrorSpy.mockRestore();
    });
});
