import { Trash } from 'lucide-react';
import { useState } from 'react';
import FileUploaderDropZone from './FileUploaderDropZone';
import { API_URL } from '@/lib/api';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../../../../../../../public/svgs/spinner';

type CustomFile = File & { id?: string; name?: string };

interface UploadFileModalProps {
  onClose: () => void;
  onFileUpload: (file: File) => void;
  uploadedFiles: CustomFile[];
  setUploadedFiles: (files: File[]) => void;
  isAPILoading: boolean;
  setIsAPILoading: (isLoading: boolean) => void;
  type: string;
  handleAttachSearchFiles?: () => void;
}

const FileUploadModal: React.FC<UploadFileModalProps> = ({
  onClose,
  onFileUpload,
  uploadedFiles,
  setUploadedFiles,
  isAPILoading,
  setIsAPILoading,
  type,
  handleAttachSearchFiles,
}) => {
  const removeFile = async (id: any) => {
    try {
      setIsAPILoading(true);
      const payload = {
        file_id: id,
      };
      await axios.delete(`${API_URL}/ai/api/v1/customgpt/file?code=true`, {
        data: { payload },
      });
      setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
      toast.success('File removed successfully');
      setIsAPILoading(false);
    } catch (error) {
      console.error('Error removing file:', error);
      toast.error('Error removing file');
      setIsAPILoading(false);
    }
  };

  return (
    <div className="fixed z-10 inset-0 bg-opacity-70">
      <div className="flex items-center justify-center max-h-60 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {uploadedFiles.length === 0 && (
            <div>
              <FileUploaderDropZone onFileUpload={onFileUpload} type={type} />
            </div>
          )}
          {isAPILoading && <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 px-8">
              <label className="block text-[14px] font-semibold text-gray-700">
                Uploaded Files
              </label>
              <div className="border-b border-gray-200 pr-4 mt-2 mb-2"></div>
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mt-3 bg-gray-100 p-2 rounded-md"
                >
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}
              {isAPILoading && (
                <div className="mt-2">
                  <Spinner />
                </div>
              )}
              <div className="mt-4">
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      onFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <label
                  htmlFor="file-input"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold text-sm rounded-md cursor-pointer hover:bg-gren-700"
                >
                  + Add files
                </label>
              </div>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 mt-20 justify-between w-full flex flex-row">
            <button
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose} // Optional: Close the modal after file selection
            >
              Select Vector Store
            </button>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
              {type === 'file_search' && (
                <button
                  onClick={() => handleAttachSearchFiles && handleAttachSearchFiles()}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Attach
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
