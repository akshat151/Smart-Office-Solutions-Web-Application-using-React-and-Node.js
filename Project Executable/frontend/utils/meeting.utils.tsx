import { Box } from "@mui/system";
import { DeleteIcon } from "../components/DeleteIcon";
import { EditIcon } from "../components/EditIcon";
import { PeopleIcon, PeopleIconClient } from "../components/PeopleIcon";

export const getMeetingCol = (
  handleEditModal: any,
  handleDeleteModal: any,
  handleStaffModal: any,
  handleClientModal: any,
): {
  id: string;
  label: string;
  minWidth: number;
  Component?: any;
}[] => [
  { id: "meetingId", label: "ID", minWidth: 10 },
  { id: "time", label: "Meeting Time", minWidth: 10 },
  { id: "title", label: "Title", minWidth: 50 },
  { id: "description", label: "Description", minWidth: 100 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    Component: ({ row }: { row: any }) => (
      <Box display="flex">
        <div onClick={() => handleEditModal(row)}>
          <EditIcon />
        </div>
        <div onClick={() => handleDeleteModal(row)}>
          <DeleteIcon />
        </div>
        <div onClick={() => handleStaffModal(row)}>
          <PeopleIcon />
        </div>
        <div onClick={() => handleClientModal(row)}>
          <PeopleIconClient />
        </div>
      </Box>
    ),
  },
];

export const getPostMeetingFields = (staff: any) => [
  { name: "title", label: "Title" },
  { name: "description", label: "Description" },
  { name: "time", label: "Time of Meeting", type: "date" },
  {
    name: "staffId",
    label: "Staff Member",
    type: "select",
    options: (staff || []).map(
      ({ staffId, name }: { staffId: string; name: string }) => ({
        key: staffId,
        value: name,
      }),
    ),
  },
];

export const getUpdateMeetingFields = (staff: any) => [
  {
    name: "meetingId",
    label: "Meeting ID",
    disabled: true,
  },
  { name: "title", label: "Title", disabled: true },
  { name: "description", label: "Description" },
  { name: "time", label: "Time of Meeting", type: "date", disabled: true },
];

export const getDeleteMeetingFields = (staff: any) => [
  {
    name: "meetingId",
    label: "Meeting ID",
    disabled: true,
  },
  { name: "title", label: "Title" },
  { name: "description", label: "Description" },
  { name: "time", label: "Time of Meeting", type: "date" },
];
