"use client";

// components/WorkFlowBuilderComponent.tsx
import { InputIcon2, OutputIcon2 } from "@/components/svgs";
import clsx from "clsx";
import { MoreVertical, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";
import ActionsSection from "./ActionsSection";
import ProvidersDrawer from "./ProvidersDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import { tools } from "./data/tools";
import { InputType } from "@/types/common";

export default function WorkFlowBuilderComponent() {
  const [activeTag, setActiveTag] = useState<"Input" | "Output" | "Actions">(
    "Input"
  );
  const [openProvidersDrawer, setOpenProvidersDrawer] = useState(false);
  const [activeAction, setActiveAction] = useState<any>({});
  const [actions, setActions] = useState<any[]>([]);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [isAPICalling, setIsAPICalling] = useState(false);
  const [inputConfigs, setInputConfigs] = useState<any[]>([]);
  const [outputConfigs, setOutputConfigs] = useState<any[]>([]);

  interface Input {
    input_label: string;
    input_default_value: any; 
    is_prompt: boolean;
    prompt?: string;
  }
  
  const handleAddStep = () => {};

  const postAction = async (action: any, index: any) => {
    try {
      return instance.post(
        `${API_URL}/workflow/api/v1/${workflowId}/actions?indexOfAction=${index}`,
        action
      );
    } catch (error) {
      throw error;
    }
  };

  const onSaveAction = async (action: any) => {
    setIsAPICalling(true);
    
    try {
      const payload = {
        preset_json: {
          body: action.preset_json.body,
        },
        event_execute: action.event_execute,
      };

      const {
        data: {
          data: { updateAction },
        },
      } = await instance.put(
        `${API_URL}/workflow/api/v1/${workflowId}/actions/${action.action_id}`,
        payload
      );

      setActions((prevActions) =>
        prevActions.map((act) =>
          act.action_id === action.action_id
            ? {
                ...updateAction,
                icon: action.icon,
                preset_json: action.preset_json,
              }
            : act
        )
      );
      setIsAPICalling(false);
      toast.success("Action saved successfully");
    } catch (error) {
      console.error("Failed to save action:", error);
      toast.error("Failed to save action");
      setIsAPICalling(false);
    }
  };
  
  
  interface PresetJsonBodyType {
    inputs: InputType[];
  }
  
  interface PresetJsonType {
    body: {
      inputs: InputType[];
    };
  }
  interface Tool {
  name: string;
  icon: string;
  preset_json: PresetJsonType;
}
type ActionType = {
  name: string;
  icon?: string;
  preset_json: {
    body: InputType[];
  };
};

type ToolType = {
  name: string;
  icon?: string;
  preset_json?: {
    body: {
      inputs: InputType[];
    };
  };
};


  
const mapActionInputs = (actions: ActionType[], tools: ToolType[]) => {
  return actions.map((action: ActionType) => {
    const tool = tools.find((tool) => tool.name === action.name);

    if (!tool || !tool.preset_json) {
      return action;
    }

    return {
      ...action, 
      icon: tool.icon,
      preset_json: {
        ...tool.preset_json,
        body: tool.preset_json.body,
      },
    };
  });
};


const getWorkFlowDetails = async (id: string | number) => {
  try {
    const {
      data: {
        data: { input_configs, actions, output_configs },
      },
    } = await instance.get(`${API_URL}/workflow/api/v1/${id}`);
    setActions(mapActionInputs(actions, tools as unknown as ToolType[]));
    setInputConfigs(input_configs);
    setOutputConfigs(output_configs);
  } catch (error) {
    toast.error("Failed to fetch workflow details");
  }
};

  
  const deleteAction = async (actionId: string, index: number) => {
    try {
      await instance.delete(
        `${API_URL}/workflow/api/v1/${workflowId}/actions/${actionId}`
      );
      setActions(actions.filter((action) => action._id !== actionId));
      if (index === 0) {
        setActiveTag("Input");
        setActiveAction({});
      } else {
        setActiveAction(actions[index - 1]);
        setActiveTag("Actions");
      }
      toast.success("Action deleted successfully");
    } catch (error) {
      toast.error("Failed to delete action");
    }
  };

  const reorderActions = async (actionId: string, direction: string) => {
    try {
      await instance.put(
        `${API_URL}/workflow/api/v1/${workflowId}/actions/${actionId}/reorder?direction=${direction}`
      );
      setActions((prevActions) => {
        const actionIndex = prevActions.findIndex(
          (action) => action._id === actionId
        );
        const action = prevActions[actionIndex];
        const updatedActions = [...prevActions];
        updatedActions.splice(actionIndex, 1);
        if (direction === "up") {
          updatedActions.splice(actionIndex - 1, 0, action);
        } else {
          updatedActions.splice(actionIndex + 1, 0, action);
        }
        return updatedActions;
      });
      toast.success("Action reordered successfully");
    } catch (error) {
      toast.error("Failed to reorder action");
    }
  };

  const onSelectAction = async (action: any, index: number) => {
    let updatedActions: any[] = [];
    const payload = {
      name: action.name,
      description: action.description,
      provider: action.provider,
      subtype: action.subtype,
      preset_id: action.id,
      preset_json: {
        body: action.preset_json.body,
      },
      category: action.category,
      event_execute: action.event_execute,
    };
    try {
      const response = await postAction(payload, index);
      toast.success("Action added successfully");
      const newAction = {
        ...response.data.data.newAction,
        index: index - 1,
        preset_json: action.preset_json,
        icon: action.icon,
      };

      if (index === 1) {
        updatedActions = [newAction, ...actions];
      } else {
        updatedActions = [
          ...actions.slice(0, index - 1),
          newAction,
          ...actions.slice(index - 1),
        ];
      }

      setActions(updatedActions);
      setActiveAction({
        ...action,
        action_id: newAction.action_id,
        index: index - 1,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add action");
    }
  };
  const handleSaveAction = (changedFields: any) => {
    setIsAPICalling(true);
   const updatedAction = { ...activeAction, preset_json: { ...activeAction.preset_json, body: { ...activeAction.preset_json.body, ...changedFields } } };
    
    setTimeout(() => {
      setActions((prevActions) =>
        prevActions.map((action) => (action.id === activeAction.id ? updatedAction : action))
      );
      setActiveAction(updatedAction);
      setIsAPICalling(false);
    }, 1000);
  };
  const renderSection = () => {
    switch (activeTag) {
      case "Input":
        return (
          <InputSection
            inputConfig={inputConfigs}
            setInputConfigs={setInputConfigs}
            onSelectAction={onSelectAction}
          />
        );
      case "Output":
        return (
          <OutputSection
            outputConfigs={outputConfigs}
            setOutputConfigs={setOutputConfigs}
            actions={actions}
            inputConfigs={inputConfigs}
            workflowId={workflowId}
          />
        );
      case "Actions":
        return (
          <ActionsSection
            key={activeAction.action_id}
            activeAction={activeAction}
            setActiveAction={setActiveAction}
            onSaveAction={onSaveAction}
            isAPICalling={isAPICalling}
            actions={actions}
            inputConfigs={inputConfigs} workflowId={""} actionId={""}        />
        );
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
      getWorkFlowDetails(id);
    }
  }, [window.location.search]);

  return (
    <>
      <div className="flex-1 flex flex-col md:flex-row bg-white rounded-3xl mt-6">
        {/* Left section - Workflow steps */}
        <div className="flex-1 p-5 flex flex-col justify-center items-center gap-10">
          <button
            onClick={() => setActiveTag("Input")}
            className={clsx(
              "w-full max-w-[340px] transition-all duration-300 p-3 border border-[#E5E7EB] rounded-xl flex items-center gap-4 cursor-pointer",
              activeTag === "Input" && "!border-primary-green"
            )}
          >
            <div className="bg-primary-green p-4 rounded-lg">
              <InputIcon2 className="text-white" />
            </div>
            <div className="space-y-1 flex flex-col items-start">
              <h3 className="text-[17px] font-medium">Input</h3>
              <p className="text-sm text-primary-black text-opacity-50">
                Click to add inputs
              </p>
            </div>
          </button>

          {actions.map((action, index) => (
            <>
              {index === 0 && (
                <ProvidersDrawer
                  trigger={<Plus size={16} onClick={() => handleAddStep()} />}
                  onSelectAction={(data) => onSelectAction(data, index + 1)}
                />
              )}
              <button
                key={index}
                onClick={() => {
                  setActiveTag("Actions");
                  setActiveAction({ ...action, index });
                }}
                className={clsx(
                  "w-full max-w-[340px] transition-all duration-300 p-3 border border-[#E5E7EB] rounded-xl flex items-center gap-4 cursor-pointer",
                  index === activeAction.index &&
                    activeTag === "Actions" &&
                    "!border-primary-green"
                )}
              >
                {action?.icon ? (
                  <div className="">
                    <img
                      src={action.icon}
                      alt=""
                      className="w-10 h-10 rounded-2xl"
                    />
                  </div>
                ) : (
                  <div className="bg-primary-green p-4 rounded-lg">
                    <InputIcon2 className="text-white" />
                  </div>
                )}
                <div className="space-y-1 flex flex-col items-start">
                  <h3 className="text-[17px] font-medium">{action.name}</h3>
                  <p className="text-sm text-primary-black text-opacity-50">
                    Step {index + 1}{" "}
                    <span className="font-semibold text-black">
                      {action.subtype}
                    </span>
                  </p>
                </div>
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="px-2 hover:bg-gray-100 h-10 w-10 rounded-full">
                        <MoreVertical size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        inset
                        className="min-w-[200px] flex justify-between gap-8 items-center my-1"
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteAction(action._id, index);
                        }}
                      >
                        <div className="flex gap-3">
                          <h2>Delete</h2>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        inset
                        className="min-w-[200px] flex justify-between gap-8 items-center my-1"
                        disabled={index === 0}
                        onClick={(event) => {
                          event.stopPropagation(),
                            reorderActions(action._id, "up");
                        }}
                      >
                        <div className="flex gap-3">
                          <h2>Move Up</h2>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        inset
                        className="min-w-[200px] flex justify-between gap-8 items-center my-1"
                        disabled={index === actions.length - 1}
                        onClick={(event) => {
                          event.stopPropagation(),
                            reorderActions(action._id, "down");
                        }}
                      >
                        <div className="flex gap-3">
                          <h2>Move Down</h2>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </button>
              <ProvidersDrawer
                trigger={<Plus size={16} onClick={() => handleAddStep()} />}
                onSelectAction={(data) => onSelectAction(data, index + 2)}
              />
            </>
          ))}

          {actions.length === 0 && (
            <ProvidersDrawer
              trigger={
                <button className="w-full max-w-[340px] px-4 py-6 font-medium bg-[#F5F5F5] rounded-xl flex justify-center items-center gap-2">
                  Add Step <Plus size={16} />
                </button>
              }
              onSelectAction={(data) => onSelectAction(data, 1)}
            />
          )}

          <button
            onClick={() => setActiveTag("Output")}
            className={clsx(
              "w-full max-w-[340px] transition-all duration-300 p-3 border border-[#E5E7EB] rounded-xl flex items-center gap-4 cursor-pointer",
              activeTag === "Output" && "!border-primary-green"
            )}
          >
            <div className="bg-primary-green p-4 rounded-lg">
              <OutputIcon2 className="text-white" />
            </div>
            <div className="space-y-1 flex flex-col items-start">
              <h3 className="text-[17px] font-medium">Output</h3>
              <p className="text-sm text-primary-black text-opacity-50">
                Click to add outputs
              </p>
            </div>
          </button>
        </div>

        <div className="border-l border-[#F0F0F0] w-full max-w-[482px] md:w-1/3 p-10 flex flex-col">
          {renderSection()}
        </div>
      </div>
    </>
  );
}
