import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ScheduleClassForm from '../component/ScheduleClassForm';
import { ClassesFormValues } from '../type';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchClassById, updateClass } from '../../../redux/slices/liveClass';

const EditClass = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams(); // <-- get class id from URL
  const [initialValues, setInitialValues] = useState<ClassesFormValues | null>(null);

  const { selectedClass } = useSelector((state: RootState) => state.class);

  useEffect(() => {
    if (id) {
      dispatch(fetchClassById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedClass) {
      setInitialValues({
        course: selectedClass.course || '',
        instructor: selectedClass.instructor || '',
        date: selectedClass.date || '',
        time: selectedClass.time || '',
        mode: selectedClass.mode || 'online',
        link: selectedClass.link || '',
        isCancelled: selectedClass.isCancelled || false,
      });
    }
  }, [selectedClass]);

  const handleSubmit = async (values: ClassesFormValues) => {
    const result = await dispatch(updateClass({ classId: id!, updatedData: values }));
    if (updateClass.fulfilled.match(result)) {
      navigate('/live-classes/calendar');
    }
  };


  if (!initialValues) return <div>Loading...</div>;

  return (
    <ScheduleClassForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      title="Edit Session"
      submitLabel="Update Session"
    />
  );
};

export default EditClass;
