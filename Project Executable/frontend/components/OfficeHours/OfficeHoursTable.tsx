import { useState } from "react";

import {
  useDeleteOfficeHours,
  useGetOfficeHours,
  usePostOfficeHours,
} from "../../hooks/officeHours.hooks";
import { useGetTasks } from "../../hooks/task.hooks";
import {
  getOfficeHoursCol,
  getOfficeHoursFields,
} from "../../utils/officeHours.utils";
import CreateModal from "../Modals/CreateModal";
import DeleteModal from "../Modals/DeleteModal";
import { TableComponent } from "../Table/Table";

export const OfficeHoursTable = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data: tasks } = useGetTasks();

  const { data, isLoading } = useGetOfficeHours();
  const { mutate: createOfcHrs } = usePostOfficeHours();
  const { mutate: deleteOfcHrs } = useDeleteOfficeHours();

  const initData = {
    officeHoursId: "",
    taskId: "",
    staffId: "",
    description: "",
    hours: "",
  };
  const [modalData, setModalData] = useState(initData);

  const handleCreate = (rowData: any) => {
    setOpenCreateModal(false);
    createOfcHrs({ ...rowData, staffId: localStorage.getItem("user_id") });
    setModalData(initData);
  };

  const handleDelete = (rowData: any) => {
    setOpenDeleteModal(!openDeleteModal);
    setModalData(rowData);
  };

  const columns = getOfficeHoursCol(handleDelete);

  return (
    <>
      <TableComponent
        btnLabel={"Add Office Hours"}
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
        title={"Enter Office Hours"}
        fields={getOfficeHoursFields(tasks)}
      />

      <DeleteModal
        data={modalData}
        open={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
        handle={({ officeHoursId }: { officeHoursId: string }) =>
          deleteOfcHrs(officeHoursId)
        }
        title={"Delete Staff Member"}
        fields={getOfficeHoursFields(tasks)}
      />
    </>
  );
};
