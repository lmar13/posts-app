import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../../model/Post';
import {EnvironmentProviderService} from '../environment/environment-provider.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient,
              envProvider: EnvironmentProviderService) {
    this.baseUrl = envProvider.current.apiBaseUri;
  }

  public getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/posts`);
  }

  public getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/posts/${id}`);
  }
}
