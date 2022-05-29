import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RecordDto } from "../model/record.dto";
import { Record } from "../model/record";
import { environment } from "../../../environments/environment";
import { StoreService } from "./store.service";

@Injectable({providedIn: "root"})
export class RecordService {

  constructor(private httpClient: HttpClient, private storeService: StoreService) { }

  public getStrokePrediction(record: Record): Observable<Array<RecordDto>> {
    const requirement = {record, weights: this.storeService.weights$.getValue()};
    return this.httpClient.post<Array<RecordDto>>(`${environment.serverUrl}/records`, requirement);
  }

}
