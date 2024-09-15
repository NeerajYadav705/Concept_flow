"use client";

import React, { useMemo, useRef, useState } from "react";
import { RightSidebarProps } from "@/types/type";
import { bringElement, modifyShape } from "@/lib/shapes";
import Text from "./settings/Text";
import Color from "./settings/Color";
import Export from "./settings/Export";
import Dimensions from "./settings/Dimensions";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"; // Importing icons for toggling

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  // Memoize the content of the right sidebar to avoid re-rendering on every mouse action
  const memoizedContent = useMemo(
    () => (
      <section
        className={`flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 ${
          isCollapsed ? "w-16" : "w-56" // Adjust width based on collapsed state
        } h-full sticky right-0 transition-all duration-300 overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-2">
          <h3
            className={`text-xs uppercase ${isCollapsed ? "text-center" : ""}`}
          >
            {isCollapsed ? "" : "Design"}
          </h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary-grey-300 hover:text-primary-green"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <HiChevronRight /> : <HiChevronLeft />}
          </button>
        </div>
        <span
          className={`text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4 ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          Make changes to canvas as you like
        </span>

        {!isCollapsed && (
          <>
            <Dimensions
              isEditingRef={isEditingRef}
              width={elementAttributes.width}
              height={elementAttributes.height}
              handleInputChange={handleInputChange}
            />

            <Text
              fontFamily={elementAttributes.fontFamily}
              fontSize={elementAttributes.fontSize}
              fontWeight={elementAttributes.fontWeight}
              handleInputChange={handleInputChange}
            />

            <Color
              inputRef={colorInputRef}
              attribute={elementAttributes.fill}
              placeholder="color"
              attributeType="fill"
              handleInputChange={handleInputChange}
            />

            <Color
              inputRef={strokeInputRef}
              attribute={elementAttributes.stroke}
              placeholder="stroke"
              attributeType="stroke"
              handleInputChange={handleInputChange}
            />

            <Export />
          </>
        )}
      </section>
    ),
    [elementAttributes, isCollapsed]
  ); // Only re-render when elementAttributes or isCollapsed changes

  return memoizedContent;
};

export default RightSidebar;
