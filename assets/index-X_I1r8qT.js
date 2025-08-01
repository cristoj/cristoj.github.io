(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();var t=(e=>(e.LANGUAGES="Lenguajes",e.FRAMEWORKS="Frameworks",e.TOOLS="Herramientas",e.METHODOLOGIES="Metodologías",e.CLOUD="Cloud/DevOps",e.SOFT_SKILLS="Habilidades Blandas",e))(t||{}),c=(e=>(e.ACORUNA="A Coruña",e.MADRID="Madrid",e.REMOTO="Remoto",e))(c||{}),h=(e=>(e.DEVELOPER="Developer",e.DESIGNER="Designer",e.PROJECT_MANAGER="Project Manager",e.DATA_ANALYST="Data Analyst",e.MARKETING="Marketing",e.SALES="Sales",e.HR="Human Resources",e.QA_TESTER="QA Tester",e.OTHER="Other",e))(h||{});class O{constructor(i,o,l,r,s=[c.REMOTO],a,d,u,p=h.OTHER){this.uuid=i,this.fullName=o,this.email=l,this.phone=r,this.locations=s,this.specialty=a,this.linkedin=d,this.github=u,this.jobCategories=p,this.skillSet={[t.LANGUAGES]:[],[t.FRAMEWORKS]:[],[t.TOOLS]:[],[t.METHODOLOGIES]:[],[t.CLOUD]:[],[t.SOFT_SKILLS]:[]}}}class S extends O{constructor(i,o,l,r,s=[c.REMOTO],a,d,u,p=h.OTHER){super(i,o,l,r,s,a,d,u,p)}addSkill(i,o){this.skillSet[i].length&&this.skillSet[i].includes(o)||this.skillSet[i].push(o)}addSkills(i,o){o.forEach(l=>{this.addSkill(i,l)})}getSkills(){return{[t.LANGUAGES]:this.skillSet[t.LANGUAGES],[t.FRAMEWORKS]:this.skillSet[t.FRAMEWORKS],[t.TOOLS]:this.skillSet[t.TOOLS],[t.METHODOLOGIES]:this.skillSet[t.METHODOLOGIES],[t.CLOUD]:this.skillSet[t.CLOUD],[t.SOFT_SKILLS]:this.skillSet[t.SOFT_SKILLS]}}getBasicInfo(){return{fullName:this.fullName,email:this.email,phone:this.phonePrettyPrint(this.phone),locations:this.locations,specialty:this.specialty,linkedin:this.linkedin,github:this.github,jobCategories:this.jobCategories}}addExperience(){}phonePrettyPrint(i){return i.replace(/(.{3})/g,"$1 ").trim()}}class f extends S{constructor(i,o,l,r,s=[c.REMOTO],a,d,u){super(i,o,l,r,s,a,d,u,h.DEVELOPER)}}const n=new f("9f863328-1fb1-432e-a56b-70189492c37b","Cristobal V. Terceiro","crsitojvt@gmail.com","+34697356153",[c.ACORUNA,c.REMOTO],"Desarrollador Full-Stack con especialización en Front-End y desarrollo móvil con más de 15 años de experiencia.","https://www.linkedin.com/in/cristobal-terceiro/","https://cristoj.github.io");n.addSkills(t.LANGUAGES,["html","css","js","ts","php","dart"]);n.addSkills(t.FRAMEWORKS,["Angular","React","Flutter","Laravel","WordPress"]);n.addSkills(t.CLOUD,["GitHub","AWS","Vercel","Cloudflare","Firebase"]);n.addSkills(t.METHODOLOGIES,["Scrum"]);n.addSkills(t.TOOLS,["Docker","Postman","Sonarqube","VS Code","PHP Storm","Xcode","Android Studio","XD","Photoshop"]);document.addEventListener("DOMContentLoaded",()=>{const e=document.body;e.innerHTML=`
        <div style='padding: 20px; font-family: Arial, sans-serif;'>
            <h1>🚀 Curriculum Vitae</h1>            
            <div style='margin-bottom: 20px;'>
                <p><strong>Nombre:</strong> ${n.getBasicInfo().fullName}</p>
                <p><strong>Email:</strong> ${n.getBasicInfo().email}</p>
                <p><strong>Teléfono:</strong> ${n.getBasicInfo().phone}</p>
                <p><strong>Category:</strong> ${n.getBasicInfo().jobCategories}</p>
                <p><strong>Especialidad:</strong> ${n.getBasicInfo().specialty}</p>
                <p><strong>Linkedin:</strong> <a href="${n.getBasicInfo().linkedin}" rel="nofollow noopener" target="_blank">${n.getBasicInfo().linkedin}</a></p>
                <p><strong>Github:</strong> <a href="${n.getBasicInfo().github}" rel="nofollow noopener" target="_blank">${n.getBasicInfo().github}</a></p>
            </div>
            <div style='margin-top: 20px;'>
                <h3>📍 Ubicaciones</h3>
                <ul>
                    ${n.getBasicInfo().locations.map(i=>`<li>${i}</li>`).join("")}
                </ul>
            </div>
            <div style='margin-top: 20px;'>
                <h3>Skills</h3>
                <ul>
                    ${Object.entries(n.getSkills()).map(([i,o])=>o.length?`<li><strong>${i}</strong>: ${o.join(", ")}</li>`:"").join("")}
                </ul>
            </div>
        </div>
    `});
