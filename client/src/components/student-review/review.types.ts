export interface Course {
  id: number
  title: string
}

export interface Trainer {
  id: number
  name: string
  courses: Course[]
}

export interface FeedbackPayload {
  courseId: number
  rating: number
  sentiment: string
  review: string
}
