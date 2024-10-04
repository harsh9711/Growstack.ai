import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MagicStickIcon, Edit, TrashIcon, StarIcon } from "@/components/svgs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, ArrowLeft } from "lucide-react";

interface ToolsDialogProps {
  setInput: (description: string) => void;
}

export default function ToolsDialog({ setInput }: ToolsDialogProps) {
  const [open, setOpen] = useState(false);
  const [addPromptOpen, setAddPromptOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editPromptOpen, setEditPromptOpen] = useState(false);
  const [currentEditTitle, setCurrentEditTitle] = useState<string | null>(null);
  const [showFavourites, setShowFavourites] = useState(false);
  const [favouritePrompts, setFavouritePrompts] = useState<boolean[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [promptLib, setPromptLib] = useState<
    { title: string; prompt: string; isFavourite: boolean }[]
  >(() => {
    const savedPrompts = localStorage.getItem("promptLib");
    return savedPrompts ? JSON.parse(savedPrompts) : [];
  });

  useEffect(() => {
    localStorage.setItem("promptLib", JSON.stringify(promptLib));
  }, [promptLib]);

  const handleItemClick = (description: string) => {
    setOpen(false);
    setInput(description);
  };

  const handleAddPrompt = () => {
    // Check if title already exists
    if (promptLib.some((item) => item.title === title)) {
      setErrorMessage("Title already exists. Please give a unique title.");
      return;
    }

    if (title && prompt) {
      setPromptLib((prevLib) => [
        ...prevLib,
        { title, prompt, isFavourite: false },
      ]);
      setTitle("");
      setPrompt("");
      setAddPromptOpen(false);
      setErrorMessage(""); // Clear error message on success
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (title: string) => {
    const selectedPrompt = promptLib.find((item) => item.title === title);
    if (selectedPrompt) {
      setTitle(selectedPrompt.title);
      setPrompt(selectedPrompt.prompt);
      setCurrentEditTitle(selectedPrompt.title);
      setEditPromptOpen(true);
      setAddPromptOpen(false);
      setErrorMessage(""); // Clear error message when opening the edit dialog
    }
  };

  const handleUpdatePrompt = () => {
    // Check if new title is duplicate (exclude the current edit title)
    if (
      title !== currentEditTitle &&
      promptLib.some((item) => item.title === title)
    ) {
      setErrorMessage("Title already exists. Please give a unique title.");
      return;
    }

    if (title && prompt && currentEditTitle) {
      const updatedPrompts = promptLib.map((item) =>
        item.title === currentEditTitle ? { ...item, title, prompt } : item
      );
      setPromptLib(updatedPrompts);
      setEditPromptOpen(false);
      setTitle("");
      setPrompt("");
      setCurrentEditTitle(null);
      setErrorMessage(""); // Clear error message on success
    }
  };

  const handleDeleteClick = (title: string) => {
    setPromptLib((prevLib) => prevLib.filter((item) => item.title !== title));
  };

  const handleStarClick = (title: string) => {
    const updatedPrompts = promptLib.map((item) =>
      item.title === title ? { ...item, isFavourite: !item.isFavourite } : item
    );
    setPromptLib(updatedPrompts);
  };

  const filteredPrompts = searchTerm
    ? promptLib.filter(
      (item) =>
        (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!showFavourites || item.isFavourite)
    )
    : promptLib.filter((item) => !showFavourites || item.isFavourite);

  const handleCancelEditOrAdd = () => {
    setEditPromptOpen(false);
    setAddPromptOpen(false);
    setTitle("");
    setPrompt("");
    setCurrentEditTitle(null);
    setErrorMessage(""); // Clear error on cancel
  };

  const handleOpenAddPrompt = () => {
    setEditPromptOpen(false); // Ensure edit mode is closed
    setTitle(""); // Reset title
    setPrompt(""); // Reset prompt
    setAddPromptOpen(true); // Open add prompt dialog
    setErrorMessage(""); // Clear any previous error
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
        >
          <MagicStickIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-3xl !shadow-2xl !shadow-gray-900/20 mr-20">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            showCloseButton={false}
            className="w-1000px md:w-[95%] max-w-3xl p-0 pb-4 border-0"
          >
            <DialogHeader>
              <DialogTitle className="px-5">
                <div className="bg-white py-3 border-b border-[#EBEBEB] text-black font-inter flex justify-between items-center">
                  <p className="text-lg font-semibold">Prompt Library</p>
                  <button
                    className="text-lg font-bold text-green-900"
                    onClick={handleOpenAddPrompt}
                  >
                    Add +
                  </button>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-between px-2 gap-4">
              <div className="flex gap-4">
                <button
                  className={`h-10 px-4 ${!showFavourites
                    ? "font-bold text-green-600 border-b-2 border-green-600"
                    : "font-bold text-black"
                    }`}
                  onClick={() => setShowFavourites(false)}
                >
                  All
                </button>
                <button
                  className={`h-10 px-4 ${showFavourites
                    ? "font-bold text-green-600 border-b-2 border-green-600"
                    : "font-bold text-black"
                    }`}
                  onClick={() => setShowFavourites(true)}
                >
                  Favourites
                </button>
              </div>

              <div className="bg-[#F3F3F3] w-1/2 border border-[#EBEBEB] px-2 py-1 rounded-xl flex gap-3 items-center">
                <Search className="text-gray-500" size={20} />
                <input
                  type="text"
                  className="outline-none bg-[#F3F3F3] h-[40px]"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div className="pl-4 pr-1 pb-3 overflow-y-auto max-h-[360px]">
              <div className="flex flex-wrap justify-between">
                {filteredPrompts.length ? (
                  filteredPrompts.map((item, index) => (
                    <div
                      key={item.title}
                      className="bg-[#F3F3F3] rounded-md p-2 mb-2 w-[49.4%] flex flex-col relative cursor-pointer"
                      onClick={() => handleItemClick(item.prompt)}
                    >
                      <div className="flex justify-between items-center">
                        <p className="font-bold">{item.title}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(item.title);
                            }}
                          >
                            <Edit className="text-gray-500" size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(item.title);
                            }}
                          >
                            <TrashIcon className="text-gray-500" size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStarClick(item.title);
                            }}
                          >
                            <StarIcon
                              size={16}
                              className={`${item.isFavourite
                                ? "text-green-500 fill-green-900"
                                : "text-gray-500"
                                }`}
                            />
                          </button>
                        </div>
                      </div>
                      {/* <br /> */}
                      <div className="overflow-y-auto max-h-[100px] pr-2 pt-2">
                        <p className="font-poppins text-gray-600 whitespace-pre-wrap text-justify">
                          {item.prompt}
                        </p>
                      </div>
                    </div>
                  ))
                ) : showFavourites ? (
                  <p className="w-full flex justify-center items-center h-[20px]">
                    No Favourite prompts found
                  </p>
                ) : (
                  <p className="w-full flex justify-center items-center h-[20px]">
                    No prompts found
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>

      {/* Add/Edit Prompt Dialog */}
      {addPromptOpen || editPromptOpen ? (
        <Dialog open={addPromptOpen || editPromptOpen} onOpenChange={() => { }}>
          <DialogContent
            className="w-[80%] md:w-[60%] max-w-xl p-4 border-0"
            showCloseButton={false}
          >
            <DialogHeader>
              <DialogTitle>
                {editPromptOpen ? "Edit Prompt" : "Add Prompt"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <label>
                <b>Title</b>
              </label>
              <input
                type="text"
                placeholder="Add title"
                className="outline-none bg-[#F3F3F3] rounded-md p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : null}
              <label>
                <b>Custom Prompt</b>
              </label>
              <textarea
                placeholder="Add custom prompt"
                className="outline-none bg-[#F3F3F3] rounded-md p-2 h-40 resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() =>
                  editPromptOpen
                    ? setEditPromptOpen(false)
                    : setAddPromptOpen(false)
                }
                className="border border-red-600 bg-white text-red-600 rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={editPromptOpen ? handleUpdatePrompt : handleAddPrompt}
                className="bg-primary-green text-white rounded-md px-4 py-2"
              >
                {editPromptOpen ? "Update" : "Add"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </DropdownMenu>
  );
}
