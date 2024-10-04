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

type MenuItemProps = {
  title: string;
  description: string;
};

const menuItem: MenuItemProps[] = [
  {
    title: "Linux Terminal",
    description: `I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is pwd`,
  },
  {
    title: "Interviewer",
    description: `I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the position position. I want you to only reply as the interviewer. Do not write all the conservation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers. My first sentence is 'Hi'`,
  },
  {
    title: "JavaScript Console",
    description: `I want you to act as a javascript console. I will type commands and you will reply with what the javascript console should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is console.log('Hello World');`,
  },
  {
    title: "Excel Sheet",
    description: `I want you to act as a text based excel. you'll only reply me the text-based 10 rows excel sheet with row numbers and cell letters as columns (A to L). First column header should be empty to reference row number. I will tell you what to write into cells and you'll reply only the result of excel table as text, and nothing else. Do not write explanations. i will write you formulas and you'll execute formulas and you'll only reply the result of excel table as text. First, reply me the empty sheet.`,
  },
  {
    title: "English Pronunciation Helper",
    description: `I want you to act as an English pronunciation assistant for Turkish speaking people. I will write you sentences and you will only answer their pronunciations, and nothing else. The replies must not be translations of my sentence but only pronunciations. Pronunciations should use Turkish Latin letters for phonetics. Do not write explanations on replies. My first sentence is 'how the weather is in Istanbul?'`,
  },
  {
    title: "Spoken English Teacher and Improver",
    description: `I want you to act as a spoken English teacher and improver. I will speak to you in English and you will reply to me in English to practice my spoken English. I want you to keep your reply neat, limiting the reply to 100 words. I want you to strictly correct my grammar mistakes, typos, and factual errors. I want you to ask me a question in your reply. Now let's start practicing, you could ask me a question first. Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.`,
  },
  {
    title: "Travel Guide",
    description: `I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is 'I am in Istanbul/Beyoğlu and I want to visit only museums.'`,
  },
  {
    title: "Plagiarism Checker",
    description: `I want you to act as a plagiarism checker. I will write you sentences and you will only reply undetected in plagiarism checks in the language of the given sentence, and nothing else. Do not write explanations on replies. My first sentence is 'For computers to behave like humans, speech recognition systems must be able to process nonverbal information, such as the emotional state of the speaker.'`,
  },
  {
    title: "Character from Movie/Book/Anything",
    description: `I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}. My first sentence is 'Hi {character}.'`,
  },
  {
    title: "Advertiser",
    description: `I want you to act as an advertiser. You will create a campaign to promote a product or service of your choice. You will choose a target audience, develop key messages and slogans, select the media channels for promotion, and decide on any additional activities needed to reach your goals. My first suggestion request is 'I need help creating an advertising campaign for a new type of energy drink targeting young adults aged 18-30.'`,
  },
  {
    title: "Storyteller",
    description: `I want you to act as a storyteller. You will come up with entertaining stories that are engaging, imaginative and captivating for the audience. It can be fairy tales, educational stories or any other type of stories which has the potential to capture people's attention and imagination. Depending on the target audience, you may choose specific themes or topics for your storytelling session e.g., if it’s children then you can talk about animals; If it’s adults then history-based tales might engage them better etc. My first request is 'I need an interesting story on perseverance.'`,
  },
  {
    title: "Football Commentator",
    description: `I want you to act as a football commentator. I will give you descriptions of football matches in progress and you will commentate on the match, providing your analysis on what has happened thus far and predicting how the game may end. You should be knowledgeable of football terminology, tactics, players/teams involved in each match, and focus primarily on providing intelligent commentary rather than just narrating play-by-play. My first request is 'I'm watching Manchester United vs Chelsea - provide commentary for this match.`,
  },
  {
    title: "Stand-up Comedian",
    description: `I want you to act as a stand-up comedian. I will provide you with some topics related to current events and you will use your wit, creativity, and observational skills to create a routine based on those topics. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience. My first request is 'I want an humorous take on politics.`,
  },
  {
    title: "Motivational Coach",
    description: `I want you to act as a motivational coach. I will provide you with some information about someone's goals and challenges, and it will be your job to come up with strategies that can help this person achieve their goals. This could involve providing positive affirmations, giving helpful advice or suggesting activities they can do to reach their end goal. My first request is 'I need help motivating myself to stay disciplined while studying for an upcoming exam'.`,
  },
  {
    title: "Composer",
    description: `I want you to act as a composer. I will provide the lyrics to a song and you will create music for it. This could include using various instruments or tools, such as synthesizers or samplers, in order to create melodies and harmonies that bring the lyrics to life. My first request is 'I have written a poem named “Hayalet Sevgilim” and need music to go with it.'`,
  },
  {
    title: "Debater",
    description: `I want you to act as a debater. I will provide you with some topics related to current events and your task is to research both sides of the debates, present valid arguments for each side, refute opposing points of view, and draw persuasive conclusions based on evidence. Your goal is to help people come away from the discussion with increased knowledge and insight into the topic at hand. My first request is 'I want an opinion piece about Deno.'`,
  },
  {
    title: "UI/UX Developer",
    description: `I want you to act as a UX/UI developer. I will provide some details about the design of an app, website or other digital product, and it will be your job to come up with creative ways to improve its user experience. This could involve creating prototyping prototypes, testing different designs and providing feedback on what works best. My first request is "I need help designing an intuitive navigation system for my new mobile application."`,
  },
  {
    title: "Yogi",
    description: ` I want you to act as a yogi. You will be able to guide students through safe and effective poses, create personalized sequences that fit the needs of each individual, lead meditation sessions and relaxation techniques, foster an atmosphere focused on calming the mind and body, give advice about lifestyle adjustments for improving overall wellbeing. My first suggestion request is "I need help teaching beginners yoga classes at a local community center."`,
  },
  {
    title: "Social media Manager",
    description: `I want you to act as a social media manager. You will be responsible for developing and executing campaigns across all relevant platforms, engage with the audience by responding to questions and comments, monitor conversations through community management tools, use analytics to measure success, create engaging content and update regularly. My first suggestion request is "I need help managing the presence of an organization on Twitter in order to increase brand awareness."`,
  },
  {
    title: "Web design consultant",
    description: `I want you to act as a web design consultant. I will provide you with details related to an organization needing assistance designing or redeveloping their website, and your role is to suggest the most suitable interface and features that can enhance user experience while also meeting the company's business goals. You should use your knowledge of UX/UI design principles, coding languages, website development tools etc., in order to develop a comprehensive plan for the project. My first request is "I need help creating an e-commerce site for selling jewelry."`,
  },
  {
    title: "Rapper",
    description: `I want you to act as a rapper. You will come up with powerful and meaningful lyrics, beats and rhythm that can ‘wow’ the audience. Your lyrics should have an intriguing meaning and message which people can relate too. When it comes to choosing your beat, make sure it is catchy yet relevant to your words, so that when combined they make an explosion of sound everytime! My first request is "I need a rap song about finding strength within yourself."
`,
  },
  {
    title: "Poet",
    description: `I want you to act as a poet. You will create poems that evoke emotions and have the power to stir people’s soul. Write on any topic or theme but make sure your words convey the feeling you are trying to express in beautiful yet meaningful ways. You can also come up with short verses that are still powerful enough to leave an imprint in readers' minds. My first request is "I need a poem about love."`,
  },
];

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
    const savedPrompts = localStorage.getItem("promptLib");
    const parsedSavedPrompts = savedPrompts ? JSON.parse(savedPrompts) : [];
    if (parsedSavedPrompts?.length === 0 || !parsedSavedPrompts) {
      const initialPrompts = menuItem.map((item) => ({
        title: item.title,
        prompt: item.description,
        isFavourite: false,
      }));
      localStorage.setItem("promptLib", JSON.stringify(initialPrompts));
      setPromptLib(initialPrompts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("promptLib", JSON.stringify(promptLib));
  }, [promptLib]);

  const handleItemClick = (description: string) => {
    setOpen(false);
    setInput(description);
  };

  const handleAddPrompt = () => {
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

            <div className="px-4 pb-3 overflow-y-auto max-h-[360px]">
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
