import { Delete } from "@mui/icons-material";
import { Box } from "@mui/system";

export const DeleteIcon = () => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        backgroundColor: "#e84033",
        p: 0.5,
        m: 0,
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Delete
        titleAccess="Delete"
        sx={{ color: "white", cursor: "pointer" }}
        fontSize="small"
      />
    </Box>
  );
};
