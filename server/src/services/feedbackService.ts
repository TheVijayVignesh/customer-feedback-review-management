import { PrismaClient } from '../../generated/prisma';
import { FeedbackDto, StatsDto, FeedbackQuery, ResponseDto } from '../types';

const prisma = new PrismaClient();

export class FeedbackService {
  async getStats(): Promise<StatsDto> {
    const total = await prisma.feedback.count();
    const replied = await prisma.feedback.count({
      where: { response: { isNot: null } }
    });
    const pending = total - replied;
    
    const avgRatingResult = await prisma.feedback.aggregate({
      _avg: { rating: true }
    });
    
    const avgRating = Math.round((avgRatingResult._avg.rating || 0) * 10) / 10;
    
    return { total, replied, pending, avgRating };
  }

  async getFeedbacks(query: FeedbackQuery): Promise<FeedbackDto[]> {
    const { filter = 'all', search = '' } = query;
    
    console.log('Service called with:', { filter, search }); // Debug log
    
    const whereClause: any = {};
    
    if (filter === 'replied') {
      whereClause.response = { isNot: null };
    } else if (filter === 'pending') {
      whereClause.response = null;
    }
    
    if (search && search.trim()) {
      whereClause.OR = [
        { trainee: { name: { contains: search } } },
        { course: { title: { contains: search } } },
        { review: { contains: search } } 
      ];
      console.log('Search whereClause:', JSON.stringify(whereClause, null, 2)); // Debug log
    }
    
    const feedbacks = await prisma.feedback.findMany({
      where: whereClause,
      include: {
        trainee: true,
        course: true,
        response: {
          include: {
            admin: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    console.log('Database query returned:', feedbacks.length, 'results'); // Debug log
    
    return feedbacks.map(feedback => {
      if (!feedback.trainee || !feedback.course) {
        console.warn(`Incomplete feedback data for ID ${feedback.id}`);
        throw new Error(`Incomplete feedback data for feedback ID ${feedback.id}`);
      }
      
      return {
        id: feedback.id,
        studentName: feedback.trainee.name,
        rating: feedback.rating,
        ratingLabel: this.getRatingLabel(feedback.sentiment),
        comment: feedback.review,
        course: feedback.course.title,
        date: feedback.createdAt.toISOString().slice(0, 10),
        status: feedback.response ? 'replied' : 'pending',
        response: feedback.response ? {
          adminName: feedback.response.admin?.name || 'Unknown',
          message: feedback.response.message,
          date: feedback.response.createdAt.toISOString().slice(0, 10)
        } : null
      };
    });
  }

  async getFeedbackById(id: number) {
    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: {
        trainee: true,
        course: true,
        response: {
          include: {
            admin: true
          }
        }
      }
    });
    
    if (!feedback) {
      return null;
    }
    
    return {
      id: feedback.id,
      rating: feedback.rating,
      review: feedback.review,
      sentiment: feedback.sentiment,
      traineeId: feedback.traineeId,
      courseId: feedback.courseId,
      trainee: feedback.trainee,
      course: feedback.course,
      response: feedback.response,
      createdAt: feedback.createdAt
    };
  }

  private getRatingLabel(sentiment: string): string {
    const sentimentMap: { [key: string]: string } = {
      'VERY_POOR': 'Very Poor',
      'POOR': 'Poor',
      'NEUTRAL': 'Neutral',
      'GOOD': 'Good',
      'VERY_GOOD': 'Very Good'
    };
    return sentimentMap[sentiment] || sentiment || 'Neutral';
    return sentimentMap[sentiment] || 'Neutral';
  }
}
