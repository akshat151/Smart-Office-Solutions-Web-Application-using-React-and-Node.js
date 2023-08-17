import { Box } from "@mui/system";
import { DeleteIcon } from "../components/DeleteIcon";

export const getOfficeHoursCol = (
  handleDeleteModal: any,
): {
  id: string;
  label: string;
  minWidth: number;
  Component?: any;
}[] => [
  { id: "title", label: "Task", minWidth: 100 },
  { id: "name", label: "Task Type", minWidth: 100 },
  { id: "priority", label: "Priority", minWidth: 200 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "hours", label: "#Hours", minWidth: 150 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 50,
    Component: ({ row }: { row: any }) => (
      <Box display="flex">
        <div onClick={() => handleDeleteModal(row)}>
          <DeleteIcon />
        </div>
      </Box>
    ),
  },
];

export const getOfficeHoursFields = (task: any) => [
  { name: "hours", label: "#Hours" },
  { name: "description", label: "Description" },
  {
    name: "taskId",
    label: "Task",
    type: "select",
    options: (task || []).map(
      ({ taskId, title }: { taskId: string; title: string }) => ({
        key: taskId,
        value: title,
      }),
    ),
  },
];
