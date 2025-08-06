export default class CurriculumVitaeErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CurriculumVitaeErrors';
    }
}
