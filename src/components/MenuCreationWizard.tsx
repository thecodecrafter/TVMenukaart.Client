import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MenuForm } from "./forms/MenuForm";
import { LayoutSelectionStep } from "./LayoutSelectionStep";
import { LayoutTemplate } from "./LayoutTemplateSelector";

export type MenuCreationStep = "layout" | "details" | "preview";

export type MenuCreationWizardProps = {
  restaurantId: number;
};

export const MenuCreationWizard: React.FC<MenuCreationWizardProps> = ({
  restaurantId,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<MenuCreationStep>("layout");
  const [selectedLayout, setSelectedLayout] = useState<LayoutTemplate | null>(
    null
  );
  const [menuName, setMenuName] = useState("");

  const steps = [
    {
      id: "layout",
      name: "Layout kiezen",
      description: "Selecteer een lay-out template",
    },
    {
      id: "details",
      name: "Menu details",
      description: "Voer menu informatie in",
    },
    { id: "preview", name: "Voorbeeld", description: "Bekijk je menu" },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleLayoutSelect = (layout: LayoutTemplate) => {
    setSelectedLayout(layout);
  };

  const handleNextStep = () => {
    if (currentStep === "layout") {
      setCurrentStep("details");
    } else if (currentStep === "details") {
      setCurrentStep("preview");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === "details") {
      setCurrentStep("layout");
    } else if (currentStep === "preview") {
      setCurrentStep("details");
    } else {
      navigate(`/admin/restaurants/${restaurantId}`);
    }
  };

  const handleMenuDetailsSubmit = (name: string) => {
    setMenuName(name);
    setCurrentStep("preview");
  };

  const handleMenuCreate = async () => {
    // Here you would normally create the menu with the selected layout
    console.log("Creating menu:", {
      name: menuName,
      layout: selectedLayout,
      restaurantId,
    });

    // For now, just navigate to the menus page
    // In a real implementation, you'd call your API here
    navigate(`/admin/restaurants/${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStepIndex
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <div
                      className={`text-sm font-medium ${
                        index <= currentStepIndex
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {step.description}
                    </div>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 mx-8 h-0.5 ${
                      index < currentStepIndex ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="py-8">
        {currentStep === "layout" && (
          <LayoutSelectionStep
            selectedLayout={selectedLayout}
            onLayoutSelect={handleLayoutSelect}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        )}

        {currentStep === "details" && (
          <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Menu details
                </h1>
                <p className="text-lg text-gray-600">
                  Voer de basisinformatie voor je menu in
                </p>
              </div>

              <MenuForm
                onSubmit={handleMenuDetailsSubmit}
                onCancel={handlePreviousStep}
                restaurantId={restaurantId}
                selectedLayout={selectedLayout}
              />
            </div>
          </div>
        )}

        {currentStep === "preview" && (
          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Menu voorbeeld
              </h1>
              <p className="text-lg text-gray-600">
                Zo ziet je menu eruit met de gekozen layout
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Menu Summary */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Menu overzicht</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Menu naam:</span>
                      <span className="font-medium">{menuName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Layout:</span>
                      <span className="font-medium capitalize">
                        {selectedLayout?.replace("-", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">
                        Klaar om aan te maken
                      </span>
                    </div>
                  </div>
                </div>

                {/* Preview Thumbnail */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Layout preview</h3>
                  <div
                    className={`w-full h-32 rounded-lg flex items-center justify-center ${
                      selectedLayout === "coffee-shop"
                        ? "bg-gradient-to-br from-slate-100 to-blue-200"
                        : selectedLayout === "restaurant"
                          ? "bg-gradient-to-br from-gray-900 to-gray-700"
                          : selectedLayout === "modern"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600"
                            : "bg-gradient-to-br from-red-400 to-yellow-400"
                    }`}
                  >
                    <div
                      className={`text-center ${
                        selectedLayout === "restaurant" ||
                        selectedLayout === "modern"
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      <div className="text-lg font-bold">{menuName}</div>
                      <div className="text-sm opacity-75">
                        {selectedLayout?.replace("-", " ")} layout
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      ✓ Na aanmaken kun je productgroepen en menu-items
                      toevoegen
                    </p>
                    <p>✓ Je kunt de layout later nog wijzigen</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePreviousStep}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Terug
              </button>

              <button
                onClick={handleMenuCreate}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Menu aanmaken
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
