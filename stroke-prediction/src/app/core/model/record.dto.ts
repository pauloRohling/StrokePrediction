export class RecordDto {
  id: number | null;
  gender: number | null;
  age: number | null;
  bmi: number | null;
  hypertension: boolean | null;
  heartDisease: boolean | null;
  avgGlucoseLevel: number | null;
  smokingStatus: number | null;
  stroke: boolean | null;
  similarity: number | null;

  constructor() {
    this.id = null;
    this.gender = null;
    this.age = null;
    this.hypertension = null;
    this.heartDisease = null;
    this.avgGlucoseLevel = null;
    this.bmi = null;
    this.smokingStatus = null;
    this.stroke = null;
    this.similarity = null;
  }
}
