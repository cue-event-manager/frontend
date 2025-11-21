import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

interface AppBreadcrumbsProps {
    currentLabel?: string;
    sx?: SxProps<Theme>;
}

const segmentTranslationKeys: Record<string, string> = {
    events: "events.detail.breadcrumbEvents",
    organizer: "organizer.events.title",
    admin: "admin.events.title",
};

export function AppBreadcrumbs({ currentLabel, sx }: AppBreadcrumbsProps) {
    const location = useLocation();
    const { t } = useTranslation();

    const segments = location.pathname.split("/").filter(Boolean);
    const crumbs: { label: string; to: string }[] = [
        {
            label: t("events.detail.breadcrumbHome"),
            to: "/",
        },
    ];

    let cumulativePath = "";

    segments.forEach((segment, index) => {
        cumulativePath += `/${segment}`;
        const label =
            (index === segments.length - 1 && currentLabel) ||
            translateSegment(segment, t) ||
            segment;

        crumbs.push({
            label,
            to: cumulativePath,
        });
    });

    return (
        <Breadcrumbs aria-label="breadcrumb" sx={sx}>
            {crumbs.map((crumb, index) => {
                const isLast = index === crumbs.length - 1;
                if (isLast) {
                    return (
                        <Typography
                            key={`${crumb.label}-${index}`}
                            color="text.primary"
                            variant="body2"
                            fontWeight={600}
                        >
                            {crumb.label}
                        </Typography>
                    );
                }

                return (
                    <MuiLink
                        key={`${crumb.label}-${index}`}
                        component={RouterLink}
                        to={crumb.to ?? "/"}
                        underline="hover"
                        color="text.secondary"
                        variant="body2"
                        sx={{ fontWeight: 500 }}
                    >
                        {crumb.label}
                    </MuiLink>
                );
            })}
        </Breadcrumbs>
    );
}

function translateSegment(segment: string, t: TFunction<"translation">) {
    const key = segmentTranslationKeys[segment];
    if (!key) return null;
    return t(key, { defaultValue: segment });
}
