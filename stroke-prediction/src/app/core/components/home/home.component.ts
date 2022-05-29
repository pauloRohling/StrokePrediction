import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Record } from "../../model/record";
import { UnsubscribeDirective } from "../../directives/unsubscribe.directive";
import { BehaviorSubject, catchError, concatMap, map, of, Subject } from "rxjs";
import { RecordService } from "../../services/record.service";
import { RecordDto } from "../../model/record.dto";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscribeDirective implements OnInit {

  fetchData$: Subject<Record>;
  columns: Array<any>;
  rows$: BehaviorSubject<Array<RecordDto>>;

  constructor(private recordService: RecordService) {
    super();
    this.fetchData$ = new Subject<Record>();
    this.rows$ = new BehaviorSubject<Array<RecordDto>>([]);
    this.columns = Object.keys(new RecordDto())
      .map((key) => ({name: key}));
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

  formSubmit(record: Record): void {
    this.fetchData$.next(record);
  }

}
