import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RecordDto } from "../model/record.dto";
import { Record } from "../model/record";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class RecordService {

  constructor(private httpClient: HttpClient) { }

  public getStrokePrediction(record: Record): Observable<Array<RecordDto>> {
    const requirement = {record, weights: null};
    return this.httpClient.post<Array<RecordDto>>(`${environment.serverUrl}/records`, requirement);
  }

}
