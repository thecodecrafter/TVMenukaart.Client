import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useApiEndpointContext } from "../context/useApiEndpointContext";
import { MenuDomainModel } from "../domain/MenuDomainModel";
import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";
import { MenuSectionDomainModel } from "../domain/MenuSectionDomainModel";
import { MenuSectionsService } from "../service/MenuSectionsService";
import { MenuService } from "../service/MenuService";

type MenuPreviewProps = {
  menu: MenuDomainModel;
  onClose: () => void;
  onMenuUpdated?: () => void;
};

type MenuSectionFormData = {
  name: string;
};

const PreviewMenuItem = ({ menuItem }: { menuItem: MenuItemDomainModel }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
    <div className="flex-1">
      <h4 className="font-semibold text-gray-800 text-sm">{menuItem.name}</h4>
      {menuItem.description && (
        <p className="text-gray-600 text-xs mt-1">{menuItem.description}</p>
      )}
    </div>
    <div className="text-right ml-4">
      <span className="font-bold text-gray-800 text-sm">
        € {menuItem.price?.toFixed(2).replace(".", ",")}
      </span>
    </div>
  </div>
);

const PreviewMenuSection = ({
  menuSection,
}: {
  menuSection: MenuSectionDomainModel;
}) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary">
      {menuSection.name}
    </h3>
    <div className="space-y-1">
      {menuSection.menuItems?.map(menuItem => (
        <PreviewMenuItem key={menuItem.id} menuItem={menuItem} />
      ))}
    </div>
  </div>
);

const AddMenuSectionForm = ({
  menuId,
  onSectionAdded,
  onCancel,
}: {
  menuId: number;
  onSectionAdded: () => void;
  onCancel: () => void;
}) => {
  const apiUrl = useApiEndpointContext();
  const menuSectionService = new MenuSectionsService(apiUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MenuSectionFormData>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: MenuSectionFormData) => {
    setIsSubmitting(true);
    try {
      await menuSectionService.addMenuSection(menuId, data.name);
      reset();
      onSectionAdded();
    } catch (error) {
      console.error("Error adding menu section:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Productgroep toevoegen
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Naam van de productgroep"
            {...register("name", {
              required: "Naam is verplicht",
            })}
            className={`input input-bordered w-full focus:outline-none ${
              errors.name
                ? "focus:border-red-500 focus-within:border-red-500 border-red-500 focus:ring-rose-200"
                : ""
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-sm"
          >
            {isSubmitting ? "Toevoegen..." : "Toevoegen"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost btn-sm"
          >
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
};

export const MenuPreview = (props: MenuPreviewProps) => {
  const { menu: initialMenu, onClose, onMenuUpdated } = props;
  const [menu, setMenu] = useState<MenuDomainModel>(initialMenu);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = useApiEndpointContext();
  const menuService = new MenuService(apiUrl);
  const menuSectionServiceRef = useRef<MenuSectionsService>();

  // Initialize the service ref
  if (!menuSectionServiceRef.current) {
    menuSectionServiceRef.current = new MenuSectionsService(apiUrl);
  }

  const loadMenuSections = useCallback(async () => {
    try {
      const sections = await menuSectionServiceRef.current!.allMenuSections(
        initialMenu.id
      );
      console.log("Fetched menu sections:", sections);
      setMenu(prev => ({
        ...prev,
        menuSections: sections,
      }));
    } catch (error) {
      console.error("Error loading menu sections:", error);
    }
  }, [initialMenu.id]);

  // Update menu when initialMenu changes
  useEffect(() => {
    console.log("Initial menu data:", initialMenu);
    console.log("Initial menu sections:", initialMenu.menuSections);
    setMenu(initialMenu);

    // If menu sections are not included, fetch them separately
    if (!initialMenu.menuSections || initialMenu.menuSections.length === 0) {
      loadMenuSections();
    }
  }, [initialMenu, loadMenuSections]);

  const refreshMenuData = async () => {
    setIsLoading(true);
    try {
      const updatedMenu = await menuService.GetMenu(menu.id);
      console.log("Updated menu data:", updatedMenu);
      console.log("Menu sections:", updatedMenu.menuSections);

      // If the updated menu doesn't have sections, fetch them separately
      if (!updatedMenu.menuSections || updatedMenu.menuSections.length === 0) {
        const sections = await menuSectionServiceRef.current!.allMenuSections(
          menu.id
        );
        updatedMenu.menuSections = sections;
      }

      setMenu(updatedMenu);
    } catch (error) {
      console.error("Error refreshing menu data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionAdded = async () => {
    setShowAddForm(false);
    await refreshMenuData();
    if (onMenuUpdated) {
      onMenuUpdated();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Preview: {menu.name}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {menu.menuSections?.length || 0} productgroep
              {menu.menuSections?.length !== 1 ? "en" : ""} •
              {menu.menuSections?.reduce(
                (total, section) => total + (section.menuItems?.length || 0),
                0
              ) || 0}{" "}
              producten
            </p>
          </div>
          <div className="flex gap-2">
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary btn-sm"
              >
                Productgroep toevoegen
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading && (
            <div className="text-center py-4">
              <div className="loading loading-spinner loading-md"></div>
              <p className="text-gray-600 mt-2">Menu wordt bijgewerkt...</p>
            </div>
          )}

          {showAddForm && (
            <div className="mb-6">
              <AddMenuSectionForm
                menuId={menu.id}
                onSectionAdded={handleSectionAdded}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {!isLoading && menu.menuSections && menu.menuSections.length > 0 ? (
            <div className="space-y-6">
              {menu.menuSections.map(menuSection => (
                <PreviewMenuSection
                  key={menuSection.id}
                  menuSection={menuSection}
                />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Geen productgroepen
              </h3>
              <p className="text-gray-500 mb-4">
                Voeg productgroepen toe om je menu te vullen
              </p>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn btn-primary"
                >
                  Eerste productgroep toevoegen
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
