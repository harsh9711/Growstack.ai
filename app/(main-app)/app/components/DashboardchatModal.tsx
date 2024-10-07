import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import instance from "@/config/axios.config"; 
import { API_URL } from "@/lib/api"; 
import { ISidebarItem } from "../plan/ai-chat/interface/chat.interface";
import SidebarItem from "../plan/ai-chat/components/SidebarItem";
import { formatRelativeDate } from "@/utils/dates";
import toast from "react-hot-toast";

type ModalProps = {
  onClose: () => void;
  onSelectConversation: (_id: string) => void;
};

const DashboardChatModal: React.FC<ModalProps> = ({
  onClose,
  onSelectConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const [sidebarItems, setSidebarItems] = useState<ISidebarItem[]>([]);
  const [groupedSidebarItems, setGroupedSidebarItems] = useState<{
    [date: string]: ISidebarItem[];
  }>({});
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [deleteRequestPending, setDeleteRequestPending] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`${API_URL}/ai/api/v1/conversation/`);
      const items = response.data.data.map((item: any) => ({
        _id: item._id,
        title: item.title,
        selected: item.selected,
        createdDate: item.createdAt,
        updatedDate: item.updatedAt,
      }));
      setSidebarItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    setGroupedSidebarItems(groupByDate(sidebarItems));
  }, [sidebarItems]);

  const groupByDate = (items: ISidebarItem[]) => {
    const grouped: { [date: string]: ISidebarItem[] } = {};
    items.forEach((item) => {
      const date = item.updatedDate ? item.updatedDate.split("T")[0] : item.createdDate.split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedFilteredSidebarItems = groupByDate(filteredSidebarItems);

  const handleRename = async (_id: string, newTitle: string) => {
    try {
      await instance.put(`${API_URL}/ai/api/v1/conversation/${_id}`, { title: newTitle });
      fetchConversations(); // Refetch conversations after rename
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };
  
  const clearAllConversations = async () => {
    if (sidebarItems.length === 0) {
      toast.error("No Conversations are found");
      return;
    }
    setLoading(true);
    try {
      await instance.delete(`${API_URL}/ai/api/v1/conversation/`);
      setSidebarItems([]);
      toast.success("All conversations cleared successfully");
      onSelectConversation("");
      onClose()
      onSelectConversation("");
    } catch (error: any) {
      console.error("Error clearing all chats:", error);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id: string) => {
    setDeleteRequestPending(true);
    try {
      await instance.delete(`${API_URL}/ai/api/v1/conversation/${_id}`);
      fetchConversations();
      setSelectedConversation(null);
      onClose()
      onSelectConversation("");
    } catch (error: any) {
      console.error("Error deleting chat:", error);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setDeleteRequestPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start">
      <div className="bg-white pt-4 pb-4 m-4 rounded-3xl border border-[#E8E8E8] w-[320px]" style={{ height: "95%" }}>
        <div className="flex justify-between items-center pl-7 pr-7 border-b">
          <h1 className="text-xl font-semibold">AI Chat</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 12H3"
                stroke="#034737"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 9L3 12L6 15"
                stroke="#034737"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 9V15"
                stroke="#034737"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-row pt-4 pb-4 pl-6 pr-6 justify-between">
          <div>
            <button
              onClick={() => {
                onSelectConversation("");
                onClose();
              }}
              className="text-white bg-primary-green hover:bg-primary-green/90 flex gap-2 justify-center items-center h-12 w-52 px-8 font-medium rounded-xl transition-all duration-300 text-base"
            >
              Start New Chat
            </button>
          </div>
          <div>
            <button
              className="text-white bg-primary-black rounded-full h-12 w-12 grid place-content-center"
              onClick={() => setToggleSearch(!toggleSearch)}
            >
              <Search size={24} />
            </button>
          </div>
        </div>

        {toggleSearch && (
          <div className="border-t border-[#EFEFEF] flex items-center justify-between py-3 px-6">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>
          </div>
        )}

        <div className="border-y border-[#EFEFEF] flex items-center justify-between py-3 px-6">
          <h2 className="font-semibold">Your conversations</h2>
          <div className="cursor-pointer" onClick={clearAllConversations}>
            <h2 className="font-semibold" style={{ color: "#0c4f0c" }}>Clear All</h2>
          </div>
        </div>

        <div className="flex-1 max-h-[520px] overflow-y-auto p-5 space-y-4">
          {loading ? (
            <div role="status" className="flex justify-center items-center overflow-y-auto">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="overflow-y-auto">
            {Object.entries(groupedFilteredSidebarItems).map(([date, items]) => (
              <div key={date}>
                <h3 className="text-gray-400 px-3 mb-2 capitalize">{formatRelativeDate(date)}</h3>
                {items.map((item) => (
                  <SidebarItem
                    key={item._id}
                    _id={item._id}
                    title={item.title}
                    selectedConversation={selectedConversation!}
                    onSelect={() => {
                      onSelectConversation(item._id);
                      setSelectedConversation(item._id);
                      onClose();
                    }}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    deletePending={deleteRequestPending}
                  />
                ))}
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardChatModal;
