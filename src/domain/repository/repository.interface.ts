import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  SaveOptions,
} from 'typeorm';

export interface IRepository<Entity> {
  findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;
  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;
  save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;
  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ): Promise<DeleteResult>;
  
}
