var P=Object.defineProperty;var $=(r,e,t)=>e in r?P(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var s=(r,e,t)=>$(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();class k{constructor(e=document.body){s(this,"targetElement");this.targetElement=e}render(e){let t="";e instanceof Error?(console.error(e.name,e.message),t+=`<p><strong>Error:</strong> ${e.name}: ${e.message}</p>`):(console.error(e),t+=`<p><strong>Error:</strong> Unknown error occurred: ${e}</p>`),this.targetElement.innerHTML=`
            <div style='padding: 20px; font-family: Arial, sans-serif; color: red;'>
                <h1>❌ Error en la aplicación</h1>
                ${t}
            </div>
        `}setTargetElement(e){this.targetElement=e}}class I{constructor(e){this.repository=e}async execute(e){if(!e.getBasicInfo().email)throw new Error("El email es requerido");await this.repository.save(e)}}class p extends HTMLElement{constructor(){super()}disconnectedCallback(){this.remove()}connectedCallback(){this.initComponent()}render(){this.innerHTML=`
           <style>                
                ${this.templateCss()}
           </style>
           ${this.renderTemplate()}
        `}mapComponentAttributes(){}templateCss(){return""}renderTemplate(){return""}initComponent(){}}class y extends Error{constructor(e){super(e),this.name="PortfolioError"}}class D{constructor(e){this.repository=e}async execute(e){if(!e)throw new y("El uuid es requerido");return await this.repository.findById(e)}}const f=class f{constructor(){s(this,"store",new Map)}static getInstance(){return f.instance||(f.instance=new f),f.instance}async save(e){this.store.set(e.getUuid(),e)}async findById(e){return this.store.get(e)||null}async findAll(){return Array.from(this.store.values())}async update(e){const t=e.getUuid();if(!this.store.has(t))throw new Error("Portfolio not found");this.store.set(t,e)}async delete(e){if(!this.store.has(e))throw new Error("Portfolio not found");this.store.delete(e)}};s(f,"instance");let T=f;class F extends p{constructor(){super(...arguments);s(this,"uuid",null);s(this,"portfolio",null);s(this,"isLoading",!0);s(this,"error",null)}get uuidFromElement(){return this.uuid=this.getAttribute("uuid"),this.uuid}async initComponent(){if(!this.uuidFromElement){this.error="El atributo 'uuid' es requerido.",this.isLoading=!1,this.render();return}try{const t=new D(T.getInstance());this.portfolio=await t.execute(this.uuid),this.portfolio||(this.error="Portfolio no encontrado.")}catch(t){this.error="Error al cargar el portfolio.",console.error(t)}finally{this.isLoading=!1,this.render()}}renderTemplate(){if(this.isLoading)return"<p>Cargando portfolio...</p>";if(this.error)return`<p style="color: red;">${this.error}</p>`;if(!this.portfolio)return"<p>Portfolio no disponible.</p>";const t=this.portfolio.getBasicInfo(),n=this.portfolio.getTechnologies();return`
            <div>
                <a href="${t.url??"#"}" target="_blank" rel="noopener noreferrer">
                    <div class="portfolio-list__item__item__image"><img class="d--block" src="${t.imageUrl}"
                                                                        alt="${t.title}"></div>
                </a>
            </div>
            <div class="portfolio-list__item__content">
                <h3 class="portfolio-list__item__title">${t.title}</h3>
                <p class="portfolio-list__item__description">${t.description}</p>
                <div class="portfolio-list__item__tags">${this.renderTechnologies(n)}</div>
            </div>
        `}renderTechnologies(t){return t.map(n=>`<span class="tag tag--outline--primary">${n}</span>`).join("")}}class M extends p{constructor(){super(...arguments);s(this,"error",null);s(this,"uuids",[])}get uuidsFromElement(){var t;return this.uuids=((t=this.getAttribute("uuids"))==null?void 0:t.split(","))??[],this.uuids}async initComponent(){if(!this.uuidsFromElement){this.error="El atributo 'uuids' es requerido.",this.render();return}this.render()}renderTemplate(){return this.error?`<p style="color: red;">${this.error}</p>`:(window.customElements.get("portfolio-item")||window.customElements.define("portfolio-item",F),`
            <section
                    class="mt--2 portafolio content-visibility--auto"
                    id="portfolio"
            >
                <h2 class="text-lg-center">Algunos proyectos</h2>
                <div class="portafolio-list">
                    ${this.uuids.map(t=>`<portfolio-item class="portfolio-list__item" uuid="${t}"></portfolio-item>`).join("")}
                </div>
            </section>`)}}class b extends Error{constructor(e){super(e),this.name="TrainingError"}}class R{constructor(e){this.repository=e}async execute(e){if(!e)throw new b("El uuid es requerido");return await this.repository.findById(e)}}const w=class w{constructor(){s(this,"store",new Map)}static getInstance(){return w.instance||(w.instance=new w),w.instance}async save(e){this.store.set(e.getUuid(),e)}async findById(e){return this.store.get(e)||null}async findAll(){return Array.from(this.store.values())}async update(e){const t=e.getUuid();if(!this.store.has(t))throw new Error("Training not found");this.store.set(t,e)}async delete(e){if(!this.store.has(e))throw new Error("Training not found");this.store.delete(e)}};s(w,"instance");let S=w;class Z extends p{constructor(){super(...arguments);s(this,"uuid",null);s(this,"training",null);s(this,"isLoading",!0);s(this,"error",null)}get uuidFromElement(){return this.uuid=this.getAttribute("uuid"),this.uuid}async initComponent(){if(!this.uuidFromElement){this.error="El atributo 'uuid' es requerido.",this.isLoading=!1,this.render();return}try{const t=new R(S.getInstance());this.training=await t.execute(this.uuid),this.training||(this.error="Training no encontrado.")}catch(t){this.error="Error al cargar el training.",console.error(t)}finally{this.isLoading=!1,this.render()}}renderTemplate(){if(this.isLoading)return"<p>Cargando training...</p>";if(this.error)return`<p style="color: red;">${this.error}</p>`;if(!this.training)return"<p>Training no disponible.</p>";const t=this.training.getBasicInfo();return`
            <div class="training__item">
                <h3 class="training__item__title">${t.title}</h3>
                <div class="training__item__content">
                    <div class="training__item__description">${t.description}</div>
                    <div class="training__item__dates">${t.date_from} ${t.date_to?" / ":""} ${t.date_to??""}</div>
                </div>
            </div>
        `}}class H extends p{constructor(){super(...arguments);s(this,"error",null);s(this,"uuids",[])}get uuidsFromElement(){var t;return this.uuids=((t=this.getAttribute("uuids"))==null?void 0:t.split(","))??[],this.uuids}async initComponent(){if(!this.uuidsFromElement){this.error="El atributo 'uuids' es requerido.",this.render();return}this.render()}renderTemplate(){return this.error?`<p style="color: red;">${this.error}</p>`:(window.customElements.get("training-item")||window.customElements.define("training-item",Z),`
            <section
                    class="mt--2 py-sm--5 training height-lg-100 content-visibility--auto"
                    id="training"
            >
                <h2 class="text-lg-center">Formación</h2>
                <div class="training-list">
                    ${this.uuids.map(t=>`<training-item class="training-list__item" uuid="${t}"></training-item>`).join("")}
                </div>
            </section>`)}}class g extends Error{constructor(e){super(e),this.name="ExperienceError"}}class j{constructor(e){this.repository=e}async execute(e){if(!e)throw new g("El uuid es requerido");return await this.repository.findById(e)}}const v=class v{constructor(){s(this,"store",new Map)}static getInstance(){return v.instance||(v.instance=new v),v.instance}async save(e){this.store.set(e.getUuid(),e)}async findById(e){return this.store.get(e)||null}async findAll(){return Array.from(this.store.values())}async update(e){const t=e.getUuid();if(!this.store.has(t))throw new Error("Experience not found");this.store.set(t,e)}async delete(e){if(!this.store.has(e))throw new Error("Experience not found");this.store.delete(e)}};s(v,"instance");let U=v;class B extends p{constructor(){super(...arguments);s(this,"uuid",null);s(this,"experience",null);s(this,"isLoading",!0);s(this,"error",null)}get uuidFromElement(){return this.uuid=this.getAttribute("uuid"),this.uuid}async initComponent(){if(!this.uuidFromElement){this.error="El atributo 'uuid' es requerido.",this.isLoading=!1,this.render();return}try{const t=new j(U.getInstance());this.experience=await t.execute(this.uuid),this.experience||(this.error="Experience no encontrado.")}catch(t){this.error="Error al cargar la experience.",console.error(t)}finally{this.isLoading=!1,this.render()}}renderTemplate(){if(this.isLoading)return"<p>Cargando experience...</p>";if(this.error)return`<p style="color: red;">${this.error}</p>`;if(!this.experience)return"<p>Experience no disponible.</p>";const t=this.experience;return`
            <div class="experience__item__content">
                <div class="experience__item__header">
                    <div class="experience__item__header__image-title">
                        <img class="experience__item__image ${t.getTitle()==="STIK"?"experience__item__image--stik":""}"
                             src="assets/images/experience/${t.getLogoPath()}"
                             alt="">
                        <h5 class="experience__item__title">${t.getTitle()}</h5>
                    </div>
                    <div class="experience__item__date">${t.getDate()}</div>
                </div>
                <div class="experience__item__description">${t.getDescription()}</div>
                <div class="experience__item__skills">${t.getSkills()}</div>
            </div>
        `}}class W extends p{constructor(){super(...arguments);s(this,"error",null);s(this,"uuids",[])}get uuidsFromElement(){var t;return this.uuids=((t=this.getAttribute("uuids"))==null?void 0:t.split(","))??[],this.uuids}async initComponent(){if(!this.uuidsFromElement){this.error="El atributo 'uuids' es requerido.",this.render();return}this.render()}renderTemplate(){return this.error?`<p style="color: red;">${this.error}</p>`:(window.customElements.get("experience-item")||window.customElements.define("experience-item",B),`
      <section class="mt--2 experience height-lg-100 content-visibility--auto"
       id="experience">
        <h2 class="text-lg-center">Experiencia</h2>
        <div class="experience-list">
          ${this.uuids.map(t=>`<experience-item class="experience__item" uuid="${t}"></experience-item>`).join("")}
        </div>
      </section>
    `)}}class N extends p{constructor(){super(...arguments);s(this,"portfolioUuids",[]);s(this,"trainingUuids",[]);s(this,"experienceUuids",[])}uuidsFromElement(){var t,n,i;this.portfolioUuids=((t=this.getAttribute("portfolioUuids"))==null?void 0:t.split(","))??[],this.trainingUuids=((n=this.getAttribute("trainingUuids"))==null?void 0:n.split(","))??[],this.experienceUuids=((i=this.getAttribute("experienceUuids"))==null?void 0:i.split(","))??[]}initComponent(){this.uuidsFromElement(),this.render(),this.menuToggle()}renderTemplate(){return`
            <header class="header">
                <div><img class="logo" src="/assets/images/logo.svg"></div>
                <div class="menu--main">
                    <button type="button"
                            class="menu-toggle"
                            aria-label="Toggle menu">
                        <span class="menu-toggle__cross-line"></span>
                        <span class="menu-toggle__cross-line"></span>
                        <span class="menu-toggle__cross-line"></span>
                    </button>

                    <nav class="">
                        <ul class="menu--main__items">
                            <li class="menu--main__item"><a href="#profile">Perfil</a></li>
                            <li class="menu--main__item"><a href="#skills">Skills</a></li>
                            ${this.portfolioUuids&&this.portfolioUuids.length>0?'<li class="menu--main__item"><a href="#portfolio">Proyectos</a></li>':""}
                            ${this.trainingUuids&&this.trainingUuids.length>0?'<li class="menu--main__item"><a href="#training">Formación</a></li>':""}
                            ${this.experienceUuids&&this.experienceUuids.length>0?'<li class="menu--main__item"><a href="#experience">Experiencia</a></li>':""}
                        </ul>
                    </nav>
                </div>
                <div class="theme-toggle">
                    <input type="checkbox" id="theme-toggle__checkbox" class="theme-toggle__checkbox">
                    <label for="theme-toggle__checkbox" class="theme-button">
                        <svg class="icon theme-button__to-light" xmlns="http://www.w3.org/2000/svg" height="24px"
                             viewBox="0 -960 960 960" width="24px">
                            <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/>
                        </svg>
                        <svg class="icon theme-button__to-dark" xmlns="http://www.w3.org/2000/svg" height="24px"
                             viewBox="0 -960 960 960" width="24px">
                            <path d="M560-80q-82 0-155-31.5t-127.5-86Q223-252 191.5-325T160-480q0-83 31.5-155.5t86-127Q332-817 405-848.5T560-880q54 0 105 14t95 40q-91 53-145.5 143.5T560-480q0 112 54.5 202.5T760-134q-44 26-95 40T560-80Zm0-80h21q10 0 19-2-57-66-88.5-147.5T480-480q0-89 31.5-170.5T600-798q-9-2-19-2h-21q-133 0-226.5 93.5T240-480q0 133 93.5 226.5T560-160Zm-80-320Z"/>
                        </svg>
                    </label>
                </div>
            </header>
        `}menuToggle(){const t=document.querySelector(".menu-toggle");t&&t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),t.classList.toggle("active")})}}class G extends p{constructor(){super(...arguments);s(this,"uuid","");s(this,"basicInfo",null);s(this,"skills","")}getDataCVFromElement(){this.uuid=this.getAttribute("uuid"),this.basicInfo=JSON.parse(this.getAttribute("basicInfo")??""),this.skills=Object.values(JSON.parse(this.getAttribute("skills")??"")).flat().join(", ")}initComponent(){this.getDataCVFromElement(),this.injectIntoHead(),this.render()}generatePersonSchema(){return!this.uuid||!this.basicInfo||!this.skills?{}:{"@context":"https://schema.org/","@type":"Person",name:this.basicInfo.fullName,email:`${this.basicInfo.email}`,telephone:this.basicInfo.phone,jobTitle:this.basicInfo.specialty,sameAs:[this.basicInfo.linkedin,this.basicInfo.github],address:{"@type":"PostalAddress",addressLocality:this.basicInfo.locations.join(", ")},knowsAbout:this.skills,url:this.basicInfo.github,identifier:{"@type":"PropertyValue",name:"UUID",value:this.uuid}}}generateScriptTag(){const t=this.generatePersonSchema();return`<script type="application/ld+json">${JSON.stringify(t,null,2)}<\/script>`}injectIntoHead(){const t=document.querySelector('script[type="application/ld+json"]');t&&t.remove();const n=document.createElement("script");n.type="application/ld+json",n.textContent=JSON.stringify(this.generatePersonSchema(),null,2),document.head.appendChild(n)}}class V{constructor(e,t=document.body){s(this,"curriculumVitae");s(this,"targetElement");this.curriculumVitae=e,this.targetElement=t}async render(){window.customElements.get("portfolio-section")||window.customElements.define("portfolio-section",M),window.customElements.get("training-section")||window.customElements.define("training-section",H),window.customElements.get("experience-section")||window.customElements.define("experience-section",W),window.customElements.get("header-app")||window.customElements.define("header-app",N),window.customElements.get("schema-component")||window.customElements.define("schema-component",G);const e=this.curriculumVitae.getBasicInfo(),t=this.curriculumVitae.getSkills(),n=this.curriculumVitae.hasPortfolio()?this.curriculumVitae.getPortfolioUuids():[],i=this.curriculumVitae.hasTraining()?this.curriculumVitae.getTrainingUuids():[],o=this.curriculumVitae.hasExperience()?this.curriculumVitae.getExperienceUuids():[];this.targetElement.innerHTML=`
            <div class="">
                <header-app
                        portfolioUuids="${n}"
                        trainingUuids="${i}"
                        experienceUuids="${o}"
                >
                </header-app>
                <section
                        class="height-lg-100 height-lg-100--no-menu mt-sm--5 personal-data"
                        id="profile"
                >
                    <h1 class="">${e.fullName}</h1>
                    <div class="mt--1">
                        <p>${e.specialty}</p>
                        <div class="personal-data__basic">
                            <div>
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
                                </svg>
                                ${e.email}
                            </div>
                            <div>
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                    <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
                                </svg>
                                ${e.phone}
                            </div>
                            <div>
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                    <path d="m489-460 91-55 91 55-24-104 80-69-105-9-42-98-42 98-105 9 80 69-24 104Zm19 260h224q-7 26-24 42t-44 20L228-85q-33 5-59.5-15.5T138-154L85-591q-4-33 16-59t53-30l46-6v80l-36 5 54 437 290-36Zm-148-80q-33 0-56.5-23.5T280-360v-440q0-33 23.5-56.5T360-880h440q33 0 56.5 23.5T880-800v440q0 33-23.5 56.5T800-280H360Zm0-80h440v-440H360v440Zm220-220ZM218-164Z"/>
                                </svg>
                                ${e.jobCategories}
                            </div>
                            <div class="personal-data__basic__location">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                                     viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
                                </svg>
                                <ul class="list--unstyled personal-data__basic__list">
                                    ${e.locations.map(a=>`<li>${a}</li>`).join("")}
                                </ul>
                            </div>
                        </div>

                        <div class="mt--1 d--flex justify-content--center gap--2">
                            <div>
                                <svg class="icon icon--primary" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512">
                                    <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                    <path d="M173.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM252.8 8c-138.7 0-244.8 105.3-244.8 244 0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1 100-33.2 167.8-128.1 167.8-239 0-138.7-112.5-244-251.2-244zM105.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9s4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                                </svg>
                                <a href="${e.github}" rel="nofollow noopener"
                                   target="_blank">${e.github.split("/").pop()}</a>
                            </div>
                            <div>
                                <svg class="icon icon--primary" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512">
                                    <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                                    <path d="M416 32L31.9 32C14.3 32 0 46.5 0 64.3L0 447.7C0 465.5 14.3 480 31.9 480L416 480c17.6 0 32-14.5 32-32.3l0-383.4C448 46.5 433.6 32 416 32zM135.4 416l-66.4 0 0-213.8 66.5 0 0 213.8-.1 0zM102.2 96a38.5 38.5 0 1 1 0 77 38.5 38.5 0 1 1 0-77zM384.3 416l-66.4 0 0-104c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9l0 105.8-66.4 0 0-213.8 63.7 0 0 29.2 .9 0c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9l0 117.2z"/>
                                </svg>
                                <a href="${e.linkedin}" rel="nofollow noopener"
                                   target="_blank">${e.linkedin.split("/").pop()}</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                        class="show-reveal height-lg-100 py-sm--5 content-visibility--auto"
                        id="skills"
                >
                    <div class="skills mt-sm--1">
                        <div>
                            <svg class="skills__image" xmlns="http://www.w3.org/2000/svg" height="24px"
                                 viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                <path d="m480-336 128-184H494l80-280H360v320h120v144ZM400-80v-320H280v-480h400l-80 280h160L400-80Zm80-400H360h120Z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Skills</h2>
                            <dl class="skills__list">
                                ${Object.entries(t).map(([a,u])=>u.length?`<dt class="mt--1"><strong>${a}</strong></dt><dd>${this.renderTags(u)}</dd></dt>`:"").join("")}
                            </dl>
                        </div>
                    </div>
                </section>

                ${n&&n.length>0?`<portfolio-section uuids="${n}"></portfolio-section>`:""}

                ${i&&i.length>0?`<training-section uuids="${i}"></training-section>`:""}

                ${o&&o.length>0?`<experience-section uuids="${o}"></experience-section>`:""}
                <section
                        class="py--6 content-visibility--auto"
                        id="about"
                >
                    <div class="about mt-sm--1">
                        <div class="about__image">
                            <svg class="" xmlns="http://www.w3.org/2000/svg" height="20px"
                                 viewBox="0 -960 960 960" width="24px">
                                <path d="m499-287 335-335-52-52-335 335 52 52Zm-261 87q-100-5-149-42T40-349q0-65 53.5-105.5T242-503q39-3 58.5-12.5T320-542q0-26-29.5-39T193-600l7-80q103 8 151.5 41.5T400-542q0 53-38.5 83T248-423q-64 5-96 23.5T120-349q0 35 28 50.5t94 18.5l-4 80Zm280 7L353-358l382-382q20-20 47.5-20t47.5 20l70 70q20 20 20 47.5T900-575L518-193Zm-159 33q-17 4-30-9t-9-30l33-159 165 165-159 33Z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Sobre mi</h2>
                            <p>Me considero un profesional responsable y organizado. Los retos me motivan, me hacen
                                aprender y crecer. En mi carrera, el tesón y la dedicación han sido siempre mis
                                mejores herramientas. Por eso, me enorgullece decir que he entregado cada proyecto
                                cumpliendo las expectativas y superando las dificultades que iban apareciendo. Mi
                                objetivo es seguir aportando mi granito de arena, con la misma energía, en un equipo que
                                comparta mi visión.</p>
                        </div>
                    </div>
                </section>
            </div>
            <schema-component
                    uuid="${this.curriculumVitae.getUuid()}"
                    basicInfo='${JSON.stringify(e)}'
                    skills='${JSON.stringify(t)}'
            ></schema-component>
        `}renderError(e){let t="";e instanceof Error?t+=`<p>${e.name}: ${e.message}</p>`:t+=`<p>Unknown error occurred: ${e}</p>`,this.targetElement.innerHTML=`<div>${t}</div>`}renderTags(e){return e.map(t=>`<span class="tag tag--outline--primary">${t}</span>`).join("")}}class z{constructor(){s(this,"cvs",new Map)}async save(e){this.cvs.set(e.getUuid(),e)}async findById(e){for(const t of this.cvs)if(t[0]===e)return t[1];return null}async findAll(){return Array.from(this.cvs.values())}async update(e){const t=e.getUuid();if(!Array.from(this.cvs.keys()).some(i=>i===t))throw new Error("Curriculum Vitae not found");this.cvs.set(t,e)}async delete(e){if(!this.cvs.has(e))throw new Error("Curriculum Vitae not found");this.cvs.delete(e)}}var l=(r=>(r.LANGUAGES="Lenguajes",r.FRAMEWORKS="Frameworks",r.TOOLS="Herramientas",r.METHODOLOGIES="Metodologías",r.CLOUD="Cloud/DevOps",r.SOFT_SKILLS="Habilidades Blandas",r))(l||{}),x=(r=>(r.ACORUNA="A Coruña",r.MADRID="Madrid",r.REMOTO="Remoto",r))(x||{}),L=(r=>(r.DEVELOPER="Developer",r.DESIGNER="Designer",r.PROJECT_MANAGER="Project Manager",r.DATA_ANALYST="Data Analyst",r.MARKETING="Marketing",r.SALES="Sales",r.HR="Human Resources",r.QA_TESTER="QA Tester",r.OTHER="Other",r))(L||{});class m extends Error{constructor(e){super(e),this.name="CurriculumVitaeErrors"}}class A{constructor(e,t,n,i,o=[x.REMOTO],a,u,E,_=L.OTHER,q=null,C=null,O=null){s(this,"uuid");s(this,"fullName");s(this,"email");s(this,"phone");s(this,"locations");s(this,"specialty");s(this,"linkedin");s(this,"github");s(this,"jobCategories");s(this,"portfolio");s(this,"training");s(this,"experience",null);s(this,"skillSet");A.validateConstructorParams(e,t,n,i,a,u,E),this.uuid=e,this.fullName=t,this.email=n,this.phone=i,this.locations=o,this.specialty=a,this.linkedin=u,this.github=E,this.jobCategories=_,this.skillSet={[l.LANGUAGES]:[],[l.FRAMEWORKS]:[],[l.TOOLS]:[],[l.METHODOLOGIES]:[],[l.CLOUD]:[],[l.SOFT_SKILLS]:[]},this.portfolio=q,this.training=C,this.experience=O}getUuid(){return this.uuid}getPortfolioUuids(){return this.portfolio}hasPortfolio(){return this.portfolio!==null&&this.portfolio.length>0}hasTraining(){return this.training!==null&&this.training.length>0}getTrainingUuids(){return this.training}hasExperience(){return this.experience!==null&&this.experience.length>0}getExperienceUuids(){return this.experience}addSkill(e,t){this.skillSet[e].length&&this.skillSet[e].includes(t)||this.skillSet[e].push(t)}addSkills(e,t){t.forEach(n=>{this.addSkill(e,n)})}getSkills(){return{[l.LANGUAGES]:this.skillSet[l.LANGUAGES],[l.FRAMEWORKS]:this.skillSet[l.FRAMEWORKS],[l.TOOLS]:this.skillSet[l.TOOLS],[l.METHODOLOGIES]:this.skillSet[l.METHODOLOGIES],[l.CLOUD]:this.skillSet[l.CLOUD],[l.SOFT_SKILLS]:this.skillSet[l.SOFT_SKILLS]}}getBasicInfo(){return{fullName:this.fullName,email:this.email,phone:this.phonePrettyPrint(this.phone),locations:this.locations,specialty:this.specialty,linkedin:this.linkedin,github:this.github,jobCategories:this.jobCategories}}addExperience(){}phonePrettyPrint(e){return e.replace(/(.{3})/g,"$1 ").trim()}static validateConstructorParams(e,t,n,i,o,a,u){if(!e)throw new m("UUID no puede estar vacío");if(!t||t.trim().length<2)throw new m("El nombre completo debe tener al menos 2 caracteres");if(!n||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))throw new m("Email debe tener un formato válido");if(!i||!/^\+?[\d\s\-()]{7,15}$/.test(i))throw new m("Teléfono debe tener un formato válido");if(!o||o.trim().length<3)throw new m("La especialidad debe tener al menos 3 caracteres");if(a&&!a.includes("linkedin.com"))throw new m("LinkedIn debe ser una URL válida");if(!u||!u.includes("github.com")&&!u.includes("github.io"))throw new m("GitHub es obligatorio para developers y debe ser una URL válida")}}class K extends A{constructor(e,t,n,i,o=[x.REMOTO],a,u,E,_=null,q=null,C=null){super(e,t,n,i,o,a,u,E,L.DEVELOPER,_,q,C)}}class c{constructor(e,t,n,i,o,a=null){s(this,"uuid");s(this,"title");s(this,"description");s(this,"technologies");s(this,"imageUrl");s(this,"url");c.validateConstructorParams(e,t,n,i,o),this.uuid=e,this.title=t,this.description=n,this.technologies=i,this.imageUrl=o,this.url=a}getUuid(){return this.uuid}getTitle(){return this.title}getDescription(){return this.description}getTechnologies(){return this.technologies}getImageUrl(){return this.imageUrl}getUrl(){return this.url}copyWith(e){const t={uuid:this.uuid,title:e.title??this.title,description:e.description??this.description,technologies:e.technologies??this.technologies,imageUrl:e.imageUrl??this.imageUrl,url:e.url??this.url};return c.validateConstructorParams(t.uuid,t.title,t.description,t.technologies,t.imageUrl),new c(t.uuid,t.title,t.description,t.technologies,t.imageUrl,t.url)}updateTitle(e){return this.copyWith({title:e})}updateDescription(e){return this.copyWith({description:e})}updateTechnologies(e){return this.copyWith({technologies:e})}updateImageUrl(e){return this.copyWith({imageUrl:e})}updateUrl(e){return this.copyWith({url:e})}static validateConstructorParams(e,t,n,i,o){if(!e)throw new y("Uuid es requerido");if(!t)throw new y("Title es requerido");if(!n)throw new y("Description es requerido");if(!i||i.length===0)throw new y("Technologies es requerido");if(!o)throw new y("ImageUrl es requerido")}getBasicInfo(){return{uuid:this.uuid,title:this.title,description:this.description,imageUrl:this.imageUrl,url:this.url}}}class Q{constructor(e){this.repository=e}async execute(e){await this.repository.save(e)}}class d{constructor(e,t,n,i,o,a=null){s(this,"uuid");s(this,"title");s(this,"description");s(this,"location");s(this,"date_from");s(this,"date_to");d.validateConstructorParams(e,t,n,i,o),this.uuid=e,this.title=t,this.description=n,this.location=i,this.date_from=o,this.date_to=a??null}getUuid(){return this.uuid}getTitle(){return this.title}getDescription(){return this.description}getLocation(){return this.location}getDateFrom(){return this.date_from}getDateTo(){return this.date_to}copyWith(e){const t={uuid:this.uuid,title:e.title??this.title,description:e.description??this.description,location:e.location??this.location,date_from:e.date_from??this.date_from,date_to:e.date_to??this.date_to};return d.validateConstructorParams(t.uuid,t.title,t.description,t.location,t.date_from),new d(t.uuid,t.title,t.description,t.location,t.date_from,t.date_to)}static validateConstructorParams(e,t,n,i,o){if(!e)throw new b("Uuid es requerido");if(!t)throw new b("Title es requerido");if(!n)throw new b("Description es requerido");if(!i)throw new b("Location es requerido");if(!o)throw new b("Location es requerido")}getBasicInfo(){return{uuid:this.uuid,title:this.title,description:this.description,location:this.location,date_from:this.date_from,date_to:this.date_to}}}class X{constructor(e){this.repository=e}async execute(e){await this.repository.save(e)}}class h{constructor(e,t,n,i,o,a){s(this,"uuid");s(this,"title");s(this,"description");s(this,"skills");s(this,"date");s(this,"logoPath");h.validateConstructorParams(e,t,n,i,o,a),this.uuid=e,this.title=t,this.description=n,this.skills=i,this.date=o,this.logoPath=a}getUuid(){return this.uuid}getTitle(){return this.title}getDescription(){return this.description}getSkills(){return this.skills}getDate(){return this.date}getLogoPath(){return this.logoPath}copyWith(e){const t={uuid:this.uuid,title:e.title??this.title,description:e.description??this.description,skills:e.skills??this.skills,date:e.date??this.date,logoPath:e.logoPath??this.logoPath};return h.validateConstructorParams(t.uuid,t.title,t.description,t.skills,t.date,t.logoPath),new h(t.uuid,t.title,t.description,t.skills,t.date,t.logoPath)}static validateConstructorParams(e,t,n,i,o,a){if(!e)throw new g("Uuid es requerido");if(!t)throw new g("Title es requerido");if(!n)throw new g("Description es requerido");if(!i)throw new g("Skills es requerido");if(!o)throw new g("Date es requerido");if(!a)throw new g("LogoPath es requerido")}getBasicInfo(){return{uuid:this.uuid,title:this.title,description:this.description,skills:this.skills,date:this.date}}}class Y{constructor(e){this.repository=e}async execute(e){await this.repository.save(e)}}class J{async generateCv(){const e=await this.generatePortfolioUuids(),t=await this.generateTrainingUuids(),n=await this.generateExperienceUuids(),i=new K("9f863328-1fb1-432e-a56b-70189492c37b","Cristobal Terceiro","cristojvt@gmail.com","+34697356153",[x.ACORUNA,x.REMOTO],"Desarrollador Full-Stack con más de 15 años de experiencia en todo tipo de proyectos para clientes","https://www.linkedin.com/in/cristobal-terceiro","https://github.com/cristoj",e,t,n);return i.addSkills(l.LANGUAGES,["html","css","js","ts","php","dart"]),i.addSkills(l.FRAMEWORKS,["Angular","React","Flutter","Laravel","WordPress","Astro"]),i.addSkills(l.CLOUD,["GitHub","AWS","Vercel","Cloudflare","Firebase","Mailchimp"]),i.addSkills(l.METHODOLOGIES,["Scrum"]),i.addSkills(l.TOOLS,["Docker","Postman","Sonarqube","VS Code","PHP Storm","Xcode","Android Studio","XD","Photoshop"]),i}async generatePortfolioUuids(){const e=[new c("14207ae2-0b3d-40af-a06b-07c2b5c9ceb7","STIK","SaaS de CX con uso de reconocimiento de imagen. Desarrollo de panel de administración, panel de clientes, webs corporativas y app móvil",["Angular","React","Flutter","Laravel","AWS","Cloudflare","Firebase"],"assets/images/portfolio/stik.webp","https://www.stik.world"),new c("15a3c319-abf7-4b44-b5c9-78d2ce000576","CEOENet","Intranet de CEOE para sus asociados. Desarrollo de panel de clientes y app móvil",["Angular","Flutter"],"assets/images/portfolio/ceoenet.webp","https://ceoe.net"),new c("87cb94cd-a6c7-4789-9be1-a9f8a5543eaa","Fundación CEOE","Web corporativa de la Fundación CEOE",["WordPress"],"assets/images/portfolio/fundacion-ceoe.webp","https://www.fundacionceoe.es/"),new c("2dab667a-0385-41a7-abd9-6834c83f7ff8","CEPYME500","Proyecto Empresarial con las 500 pymes con mayor crecimiento del año. Web corporativa, panel de usuarios y aplicación móvil",["Angular","Flutter","Stripe","AWS"],"assets/images/portfolio/cepyme500.webp","https://www.cepyme500.es"),new c("0187f894-eda7-48ec-9e0a-c72688314b1d","Juntos Separamos","Proyecto web para la Diputación de Ourense. Panel de gestión de residuos de la provincia de Ourense",["Angular","laravel"],"assets/images/portfolio/juntosseparamos.webp","https://juntosseparamos.depourense.es"),new c("db7378b4-5ef1-46bb-abdb-1cea6963da6b","Rec Parenting","Plataforma donde psicólogos conectan con sus pacientes por medio de videoconferencias. Web corporativa con pagos, plataforma web y app móvil",["Angular","Flutter","Wordpress","Stripe","AWS"],"assets/images/portfolio/recparenting.webp","https://www.recparenting.com"),new c("8627492d-59c9-4296-8484-bf058a840e51","CEOETech","La mayor plataforma de información legislativa nacional y europea. Panel de administración de usuarios y buscador de ayudas y subvenciones con pasarela de pago",["Laravel","Stripe"],"assets/images/portfolio/ceoetech.webp","https://ceoe.tech"),new c("5938e62e-b521-41b5-be88-291a706cd716","Podoclínica","Gestión de clínica podológica. Panel de administración vía plataforma web con reservas de citas",["Angular","Laravel","AWS"],"assets/images/portfolio/podoclinicacoruna.webp","https://gestion.podoclinicacoruna.es")],t=T.getInstance(),n=new Q(t);return await Promise.all(e.map(async i=>(await n.execute(i),i.getUuid())))}async generateTrainingUuids(){const e=[new d("10e3df13-f7e1-44e7-8ea4-bb0194966652","Grado Ingeniería Informática","UNED","Online","2024","~"),new d("140dea6b-cee9-427d-9ffd-b37d22a08491","Emprendimiento y Startups","ISDI | EOI","Online","2025"),new d("15cb64ec-a90d-48a0-a843-bda67295a34d","AWS Developer","CNTG","Online","2024"),new d("6ebf2c71-4ee4-4e25-99e2-1e3d6bf06611","SCRUM Master","Scrum.org","Online","2020",null),new d("9a790036-0730-412e-9d63-87e3e3b14dac","AWS Solution Architect","CNTG","Online","2015","2016"),new d("190ce9a0-d400-42e6-a8fd-260613be9543","Técnico Superior en desarrollo de Aplicaciones Web","FP Fernando Wirtz","A Coruña","2012","2013"),new d("850bfab6-958d-429c-8a62-517545962552","CORE Fundamentos de un proyecto TI","EUCIP","Online","2011",null),new d("9b786f3d-4d9d-4746-9532-4d55f33e48d9","Recursos y lenguajes entornos WEB","UNED","Online","2011",null)],t=S.getInstance(),n=new X(t);return await Promise.all(e.map(async i=>(await n.execute(i),i.getUuid())))}async generateExperienceUuids(){const e=[new h("6c18232b-fc61-46f0-b11f-7b5ba91dfe54","STIK","Startup con producto propio. Red social + plataforma de CX basada en productos con tecnología de IA+RI.","Desarrollo FrontEnd y móvil en coordinación con el equipo de BackEnd. Aportación de conocimientos de emprendimiento para el proyecto en general.","2024/~","logo_stik.webp"),new h("20922240-dbb0-43b1-b589-6d614fe3076e","UPMEDIA","Consultora tecnológica y agencia de comunicación","Desarrollo FullStack y móvil para los diferentes clientes de la empresa (CEPYME, CEOE, Cafés Siboney, Central Lechera Asturiana, Ecoembes, etc.).","2016/2024","logo_upmedia.webp"),new h("b69494d5-92ee-45f5-809c-76948d5f3fe1","Trocobuy","Portal web de intercambio de productos y servicios empresariales","Desarrollo FrontEnd de la parte privada del portal","2011/2016","logo_trocobuy.webp"),new h("a916ece1-bcc5-41f7-93b6-fa41ff69cc2b","Iberfinancia","Agencia de financiación privada","Desarrollo de minisites para clientes y gestión de email-marketing.","2009/2011","logo_iberfinancia.webp")],t=U.getInstance(),n=new Y(t);return await Promise.all(e.map(async i=>(await n.execute(i),i.getUuid())))}}async function ee(){const r=new z,e=new I(r),n=await new J().generateCv();await e.execute(n),document.addEventListener("DOMContentLoaded",async()=>{const i=document.getElementById("app")??void 0;await new V(n,i).render()})}ee().catch(r=>{new k().render(r)});
