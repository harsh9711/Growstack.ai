"use client";


import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react";
import Image from "next/image";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Spinner from "@/components/Spinner";
import { BriefCase, BuildingIcon, BuildingStore, FbIcon, FlagIcon, GrowstackIcon, InstaIcon, LinkedinIcon, NotesIcon, PinterestIcon, PlusIcon, TiktokIcon, TwitterIcon } from "@/components/svgs";
import toast from "react-hot-toast";


interface PostCardProps {
    selectedIcon: string;
    profile: ResponseData
    platforms: string[]
}

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

interface ResponseData {
    activeSocialAccounts: SocialAccount[];
    schedules: object;
}

const PostCard: React.FC<PostCardProps> = ({ selectedIcon, profile, platforms }) => {
    const [postDetails, setPostDetails] = useState<any[]>([]);
    const [profileDetails, setProfileDetails] = useState<any | null>([]);
    const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);

    const [loading, setLoading] = useState(false)
    const [userPostDetails, setUserPostDetails] = useState<any[]>([])
    useEffect(() => {
        setPostDetails([]);
        fetchPostDetails();
        platformDetails();
    }, [selectedIcon]);

    const fetchPostDetails = async () => {
        setLoading(true)
        try {
            if (selectedIcon !== null) {
                const response = await instance.get(
                    `${API_URL}/users/api/v1/social-media/posts/${selectedIcon.toLowerCase()}?limit=10`
                );
                const post = response.data.data.posts.filter((postItems:any)=>postItems.post !=="")
                setPostDetails(post);
            }
            setLoading(false)

        } catch (error) {
            setLoading(false)

            console.error("Error fetching posts", error);
        }
    };

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

    const handleDeleteComment = async (eachComment: any) => {
        setLoading(true);
        const payload: any = {
            id: eachComment.id
        };
        console.log("eachComment", eachComment);


        try {
            const response = await instance.delete(
                `${API_URL}/users/api/v1/social-media/posts`,
                { data: payload }
            );
            if (response.data?.data?.status === "success") {
                fetchPostDetails();
                toast.success("Comment deleted successfully");
            }
        } catch (error) {
            console.log("Error Deleting the Comment:", error);
            toast.error("Error deleting the comment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <div className="absolute lex-1 h-full flex flex-col gap-5 justify-center items-center">
                <Spinner color="black" size={100} />
                Loading...
            </div>
            }
            {postDetails.length > 0 && userPostDetails ? (
                <>
                    {postDetails.map((post: any, index) => (
                        <div className='flex flex-row gap-3 mt-2 px-2 w-full'>
                            <div className='flex flex-col gap-3'>
                                <div className="w-[50px] h-[50px] rounded-full shadow-lg bg-white flex items-center justify-center cursor-pointer">
                                    {selectedIcon.toLowerCase() === "facebook" && <FbIcon />}
                                    {selectedIcon.toLowerCase() === "twitter" && <TwitterIcon />}
                                    {selectedIcon.toLowerCase() === "linkedin" && <LinkedinIcon />}
                                    {selectedIcon.toLowerCase() === "instagram" && <InstaIcon />}
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl shadow-lg bg-white w-[100%] h-[100%] overflow-y-auto">
                                <div key={index} className="flex flex-row mb-4 gap-4">
                                    <div className='w-15'>
                                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center">
                                            {userPostDetails.length > 0 && userPostDetails[0].userImage?.startsWith('http') && (
                                                <Image src={userPostDetails[0].userImage} alt="User Avatar" width={50} height={50} />
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-3 mt-2'>
                                        <div className='flex flex-row justify-between w-full h-[20px]'>
                                            <div className="flex flex-row items-center justify-start gap-1">
                                                <p className="font-bold font-sans text-[16.7px] tracking-[-0.3px]">{(userPostDetails.length > 0 && userPostDetails[0].username !== undefined) ? (
                                                    userPostDetails[0].username ? userPostDetails[0].username : userPostDetails[0].displayName
                                                ) : userPostDetails[0].displayName}</p>
                                                <p className="font-sans font-normal text-[16.7px] tracking-[-0.3px] text-[rgba(83,100,113,1)]"></p>
                                            </div>
                                            <div className='cursor-pointer relative' >

                                                {visibleMenuIndex === index && (
                                                    <div className="absolute right-0 mt-2 w-[100px] text-center items-center h-8 bg-white shadow-lg rounded-md z-10" onClick={() => handleDeleteComment(post)}>
                                                        <div className="mt-1 text-red-500">
                                                            Delete Post
                                                        </div>
                                                    </div>
                                                )}

                                            </div>

                                        </div>

                                        <div>
                                            {post.mediaType ? (
                                                <div className="mt-2">
                                                    {post.mediaType === "VIDEO" ? (
                                                        <>
                                                            <video key={post.id} controls className="w-full rounded-lg">
                                                                <source src={post.mediaUrl} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>

                                                        </>
                                                    ) : (<>
                                                        {post.mediaUrl && (
                                                            <img
                                                                key={post.id}
                                                                src={post.mediaUrl}
                                                                alt="Post Media"
                                                                className="w-full rounded-lg"
                                                            />
                                                        )
                                                        }
                                                    </>

                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                </div>
                                            )}
                                            <p className="mb-3  text-left text-[16.7px] tracking-[-0.3px] text-[rgba(20,23,26,1)]">
                                                {post.post.split(" ").map((word: any, index: Key | null | undefined) => (
                                                    word.startsWith("#") ? (
                                                        <span key={index} className="text-blue-500">{word} </span>
                                                    ) : (
                                                        <span key={index}>{word} </span>
                                                    )
                                                ))}


                                            </p>
                                            {post.media && post.media.length > 0 && (
                                                <div className="mt-2">
                                                    {post.media.map((item: { type: string; url: string | undefined; mediaUrls: { mediaUrl: string | undefined; }[]; }, index: Key | null | undefined) => {
                                                        if (item.type === "photo") {
                                                            return (
                                                                <>
                                                                    <img
                                                                        key={index}
                                                                        src={item.url}
                                                                        alt="Post Media"
                                                                        className="w-full rounded-lg"
                                                                    />
                                                                </>

                                                            );
                                                        } else if (item.type === "video") {
                                                            return (
                                                                <>
                                                                    <video
                                                                        key={index}
                                                                        controls
                                                                        className="w-full rounded-lg"
                                                                    >
                                                                        <source src={item.mediaUrls[0].mediaUrl} type="video/mp4" />
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                </>

                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            )}

                                            {post.mediaUrls && post.mediaUrls.url ? (
                                                <div className="mt-2">
                                                    {post.mediaUrls.id.includes("video") ? (
                                                        <video key={post.id} controls className="w-full rounded-lg">
                                                            <source src={post.mediaUrls.url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <img
                                                            key={post.id}
                                                            src={post.mediaUrls.url}
                                                            alt="Post Media"
                                                            className="w-full rounded-lg"
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <div>
                                                </div>
                                            )}
                                            {post.mediaUrls && post.mediaUrls.length > 0 ? (
                                                <div className="mt-2">
                                                    {post.mediaUrls.map((item: { mediaType: string; media: { image?: { src: string }; source?: string }; }, index: Key | null | undefined) => {
                                                        if (item.mediaType === "photo" && item.media.image) {
                                                            return (
                                                                <img
                                                                    key={index}
                                                                    src={item.media.image.src}
                                                                    alt="Post Image"
                                                                    className="w-full rounded-lg"
                                                                />
                                                            );
                                                        } else if (item.mediaType === "video" && item.media.source) {
                                                            return (
                                                                <video
                                                                    key={index}
                                                                    controls
                                                                    className="w-full rounded-lg"
                                                                >
                                                                    <source src={item.media.source} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            ) : (
                                                <div>
                                                </div>
                                            )}
                                            <div className="text-left mt-3" >
                                                {selectedIcon.toLowerCase() === 'twitter' ?
                                                    <div className="mt-2 flex" style={{whiteSpace:"nowrap"}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 11V19C7 19.5523 6.55228 20 6 20H4C3.44772 20 3 19.5523 3 19V12C3 11.4477 3.44772 11 4 11H7C9.20914 11 11 9.20914 11 7V6C11 4.89543 11.8954 4 13 4C14.1046 4 15 4.89543 15 6V11H18C19.1046 11 20 11.8954 20 13L19 18C18.7046 19.2603 17.8892 20.0756 17 20H10C8.34315 20 7 18.6569 7 17" stroke="#5B5D60" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                       <p className="text-[16.7px]">{post && post.publicMetrics && post.publicMetrics.likeCount} </p> </div>
                                                    : <div className="mt-2 flex" style={{whiteSpace:"nowrap"}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 11V19C7 19.5523 6.55228 20 6 20H4C3.44772 20 3 19.5523 3 19V12C3 11.4477 3.44772 11 4 11H7C9.20914 11 11 9.20914 11 7V6C11 4.89543 11.8954 4 13 4C14.1046 4 15 4.89543 15 6V11H18C19.1046 11 20 11.8954 20 13L19 18C18.7046 19.2603 17.8892 20.0756 17 20H10C8.34315 20 7 18.6569 7 17" stroke="#5B5D60" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <p className="text-[16.7px]"> {post && post.likeCount}
                                                        </p>
                                                    </div>
                                                }
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    ))} </>) :
                <>
                    {!loading && (<h1>No Active Post</h1>)}
                </>
            }



        </>
    );
};

export default PostCard;