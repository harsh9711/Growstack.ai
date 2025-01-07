import { useAppSelector } from "@/lib/hooks";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const Accordion = ({
  onClick,
  nodeId,
}: {
  onClick: (key: string) => void;
  nodeId: string;
}) => {
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>(
    {}
  );
  const { nodes } = useAppSelector(state => state.nodes);
  const { masterNode } = useAppSelector(state => state.masterNode);

  const [testOne, setTest] = useState<any>({});

  function mapAndCreateObject(nodeId: string, nodes: any[], masterNode: any[]) {
    const result: Record<string, any> = {};
  
    function collectDependencies(currentNodeId: string) {
      const currentNode = nodes.find(node => node.id === currentNodeId);
      if (!currentNode) return;
  
      const dependencies = currentNode.data.dependencies || [];
      dependencies.forEach((depId: string) => {
        const dependentNode = nodes.find(node => node.id === depId);
        if (!dependentNode) return;
  
        const nodeMasterId = dependentNode.data.nodeMasterId;
        const masterNodeMatch = masterNode.find(
          node => node._id === nodeMasterId
        );
  
        if (masterNodeMatch) {
          const key =
            masterNodeMatch?.parameters?.variableName?.value ||
            masterNodeMatch.name ||
            "";
  
          result[key] = {
            [dependentNode?.data?.parameters?.variableName?.value]:
              masterNodeMatch?.sampleOutput || "",
          };
        }
  
        // Recursively collect dependencies of the dependent node
        collectDependencies(depId);
      });
    }
  
    // Start collecting dependencies for the given node ID
    collectDependencies(nodeId);
  
    setTest(result); // Final result with only dependent nodes' data
  }
  
  

  useEffect(() => {
    mapAndCreateObject(nodeId, nodes, masterNode); // Fetch data when the component is mounted
  }, [nodes, masterNode, nodeId]);

  // Handle the key click event
  const handleKeyClicked = (key: string) => {
    // Remove the leading dot, if it exists
    const cleanedKey = key.replace(/^\./, "");

    onClick(cleanedKey);
  };

  // Toggle expand/collapse for nested keys
  const toggleExpand = (key: string) => {
    setExpandedState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Render nested content recursively
  const renderNestedContent = (data: any, parentKey: string = "") => {
    if (Array.isArray(data)) {
      return data.slice(0, 1).map((item, index) => (
        <div key={`${parentKey}-${index}`} className="pl-4">
          {renderNestedContent(item, `${parentKey}-${index}`)}
        </div>
      ));
    } else if (typeof data === "object" && data !== null) {
      return Object.keys(data).map(key => {
        const value = data[key];
        const isExpandable = typeof value === "object" && value !== null;
        const fullKey = `${parentKey}.${key}`;

        return (
          <div key={fullKey} className="pl-4 my-4">
            {isExpandable ? (
              <>
                <div
                  className="flex justify-between py-2 cursor-pointer bg-[#DAEAF6] px-2 rounded-xl hover:bg-indigo-100"
                  onClick={() => toggleExpand(fullKey)}
                >
                  <span className="font-semibold">{key}</span>
                  {expandedState[fullKey] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedState[fullKey] && (
                  <div className="pl-4">
                    {renderNestedContent(value, fullKey)}
                  </div>
                )}
              </>
            ) : (
              <div>
                <span
                  className="font-semibold cursor-pointer bg-[#DAEAF6] px-4 py-1 rounded-xl"
                  onClick={() => handleKeyClicked(fullKey)}
                >
                  {key}
                </span>
              </div>
            )}
          </div>
        );
      });
    } else {
      return (
        <div className="pl-4">
          <span className="font-semibold">{parentKey.split("-").pop()}</span>
        </div>
      );
    }
  };

  return (
    <div className="node-inner-wrapper bg-white border-2 border-[#2DA771] rounded-[20px] w-[400px] transform -translate-x-1/2">
      <div className="w-96 mx-auto mt-10 p-2">
        {Object.keys(testOne).map(key => {
          const masterNodeMatch = masterNode.find(
            node =>
              node?.parameters?.variableName?.value === key ||
              node?.name === key
          );
          const description = masterNodeMatch?.description || "";
          const icon = masterNodeMatch?.logoUrl || "";
          const title = masterNodeMatch?.name || "";

          return (
            <div key={key} className="border-b border-gray-300">
              {/* Icon and description rendered at the top of each section */}
              <div
                className="p-2 cursor-pointer hover:bg-indigo-100 flex justify-between"
                onClick={() => toggleExpand(key)} // Toggle expansion on click
              >
                <div className="w-full flex  items-center">
                  {icon && (
                    <img src={icon} alt="icon" className="w-6 h-6 mr-2" />
                  )}
                  <div style={{display: "flex", flexDirection: "column"}}>
                    <strong>{title}</strong>
                    <strong>{description}</strong>
                  </div>
                </div>
                <span>
                  {expandedState[key] ? <ChevronUp /> : <ChevronDown />}
                </span>
              </div>

              {/* When expanded, render the nested content */}
              {expandedState[key] && (
                <div className="p-2 w-auto">
                  {renderNestedContent(testOne[key])}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
