import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Record } from "../../model/record";
import { UnsubscribeDirective } from "../../directives/unsubscribe.directive";
import { BehaviorSubject, catchError, concatMap, map, of, Subject } from "rxjs";
import { RecordService } from "../../services/record.service";
import { RecordDto } from "../../model/record.dto";
import { StoreService } from "../../services/store.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscribeDirective implements OnInit, AfterViewInit {

  fetchData$: Subject<Record>;
  columns: Array<any>;
  rows$: BehaviorSubject<Array<RecordDto>>;

  @ViewChild('smokingStatusTemplate') smokingStatusTemplate: TemplateRef<any> | undefined;
  @ViewChild('yesNoTemplate') yesNoTemplate: TemplateRef<any> | undefined;
  @ViewChild('genderTemplate') genderTemplate: TemplateRef<any> | undefined;

  constructor(private recordService: RecordService, private storeService: StoreService) {
    super();
    this.fetchData$ = new Subject<Record>();
    this.rows$ = new BehaviorSubject<Array<RecordDto>>([]);
    this.columns = []
  }

  ngOnInit(): void {
    this.addSubscription(this.fetchData$
      .pipe(
        concatMap((record) => {
          return this.recordService.getStrokePrediction(record)
            .pipe(
              map((list) => ({list, error: null})),
              catchError((error) => of({list: null, error})),
            );
        })
      )
      .subscribe((obj: {list: Array<RecordDto> | null; error: any}) => {
        if (!obj.error && obj.list) {
          obj.list.forEach(value => {
            if (value.similarity) {
              value.similarity = parseFloat((value.similarity * 100).toFixed(3));
            }
          })
          this.rows$.next(obj.list);
        }
      }));
  }

  ngAfterViewInit(): void {
    this.columns = [
      { name: "ID", prop: "id", width: 50, draggable: false},
      { name: "Gênero", prop: "gender", width: 50, draggable: false, cellTemplate: this.genderTemplate},
      { name: "Idade", prop: "age", width: 50, draggable: false},
      { name: "Hipertensão", prop: "hypertension", width: 50, draggable: false, cellTemplate: this.yesNoTemplate},
      { name: "Doença Cardíaca", prop: "heartDisease", width: 50, draggable: false, cellTemplate: this.yesNoTemplate},
      { name: "Nível de Glicose", prop: "avgGlucoseLevel", width: 50, draggable: false},
      { name: "IMC", prop: "bmi", width: 50, draggable: false},
      { name: "Tabagismo", prop: "smokingStatus", width: 50, draggable: false, cellTemplate: this.smokingStatusTemplate},
      { name: "AVC", prop: "stroke", width: 50, draggable: false, cellTemplate: this.yesNoTemplate},
      { name: "Similaridade (%)", prop: "similarity", width: 50, draggable: false},
    ];
  }

  formSubmit(record: Record): void {
    this.fetchData$.next(record);
  }

  getSmokingStatus(status: number): string {
    const match = this.storeService.smokingStatus.find(value => value.id === status);
    return match ? match.display : "";
  }

  getYesNo(status: boolean): string {
    const match = this.storeService.yesNo.find(value => value.id === status);
    return match ? match.display : "";
  }

  getGender(status: number): string {
    const match = this.storeService.genders.find(value => value.id === status);
    return match ? match.display : "";
  }

}
