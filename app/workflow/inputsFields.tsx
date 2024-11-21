import React from 'react';

interface Parameter {
    label: string;
    type: string;
    required: boolean;
    options: any[];
    description: string;
}

interface DynamicInputProps {
    param: Parameter;
    key: string;
    inputKey: string;
    visibleTooltip: { [key: string]: boolean };
    toggleTooltip: (key: string, isVisible: boolean) => void;
    handleInputChange: (key: string, type: string, value: string) => void;


}

const getTypeFromParam = (paramType: string): string => {
    return paramType.split('_')[0];
};

const InputFields = ({ param, inputKey, handleInputChange }: any) => {

    return (
        <div key={inputKey} className="input-box mb-3">
            <div className="label-box flex gap-2 items-center mb-1 relative">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}{' '}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>
                <span
                    // onMouseEnter={() => toggleTooltip(key, true)}
                    // onMouseLeave={() => toggleTooltip(key, false)}
                    className="cursor-pointer"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {/* {visibleTooltip[key] && (
                        <div className="absolute bottom-[80%] left-[140px] transform -translate-x-1/2 mb-2 w-max bg-white text-black text-xs p-2 rounded shadow-lg z-10">
                            {param.description}
                        </div>
                    )} */}
                </span>
            </div>
            <div className="input-group">
                <input
                    type={getTypeFromParam(param.type)}
                    value={param?.value || ""}
                    placeholder={`Enter ${param.label.toLowerCase()}`}
                    className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                    required={!!param.required}
                    onChange={(e) => handleInputChange(inputKey, param.type, e.target.value)}
                />
                {param?.error && <p className='ml-2 text-red-500 mt-1'>{param?.error}</p>}
            </div>
        </div>
    )
}

const BooleanField = ({ param, inputKey, handleInputChange }: any) => {
    return (
        <div key={inputKey} className="input-box flex items-center justify-between mb-3">
            <div className="label-box flex gap-2 items-center mb-1">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}
                </label>
                <span>
                    <img
                        src="/assets/node_icon/info-circle.png"
                        alt="info icon"
                        className="w-[16px] object-cover object-center mx-auto"
                    />
                </span>
            </div>
            <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type={getTypeFromParam(param.type)} className="sr-only peer" checked={!!param.value} onChange={(e) => handleInputChange(inputKey, param.type, e.target.checked)} />
                    <div className="w-11 h-6 bg-gray-300 shadow-md peer-focus:outline-none peer-focus:ring-2-none peer-focus:ring-none rounded-full peer-checked:bg-[#2DA771]"></div>
                    <div className="peer-checked:translate-x-5 absolute left-0 top-0 m-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </label>
            </div>
        </div>
    );
}

const DropDown = ({ param, inputKey }: any) => {
    console.log('DropDown', param);
    return (
        <div key={inputKey} className="input-box mb-3">
            <div className="label-box flex gap-2 items-center mb-1">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>
                <span>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </div>
            {/* <div className="input-group">
                <input
                    type="text"
                    placeholder={`Select the allowed ${param?.label.toLowerCase()} for upload`}
                    className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                />
            </div> */}

            <div className="input-group relative">
                <select
                    className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none appearance-none"
                    defaultValue=""
                    required={!!param.required}
                    value={param?.value || ""}
                >
                    <option value="" disabled>
                        {`Select the allowed ${param?.label.toLowerCase()} for upload`}
                    </option>
                    {param?.options && param.options.map((option: string, index: number) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </div>
        </div>
    );
}



const DynamicInput: React.FC<DynamicInputProps> = ({
    param,
    inputKey,
    visibleTooltip,
    toggleTooltip,
    handleInputChange,
}) => {

    // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     handleInputChange(inputKey, param.type, e.target.value);
    // };

    switch (param.type) {
        case 'text_input_level':
        case 'text_placeholder':
        case 'text_default_value':
        case 'text_description':
        case 'text_variable_name':
        case 'text_topic':
        case 'text_overview':
        case 'number':
            return (
                <InputFields param={param} inputKey={inputKey} handleInputChange={handleInputChange} />
            );
        case 'checkbox_required':
        case 'checkbox':
            return (
                <BooleanField param={param} inputKey={inputKey} handleInputChange={handleInputChange} />
            );
        case 'dropdown_file_type':
        case 'dropdown':
            return (
                <DropDown param={param} inputKey={inputKey} handleInputChange={handleInputChange} />
            );
        default:
            return null;
    }
};

export default DynamicInput;