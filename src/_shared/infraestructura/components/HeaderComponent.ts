import ComponentDefault from "@/_shared/infraestructura/components/ComponentDefault";

export class HeaderComponent extends ComponentDefault {
    private portfolioUuids: string[] = [];
    private trainingUuids: string[] = [];
    private experienceUuids: string[] = [];

    private uuidsFromElement(): void {
        this.portfolioUuids = this.getAttribute('portfolioUuids')?.split(',') ?? [];
        this.trainingUuids = this.getAttribute('trainingUuids')?.split(',') ?? [];
        this.experienceUuids = this.getAttribute('experienceUuids')?.split(',') ?? [];
    }

    protected override initComponent(): void {
        this.uuidsFromElement();
        this.render();
        this.menuToggle();
    }

    protected override renderTemplate(): string {
        // language=HTML
        return `
            <header class="header">
                <div><img
                        class="logo"
                        src="/assets/images/logo.svg"
                        alt="Logo de Cristobal Terceiro"
                ></div>
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
                            ${this.portfolioUuids && this.portfolioUuids.length > 0 ? '<li class="menu--main__item"><a href="#portfolio">Proyectos</a></li>' : ''}
                            ${this.experienceUuids && this.experienceUuids.length > 0 ? '<li class="menu--main__item"><a href="#experience">Experiencia</a></li>' : ''}
                            ${this.trainingUuids && this.trainingUuids.length > 0 ? '<li class="menu--main__item"><a href="#training">Formación</a></li>' : ''}
                            <li class="menu--main__item">
                                <a href="https://drive.google.com/file/d/1GO7k50-BFbRMAeJELvhmRXlRRVprhJQZ/view?usp=sharing"
                                   rel="noopener noreferrer"
                                   target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="menu--main__item__icon" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                    PDF
                                </a>
                            </li>
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
        `;
    }

    private menuToggle() {
        const $menuToggle = document.querySelector('.menu-toggle');
        if ($menuToggle) {
            $menuToggle.addEventListener('click', (event: Event) => {
                event.preventDefault();
                event.stopPropagation();
                $menuToggle.classList.toggle('active');
            });
        }

    }
}
