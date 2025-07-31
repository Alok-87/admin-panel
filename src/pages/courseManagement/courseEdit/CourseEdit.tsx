import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseEditForm from './components/CourseEditFrom';
import { CourseFormValues } from '../createCourse/types';

import { defaultCourseValues } from './components/defaultCourseValues.ts';


const CourseEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<CourseFormValues | null>(null);
  const [loading, setLoading] = useState(true);




useEffect(() => {
  setTimeout(() => {
    setInitialData(defaultCourseValues);
    setLoading(false);
  }, 500);
}, [id]);



  const handleUpdate = async (values: CourseFormValues) => {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) alert('Course updated successfully!');
      else alert('Failed to update course.');
    } catch (err) {
      console.error('Error updating course:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!initialData) return <p>Course not found</p>;

  return <CourseEditForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default CourseEdit;
