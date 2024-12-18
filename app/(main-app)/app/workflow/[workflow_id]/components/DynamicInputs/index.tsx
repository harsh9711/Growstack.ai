import React from "react";
import { DynamicInputProps } from "@/types/workflows";
import InputFields from "./InputFields";
import BooleanField from "./BooleanField";
import DropDown from "./DropDown";
import SelectOption from "./SelectOption";
import CheckboxField from "./CheckboxField";
import TextAreaField from "./TextAreaField";
import RangeSlider from "./RangeSlider";
import UploadButton from "./UploadButton";
import MultiSelectDropdown from "./MultiSelectDropdown";
import OutputField from "./OutputField";
import SmallCardFiled from "./SmallCard";
import AdvanceDropDown from "./AdvanceDropDown";
import VariableInputFields from "./VariableInputFiels";
import MultiSelectCheckbox from "./MultiSelectCheckbox";

const DynamicInput: React.FC<DynamicInputProps> = ({
    param,
    inputKey,
    variableNames,
    handleInputChange,
    focusedInputKey,
    setFocusedInputKey,
}) => {
    switch (param.type) {
        case "text_input_label":
        case "text_placeholder":
        case "text_default_value":
        case "text_description":
        // case "text_variable_name":
        // case "text_variable_name2":
        case "text_topic":
        case "text_overview":
        case "number":
        case "text":
            return (
                <InputFields
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                    variableNames={variableNames}
                    focusedInputKey={focusedInputKey}
                    setFocusedInputKey={setFocusedInputKey}
                />
            );
        case "text_variable_name":
        case "text_variable_name2":
            return (
                <VariableInputFields
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                    variableNames={variableNames}
                    focusedInputKey={focusedInputKey}
                    setFocusedInputKey={setFocusedInputKey}
                />
            );
        case "checkbox_show_preview":
        case "checkbox_required":
        case "switch":
            return (
                <BooleanField
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "dropdown_file_type":
        case "dropdown_model_selection":
        case "dropdownn_model":
        case "dropdown_quality":
        case "dropdown_options":
        case "dropdown":
            return (
                <DropDown
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "select_option":
            return (
                <SelectOption
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "checkbox_field":
            return (
                <CheckboxField
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={() => { }}
                />
            );
        case "text_area":
        case "textarea_system_prompt":
        case "textarea_input_prompt":
        case "textarea_prompt":
        case "textarea":
            return (
                <TextAreaField
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                    variableNames={variableNames}
                    focusedInputKey={focusedInputKey}
                    setFocusedInputKey={setFocusedInputKey}
                />
            );
        case "slider":
        case "slider_creativity_level":
        case "number_slider":
            return (
                <RangeSlider
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "button_upload":
            return (
                <UploadButton
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "multiselect_dropdown":
            return (
                <MultiSelectDropdown
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "type_output":
        case "outputs":
            return (
                <OutputField
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "small_card":
        case "avatars":
            return (
                <SmallCardFiled
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "advance_dropdown":
            return (
                <AdvanceDropDown
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        case "multiselect_checkbox":
            return (
                <MultiSelectCheckbox
                    param={param}
                    inputKey={inputKey}
                    handleInputChange={handleInputChange}
                />
            );
        default:
            return null;
    }
};

export default DynamicInput;
