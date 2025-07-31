// MediaSection.tsx
import { FormikProps } from 'formik';
import { CourseFormValues } from '../types';
import CollapsibleSection from './CollapsibleSection';

const MediaSection = ({ formik }: { formik: FormikProps<CourseFormValues> }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      formik.setFieldValue('bannerImage', event.currentTarget.files[0]);
    }
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formik.values.floatingHighlights];
    newHighlights[index] = value;
    formik.setFieldValue('floatingHighlights', newHighlights);
  };

  const addHighlight = () => {
    formik.setFieldValue('floatingHighlights', [...formik.values.floatingHighlights, '']);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formik.values.floatingHighlights.filter((_, i) => i !== index);
    formik.setFieldValue('floatingHighlights', newHighlights);
  };

  return (
    <CollapsibleSection title="Course Banner & Highlights">
      <div className="space-y-4">
        {/* Banner Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Image*
            {formik.values.bannerImage && (
              <span className="ml-2 text-green-600 text-sm">Image selected</span>
            )}
          </label>
          <div className="flex items-center">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md border border-gray-300 transition-colors">
              Choose File
              <input
                type="file"
                name="bannerImage"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                required
              />
            </label>
            {formik.values.bannerImage && (
              <span className="ml-3 text-sm text-gray-600">
                {(formik.values.bannerImage as File).name}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">Recommended size: 1200x400 pixels</p>
        </div>

        {/* Floating Highlights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Highlights
          </label>
          <div className="space-y-2">
            {formik.values.floatingHighlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Highlight ${index + 1}`}
                />
                {formik.values.floatingHighlights.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add another highlight
            </button>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default MediaSection;