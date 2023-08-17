import People from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box } from "@mui/system";

export const PeopleIcon = () => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        backgroundColor: "#005A92",
        p: 0.5,
        m: 0,
        ml: 2,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <People
        titleAccess="Show Staff"
        sx={{ color: "white", cursor: "pointer" }}
        fontSize="small"
      />
    </Box>
  );
};

export const PeopleIconClient = () => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        backgroundColor: "#082567",
        p: 0.5,
        m: 0,
        ml: 2,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <GroupsIcon
        titleAccess="Show Clients"
        sx={{ color: "white", cursor: "pointer" }}
        fontSize="small"
      />
    </Box>
  );
};
