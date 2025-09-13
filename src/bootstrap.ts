import CreateCurriculumVitaeUseCase from "@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase";
import CurriculumVitaeRenderer from "@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer";
import InMemoryCurriculumVitae from "@/CurriculumVitae/infraestructura/InMemoryCurriculumVitae";
import AppSeeder from "@/seeder";

export async function initializeApp(): Promise<void> {
    const cvRepository = new InMemoryCurriculumVitae();
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
