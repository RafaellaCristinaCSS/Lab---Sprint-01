import { User } from "../../domain/entities/User";
import { ILookupRepository } from "../../domain/repositories/ILookupRepository";

export class GetUsersUseCase {
  constructor(private readonly repository: ILookupRepository) {}

  async execute(): Promise<User[]> {
    return this.repository.getUsers();
  }
}
