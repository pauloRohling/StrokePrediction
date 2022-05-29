export class RecordWeight {
  gender: number;
  age: number;
  hypertension: number;
  heartDisease: number;
  avgGlucoseLevel: number;
  bmi: number;
  smokingStatus: number;

  constructor() {
    this.gender = 0.2;
    this.age = 0.5;
    this.hypertension = 1.0;
    this.heartDisease = 0.8;
    this.avgGlucoseLevel = 0.8;
    this.bmi = 0.8;
    this.smokingStatus = 0.8;
  }
}
