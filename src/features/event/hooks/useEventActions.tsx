import { Button } from "@mui/material";
import { Edit, Delete, Visibility, HowToReg } from "@mui/icons-material";
import type { Event } from "@/domain/event/Event";
import { useAuth } from "@/contexts/authContext";
import { RoleConstant } from "@/domain/role/RoleConstant";
import { useTranslation } from "react-i18next";

export function useEventActions() {
    const { user } = useAuth();
    const { t } = useTranslation();

    if (!user) return null;

    const getActions = (event: Event) => {
        switch (user.role.name) {
            case RoleConstant.ORGANIZER:
                return (
                    <>
                        <Button
                            size="small"
                            startIcon={< Edit />}
                            color="primary"
                            onClick={() => console.log("Edit", event.id)
                            }
                        >
                            {t("common.actions.view")}
                        </Button>
                        < Button
                            size="small"
                            startIcon={< Delete />}
                            color="error"
                            onClick={() => console.log("Delete", event.id)}
                        >
                            {t("common.actions.delete")}
                        </Button>
                    </>
                );

            case RoleConstant.ATTENDEE:
                if (event.status === "PUBLISHED") {
                    return (
                        <Button
                            size="small"
                            startIcon={< HowToReg />}
                            variant="contained"
                            color="success"
                            onClick={() => console.log("Register", event.id)}
                        >
                            {t("common.actions.register")}
                        </Button>
                    );
                }
                return (
                    <Button
                        size="small"
                        startIcon={< Visibility />}
                        variant="outlined"
                        onClick={() => console.log("View", event.id)}
                    >
                        {t("common.actions.viewDetails")}
                    </Button>
                );

            case RoleConstant.ADMIN:
            default:
                return (
                    <Button
                        size="small"
                        startIcon={< Visibility />}
                        variant="outlined"
                        onClick={() => console.log("View", event.id)}
                    >
                        {t("common.actions.view")}
                    </Button>
                );
        }
    };

    return { getActions };
}
