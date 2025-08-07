// UserForm.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserFormValues } from '../type';

interface UserFormProps {
  initialValues: UserFormValues;
  isEditMode?: boolean;
  onSubmit: (values: UserFormValues) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .when('isEditMode', {
      is: false,
      then: (schema) => schema.required('Please enter your password'),
      otherwise: (schema) => schema.notRequired(),
    }),
  role: Yup.string()
    .oneOf(['admin', 'manager', 'telecaller', 'user'])
    .required('Role is required'),
});

const UserForm = ({ initialValues, isEditMode = false, onSubmit }: UserFormProps) => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit User' : 'Create User'}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <Field type="text" name="name" className="w-full p-2 border rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <Field type="email" name="email" className="w-full p-2 border rounded" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Password (hide in edit if you want) */}
          {!isEditMode && (
            <div>
              <label htmlFor="password" className="block font-medium">Password</label>
              <Field type="password" name="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
          )}

          {/* Role */}
          <div>
            <label htmlFor="role" className="block font-medium">Role</label>
            <Field as="select" name="role" className="w-full p-2 border rounded">
              <option value="telecaller">Telecaller</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600"
            >
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
