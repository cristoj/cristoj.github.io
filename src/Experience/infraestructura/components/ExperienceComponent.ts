import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";
import {Experience} from "@/Experience/domain/models/Experience";
import {GetExperienceByUuidCase} from "@/Experience/application/usecases/GetExperienceByUuidCase";
import InMemoryExperience from "@/Experience/infraestructura/InMemoryExperience";

class ExperienceComponent extends ComponentDefault {
    private uuid: string | null = null;
    private experience: Experience | null = null;
    private isLoading: boolean = true;
    private error: string | null = null;

    private get uuidFromElement(): string | null {
        this.uuid = this.getAttribute('uuid');
        return this.uuid;
    }

    protected override async initComponent(): Promise<void> {
        if (!this.uuidFromElement) {
            this.error = "El atributo 'uuid' es requerido.";
            this.isLoading = false;
            this.render();
            return;
        }

        try {
            const getCase = new GetExperienceByUuidCase(InMemoryExperience.getInstance());
            this.experience = await getCase.execute(this.uuid!);
            if (!this.experience) {
                this.error = 'Experience no encontrado.';
            }
        } catch (e) {
            this.error = 'Error al cargar la experience.';
            console.error(e);
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    protected override renderTemplate(): string {
        if (this.isLoading) {
            return `<p>Cargando experience...</p>`;
        }

        if (this.error) {
            return `<p style="color: red;">${this.error}</p>`;
        }

        if (!this.experience) {
            return `<p>Experience no disponible.</p>`;
        }

        const info = this.experience;
        // language=HTML
        return `
            <div class="experience__item__content">
                <div class="experience__item__header">
                    <div class="experience__item__header__image-title">
                        <img class="experience__item__image ${info.getTitle() === 'STIK' ? 'experience__item__image--stik' : ''}"
                             src="assets/images/experience/${info.getLogoPath()}"
                             alt="Logo de ${info.getTitle()}">
                        <h3 class="experience__item__title">${info.getTitle()}</h3>
                    </div>
                    <div class="experience__item__date">${info.getDate()}</div>
                </div>
                <div class="experience__item__description">${info.getDescription()}</div>
                <div class="experience__item__skills">${info.getSkills()}</div>
            </div>
        `;
    }
}

export default ExperienceComponent;
