import { Delete, Edit, Title } from "@mui/icons-material";
import { Box } from "@mui/system";
import { ReactElement } from "react";
import { DeleteIcon } from "../components/DeleteIcon";
import { EditIcon } from "../components/EditIcon";

export const getStaffCol = (
  handleEditModal: any,
  handleDeleteModal: any,
): {
  id: string;
  label: string;
  minWidth: number;
  Component?: any;
}[] => [
  { id: "staffId", label: "ID", minWidth: 10 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "mobile", label: "Mobile", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "address", label: "Address", minWidth: 200 },
  { id: "dob", label: "DOB", minWidth: 70 },
  { id: "sex", label: "Sex", minWidth: 50 },
  { id: "role", label: "Role", minWidth: 50 },
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

export const createStaffFields = [
  { name: "name", label: "Name" },
  { name: "mobile", label: "Mobile" },
  { name: "email", label: "Email" },
  { name: "address", label: "Address" },
  { name: "dob", label: "Date of Birth", type: "date" },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    options: [
      { key: "male", value: "Male" },
      { key: "female", value: "Female" },
      { key: "other", value: "Other" },
    ],
  },
];

export const updateStaffFields = [
  { name: "staffId", label: "Staff ID", disabled: true },
  { name: "name", label: "Name" },
  { name: "mobile", label: "Mobile" },
  { name: "email", label: "Email" },
  { name: "address", label: "Address" },
  { name: "dob", label: "Date of Birth", type: "date" },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    options: [
      { key: "male", value: "Male" },
      { key: "female", value: "Female" },
      { key: "other", value: "Other" },
    ],
  },
];
