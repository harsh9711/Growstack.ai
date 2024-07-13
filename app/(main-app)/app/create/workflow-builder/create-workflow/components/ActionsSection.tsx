import React, { useEffect, useRef, useState } from 'react'
import AddInput from './layout/AddInput'
import Motion from '@/components/Motion'
import { InputIcon2 } from '@/components/svgs'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import clsx from 'clsx'
import { Input } from '@/components/ui/input'
import DotsLoader from '@/components/DotLoader'
import { IoIosArrowDropdown } from 'react-icons/io'
import { MenuIcon } from 'lucide-react'
const DropdownArrowIcon = () => (
    <svg
        className="h-5 w-5 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
        />
    </svg>
);
interface ActionsSectionProps {
    activeAction: any;
    setActiveAction: (params: any) => void;
    onSaveAction: (params: any) => void;
    isAPICalling: boolean;
    actions: any;
    inputConfigs: any;
}

type SuggestionOption = {
    type: string;
    name: string;
    label: string;
    icon: any;
    index: number;
    isExpanded: boolean;
    subOptions: SubOption[];
    show:boolean
};

type SubOption = {
    label: string;
    name: string;
    show:boolean
};

const ActionsSection = ({ actions, activeAction, setActiveAction, onSaveAction, isAPICalling, inputConfigs }: ActionsSectionProps) => {
    const [selectedOption, setSelectedOption] = useState(activeAction.preset_json.body.inputs[0].input_default_value);
    const [description, setDescription] = useState<string>(activeAction.preset_json.body.inputs[1].input_default_value);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestionOptions, setSuggestionOptions] = useState<SuggestionOption[]>([]);

    // Refs for the dropdown and textarea elements
    const dropdownRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Dropdown options for the first input
    const dropDownOptions: { label: string; value: string }[] = activeAction.preset_json.body.inputs[0].input_values.map((option: any) => ({ label: option, value: option }));
    const selectedOptionLabel = dropDownOptions.find((option) => option.value === selectedOption)?.label;

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
    }, [selectedOption]);

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
    }, [description]);

    // Set initial suggestion options
    useEffect(() => {
        setSuggestionOptions([
            {
                type: 'input',
                name: 'Input',
                label: 'Input',
                icon: <InputIcon2 />,
                isExpanded: false,
                index: 0,
                show:true,
                subOptions: inputConfigs.map((inputConfig: any) => ({
                    label: inputConfig.variable_name,
                    value: inputConfig._id,
                    name: inputConfig.variable_name,
                    show:true
                }))
            },
            ...actions.slice(0, activeAction.index).map((action: any, index: number) => ({
                type: 'output',
                name: action.name,
                label: action.name,
                index: index + 1,
                isExpanded: false,
                show:true,
                icon: <img src={action.icon} alt={action.name} width="24" height="24" className="flex-shrink-0 rounded-md object-contain min-h-[24px] min-w-[24px]" />,
                subOptions: [{
                    label: 'Output',
                    value: action.action_id,
                    name: `Step${index + 1}.output`,
                    show:true
                }]
            }))
        ]);
    }, []);

    // Handle clicking outside of the dropdown
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && textareaRef.current && !textareaRef.current.contains(event.target)) {
                setDropdownVisible(false);
                setSuggestionOptions((prevState) => prevState.map((option) => ({ ...option, isExpanded: false })));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTextareaFocus = () => setDropdownVisible(true);
    const handleSearchChange = (e: any) => setSearchQuery(e.target.value);

    const handleSubOptionClick = (subOption: SubOption) => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const newDescription = description.substring(0, startPos) + `{{${subOption.name}}}` + description.substring(endPos);
            setDescription(newDescription);
            setTimeout(() => {
                textarea.setSelectionRange(startPos + subOption.name.length + 4, startPos + subOption.name.length + 4);
                textarea.focus();
            }, 0);
        }
    };

    const toggleSuggestion = (index: number) => {
        setSuggestionOptions((prevState) => prevState.map((option, i) => {
            if (i === index) {
                return {
                    ...option,
                    isExpanded: !option.isExpanded
                };
            }
            return option;
        }));
    };

    useEffect(()=>{
        const query = searchQuery.trim().toLowerCase();
            setSuggestionOptions((prevState) => prevState.map((option) => {
                    return {
                        ...option,
                        show: option.subOptions.some((subOption) => subOption.label.toLowerCase().includes(query)),
                        subOptions: option.subOptions.map((subOption) => ({
                            ...subOption,
                            show: subOption.label.toLowerCase().includes(query)
                        }))
                    }
            }));
    },[searchQuery])

    return (
        <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <div className="flex items-center gap-4 pb-8">
                <div className="flex flex-row gap-2 p-6 items-start">
                    <img src={activeAction.icon} alt="openai-gpt" width="42" height="42" className="flex-shrink-0 rounded-md object-contain min-h-[42px] min-w-[42px]" />
                    <div className="flex flex-col gap-2 w-full">
                        <div className="relative flex items-center w-full rounded-md h-10">
                            {activeAction.name}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {activeAction.preset_json.body.inputs.map((option: any, index: number) => {
                    if (option.input_type === "DROPDOWN") {
                        return (
                            <React.Fragment key={index}>
                                <div className="font-medium mb-2 capitalize text-xl">{option.input_label}</div>
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
                          <div key={index} className='mt-8 '>
            <div className="font-medium  text-xl mb-2 capitalize">Instructions</div>
            <textarea
                ref={textareaRef}
                onFocus={handleTextareaFocus}
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what your image is about"
                className="h-[200px] w-full bg-[#F5F5F5] rounded-xl block resize-none p-4 text-[15px]"
            ></textarea>
            {isDropdownVisible && (
                <div className="dropdown border border-white shadow-md rounded-xl mt-2" ref={dropdownRef}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="p-2 border border-gray-300 rounded-md w-full mb-2"
                        placeholder="Search..."
                    />
                    {suggestionOptions.map((suggestion, index) => (
                        suggestion.show && (
                            <div key={index} className="mb-2">
                                <div
                                    className="flex w-full justify-between items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100"
                                    onClick={() => toggleSuggestion(index)}
                                >
                                 <div className='flex flex-row gap-x-2'> 
                                 <MenuIcon className='rounded-xl border border-x-white shadow-md'/> 
                                  <div className="flex items-center">
                                            {suggestion.icon}</div>
                                            <span>{suggestion.label}</span>
                                        </div>
                                          <div className="text-gray-400">
                                            <IoIosArrowDropdown className={`transform ${suggestion.isExpanded ? 'rotate-180 text-2xl' : 'text-2xl'}`} />
                                        </div>

                                   
                                </div>
                                {suggestion.isExpanded && suggestion.subOptions.map((subOption, subIndex) => (
                                    subOption.show && (
                                        <div
                                            key={subIndex}
                                            className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100 ml-8"
                                            onClick={() => handleSubOptionClick(subOption)}
                                        >
                                         <div className='flex flex-row gap-x-2'> <MenuIcon className='rounded-xl border border-x-white shadow-md'/>    <div>
                                                {subOption.label}</div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
                        );
                    }
                    return null;
                })}
            </div>
            <button
                className="flex items-center justify-center h-15 py-3.5 px-16 bg-primary-green sheen rounded-xl text-white mt-6 w-full text-center"
                disabled={isAPICalling}
                type="button"
                onClick={() => onSaveAction(activeAction)}
            >
                {isAPICalling ? <div className="flex items-center justify-center h-full"><DotsLoader /></div> : "Save"}
            </button>
        </Motion>
    );
};

export default ActionsSection;
