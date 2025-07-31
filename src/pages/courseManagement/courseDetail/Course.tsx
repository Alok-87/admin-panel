// pages/course/[id].tsx
import { CourseDetail } from "./CourseDetail";
import course from '../../../Assets/course.avif'

const sampleCourse = {
  id: "1",
  title: "JEE Mains Complete Preparation Course",
  slug: "jee-mains",
  category: "JEE",
  subtitle: "Comprehensive preparation for JEE Mains 2024",
  description: "This course covers all topics required for JEE Mains with detailed explanations, practice problems, and mock tests. Taught by IIT alumni with 10+ years of experience.",
  duration: "12 months",
  successRate: 92,
  qualifiedCount: "1200+",
  yearsOfExcellence: 8,
  bannerImage: course,
  highlights: [
    "200+ hours of video lectures",
    "5000+ practice problems",
    "20 full-length mock tests",
    "Doubt solving sessions"
  ],
  examPattern: {
    questionFormat: "Multiple Choice Questions (MCQs)",
    duration: "3 hours",
    markingSystem: "+4 for correct, -1 for incorrect"
  },
  topicBreakdown: [
    { topic: "Mechanics", percentage: 35 },
    { topic: "Electrodynamics", percentage: 25 },
    { topic: "Modern Physics", percentage: 20 },
    { topic: "Thermodynamics", percentage: 15 },
    { topic: "Optics", percentage: 5 }
  ],
  programs: [
    {
      mode: "Online",
      title: "Standard Program",
      description: "Access to all video lectures, practice problems, and monthly tests",
      price: 25000,
      priceLabel: "per year",
      features: [
        "200+ hours of video lectures",
        "Unlimited practice problems",
        "10 mock tests",
        "Email support"
      ]
    },
    {
      mode: "Hybrid",
      title: "Premium Program",
      description: "Includes all standard features plus live doubt sessions and personal mentorship",
      price: 45000,
      priceLabel: "per year",
      features: [
        "All Standard features",
        "Weekly live doubt sessions",
        "Personal mentor",
        "Priority support"
      ]
    }
  ],
  whyChooseUs: [
    {
      icon: "fa-chalkboard-teacher",
      title: "Expert Faculty",
      description: "Learn from IIT/NIT alumni with 10+ years of teaching experience"
    },
    {
      icon: "fa-book",
      title: "Comprehensive Material",
      description: "Cover all topics with detailed theory and ample practice problems"
    },
    {
      icon: "fa-chart-line",
      title: "Performance Tracking",
      description: "Regular tests with detailed analytics to track your progress"
    }
  ],
  topicCoverage: [
    {
      title: "Mechanics",
      description: "Kinematics\nDynamics\nWork, Energy & Power\nRotational Motion\nGravitation"
    },
    {
      title: "Electrodynamics",
      description: "Electrostatics\nCurrent Electricity\nMagnetic Effects\nElectromagnetic Induction\nAC Circuits"
    }
  ],
  faculty: [
    {
      name: "Dr. Ravi Sharma",
      designation: "Physics Expert",
      bio: "PhD in Physics from IIT Delhi with 12 years of teaching experience. Specialized in Mechanics and Electrodynamics.",
      expertise: ["Mechanics", "Electrodynamics", "Problem Solving"],
      photo: "/faculty1.jpg"
    },
    {
      name: "Prof. Neha Gupta",
      designation: "Modern Physics Specialist",
      bio: "M.Tech from IIT Bombay with 8 years of experience. Focuses on making modern physics concepts easy to understand.",
      expertise: ["Modern Physics", "Optics", "Semiconductors"],
      photo: "/faculty2.jpg"
    }
  ],
  testimonials: [
    {
      name: "Aarav Patel",
      scoreSummary: "AIR 124 in JEE Mains 2023",
      subjectScore: "Physics: 98/100",
      quote: "This course helped me understand concepts deeply rather than just memorizing formulas. The problem-solving approach was especially helpful.",
      photo: "/student1.jpg"
    },
    {
      name: "Priya Singh",
      scoreSummary: "AIR 89 in JEE Mains 2023",
      subjectScore: "Physics: 95/100",
      quote: "The faculty's teaching style made even complex topics seem simple. Regular tests kept me on track with my preparation.",
      photo: "/student2.jpg"
    }
  ],
  showTrialButton: true,
  showBrochureButton: true,
  brochureUrl: "/brochures/jee-mains.pdf",
  isPublished: true
};

const Course = () => {
  return <CourseDetail course={sampleCourse} />;
};

export default Course;