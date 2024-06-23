// pages/assistants/[id].tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus } from 'lucide-react';
import { Assistant } from '@/types/assistants';

type UserInput = {
  title: string;
  description: string;
  type: string;
  required: string;
};

const ValidationSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(200, 'Description can\'t exceed 200 characters'),
});

type ValidationSchemaType = z.infer<typeof ValidationSchema>;

const EditAssistant = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
//   const { id } = router.query;
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [userInputs, setUserInputs] = useState<UserInput[]>([]);
  const [isPending, setIsPending] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
  });

  useEffect(() => {
    if (id) {
      const fetchAssistant = async () => {
        try {
          const response = await axios.get(`${API_URL}/ai/api/v1/chat-template/${id}`);
          const assistantData = response.data.data;
          setAssistant(assistantData);
          setUserInputs(assistantData.userInputs || []);
          reset({
            name: assistantData.name,
            description: assistantData.description,
          });
        } catch (error) {
          console.error('Error fetching assistant:', error);
        }
      };
      fetchAssistant();
    }
  }, [id, reset]);

  const addUserInput = () => {
    setUserInputs((prevInputs) => [
      ...prevInputs,
      { title: '', description: '', type: '', required: 'Optional' },
    ]);
  };

  const removeUserInput = (index: number) => {
    setUserInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const handleInputChange = (index: number, key: keyof UserInput, value: string) => {
    setUserInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index][key] = value;
      return updatedInputs;
    });
  };

  const handleUpdate: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      await axios.put(`${API_URL}/ai/api/v1/chat-template/${id}`, {
        ...data,
        userInputs,
      });
      toast.success('Assistant updated successfully');
      router.push('/Edit');
    } catch (error) {
      console.error('Error updating assistant:', error);
      toast.error('Error updating assistant');
    } finally {
      setIsPending(false);
    }
  };

  if (!assistant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-5">Edit Assistant</h1>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-5">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="space-y-5">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              Assistant Editor
            </h1>
            <div className="grid grid-cols-2 gap-8 border-t border-[#EBEBEB] pb-4 pt-8">
              <div className="space-y-2">
                <label className="font-medium">
                  Assistant Name <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type assistant name"
                  {...register('name')}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Assistant Description <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type assistant description"
                  {...register('description')}
                />
                {errors.description && <p>{errors.description.message}</p>}
              </div>
            </div>
            <div className="space-y-2 !mt-8">
              <label className="font-medium">
                User Input Fields <span className="text-[#F00]">*</span>
              </label>
              {userInputs.map((input, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-full space-y-2">
                    <Input
                      type="text"
                      placeholder="Type input field title (required)"
                      value={input.title}
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Input
                      type="text"
                      placeholder="Type input field description (required)"
                      value={input.description}
                      onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Select
                      value={input.type}
                      onValueChange={(value) => handleInputChange(index, 'type', value)}
                    >
                      <SelectTrigger className="w-full border-none h-14">
                        <SelectValue placeholder="Input field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Input field">Input field</SelectItem>
                        <SelectItem value="Textarea field">Textarea field</SelectItem>
                        <SelectItem value="Select list field">Select list field</SelectItem>
                        <SelectItem value="Checkbox list field">Checkbox list field</SelectItem>
                        <SelectItem value="Radio buttons field">Radio buttons field</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full space-y-2">
                    <Select
                      value={input.required}
                      onValueChange={(value) => handleInputChange(index, 'required', value)}
                    >
                      <SelectTrigger className="w-full border-none h-14">
                        <SelectValue placeholder="Optional" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Optional">Optional</SelectItem>
                        <SelectItem value="Required">Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {index === userInputs.length - 1 ? (
                    <button
                      className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={addUserInput}
                    >
                      <Plus />
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={() => removeUserInput(index)}
                    >
                      <Minus />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Custom Prompt <span className="text-[#F00]">*</span>
              </label>
              <textarea
                placeholder="Type your custom prompt"
                className="h-[200px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                name="custom_prompt"
                value={assistant.custom_prompt}
                onChange={(e) => setAssistant({ ...assistant, custom_prompt: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="py-3.5 px-6 bg-primary-green sheen rounded-xl text-white mt-6"
              type="submit"
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Update Assistant'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditAssistant;
