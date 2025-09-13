import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";
import {Training} from "@/Training/domain/models/Training";
import {GetTrainingByUuidCase} from "@/Training/application/usecases/GetTrainingByUuidCase";
import InMemoryTraining from "@/Training/infraestructura/InMemoryTraining";

class TrainingComponent extends ComponentDefault {
    private uuid: string | null = null;
    private training: Training | null = null;
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
            const getTrainingCase = new GetTrainingByUuidCase(InMemoryTraining.getInstance());
            this.training = await getTrainingCase.execute(this.uuid!);
            if (!this.training) {
                this.error = 'Training no encontrado.';
            }
        } catch (e) {
            this.error = 'Error al cargar el training.';
            console.error(e);
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    protected override renderTemplate(): string {
        if (this.isLoading) {
            return `<p>Cargando training...</p>`;
        }
        if (this.error) {
            return `<p style="color: red;">${this.error}</p>`;
        }
        if (!this.training) {
            return `<p>Training no disponible.</p>`;
        }

        const info = this.training.getBasicInfo();
        // language=HTML
        return `
            <div class="training__item">
                <h3 class="training__item__title">${info.title}</h3>
                <div class="training__item__content">
                    <div class="training__item__description">${info.description}</div>
                    <div class="training__item__dates">${info.date_from} ${info.date_to ? ' / ' : ''} ${info.date_to ?? ''}</div>
                </div>
            </div>
        `;
    }
}

export default TrainingComponent;
