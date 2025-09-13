class ComponentDefault extends HTMLElement {

    constructor() {
        super();
        // not use shadowDom, it's too complex
        //  this.attachShadow({mode: 'open'});
    }

    disconnectedCallback() {
        this.remove();
    }

    connectedCallback() {
        this.initComponent();
    }

    protected render() {
        // not use shadowDom, it's too complex
        /*
        this.shadowRoot ? this.shadowRoot.innerHTML = `
           <style>

                ${this.templateCss()}
           </style>
           ${this.renderTemplate()}
       ` : null;
       */
        this.innerHTML = `
           <style>                
                ${this.templateCss()}
           </style>
           ${this.renderTemplate()}
        `;
    }

    protected mapComponentAttributes() {
    }

    protected templateCss(): string {
        return '';
    }

    protected renderTemplate(): string {
        return '';
    }

    protected initComponent(): void {
    }
}

export default ComponentDefault;
