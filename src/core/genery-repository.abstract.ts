import { Observable } from 'rxjs';

export interface IGeneryRepository<T, I> {
  getAll(): Observable<I[]>;
  findOne(id: string | number): Observable<I>;
  create(body: T): Observable<I>;
  update(id: string | number, body: T): Observable<I>;
  delete(id: string | number): Observable<I>;
}
