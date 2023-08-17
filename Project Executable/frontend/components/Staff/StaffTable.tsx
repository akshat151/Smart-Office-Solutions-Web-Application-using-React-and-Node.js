import { useState } from "react";
import { TableComponent } from "../Table/Table";
import CreateStaffModal from "../Modals/CreateModal";
import UpdateStaffModal from "../Modals/UpdateModal";
import DeleteStaffModal from "../Modals/DeleteModal";
import {
  createStaffFields,
  getStaffCol,
  updateStaffFields,
} from "../../utils/staff.utils";
import {
  useDeleteStaff,
  useGetStaff,
  usePatchStaff,
  usePostStaff,
} from "../../hooks/staff.hooks";
import { useGetRoles } from "../../hooks/roles.hooks";

export const StaffTable = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data: roleOptions } = useGetRoles();

  const { data } = useGetStaff();
  const { mutate: createStaff } = usePostStaff();
  const { mutate: updateStaff } = usePatchStaff();
  const { mutate: deleteStaff } = useDeleteStaff();

  const initData = {
    staffId: "",
    name: "",
    mobile: "",
    email: "",
    address: "",
    dob: new Date().toISOString(),
    role: "STAFF_MEMBER",
    sex: "",
  };
  const [modalData, setModalData] = useState(initData);

  const handleCreate = (rowData: any) => {
    setOpenCreateModal(false);
    createStaff(rowData);
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

  const columns = getStaffCol(handleEdit, handleDelete);

  return (
    <>
      <TableComponent
        btnLabel={"Add New Staff Member"}
        handleBtnClick={() => setOpenCreateModal(!openCreateModal)}
        columns={columns}
        data={data || []}
      />

      <CreateStaffModal
        open={openCreateModal}
        toggle={() => {
          setModalData(initData);
          setOpenCreateModal(!openCreateModal);
        }}
        handle={handleCreate}
        initData={initData}
        title={"Enter New Staff Member Details"}
        fields={[
          {
            name: "role",
            label: "Role",
            type: "select",
            options: (roleOptions || []).map(({ name }: { name: string }) => ({
              key: name,
              value: name,
            })),
          },
          ...createStaffFields,
        ]}
      />

      <UpdateStaffModal
        data={modalData}
        open={openEditModal}
        toggle={() => setOpenEditModal(!openEditModal)}
        handle={(staff: any) => updateStaff(staff)}
        title={"Enter Staff Member Details"}
        fields={[
          {
            name: "role",
            label: "Role",
            type: "select",
            options: (roleOptions || []).map(({ name }: { name: string }) => ({
              key: name,
              value: name,
            })),
          },
          ...updateStaffFields,
        ]}
      />

      <DeleteStaffModal
        data={modalData}
        open={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
        handle={({ staffId }: { staffId: string }) => deleteStaff(staffId)}
        title={"Delete Staff Member"}
        fields={[
          {
            name: "role",
            label: "Role",
            type: "select",
            options: (roleOptions || []).map(({ name }: { name: string }) => ({
              key: name,
              value: name,
            })),
          },
          ...updateStaffFields,
        ]}
      />
    </>
  );
};
