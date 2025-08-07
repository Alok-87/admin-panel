import React from 'react';
import AnnouncementForm from '../components/AnnouncementForm';
import { AnnouncementFormValues } from '../type'; // adjust path if needed
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { createAnnouncement } from '../../../redux/slices/announcement';


const CreateAnnouncements = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: AnnouncementFormValues) => {
    dispatch(createAnnouncement(values)); 
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-8">
      <AnnouncementForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateAnnouncements;
