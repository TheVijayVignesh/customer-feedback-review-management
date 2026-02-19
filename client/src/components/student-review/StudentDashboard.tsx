import { useEffect, useState } from "react"
import { getTrainers } from "./reviewApi"
import { Trainer } from "./review.types"
import TrainerCard from "./TrainerCard"

export default function StudentDashboard() {
  const [trainers, setTrainers] = useState<Trainer[]>([])

  useEffect(() => {
    getTrainers().then((res) => setTrainers(res.data))
  }, [])

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer.id} trainer={trainer} />
      ))}
    </div>
  )
}
