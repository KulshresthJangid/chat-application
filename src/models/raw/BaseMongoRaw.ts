import { AggregateOptions, Collection, Db, DeleteOptions, DeleteResult, Filter, FindCursor, FindOneAndUpdateOptions, InsertManyResult, InsertOneResult, OptionalUnlessRequiredId, UpdateFilter, UpdateOptions, UpdateResult, WithId, Document } from "mongodb";
import { IBaseRaw } from "../../core-typings/IBaseRaw";

export class BaseMongoRaw<T extends IBaseRaw> {
    protected collection: Collection<T>;
    protected collectionNamme: string;

    constructor(db: Db, collectionName: string) {
        this.collection = db.collection<T>(collectionName);
        this.collectionNamme = collectionName;
    }

    getCollectionName(): string {
        return this.collectionNamme;
    }

    async insertOne(document: T): Promise<InsertOneResult<T>> {
        const now = new Date();
        const documentWithTimeStamps: T = {
            ...document as unknown as T,
            createdAt: now,
            updatedAt: now,
        }
        return this.collection.insertOne(documentWithTimeStamps as unknown as OptionalUnlessRequiredId<T>);
    }

    insertMany(document: T[]): Promise<InsertManyResult<T>> {
        return this.collection.insertMany(document as unknown as OptionalUnlessRequiredId<T>[]);
    }

    update(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>,
        options?: UpdateOptions & { multi?: true }) {
        const operation = options?.multi ? 'updateMany' : 'updateOne';

        return this.collection[operation](filter, update, options);
    }

    updateOne(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions & { multi: true }) {
        if (options) {
            return this.collection.updateOne(filter, update, options);
        }
        return this.collection.updateOne(filter, update);
    }

    updateMany(filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options?: UpdateOptions): Promise<UpdateResult> {
        if (options) {
            return this.collection.updateMany(filter, update, options);
        }
        return this.collection.updateMany(filter, update);
    }

    removeById(_id: T['_id']): Promise<DeleteResult> {
        return this.collection.deleteOne({ _id } as Filter<T>);
    }

    async deleteOne(filter: Filter<T>, options?: DeleteOptions & { bypassDocumentValidation?: boolean }): Promise<DeleteResult> {
        if (options) {
            return this.collection.deleteOne(filter, options);
        }
        return this.collection.deleteOne(filter);
    }

    async deleteMany(filter: Filter<T>, options?: DeleteOptions): Promise<DeleteResult> {
        if (options) {
            return this.collection.deleteMany(filter, options);
        }

        return this.collection.deleteMany(filter);
    }

    async findOneAndUpdate(query: Filter<T>, update: UpdateFilter<T> | T, options?: FindOneAndUpdateOptions): Promise<WithId<T> | null> {
        return this.collection.findOneAndUpdate(query, update, options || {});
    }

    async findOne(query: Filter<T>, options?: undefined): Promise<WithId<T> | null> {
        return this.collection.findOne(query, options || {});
    }

    async find(query?: Filter<T>): Promise<WithId<T>[]> {
        let cursor = this.collection.find(query || {});
        let result = await cursor.toArray();
        return result;
    }

    async aggregate(pipeline?: Document[], options?: AggregateOptions): Promise<any> {
        if (options) {
            return this.collection.aggregate(pipeline, options);
        }
        return this.collection.aggregate(pipeline);
    }
}