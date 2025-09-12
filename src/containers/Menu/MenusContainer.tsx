import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ConfirmationModal } from "../../components/ConfirmationModal";
import { Loader } from "../../components/Loader";
import { MenuPreview } from "../../components/MenuPreview";
import { MenuThumbnail } from "../../components/MenuThumbnail";
import { useApiEndpointContext } from "../../context/useApiEndpointContext";
import { MenuDomainModel } from "../../domain/MenuDomainModel";
import { useFetch } from "../../hooks/useFetch";
import IconAddMenu from "../../icons/IconAddMenu";
import { MenuService } from "../../service/MenuService";
import { RestaurantService } from "../../service/RestaurantService";
import Connector from "../../signalr-connection";

type MenusContainerProps = {
  restaurantId: string;
};

export const MenusContainer = (props: MenusContainerProps) => {
  const apiUrl = useApiEndpointContext();
  const menuService = new MenuService(apiUrl);
  const restaurantService = new RestaurantService(apiUrl);
  const [selectedMenu, setSelectedMenu] = useState<MenuDomainModel | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const navigate = useNavigate();

  const connector = Connector.getInstance();
  connector.onMenuReceived(() => setRefreshCounter(refreshCounter + 1));

  const result = useFetch(
    () => restaurantService.GetRestaurant(+props.restaurantId),
    () => "Er is een fout opgetreden bij het ophalen van het restaurant",
    true,
    refreshCounter
  );

  const handleDeleteMenu = (id: number) => menuService.deleteMenu(id);

  const handlePreview = (menu: MenuDomainModel) => {
    setSelectedMenu(menu);
    setShowPreview(true);
  };

  const handleEdit = (menu: MenuDomainModel) => {
    navigate(`/admin/menus/${menu.id}/edit`);
  };

  const handleDelete = (menu: MenuDomainModel) => {
    setSelectedMenu(menu);
    setShowDeleteModal(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedMenu(null);
  };

  const handleMenuUpdated = () => {
    // Refresh the data to show the updated menu
    setRefreshCounter(prev => prev + 1);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMenu(null);
  };

  if (result.isProcessing) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col content-start pt-0 pr-12">
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        body={`Verwijderen van scherm ${selectedMenu?.name}`}
        title="Wilt u zeker dit scherm verwijderen?"
        confirmationPromise={() =>
          selectedMenu ? handleDeleteMenu(selectedMenu.id) : Promise.resolve()
        }
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        dialogId={selectedMenu ? selectedMenu.id.toString() : ""}
      />

      {/* Menu Preview Modal */}
      {selectedMenu && showPreview && (
        <MenuPreview
          menu={selectedMenu}
          onClose={handleClosePreview}
          onMenuUpdated={handleMenuUpdated}
        />
      )}

      <h1 className="text-2xl font-bold mb-6">
        Restaurant: {result.data?.name}
      </h1>

      {!result.data?.menus || result.data.menus.length < 1 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center mb-6">
            <IconAddMenu
              width={64}
              height={64}
              className="mx-auto mb-4 text-gray-400"
            />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Geen schermen
            </h2>
            <p className="text-gray-500">
              Voeg je eerste scherm toe om te beginnen
            </p>
          </div>
          <button
            onClick={() =>
              navigate(`/admin/restaurants/${result.data?.id}/menus/add`)
            }
            className="px-6 py-3 text-sm bg-primary rounded-lg text-white border hover:bg-primary/90 transition-colors"
          >
            Voeg je eerste scherm toe
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() =>
                navigate(`/admin/restaurants/${result.data?.id}/menus/add`)
              }
              className="px-6 py-3 text-sm bg-primary rounded-lg text-white border hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <IconAddMenu width={20} height={20} />
              Voeg nieuw scherm toe
            </button>
          </div>

          {/* Thumbnails Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {result.data?.menus?.map(menu => (
              <MenuThumbnail
                key={menu.id}
                menu={menu}
                onPreview={handlePreview}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onTVPreview={() =>
                  navigate(`/admin/menus/${menu.id}/tv-preview`)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
