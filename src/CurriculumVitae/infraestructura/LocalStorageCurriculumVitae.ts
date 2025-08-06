import CurriculumVitae from "@/CurriculumVitae/domain/models/CurriculumVitae";
import {CurriculumVitaeRepository} from "@/CurriculumVitae/domain/ports/CurriculumVitaeRepository";
import CurriculumVitaeMapper from "@/CurriculumVitae/domain/dto/CurriculumVitaeMapper";

export default class LocalStorageCurriculumVitae implements CurriculumVitaeRepository {
    private readonly storageKey: string = 'curriculumVitae';

    constructor() {
        if (typeof window === 'undefined' || !window.localStorage) {
            throw new Error('No localStorage available');
        }
        // Check if the storage key exists, if not, initialize it
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
    }

    async save(cv: CurriculumVitae): Promise<void> {
        const storage = this.getStorage();
        storage[cv.getUuid()] = CurriculumVitaeMapper.toJson(cv);
        this.setStorage(storage);
    }

    async findById(uuid: string): Promise<CurriculumVitae | null> {
        const storage = this.getStorage();
        const cvJson = storage[uuid];

        if (!cvJson) {
            return null;
        }

        return CurriculumVitaeMapper.fromJson(cvJson);
    }

    async findAll(): Promise<CurriculumVitae[]> {
        const storage = this.getStorage();
        return Object.values(storage)
            .map(cvJson => CurriculumVitaeMapper.fromJson(cvJson));
    }

    async update(cv: CurriculumVitae): Promise<void> {
        const storage = this.getStorage();
        const key = cv.getUuid();

        if (!storage[key]) {
            throw new Error(`Curriculum Vitae not found`);
        }

        storage[key] = CurriculumVitaeMapper.toJson(cv);
        this.setStorage(storage);
    }

    async delete(uuid: string): Promise<void> {
        const storage = this.getStorage();

        if (!storage[uuid]) {
            throw new Error(`Curriculum Vitae not found`);
        }

        delete storage[uuid];
        this.setStorage(storage);
    }

    // Helper methods to interact with localStorage
    private getStorage(): Record<string, string> {
        if (typeof window === 'undefined' || !window.localStorage) {
            return {};
        }

        const storageData = localStorage.getItem(this.storageKey);
        return storageData ? JSON.parse(storageData) : {};
    }

    private setStorage(data: Record<string, string>): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }
    }
}
