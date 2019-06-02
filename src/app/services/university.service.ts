/**
 * Copyright (c) 2019 Stephan Giles
 *
 * This code is licensed under MIT license.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

/**
 * The university service class
 *
 */
@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  // url to the API server for the University Domains
  // see https://github.com/Hipo/university-domains-list-api
  // service running locally
  private baseUrl = 'http://localhost:5000';

  /**
   * Constructor
   *
   * @param http The http client service
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieve a list of universities by name and country
   *
   * @param name Retrieve universities by name
   * @param country Retrieve universities by country
   * @returns An observable containing the result of the action
   */
  getUniversities(name: string, country: string): Observable<any> {
    return this.http.get(this.baseUrl + '/search?name=' + name + '&country=' + country);
  }

  // todo - correctly build url and add error handling
  saveUniversity(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/', data);
  }

  // todo - correctly build url and add error handling
  editUniversity(data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/', data);
  }
}
