export default class ErrorRenderer {
    private targetElement: HTMLElement;

    constructor(targetElement: HTMLElement = document.body) {
        this.targetElement = targetElement;
    }

    /**
     * Renders an error message to the target element
     *
     * @param error The error to render
     */
    render(error: unknown): void {
        let errorHtml = '';

        if (error instanceof Error) {
            console.error(error.name, error.message);
            errorHtml += `<p><strong>Error:</strong> ${error.name}: ${error.message}</p>`;
        } else {
            console.error(error);
            errorHtml += `<p><strong>Error:</strong> Unknown error occurred: ${error}</p>`;
        }

        this.targetElement.innerHTML = `
            <div style='padding: 20px; font-family: Arial, sans-serif; color: red;'>
                <h1>❌ Error en la aplicación</h1>
                ${errorHtml}
            </div>
        `;
    }

    /**
     * Sets a new target element for rendering
     *
     * @param element The new target element
     */
    setTargetElement(element: HTMLElement): void {
        this.targetElement = element;
    }
}
