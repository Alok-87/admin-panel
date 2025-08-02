import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  MdPerson,
  MdPhone,
  MdEmail,
  MdSchool,
  MdMessage,
  MdPendingActions,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { createAdmissionInquiries } from '../../../redux/slices/admission';
import { AdmissionFormValues } from './types';
import { AdmissionStatus } from './types';



const AdmissionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<AdmissionFormValues>({
    initialValues: {
      name: '',
      phone: 0,
      email: '',
      courseInterest: '',
      message: '',
      status: AdmissionStatus.pending,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.number().required('Phone is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      courseInterest: Yup.string().required('Course Interest is required'),
      message: Yup.string(),
      status: Yup.mixed<AdmissionStatus>().oneOf(Object.values(AdmissionStatus)),
    }),
    onSubmit: (values) => {
      dispatch(createAdmissionInquiries(values));
    },
  });

  const LabelWithIcon = ({
    icon: Icon,
    text,
  }: {
    icon: React.ElementType;
    text: string;
  }) => (
    <label className="flex items-center gap-2 font-medium text-gray-700 mb-1">
      <span className="p-1 rounded bg-brand-500 text-white">
        <Icon size={14} />
      </span>
      {text}
    </label>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-6">
      <h2 className="text-2xl font-semibold text-center text-brand-500">Admission Form</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        <div>
          <LabelWithIcon icon={MdPerson} text="Full Name" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <LabelWithIcon icon={MdPhone} text="Phone Number" />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          )}
        </div>

        <div>
          <LabelWithIcon icon={MdEmail} text="Email Address" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <LabelWithIcon icon={MdSchool} text="Interested Course" />
          <input
            type="text"
            name="courseInterest"
            placeholder="Interested Course"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.courseInterest}
          />
          {formik.touched.courseInterest && formik.errors.courseInterest && (
            <div className="text-red-500 text-sm">{formik.errors.courseInterest}</div>
          )}
        </div>

        <div>
          <LabelWithIcon icon={MdMessage} text="Message (Optional)" />
          <textarea
            name="message"
            placeholder="Message (Optional)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
          />
        </div>

        <div>
          <LabelWithIcon icon={MdPendingActions} text="Status" />
          <select
            name="status"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <option value={AdmissionStatus.pending}>Pending</option>
            <option value={AdmissionStatus.approved}>Approved</option>
            <option value={AdmissionStatus.rejected}>Rejected</option>
            <option value={AdmissionStatus.waitlisted}>Waitlisted</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-500 text-white py-2 rounded-md font-semibold hover:bg-brand-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
