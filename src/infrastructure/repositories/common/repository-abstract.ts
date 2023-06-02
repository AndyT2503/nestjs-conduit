import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  SaveOptions,
} from 'typeorm';

export abstract class AbstractRepository<Entity> {
  abstract findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;
  abstract find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
  abstract save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;
  abstract delete(
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
