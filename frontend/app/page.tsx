import DiabetesPredictorForm from "@/components/diabetes-predictor-form"

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-2 border-[#003d82] bg-white">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-[#003d82]">DIABETES RISK ASSESSMENT</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <DiabetesPredictorForm />
      </main>
    </div>
  )
}
