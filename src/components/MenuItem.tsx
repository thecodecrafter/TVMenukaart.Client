import { MenuItemDomainModel } from "../domain/MenuItemDomainModel";

type MenuItemProps = {
  menuItem: MenuItemDomainModel | undefined;
  // setMenuItem: (menuItem: MenuItemDomainModel) => void;
  // handleEditMenuItem: () => void;
  handleDeleteMenuItem: () => void;
};

export const MenuItem = (props: MenuItemProps) => {
  return (
    <tr
      key={props.menuItem?.id}
      onClick={() => {
        // navigate(`${item.id}`);
      }}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.menuItem?.name}
      </th>
      <td className="px-6 py-4">{props.menuItem?.description}</td>
      <td className="px-6 py-4">
        € {props.menuItem?.price?.toFixed(2).replace(".", ",")}
      </td>
      <td className="px-6 py-4 text-[red]">
        <button
          onClick={(event) => {
            event.stopPropagation();
            // props.setMenuItem(props.menuItem);
            props.handleEditMenuItem();
            // setShowModal(true);
          }}
          className="z-10 first:pr-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Bewerk
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            // props.setMenuItem(props.menuItem);
            props.handleDeleteMenuItem();
            // setShowModal(true);
          }}
          className="z-10 font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Verwijder
        </button>
      </td>
    </tr>
    // <div
    //   className="menuItem flex flex-row justify-between my-4 first:mt-0 last:mb-0"
    //   draggable={true}
    // >
    //   <div className="w-[70%]">
    //     <h4 className="pb-1">{props.menuItem.name}</h4>
    //     <p>{props.menuItem.description}</p>
    //   </div>
    //   <p className="text-base font-bold">
    //     € {props.menuItem.price?.toFixed(2).replace(".", ",")}
    //   </p>
    // </div>
  );
};
