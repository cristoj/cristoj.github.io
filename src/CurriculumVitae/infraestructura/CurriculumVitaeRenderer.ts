import CVDeveloper from "@/CurriculumVitae/domain/models/CVDeveloper";
import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import PortfolioComponent from "@/Porfolio/infraestructura/components/PortfolioComponent";

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
    async render(): Promise<void> {
        window.customElements.define('portfolio-item', PortfolioComponent);

        const basicInfo = this.curriculumVitae.getBasicInfo();
        const skills = this.curriculumVitae.getSkills();
        const portfolioUuids = this.curriculumVitae.hasPortfolio() ? this.curriculumVitae.getPortfolioUuids() : [];
        this.targetElement.innerHTML = `
            <div class="mt--2">
                <h1>${basicInfo.fullName}</h1>            
                <div class="mt--2">
                    <p><strong>Email:</strong> ${basicInfo.email}</p>
                    <p><strong>Teléfono:</strong> ${basicInfo.phone}</p>
                    <p><strong>Category:</strong> ${basicInfo.jobCategories}</p>
                    <p><strong>Especialidad:</strong> ${basicInfo.specialty}</p>
                    <p><strong>Linkedin:</strong> <a href="${basicInfo.linkedin}" rel="nofollow noopener" target="_blank">${basicInfo.linkedin}</a></p>
                    <p><strong>Github:</strong> <a href="${basicInfo.github}" rel="nofollow noopener" target="_blank">${basicInfo.github}</a></p>
                </div>
                <div class="mt--2">
                    <h3>Ubicaciones</h3>
                    <ul class="list--unstyled">
                        ${basicInfo.locations.map(loc => `<li>${loc}</li>`).join('')}
                    </ul>
                </div>
                <div class="mt--2">
                    <h3>Skills</h3>
                    <ul class="list--unstyled">
                        ${Object.entries(skills).map(([category, skills]) => {
                            if (!skills.length) {
                                return ``;
                            }
                            return `<li><strong>${category}</strong>: ${skills.join(', ')}</li>`
                        }).join('')}
                    </ul>
                </div>
                ${portfolioUuids && portfolioUuids.length > 0 ?
                    `<div class="mt--2">
                            <h3>Portfolio</h3>
                            <ul class="list--unstyled">
                                ${portfolioUuids.map(uuid => 
                                    `<portfolio-item uuid="${uuid}"></portfolio-item>`
                                ).join('')}
                            </ul>
                    </div>` : ''}
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
