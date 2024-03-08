export interface IBaseModel<T> {
    getCollectionName(): string;
    insertOne(document: T): Promise<InsertOneResult<T>>;
    insertMany(document: T[]): Promise<InsertManyResult<T>>;
    update(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>,
        options?: UpdateOptions & { multi?: true }): void;
    updateOne(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions & { multi: true }): void;
    updateMany(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions): Promise<UpdateResult>;
    removeById(_id: T['_id']): Promise<DeleteResult>;

    deleteOne(filter: Filter<T>, options?: DeleteOptions & { bypassDocumentValidation?: boolean }): Promise<DeleteResult>;
    deleteMany(filter: Filter<T>, options?: DeleteOptions): Promise<DeleteResult>;
    findOneAndUpdate(query: Filter<T>, update: UpdateFilter<T> | T, options?: FindOneAndUpdateOptions): Promise<WithId<T> | null>;
    findOne(query: Filter<T>, options?: undefined): Promise<WithId<T> | null>;
    find(query?: Filter<T>): FindCursor<WithId<T>>;
    aggregate(pipeline?: Document[], options?: AggregateOptions):  Promise<any>;
}