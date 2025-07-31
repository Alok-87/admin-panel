// CreateCourseForm.tsx
import { useFormik } from 'formik';
import { useState } from 'react';
import BasicInfoSection from './components/BasicInfoSection';
import KeyMetricsSection from './components/KeyMetricsSection';
import MediaSection from './components/MediaSection';
import ExamPatternSection from './components/ExamPatternSection';
import TopicBreakdownSection from './components/TopicBreakdownSection';
import ProgramsSection from './components/ProgramsSection';
import FeaturesSection from './components/FeaturesSection';
import TopicCoverageSection from './components/TopicCoverageSection';
import FacultySection from './components/FacultySection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import SEOSection from './components/SEOSection';
import { CourseFormValues } from './types';

const CreateCourseForm = () => {
  const initialValues: CourseFormValues = {
    title: '',
    slug: '',
    category: '',
    subtitle: '',
    description: '',
    duration: '',
    successRate: '',
    qualifiedCount: '',
    yearsOfExcellence: '',
    bannerImage: null,
    floatingHighlights: ['', ''],
    examPattern: {
      questionFormat: '',
      duration: '',
      markingSystem: '',
    },
    topicBreakdown: [
      { topic: '', percentage: '' },
      { topic: '', percentage: '' },
    ],
    programs: [
      {
        mode: 'Online',
        title: '',
        description: '',
        price: '',
        priceLabel: '',
        features: ['', ''],
      },
    ],
    whyChooseUs: [
      {
        icon: '',
        title: '',
        description: '',
      },
    ],
    topicCoverage: [
      {
        title: '',
        description: '',
      },
    ],
    faculty: [
      {
        name: '',
        designation: '',
        bio: '',
        expertise: [''],
        photo: null,
      },
    ],
    testimonials: [
      {
        name: '',
        scoreSummary: '',
        subjectScore: '',
        quote: '',
        photo: null,
      },
    ],
    showTrialButton: false,
    showBrochureButton: false,
    brochureUrl: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    isPublished: false,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Course</h1>
      
      <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
        <BasicInfoSection formik={formik} />
        <KeyMetricsSection formik={formik} />
         <MediaSection formik={formik} />
        <ExamPatternSection formik={formik} />
       <TopicBreakdownSection formik={formik} />
         <ProgramsSection formik={formik} />
        <FeaturesSection formik={formik} />
        <TopicCoverageSection formik={formik} />
       <FacultySection formik={formik} />
        <TestimonialsSection formik={formik} />
        <CTASection formik={formik} />
        <SEOSection formik={formik} />

        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-500  hover:bg-brand-600 text-white rounded-md  transition-colors"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseForm;