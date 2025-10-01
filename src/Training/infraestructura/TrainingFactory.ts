import TrainingRepository from "@/Training/domain/ports/TrainingRepository";
import {config, DataStore} from "@/config";
import InMemoryTraining from "@/Training/infraestructura/InMemoryTraining";
import LocalStorageTraining from "@/Training/infraestructura/LocalStorageTraining";

export class TrainingFactory {

  static create(): TrainingRepository {
    const datastore: DataStore = config.dataStore;

    if (datastore === DataStore.IN_MEMORY) {
      return InMemoryTraining.getInstance();
    }

    if (datastore === DataStore.LOCAL_STORAGE) {
        return new LocalStorageTraining();
    }

    throw new Error(`Unknown datastore type: ${datastore}`);
  }

}
