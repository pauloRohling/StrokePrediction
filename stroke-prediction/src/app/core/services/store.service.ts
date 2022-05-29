import { Injectable } from "@angular/core";
import { IDataItem } from "../model/data.item.interface";

@Injectable({providedIn: "root"})
export class StoreService {

  genders: Array<IDataItem>;
  yesNo: Array<IDataItem>;
  smokingStatus: Array<IDataItem>;

  constructor() {
    this.genders = [
      { id: 0, display: "Masculino" },
      { id: 1, display: "Feminino" },
      { id: 2, display: "Outro" },
    ];

    this.yesNo = [
      { id: true, display: "Sim" },
      { id: false, display: "Não" },
    ];

    this.smokingStatus = [
      { id: 0, display: "Desconhecido" },
      { id: 1, display: "Não-fumante" },
      { id: 2, display: "Ex-fumante" },
      { id: 3, display: "Fumante" },
    ];
  }

}
