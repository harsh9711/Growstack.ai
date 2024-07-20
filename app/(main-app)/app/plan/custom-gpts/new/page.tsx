'use client';

import axios from '@/config/axios.config';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Topbar from './components/Topbar';
import ChatSection from './components/ChatSection';
import Sidebar from './components/Sidebar';
import Sidebargpt from './components/Sidebar';
import { Assistant } from '@/types/assistants';
import { Conversation } from '../../ai-assistant/components/types';
import Sidebargpt1 from './components/Sidebar1';
import Downbar from './components/Downbar';
import { API_URL } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    assistant_id: string;
  };
}
type CustomFile = File & { id?: string; name?: string };

type ToolResources = {
  code_interpreter?: {
    file_ids?: string[];
  };
  file_search?: {
    vector_store_ids?: string[];
  };
};

type ConversationPayLoad = {
  name: string;
  description: string;
  instruction: string;
  tools?: { type?: string }[];
  tool_resources?: ToolResources;
  conversation_starter?: string[];
  capabilities?: string[];
  icon?: string;
};

const AssistantsChats: React.FC<PageProps> = ({ params: { assistant_id } }: PageProps) => {
  const [assistantData, setAssistantData] = useState<Assistant | null>(null);
  const [assistantConversation, setAssistantConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAPICalled, setIsAPICalled] = useState<boolean>(false);
  const router = useRouter();

  // states for sidebar
  const [conversationStarters, setConversationStarters] = useState<string[]>(['']);
  const [isToggleCheckedForSearch, setIsToggleCheckedForSearch] = useState(false);
  const [isToggleCheckedForInterpreter, setIsToggleCheckedForInterpreter] = useState(false);
  const [vectorStoreId, setVectorStoreId] = useState<string | null>(null);
  const [uploadedIntepreterFiles, setUploadedIntepreterFiles] = useState<CustomFile[]>([]);
  const [uploadedSerachFiles, setUploadedSerachFiles] = useState<CustomFile[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [capabilities, setCapabilities] = useState<{ IMAGE: boolean; WEB_BROWSING: boolean }>({
    IMAGE: false,
    WEB_BROWSING: false,
  });
  const [iconImage, setIconImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructions: '',
  });

  const handleCreateConversation = async () => {
    try {
      if (!iconImage) {
        toast.error('Please upload an icon image');
        return;
      } else if (!formData.name) {
        toast.error('Please enter the name');
        return;
      } else if (!formData.description) {
        toast.error('Please enter the description');
        return;
      } else if (!formData.instructions) {
        toast.error('Please enter the instructions');
        return;
      }
      setIsAPICalled(true);
      let payload: ConversationPayLoad = {
        name: formData.name,
        description: formData.description,
        instruction: formData.instructions,
        icon: iconImage,
      };
      let tools = [],
        tool_resources: ToolResources = {},
        cap = [];
      if (isToggleCheckedForSearch) {
        tools.push({ type: 'file_search' });
        if (vectorStoreId) {
          tool_resources.file_search = { vector_store_ids: [vectorStoreId] };
        }
      }
      if (isToggleCheckedForInterpreter) {
        tools.push({ type: 'code_interpreter' });
        if (uploadedIntepreterFiles.length > 0) {
          tool_resources.code_interpreter = {
            file_ids: uploadedIntepreterFiles.map((file) => file.id ?? ''),
          };
        }
      }
      if (tools.length) {
        payload.tools = tools;
      }
      if (Object.keys(tool_resources).length) {
        payload.tool_resources = tool_resources;
      }
      if (
        conversationStarters.length > 1 ||
        (conversationStarters.length === 1 && conversationStarters[0] !== '')
      ) {
        payload.conversation_starter = conversationStarters.filter((starter) => starter !== '');
      }
      if (capabilities.IMAGE || capabilities.WEB_BROWSING) {
        if (capabilities.IMAGE) {
          cap.push('IMAGE');
        }
        if (capabilities.WEB_BROWSING) {
          cap.push('WEB_BROWSING');
        }
        payload.capabilities = cap;
      }
      const {
        data: {
          data: {
            customGptConvo: { custom_gpt_id },
          },
        },
      } = await axios.post(`${API_URL}/ai/api/v1/customgpt/create`, { ...payload });
      setIsAPICalled(false);
      toast.success('Conversation created successfully');
      router.push(`/app/plan/custom-gpts/gpt/?custom_gpt_id=${custom_gpt_id}`);
    } catch (error: any) {
      toast.error('Failed to create conversation');
      console.error(error);
      setIsAPICalled(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      <div className="flex flex-col h-full !bg-gray-100 shadow-box mt-8 border">
        <Topbar
          handleCreateConversation={handleCreateConversation}
          isAPICalled={isAPICalled}
          from="CREATE"
        />
        <div className="h-full">
          <Sidebargpt
            conversationStarters={conversationStarters}
            isToggleCheckedForSearch={isToggleCheckedForSearch}
            isToggleCheckedForInterpreter={isToggleCheckedForInterpreter}
            vectorStoreId={vectorStoreId}
            uploadedIntepreterFiles={uploadedIntepreterFiles}
            formData={formData}
            setConversationStarters={setConversationStarters}
            setIsToggleCheckedForSearch={setIsToggleCheckedForSearch}
            setIsToggleCheckedForInterpreter={setIsToggleCheckedForInterpreter}
            setVectorStoreId={setVectorStoreId}
            setUploadedIntepreterFiles={setUploadedIntepreterFiles}
            setFormData={setFormData}
            uploadedSerachFiles={uploadedSerachFiles}
            setUploadedSerachFiles={setUploadedSerachFiles}
            isSearchModalOpen={isSearchModalOpen}
            setIsSearchModalOpen={setIsSearchModalOpen}
            capabilities={capabilities}
            setCapabilities={setCapabilities}
            iconImage={iconImage}
            setIconImage={setIconImage}
          />
        </div>
        <Downbar />
      </div>
    </div>
  );
};

export default AssistantsChats;
