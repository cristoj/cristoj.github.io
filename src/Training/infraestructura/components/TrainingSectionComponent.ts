import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";
import TrainingComponent from "@/Training/infraestructura/components/TrainingComponent";

class TrainingSectionComponent extends ComponentDefault {
    private error: string | null = null;
    private uuids: string[] = [];

    private get uuidsFromElement(): string[] {
        this.uuids = this.getAttribute('uuids')?.split(',') ?? [];
        return this.uuids;
    }

    protected override async initComponent(): Promise<void> {
        if (!this.uuidsFromElement) {
            this.error = "El atributo 'uuids' es requerido.";
            this.render();
            return;
        }
        this.render();
    }

    protected override renderTemplate(): string {
        if (this.error) {
            return `<p style="color: red;">${this.error}</p>`;
        }
        if (!window.customElements.get('training-item')) {
            window.customElements.define('training-item', TrainingComponent);
        }
        // language=HTML
        return `
            <section
                    class="mt--2 py-sm--5 training height-lg-100 content-visibility--auto"
                    id="training"
            >
                <div class="">
                    <h2 class="text-lg-center">Formación</h2>
                    <div class="training-list">
                        ${this.uuids.map(uuid => `<training-item class="training-list__item" uuid="${uuid}"></training-item>`).join('')}
                    </div>
                </div>
            </section>`;
    }
}

export default TrainingSectionComponent;
