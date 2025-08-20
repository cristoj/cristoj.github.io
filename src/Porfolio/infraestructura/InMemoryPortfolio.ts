import { Portfolio } from "@/Porfolio/domain/models/Portfolio";
import PortfolioRepository from "@/Porfolio/domain/ports/PortfolioRepository";

export default class InMemoryPortfolio implements PortfolioRepository {
    private store: Map<string, Portfolio> = new Map();

    async save(portfolio: Portfolio): Promise<void> {
        this.store.set(portfolio.getUuid(), portfolio);
    }

    async findById(uuid: string): Promise<Portfolio | null> {
        // Iterate through the map to find by key (uuid)
        for (const entry of this.store) {
            if (entry[0] === uuid) {
                return entry[1];
            }
        }
        return null;
    }

    async findAll(): Promise<Portfolio[]> {
        return Array.from(this.store.values());
    }

    async update(portfolio: Portfolio): Promise<void> {
        const key = portfolio.getUuid();
        const exists = Array.from(this.store.keys()).some(k => k === key);

        if (!exists) {
            throw new Error(`Portfolio not found`);
        }

        this.store.set(key, portfolio);
    }

    async delete(uuid: string): Promise<void> {
        const exists = this.store.has(uuid);

        if (!exists) {
            throw new Error(`Portfolio not found`);
        }

        this.store.delete(uuid);
    }
}
