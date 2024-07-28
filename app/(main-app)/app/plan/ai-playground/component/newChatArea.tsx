import { X } from "lucide-react";

interface NewChatAlertProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewChat: () => void;
}

const NewChatAlert = ({ setToggleModal, handleNewChat }: NewChatAlertProps) => {
  return (
    <>
      <div className="relative bg-white z-40 px-4 py-3 border-b border-gray-300">
        <button className="absolute top-1 right-1 rounded-lg transition-opacity p-2 hover:bg-[#ff00001f] hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X
            className="h-5 w-5 text-[#ff00009d]"
            onClick={() => setToggleModal(false)}
          />
        </button>
        <div className="font-semibold text-[22px] text-header">New Chat</div>
      </div>
      <div className=" px-4 py-3">
        <div className="flex">
          <div>Do you want to continue to a new chat?</div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => setToggleModal(false)}
            className="text-[14px] border border-red-500 bg-white text-red-500 px-[20px] py-[6px] rounded-md mr-[10px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleNewChat}
            className="text-[14px] w-[95px] bg-primary-green text-white px-[20px] py-[6px] rounded-md mr-[10px]"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default NewChatAlert;
