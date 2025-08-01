(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();var t=(e=>(e.LANGUAGES="Lenguajes",e.FRAMEWORKS="Frameworks",e.TOOLS="Herramientas",e.METHODOLOGIES="Metodologías",e.CLOUD="Cloud/DevOps",e.SOFT_SKILLS="Habilidades Blandas",e))(t||{}),c=(e=>(e.ACORUNA="A Coruña",e.MADRID="Madrid",e.REMOTO="Remoto",e))(c||{}),O=(e=>(e.DEVELOPER="Developer",e.DESIGNER="Designer",e.PROJECT_MANAGER="Project Manager",e.DATA_ANALYST="Data Analyst",e.MARKETING="Marketing",e.SALES="Sales",e.HR="Human Resources",e.QA_TESTER="QA Tester",e.OTHER="Other",e))(O||{});class p{constructor(i,o,n,s,r=[c.REMOTO],a,d,u,h=O.OTHER){this.uuid=i,this.fullName=o,this.email=n,this.phone=s,this.locations=r,this.specialty=a,this.linkedin=d,this.github=u,this.jobCategories=h,this.skillSet={[t.LANGUAGES]:[],[t.FRAMEWORKS]:[],[t.TOOLS]:[],[t.METHODOLOGIES]:[],[t.CLOUD]:[],[t.SOFT_SKILLS]:[]}}}class S extends p{constructor(i,o,n,s,r=[c.REMOTO],a,d,u,h=O.OTHER){super(i,o,n,s,r,a,d,u,h)}addSkill(i,o){this.skillSet[i].length&&this.skillSet[i].includes(o)||this.skillSet[i].push(o)}addSkills(i,o){o.forEach(n=>{this.addSkill(i,n)})}getSkills(){return{[t.LANGUAGES]:this.skillSet[t.LANGUAGES],[t.FRAMEWORKS]:this.skillSet[t.FRAMEWORKS],[t.TOOLS]:this.skillSet[t.TOOLS],[t.METHODOLOGIES]:this.skillSet[t.METHODOLOGIES],[t.CLOUD]:this.skillSet[t.CLOUD],[t.SOFT_SKILLS]:this.skillSet[t.SOFT_SKILLS]}}getBasicInfo(){return{fullName:this.fullName,email:this.email,phone:this.phonePrettyPrint(this.phone),locations:this.locations,specialty:this.specialty,linkedin:this.linkedin,github:this.github,jobCategories:this.jobCategories}}addExperience(){}phonePrettyPrint(i){return i.replace(/(.{3})/g,"$1 ").trim()}}class E extends S{constructor(i,o,n,s,r=[c.REMOTO],a,d,u){super(i,o,n,s,r,a,d,u,O.DEVELOPER)}}const l=new E("9f863328-1fb1-432e-a56b-70189492c37b","Cristobal V. Terceiro","crsitojvt@gmail.com","+34697356153",[c.ACORUNA,c.REMOTO],"Desarrollador Full-Stack con especialización en Front-End y desarrollo móvil con más de 15 años de experiencia.","https://www.linkedin.com/in/cristobal-terceiro/","https://github.com/cristobalvterceiro");l.addSkills(t.LANGUAGES,["html","css","js","ts","php","dart"]);l.addSkills(t.FRAMEWORKS,["Angular","React","Flutter","Laravel","WordPress"]);l.addSkills(t.CLOUD,["GitHub","AWS","Vercel","Cloudflare","Firebase"]);l.addSkills(t.METHODOLOGIES,["Scrum"]);l.addSkills(t.TOOLS,["Docker","Postman","Sonarqube","VS Code","PHP Storm","Xcode","Android Studio","XD","Photoshop"]);document.addEventListener("DOMContentLoaded",()=>{const e=document.body;e.innerHTML=`
        <div style='padding: 20px; font-family: Arial, sans-serif;'>
            <h1>🚀 Curriculum Vitae</h1>            
            <div style='margin-bottom: 20px;'>
                <p><strong>Nombre:</strong> ${l.getBasicInfo().fullName}</p>
                <p><strong>Email:</strong> ${l.getBasicInfo().email}</p>
                <p><strong>Teléfono:</strong> ${l.getBasicInfo().phone}</p>
                <p><strong>Category:</strong> ${l.getBasicInfo().jobCategories}</p>
                <p><strong>Especialidad:</strong> ${l.getBasicInfo().specialty}</p>
            </div>
            <div style='margin-top: 20px;'>
                <h3>📍 Ubicaciones</h3>
                <ul>
                    ${l.getBasicInfo().locations.map(i=>`<li>${i}</li>`).join("")}
                </ul>
            </div>
            <div style='margin-top: 20px;'>
                <h3>Skills</h3>
                <ul>
                    ${Object.entries(l.getSkills()).map(([i,o])=>o.length?`<li><strong>${i}</strong>: ${o.join(", ")}</li>`:"").join("")}
                </ul>
            </div>
        </div>
    `});
