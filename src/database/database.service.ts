import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService<T> {
    getCollection(collectionName: string): T[]{
        return JSON.parse(localStorage.getItem(collectionName) ?? '[]') as T[];
        
    }
    setCollection(collectionName: string, item: T[]) {
        localStorage.setItem(collectionName,JSON.stringify(item));
    }
}
