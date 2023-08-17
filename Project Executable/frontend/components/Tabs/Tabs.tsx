import { Box, Tab, Tabs, Typography } from "@mui/material";

export const TabComponent = (props: any) => {
  const { currentTab, setCurrentTab } = props;
  const tabs = [
    { hidden: false, title: "Clients" },
    { hidden: false, title: "Staff" },
    { hidden: false, title: "Tasks" },
    { hidden: false, title: "Task Types" },
    { hidden: false, title: "Meetings" },
    { hidden: false, title: "Office Hours" },
  ];

  return (
    <Box sx={{ border: 0, borderColor: "divider", mb: 0.5 }}>
      <Tabs
        variant="fullWidth"
        value={currentTab}
        onChange={(_, val) => setCurrentTab(val)}
      >
        {tabs.map(({ hidden, title }, index) => (
          <Tab
            sx={{
              textTransform: "none",
              fontSize: 18,
            }}
            key={index}
            label={title}
            hidden={hidden}
          />
        ))}
      </Tabs>
    </Box>
  );
};
