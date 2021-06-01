import { environment } from '../../../environments/environment'

export class DataService {

  private static url = environment.apiUrl;
  public static errorOccured: boolean = false;

  constructor() { }

  static async getRequest(endpoint: string) {
    const response = await fetch(`${this.url}${endpoint}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

  static async postRequest(endpoint:any, data: any) {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data)

    });
    const jsonData = await response.json()
    return jsonData;
  }

  static async getLoginRequest(){
    const response = await fetch(`${this.url}/login`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  }

}
