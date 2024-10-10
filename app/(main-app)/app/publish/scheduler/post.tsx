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
                    `${API_URL}/users/api/v1/social-media/posts/${selectedIcon}?limit=10`
                );
                const post = response.data.data.posts
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
    const toggleMenu = (index: number) => {
        setVisibleMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    const handleDeleteComment = async (eachComment: any) => {
        setLoading(true);
        const payload: any = {
            id: eachComment.id
        };
        console.log("eachComment",eachComment);
        
    
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
                    {postDetails.map((post: { post: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; media: { type: string; url: string | undefined; mediaUrls: { mediaUrl: string | undefined; }[]; }[]; }, index: Key | null | undefined) => (
                        <div className='flex flex-row gap-3 mt-2 px-2'>
                            <div className='flex flex-col gap-3'>
                                <div className="w-[50px] h-[50px] rounded-full shadow-lg bg-white flex items-center justify-center cursor-pointer">
                                    {selectedIcon === "facebook" && <FbIcon />}
                                    {selectedIcon === "twitter" && <TwitterIcon />}
                                    {selectedIcon === "linkedin" && <LinkedinIcon />}
                                    {selectedIcon === "instagram" && <InstaIcon />}
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl shadow-lg bg-white w-[480px] h-[100%] overflow-y-auto">
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
                                                <p className="font-bold font-sans text-[16.7px] tracking-[-0.3px]">{userPostDetails.length > 0 && userPostDetails[0].username !== undefined && (
                                                    userPostDetails[0].username
                                                )}</p>
                                                <p className="font-sans font-normal text-[16.7px] tracking-[-0.3px] text-[rgba(83,100,113,1)]"></p>
                                            </div>
                                            <div className='cursor-pointer relative' >
                                                {/* <div onClick={() => toggleMenu(index as number)}>
                                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.85608 10.346C5.85608 10.7652 5.68958 11.1671 5.3932 11.4635C5.09682 11.7599 4.69484 11.9264 4.2757 11.9264C3.85655 11.9264 3.45458 11.7599 3.1582 11.4635C2.86182 11.1671 2.69531 10.7652 2.69531 10.346C2.69531 9.92687 2.86182 9.52489 3.1582 9.22851C3.45458 8.93213 3.85655 8.76562 4.2757 8.76562C4.69484 8.76562 5.09682 8.93213 5.3932 9.22851C5.68958 9.52489 5.85608 9.92687 5.85608 10.346ZM12.1776 10.346C12.1776 10.7652 12.0111 11.1671 11.7147 11.4635C11.4184 11.7599 11.0164 11.9264 10.5972 11.9264C10.1781 11.9264 9.77612 11.7599 9.47974 11.4635C9.18336 11.1671 9.01685 10.7652 9.01685 10.346C9.01685 9.92687 9.18336 9.52489 9.47974 9.22851C9.77612 8.93213 10.1781 8.76562 10.5972 8.76562C11.0164 8.76562 11.4184 8.93213 11.7147 9.22851C12.0111 9.52489 12.1776 9.92687 12.1776 10.346ZM16.9188 11.9264C17.3379 11.9264 17.7399 11.7599 18.0363 11.4635C18.3327 11.1671 18.4992 10.7652 18.4992 10.346C18.4992 9.92687 18.3327 9.52489 18.0363 9.22851C17.7399 8.93213 17.3379 8.76562 16.9188 8.76562C16.4996 8.76562 16.0977 8.93213 15.8013 9.22851C15.5049 9.52489 15.3384 9.92687 15.3384 10.346C15.3384 10.7652 15.5049 11.1671 15.8013 11.4635C16.0977 11.7599 16.4996 11.9264 16.9188 11.9264Z" fill="black" fillOpacity="0.88" />
                                                    </svg>
                                                </div> */}
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
                                            <p className="mb-3 text-left text-[16.7px] tracking-[-0.3px] text-[rgba(20,23,26,1)]">
                                                {post.post}
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
                                                                        <source src={item.mediaUrls[1].mediaUrl} type="video/mp4" />
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                </>

                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} </>) :
                <h1>{!loading && <>loadingNo Active Post</>}</h1>
            }
        </>
    );
};

export default PostCard;
