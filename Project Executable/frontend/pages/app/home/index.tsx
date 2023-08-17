import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { ClientTable } from "../../../components/Client/ClientTable";
import { MeetingTable } from "../../../components/Meeting/MeetingTable";
import { OfficeHoursTable } from "../../../components/OfficeHours/OfficeHoursTable";
import { StaffTable } from "../../../components/Staff/StaffTable";
import { TabComponent } from "../../../components/Tabs/Tabs";
import { TaskTable } from "../../../components/Task/TaskTable";
import { TaskTypesTable } from "../../../components/TaskTypes/TaskTypesTable";
import { TopBar } from "../../../components/TopBar";

const home = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <TopBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
          sx={{
            fontSize: 20,
            letterSpacing: 4,
            fontWeight: "light",
            textShadow: 3,
          }}
        >
          Smart Office Solution
        </Typography>

        {/* Display Table */}
        <Box sx={{ my: 3, width: "100%", borderRadius: "15px", boxShadow: 3 }}>
          <TabComponent currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab == 0 && <ClientTable />}
          {currentTab == 1 && <StaffTable />}
          {currentTab == 2 && <TaskTable />}
          {currentTab == 3 && <TaskTypesTable />}
          {currentTab == 4 && <MeetingTable />}
          {currentTab == 5 && <OfficeHoursTable />}
        </Box>
      </Box>
    </>
  );
};

export default home;
