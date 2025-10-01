import { Portfolio } from "@/Portfolio/domain/models/Portfolio";

export default interface PortfolioRepository {
    save(portfolio: Portfolio): Promise<void>;
    findAll(): Promise<Portfolio[]>;
    findById(uuid: string): Promise<Portfolio | null>;
    update(portfolio: Portfolio): Promise<void>;
    delete(uuid: string): Promise<void>;
}
