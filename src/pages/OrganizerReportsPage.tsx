import { Box, Tab, Tabs, Paper } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MyEventsReportForm from "@/features/report/components/MyEventsReportForm";
import EventRegistrationsReportSection from "@/features/report/components/EventRegistrationsReportSection";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import { OrganizerSection } from "@/features/organizer/components/OrganizerSection";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`report-tabpanel-${index}`}
            aria-labelledby={`report-tab-${index}`}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

export default function OrganizerReportsPage() {
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <OrganizerSection.Root withPaper={false}>
            <OrganizerSection.Header
                title="reports.title"
                description="reports.description"
            />

            <OrganizerSection.Body>
                <Paper elevation={2} sx={{ borderRadius: 2 }}>
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            "& .MuiTab-root": {
                                py: 2,
                                fontSize: "0.95rem",
                                fontWeight: 600,
                            },
                        }}
                    >
                        <Tab
                            icon={<AssessmentIcon />}
                            iconPosition="start"
                            label={t("reports.tabs.myEvents")}
                            id="report-tab-0"
                            aria-controls="report-tabpanel-0"
                        />
                        <Tab
                            icon={<PeopleIcon />}
                            iconPosition="start"
                            label={t("reports.tabs.eventRegistrations")}
                            id="report-tab-1"
                            aria-controls="report-tabpanel-1"
                        />
                    </Tabs>

                    <Box sx={{ p: 3 }}>
                        <TabPanel value={currentTab} index={0}>
                            <MyEventsReportForm />
                        </TabPanel>

                        <TabPanel value={currentTab} index={1}>
                            <EventRegistrationsReportSection />
                        </TabPanel>
                    </Box>
                </Paper>
            </OrganizerSection.Body>
        </OrganizerSection.Root>
    );
}
