import CreateCurriculumVitaeUseCase from "@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase";
import CurriculumVitaeRenderer from "@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer";
import AppSeeder from "@/seeder";
import {CurriculumVitaeFactory} from "@/CurriculumVitae/infraestructura/CurriculumVitaeFactory";

export async function initializeApp(): Promise<void> {
    const cvRepository = CurriculumVitaeFactory.create();
    const cvUseCase = new CreateCurriculumVitaeUseCase(cvRepository);
    const seeder = new AppSeeder();
    const developer = await seeder.generateCv();
    await cvUseCase.execute(developer);

    document.addEventListener('DOMContentLoaded', async () => {
        const $app = document.getElementById('app') ?? undefined;
        const renderer = new CurriculumVitaeRenderer(developer, $app);
        await renderer.render();
    });
}
