// ✅ Crear instancia de CV

import CVDeveloper from './models/CVDeveloper';
import Locations from './models/types/Locations';
import SkillCategories from './models/types/skill/SkillCategories';

const developer = new CVDeveloper(
    '9f863328-1fb1-432e-a56b-70189492c37b',
    'Cristobal V. Terceiro',
    'crsitojvt@gmail.com',
    '+34697356153',
    [Locations.ACORUNA, Locations.REMOTO],
    'Desarrollador Full-Stack con especialización en Front-End y desarrollo móvil con más de 15 años de experiencia.',
    'https://www.linkedin.com/in/cristobal-terceiro/',
    'https://github.com/cristobalvterceiro',
);

developer.addSkills(SkillCategories.LANGUAGES, ['html', 'css', 'js', 'ts', 'php', 'dart']);
developer.addSkills(SkillCategories.FRAMEWORKS, ['Angular', 'React', 'Flutter', 'Laravel', 'WordPress']);
developer.addSkills(SkillCategories.CLOUD, ['GitHub', 'AWS', 'Vercel', 'Cloudflare', 'Firebase']);
developer.addSkills(SkillCategories.METHODOLOGIES, ['Scrum']);
developer.addSkills(SkillCategories.TOOLS, ['Docker', 'Postman', 'Sonarqube', 'VS Code', 'PHP Storm', 'Xcode', 'Android Studio', 'XD', 'Photoshop',]);
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    body.innerHTML = `
        <div style='padding: 20px; font-family: Arial, sans-serif;'>
            <h1>🚀 Curriculum Vitae</h1>            
            <div style='margin-bottom: 20px;'>
                <p><strong>Nombre:</strong> ${developer.getBasicInfo().fullName}</p>
                <p><strong>Email:</strong> ${developer.getBasicInfo().email}</p>
                <p><strong>Teléfono:</strong> ${developer.getBasicInfo().phone}</p>
                <p><strong>Category:</strong> ${developer.getBasicInfo().jobCategories}</p>
                <p><strong>Especialidad:</strong> ${developer.getBasicInfo().specialty}</p>
            </div>
            <div style='margin-top: 20px;'>
                <h3>📍 Ubicaciones</h3>
                <ul>
                    ${developer.getBasicInfo().locations.map(loc => `<li>${loc}</li>`).join('')}
                </ul>
            </div>
            <div style='margin-top: 20px;'>
                <h3>Skills</h3>
                <ul>
                    ${Object.entries(developer.getSkills()).map(([category, skills]) => {
        if (!skills.length) {
            return ``;
        }
        return `<li><strong>${category}</strong>: ${skills.join(', ')}</li>`
    }).join('')}
                </ul>
            </div>
        </div>
    `;
});
