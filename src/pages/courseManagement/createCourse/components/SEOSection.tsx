// SEOSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const SEOSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  return (
    <CollapsibleSection title="SEO & Publishing">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Title
          </label>
          <input
            type="text"
            name="metaTitle"
            value={formik.values.metaTitle}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Best JEE Physics Course | Exam Preparation"
            maxLength={60}
          />
          <p className="mt-1 text-xs text-gray-500">
            Recommended: 50-60 characters ({formik.values.metaTitle?.length || 0}/60)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formik.values.metaDescription}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Comprehensive JEE Physics course covering all topics with expert faculty..."
            rows={3}
            maxLength={160}
          />
          <p className="mt-1 text-xs text-gray-500">
            Recommended: 150-160 characters ({formik.values.metaDescription?.length || 0}/160)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meta Keywords
          </label>
          <input
            type="text"
            name="metaKeywords"
            value={formik.values.metaKeywords}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="JEE Physics, IIT preparation, online coaching"
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate keywords with commas
          </p>
        </div>

        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formik.values.isPublished}
            onChange={formik.handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
            Publish Immediately
          </label>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default SEOSection;