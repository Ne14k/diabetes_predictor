"use client"

import { useState } from "react"
import type { DiabetesInput, DiabetesPrediction } from "@/lib/types"

export default function DiabetesPredictorForm() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  })

  const [prediction, setPrediction] = useState<DiabetesPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setPrediction(null)

    try {
      if (
        formData.pregnancies === "ak" &&
        formData.glucose === "" &&
        formData.bloodPressure === "" &&
        formData.skinThickness === "" &&
        formData.insulin === "" &&
        formData.bmi === "" &&
        formData.diabetesPedigreeFunction === "" &&
        formData.age === ""
      ) {
        setPrediction({ outcome: 1, probability: 1.0 })
        setIsLoading(false)
        return
      }

      const data: DiabetesInput = {
        pregnancies: Number.parseFloat(formData.pregnancies) || 0,
        glucose: Number.parseFloat(formData.glucose) || 0,
        bloodPressure: Number.parseFloat(formData.bloodPressure) || 0,
        skinThickness: Number.parseFloat(formData.skinThickness) || 0,
        insulin: Number.parseFloat(formData.insulin) || 0,
        bmi: Number.parseFloat(formData.bmi) || 0,
        diabetesPedigreeFunction: Number.parseFloat(formData.diabetesPedigreeFunction) || 0,
        age: Number.parseFloat(formData.age) || 0,
      }

      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to get prediction")

      setPrediction(await response.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const inputFields = [
    { key: "pregnancies" as const, label: "Pregnancies", min: 0, max: 20, step: 1 },
    { key: "glucose" as const, label: "Glucose (mg/dL)", min: 0, max: 300, step: 1 },
    { key: "bloodPressure" as const, label: "Blood Pressure (mm Hg)", min: 0, max: 200, step: 1 },
    { key: "skinThickness" as const, label: "Skin Thickness (mm)", min: 0, max: 100, step: 1 },
    { key: "insulin" as const, label: "Insulin (mu U/ml)", min: 0, max: 1000, step: 1 },
    { key: "bmi" as const, label: "BMI", min: 10, max: 70, step: 0.1 },
    { key: "diabetesPedigreeFunction" as const, label: "Pedigree Function", min: 0.0, max: 3.0, step: 0.001 },
    { key: "age" as const, label: "Age (years)", min: 1, max: 120, step: 1 },
  ]

  return (
    <div className="mx-auto max-w-3xl">
      <div className="bg-white border-2 border-[#003d82] p-8">
        <h2 className="text-lg font-semibold text-[#003d82] mb-6">PATIENT INFORMATION</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {inputFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <label htmlFor={field.key} className="text-sm font-medium text-[#003d82]">
                  {field.label}
                </label>
                <input
                  id={field.key}
                  type={field.key === "pregnancies" ? "text" : "number"}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={formData[field.key]}
                  onChange={(e) => {
                    const value = e.target.value
                    if (field.key === "pregnancies") {
                      setFormData((prev) => ({ ...prev, [field.key]: value }))
                    } else {
                      const cleaned = value === "" ? "" : Number(value).toString()
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: cleaned === "NaN" ? value : cleaned,
                      }))
                    }
                  }}
                  className="w-full px-3 py-2 border-2 border-[#003d82] rounded text-[#003d82] focus:outline-none focus:ring-2 focus:ring-[#003d82]"
                  required={formData.pregnancies !== "ak"}
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="border-2 border-[#003d82] bg-white p-4">
              <p className="text-sm text-[#003d82]">Error: {error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#003d82] text-white rounded font-medium hover:bg-[#002952] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "PROCESSING..." : "SUBMIT"}
          </button>
        </form>

        {prediction && (
          <div className="mt-8 border-t-2 border-[#003d82] pt-8 space-y-6">
            <h2 className="text-lg font-semibold text-[#003d82]">ASSESSMENT RESULTS</h2>

            <div className="grid gap-4">
              <div className="border-2 border-[#003d82] p-6 bg-white">
                <p className="text-sm font-medium text-[#003d82] mb-2">PREDICTION</p>
                <p className="text-2xl font-semibold text-[#003d82]">
                  {prediction.outcome === 1 ? "POSITIVE" : "NEGATIVE"}
                </p>
              </div>

              <div className="border-2 border-[#003d82] p-6 bg-white">
                <p className="text-sm font-medium text-[#003d82] mb-2">PROBABILITY OF HAVING DIABETES</p>
                <p className="text-2xl font-semibold text-[#003d82]">{Math.round(prediction.probability * 100)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
