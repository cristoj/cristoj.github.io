import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";
import {Portfolio} from "@/Porfolio/domain/models/Portfolio";
import {GetPortfolioByUuidCase} from "@/Porfolio/application/usecases/GetPortfolioByUuidCase";
import InMemoryPortfolio from "@/Porfolio/infraestructura/InMemoryPortfolio";

//  import portfolioCss from "@/_shared/infraestructura/assets/css/imports/portfolio.css?inline";
class PortfolioComponent extends ComponentDefault {
    private uuid: string | null = null;
    private portfolio: Portfolio | null = null;
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
            const getPortfolioCase = new GetPortfolioByUuidCase(InMemoryPortfolio.getInstance());
            this.portfolio = await getPortfolioCase.execute(this.uuid!);
            if (!this.portfolio) {
                this.error = 'Portfolio no encontrado.';
            }
        } catch (e) {
            this.error = 'Error al cargar el portfolio.';
            console.error(e);
        } finally {
            this.isLoading = false;
            this.render();
        }
    }

    /*
    protected override templateCss(): string {
        return portfolioCss;
    }
     */
    protected override renderTemplate(): string {
        if (this.isLoading) {
            return `<p>Cargando portfolio...</p>`;
        }

        if (this.error) {
            return `<p style="color: red;">${this.error}</p>`;
        }

        if (!this.portfolio) {
            return `<p>Portfolio no disponible.</p>`;
        }

        const portfolioInfo = this.portfolio.getBasicInfo();
        const portafolioTechnologies = this.portfolio.getTechnologies();
        // language=HTML
        return `
            <div>
                <a href="${portfolioInfo.url ?? '#'}" target="_blank" rel="noopener noreferrer">
                    <div class="portfolio-list__item__item__image"><img class="d--block" src="${portfolioInfo.imageUrl}"
                                                                        alt="${portfolioInfo.title}"></div>
                </a>
            </div>
            <div class="portfolio-list__item__content">
                <h3 class="portfolio-list__item__title">${portfolioInfo.title}</h3>
                <p class="portfolio-list__item__description">${portfolioInfo.description}</p>
                <div class="portfolio-list__item__tags">${this.renderTechnologies(portafolioTechnologies)}</div>
            </div>
        `;
    }

    private renderTechnologies(technologies: string[]): string {
        return technologies.map(tech => `<span class="tag tag--outline--primary">${tech}</span>`).join('');
    }


}

export default PortfolioComponent;
