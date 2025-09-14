import {BasicInfo} from "@/CurriculumVitae/domain/value-objects/BasicInfo";
import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";

/**
 * Component responsible for generating Schema.org JSON-LD markup for a Curriculum Vitae
 */
class CurriculumVitaeSchemaComponent extends ComponentDefault {
    private uuid: string | null = '';
    private basicInfo: BasicInfo | null = null;
    private skills: string | null = '';

    private getDataCVFromElement(): void {
        this.uuid = this.getAttribute('uuid');
        this.basicInfo = JSON.parse(this.getAttribute('basicInfo') ?? '') ;
        this.skills = Object.values(JSON.parse(this.getAttribute('skills') ?? '')).flat().join(', ');
    }

    protected override initComponent(): void {
        this.getDataCVFromElement();
        this.injectIntoHead();
        this.render();
    }

    /**
     * Generates the Schema.org Person JSON-LD object
     */
    private generatePersonSchema(): object {
        if (!this.uuid || !this.basicInfo || !this.skills) {
            return {};
        }

        return {
            "@context": "https://schema.org/",
            "@type": "Person",
            "name": this.basicInfo.fullName,
            "email": `${this.basicInfo.email}`,
            "telephone": this.basicInfo.phone,
            "jobTitle": this.basicInfo.specialty,
            "sameAs": [
                this.basicInfo.linkedin,
                this.basicInfo.github
            ],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": this.basicInfo.locations.join(', ')
            },
            "knowsAbout": this.skills,
            "url": this.basicInfo.github,
            "identifier": {
                "@type": "PropertyValue",
                "name": "UUID",
                "value": this.uuid
            }
        };
    }

    /**
     * Generates the JSON-LD script tag content
     */
    generateScriptTag(): string {
        const schema = this.generatePersonSchema();
        return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
    }

    /**
     * Injects the schema into the document head
     */
    injectIntoHead(): void {
        // Remove existing schema if present
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Create and inject new schema
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(this.generatePersonSchema(), null, 2);
        document.head.appendChild(script);
    }

}

export default CurriculumVitaeSchemaComponent;
