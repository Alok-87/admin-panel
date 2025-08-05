// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../../redux/store';
// import { uploadImage } from '../../../redux/slices/cloudinary';
// import { useEffect } from 'react';
// import { uploadMedia } from '../../../redux/slices/media';
// import { MediaFormValues } from './types'; // Adjust path as needed

// const MediaUpload = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { url, uploading, error } = useSelector((state: RootState) => state.cloudinary);

//   const formik = useFormik<MediaFormValues>({
//     initialValues: {
//       title: '',
//       url: '',
//       type: '',
//       isFeatured: false,
//       tags: [],
//     },
//     validationSchema: Yup.object({
//       title: Yup.string().required('Title is required'),
//       url: Yup.string().required('Image URL is required'),
//       type: Yup.string()
//         .oneOf(['image', 'video', 'pdf', 'document'], 'Invalid media type')
//         .required('Type is required'),
//       isFeatured: Yup.boolean(),
//       tags: Yup.array().of(Yup.string()),
//     }),
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         dispatch(uploadMedia(values));
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       dispatch(uploadImage(file));
//     }
//   };

// useEffect(() => {
//   if (url && formik.values.url !== url) {
//     formik.setFieldValue('url', url);
//   }
// }, [url]); // ✅ Also add `formik` if TypeScript complains


//   return (
//     <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white px-4 py-5 rounded-xl">
//       {/* Title */}
//       <div>
//         <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//           Title*
//         </label>
//         <input
//           id="title"
//           name="title"
//           type="text"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.title}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {formik.touched.title && formik.errors.title && (
//           <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
//         )}
//       </div>

//       {/* Image Upload */}
//       <div>
//         <label htmlFor="url" className="block text-sm font-medium text-gray-700">
//           Image
//         </label>
//         <input
//           id="url"
//           name="url"
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
//         {url && <img src={url} alt="Preview" className="mt-2 h-20 object-contain" />}
//         {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//         {formik.touched.url && formik.errors.url && (
//           <div className="text-red-500 text-xs mt-1">{formik.errors.url}</div>
//         )}
//       </div>

//       {/* Type */}
//       <div>
//         <label htmlFor="type" className="block text-sm font-medium text-gray-700">
//           Media Type*
//         </label>
//         <select
//           id="type"
//           name="type"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.type}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="image">Image</option>
//           <option value="video">Video</option>
//           <option value="pdf">PDF</option>
//           <option value="document">Document</option>
//         </select>
//         {formik.touched.type && formik.errors.type && (
//           <div className="text-red-500 text-xs mt-1">{formik.errors.type}</div>
//         )}
//       </div>

//       {/* Featured */}
//       <div className="flex items-center">
//         <input
//           id="isFeatured"
//           name="isFeatured"
//           type="checkbox"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           checked={formik.values.isFeatured}
//           className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//         />
//         <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
//           Featured Media
//         </label>
//       </div>

//       {/* Tags */}
//       <div>
//         <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
//           Tags (comma separated)
//         </label>
//         <input
//           id="tags"
//           name="tags"
//           type="text"
//           onChange={(e) => {
//             const tagArray = e.target.value
//               .split(',')
//               .map((tag) => tag.trim())
//               .filter(Boolean);
//             formik.setFieldValue('tags', tagArray);
//           }}
//           onBlur={formik.handleBlur}
//           value={formik.values.tags.join(', ')}
//           placeholder="e.g., marketing, tutorial"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Submit */}
//       <div>
//         <button
//           type="submit"
//           disabled={formik.isSubmitting}
//           className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-colors"
//         >
//           {formik.isSubmitting ? 'Uploading...' : 'Upload Media'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MediaUpload;


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { uploadMedia } from '../../../redux/slices/media';
import { MediaFormValues } from './types'; // Adjust path as needed

const MediaUpload = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<MediaFormValues>({
    initialValues: {
      title: '',
      file: null,
      type: '',
      isFeatured: false,
      tags: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      file: Yup.mixed().required('Image URL is required'),
      type: Yup.string()
        .oneOf(['image', 'video', 'pdf', 'document'], 'Invalid media type')
        .required('Type is required'),
      isFeatured: Yup.boolean(),
      tags: Yup.array().of(Yup.string()),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        if (values.file) formData.append('file', values.file);
        formData.append('type', values.type);
        formData.append('isFeatured', values.isFeatured.toString());
        values.tags.forEach(tag => formData.append('tags[]', tag)); // Or just 'tags' if backend expects it

        await dispatch(uploadMedia(formData) as any); // Ensure `uploadMedia` accepts FormData
      } finally {
        setSubmitting(false);
      }
    }

  })


  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white px-4 py-5 rounded-xl">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title*
        </label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0] || null;
            formik.setFieldValue("file", file);
          }}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.file && formik.errors.file && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.file}</div>
        )}

      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Media Type*
        </label>
        <select
          id="type"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="document">Document</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <div className="text-red-500 text-xs mt-1">{formik.errors.type}</div>
        )}
      </div>

      {/* Featured */}
      <div className="flex items-center">
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.isFeatured}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
          Featured Media
        </label>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          onChange={(e) => {
            const tagArray = e.target.value
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean);
            formik.setFieldValue('tags', tagArray);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.tags.join(', ')}
          placeholder="e.g., marketing, tutorial"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-colors"
        >
          {formik.isSubmitting ? 'Uploading...' : 'Upload Media'}
        </button>
      </div>
    </form>
  );
};

export default MediaUpload;


