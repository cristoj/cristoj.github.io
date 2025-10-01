import {config, DataStore} from "@/config";
import LocalStorageCurriculumVitae from "@/CurriculumVitae/infraestructura/LocalStorageCurriculumVitae";
import InMemoryCurriculumVitae from "@/CurriculumVitae/infraestructura/InMemoryCurriculumVitae";
import {CurriculumVitaeRepository} from "@/CurriculumVitae/domain/ports/CurriculumVitaeRepository";

export class CurriculumVitaeFactory {

    static create(): CurriculumVitaeRepository {
        const dataStore = config.dataStore;

        if (dataStore === DataStore.LOCAL_STORAGE) {
            return new LocalStorageCurriculumVitae();
        }

        if (dataStore === DataStore.IN_MEMORY) {
            return new InMemoryCurriculumVitae();
        }

        throw new Error(`Unknown datastore type: ${dataStore}`);
    }
}
