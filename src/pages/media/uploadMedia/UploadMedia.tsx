import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';

// Example action (replace with your own)
// import { uploadMedia } from '../../redux/slices/media';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
  type: Yup.string().oneOf(['image', 'video', 'pdf', 'document']).required('Type is required'),
  publicId: Yup.string(),
  course: Yup.string().nullable(),
  isFeatured: Yup.boolean(),
  uploadedBy: Yup.string().required('Uploader is required'),
  tags: Yup.array().of(Yup.string()),
});

interface MediaFormValues {
  title: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  publicId?: string;
  course?: string;
  isFeatured: boolean;
  uploadedBy: string;
  tags: string[];
}

const UploadMedia: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: MediaFormValues = {
    title: '',
    url: '',
    type: 'image',
    publicId: '',
    course: '',
    isFeatured: false,
    uploadedBy: '',
    tags: [],
  };

  const handleSubmit = async (values: MediaFormValues) => {
    // const resultAction = await dispatch(uploadMedia(values));
    // if (uploadMedia.fulfilled.match(resultAction)) {
    //   navigate('/media');
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Upload Media</h2>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="w-full space-y-4">
            <div>
              <label className="block mb-1">Title</label>
              <Field name="title" className="w-full p-2 border rounded" placeholder="Media title" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">URL</label>
              <Field name="url" className="w-full p-2 border rounded" placeholder="https://..." />
              <ErrorMessage name="url" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Type</label>
              <Field as="select" name="type" className="w-full p-2 border rounded">
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="document">Document</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Public ID</label>
              <Field name="publicId" className="w-full p-2 border rounded" placeholder="cloudinary_public_id" />
              <ErrorMessage name="publicId" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Course (optional)</label>
              <Field name="course" className="w-full p-2 border rounded" placeholder="Course ID" />
              <ErrorMessage name="course" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="isFeatured" />
              <label>Feature this media</label>
            </div>


            <div>
              <label className="block mb-1">Tags (comma separated)</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={values.tags.join(',')}
                onChange={(e) => setFieldValue('tags', e.target.value.split(',').map((tag) => tag.trim()))}
              />
              <ErrorMessage name="tags" component="div" className="text-red-500 text-sm" />
            </div>

            <button type="submit" className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded">
              Upload Media
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadMedia;
