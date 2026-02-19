import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ReviewRating from "./ReviewRating"
import { submitFeedback } from "./reviewApi"

export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [sentiment, setSentiment] = useState("")
  const [review, setReview] = useState("")

  const { state: courseId } = useLocation()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await submitFeedback({ courseId, rating, sentiment, review })
    alert("Feedback submitted")
    navigate("/trainee/dashboard")
  }

  return (
    <div className="max-w-md mx-auto space-y-4">

      <ReviewRating value={rating} onChange={setRating} />

      <select
        className="border p-2 w-full"
        value={sentiment}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSentiment(e.target.value)
        }
      >
        <option value="">Select Sentiment</option>
        <option value="VERY_POOR">Very Poor</option>
        <option value="POOR">Poor</option>
        <option value="NEUTRAL">Neutral</option>
        <option value="GOOD">Good</option>
        <option value="VERY_GOOD">Very Good</option>
      </select>

      <textarea
        className="border p-2 w-full"
        placeholder="Write review"
        value={review}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setReview(e.target.value)
        }
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSubmit}
      >
        Submit
      </button>

    </div>
  )
}
