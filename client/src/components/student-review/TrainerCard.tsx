import { useNavigate } from "react-router-dom"
import { Trainer } from "./review.types"

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  const navigate = useNavigate()

  return (
    <div className="border rounded-xl p-4 shadow">
      <h2 className="text-lg font-semibold">{trainer.name}</h2>

      <ul className="text-sm mt-2">
        {trainer.courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>

      <button
        className="mt-3 bg-purple-600 text-white px-3 py-1 rounded"
        onClick={() =>
          navigate("/submit-feedback", {
            state: trainer.courses[0].id
          })
        }
      >
        Submit Feedback
      </button>
    </div>
  )
}
