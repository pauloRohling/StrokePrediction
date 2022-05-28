export class Record {
  gender: number | null;
  age: number | null;
  bmi: number | null;
  hypertension: boolean | null;
  heartDisease: boolean | null;
  avgGlucoseLevel: number | null;
  smokingStatus: number | null;

  constructor() {
    this.gender = null;
    this.age = null;
    this.hypertension = null;
    this.heartDisease = null;
    this.avgGlucoseLevel = null;
    this.bmi = null;
    this.smokingStatus = null;
  }
}
