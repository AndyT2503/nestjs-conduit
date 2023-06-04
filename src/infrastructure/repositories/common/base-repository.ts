import { IRepository } from 'src/domain/repository';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  ObjectLiteral,
  Repository,
  SaveOptions,
} from 'typeorm';

export class BaseRepository<Entity extends ObjectLiteral>
  implements IRepository<Entity>
{
  private _repository: Repository<Entity>;
  constructor(repository: Repository<Entity>) {
    this._repository = repository;
  }

  async delete(
    criteria:
      | string
      | number
      | string[]
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ): Promise<DeleteResult> {
    return await this._repository.delete(criteria);
  }

  async findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
    return this._repository.findOne(options);
  }

  async find(options?: FindManyOptions<Entity> | undefined): Promise<Entity[]> {
    return await this._repository.find(options);
  }

  async findAndCount(
    options?: FindManyOptions<Entity> | undefined,
  ): Promise<[Entity[], number]> {
    return await this._repository.findAndCount(options);
  }

  async save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions | undefined,
  ): Promise<T & Entity> {
    return await this._repository.save(entity, options);
  }
}
