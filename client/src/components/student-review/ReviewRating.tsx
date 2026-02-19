import { useState } from "react"

interface Props {
  value: number
  onChange: (rating: number) => void
}

export default function ReviewRating({ value, onChange }: Props) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-2xl ${
            star <= (hover || value) ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  )
}
