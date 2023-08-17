import { Box } from "@mui/system";
import { DeleteIcon } from "../components/DeleteIcon";
import { EditIcon } from "../components/EditIcon";
import { PeopleIcon } from "../components/PeopleIcon";

export const getTaskCol = (
  handleEditModal: any,
  handleDeleteModal: any,
  handleMemberModal: any,
): {
  id: string;
  label: string;
  minWidth: number;
  Component?: any;
}[] => [
  { id: "taskId", label: "ID", minWidth: 10 },
  { id: "taskType", label: "Task Type", minWidth: 10 },
  { id: "title", label: "Title", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 150 },
  { id: "startDate", label: "Start On", minWidth: 200 },
  { id: "priority", label: "Priority", minWidth: 70 },
  { id: "client", label: "Client", minWidth: 50 },
  { id: "num_members", label: "Members", minWidth: 50 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 50,
    Component: ({ row }: { row: any }) => (
      <Box display="flex">
        <div onClick={() => handleEditModal(row)}>
          <EditIcon />
        </div>
        <div onClick={() => handleDeleteModal(row)}>
          <DeleteIcon />
        </div>
        <div onClick={() => handleMemberModal(row)}>
          <PeopleIcon />
        </div>
      </Box>
    ),
  },
];

const getTaskFields = (clients: any, taskTypes: any, staff: any) => [
  {
    name: "taskTypeId",
    label: "Task Type",
    type: "select",
    options: (taskTypes || []).map(
      ({ taskTypeId, name }: { taskTypeId: string; name: string }) => ({
        key: taskTypeId,
        value: name,
      }),
    ),
  },
  { name: "title", label: "Title" },
  { name: "description", label: "Description" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { key: "NOT_STARTED", value: "NOT_STARTED" },
      { key: "ON_GOING", value: "ON_GOING" },
      { key: "COMPLETED", value: "COMPLETED" },
      { key: "BLOCKED", value: "BLOCKED" },
    ],
  },
  { name: "startDate", label: "Start On", type: "date" },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { key: "P0", value: "P0" },
      { key: "P1", value: "P1" },
      { key: "P2", value: "P2" },
    ],
  },
  {
    name: "clientId",
    label: "Client",
    type: "select",
    options: (clients || []).map(
      ({ clientId, name }: { clientId: string; name: string }) => ({
        key: clientId,
        value: name,
      }),
    ),
  },
];

export const getPostTaskFields = (clients: any, taskTypes: any, staff: any) => [
  ...getTaskFields(clients, taskTypes, staff),
  {
    name: "staffId",
    label: "Assignee",
    type: "select",
    options: (staff || []).map(
      ({ staffId, name }: { staffId: string; name: string }) => ({
        key: staffId,
        value: name,
      }),
    ),
  },
];

export const getUpdateTaskFields = (
  clients: any,
  taskTypes: any,
  staff: any,
) => [
  {
    name: "taskId",
    label: "Task ID",
    disabled: true,
  },
  ...getTaskFields(clients, taskTypes, staff),
];

export const getDeleteTaskFields = (
  clients: any,
  taskTypes: any,
  staff: any,
) => [
  {
    name: "taskId",
    label: "Task ID",
    disabled: true,
  },
  ...getTaskFields(clients, taskTypes, staff),
];
