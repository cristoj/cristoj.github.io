import CVDeveloper from "@/CurriculumVitae/domain/models/CVDeveloper";
import Locations from "@/_shared/domain/Locations";
import SkillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";
import CreateCurriculumVitaeUseCase from "@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase";
import CurriculumVitaeRenderer from "@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer";
import {Portfolio} from "@/Porfolio/domain/models/Portfolio";
import {CreatePortfolioUseCase} from "@/Porfolio/application/usecases/CreatePortfolioUseCase";
import InMemoryPortfolio from "@/Porfolio/infraestructura/InMemoryPortfolio";
import InMemoryCurriculumVitae from "@/CurriculumVitae/infraestructura/InMemoryCurriculumVitae";

export async function initializeApp(): Promise<void> {
    const portFolio = new Portfolio(
        '14207ae2-0b3d-40af-a06b-07c2b5c9ceb7',
        'STIK',
        'App AI to image recognition',
        ['Angular', 'React', 'Flutter', 'Laravel'],
        'assets/images/portfolio1.jpg',
        'https://cristoj.github.io/portfolio'
    );
    const portFolioRepository = InMemoryPortfolio.getInstance();
    const portFolioUseCase = new CreatePortfolioUseCase(portFolioRepository);
    await portFolioUseCase.execute(portFolio);

    const developer = new CVDeveloper(
        '9f863328-1fb1-432e-a56b-70189492c37b',
        'Cristobal V. Terceiro <{[...]}>',
        'cristojvt@gmail.com',
        '+34697356153',
        [Locations.ACORUNA, Locations.REMOTO],
        'Desarrollador Full-Stack con especialización en Front-End y desarrollo móvil con más de 15 años de experiencia.',
        'https://www.linkedin.com/in/cristobal-terceiro/',
        'https://cristoj.github.io',
        [portFolio.getUuid()],
    );

    developer.addSkills(SkillCategories.LANGUAGES, ['html', 'css', 'js', 'ts', 'php', 'dart']);
    developer.addSkills(SkillCategories.FRAMEWORKS, ['Angular', 'React', 'Flutter', 'Laravel', 'WordPress']);
    developer.addSkills(SkillCategories.CLOUD, ['GitHub', 'AWS', 'Vercel', 'Cloudflare', 'Firebase']);
    developer.addSkills(SkillCategories.METHODOLOGIES, ['Scrum']);
    developer.addSkills(SkillCategories.TOOLS, ['Docker', 'Postman', 'Sonarqube', 'VS Code', 'PHP Storm', 'Xcode', 'Android Studio', 'XD', 'Photoshop',]);

    const cvRepository = new InMemoryCurriculumVitae();
    const cvUseCase = new CreateCurriculumVitaeUseCase(cvRepository);

    await cvUseCase.execute(developer);

    document.addEventListener('DOMContentLoaded', async  () => {
        const $app =  document.getElementById('app') ?? undefined;
        const renderer = new CurriculumVitaeRenderer(developer, $app);
        await renderer.render();
    });
}
