import { useState } from "react";
import {
  useDeleteClient,
  useGetClients,
  usePatchClient,
  usePostClients,
} from "../../hooks/clients.hooks";
import { getClientCol } from "../../utils/clients.utils";
import { TableComponent } from "../Table/Table";
import CreateClientModal from "./CreateClientModal";
import DeleteClientModal from "./DeleteClientModal";
import UpdateClientModal from "./UpdateClientModal";

export const ClientTable = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data, isLoading } = useGetClients();
  const { mutate: createClient, isLoading: isSaving } = usePostClients();
  const { mutate: updateClient, isLoading: isUpdating } = usePatchClient();
  const { mutate: deleteClient, isLoading: isDeleting } = useDeleteClient();

  const initData = {
    clientId: "",
    name: "",
    mobile: "",
    email: "",
    address: "",
  };
  const [modalData, setModalData] = useState(initData);

  const handleCreate = (rowData: any) => {
    setOpenCreateModal(false);
    createClient(rowData);
    setModalData(initData);
  };

  const handleEdit = (rowData: any) => {
    setOpenEditModal(!openEditModal);
    setModalData(rowData);
  };

  const handleDelete = (rowData: any) => {
    setOpenDeleteModal(!openDeleteModal);
    setModalData(rowData);
  };

  const columns = getClientCol(handleEdit, handleDelete);

  return (
    <>
      <TableComponent
        btnLabel={"Add New Client"}
        handleBtnClick={() => setOpenCreateModal(!openCreateModal)}
        columns={columns}
        data={data || []}
      />

      <CreateClientModal
        open={openCreateModal}
        toggle={() => {
          setModalData(initData);
          setOpenCreateModal(!openCreateModal);
        }}
        handleCreate={handleCreate}
      />

      <UpdateClientModal
        data={modalData}
        open={openEditModal}
        toggle={() => setOpenEditModal(!openEditModal)}
        handleEdit={(client: any) => updateClient(client)}
      />

      <DeleteClientModal
        data={modalData}
        open={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
        handleDelete={(clientId: string) => deleteClient(clientId)}
      />
    </>
  );
};
