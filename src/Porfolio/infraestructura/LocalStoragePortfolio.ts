import { Portfolio } from "@/Porfolio/domain/models/Portfolio";
import PortfolioRepository from "@/Porfolio/domain/ports/PortfolioRepository";
import PortfolioMapper from "@/Porfolio/domain/mappers/PortfolioMapper";

export default class LocalStoragePortfolio implements PortfolioRepository {
    private readonly storageKey: string = 'portfolio';

    constructor() {
        if (typeof window === 'undefined' || !window.localStorage) {
            throw new Error('No localStorage available');
        }
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
    }

    async save(portfolio: Portfolio): Promise<void> {
        const storage = this.getStorage();
        storage[portfolio.getUuid()] = PortfolioMapper.toJson(portfolio);
        this.setStorage(storage);
    }

    async findById(uuid: string): Promise<Portfolio | null> {
        const storage = this.getStorage();
        const json = storage[uuid];

        if (!json) {
            return null;
        }

        return PortfolioMapper.fromJson(json);
    }

    async findAll(): Promise<Portfolio[]> {
        const storage = this.getStorage();
        return Object.values(storage).map(item => PortfolioMapper.fromJson(item));
    }

    async update(portfolio: Portfolio): Promise<void> {
        const storage = this.getStorage();
        const key = portfolio.getUuid();

        if (!storage[key]) {
            throw new Error(`Portfolio not found`);
        }

        storage[key] = PortfolioMapper.toJson(portfolio);
        this.setStorage(storage);
    }

    async delete(uuid: string): Promise<void> {
        const storage = this.getStorage();

        if (!storage[uuid]) {
            throw new Error(`Portfolio not found`);
        }

        delete storage[uuid];
        this.setStorage(storage);
    }

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
