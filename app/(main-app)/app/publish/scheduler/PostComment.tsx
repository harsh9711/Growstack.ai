import { FC, useEffect, useRef, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
    CrossMark,
    Calender,
    CaretDown,
    GenAi,
    Gif,
    ImgVector,
    InsertImage,
    LogoIcon,
    SendIcon2,
    SheduleBackground,
    SmileEmoji,
    LinkIcon,
    Clock,
} from "@/components/svgs";
import instance from "@/config/axios.config";
import { getCookie } from "cookies-next";
import { debounce } from "@/lib/utils";
import { API_URL } from "@/lib/api";
import { ChatResponse } from "@/types/common";
import { parseJsonString } from "@/lib/utils";
import toast from "react-hot-toast";
import { ThumbDown, ThumbUp, Tick, Columns, Rewrite } from "@/components/svgs";
import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaFolderSolid } from "react-icons/lia";
import Picker from "emoji-picker-react";
import EventSource from 'eventsource';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from "@/components/Spinner";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
interface PostCommentProps {
    openPostModel: boolean
    selectedIcon: string
    isGenPost: (open: boolean) => void;
    profile: any
}


const PostComment: FC<PostCommentProps> = (({ openPostModel, selectedIcon, isGenPost, profile }) => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [isAiMode, setAiMode] = useState(false);
    const [text, setText] = useState("");
    const [accumulatedResponse, setAccumulatedResponse] = useState("");
    const [showActions, setShowActions] = useState(true);
    const imgInputRef = useRef<HTMLInputElement | null>(null);
    const gifInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const [actionCompleted, setActionCompleted] = useState(false);
    const [fileInfo, setFileInfo] = useState<{ name: string; file: File } | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [upload, setUpload] = useState<any>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [lastPromt, setLastPrompt] = useState("")
    const [loading, setLoading] = useState(false);
    const currentUser = getCurrentUser();
    const [userPostDetails, setUserPostDetails] = useState<any[]>([])
    const handleInputChage = debounce(async (user_text: any) => {
        if (user_text) {

            setShowActions(true)
            setLoading(true)
            const payload = {
                "user_prompt": user_text,
                "platform": selectedIcon
            }
            let apiUrl = `${API_URL}/ai/api/v1/generate/post`;
            setAccumulatedResponse("")
            const conversation = await instance.post(apiUrl, payload);
            setAccumulatedResponse(conversation.data.data.post);
        }
        setLoading(false)

    }, 600);

    useEffect(() => {
        setAiMode(false)
        setText("")
        setAccumulatedResponse("")
        setUpload(null)
        setFileInfo(null)
    }, []);
    const reGenerate = () => {
        setAccumulatedResponse('')
        handleInputChage(lastPromt)

    }
    const handleActionComplete = () => {
        setText(accumulatedResponse)
        setShowActions(false);
        setActionCompleted(true);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileInfo({ name: file.name, file });
            setUpload(file);
            if (upload) {
                const uploadFile = async () => {
                    for (let progress = 0; progress <= 100; progress += 10) {
                        setUploadProgress(progress);
                        await new Promise(resolve => setTimeout(resolve, 500));
                    }
                };
                uploadFile()
            }
        }
    };
    const handleRemoveFile = () => {
        setFileInfo(null);
        setUpload(null)
        setUploadProgress(null);
    };
    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf':
                return <FaFilePdf className="text-red-600" size={30} />;
            case 'txt':
                return <IoDocumentTextOutline size={30} />;
            case 'doc':
            case 'docx':
                return <FaFileWord className="text-blue-600" size={30} />;
            case 'xls':
            case 'xlsx':
                return <FaFileExcel className="text-green-600" size={30} />;
            default:
                return <LiaFolderSolid className="text-gray-600" size={30} />;
        }
    };

    const handleSendMessage = async () => {
        setLoading(true)
        let file
        if (upload) {
            const formData = new FormData();
            formData.append("document", upload);
            try {
                const response: any = await instance.post(
                    API_URL + "/users/api/v1/file/upload",
                    formData
                );

                const payload = {
                    "post": text,
                    "platforms": [selectedIcon.toLowerCase()],
                    "mediaUrls": [
                        response.data.data.fileUrl
                    ],
                    "isVideo": !response.data.data.isImage,
                    "scheduleDate": selectedDate
                }
                postComment(payload);
                file = response.data.data.fileUrl;
                setUpload(null);
                isGenPost(false)
                setText("");
                setLoading(false)

            } catch (error: any) {
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error(error.message);
                }
                console.error(error);
            } finally {
                setLoading(false)

            }
        } else if (text) {
            const payload = {
                "post": text,
                "platforms": [selectedIcon.toLowerCase()],
                "mediaUrls": [],
                "isVideo": false,
                "scheduleDate": "2023-07-08T12:30:00Z"
            }
            postComment(payload);
        }
    }
    const postComment = async (payload: {}) => {
        setLoading(true)

        try {
            const response: any = await instance.post(
                API_URL +
                `/users/api/v1/social-media/quickpost`,
                payload
            );
            isGenPost(false)
            setLoading(false)
            setText("")
            setAccumulatedResponse("")
            toast.success(response.data.message);
            return response;

        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
            console.error(error);
            setLoading(false)

        } finally {
            setLoading(false)

        }
    };
    useEffect(() => {
        platformDetails()
    }, []);
    const platformDetails = () => {
        let platformDetails: any
        if (profile !== undefined && profile && selectedIcon) {
            platformDetails = profile.activeSocialAccounts
                .filter((account: any) => account.platform === selectedIcon.toLowerCase())
                .map((account: any) => {
                    return {
                        platform: account.platform,
                        username: account.username,
                        profileUrl: account.profileUrl,
                        displayName: account.displayName,
                        userImage: account.userImage
                    };
                });
            setUserPostDetails(platformDetails)
        }
        return platformDetails;
    }
    return (

        <>

            <Dialog open={openPostModel} onOpenChange={isGenPost}>
                <DialogContent
                    showCloseButton={true}
                    className="w-[498px] h-auto p-0 pb-4 border-0 max-w-none"
                >  {loading && <div className="absolute z-50 inset-0 flex justify-center items-center">
                    <Spinner color="black" size={50} />
                    Loading...
                </div>
                    }
                    <DialogHeader>
                        <DialogTitle className="px-5">
                            <div className="bg-white py-3 border-b border-[#EBEBEB] text-black font-inter flex justify-between items-center">
                                <div className="flex items-center relative">
                                    <div className="w-[50px] h-[50px] rounded-full border border-black bg-[#F5F5F5] flex items-center justify-center relative">
                                        {userPostDetails[0]?.userImage && <Avatar>
                                            <AvatarImage src={userPostDetails[0]?.userImage} />
                                        </Avatar>}
                                    </div>
                                </div>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    {!isAiMode ? (
                        <>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={4}
                                placeholder="Write something... or type :balloon: to insert a 🎈"
                                className="w-full h-auto border-none focus:outline-none pl-[20px] text-[15px] font-poppins font-normal leading-normal overflow-y-auto max-h-[7.5em] resize-none"
                                style={{
                                    resize: "none",
                                    lineHeight: "1.5",
                                }}
                            />
                            <button
                                onClick={() => { setAiMode(true); setAccumulatedResponse("") }}
                                className="flex items-center w-[150px] h-[35px] mt-2 ml-5 border border-dashed border-[#034737] rounded-[16px] text-[#034737] text-[14px] bg-transparent"
                            >

                                <GenAi className="ml-2 mr-2" size={24} />
                                Generative AI
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="relative w-[96%] ml-2 mt-1">
                                <CrossMark onClick={() => setAiMode(false)}
                                    className="absolute w-4 h-4"
                                    style={{
                                        bottom: "0",
                                        right: "0",
                                        transform: "translate(25%, 25%)",
                                    }}
                                />
                                <GenAi className="absolute left-3 top-1/2 transform -translate-y-1/2" />

                                <input
                                    type="text"
                                    placeholder="Ask Gen AI here..."
                                    className="w-full pl-10 border border-dashed border-[#034737] rounded-[16px] text-[#034737] text-[14px] bg-transparent p-2"
                                    style={{ paddingLeft: "28px" }}
                                    onChange={(e) => handleInputChage(e.target.value)}
                                />
                            </div>
                            <div className="relative w-[96%] ml-2 mt-2">
                                <textarea
                                    rows={5}
                                    placeholder="Generated content..."
                                    className="w-full h-[220px] border border-dashed border-[#DADADA] rounded-[16px] p-2"
                                    style={{
                                        resize: "none",
                                    }}
                                    value={accumulatedResponse}
                                />
                                {showActions && (
                                    <>
                                        {/* <div className="absolute mb-2 bottom-2 left-2 flex items-center">
                                            <ThumbUp className="mr-2 cursor-pointer" />
                                            <ThumbDown />
                                        </div> */}
                                        <div className="absolute mb-2 right-2 flex items-center space-x-2">
                                            <button className="text-[#034737] bg-transparent border-none" onClick={reGenerate}>
                                                Retry
                                            </button>
                                            <button
                                                className="flex items-center text-white bg-[#034737] pr-6 px-2 py-2 rounded-[16px]"
                                                onClick={handleActionComplete}
                                            ><Tick />
                                                Accept
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}


                    {fileInfo && (
                        <div className="flex items-center justify-between h-9 mt-2 m-2 bg-gray-100 border border-gray-300 rounded-lg" style={{ marginTop: "40px" }}>
                            <div className="flex items-center space-x-2">
                                {getFileIcon(fileInfo.name)}
                                <span className="text-sm text-gray-700 truncate">{fileInfo.name}</span>
                            </div>
                            <button
                                className="text-red-500 ml-2"
                                onClick={handleRemoveFile}
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>
                    )}
                    <div className="ml-[15px]">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <button onClick={() => fileInputRef.current?.click()}>
                                    <ImgVector />
                                </button>
                            </div>
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {isDatePickerOpen && (
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            showTimeSelect
                            timeFormat="hh:mm aa"
                            timeIntervals={1}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="mt-2 border p-2 rounded-md"
                            placeholderText="Select date and time"
                            minDate={new Date()}
                        />
                    )}
                    <div className="flex justify-between items-center  border-t-2 border-solid border-[#034737]">

                        <button
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                            className="border bg-primary-green rounded-[5px] text-white flex items-center p-3 ml-1 mt-2"
                        >
                            <Clock className="text-white bg-white border rounded-full" /> &nbsp; Schedule Post &nbsp;
                        </button>
                        <button
                            className="border bg-primary-green rounded-[5px] text-white flex text-center p-3 mr-1 mt-2"
                            onClick={handleSendMessage}
                        >
                            <span className="mr-2 ml-2">Post Now</span>
                        </button>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )

})

export default PostComment