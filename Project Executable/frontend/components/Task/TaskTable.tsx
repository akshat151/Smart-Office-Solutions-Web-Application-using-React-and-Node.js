import { useEffect, useState } from "react";
import { TableComponent } from "../Table/Table";
import CreateTaskModal from "../Modals/CreateModal";
import UpdateTaskModal from "../Modals/UpdateModal";
import DeleteTaskModal from "../Modals/DeleteModal";
import { useGetStaff } from "../../hooks/staff.hooks";
import {
  useDeleteTask,
  useGetTasks,
  usePatchTask,
  usePostTask,
} from "../../hooks/task.hooks";
import {
  getTaskCol,
  getPostTaskFields,
  getUpdateTaskFields,
  getDeleteTaskFields,
} from "../../utils/task.utils";
import { useGetClients } from "../../hooks/clients.hooks";
import { useGetTaskTypes } from "../../hooks/taskTypes.hooks";
import MembersModal from "../Modals/MembersModal";

export const TaskTable = () => {
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { data: staff } = useGetStaff();
  const { data: clients } = useGetClients();
  const { data: taskTypes } = useGetTaskTypes();

  const { data, refetch } = useGetTasks();
  const { mutate: createTask } = usePostTask();
  const { mutate: updateTask } = usePatchTask();
  const { mutate: deleteTask } = useDeleteTask();

  const initData = {
    taskId: "",
    taskType: "",
    title: "",
    description: "",
    status: "NOT_STARTED",
    startDate: new Date().toISOString().slice(0, 10),
    priority: "P0",
    clientId: "",
    staffId: localStorage.getItem("user_id"),
    taskTypeId: "",
  };

  const [modalData, setModalData] = useState(initData);

  const handleCreate = (rowData: any) => {
    setOpenCreateModal(false);
    createTask(rowData);
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

  const handleMemberModal = (rowData: any) => {
    setOpenMemberModal(!openMemberModal);
    setModalData(rowData);
  };

  const columns = getTaskCol(handleEdit, handleDelete, handleMemberModal);

  useEffect(() => {
    console.log("Getting data on mount.");
    refetch();
  }, []);

  return (
    <>
      <TableComponent
        btnLabel={"Add Task"}
        handleBtnClick={() => setOpenCreateModal(!openCreateModal)}
        columns={columns}
        data={data || []}
      />

      <CreateTaskModal
        open={openCreateModal}
        toggle={() => {
          setModalData(initData);
          setOpenCreateModal(!openCreateModal);
        }}
        handle={handleCreate}
        initData={initData}
        title={"Enter New Task Details"}
        fields={getPostTaskFields(clients, taskTypes, staff)}
      />

      <UpdateTaskModal
        data={modalData}
        open={openEditModal}
        toggle={() => setOpenEditModal(!openEditModal)}
        handle={(task: any) => updateTask(task)}
        title={"Enter Task Details"}
        fields={getUpdateTaskFields(clients, taskTypes, staff)}
      />

      <DeleteTaskModal
        data={modalData}
        open={openDeleteModal}
        toggle={() => setOpenDeleteModal(!openDeleteModal)}
        handle={({ taskId }: { taskId: string }) => deleteTask(taskId)}
        title={"Delete Task"}
        fields={getDeleteTaskFields(clients, taskTypes, staff)}
      />

      <MembersModal
        taskId={modalData.taskId}
        open={openMemberModal}
        toggle={() => setOpenMemberModal(!openMemberModal)}
      />
    </>
  );
};
