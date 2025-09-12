import React from "react";

export type LayoutTemplate =
  | "coffee-shop"
  | "restaurant"
  | "modern"
  | "fast-food";

export type LayoutTemplateSelectorProps = {
  selectedLayout: LayoutTemplate;
  onLayoutChange: (layout: LayoutTemplate) => void;
  showAnimations: boolean;
  onAnimationToggle: (enabled: boolean) => void;
};

export const LayoutTemplateSelector: React.FC<LayoutTemplateSelectorProps> = ({
  selectedLayout,
  onLayoutChange,
  showAnimations,
  onAnimationToggle,
}) => {
  const templates = [
    {
      id: "coffee-shop" as LayoutTemplate,
      name: "Coffee Shop",
      description: "Clean, professional layout perfect for cafés",
      preview: "bg-gradient-to-br from-slate-100 to-blue-200",
      textColor: "text-slate-700",
    },
    {
      id: "restaurant" as LayoutTemplate,
      name: "Fine Dining",
      description: "Elegant dark theme for upscale restaurants",
      preview: "bg-gradient-to-br from-gray-900 to-gray-700",
      textColor: "text-white",
    },
    {
      id: "modern" as LayoutTemplate,
      name: "Modern",
      description: "Contemporary gradient design",
      preview: "bg-gradient-to-r from-blue-500 to-purple-600",
      textColor: "text-white",
    },
    {
      id: "fast-food" as LayoutTemplate,
      name: "Fast Food",
      description: "Vibrant, energetic design for quick service",
      preview: "bg-gradient-to-br from-red-400 to-yellow-400",
      textColor: "text-gray-800",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Layout Templates</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {templates.map(template => (
          <div
            key={template.id}
            onClick={() => onLayoutChange(template.id)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              selectedLayout === template.id
                ? "border-blue-500 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`h-24 ${template.preview} ${template.textColor} flex items-center justify-center`}
            >
              <div className="text-sm font-medium">{template.name}</div>
            </div>
            <div className="p-3">
              <div className="text-sm text-gray-600">
                {template.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Enable Animations
            </label>
            <p className="text-xs text-gray-500">
              Add smooth transitions and effects
            </p>
          </div>
          <button
            onClick={() => onAnimationToggle(!showAnimations)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showAnimations ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showAnimations ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
