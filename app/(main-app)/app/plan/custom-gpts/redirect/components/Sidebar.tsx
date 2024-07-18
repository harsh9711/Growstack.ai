import { useState } from "react";
import clsx from "clsx";
import ChatInput from "./ChatInput";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigDown } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function Sidebargpt4() {
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [authType, setAuthType] = useState<string>('');
    const [showSecondModal, setShowSecondModal] = useState<boolean>(false);
  
    const handleSave = () => {
      setShowSecondModal(true);
    };
  
    const handleShare = () => {
      setShowSecondModal(false);
      onClose();
    };
    const getRadioClass = (checked: boolean) => {
      return `w-4 h-4 border-2 rounded-full ${
        checked ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'
      }`;
    }
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-[523px]">
          {!showSecondModal ? (
            <>
              <div className="border-b pb-4 mb-8">
                <h2 className="text-xl font-semibold">Authentication</h2>
              </div>
              <div className="w-full text-black">
                <h2 className="font-bold text-[14px]">Authentication type</h2>
                <div className="mb-4 max-w-[253px] flex flex-row mt-2 w-full justify-between">
                <div className="mb-2 items-center flex flex-row">
                <input
                    type="radio"
                    id="option1"
                    name="option"
                    value="None"
                    checked={authType === 'None'}
                    onChange={() => setAuthType('None')}
                    className="custom-radio"
                  />
                    <label htmlFor="option1" className="ml-2 text-[14px]">None</label>
                  </div>
                  <div className="mb-2 items-center flex flex-row">
                    <input
                      type="radio"
                      id="option2"
                      name="option"
                      value="API Key"
                      checked={authType === 'API Key'}
                      onChange={() => setAuthType('API Key')}
                        className="custom-radio"
                    />
                    <label htmlFor="option2" className="ml-2 text-[14px]">API Key</label>
                  </div>
                  <div className="mb-2 items-center flex flex-row">
                    <input
                    className="custom-radio"
                      type="radio"
                      id="option3"
                      name="option"
                      value="oAuth"
                      checked={authType === 'oAuth'}
                      onChange={() => setAuthType('oAuth')}
                    />
                    <label htmlFor="option3" className="ml-2 text-[14px]">oAuth</label>
                  </div>
                </div>
                {authType === 'API Key' && (
                  <div className="mt-4">
                    <h2 className="font-medium mb-2 text-[14px]">API key</h2>
                    <input
                      type="text"
                      placeholder="[HIDDEN]"
                      className="max-w-[523px] w-full p-2 rounded-xl bg-[#F2F2F2] mb-4"
                    />
                    <div className="flex flex-row items-center justify-between max-w-[253px]">
                    <div className="mb-2 items-center flex flex-row">
                    <input className="custom-radio"  type="radio" id="apiOption1" name="apiOption" value="option1" />
                        <label htmlFor="apiOption1" className="ml-2 text-[14px]">Basic</label>
                      </div>
                      <div className="mb-2 items-center flex flex-row">
                      <input  className="custom-radio" type="radio" id="apiOption2" name="apiOption" value="option2" />
                        <label htmlFor="apiOption2" className="ml-2 text-[14px]">Bearer</label>
                      </div>
                      <div className="mb-2 items-center flex flex-row">
                      <input  className="custom-radio" type="radio" id="apiOption3" name="apiOption" value="option3" />
                        <label htmlFor="apiOption3" className="ml-2 text-[14px]">Custom</label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-full mt-4 flex-row">
                <button
                  onClick={onClose}
                  className="w-full py-2 border-[#FF0000] border text-ellipsis font-light text-[#FF0000] rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-full py-2 bg-primary-green text-white text-ellipsis font-light rounded"
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-semibold">ShareGPT</h2>
              </div>
              <div className="w-full text-black">
              <div className="mb-4 flex items-center justify-between">
                <label htmlFor="furtherOption1" className="font-medium text-[14px]">Only me</label>
                <input className="text-2xl   custom-radio" type="radio" id="furtherOption1" name="furtherOption" value="option1" />
              </div>
              <div className="mb-4 flex items-center justify-between">
                <label htmlFor="furtherOption2" className="font-medium text-[14px]">Anyone with the link</label>
                <input className="custom-radio" type="radio" id="furtherOption2" name="furtherOption" value="option2" />
              </div>
              <div className="mb-6 flex items-center justify-between">
                <label htmlFor="furtherOption3" className="font-medium text-[14px]">Publish to GPT store</label>
                <input className="custom-radio" type="radio" id="furtherOption3" name="furtherOption" value="option3" />
              </div>
                <div className="flex w-full mt-4 flex-row">
                  <button
                    onClick={onClose}
                     className="w-full py-2 bg-primary-green text-white text-ellipsis font-light rounded-xl"
                  >
                      Share
                  </button>
              
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const tabs = ["Create", "Configure"];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [showBox, setShowBox] = useState(true);
 const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleTabClick = (index: number) => {
    const totalTabs = tabs.length;
    const percentage = (index / totalTabs) * 100;
    setSelectedTabIndex(index);
    setTabUnderlineLeft(percentage);
  };
  const [formData, setFormData] = useState({
    name: "none",
    description: "",
    instructions: "",
  });
  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
  };
 
  const handleLabelClick = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="justify-between flex flex-row w-full h-full transition-all duration-500 opacity-100">
      <div className="bg-white w-full h-[640px] rounded-r-2xl overflow-hidden transition-all duration-500 opacity-100 border relative">
        <div className="w-full flex flex-col items-center">
         
          <div className="w-full p-4 px-8 mt-4">
            
              <span className=" flex flex-col gap-y-20 ">
                <span className="flex flex-col gap-y-4">
                  <span className="item-center text-center  flex flex-row  justify-between gap-x-20">
                  <Link href="/app/plan/custom-gpts/new">
         
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25L24.125 16.25C24.125 13.9718 22.2782 12.125 20 12.125L20 10.375ZM25.875 16.25C25.875 19.4947 23.2447 22.125 20 22.125L20 20.375C22.2782 20.375 24.125 18.5282 24.125 16.25L25.875 16.25ZM20 22.125L18.75 22.125L18.75 20.375L20 20.375L20 22.125Z"
                  fill="#212833"
                />
              </svg></Link>  
                    <span className="items-center justify-center flex flex-col gap-y-2">
                    {" "}
                    <span className="font-bold text-[18px]">Add actions</span>
                    <p className="text-[14px]">
                    Let your GPT retrieve information or take actions outside of ChatGPT.                    </p>
                  </span>
                  <svg className="opacity-0" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25L24.125 16.25C24.125 13.9718 22.2782 12.125 20 12.125L20 10.375ZM25.875 16.25C25.875 19.4947 23.2447 22.125 20 22.125L20 20.375C22.2782 20.375 24.125 18.5282 24.125 16.25L25.875 16.25ZM20 22.125L18.75 22.125L18.75 20.375L20 20.375L20 22.125Z"
                  fill="#212833"
                />
              </svg>
                  </span>
                  <div className=" w-full mx-auto p-4 ">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-4 ">
          <label
                  htmlFor="name"
                  className="block text-[14px] font-semibold text-gray-700"
                
                >
                  Authentication
                </label>
         <div
    onClick={handleLabelClick}
  className="mt-1 w-full justify-between flex flex-row z-[10] px-3 py-2 text-gray-800 bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
>None <IoIosArrowDown className="mt-1" />
  {/* <option value="Option 1">None</option> */}
</div>
        </div>
            
      <div className="w-full mt-6 justify-between flex flex-row">  <div className=" opacity-0 flex flex-row gap-4">  
      
 </div>  <div className="flex flex-row gap-4">  
        <Button className="bg-primary-green text-white text-[16px] font-light  px-4  rounded-xl">
      Import from URL
</Button>     <Button className="bg-primary-green leading-3 text-white text-[16px] font-light  px-4  rounded-xl">
      Examples <IoIosArrowDown className="ml-2 text-xl"/>
</Button> 
</div></div>
                      <div className="mb-4">
                        <label
                          htmlFor="instructions"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
                       Schema
                        </label>
                        <textarea
                          id="instructions"
                          placeholder="Enter your OpenAI schema here."
                          name="instructions"
                          value={formData.instructions}
                          onChange={handleChange}
                          style={{ minHeight: '150px' }}
                          className="mt-1 block w-full px-3 py-2  text-black bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                      </div>
                      
                    </form>
                  </div>
                </span>
                
               <div className="mt-4"> <ChatInput onSend={function (): void {
                throw new Error("Function not implemented.");
              } }  />{" "}</div>
              </span>
       
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full  h-[620px] rounded-2xl overflow-hidden transition-all duration-500 opacity-100 relative">
          <div className="w-full flex flex-col items-center">
            <div className="w-full p-4 px-8 mt-4">
              <p className="mt-4 flex flex-col gap-y-[148px]">
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
                <div className="mt-4">                <ChatInput onSend={function (): void {
                throw new Error("Function not implemented.");
              } } /></div>

              </p>
            </div>
          </div>
      </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
