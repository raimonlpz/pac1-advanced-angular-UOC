import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private activitiesUrl = 'api/activities';
  httpOptions = {
    headers: new HttpHeaders({' Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getActivity(id: number): Observable<Activity> {
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.get<Activity>(url).pipe(
      tap(_ => this.log(`fetched activity id:${id}`)),
      catchError(this.handleError<Activity>(`getActivity id=${id}`))
    );
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activitiesUrl).pipe(
        tap(_ => this.log('fetched activities')),
        catchError(this.handleError<Activity[]>('getActivities', []))
    );
  }

  updateActivity(activity: Activity): Observable<Activity> {
    return this.http.put(this.activitiesUrl, activity, this.httpOptions).pipe(
      tap(_ => this.log(`updated activity id=${activity.id}`)),
      catchError(this.handleError<any>('updateActivity'))
    );
  }

  addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.activitiesUrl, activity, this.httpOptions).pipe(
      tap((newActivity: Activity) => this.log(`added activity w/ id =${newActivity.id}`)),
      catchError(this.handleError<Activity>('addActivity'))
    );
  }

  deleteActivity(activity: Activity | number): Observable<Activity> {
    const id = typeof activity === 'number' ? activity : activity.id;
    const url = `${this.activitiesUrl}/${id}`;
    return this.http.delete<Activity>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted activity id=${id}`)),
      catchError(this.handleError<Activity>('deleteActivity'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(msg: string): void {
    console.log(`ActivityService Logs: ${msg}`);
  }
}
