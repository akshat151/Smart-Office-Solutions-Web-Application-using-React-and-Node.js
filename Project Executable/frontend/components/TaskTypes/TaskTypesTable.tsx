import { useState } from "react";
import {
  useGetTaskTypes,
  usePatchTaskTypes,
  usePostTaskTypes,
} from "../../hooks/taskTypes.hooks";
import { getTaskTypesCol } from "../../utils/taskTypes.utils";
import CreateModal from "../Modals/CreateModal";
import UpdateModal from "../Modals/UpdateModal";
import { TableComponent } from "../Table/Table";

export const TaskTypesTable = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { data, isLoading } = useGetTaskTypes();
  const { mutate: createTaskType, isLoading: isSaving } = usePostTaskTypes();
  const { mutate: updateTaskType, isLoading: isUpdating } = usePatchTaskTypes();

  const initData = {
    taskTypeId: "",
    name: "",
    description: "",
    price: "",
  };
  const [modalData, setModalData] = useState(initData);

  const handleCreate = (rowData: any) => {
    setOpenCreateModal(false);
    createTaskType(rowData);
    setModalData(initData);
  };

  const handleEdit = (rowData: any) => {
    setOpenEditModal(!openEditModal);
    setModalData(rowData);
  };

  const columns = getTaskTypesCol(handleEdit);

  return (
    <>
      <TableComponent
        btnLabel={"Add New Task Type"}
        handleBtnClick={() => setOpenCreateModal(!openCreateModal)}
        columns={columns}
        data={data || []}
      />

      <CreateModal
        open={openCreateModal}
        toggle={() => {
          setModalData(initData);
          setOpenCreateModal(!openCreateModal);
        }}
        handle={handleCreate}
        initData={initData}
        title={"Enter New Task Type Details"}
        fields={[
          { name: "name", label: "Name" },
          { name: "description", label: "Description" },
          { name: "price", label: "Price" },
        ]}
      />

      <UpdateModal
        data={modalData}
        open={openEditModal}
        toggle={() => setOpenEditModal(!openEditModal)}
        handle={(client: any) => updateTaskType(client)}
        title={"Enter Task Type Details"}
        fields={[
          { name: "taskTypeId", label: "Task Type ID", disabled: true },
          { name: "name", label: "Name" },
          { name: "description", label: "Description" },
          { name: "price", label: "Price" },
        ]}
      />
    </>
  );
};
