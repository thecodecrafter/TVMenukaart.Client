import { MenuDomainModel } from "../domain/MenuDomainModel";
import IconScreens from "../icons/IconScreens";

type MenuThumbnailProps = {
  menu: MenuDomainModel;
  onPreview: (menu: MenuDomainModel) => void;
  onEdit: (menu: MenuDomainModel) => void;
  onDelete: (menu: MenuDomainModel) => void;
  onTVPreview?: () => void;
};

export const MenuThumbnail = (props: MenuThumbnailProps) => {
  const { menu, onPreview, onEdit, onDelete, onTVPreview } = props;

  return (
    <div className="relative group">
      {/* Delete button - shown on hover */}
      <button
        onClick={e => {
          e.stopPropagation();
          onDelete(menu);
        }}
        className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
        title="Verwijder scherm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
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

      {/* Thumbnail container */}
      <div
        className="border-2 border-solid border-gray-300 hover:border-primary rounded-2xl w-80 h-56 flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-200 hover:shadow-lg bg-white"
        onClick={() => onPreview(menu)}
      >
        {/* Screen icon */}
        <div className="mb-4">
          <IconScreens width={48} height={48} />
        </div>

        {/* Menu name */}
        <h2 className="text-xl font-semibold text-gray-800 capitalize mb-2">
          {menu.name}
        </h2>

        {/* Menu info */}
        <div className="text-sm text-gray-600">
          {menu.menuSections?.length || 0} productgroep
          {menu.menuSections?.length !== 1 ? "en" : ""}
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={e => {
              e.stopPropagation();
              onPreview(menu);
            }}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
          >
            Preview
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onEdit(menu);
            }}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
          >
            Bewerk
          </button>
          {onTVPreview && (
            <button
              onClick={e => {
                e.stopPropagation();
                onTVPreview();
              }}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              TV Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
