import React, { useEffect, useState } from 'react'
import AddInput from './layout/AddInput'
import Motion from '@/components/Motion'
import { InputIcon2 } from '@/components/svgs'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import clsx from 'clsx'
import { Input } from '@/components/ui/input'
import { set } from 'react-hook-form'
import DotsLoader from '@/components/DotLoader'

interface ActionsSectionProps {
    activeAction: any;
    setActiveAction:(params:any)=>void;
    onSaveAction :(params:any)=>void;
    isAPICalling:boolean;
}

const ActionsSection = ({ activeAction, setActiveAction, onSaveAction, isAPICalling }: ActionsSectionProps) => {
    const dropDownOptions: { label: string; value: string }[] = activeAction.preset_json.body.inputs[0].input_values.map((option: any) => ({ label: option, value: option }));
    const [selectedOption, setSelectedOption] = useState(activeAction.preset_json.body.inputs[0].input_default_value);
    const selectedOptionLabel = dropDownOptions.find((option) => option.value === selectedOption)?.label;

    const [description, setDescription] = useState<string>(activeAction.preset_json.body.inputs[1].input_default_value);

    useEffect(() => {
        setActiveAction((prevState: any) => ({
            ...prevState,
            preset_json: {
                ...prevState.preset_json,
                body: {
                    ...prevState.preset_json.body,
                    inputs: prevState.preset_json.body.inputs.map((input: any) => {
                        if (input.input_type === "DROPDOWN") {
                            return {
                                ...input,
                                input_default_value: selectedOptionLabel
                            };
                        }
                        return input;
                    })
                }
            }
        }));
    },[selectedOption])

    useEffect(() => {
        setActiveAction((prevState: any) => ({
            ...prevState,
            preset_json: {
                ...prevState.preset_json,
                body: {
                    ...prevState.preset_json.body,
                    inputs: prevState.preset_json.body.inputs.map((input: any) => {
                        if (input.input_type === "TEXT_AREA") {
                            return {
                                ...input,
                                input_default_value: description
                            };
                        }
                        return input;
                    })
                }
            }
        }));
    }, [description])

    return (
        <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <div className="flex items-center gap-4 pb-8">
                <div className="flex flex-row gap-2 p-6 items-start ">
                    <img src={activeAction.icon} alt="openai-gpt" width="42" height="42" className="flex-shrink-0 rounded-md object-contain min-h-[42px] min-w-[42px] " />
                    <div className="flex flex-col gap-2 w-full">
                        <div className="relative flex items-center w-full rounded-md h-10">
                            {activeAction.name}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    activeAction.preset_json.body.inputs.map((option: any, index: number) => {
                        if (option.input_type === "DROPDOWN") {
                            return (
                                <React.Fragment key={index}>
                                    <div className="font-bold text-xl">{option.input_label}</div>
                                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                                        <SelectTrigger className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
                                            <SelectValue placeholder="Select an option">
                                                {selectedOptionLabel && (
                                                    <div className="flex items-center gap-2">{selectedOptionLabel}</div>
                                                )}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {dropDownOptions.map(({ label, value }: { label: string, value: string }) => (
                                                    <SelectItem key={value} value={value}>
                                                        <div
                                                            className={clsx(
                                                                "flex items-center gap-2",
                                                                selectedOption === value && "text-primary-green font-medium"
                                                            )}
                                                        >
                                                            {label}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </React.Fragment>
                            );
                        }

                        if (option.input_type === "TEXT_AREA") {
                            return (
                                <div key={index}>
                                    <div className="font-bold text-xl">Instructions</div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={activeAction.preset_json.body.inputs[1].input_default_value}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe what your image is about"
                                        className="h-[200px] w-full bg-[#F5F5F5] rounded-xl block resize-none p-4 text-[15px]"
                                    ></textarea>
                                </div>
                            );
                        }

                        return null;
                    })
                }
            </div>
            <button
                className='flex items-center justify-center h-15 py-3.5 px-16 bg-primary-green sheen rounded-xl text-white mt-6 w-full text-center'
                disabled={isAPICalling}
                type='button'
                onClick={() => onSaveAction(activeAction)}
            >
                {isAPICalling ? <div className='flex items-center justify-center h-full'><DotsLoader /></div> : "Save"}
            </button>
        </Motion>
    )
}


export default ActionsSection