import { Injectable } from '@angular/core';
import axios from 'axios';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(private securityService: SecurityService) {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.interceptors.request.use(axiosInterceptor(this.securityService));

    axios.interceptors.response.use(
      (response) => {
        if (response.data) {
          response.data = JSON.parse(this.securityService.decrypt(response.data));
        }
        return response;
      },
      (error) => {
        console.error('Error:', error);
        return Promise.reject(error);
      }
    );
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }


  request(method: string, url: string, data: any): Promise<any> {
      let headers: any = {};

      if (this.getAuthToken() !== null) {
          headers = {"Authorization": "Bearer " + this.getAuthToken()};
      }

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }
}


export const axiosInterceptor = (securityService: SecurityService) => (config: any) => {
  if (config.data) {
    config.data = securityService.encrypt(JSON.stringify(config.data));
  }
  return config;
};
