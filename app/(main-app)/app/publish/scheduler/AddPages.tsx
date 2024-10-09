import { BriefCase, BuildingIcon, BuildingStore, FbIcon, FlagIcon, GrowstackIcon, InstaIcon, LinkedinIcon, NotesIcon, PinterestIcon, PlusIcon, TiktokIcon } from "@/components/svgs";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TwitterIcon, UserCircleIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";


interface AddPagesProps {
    setOpenModel: (open: boolean) => void;
    openModel: boolean;
}

interface BoxContent {
    name: string;
    flagIcon?: any;
    content1?: string;
    growStackData?: string;
    growstackIcon?: any;
    growstackSubData?: string;
    connected?: string;
    userCircleIcon?: any;
    buildingStoreIcon?: any;
    content2?: string;
    content3?: string;
    briefCase?: any;
    buildingIcon?: any;
    plusIcon?: any;
    notesIcon?: any;
    addAccountIcon?: any;
    infoIcon?: any;
    rightIcon?: any;

};

const contentMap: { [key: string]: BoxContent } = {
    facebook: {
        name: "Facebook",
        growstackIcon: <GrowstackIcon />,
        growStackData: "GrowStact AI",
        growstackSubData: "@GrowStackai",
        connected: "CONNECTED",
        flagIcon: <FlagIcon />,
        content1: "Add Facebook Pages",
    },
    instagram: {
        name: "twitter",
        growstackIcon: <GrowstackIcon />,
        growStackData: "GrowStactAi",
        growstackSubData: "@GrowStackai",
        connected: "CONNECTED",
        buildingStoreIcon: <BuildingStore />,
        userCircleIcon: <UserCircleIcon />,
        content1: "Add Instagram Professional Accounts",
        content2: "Add Instagram Personal Profiles Or Pages"
    },

    // tiktok: {
    //     name: "Tiktok",
    //     growstackIcon: <GrowstackIcon />,
    //     growStackData: "GrowStactAi",
    //     growstackSubData: "@GrowStackai",
    //     connected: "CONNECTED",
    //     briefCase: <BriefCase />,
    //     addAccountIcon: <UserCircleIcon />,
    //     content1: "Add Tiktok Accounts",
    //     content2: "business accounts"

    // },

    twitter: {
        name: "twitter",
        growstackIcon: <GrowstackIcon />,
        growStackData: "GrowStactAi",
        growstackSubData: "@GrowStackai",
        connected: "CONNECTED",
        plusIcon: <PlusIcon />,
        userCircleIcon: <UserCircleIcon />,
        content1: "Add X (Twitter) Profiles",
        content2: "Create a mockup page",

    },

    // pinterest: {
    //     name: "Pinterest",
    //     growstackIcon: <GrowstackIcon />,
    //     growStackData: "GrowStactAi",
    //     growstackSubData: "@GrowStackai",
    //     connected: "CONNECTED",
    //     notesIcon: <NotesIcon />,
    //     plusIcon: <PlusIcon />,
    //     content1: "Add Pinterest Business Pages",
    //     content2: "Create a mockup page",

    // },

    linkedin: {
        name: "Linkedin",
        growstackIcon: <GrowstackIcon />,
        growStackData: "GrowStactAi",
        growstackSubData: "@GrowStackai",
        connected: "CONNECTED",
        userCircleIcon: <UserCircleIcon />,
        buildingIcon: <BuildingIcon />,
        content1: "Add Linkedin company Pages",
        content2: "Add Linkedin Personal Pages"
    },
};


interface SocialAccount {
    created: string;
    displayName: string;
    id: string;
    messagingActive: boolean;
    platform: string;
    profileUrl: string;
    subscriptionType: string;
    userImage: string;
    username: string;
    verifiedType: string;
}

