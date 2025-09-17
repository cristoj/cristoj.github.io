import CVDeveloper from "@/CurriculumVitae/domain/models/CVDeveloper";
import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import {Portfolio} from "@/Porfolio/domain/models/Portfolio";
import InMemoryPortfolio from "@/Porfolio/infraestructura/InMemoryPortfolio";
import {CreatePortfolioUseCase} from "@/Porfolio/application/usecases/CreatePortfolioUseCase";
import {Training} from "@/Training/domain/models/Training";
import {CreateTrainingUseCase} from "@/Training/application/usecases/CreateTrainingUseCase";
import InMemoryTraining from "@/Training/infraestructura/InMemoryTraining";
import Locations from "@/_shared/domain/Locations";
import SkillCategories from "@/CurriculumVitae/domain/value-objects/skill/SkillCategories";
import {Experience} from "@/Experience/domain/models/Experience";
import InMemoryExperience from "@/Experience/infraestructura/InMemoryExperience";
import {CreateExperienceUseCase} from "@/Experience/application/usecases/CreateExperienceUseCase";

class AppSeeder {

    async generateCv() : Promise<CurriculumVitae>{
        const portFolioListUuids = await this.generatePortfolioUuids();
        const trainingsListUuids = await this.generateTrainingUuids();
        const experienceListUuids = await this.generateExperienceUuids();
        const developer = new CVDeveloper(
            '9f863328-1fb1-432e-a56b-70189492c37b',
            'Cristobal Terceiro',
            'cristojvt@gmail.com',
            '+34697356153',
            [Locations.ACORUNA, Locations.REMOTO],
            'Desarrollador Full-Stack con más de 15 años de experiencia en Front-End | Back-End | Mobile',
            'https://www.linkedin.com/in/cristobal-terceiro',
            'https://github.com/cristoj',
            portFolioListUuids,
            trainingsListUuids,
            experienceListUuids
        );

        developer.addSkills(SkillCategories.LANGUAGES, ['html', 'css', 'js', 'ts', 'php', 'dart', 'mysql']);
        developer.addSkills(SkillCategories.FRAMEWORKS, ['Angular', 'React', 'Flutter', 'Laravel', 'WordPress', 'Astro']);
        developer.addSkills(SkillCategories.TOOLS, ['Docker', 'Postman', 'SonarQube', 'VS Code', 'PHP Storm', 'Xcode', 'A. Studio', 'XD', 'Photoshop',]);
        developer.addSkills(SkillCategories.CLOUD, ['GitHub', 'AWS', 'Vercel', 'Cloudflare', 'Firebase', 'Mailchimp', 'Apps Stores']);
        developer.addSkills(SkillCategories.METHODOLOGIES, ['Scrum']);
        developer.addSkills(SkillCategories.OTHERS, ['Emprendimiento', 'Trabajo en equipo', 'Ganas de aprender', 'Resolución de problemas']);
        return developer;
     }

