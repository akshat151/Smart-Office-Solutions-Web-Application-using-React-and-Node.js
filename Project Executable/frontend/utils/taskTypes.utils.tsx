import { Delete, Edit, Title } from "@mui/icons-material";
import { Box } from "@mui/system";
import { ReactElement } from "react";
import { EditIcon } from "../components/EditIcon";

export const getTaskTypesCol = (
  handleEditModal: any,
): {
  id: string;
  label: string;
  minWidth: number;
  Component?: any;
}[] => [
  { id: "taskTypeId", label: "ID", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "description", label: "Description", minWidth: 200 },
  { id: "price", label: "Price", minWidth: 50 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 50,
    Component: ({ row }: { row: any }) => (
      <Box display="flex">
        <div onClick={() => handleEditModal(row)}>
          <EditIcon />
        </div>
      </Box>
    ),
  },
];
