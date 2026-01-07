export interface DiabetesInput {
  pregnancies: number
  glucose: number
  bloodPressure: number
  skinThickness: number
  insulin: number
  bmi: number
  diabetesPedigreeFunction: number
  age: number
}

export interface DiabetesPrediction {
  outcome: number // 1 = Diabetes, 0 = No diabetes
  probability: number // 0.0 to 1.0
  model_name?: string
}
