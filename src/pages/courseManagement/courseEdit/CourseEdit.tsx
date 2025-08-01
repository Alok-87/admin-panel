import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseEditForm from './components/CourseEditFrom';
import { CourseFormValues } from '../createCourse/types';
import { getCourseById, updateCourse } from '../../../redux/slices/course';
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { RootState } from '../../../redux/store';



const CourseEdit = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<CourseFormValues | null>(null);

    const { course, loading, error } = useSelector((state: RootState) => state.course);
    useEffect(() => {
  if (course) {
    setInitialData(course);
  }
}, [course]);


    const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      if (id && typeof id === 'string') {
        dispatch(getCourseById(id));
      }
    }, [id, dispatch]);

  const handleUpdate = async (values: CourseFormValues) => {
   dispatch( updateCourse({ id: id as string, courseData: values }))
  };

  if (loading) return <p>Loading...</p>;
  if (!initialData) return <p>Course not found</p>;

  return <CourseEditForm initialData={initialData} onSubmit={handleUpdate} />;
};

export default CourseEdit;
