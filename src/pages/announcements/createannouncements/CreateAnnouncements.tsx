import AnnouncementForm from '../components/AnnouncementForm';
import { AnnouncementFormValues } from '../type'; // adjust path if needed
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { createAnnouncement } from '../../../redux/slices/announcement';
import { useNavigate } from 'react-router';


const CreateAnnouncements = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (values: AnnouncementFormValues) => {
    const response  = await dispatch(createAnnouncement(values)); 
    if(createAnnouncement.fulfilled.match(response))
    {
      navigate("/announcements")
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black py-8">
      <AnnouncementForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateAnnouncements;
