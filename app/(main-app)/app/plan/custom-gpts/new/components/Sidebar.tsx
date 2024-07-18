import { ChangeEvent, ChangeEventHandler, useState } from "react";
import clsx from "clsx";
import ChatInput from "./ChatInput";
import Image from "next/image";
import Link from "next/link";
import Toggle from "react-toggle";
import "react-toggle/style.css" // for ES6 modules
import { FiFile, FiUpload } from 'react-icons/fi'; // Example icon from react-icons
import { MinusIcon, PlusIcon } from "lucide-react";

export default function Sidebargpt() {
  const tabs = ["Create", "Configure"];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [showBox, setShowBox] = useState(true);

  const handleTabClick = (index: number) => {
    const totalTabs = tabs.length;
    const percentage = (index / totalTabs) * 100;
    setSelectedTabIndex(index);
    setTabUnderlineLeft(percentage);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructions: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
  };

  const handleSend = () => {
    setShowBox(true);
  };
  const getChatInputTranslate = () => {
    if (selectedTabIndex === 0) {
      return 'translate-y-[135px]'; // Translate up for Create tab
    } else {
      return 'translate-y-[35px]'; // Translate up for Configure tab
    }
  };
  
  interface ModalProps {
    onClose: () => void;
    onFileSelect: (file: File | null) => void;
  }
  


  const Modal: React.FC<ModalProps> = ({ onClose, onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0];
      if (file) {
        setSelectedFile(file);
      }
    };
  
    const handleUpload = () => {
      onFileSelect(selectedFile);
      setSelectedFile(null); // Reset selected file state
      onClose(); // Close the modal after file selection
    };
  
    const handleLabelClick = () => {
      // Programmatically trigger file input click
      const fileInput = document.getElementById('file-upload');
      if (fileInput) {
        fileInput.click();
      }
    };
  
    return (
      <div className="fixed z-10 inset-0 bg-opacity-70 ">
        <div className="flex items-center justify-center max-h-60  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
  
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-2xl leading-6 font-semibold  text-gray-900 mb-4">Attach files to file search
                  </h3>
                  <label htmlFor="file-upload">
  <span className="mt-20 bg-white px-2 py-2.5  flex flex-col justify-center items-center mx-auto text-black">
  <svg width={200} height={200} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 8 48" viewBox="0 0 48 48" id="Upload">
  <circle cx="20" cy="20.339" r=".75" fill="#2C9E4D" className="color000000 svgShape"></circle>
  <path d="M36.69946,27.16316c0,0,2.00739-11.38849,2.00854-11.39514c0.25885-1.46869-0.76147-2.92096-2.22852-3.17773
    c0,0-18.69489-3.29797-18.71094-3.30078c-1.43835-0.25378-2.93713,0.79449-3.18652,2.22852l-0.36035,2.0293
    c-0.07227,0.40723,0.19922,0.79688,0.60742,0.86914c0.4043,0.07227,0.79688-0.19922,0.86914-0.60742
    c0,0,0.3609-2.02991,0.36133-2.03223c0.12006-0.67535,0.7785-1.12335,1.4502-1.00977c0,0,18.67206,3.29309,18.7099,3.2998
    c0.64063,0.11426,1.05859,0.7207,0.94531,1.35742c-0.00293,0.01514-2.00806,11.38257-2.00806,11.38257
    c-0.07275,0.40747,0.19861,0.7965,0.60742,0.86914c0.40894,0.07231,0.79785-0.19919,0.86914-0.60742c0,0,2.00879-11.388
    2.00879-11.39514C38.98535,25.08594,37.96509,23.63367,36.49707,23.37695c0,0-18.69483-3.29797-18.71094-3.30078
    c-1.43835-0.25378-2.93713,0.79449-3.18652,2.22852l-0.36035,2.0293c-0.07227,0.40723,0.19922,0.79688,0.60742,0.86914
    c0.4043,0.07227,0.79688-0.19922,0.86914-0.60742c0,0,0.3609-2.02991,0.36133-2.03223
    c0.12006-0.67535,0.7785-1.12335,1.4502-1.00977c0,0,18.67206,3.29309,18.7099,3.2998c0.64063,0.11426,1.05859,0.7207,0.94531,1.35742
    c-0.00293,0.01514-2.00806,11.38257-2.00806,11.38257C36.89746,27.02832,36.60742,27.40625,36.69946,27.16316z" />
</svg>
    <h2 className="text-black text-xl font-bold"> Drag your files here or <span className="text-green-500">click to upload</span></h2>
  <p className="text-[14px]">Information in attached files will be available to this assistant</p><p className="text-green-400">Learn more</p></span>
  {/* <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} /> */}
</label>

                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6  mt-20 justify-between w-full flex flex-row">
            <button
                onClick={handleUpload}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
               Select Vector Store
              </button>     <div>  
              <button
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button> <button
                onClick={handleUpload}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Upload
              </button></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  const ImageUploadModal = ({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (image: string) => void }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
    const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSave = () => {
      if (selectedImage) {
        onSave(selectedImage);
        setSelectedImage(null); // Reset selected image after save
        onClose();
      }
    };
  
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="relative bg-white p-8 rounded-md shadow-lg max-w-md w-full z-50 transform transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-100%)' }}>
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
          {selectedImage && (
            <div className="mb-4">
              <img src={selectedImage} alt="Selected" className="max-w-full h-auto" />
            </div>
          )}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md mr-2"
              onClick={handleSave}
              disabled={!selectedImage}
            >
              Save
            </button>
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-md" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const FileUploadComponent = () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
  
    
  
    const handleChangeFile = () => {
      setSelectedFile(null);
    };

    const handleSaveImage = (image: string) => {
      // Handle saving image logic here
      console.log('Image saved:', image);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleUpload = () => {
    // Handle file upload logic here
    console.log('Selected file:', selectedFile);
    setSelectedFile(null); // Reset selected file state after upload
    // Do not close modal after upload to allow for further actions
  };
    return (
      <div className="flex flex-col justify-start">
        {/* Left Side */}
        <div className="flex flex-row justify-between gap-x-60">
          <div className="mb-4 flex items-center">
            <Toggle
              defaultChecked={isOpen1}
              icons={false}
              // onChange={toggleModal1}
              className="mr-2"
            />
            <span className="text-md flex flex-row gap-x-2 font-medium">File Search 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#4B465C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.9999 8H12.0099" stroke="#4B465C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.9999 8H12.0099" stroke="white" strokeOpacity="0.2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 12H12V16H13" stroke="#4B465C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 12H12V16H13" stroke="white" strokeOpacity="0.2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
  
          <div className={`flex items-center ml-4 bg-gray-200 px-2 rounded-2xl`}>
            <label htmlFor="file-upload" className="cursor-pointer flex flex-row items-center" onClick={handleOpenModal}>
            <PlusIcon width={15} height={20}/>
            <span className="text-sm">Files</span>
            </label>
            {/* <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} /> */}
  
            {selectedFile && (
              <div className="ml-2 flex items-center">
                <img src={URL.createObjectURL(selectedFile)} alt="Selected File" className="h-8 w-8 object-contain rounded-full" />
                <button onClick={handleChangeFile} className="ml-2 focus:outline-none text-gray-600 hover:text-gray-800">
                  Change
                </button>
              </div>
            )}
  
         
    
  {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {selectedFile && (
            <div>
              <p>Selected File: {selectedFile.name}</p>
              <button onClick={handleUpload}>Upload File</button>
            </div>
          )}
          <input id="file-upload-modal" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="file-upload-modal" className="cursor-pointer">
            Select File
          </label>
        </Modal>
      )}
          </div>
        </div>
  
        <div className="border-b border-gray-200 pr-4 mt-4 mb-4"></div>
  
        {/* Right Side Placeholder */}
        <div className="flex flex-row justify-between gap-x-20">
          <div className="mb-4 flex items-center">
            <Toggle
              defaultChecked={isOpen2}
              icons={false}
              // onChange={toggleModal2}
              className="mr-2"
            />
            <span className="text-md font-medium flex flex-row gap-x-2">Code Interpreter 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="#4B465C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.9999 8H12.0099" stroke="#4B465C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.9999 8H12.0099" stroke="white" strokeOpacity="0.2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 12H12V16H13" stroke="#4B465C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 12H12V16H13" stroke="white" strokeOpacity="0.2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
          <div className={`flex items-center ml-4 bg-gray-200 px-2 rounded-2xl`}>
            <label htmlFor="file-upload" className="cursor-pointer flex flex-row items-center" onClick={handleOpenModal}>
              <PlusIcon width={15} height={20}/>
              <span className="text-sm">Files</span>
            </label>
            {/* <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} /> */}
  
            {selectedFile && (
              <div className="ml-2 flex items-center">
                <img src={URL.createObjectURL(selectedFile)} alt="Selected File" className="h-8 w-8 object-contain rounded-full" />
                <button onClick={handleChangeFile} className="ml-2 focus:outline-none text-gray-600 hover:text-gray-800">
                  Change
                </button>
              </div>
            )}
  
         
    
  {isModalOpen && (
        <Modal onClose={handleCloseModal} >
          {selectedFile && (
            <div>
              <p>Selected File: {selectedFile.name}</p>
              <button onClick={handleUpload}>Upload File</button>
            </div>
          )}
          <input id="file-upload-modal" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          <label htmlFor="file-upload-modal" className="cursor-pointer">
            Select File
          </label>
        </Modal>
      )}
          </div>
        </div>
        <div className="border-b border-gray-200 pr-4 mt-4 mb-4"></div>

        {/* Modals */}
        {/* <ImageUploadModal isOpen={isOpen1} onClose={() => setIsOpen1(false)} onSave={handleSaveImage} /> */}
        {/* <ImageUploadModal isOpen={isOpen2} onClose={() => setIsOpen2(false)} onSave={handleSaveImage} /> */}
      </div>
    );
  };
  

  const UploadImageSVG = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
    const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string | null);
        };
        reader.readAsDataURL(file);
      }
    };
  
    // const handleSVGClick = () => {
    //   // Trigger file input click only if the element exists
    //   const fileInput = document.getElementById('fileInput');
    //   fileInput?.click();
    // };
  
    const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      handleImageUpload(event);
      // Clear the file input after handling the upload to prevent reopening dialog
      event.target.value = '';
    };
  
    return (
      <div className="text-center">
        <label className="item-center text-center mx-auto" htmlFor="fileInput">
          <div style={{ position: 'relative', width: '112px', height: '112px' }}>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
              />
            ) : (
              <svg
                width="112"
                height="112"
                viewBox="0 0 112 112"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                // onClick={handleSVGClick}
              >
                <circle cx="56" cy="56" r="55.5" stroke="black" strokeDasharray="2 2" />
                <path
                  d="M56.0001 42.582V69.4154"
                  stroke="#14171B"
                  strokeWidth="3.35417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.5833 56.0013H69.4166"
                  stroke="#14171B"
                  strokeWidth="3.35417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
      </div>
    );
  };
  
  
  
  


  

  return (
    <div className="justify-between flex flex-row w-full h-full transition-all duration-500 opacity-100">
      <div className="bg-white w-full h-full rounded-2xl overflow-hidden transition-all duration-500 opacity-100 border relative">
        <div className="w-full flex flex-col items-center">
          <div className="w-80 flex relative bg-white border shadow-2xl translate-y-10 rounded-2xl overflow-hidden">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                  selectedTabIndex === index
                    ? "!text-white  font-medium"
                    : "!text-black font-medium"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {tab}
              </div>
            ))}
            <div
              className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
              style={{
                left: `calc(${tabUnderlineLeft}%)`,
                width: `${100 / tabs.length}%`,
              }}
            ></div>
          </div>
          <div className="w-full p-4 px-8 mt-4">
            {selectedTabIndex === 0 && (
              <p className="mt-10 flex flex-col gap-y-72">
                <span className="flex flex-col gap-y-4">
                  <h2 className="font-bold text-[18px]">GPT builder</h2>
                  <h2 className="text-[14px] flex flex-col gap-y-4">
                    Hi! I’ll help you build a new GPT. You can say something
                    like, “make a creative who helps generate visuals for new
                    products” or make a software engineer who helps format my
                    code.”
                    <br className="mt-4" />
                    <span className="mt-4">
                      What would you like to make?{" "}
                    </span>
                  </h2>
                </span>
                <ChatInput onSend={handleSend} />{" "}
              </p>
            )}

            {selectedTabIndex === 1 && (
              <p className="mt-10 flex flex-col gap-y-4 ">
                <span className="flex flex-col gap-y-4">
                  {/* <span className="item-center text-center mx-auto">
                    <svg
                      width="112"
                      height="112"
                      viewBox="0 0 112 112"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="56"
                        cy="56"
                        r="55.5"
                        stroke="black"
                        stroke-dasharray="2 2"
                      />
                      <path
                        d="M56.0001 42.582V69.4154"
                        stroke="#14171B"
                        stroke-width="3.35417"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M42.5833 56.0013H69.4166"
                        stroke="#14171B"
                        stroke-width="3.35417"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span> */}
               <div className="mx-auto">   <UploadImageSVG/></div>
                  <div className=" w-full mx-auto p-4 ">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Name your GPT"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2  text-gray-800 bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Add a short description about what this GPT does"
                          value={formData.description}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2  bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="instructions"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
                          Instructions
                        </label>
                        <textarea
                          id="instructions"
                          placeholder="What does this GPT do? How does it behave? What should it avoid doing?"
                          name="instructions"
                          value={formData.instructions}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2  text-black bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="instructions"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
Tools
                        </label>
                        <div className=" border-b border-gray-200 pr-4 mt-2 mb-2"></div>

                     <FileUploadComponent/>
                      </div>
                      <div className="relative">
  <label
    htmlFor="name"
    className="block text-[14px] font-semibold text-gray-700"
  >
    Conversation Starters
  </label>
  <div className="relative">
    <input
      type="text"
      placeholder=""
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="mt-1 block w-full px-3 py-2 text-gray-800 bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
    {/* Plus Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      // onClick={handleMinusClick} // Replace with your onClick function
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    {/* Minus Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-400 absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      // onClick={handleMinusClick} // Replace with your onClick function
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 12H6"
      />
    </svg>
  </div>
</div>

                    </form>
                  </div>
                </span>
                
                <ChatInput onSend={handleSend} />{" "}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full  h-full rounded-2xl  transition-all duration-500 opacity-100 relative">
          <div className="w-full flex flex-col items-center">
            <div className="w-full p-4 px-8 mt-4">
              <span className="mt-4 flex flex-col gap-y-[148px]">
                <span className="flex flex-col ">
                  <h2 className="font-bold text-xl text-[18px] text-center">
                    Preview
                  </h2>
                </span>
                <div className="mx-auto items-center justify-center flex flex-col gap-y-8">
                  <Image
                    src="/cookie.png"
                    alt="cookie"
                    className="rounded-xl items-center "
                    width={100}
                    height={100}
                  />
                  <span className="items-center justify-center flex flex-col">
                    {" "}
                    <h2 className="font-bold text-[18px]">Cookie Helper</h2>
                    <p className="text-[14px]">
                      A helpful guide for baking cookies
                    </p>
                  </span>
                </div>
                <div className="translate-y-[260px]">
        <ChatInput onSend={handleSend} />
      </div>
              </span>
            </div>
          </div>
      </div>
    </div>
  );
}

