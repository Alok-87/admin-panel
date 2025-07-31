import { CourseFormValues } from '../../createCourse/types';

export const defaultCourseValues: CourseFormValues = {
  title: 'JEE Advanced Preparation',
  slug: 'jee-advanced-preparation',
  category: 'Engineering',
  subtitle: 'Complete JEE Advanced crash course',
  description: 'This course helps you crack JEE Advanced with top-notch content and mentorship.',
  duration: '6 Months',
  successRate: 92,
  qualifiedCount: '4500',
  yearsOfExcellence: 10,
  bannerImage: null,
  floatingHighlights: ['Top Mentors', 'Live Doubts', 'Test Series'],

  examPattern: {
    questionFormat: 'MCQ + Integer Type',
    duration: '3 hours',
    markingSystem: 'Negative Marking: -1, Correct: +4'
  },

  topicBreakdown: [
    { topic: 'Physics', percentage: 35 },
    { topic: 'Chemistry', percentage: 30 },
    { topic: 'Maths', percentage: 35 }
  ],

  programs: [
    {
      mode: 'Online',
      title: 'Full Online Program',
      description: 'Access full recorded lectures, test series, and doubt-solving sessions.',
      price: 14999,
      priceLabel: '₹14,999',
      features: ['Live Classes', 'Test Series', '24x7 Doubt Support']
    },
    {
      mode: 'Offline',
      title: 'Hybrid Classroom',
      description: 'Attend in-person weekend sessions and online weekdays.',
      price: 22999,
      priceLabel: '₹22,999',
      features: ['In-person Faculty', 'Printed Notes', 'Lab Access']
    }
  ],

  whyChooseUs: [
    {
      icon: '🎯',
      title: 'Personal Mentorship',
      description: '1-on-1 guidance to keep you on track.'
    },
    {
      icon: '📊',
      title: 'Detailed Analytics',
      description: 'Track your performance with in-depth analysis.'
    }
  ],

  topicCoverage: [
    {
      title: 'Modern Physics',
      description: 'Covers semiconductors, photoelectric effect, and nuclear physics.'
    },
    {
      title: 'Organic Chemistry',
      description: 'All important reaction mechanisms and named reactions.'
    }
  ],

  faculty: [
    {
      name: 'Dr. Rajiv Mehta',
      designation: 'Senior Physics Faculty',
      bio: '15+ years teaching Physics for JEE aspirants.',
      expertise: ['Mechanics', 'Modern Physics'],
      photo: null
    },
    {
      name: 'Ms. Nidhi Sharma',
      designation: 'Chemistry Expert',
      bio: 'Gold medalist with 10 years of teaching experience.',
      expertise: ['Organic', 'Inorganic Chemistry'],
      photo: null
    }
  ],

  testimonials: [
    {
      name: 'Amit Gupta',
      scoreSummary: 'AIR 112, JEE Advanced',
      subjectScore: 'Physics: 90, Chemistry: 85, Math: 88',
      quote: 'The mock tests and mentorship helped me tremendously.',
      photo: null
    },
    {
      name: 'Sneha Reddy',
      scoreSummary: 'AIR 298, JEE Advanced',
      subjectScore: 'Physics: 85, Chemistry: 89, Math: 84',
      quote: 'Amazing content and great support from the team.',
      photo: null
    }
  ],

  showTrialButton: true,
  showBrochureButton: true,
  brochureUrl: 'https://example.com/sample-brochure.pdf',

  metaTitle: 'JEE Advanced Online Coaching',
  metaDescription: 'Crack JEE Advanced with India’s top faculty and personalized mentorship.',
  metaKeywords: 'JEE Advanced, Online Coaching, Best JEE Preparation',
  isPublished: false
};
