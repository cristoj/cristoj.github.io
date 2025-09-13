import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";
import PortfolioComponent from "@/Porfolio/infraestructura/components/PortfolioComponent";

//  import portfolioListCss from "@/_shared/infraestructura/assets/css/imports/portfolio-list.css?inline";

class PortfolioSectionComponent extends ComponentDefault {

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

    /*
    protected override templateCss(): string {
        return portfolioListCss;
    }
    */
    protected override renderTemplate(): string {
        if (this.error) {
            return `<p style="color: red;">${this.error}</p>`;
        }
        if (!window.customElements.get('portfolio-item')) {
            window.customElements.define('portfolio-item', PortfolioComponent);
        }
        // language=HTML
        return `
            <section
                    class="mt--2 portafolio"
                    id="portfolio"
            >
                <h2 class="text-lg-center">Algunos proyectos</h2>
                <div class="portafolio-list">
                    ${this.uuids.map(uuid =>
                            `<portfolio-item class="portfolio-list__item" uuid="${uuid}"></portfolio-item>`
                    ).join('')}
                </div>
            </section>`;
    }


}

export default PortfolioSectionComponent;
