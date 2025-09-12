import React from "react";

import { LayoutTemplate } from "./LayoutTemplateSelector";

export type LayoutSelectionStepProps = {
  selectedLayout: LayoutTemplate | null;
  onLayoutSelect: (layout: LayoutTemplate) => void;
  onNext: () => void;
  onBack: () => void;
};

export const LayoutSelectionStep: React.FC<LayoutSelectionStepProps> = ({
  selectedLayout,
  onLayoutSelect,
  onNext,
  onBack,
}) => {
  const layouts = [
    {
      id: "coffee-shop" as LayoutTemplate,
      name: "Coffee Shop",
      description:
        "Clean, professional layout perfect for cafés and coffee shops",
      preview: "/api/placeholder/300/200",
      features: [
        "Two-column layout",
        "Clean typography",
        "Professional design",
      ],
      background: "bg-gradient-to-br from-slate-100 to-blue-200",
      textColor: "text-slate-700",
    },
    {
      id: "restaurant" as LayoutTemplate,
      name: "Fine Dining",
      description: "Elegant dark theme perfect for upscale restaurants",
      preview: "/api/placeholder/300/200",
      features: ["Elegant typography", "Dark theme", "Luxury feel"],
      background: "bg-gradient-to-br from-gray-900 to-gray-700",
      textColor: "text-white",
    },
    {
      id: "modern" as LayoutTemplate,
      name: "Modern",
      description: "Contemporary gradient design for modern establishments",
      preview: "/api/placeholder/300/200",
      features: ["Modern gradients", "Clean lines", "Contemporary feel"],
      background: "bg-gradient-to-r from-blue-500 to-purple-600",
      textColor: "text-white",
    },
    {
      id: "fast-food" as LayoutTemplate,
      name: "Fast Food",
      description: "Vibrant, energetic design for quick service restaurants",
      preview: "/api/placeholder/300/200",
      features: ["Vibrant colors", "High energy", "Quick service focus"],
      background: "bg-gradient-to-br from-red-400 to-yellow-400",
      textColor: "text-gray-800",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Kies een layout
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kies een layout. In de volgende stap kun je je elementen toevoegen.
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {layouts.map(layout => (
          <div
            key={layout.id}
            onClick={() => onLayoutSelect(layout.id)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              selectedLayout === layout.id
                ? "border-blue-500 shadow-lg ring-4 ring-blue-200"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Preview */}
            <div
              className={`h-48 ${layout.background} ${layout.textColor} relative overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">{layout.name}</div>
                  <div className="text-sm opacity-80">Layout Preview</div>
                </div>
              </div>

              {/* Mock menu elements */}
              <div className="absolute top-4 left-4 opacity-30">
                <div className="w-16 h-4 bg-current rounded mb-2"></div>
                <div className="w-12 h-3 bg-current rounded mb-1"></div>
                <div className="w-14 h-3 bg-current rounded"></div>
              </div>

              <div className="absolute bottom-4 right-4 opacity-30">
                <div className="w-8 h-8 bg-current rounded-full"></div>
              </div>

              {/* Selection indicator */}
              {selectedLayout === layout.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {layout.name}
              </h3>
              <p className="text-gray-600 mb-4">{layout.description}</p>

              {/* Features */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">
                  Features:
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {layout.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Terug
        </button>

        <div className="flex items-center space-x-4">
          {selectedLayout && (
            <div className="text-sm text-gray-600">
              Geselecteerd:{" "}
              <span className="font-medium">
                {layouts.find(l => l.id === selectedLayout)?.name}
              </span>
            </div>
          )}

          <button
            onClick={onNext}
            disabled={!selectedLayout}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              selectedLayout
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Sla layout op
          </button>
        </div>
      </div>
    </div>
  );
};
