// ScheduleClassForm.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ClassesFormValues } from '../type';

interface ScheduleClassFormProps {
  initialValues: ClassesFormValues;
  onSubmit: (values: ClassesFormValues) => void;
  title?: string;
  submitLabel?: string;
}

const validationSchema = Yup.object().shape({
  course: Yup.string().required('Course ID is required'),
  instructor: Yup.string().required('Instructor ID is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  mode: Yup.string().oneOf(['online', 'offline']).required('Mode is required'),
  link: Yup.string().url('Must be a valid URL').required('Link is required'),
  isCancelled: Yup.boolean(),
});

const ScheduleClassForm: React.FC<ScheduleClassFormProps> = ({
  initialValues,
  onSubmit,
  title = 'Create Session',
  submitLabel = 'Create Session',
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl rounded-xl bg-white dark:bg-gray-600 mx-auto p-6 shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>

      <Formik<ClassesFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course ID */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Course ID</label>
              <Field
                name="course"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                placeholder="Enter Course ID"
              />
              <ErrorMessage name="course" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Instructor ID */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Instructor ID</label>
              <Field
                name="instructor"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                placeholder="Enter Instructor ID"
              />
              <ErrorMessage name="instructor" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Date */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <Field name="date">
                {({ field, form }: any) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) =>
                      form.setFieldValue('date', date ? date.toISOString().split('T')[0] : '')
                    }
                    className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                    placeholderText="Select a date"
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              </Field>
              <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Time */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
              <Field
                type="text"
                name="time"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                placeholder="e.g. 10:30 AM"
              />
              <ErrorMessage name="time" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Mode */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Mode</label>
              <Field
                as="select"
                name="mode"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
              >
                <option value="">Select mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hydrid">Hybrid</option>
              </Field>
              <ErrorMessage name="mode" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Meeting Link */}
            <div className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Meeting Link</label>
              <Field
                name="link"
                className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                placeholder="Enter meeting URL"
              />
              <ErrorMessage name="link" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Is Cancelled */}
            <div className="col-span-1 flex items-center space-x-2 mt-1">
              <Field type="checkbox" name="isCancelled" className="accent-brand-500" />
              <label className="text-sm text-gray-700 dark:text-gray-300">Is this session cancelled?</label>
            </div>

            {/* Submit Button - Full width on small, half on medium+ */}
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 text-white bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 rounded transition"
              >
                {submitLabel}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>

  );
};

export default ScheduleClassForm;
