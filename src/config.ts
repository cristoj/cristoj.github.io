export enum DataStore {
    IN_MEMORY = 'inMemory',
    LOCAL_STORAGE = 'localStorage'
}

interface Config {
    dataStore: DataStore;
}

export const config: Config = {
    dataStore: DataStore.IN_MEMORY
}
