import { useState, useEffect } from 'react';
import { API_URL } from '@/lib/api';
import instance from "@/config/axios.config";
import toast from 'react-hot-toast';

interface BrandVoice {
  _id: string;
  brand_name: string;
  websites: string[];
  brand_voice: string;
  description?: string;
  document_url?: string;
  is_default?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BrandVoiceModalProps {
  brandId: string;
  onClose: () => void;
}

const BrandVoiceModal: React.FC<BrandVoiceModalProps> = ({ brandId, onClose }) => {
  const [brandData, setBrandData] = useState<BrandVoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandVoice = async () => {
      try {
        const response = await instance.get(`${API_URL}/users/api/v1/brand-voice/${brandId}`);
        setBrandData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching brand voice:', error);
        setLoading(false);
      }
    };

    if (brandId) fetchBrandVoice();
  }, [brandId]);

  const handleUpdateBrandVoice = async (formData: Partial<BrandVoice>) => {
    try {
      await instance.put(`${API_URL}/users/api/v1/brand-voice/${brandData?._id}`, formData);
      toast.success("Brand voice updated successfully!");

      onClose();
    } catch (error) {
      console.error('Error updating brand voice:', error);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Brand Voice</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &#x2715;
          </button>
        </div>
        {brandData ? (
          <BrandVoiceForm brandData={brandData} onClose={onClose} onUpdate={handleUpdateBrandVoice} />
        ) : (
          <div>No brand data available</div>
        )}
      </div>
    </div>
  );
};

interface BrandVoiceFormProps {
  brandData: BrandVoice;
  onClose: () => void;
  onUpdate: (formData: Partial<BrandVoice>) => void;
}

const BrandVoiceForm: React.FC<BrandVoiceFormProps> = ({ brandData, onClose, onUpdate }) => {
  const [brandName, setBrandName] = useState(brandData.brand_name || '');
  const [websites] = useState(brandData.websites || ['']); 
  const [brandVoice, setBrandVoice] = useState(brandData.brand_voice || '');
  const [description, setDescription] = useState(brandData.description || '');
  const [isDefault, setIsDefault] = useState(brandData.is_default || false);

  const [errors, setErrors] = useState({
    brand_name: '',
    brand_voice: '',
    description: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      brand_name: '',
      brand_voice: '',
      description: '',
    };

    if (brandName.trim() === '') {
      newErrors.brand_name = 'Brand name is required';
      isValid = false;
    }

    if (brandVoice.trim() === '') {
      newErrors.brand_voice = 'Brand voice is required';
      isValid = false;
    }

    if (description.trim() === '') {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      brand_name: brandName,
      brand_voice: brandVoice,
      description,
      is_default: isDefault,
    };

    await onUpdate(formData);
  };

  return (
    
    <form onSubmit={handleSubmit} className="bg-white ">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Brand Name (required):</label>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className={`border rounded w-full p-2 ${errors.brand_name ? 'border-red-500' : ''}`}
          required
        />
        {errors.brand_name && <p className="text-red-500 text-sm">{errors.brand_name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Websites (read-only):</label>
        {websites.map((website, index) => (
          <input
            key={index}
            type="url"
            value={website}
            readOnly
            className="border rounded w-full p-2 bg-gray-100 cursor-not-allowed"
          />
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Brand Voice (required):</label>
        <textarea
          value={brandVoice}
          onChange={(e) => setBrandVoice(e.target.value)}
          className={`border rounded w-full p-2 ${errors.brand_voice ? 'border-red-500' : ''}`}
          required
        />
        {errors.brand_voice && <p className="text-red-500 text-sm">{errors.brand_voice}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description (required):</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`border rounded w-full p-2 ${errors.description ? 'border-red-500' : ''}`}
          required
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Is Default:</label>
        <input
          type="checkbox"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          className="mr-2"
        />
        <span>{isDefault ? 'Yes' : 'No'}</span>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="text-red-500 border border-red-500 bg-transparent text-nowrap py-3 px-10 rounded-xl transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="pr-2 pl-2 bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default BrandVoiceModal;
