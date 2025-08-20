import ComponentDefault from "@/_shared/infraestructura/ComponentDefault";
import {Portfolio} from "@/Porfolio/domain/models/Portfolio";
import { GetPortfolioByUuidCase } from "@/Porfolio/application/usecases/GetPortfolioByUuidCase";
import InMemoryPortfolio from "@/Porfolio/infraestructura/InMemoryPortfolio";
import portfolioCss from "@/_shared/infraestructura/assets/css/imports/portfolio.css?inline";
class PortfolioComponent extends ComponentDefault {

    private portfolio: Portfolio | null = null;
    private isLoading: boolean = true;
    private error: string | null = null;

    private get uuid(): string | null {
        return this.getAttribute('uuid');
    }

    protected override async initComponent(): Promise<void> {
        if (!this.uuid) {
            this.error = "El atributo 'uuid' es requerido.";
            this.isLoading = false;
            this.render();
            return;
        }

        try {
            const getPortfolioCase = new GetPortfolioByUuidCase(InMemoryPortfolio.getInstance());
            this.portfolio = await getPortfolioCase.execute(this.uuid);
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

    protected override templateCss(): string {
        return portfolioCss;
    }
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

        return `
            <div class="portfolio">   
                <a href="${portfolioInfo.url ?? '#'}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
                    <img src="${portfolioInfo.imageUrl}" alt="${portfolioInfo.title}" class="portfolio__image d--block">
                    <h3>${portfolioInfo.title}</h3>
                </a>
                <p>${portfolioInfo.description}</p>
            </div>
        `;
    }

}
export default PortfolioComponent;
