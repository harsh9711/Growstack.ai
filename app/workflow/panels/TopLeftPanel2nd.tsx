import React from "react";
import Image from "next/image";
import { dummyData1 } from "../data";
import { CategoriesTypes } from "@/types/workflows";
import LllmsCategory from "./components/LlmsCategory";
import GeneralCategory from "./components/GeneralCategory";
import AiTemplatesCategory from "./components/AiTemplatesCategory";
import AiAssistanceCategory from "./components/AiAssistanceCategory";
import IntegrationCategory from "./components/IntegrationCategory";
import ToolsCategory from "./components/ToolsCategory";

const TopLeftPanel2nd = ({ setNodes }: any): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = React.useState<
    CategoriesTypes | boolean
  >(false);

  const handleCategoryClick = (cat: CategoriesTypes) => {
    if (selectedCategory === cat) {
      setSelectedCategory(false);
      return;
    }
    setSelectedCategory(cat);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Categories */}
      {dummyData1.map((item, index) => (
        <div
          key={index.toString()}
          className="h-[85px] w-[85px] p-[5px] bg-transparent rounded-[11px] flex justify-center items-center cursor-pointer"
          style={{
            border: `1.20px solid ${
              item.category === selectedCategory
                ? item.color.content
                : "#ffffff"
            }`,
          }}
          onClick={() => handleCategoryClick(item.category as CategoriesTypes)}
        >
          <div
            className="h-full w-full rounded-[10px] flex justify-center items-center flex-col"
            style={{
              backgroundColor: item.color.bg,
              boxShadow: `${item.category === selectedCategory ? item.color.boxShadow: ""}`,
            }}
            
          >
            <Image
              src={item.icon.src}
              alt={item.icon.alt}
              width={item.icon.width}
              height={item.icon.height}
              draggable={false}
            />
            <p
              className="text-[9px] font-normal mt-1.5 text-center"
              style={{ color: item.color.content }}
            >
              {item.title}
            </p>
          </div>
        </div>
      ))}

      {/* Subcategories*/}

      {selectedCategory && selectedCategory === "llms" && (
        <LllmsCategory setNodes={setNodes} />
      )}

      {selectedCategory && selectedCategory === "general" && (
        <GeneralCategory setNodes={setNodes} />
      )}

      {selectedCategory && selectedCategory === "ai-templates" && (
        <AiTemplatesCategory setNodes={setNodes} />
      )}

      {selectedCategory && selectedCategory === "ai-assistant" && (
        <AiAssistanceCategory setNodes={setNodes} />
      )}

      {selectedCategory && selectedCategory === "integrations" && (
        <IntegrationCategory setNodes={setNodes} />
      )}
      {selectedCategory && selectedCategory === "tools" && (
        <ToolsCategory setNodes={setNodes} />
      )}
    </div>
    
  );
};

export default TopLeftPanel2nd;
