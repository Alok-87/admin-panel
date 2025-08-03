import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { deleteClass, getAllClasses } from '../../../redux/slices/liveClass';

import {
  CalendarDaysIcon,
  ChevronLeft,
  ChevronRight,
  ClockIcon,
  GlobeIcon,
  XCircleIcon,
  CheckCircle2,
  Grid2X2,
  List
} from 'lucide-react';
import clsx from 'clsx';
import { format, startOfWeek, addDays, isSameDay, isSameMonth, isSameWeek, addWeeks, subWeeks, startOfMonth, endOfMonth, endOfWeek, eachDayOfInterval } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';

interface Class {
  _id: string;
  course?: {
    title: string;
  };
  date: string | Date;
  time: string;
  mode: string;
  link: string;
  isCancelled: boolean;
}

const Classes: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { classes, loading, error } = useSelector((state: RootState) => state.class);
  console.log(classes)
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? addMonths(currentDate, -1) : addMonths(currentDate, 1));
  };

  const addMonths = (date: Date, months: number) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  };

  const getWeekDays = () => {
    const startDate = startOfWeek(currentDate);
    return Array.from({ length: 7 }).map((_, index) => addDays(startDate, index));
  };

  const getMonthDays = () => {
    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const startWeek = startOfWeek(startDate);
    const endWeek = endOfWeek(endDate);
    return eachDayOfInterval({ start: startWeek, end: endWeek });
  };

  const getClassesForDay = (day: Date) => {
    return classes.filter(cls => isSameDay(new Date(cls.date), day));
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (classes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 italic">
        No classes scheduled.
      </div>
    );
  }

  const days = viewMode === 'week' ? getWeekDays() : getMonthDays();
  const handleEdit = (cls: string) => {
    navigate(`/live-classes/edit/${cls}`)
  }

const handleDelete = async (clsId: string) => {
  const resultAction = await dispatch(deleteClass(clsId));

  if (deleteClass.fulfilled.match(resultAction)) {
    dispatch(getAllClasses());
  } else {
    console.error('Failed to delete class:', resultAction.payload);
  }
};

  return (
    <div className="p-4">
      <div className="bg-white shadow rounded-xl overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {viewMode === 'week' ? <Grid2X2 className="w-5 h-5" /> : <List className="w-5 h-5" />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {format(currentDate, viewMode === 'week' ? 'MMMM yyyy' : 'MMMM yyyy')}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => viewMode === 'week' ? navigateWeek('prev') : navigateMonth('prev')}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm rounded-lg hover:bg-gray-100"
            >
              Today
            </button>
            <button
              onClick={() => viewMode === 'week' ? navigateWeek('next') : navigateMonth('next')}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={`grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7 auto-rows-fr'} gap-px bg-gray-200`}>
          {/* Day headers */}
          {days.slice(0, 7).map((day, index) => (
            <div key={`header-${index}`} className="bg-gray-100 p-2 text-center text-sm font-medium text-gray-500">
              {format(day, 'EEE')}
            </div>
          ))}

          {/* Day cells */}
          {days.map((day, index) => {
            const dayClasses = getClassesForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={`day-${index}`}
                onClick={() => setSelectedDate(day)}
                className={clsx(
                  'bg-white min-h-24 p-2 overflow-hidden',
                  !isCurrentMonth && 'text-gray-400',
                  isSelected && 'ring-2 ring-red-500',
                  isToday && 'bg-red-50'
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={clsx(
                    'text-sm font-medium',
                    isToday && 'bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center'
                  )}>
                    {format(day, 'd')}
                  </span>
                  {dayClasses.length > 0 && (
                    <span className="text-xs bg-red-100 text-red-600 rounded-full px-2 py-0.5">
                      {dayClasses.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {dayClasses.map(cls => (
                    <div
                      key={cls._id}
                      className={clsx(
                        'text-xs p-1 rounded border-l-2',
                        cls.isCancelled ? 'border-gray-400 bg-gray-100' : 'border-red-500 bg-red-50'
                      )}
                    >
                      <div className="font-medium truncate">{cls.course?.title || 'Untitled'}</div>
                      <div className="flex items-center text-gray-500">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Day Details */}
        {selectedDate && (

          <div className="bg-gray-50 p-6 rounded-b-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </h3>

            {getClassesForDay(selectedDate).length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getClassesForDay(selectedDate).map(cls => (
                  <div
                    key={cls._id}
                    className="relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-200 p-5 flex flex-col justify-between"
                  >
                    {/* DELETE ICON */}
                    <button
                      onClick={() => handleDelete(cls._id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition"
                      aria-label="Delete class"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        <span>Course: </span>
                        {typeof cls.course === 'object' && cls.course !== null ? cls.course.title : 'Untitled'}
                      </h4>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-900 font-medium mr-1">Time:</span>
                          {cls.time}
                        </div>
                        <div className="flex items-center">
                          <GlobeIcon className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{cls.mode || 'offline'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(cls._id)}
                          className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition"
                        >
                          Edit
                        </button>
                        <button
                          // onClick={() => handleCancel(cls)}
                          className="px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-full font-medium hover:bg-red-200 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-6 italic">
                No classes scheduled for this day
              </div>
            )}
          </div>




        )}
      </div>
    </div>
  );
};

export default Classes;