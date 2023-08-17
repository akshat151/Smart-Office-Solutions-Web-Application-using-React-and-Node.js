import { Delete, Edit, Title } from "@mui/icons-material";
import { Box } from "@mui/system";
import { ReactElement } from "react";
import { DeleteIcon } from "../components/DeleteIcon";
import { EditIcon } from "../components/EditIcon";

export const getClientCol = (
  handleEditModal: any,
  handleDeleteModal: any,
): {
  id: string;
  label: string;
  minWidth: number;
  Component?: any;
}[] => [
  { id: "clientId", label: "ID", minWidth: 70 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "mobile", label: "Mobile", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "address", label: "Address", minWidth: 200 },
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
      </Box>
    ),
  },
];