interface SocialMediaProfileResponse {
    activeSocialAccounts: SocialAccount[];
    schedules?: Record<string, any>;
}
const AddPages: FC<AddPagesProps> = ({
    setOpenModel, openModel
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [boxContent, setBoxContent] = useState<BoxContent>(contentMap["facebook"]);
    const [response, setResponse] = useState<SocialMediaProfileResponse | null>(null);
    const [platformDetails, setPlatformDetails] = useState<SocialAccount | null>(null)
    const [platforms, setPlatforms] = useState<string[]>([]);
    const [profile, setProfile] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const handleCloseDialog = () => {
        setOpenModel(false);
    };
    const handleIconClick = (platform: any) => {
        getDetailsByPlatform(platform);
        setBoxContent(contentMap[platform]);
    };
    const handleOnConnect = async () => {
        setLoading(true);

        const currentPath = localStorage.getItem("currentPathname");
        try {
            const response = await instance.get(
                `${API_URL}/users/api/v1/social-media/connect?currentPath=${currentPath}`
            );
            const url = response?.data.data;
            if (url) {
                window.location.href = url;
            }
            setLoading(false);

        } catch (error: any) {
            setLoading(false);

            toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        handleGetProfileData();
    }, []);

    useEffect(() => {
        if (platforms.length > 0) {
        }
    }, [platforms]);
    const handleGetProfileData = async () => {
        setLoading(true);
        try {
            const response = await instance.get(
                `${API_URL}/users/api/v1/social-media/profile`
            );
            console.log("Response data:", response.data);

            const activeAccounts = response.data.data?.activeSocialAccounts || [];
            setResponse({ activeSocialAccounts: activeAccounts });

            const extractedPlatforms = activeAccounts.map(
                (account: SocialAccount) => account.platform
            );
            setPlatforms(extractedPlatforms);

            if (activeAccounts.length > 0) {
                setProfile(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching social profile:", error);
        } finally {
            setLoading(false); // Turn off loading state after the operation
        }
    };

    // Utility function to get details by platform
    const getDetailsByPlatform = (platform: string) => {
        const platformsdetails: any = response?.activeSocialAccounts?.filter((account: SocialAccount) =>
            account.platform.toLowerCase() === platform.toLowerCase()
        )[0] || [];
        setPlatformDetails(platformsdetails)
    };

    return (

        <>
            {loading && <div className="absolute lex-1 h-full flex flex-col gap-5 justify-center items-center">
                <Spinner color="black" size={100} />
                Loading...
            </div>

            }
            <Dialog open={openModel} onOpenChange={handleCloseDialog}>
                <DialogContent className="w-[1010px] md:w-[725px] max-w-3xl p-0 pb-4 border-0 overflow-hidden">
                    <DialogHeader>
                        <DialogTitle className="px-0">
                            <div className="bg-white py-3 border-b border-[#EBEBEB] text-black font-inter bg-[#EDEDED]  ">
                                <div className=" flex items-center justify-center pb-5 pt-2 ">
                                    <p className="text-lg font-semibold ">Add pages to GrowStack AI</p>
                                </div>
                                <div className="flex items-center justify-center space-x-4">

                                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow" onClick={() => handleIconClick("facebook")}>
                                        <FbIcon />
                                    </div>
                                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow" onClick={() => handleIconClick("instagram")}>
                                        <InstaIcon />
                                    </div>
                                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow" onClick={() => handleIconClick("twitter")}>
                                        <TwitterIcon />
                                    </div>
                                    {/* <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow" onClick={() => handleIconClick("tiktok")}>
                                        <TiktokIcon />
                                    </div> */}
                                    {/* <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow" onClick={() => handleIconClick("pinterest")}>
                                        <PinterestIcon />
                                    </div> */}
                                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow" onClick={() => handleIconClick("linkedin")}>
                                        <LinkedinIcon />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div className="grid grid-cols-2 grid-rows-2 gap-6 p-4  mt-0  ">
                                    <div className="border border-[#034737] bg-[#034737] border-dotted rounded text-white p-2  w-[290px] h-[210px] flex items-center justify-center" onClick={handleOnConnect}>
                                        <div className="flex flex-col items-center">
                                            <div className="pb-3 w-[60px] h-[60px text-white">
                                                <div className="text-white">
                                                    <FlagIcon />
                                                    {boxContent.flagIcon}
                                                    {boxContent.buildingStoreIcon}
                                                    {boxContent.buildingIcon}
                                                    {boxContent.notesIcon}
                                                    {boxContent.addAccountIcon}
                                                </div>

                                            </div>
                                            <div className="flex justify-center">
                                                <div>
                                                    <p className="text-center text-white">{boxContent?.content1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {platformDetails && platformDetails.platform &&
                                        <div className="border border-[#034737] border-dotted rounded p-2 w-[290px] h-[210px] flex items-center justify-center">
                                            <div className="flex flex-col items-center">
                                                <div className="pb-3 w-[60px] h-[60px">
                                                    <img src={platformDetails.userImage} alt={platformDetails.displayName} />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <div>
                                                        <p className="text-center font-bold text-xl pt-2">{platformDetails.platform}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-center text-sm">{platformDetails.username}</p>
                                                    </div>
                                                    <div className="pt-3 ">
                                                        <p className="text-center text-md " style={{ color: '#2FDF84' }}>Connected</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                        </DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>

    )

}

export default AddPages;

function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}
