import {config, DataStore} from '@/config';
import PortfolioRepository from '@/Portfolio/domain/ports/PortfolioRepository';
import InMemoryPortfolio from "@/Portfolio/infraestructura/InMemoryPortfolio";
import LocalStoragePortfolio from "@/Portfolio/infraestructura/LocalStoragePortfolio";

export class PortfolioFactory {
  static create(): PortfolioRepository {
    const datastore: DataStore = config.dataStore;

    if (datastore === DataStore.IN_MEMORY) {
      return InMemoryPortfolio.getInstance();
    }

    if (datastore === DataStore.LOCAL_STORAGE) {
        return new LocalStoragePortfolio();
    }

    throw new Error(`Unknown datastore type: ${datastore}`);
  }
}
