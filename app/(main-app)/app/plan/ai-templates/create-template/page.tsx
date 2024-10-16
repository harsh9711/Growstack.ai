"use client";
import Spinner from "@/components/Spinner";
import { ArrowBack } from "@/components/svgs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import TemplatesTable from "../components/TemplatesDataTable";
import { useDropzone } from "react-dropzone";
import React from "react";
import { InputFieldType } from "@/types/enums";

export default function CreateTemplatePage() {
  type UserInput = {
    title: string;
    description: string;
    type: string;
    required: string;
    options?: string; // Optional field for storing options for select, radio, and checkbox
  };

  const [userInputs, setUserInputs] = useState<UserInput[]>([
    { title: "", description: "", type: "", required: "Optional" },
  ]);

  const addUserInput = () => {
    setUserInputs((prevInputs) => [
      ...prevInputs,
      { title: "", description: "", type: "", required: "Optional" },
    ]);
  };

  const removeUserInput = (index: number) => {
    setUserInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    custom_prompt: "",
  });

  const [category, setCategory] = useState("");
  const svgPattern = /^<svg.*<\/svg>$/;
  const fontAwesomePattern = /^<i class=['"]fa[a-zA-Z0-9\- ]+['"]><\/i>$/;

  const [isPending, setIsPending] = useState(false);
  const [refreshTemplatesTable, setRefreshTemplatesTable] = useState(true);
  const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    // resolver: zodResolver(ValidationSchema), // Removed
  });

  const validataFormData = async (name: string, description: string, icon: string, custom_prompt: string, category: string, userInputs: any) => {
    let tempErrors: any = {};
    let isErrors = false;
    let userInputFields: any = [];
    if (!name) tempErrors.name = 'Name is required';
    if (!description) tempErrors.description = 'Description is required';
    if (!icon) tempErrors.icon = 'Icon is required';
    if (!custom_prompt) tempErrors.custom_prompt = 'Custom prompt is required';
    if (custom_prompt && custom_prompt?.length < 100) tempErrors.custom_prompt = 'Custom prompt must be at least 100 words';
    if (!category) tempErrors.category = 'Category is required';
    if (!userInputs) tempErrors.user_inputs = 'User Inputs are required';

    // Prepare userInputs to be sent with the POST request
    userInputFields = userInputs.map((input: any, index: number) => {
      if (!input.title) {
        tempErrors[`userInput[${index}].title`] = "Input Field Title is required";
      }
      if (!input.type) {
        tempErrors[`userInput[${index}].type`] = "Input Field Type is required";
      }

      return {
        title: input.title,
        description: input.description,
        field_type: input.type,
        requirement: input.required === "Required",
        options: input.options ? input.options.split(",") : undefined,
      };
    });

    if (Object.keys(tempErrors).length > 0) {
      if (isSubmitClicked) {
        await setFormErrors(tempErrors);
      }
      isErrors = true
    } else {
      await setFormErrors({});
      isErrors = false
    }
    return [isErrors, userInputFields];
  };

  useEffect(() => {
    if (!isSubmitClicked) return;

    const debounceTimeout = setTimeout(() => {
      const validateFormDataAsync = async () => {
        const { name, description, icon, custom_prompt } = formData;
        await validataFormData(name, description, icon, custom_prompt, category, userInputs);
      };
      validateFormDataAsync();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [JSON.stringify(formData), JSON.stringify(userInputs), category, isSubmitClicked]);


  const onSubmit: SubmitHandler<any> = async (data) => {
    await setIsSubmitClicked(true);
    setIsPending(true);
    try {
      const { name, description, icon, custom_prompt } = formData;
      const [isErrors, userInputFields] = await validataFormData(name, description, icon, custom_prompt, category, userInputs);

      if (isErrors) {
        return;
      }

      const response = await instance.post(
        `${API_URL}/ai/api/v1/chat-template/create`,
        {
          name,
          description,
          icon,
          custom_prompt,
          category,
          inputs: userInputFields,
        }
      );

      toast.success(response.data.message);
      setIsSubmitClicked(false)
      // Clear form data after successful submission
      setFormData({
        name: "",
        description: "",
        icon: "",
        custom_prompt: "",
      });
      setCategory("");
      setUserInputs([
        { title: "", description: "", type: "", required: "Optional" },
      ]);
      setRefreshTemplatesTable(true);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Request failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    return setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleInputChange = (
    index: number,
    key: keyof UserInput,
    value: string
  ) => {
    setUserInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index][key] = value;

      // Concatenate options into description if it's a Select, Checkbox list, or Radio buttons field
      if (
        key === "options" &&
        (updatedInputs[index].type === InputFieldType.SELECT_LIST ||
          updatedInputs[index].type === InputFieldType.CHECKBOX ||
          updatedInputs[index].type === InputFieldType.RADIO)
      ) {
        updatedInputs[index].description = `${value}`;
      }

      return updatedInputs;
    });
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > 1 * 1024 * 1024) {
          toast.error("File size should be less than 1 MB");
        } else {

          const formData = new FormData();
          formData.append("document", file);

          setFileUploadLoading(true);
          try {
            const response = await instance.post(`${API_URL}/users/api/v1/file/upload`, formData);
            const fileUrl = response.data.data.fileUrl;
            setFormData((prevState) => ({
              ...prevState,
              icon: fileUrl,
            }));
          } catch (error) {
            toast.error("File upload failed");
            console.error("Error uploading file:", error);
          } finally {
            setFileUploadLoading(false);
          }
        }
      }

    },
  });

  const clearImg = () => {
    setFormData((prevState) => ({
      ...prevState,
      icon: "",
    }));
  };

  const router = useRouter();
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <h1 className="text-2xl:text-2xl md:text-xl font-semibold">Create your own AI template</h1>
        <button
          onClick={() => router.back()}
          className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium lg:font-medium md:font-small items-center  transition-all duration-300"
        >
          <ArrowBack />
          Back
        </button>
      </div>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <h1 className="text-xl lg:text-xl md:text-lg font-semibold flex items-center gap-2">
              AI template generator
            </h1>
            <div className="grid grid-cols-2 gap-8 border-t border-[#EBEBEB] pb-4 pt-8">
              <div className="space-y-2">
                <label className="font-medium ">
                  Template name
                  <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type template name"
                  {...register("name")}
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors?.name && (
                  <p className="text-rose-600 text-sm">{formErrors?.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Template description <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type template description"
                  {...register("description")}
                  value={formData.description}
                  onChange={handleChange}
                />
                {formErrors?.description && (
                  <p className="text-rose-600 text-sm">{formErrors?.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-medium">
                  Template category <span className="text-[#F00]">*</span>
                </label>
                <Select
                  onValueChange={handleCategoryChange}
                  value={category}
                  defaultValue="Blogs Posts"
                >
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue
                      placeholder={category ? category : "Select a category"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="My Assistants">My Assistants</SelectItem>
                    {/* <SelectItem value="Articles And Contents">Articles And Contents</SelectItem>
                    <SelectItem value="Blogs Posts">Blogs Posts</SelectItem>
                    <SelectItem value="Commerce"> Ecommerce</SelectItem>
                    <SelectItem value="Emails">Emails</SelectItem>
                    <SelectItem value="Frameworks">Frameworks</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Websites">Websites</SelectItem> */}
                  </SelectContent>
                </Select>
                {formErrors?.category && (
                  <p className="text-rose-600 text-sm">{formErrors?.category}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Upload Icon
                  <span className="text-[#F00]">*</span>
                </label>

                {fileUploadLoading ? (
                  <div className="h-36 p-2 w-full flex justify-center items-center border border-[#F2F2F2] rounded-xl">
                    <Spinner color="black" size={35} />
                  </div>
                ) : formData.icon ? (
                  <>
                    <div className="h-36 w-full mx-auto flex items-center justify-center border border-[#F2F2F2] rounded-xl">
                      <img src={formData.icon} alt="Logo" className="w-16 h-16 object-contain" />
                    </div>
                    <div className="flex justify-end m-2">
                      <button onClick={clearImg} type="button" className="hover-underline">
                        <span style={{ textDecoration: "undeline" }}>Undo image</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="border-2 border-dashed border-gray-300 p-4 rounded-md"
                    style={{ cursor: "pointer" }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p className="text-gray-500">Drop the file here ...</p>
                    ) : (
                      <p className="text-gray-500">
                        Drag 'n' drop an icon file here, or click to select one
                      </p>
                    )}
                  </div>
                )}

                {formErrors?.icon && (
                  <p className="text-rose-600 text-sm">{formErrors?.icon}</p>
                )}
              </div>
            </div>
            <div className="space-y-2 !mt-8">
              <label className="font-medium">
                User input fields <span className="text-[#F00]">*</span>
              </label>
              {userInputs.map((input, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-full space-y-2">
                    <Input
                      type="text"
                      placeholder="Type input field title (required)"
                      value={input.title}
                      onChange={(e) =>
                        handleInputChange(index, "title", e.target.value)
                      }
                       className="md:placeholder:text-sm"
                    />
                    {formErrors?.[`userInput[${index}].title`] && (
                      <p className="text-rose-600 text-sm">{formErrors[`userInput[${index}].title`]}</p>
                    )}
                  </div>

                  <div className="w-full space-y-2">
                    <Select
                      value={input.type}
                      onValueChange={(value) =>
                        handleInputChange(index, "type", value)
                        
                      }
                     
                    >
                      <SelectTrigger className="w-full border-none h-14">
                        <SelectValue placeholder={InputFieldType.SHORT_TEXT} 
                        className="md:text-sm"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={InputFieldType.SHORT_TEXT}>Input field</SelectItem>
                        <SelectItem value={InputFieldType.LONG_TEXT}>
                          Textarea field
                        </SelectItem>
                        <SelectItem value={InputFieldType.SELECT_LIST}>
                          Select list field
                        </SelectItem>
                        <SelectItem value={InputFieldType.CHECKBOX}>
                          Checkbox list field
                        </SelectItem>
                        <SelectItem value={InputFieldType.RADIO}>
                          Radio buttons field
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {formErrors?.[`userInput[${index}].type`] && (
                      <p className="text-rose-600 text-sm">{formErrors[`userInput[${index}].type`]}</p>
                    )}
                  </div>

                  {(input.type === InputFieldType.SHORT_TEXT ||
                    input.type === InputFieldType.LONG_TEXT) && (
                      <div className="w-full space-y-2">
                        <Input
                          type="text"
                          placeholder="Type input field description (required)"
                          value={input.description}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="md:placeholder:text-sm"
                        />
                      </div>
                    )}

                  {(input.type === InputFieldType.SELECT_LIST ||
                    input.type === InputFieldType.CHECKBOX ||
                    input.type === InputFieldType.RADIO) && (
                      <div className="w-full space-y-2">
                        <Input
                          type="text"
                          placeholder="Comma separated options"
                          value={input.options || ""}
                          onChange={(e) =>
                            handleInputChange(index, "options", e.target.value)
                          }
                          className="md:placeholder:text-sm"
                        />
                      </div>
                    )}

                  <div className="w-full space-y-2">
                    <Select
                      value={input.required || "Required"}
                      onValueChange={(value) =>
                        handleInputChange(index, "required", value)
                      }
                    >
                      <SelectTrigger className="w-full border-none h-14">
                        <SelectValue placeholder="Required" 
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Required">Required</SelectItem>
                        <SelectItem value="Optional">Optional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {userInputs.length > 1 && (
                    <button
                      type="button"
                      className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={() => removeUserInput(index)}
                    >
                      <Minus />
                    </button>
                  )}


                  {index === userInputs.length - 1 && index>0 && (
                    <button
                      type="button"
                      className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={addUserInput}
                    >
                      <Plus />
                    </button>
                  )}
                  {userInputs.length === 1 && (
                    <button
                      type="button"
                      className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={addUserInput}
                    >
                      <Plus />
                    </button>
                  )}
                </div>
              ))}


              {formErrors?.user_inputs && (
                <p className="text-rose-600 text-sm">{formErrors?.user_inputs}</p>
              )}
            </div>
            <div className="flex justify-end">
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Custom prompt <span className="text-[#F00]">*</span>
              </label>
              <textarea
                placeholder="Type your custom prompt"
                className="h-[200px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                name="custom_prompt"
                value={formData.custom_prompt}
                onChange={handleChange}
              />
              {formErrors?.custom_prompt && (
                <p className="text-rose-600 text-sm">{formErrors?.custom_prompt}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="min-w-[200px] py-3.5 px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex justify-center items-center"
              type="submit"
            >
              {isPending ? <Spinner /> : "Create your own AI template"}
            </button>
          </div>
        </form>
      </section>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-7">
        <TemplatesTable
          refreshTemplatesTable={refreshTemplatesTable}
          setRefreshTemplatesTable={setRefreshTemplatesTable}
        />
      </section>
    </div>
  );
}
