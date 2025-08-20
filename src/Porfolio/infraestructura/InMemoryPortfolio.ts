import PortfolioRepository from "@/Porfolio/domain/ports/PortfolioRepository";
import {Portfolio} from "@/Porfolio/domain/models/Portfolio";

export default class InMemoryPortfolio implements PortfolioRepository {
    private static instance: InMemoryPortfolio;
    private store: Map<string, Portfolio> = new Map();

    private constructor() {
    }

    public static getInstance(): InMemoryPortfolio {
        if (!InMemoryPortfolio.instance) {
            InMemoryPortfolio.instance = new InMemoryPortfolio();
        }
        return InMemoryPortfolio.instance;
    }

    async save(portfolio: Portfolio): Promise<void> {
        this.store.set(portfolio.getUuid(), portfolio);
    }

    async findById(uuid: string): Promise<Portfolio | null> {
        return this.store.get(uuid) || null;
    }

    async findAll(): Promise<Portfolio[]> {
        return Array.from(this.store.values());
    }

    async update(portfolio: Portfolio): Promise<void> {
        const key = portfolio.getUuid();
        if (!this.store.has(key)) {
            throw new Error(`Portfolio not found`);
        }
        this.store.set(key, portfolio);
    }

    async delete(uuid: string): Promise<void> {
        if (!this.store.has(uuid)) {
            throw new Error(`Portfolio not found`);
        }
        this.store.delete(uuid);
    }
}
