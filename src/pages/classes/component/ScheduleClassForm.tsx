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
    <div className="flex flex-col items-center justify-center w-full max-w-6xl rounded-xl bg-white mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <Formik<ClassesFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="w-full space-y-4">
            <div>
              <label className="block mb-1">Course ID</label>
              <Field name="course" className="w-full p-2 border rounded" placeholder="Enter Course ID" />
              <ErrorMessage name="course" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Instructor ID</label>
              <Field name="instructor" className="w-full p-2 border rounded" placeholder="Enter Instructor ID" />
              <ErrorMessage name="instructor" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Date</label>
              <Field name="date">
                {({ field, form }: any) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date: Date | null) => {
                      form.setFieldValue('date', date ? date.toISOString().split('T')[0] : '');
                    }}
                    className="w-full p-2 border rounded"
                    placeholderText="Select a date"
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              </Field>
              <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Time</label>
              <Field
                type="text"
                name="time"
                className="w-full p-2 border rounded"
                placeholder="e.g. 10:30 AM"
              />
              <ErrorMessage name="time" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Mode</label>
              <Field as="select" name="mode" className="w-full p-2 border rounded">
                <option value="">Select mode</option>
                <option value="online">online</option>
                <option value="offline">offline</option>
              </Field>
              <ErrorMessage name="mode" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Meeting Link</label>
              <Field
                name="link"
                className="w-full p-2 border rounded"
                placeholder="Enter meeting URL"
              />
              <ErrorMessage name="link" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="isCancelled" />
              <label className="text-sm">Is this session cancelled?</label>
            </div>

            <button type="submit" className="w-full py-2 text-white bg-brand-500 hover:bg-brand-600 rounded">
              {submitLabel}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ScheduleClassForm;
