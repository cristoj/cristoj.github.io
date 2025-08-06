import CVDeveloper from "@/CurriculumVitae/domain/models/CVDeveloper";
import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";

/**
 * Class responsible for rendering a curriculum vitae to HTML
 */
export default class CurriculumVitaeRenderer {
    private curriculumVitae: CurriculumVitae;
    private targetElement: HTMLElement;

    /**
     * Creates a new CurriculumVitaeRenderer
     *
     * @param developer The CVDeveloper instance to render
     * @param targetElement The HTML element where the CV will be rendered (defaults to document.body)
     */
    constructor(developer: CVDeveloper, targetElement: HTMLElement = document.body) {
        this.curriculumVitae = developer;
        this.targetElement = targetElement;
    }

    /**
     * Renders the CV to the target element
     */
    render(): void {
        const basicInfo = this.curriculumVitae.getBasicInfo();

        this.targetElement.innerHTML = `
            <div id="app" style='padding: 20px; font-family: Arial, sans-serif;'>
                <h1>🚀 Curriculum Vitae</h1>            
                <div style='margin-bottom: 20px;'>
                    <p><strong>Nombre:</strong> ${basicInfo.fullName}</p>
                    <p><strong>Email:</strong> ${basicInfo.email}</p>
                    <p><strong>Teléfono:</strong> ${basicInfo.phone}</p>
                    <p><strong>Category:</strong> ${basicInfo.jobCategories}</p>
                    <p><strong>Especialidad:</strong> ${basicInfo.specialty}</p>
                    <p><strong>Linkedin:</strong> <a href="${basicInfo.linkedin}" rel="nofollow noopener" target="_blank">${basicInfo.linkedin}</a></p>
                    <p><strong>Github:</strong> <a href="${basicInfo.github}" rel="nofollow noopener" target="_blank">${basicInfo.github}</a></p>
                </div>
                <div style='margin-top: 20px;'>
                    <h3>📍 Ubicaciones</h3>
                    <ul>
                        ${basicInfo.locations.map(loc => `<li>${loc}</li>`).join('')}
                    </ul>
                </div>
                <div style='margin-top: 20px;'>
                    <h3>Skills</h3>
                    <ul>
                        ${Object.entries(this.curriculumVitae.getSkills()).map(([category, skills]) => {
                            if (!skills.length) {
                                return ``;
                            }
                            return `<li><strong>${category}</strong>: ${skills.join(', ')}</li>`
                        }).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    /**
     * Renders an error message to the target element
     *
     * @param error The error to render
     */
    renderError(error: unknown): void {
        let errorHtml = '';

        if (error instanceof Error) {
            errorHtml += `<p>${error.name}: ${error.message}</p>`;
        } else {
            errorHtml += `<p>Unknown error occurred: ${error}</p>`;
        }

        this.targetElement.innerHTML = `<div>${errorHtml}</div>`;
    }
}
