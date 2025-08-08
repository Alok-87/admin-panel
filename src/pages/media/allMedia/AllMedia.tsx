import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/store'
import { getAllMedia, deleteMedia } from '../../../redux/slices/media'
import { FaSearch, FaFilter, FaImage, FaVideo, FaFile } from 'react-icons/fa'
import { FiTrash2 } from 'react-icons/fi'

const AllMedia = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { mediaList } = useSelector((state: RootState) => state.media)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    dispatch(getAllMedia())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const resultAction = await dispatch(deleteMedia(id));
      if (deleteMedia.fulfilled.match(resultAction)) {
        dispatch(getAllMedia());
      }
    }
  }

  const filteredMedia = mediaList.filter(media => {
    // Filter by search term (tags or name)
    const matchesSearch =
      media.tags?.includes(searchTerm.toLowerCase()) ||
      media.title?.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by type
    const matchesType =
      selectedType === 'all' ||
      media.type?.toLowerCase() === selectedType.toLowerCase()

    return matchesSearch && matchesType
  })

  const getMediaIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'image':
        return <FaImage className="text-blue-500" />
      case 'video':
        return <FaVideo className="text-red-500" />
      default:
        return <FaFile className="text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Media Library
      </h1>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Search by tags or name..."
            className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 rounded border border-gray-300 dark:border-gray-600">
          <FaFilter className="text-gray-500 dark:text-gray-300" />
          <select
            className="bg-transparent text-gray-900 dark:text-white  focus:outline-none"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all" className="bg-white dark:bg-gray-800"> Types</option>
            <option value="image" className="bg-white dark:bg-gray-800">Images</option>
            <option value="video" className="bg-white dark:bg-gray-800">Videos</option>
            <option value="document" className="bg-white dark:bg-gray-800">Documents</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No media found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((media) => (
            <div
              key={media._id}
              className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900"
              onMouseEnter={() => setHoveredItem(media._id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Media Type Icon - Always Visible */}
              <div className="absolute top-2 left-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full z-10">
                {getMediaIcon(media.type)}
              </div>

              {/* Delete Button - Always visible on small screens, hover on md+ */}
              <button
                className={`absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 z-10
              ${hoveredItem === media._id ? 'hidden' : 'block'}
              md:block
              md:group-hover:block`}
                onClick={() => handleDelete(media._id)}
              >
                <FiTrash2 />
              </button>

              {/* Media Preview */}
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {media.type?.toLowerCase() === 'image' ? (
                  <img
                    src={media.url}
                    alt={media.title}
                    className="w-full h-full p-3 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="p-4 text-center text-gray-700 dark:text-gray-200">
                    {getMediaIcon(media.type)}
                    <p className="mt-2 text-sm truncate">{media.title}</p>
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="p-3 text-gray-900 dark:text-white">
                <p className="font-medium truncate">Title: {media.title}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {media.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

  )
}

export default AllMedia