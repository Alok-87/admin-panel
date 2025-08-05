// AnnouncementForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { AnnouncementFormValues } from '../type';

interface AnnouncementFormProps {
  initialValues?: AnnouncementFormValues;
  onSubmit: (values: AnnouncementFormValues, formikHelpers: FormikHelpers<AnnouncementFormValues>) => void;
  isEditMode?: boolean;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  initialValues = { title: '', content: '' },
  onSubmit,
  isEditMode = false,
}) => {
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Please add a title for the announcement')
      .max(100, 'Title can not be more than 100 characters'),
    content: Yup.string().required('Please add content for the announcement'),
  });

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? 'Edit Announcement' : 'Create Announcement'}
      </h2>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Field
                name="title"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Field
                name="content"
                as="textarea"
                rows={5}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-500 text-white py-2 px-4 rounded-md hover:bg-brand-600 transition disabled:opacity-50"
              >
                {isEditMode ? 'Update' : 'Create'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AnnouncementForm;
