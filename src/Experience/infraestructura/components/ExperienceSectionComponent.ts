import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";
import ExperienceComponent from "@/Experience/infraestructura/components/ExperienceComponent";

class ExperienceSectionComponent extends ComponentDefault {
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
    if (!window.customElements.get('experience-item')) {
      window.customElements.define('experience-item', ExperienceComponent);
    }
    return `
      <section class="mt--2 experience height-lg-100" id="experience">
        <h2 class="text-lg-center">Experiencia</h2>
        <div class="experience-list">
          ${this.uuids.map(uuid => `<experience-item class="experience__item" uuid="${uuid}"></experience-item>`).join('')}
        </div>
      </section>
    `;
  }
}

export default ExperienceSectionComponent;
