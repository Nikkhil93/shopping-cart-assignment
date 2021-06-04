import { environment } from '../../../environments/environment'

export class DataService {

  private static url = environment.apiUrl;
  public static errorOccured: boolean = false;

  //httpClient throwing CORS issue hence sticking with Promise
  static async postRequest(endpoint:any, data: any) {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const jsonData = await response.json()
    return jsonData;
  }
}
