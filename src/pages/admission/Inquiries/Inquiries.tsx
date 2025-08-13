import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getAllInQuiries } from '../../../redux/slices/admission';
import InquiriesList from './InquiriesList';

const Inquiries: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { inquiries, loading, error } = useSelector(
    (state: RootState) => state.admission
  );

  useEffect(() => {
    dispatch(getAllInQuiries());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admission Inquiries</h1>

      {loading && <p>Loading inquiries...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && inquiries.length === 0 && <p>No inquiries found.</p>}
      {!loading && inquiries.length > 0 && (
        <InquiriesList inquiries={inquiries} />
      )}
    </div>
  );
};

export default Inquiries;
