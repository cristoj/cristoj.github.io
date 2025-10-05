import CVDeveloper from "@/CurriculumVitae/domain/models/CVDeveloper";
import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import skillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";
import SkillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";
import PortfolioSectionComponent from "@/Portfolio/infraestructura/components/PortfolioSectionComponent";
import TrainingSectionComponent from "@/Training/infraestructura/components/TrainingSectionComponent";
import ExperienceSectionComponent from "@/Experience/infraestructura/components/ExperienceSectionComponent";
import {HeaderComponent} from "@/_shared/infraestructura/components/HeaderComponent";
import CurriculumVitaeSchemaComponent from "@/_shared/infraestructura/components/CurriculumVitaeSchemaComponent";

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
        if (!window.customElements.get('portfolio-section')) {
            window.customElements.define('portfolio-section', PortfolioSectionComponent);
        }

        if (!window.customElements.get('training-section')) {
            window.customElements.define('training-section', TrainingSectionComponent);
        }

        if (!window.customElements.get('experience-section')) {
            window.customElements.define('experience-section', ExperienceSectionComponent);
        }

        if (!window.customElements.get('header-app')) {
            window.customElements.define('header-app', HeaderComponent);
        }

        if (!window.customElements.get('schema-component')) {
            window.customElements.define('schema-component', CurriculumVitaeSchemaComponent);
        }

        const basicInfo = this.curriculumVitae.getBasicInfo();
        const skills = this.curriculumVitae.getSkills();
        const portfolioUuids: string[] | null = this.curriculumVitae.hasPortfolio() ? this.curriculumVitae.getPortfolioUuids() : [];
        const trainingUuids: string[] | null = this.curriculumVitae.hasTraining() ? this.curriculumVitae.getTrainingUuids() : [];
        const experienceUuids: string[] | null = this.curriculumVitae.hasExperience() ? this.curriculumVitae.getExperienceUuids() : [];
        // language=HTML
        this.targetElement.innerHTML = `
            <div class="">
                <header-app
                        portfolioUuids="${portfolioUuids}"
                        trainingUuids="${trainingUuids}"
                        experienceUuids="${experienceUuids}"
                >
                </header-app>
                <section
                        class="height-lg-100 height-lg-100--no-menu mt-sm--5 personal-data"
                        id="profile"
                >
                    <h1 class="">${basicInfo.fullName}</h1>
                    <div class="mt--1">
                        <p>${basicInfo.specialty}</p>
                        <div class="personal-data__basic">
                            <div>
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px">
                                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
                                </svg>
                                ${basicInfo.email}
                            </div>
                            <div>
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px">
                                    <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                                </svg>
                                ${basicInfo.phone}
                            </div>
                            <div>
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px">
                                    <path d="m489-460 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104Zm19 260h224q-7 26-24 42t-44 20L228-85q-33 5-59.5-15.5T138-154L85-591q-4-33 16-59t53-30l46-6v80l-36 5 54 437 290-36Zm-148-80q-33 0-56.5-23.5T280-360v-440q0-33 23.5-56.5T360-880h440q33 0 56.5 23.5T880-800v440q0 33-23.5 56.5T800-280H360Zm0-80h440v-440H360v440Zm220-220ZM218-164Z"/>
                                </svg>
                                ${basicInfo.jobCategories}
                            </div>
                            <div class="personal-data__basic__location">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px">
                                    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                                </svg>
                                <ul class="list--unstyled personal-data__basic__list">
                                    ${basicInfo.locations.map(loc => `<li>${loc}</li>`).join('')}
                                </ul>
                            </div>
                        </div>

                        <div class="mt--1 d--flex justify-content--center gap--2">
                            <div>
                                <svg class="icon icon--primary" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                    <path d="M173.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM252.8 8c-138.7 0-244.8 105.3-244.8 244 0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1 100-33.2 167.8-128.1 167.8-239 0-138.7-112.5-244-251.2-244zM105.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9s4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                                </svg>
                                <a href="${basicInfo.github}" rel="nofollow noopener"
                                   target="_blank">${basicInfo.github.split('/').pop()}</a>
                            </div>
                            <div>
                                <svg class="icon icon--primary" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                    <path d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"/>
                                </svg>
                                <a href="${basicInfo.linkedin}" rel="nofollow noopener"
                                   target="_blank">${basicInfo.linkedin.split('/').pop()}</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                        class="py-lg-6 pt--6 content-visibility--auto"
                        id="about"
                >
                    <div class="about mt-sm--1">
                        <div class="about__image">
                            <svg class="" xmlns="http://www.w3.org/2000/svg" height="20px"
                                 viewBox="0 -960 960 960" width="24px">
                                <path d="m499-287 335-335-52-52-335 335 52 52Zm-261 87q-100-5-149-42T40-349q0-65 53.5-105.5T242-503q39-3 58.5-12.5T320-542q0-26-29.5-39T193-600l7-80q103 8 151.5 41.5T400-542q0 53-38.5 83T248-423q-64 5-96 23.5T120-349q0 35 28 50.5t94 18.5l-4 80Zm280 7L353-358l382-382q20-20 47.5-20t47.5 20l70 70q20 20 20 47.5T900-575L518-193Zm-159 33q-17 4-30-9t-9-30l33-159 165 165-159 33Z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Sobre mí</h2>
                            <p>Me considero un profesional responsable y organizado que asume los retos como una
                                oportunidad para aprender y crecer. Este enfoque lo apliqué en mi último proyecto, la
                                startup STIK, donde no solo me enfrenté a desafíos técnicos, sino que también aporté mi
                                formación en emprendimiento para impulsar el proyecto.
                            <p>
                            <p>Como desarrollador Full-Stack, mi experiencia incluye la gestión de proyectos end-to-end
                                y la coordinación directa con clientes de alto perfil (como CEOE, CEPYME, Diputación de
                                Ourense, Ecoembes, CLA, etc...), asegurando la correcta definición de los requisitos y
                                una comunicación fluida.</p>
                            <p>Algunos logros incluyen:</p>
                            <ul class="about__list">
                                <li> Liderar la obtención de la certificación ISO 9001, demostrando mi compromiso con la
                                    calidad y los procesos.
                                </li>
                                <li> Aportar conocimientos de emprendimiento que resultaron en la consecución de más de
                                    300k€ en recursos para el proyecto STIK.
                                </li>
                                <li> Mejorar el rendimiento web de clientes por encima del 90% con tecnologías como
                                    Astro.
                                </li>
                                <li>Impulsé la migración tecnológica móvil de la organización desde IONIC a Flutter,
                                    consiguiendo un beneficio tangible en rendimiento, productividad y usabilidad en las
                                    aplicaciones desarrolladas.
                                </li>
                            </ul>
                            <p> Estoy en constante búsqueda de nuevos desafíos que me permitan seguir creciendo
                                profesional y personalmente.</p>
                        </div>
                    </div>
                </section>
                <section
                        class="show-reveal height-lg-100 py-sm--5 content-visibility--auto"
                        id="skills"
                >
                    <div class="skills mt-sm--1">
                        <div>
                            <svg class="skills__image" xmlns="http://www.w3.org/2000/svg" height="24px"
                                 viewBox="0 -960 960 960" width="24px">
                                <path d="m480-336 128-184H494l80-280H360v320h120v144ZM400-80v-320H280v-480h400l-80 280h160L400-80Zm80-400H360h120Z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Skills</h2>
                            <dl class="skills__list">
                                ${Object.entries(skills).map(([category, skills]) => {
                                    if (!skills.length || [SkillCategories.PATRONS_DESIGN.toString(), skillCategories.CODE_QUALITY.toString()].includes(category)) {
                                        return ``;
                                    }
                                    return `<dt class="mt--1"><strong>${category}</strong></dt><dd>${this.renderTags(skills)}</dd></dt>`
                                }).join('')}
                            </dl>
                        </div>
                    </div>
                </section>

                ${portfolioUuids && portfolioUuids.length > 0
                        ? `<portfolio-section uuids="${portfolioUuids}"></portfolio-section>`
                        : ''}

                ${experienceUuids && experienceUuids.length > 0
                        ? `<experience-section uuids="${experienceUuids}"></experience-section>`
                        : ''}

                ${trainingUuids && trainingUuids.length > 0
                        ? `<training-section uuids="${trainingUuids}"></training-section>`
                        : ''}
            </div>
            <schema-component
                    uuid="${this.curriculumVitae.getUuid()}"
                    basicInfo='${JSON.stringify(basicInfo)}'
                    skills='${JSON.stringify(skills)}'
            ></schema-component>
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

    renderTags(tags: string[]): string {
        return tags.map(tag => `<span class="tag tag--outline--primary">${tag}</span>`).join('');
    }

}
