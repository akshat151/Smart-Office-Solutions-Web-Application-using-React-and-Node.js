import { useEffect, useState } from "react";
import { TableComponent } from "../Table/Table";
import CreateMeetingModal from "../Modals/CreateModal";
import UpdateMeetingModal from "../Modals/UpdateModal";
import DeleteTaskModal from "../Modals/DeleteModal";
import { useGetStaff } from "../../hooks/staff.hooks";
import {
  getPostMeetingFields,
  getMeetingCol,
  getDeleteMeetingFields,
  getUpdateMeetingFields,
} from "../../utils/meeting.utils";
import {
  useDeleteMeeting,
  useGetMeetings,
  usePatchMeeting,
  usePostMeeting,
} from "../../hooks/meeting.hooks";
import MeetingMembersModal from "./MeetingMemebersModal";

export const MeetingTable = () => {
  const [openClientsModal, setOpenClientsModal] = useState(false);
  const [openStaffModal, setOpenStaffModal] = useState(false);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data: meetings, refetch } = useGetMeetings();
  const { data: staff } = useGetStaff();

  const { mutate: createMeeting } = usePostMeeting();
  const { mutate: updateMeeting } = usePatchMeeting();
  const { mutate: deleteMeeting } = useDeleteMeeting();

  const initData = {
    meetingId: "",
    title: "",
    description: "",
    time: new Date().toISOString().slice(0, 10),
    hostId: localStorage.getItem("user_id"),
    staffId: 3,
  };
  const [modalData, setModalData] = useState(initData);

  const handleCreate = (rowData: any) => {
    setOpenCreateModal(false);
    createMeeting(rowData);
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

  const handleStaffModal = (rowData: any) => {
    setOpenStaffModal(!openStaffModal);
    setModalData(rowData);
  };

  const handleClientModal = (rowData: any) => {
    setOpenClientsModal(!openClientsModal);
    setModalData(rowData);
  };

  const columns = getMeetingCol(
    handleEdit,
    handleDelete,
    handleStaffModal,
    handleClientModal,
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <TableComponent
        btnLabel={"Add New Meeting"}
        handleBtnClick={() => setOpenCreateModal(!openCreateModal)}
        columns={columns}
        data={meetings || []}
      />

      <CreateMeetingModal
        open={openCreateModal}
        toggle={() => {
          setModalData(initData);
          setOpenCreateModal(!openCreateModal);
        }}
        handle={handleCreate}
        initData={initData}
        title={"Enter Meeting Details"}
        fields={getPostMeetingFields(staff)}
      />

      <UpdateMeetingModal
        data={modalData}
        open={openEditModal}
        toggle={() => setOpenEditModal(!openEditModal)}
        handle={(meeting: any) => updateMeeting(meeting)}
        title={"Enter Meeting Details"}
        fields={getUpdateMeetingFields(staff)}
      />

      <DeleteTaskModal
        data={modalData}
        open={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
        handle={({ meetingId }: { meetingId: string }) =>
          deleteMeeting(meetingId)
        }
        title={"Delete Meeting"}
        fields={getDeleteMeetingFields(staff)}
      />

      <MeetingMembersModal
        meetingId={modalData?.meetingId || null}
        open={openClientsModal}
        toggle={() => setOpenClientsModal(!openClientsModal)}
      />

      <MeetingMembersModal
        isStaff
        meetingId={modalData?.meetingId || null}
        open={openStaffModal}
        toggle={() => setOpenStaffModal(!openStaffModal)}
      />
    </>
  );
};
