import { create } from "zustand";
import { featureCategoryData, featureItems } from "./data";

const defaultCategory = featureCategoryData[0];
const defaultSelectedItems = featureItems.filter(
  item => item.categoryId === defaultCategory.id
);

interface Icon {
  path: string;
  alt: string;
}

interface Color {
  from: string;
  to: string;
}

interface DraggedItemInterface {
  id: number;
  parentId: number;
  title: string;
  icon: Icon;
  color: Color;
  cordinate: string;
  children: ChildInterface[];
}

interface ChildInterface {
  title: string;
  icon: Icon;
  cordinate: string;
}

interface CategoryInterface {
  id: number;
  title: string;
}

interface DragableState {
  activeCategory: CategoryInterface;
  setActiveCategory: (category: CategoryInterface) => void;
  selectedItems: any[];
  setSelectedItems: (items: any[]) => void;
  draggedItem: any | null;
  setDraggedItem: (item: any) => void;
  step: number;
  setStep: (step: number) => void;
  navItems: Array<any>;
  setNavItems: (payload: any[]) => void;
  animate: boolean;
  setAnimate: (payload: boolean) => void;
  isDraggingOverDropZone: boolean;
  setIisDraggingOverDropZone: (payload: boolean) => void;
}

export const useDragableFeatures = create<DragableState>(set => ({
  activeCategory: defaultCategory,
  setActiveCategory: category => set({ activeCategory: category }),
  selectedItems: defaultSelectedItems,
  setSelectedItems: items => set({ selectedItems: items }),
  draggedItem: null,
  setDraggedItem: (item: any) => set({ draggedItem: item }),
  step: 0,
  setStep: step => set({ step }),
  navItems: defaultSelectedItems,
  setNavItems: items => set({ navItems: items }),
  animate: false,
  setAnimate: (payload: boolean) => set({ animate: payload }),
  isDraggingOverDropZone: false,
  setIisDraggingOverDropZone: (payload: boolean) =>
    set({ isDraggingOverDropZone: payload }),
}));
