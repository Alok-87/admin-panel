// TestimonialsSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const TestimonialsSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const testimonials = formik.values.testimonials || [];

  const handleAddTestimonial = () => {
    formik.setFieldValue('testimonials', [
      ...testimonials,
      { name: '', scoreSummary: '', subjectScore: '', quote: '', photo: null }
    ]);
  };

  const handleRemoveTestimonial = (index: number) => {
    const newTestimonials = [...testimonials];
    newTestimonials.splice(index, 1);
    formik.setFieldValue('testimonials', newTestimonials);
  };

  const handleTestimonialChange = (
    index: number,
    field: 'name' | 'scoreSummary' | 'subjectScore' | 'quote',
    value: string
  ) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index][field] = value;
    formik.setFieldValue('testimonials', newTestimonials);
  };

  const handlePhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newTestimonials = [...testimonials];
      newTestimonials[index].photo = e.target.files[0];
      formik.setFieldValue('testimonials', newTestimonials);
    }
  };

  return (
    <CollapsibleSection title="Student Testimonials">
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Name*
                  </label>
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rahul Sharma"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Score Summary*
                  </label>
                  <input
                    type="text"
                    value={testimonial.scoreSummary}
                    onChange={(e) => handleTestimonialChange(index, 'scoreSummary', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="JEE Advanced 98.5%ile"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject Score*
                  </label>
                  <input
                    type="text"
                    value={testimonial.subjectScore}
                    onChange={(e) => handleTestimonialChange(index, 'subjectScore', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Physics: 180/180"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Quote*
                </label>
                <textarea
                  value={testimonial.quote}
                  onChange={(e) => handleTestimonialChange(index, 'quote', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="This course helped me understand complex concepts easily..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(index, e)}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {testimonial.photo && (
                  <div className="mt-2 text-sm text-gray-500">
                    Selected: {testimonial.photo instanceof File ? testimonial.photo.name : testimonial.photo}
                  </div>
                )}
              </div>
            </div>
            {testimonials.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveTestimonial(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddTestimonial}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Testimonial
        </button>
      </div>
    </CollapsibleSection>
  );
};

export default TestimonialsSection;