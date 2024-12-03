import { EditIcon, MessageIcon2 } from "@/components/svgs";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/Spinner";

interface SidebarItemProps {
  _id: string;
  title: string;
  onRename: (_id: string, newTitle: string) => void;
  onDelete: (_id: string) => void;
  onSelect: () => void;
  selectedConversation: string;
  deletePending: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  _id,
  title,
  onRename,
  onSelect,
  onDelete,
  selectedConversation,
  deletePending,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [editing, setEditing] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
        onRename(_id, newTitle);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRenameClick();
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
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [newTitle, editing, title]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <>
      <div
        className={clsx(
          "flex gap-4 w-full px-4 mb-1.5 hover:bg-gray-200/80 cursor-pointer group rounded-full transition-all duration-300 overflow-hidden",
          selectedConversation === _id && "bg-gray-100"
        )}
      >
        <div
          className={clsx(
            "h-14 flex gap-4 w-full items-center relative overflow-hidden"
          )}
          onClick={e => {
            if (!editing) onSelect();
          }}
        >
          <MessageIcon2
            className={clsx("group-hover:text-primary-green w-full max-w-fit")}
          />
          {!editing && (
            <span
              className={clsx(
                "flex-1 whitespace-nowrap overflow-hidden text-ellipsis"
              )}
            >
              {title}
            </span>
          )}
          {editing && (
            <input
              type="text"
              value={newTitle}
              onChange={handleInputChange}
              onBlur={handleRenameClick}
              onKeyDown={handleKeyDown} // Listen for Enter key
              onClick={e => e.stopPropagation()} // Prevent onSelect when clicking the input
              className="border-gray-300 focus:border-primary-green rounded px-2 py-1 w-full mb-1 ring-2 ring-primary-green"
            />
          )}
        </div>
        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition duration-500 flex items-center gap-3 w-full max-w-fit">
          <Trash2
            size={18}
            className="cursor-pointer"
            onClick={() => setIsDeleteOpen(true)}
          />
          <EditIcon
            className="cursor-pointer h-4 w-4"
            onClick={handleRenameClick}
          />
        </div>
      </div>
      <DeleteChatModal
        id={_id}
        onDelete={() => onDelete(_id)}
        show={isDeleteOpen}
        onHide={() => setIsDeleteOpen(false)}
        pending={deletePending}
      />
    </>
  );
};

export default SidebarItem;

interface DeleteModalProps {
  show: boolean;
  onHide: (value: boolean) => void;
  onDelete: () => void;
  pending: boolean;
  id: string;
}

function DeleteChatModal({
  show,
  onHide,
  onDelete,
  pending,
  id,
}: DeleteModalProps) {
  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="max-w-xl pt-0">
        <DialogHeader className="py-4 border-b">
          <DialogTitle>Delete History</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">
            Are you sure you want to delete this chat? This action cannot be
            undone!
          </p>
          <div className="flex justify-end gap-3 w-full">
            <button
              className="h-11 w-full max-w-[100px] px-6 bg-white border text-primary-green border-primary-green rounded-lg mt-6"
              onClick={() => onHide(false)}
            >
              Cancel
            </button>
            <button
              className="h-11 w-full max-w-[140px] px-6 bg-primary-green sheen rounded-lg text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
              onClick={onDelete}
            >
              {pending && <Spinner />}
              Confirm
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
