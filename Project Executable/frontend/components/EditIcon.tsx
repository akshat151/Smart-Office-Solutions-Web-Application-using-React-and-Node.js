import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/system";

export const EditIcon = () => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        backgroundColor: "#1b8c66",
        p: 0.5,
        m: 0,
        mr: 2,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Edit
        titleAccess="Edit"
        sx={{ color: "white", cursor: "pointer" }}
        fontSize="small"
      />
    </Box>
  );
};
