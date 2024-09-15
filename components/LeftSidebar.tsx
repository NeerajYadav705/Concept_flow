"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { getShapeInfo } from "@/lib/utils";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"; // Importing icons for toggling

const LeftSidebar = ({ allShapes }: { allShapes: Array<any> }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const memoizedShapes = useMemo(
    () => (
      <section
        className={`flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 ${
          isCollapsed ? "w-16" : "w-56" // Adjust widths for collapsed and expanded states
        } h-full transition-all duration-300 overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-2">
          <h3
            className={`text-xs uppercase ${isCollapsed ? "text-center" : ""}`}
          >
            {isCollapsed ? "" : "Layers"}
          </h3>
          <button
            onClick={toggleSidebar}
            className="text-primary-grey-300 hover:text-primary-green"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <HiChevronRight /> : <HiChevronLeft />}
          </button>
        </div>
        <div className="flex flex-col mt-2">
          {allShapes?.map((shape: any) => {
            const info = getShapeInfo(shape[1]?.type);

            return (
              <div
                key={shape[1]?.objectId}
                className={`group my-1 flex items-center gap-2 ${
                  isCollapsed ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm"
                } hover:cursor-pointer hover:bg-primary-green hover:text-primary-black`}
              >
                <Image
                  src={info?.icon}
                  alt='Layer'
                  width={isCollapsed ? 12 : 16}
                  height={isCollapsed ? 12 : 16}
                  className='group-hover:invert'
                />
                {!isCollapsed && <h3 className='font-semibold capitalize'>{info.name}</h3>}
              </div>
            );
          })}
        </div>
      </section>
    ),
    [allShapes?.length, isCollapsed]
  );

  return memoizedShapes;
};

export default LeftSidebar;
