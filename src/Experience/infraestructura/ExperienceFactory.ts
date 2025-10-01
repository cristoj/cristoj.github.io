import ExperienceRepository from "@/Experience/domain/ports/ExperienceRepository";
import {config, DataStore} from "@/config";
import InMemoryExperience from "@/Experience/infraestructura/InMemoryExperience";
import LocalStorageExperience from "@/Experience/infraestructura/LocalStorageExperience";

export class ExperienceFactory {

  static create(): ExperienceRepository {
    const datastore: DataStore = config.dataStore;

    if (datastore === DataStore.IN_MEMORY) {
      return InMemoryExperience.getInstance();
    }

    if (datastore === DataStore.LOCAL_STORAGE) {
        return new LocalStorageExperience();
    }

    throw new Error(`Unknown datastore type: ${datastore}`);
  }

}
