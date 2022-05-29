import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Record } from "../../model/record";
import { UnsubscribeDirective } from "../../directives/unsubscribe.directive";
import { BehaviorSubject, catchError, concatMap, map, Observable, of, Subject, tap } from "rxjs";
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
  actualRecord$: BehaviorSubject<Array<RecordDto>>;
  score$: Observable<number>;

  @ViewChild('smokingStatusTemplate') smokingStatusTemplate: TemplateRef<any> | undefined;
  @ViewChild('yesNoTemplate') yesNoTemplate: TemplateRef<any> | undefined;
  @ViewChild('genderTemplate') genderTemplate: TemplateRef<any> | undefined;

  constructor(private recordService: RecordService, private storeService: StoreService) {
    super();
    this.fetchData$ = new Subject<Record>();
    this.rows$ = new BehaviorSubject<Array<RecordDto>>([]);
    this.actualRecord$ = new BehaviorSubject<Array<RecordDto>>([]);
    this.score$ = this.rows$
      .pipe(
        map((rows) => rows.slice(0, 10).filter((row) => row.stroke).length)
      );
    this.columns = []
  }

  ngOnInit(): void {
    this.addSubscription(this.fetchData$
      .pipe(
        tap((record) => {
          const object: RecordDto = {...record, bmi: parseFloat((record.bmi!).toFixed(1))} as RecordDto;
          this.actualRecord$.next([object])
        }),
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
      { name: "ID", prop: "id", draggable: false, minWidth: 0},
      { name: "Gênero", prop: "gender", draggable: false, cellTemplate: this.genderTemplate, minWidth: 0},
      { name: "Idade", prop: "age", draggable: false, minWidth: 0},
      { name: "Hipertensão", prop: "hypertension", draggable: false, cellTemplate: this.yesNoTemplate, minWidth: 0},
      { name: "Doença Cardíaca", prop: "heartDisease", draggable: false, cellTemplate: this.yesNoTemplate, minWidth: 0},
      { name: "Nível de Glicose", prop: "avgGlucoseLevel", draggable: false, minWidth: 0},
      { name: "IMC", prop: "bmi", draggable: false, minWidth: 0},
      { name: "Tabagismo", prop: "smokingStatus", draggable: false, cellTemplate: this.smokingStatusTemplate, minWidth: 0},
      { name: "AVC", prop: "stroke", draggable: false, cellTemplate: this.yesNoTemplate, minWidth: 0},
      { name: "Similaridade (%)", prop: "similarity", draggable: false, minWidth: 0},
    ];
  }

  back(): void {
    this.rows$.next([]);
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
