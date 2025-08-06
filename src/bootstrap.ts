import CVDeveloper from "@/CurriculumVitae/domain/models/CVDeveloper";
import Locations from "@/_shared/domain/Locations";
import SkillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";
import LocalStorageCurriculumVitae from "@/CurriculumVitae/infraestructura/LocalStorageCurriculumVitae";
import CreateCurriculumVitaeUseCase from "@/CurriculumVitae/application/usescases/CreateCurriculumVitaeUseCase";
import CurriculumVitaeRenderer from "@/CurriculumVitae/infraestructura/CurriculumVitaeRenderer";

export async function initializeApp(): Promise<void> {
    const developer = new CVDeveloper(
        '9f863328-1fb1-432e-a56b-70189492c37b',
        'Cristobal V. Terceiro',
        'crsitojvt@gmail.com',
        '+34697356153',
        [Locations.ACORUNA, Locations.REMOTO],
        'Desarrollador Full-Stack con especialización en Front-End y desarrollo móvil con más de 15 años de experiencia.',
        'https://www.linkedin.com/in/cristobal-terceiro/',
        'https://cristoj.github.io',
    );

    developer.addSkills(SkillCategories.LANGUAGES, ['html', 'css', 'js', 'ts', 'php', 'dart']);
    developer.addSkills(SkillCategories.FRAMEWORKS, ['Angular', 'React', 'Flutter', 'Laravel', 'WordPress']);
    developer.addSkills(SkillCategories.CLOUD, ['GitHub', 'AWS', 'Vercel', 'Cloudflare', 'Firebase']);
    developer.addSkills(SkillCategories.METHODOLOGIES, ['Scrum']);
    developer.addSkills(SkillCategories.TOOLS, ['Docker', 'Postman', 'Sonarqube', 'VS Code', 'PHP Storm', 'Xcode', 'Android Studio', 'XD', 'Photoshop',]);

    const repository = new LocalStorageCurriculumVitae();
    const useCase = new CreateCurriculumVitaeUseCase(repository);

    await useCase.execute(developer);

    document.addEventListener('DOMContentLoaded', async  () => {
        const renderer = new CurriculumVitaeRenderer(developer);
        renderer.render();
    });
}
