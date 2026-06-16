import { ServiceCategory } from "../../domain/entities/ServiceCategory";
import { ILookupRepository } from "../../domain/repositories/ILookupRepository";

export class GetCategoriesUseCase {
  constructor(private readonly repository: ILookupRepository) {}

  async execute(): Promise<ServiceCategory[]> {
    return this.repository.getCategories();
  }
}