    private async  generatePortfolioUuids (): Promise<string[]> {
        const portFolioList: Portfolio[] = [
            new Portfolio(
                '14207ae2-0b3d-40af-a06b-07c2b5c9ceb7',
                'STIK',
                'SaaS de CX con uso de reconocimiento de imagen. Desarrollo de panel de administración, panel de clientes, webs corporativas y app móvil. Proyecto galardonado en eventos de innovación.',
                ['Angular', 'React', 'Flutter', 'Laravel', 'Astro', 'AWS', 'Cloudflare', 'Firebase'],
                'assets/images/portfolio/stik.webp',
                'https://www.stik.world'
            ),
            new Portfolio(
                '15a3c319-abf7-4b44-b5c9-78d2ce000576',
                'CEOENet',
                'Intranet de CEOE para sus asociados. Desarrollo de panel de clientes y app móvil y encargado técnico. Gran responsabilidad. Las empresas más importantes del país son usuarios recurrentes.',
                ['Angular', 'Flutter', 'AWS', 'Firebase'],
                'assets/images/portfolio/ceoenet.webp',
                'https://ceoe.net'
            ),
            new Portfolio(
                '87cb94cd-a6c7-4789-9be1-a9f8a5543eaa',
                'Fundación CEOE',
                'Desarrollo de la web corporativa de la Fundación CEOE, una plataforma de alto perfil para una de las entidades más influyentes del país. Fui responsable de la ejecución y la calidad del proyecto, asegurando que la plataforma cumpliera con las altas expectativas.',
                ['WordPress'],
                'assets/images/portfolio/fundacion-ceoe.webp',
                'https://www.fundacionceoe.es/'
            ),
            new Portfolio(
                '2dab667a-0385-41a7-abd9-6834c83f7ff8',
                'CEPYME500',
                'Proyecto Empresarial con las 500 pymes con mayor crecimiento del año. Web corporativa, panel de usuarios y aplicación móvil. Proyecto con grandes cantidades de datos financieros en su base de datos.',
                ['Angular', 'Flutter', 'Stripe', 'AWS'],
                'assets/images/portfolio/cepyme500.webp',
                'https://www.cepyme500.es'
            ),
            new Portfolio(
                '0187f894-eda7-48ec-9e0a-c72688314b1d',
                'Juntos Separamos',
                'Proyecto web para la Diputación de Ourense. Desarrollo de un panel de gestión de residuos de la provincia, contribuyendo al avance de la economía circular.',
                ['Angular', 'laravel'],
                'assets/images/portfolio/juntosseparamos.webp',
                'https://juntosseparamos.depourense.es'
            ),
            new Portfolio(
                'db7378b4-5ef1-46bb-abdb-1cea6963da6b',
                'Rec Parenting',
                'Plataforma para psicólogos con web corporativa y app móvil, pagos, videoconferencias y panel de control de citas. Responsable técnico del proyecto, liderado por Ana Aznar y Alejandro Agag.',
                ['Angular', 'Flutter', 'Wordpress', 'Stripe', 'AWS'],
                'assets/images/portfolio/recparenting.webp',
                'https://www.recparenting.com'
            ),
            new Portfolio(
                '8627492d-59c9-4296-8484-bf058a840e51',
                'CEOETech',
                'Intranet de CEOE para sus asociados. Desarrollo de panel de clientes y app móvil y encargado técnico. Gran responsabilidad. Las empresas más importantes del país son usuarios recurrentes.',
                ['Laravel', 'Stripe', 'AWS'],
                'assets/images/portfolio/ceoetech.webp',
                'https://ceoe.tech'
            ),
            new Portfolio(
                '5938e62e-b521-41b5-be88-291a706cd716',
                'Podoclínica',
                'ERP clínica podológica. Panel de administración vía plataforma web con reservas de citas. Reto personal, ya que me enfrenté yo sólo a este proyecto, consiguiendo los hitos marcados.',
                ['Laravel', 'AWS'],
                'assets/images/portfolio/podoclinicacoruna.webp',
                'https://gestion.podoclinicacoruna.es'
            ),
        ];
        const portFolioRepository = InMemoryPortfolio.getInstance();
        const portFolioUseCase = new CreatePortfolioUseCase(portFolioRepository);
        return await Promise.all(
            portFolioList.map(async (portFolio) => {
                await portFolioUseCase.execute(portFolio);
                return portFolio.getUuid();
            }));
    }
    private async generateTrainingUuids(): Promise<string[]> {
        const trainingsList: Training[] = [
            new Training(
                '140dea6b-cee9-427d-9ffd-b37d22a08491',
                'Emprendimiento y Startups',
                'ISDI | EOI',
                'Online',
                '2025',
            ),
            new Training(
                '15cb64ec-a90d-48a0-a843-bda67295a34d',
                'AWS Developer',
                'CNTG',
                'Online',
                '2024',
            ),
            new Training(
                '10e3df13-f7e1-44e7-8ea4-bb0194966652',
                'Grado Ingeniería Informática',
                'UNED',
                'Online',
                '2024',
                '~'
            ),
            new Training(
                '6ebf2c71-4ee4-4e25-99e2-1e3d6bf06611',
                'SCRUM Master',
                'Scrum.org',
                'Online',
                '2020',
                null
            ),
            new Training(
                '9a790036-0730-412e-9d63-87e3e3b14dac',
                'AWS Solution Architect',
                'CNTG',
                'Online',
                '2015',
                '2016'
            ),
            new Training(
                '190ce9a0-d400-42e6-a8fd-260613be9543',
                'Técnico Superior en desarrollo de Aplicaciones Web',
                'FP Fernando Wirtz',
                'A Coruña',
                '2012',
                '2013'
            ),
            new Training(
                '850bfab6-958d-429c-8a62-517545962552',
                'CORE Fundamentos de un proyecto TI',
                'EUCIP',
                'Online',
                '2011',
                null
            ),
            new Training(
                '9b786f3d-4d9d-4746-9532-4d55f33e48d9',
                'Recursos y lenguajes entornos WEB',
                'UNED',
                'Online',
                '2011',
                null
            ),
        ];
        const trainingsRepository = InMemoryTraining.getInstance();
        const trainingsUseCase = new CreateTrainingUseCase(trainingsRepository);
        return await Promise.all(
            trainingsList.map(async (training) => {
                await trainingsUseCase.execute(training);
                return training.getUuid();
            }));
    }
    private async generateExperienceUuids(): Promise<string[]> {
        const experienceList: Experience[] = [
            new Experience(
                '6c18232b-fc61-46f0-b11f-7b5ba91dfe54',
                'STIK',
                'Startup con producto propio. Red social + plataforma de CX basada en productos con tecnología de IA+RI.',
                'CIO & desarrollador Front-End y móvil en coordinación con el equipo Back-End. Aporté mi conocimiento en emprendimiento y desarrollo miento, logrando la certificación ENISA-Startup y más de 300k€ en recursos de programas de AWS, Google, Nvidia, etc.',
                '2024/~',
                'logo_stik.webp'
            ),
            new Experience(
                '20922240-dbb0-43b1-b589-6d614fe3076e',
                'UPMEDIA',
                'Consultora tecnológica y agencia de comunicación.',
                'Desarrollo Full-Stack y móvil para diferentes clientes (CEPYME, CEOE, Cafés Siboney, Central Lechera Asturiana, Ecoembes, etc.). Fui responsable de la implementación de la base tecnológica y la innovación, asegurando que los proyectos estuvieran a la vanguardia. Lideré la obtención del certificado ISO9001, apoyado por una empresa certificadora.',
                '2016/2024',
                'logo_upmedia.webp'
            ),
            new Experience(
                'b69494d5-92ee-45f5-809c-76948d5f3fe1',
                'Trocobuy',
                'Portal web de intercambio de productos y servicios empresariales.',
                'Desarrollo FrontEnd de la parte privada del portal. No sólo ayudé a mejorar la interfaz de la plataforma, además gracias\n' +
                'a mis recomendaciones en cuanto a publicidad online mejoramos un 40% la consecución de leads de nuevos usuarios.',
                '2011/2016',
                'logo_trocobuy.webp'
            ),
            new Experience(
                'a916ece1-bcc5-41f7-93b6-fa41ff69cc2b',
                'Iberfinancia',
                'Agencia de financiación privada.',
                'Agencia de financiación privada. Lideré al poco tiempo uno de los servicios principales de la empresa, SearchTask, email-marketing para los clientes, con envío de millones de emails al mes.',
                '2009/2011',
                'logo_iberfinancia.webp'
            )
        ]
        const experienceRepository = InMemoryExperience.getInstance();
        const experienceUseCase = new CreateExperienceUseCase(experienceRepository);
        return await Promise.all(
            experienceList.map( async (experience) => {
                await experienceUseCase.execute(experience);
                return experience.getUuid();
            }));
    }
}

export default AppSeeder;
