import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { EditIcon, MessageIcon2 } from "@/components/svgs";
import { Trash2 } from "lucide-react";
import { API_URL } from "@/lib/api";
import axios from "axios";

interface SidebarItemProps {
  _id: string;
  title: string;
  onRename: (_id: string, newTitle: string) => void;
  onSelect: () => void; 
  setSidebarItems: React.Dispatch<React.SetStateAction<any[]>>; 
}

const SidebarItem: React.FC<SidebarItemProps> = ({ _id, title, onRename, onSelect, setSidebarItems }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) {
      setNewTitle(title);
    }
  }, [title, editing]);

  const handleRenameClick = async () => {
    try {
      if (!editing) {
        setEditing(true);
      } else if (newTitle !== title) {
        await axios.put(`${API_URL}/ai/api/v1/conversation/${_id}`, { title: newTitle });
        onRename(_id, newTitle);
        setEditing(false);
      }
      setIsHovered(false);
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`${API_URL}/ai/api/v1/conversation/${_id}`);
      console.log(`Conversation ${_id} deleted successfully.`);
      // Fetch updated list of sidebar items after deletion
      const response = await axios.get(`${API_URL}/ai/api/v1/conversation/`);
      console.log("converstation",response)
      const items = response.data.data.map((item: any) => ({
        _id: item._id,
        title: item.title,
        selected: item.selected,
        createdDate: item.createdAt,
        updatedDate: item.updatedAt,
      }));
      setSidebarItems(items);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".rename-menu")) {
      if (newTitle !== title && editing) {
        onRename(_id, newTitle);
        setEditing(false); 
      } else {
        setNewTitle(title);
      }
      setIsHovered(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [newTitle, editing, title]); // Update on newTitle, editing, and title changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value); // Update newTitle on input change
  };

  return (
    <div
      className={clsx(
        "flex gap-4 w-full p-4 hover:bg-gray-100 cursor-pointer rounded-full items-center group  relative",
        isHovered && "pr-4"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect} // Trigger onSelect when item is clicked
    >
      <MessageIcon2
        className={clsx("group-hover:text-primary-green", isHovered && "text-primary-green")}
      />
      {!editing && (
        <span className={clsx("flex-1 whitespace-nowrap overflow-hidden text-ellipsis")}>
          {title}
        </span>
      )}
      {editing && (
        <input
          type="text"
          value={newTitle}
          onChange={handleInputChange}
          onBlur={handleRenameClick} 
          className="border-gray-300 focus:border-primary-green rounded px-2 py-1 w-full mb-1"
        />
      )}
      <div className={clsx("py-4 px-5 rounded-l-3xl items-center gap-3.5 w-full flex max-w-fit transition-all duration-100 transform translate-x-full group-hover:translate-x-0")}>
        {isHovered && (
          <>
            <Trash2 size={18} className="cursor-pointer text-white" onClick={handleDeleteClick} />
            <EditIcon
              className="cursor-pointer h-4 w-4"
              onClick={handleRenameClick}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarItem;
