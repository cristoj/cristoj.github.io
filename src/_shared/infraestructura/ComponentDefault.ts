import utilities from '@/_shared/infraestructura/assets/css/imports/utilities.css?inline';
class ComponentDefault extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    disconnectedCallback() {
        this.remove();
    }

    connectedCallback() {
        this.initComponent();
        this.render();
    }

    protected render() {
        this.shadowRoot ? this.shadowRoot.innerHTML = `
           <style>
                ${utilities}
                ${this.templateCss()}
           </style>
           ${this.renderTemplate()}
       ` : null;
    }

    protected mapComponentAttributes() {
    }

    protected templateCss(): string {
        return '';
    }

    protected renderTemplate(): string {
        return 'Portfolio ITEM';
    }

    protected initComponent(): void {
    }
}

export default ComponentDefault;
