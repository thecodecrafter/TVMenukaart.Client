import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
  LayoutTemplate,
  LayoutTemplateSelector,
} from "../components/LayoutTemplateSelector";
import { Loader } from "../components/Loader";
import { TVMenuPreview } from "../components/TVMenuPreview";
import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { useFetch } from "../hooks/useFetch";
import { MenuService } from "../service/MenuService";

export const TVPreviewPage = () => {
  const { menuId } = useParams();
  const apiUrl = useApiEndpointContext();
  const menuService = new MenuService(apiUrl);
  const [selectedLayout, setSelectedLayout] =
    useState<LayoutTemplate>("coffee-shop");
  const [showAnimations, setShowAnimations] = useState(true);

  if (!menuId) return <div>Geen menuId opgegeven</div>;
  const menuIdNum = Number(menuId);

  const result = useFetch(
    () => menuService.GetMenu(menuIdNum),
    () => "Fout bij ophalen menu",
    true,
    menuIdNum
  );

  if (result.isProcessing) return <Loader />;
  if (result.hasError) return <div>{result.error}</div>;
  if (!result.data) return <div>Menu niet gevonden</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TV Preview: {result.data.name}
          </h1>
          <p className="text-gray-600">
            Preview how your menu will look on TV screens with different layouts
            and animations.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Controls Sidebar */}
          <div className="xl:col-span-1">
            <LayoutTemplateSelector
              selectedLayout={selectedLayout}
              onLayoutChange={setSelectedLayout}
              showAnimations={showAnimations}
              onAnimationToggle={setShowAnimations}
            />

            {/* Additional Controls */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Preview Options</h3>

              <div className="space-y-4">
                <button
                  onClick={() => setShowAnimations(!showAnimations)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {showAnimations ? "Disable" : "Enable"} Animations
                </button>

                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Screen Resolution:</strong> 1280x720 (HD)
                  </p>
                  <p>
                    <strong>Layout:</strong>{" "}
                    {selectedLayout
                      .replace("-", " ")
                      .replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p>
                    <strong>Sections:</strong>{" "}
                    {result.data.menuSections?.length || 0}
                  </p>
                  <p>
                    <strong>Total Items:</strong>{" "}
                    {result.data.menuSections?.reduce(
                      (total, section) =>
                        total + (section.menuItems?.length || 0),
                      0
                    ) || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Layout Tips */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Layout Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Coffee Shop: Best for cafés and casual dining</li>
                <li>• Fine Dining: Perfect for upscale restaurants</li>
                <li>• Modern: Great for contemporary establishments</li>
                <li>• Fast Food: Ideal for quick service venues</li>
              </ul>
            </div>
          </div>

          {/* Preview Area */}
          <div className="xl:col-span-3">
            <div className="tv-preview-container">
              <TVMenuPreview
                menu={result.data}
                layoutType={selectedLayout}
                showAnimations={showAnimations}
              />
            </div>

            {/* Preview Actions */}
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Print Preview
              </button>
              <button
                onClick={() => {
                  // Force re-render with animations
                  setShowAnimations(false);
                  setTimeout(() => setShowAnimations(true), 100);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Replay Animations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVPreviewPage;
