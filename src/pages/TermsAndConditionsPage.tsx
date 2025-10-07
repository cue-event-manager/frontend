import { Container, Typography, Divider, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function TermsAndConditionsPage() {
    const { t } = useTranslation();

    return (
        <Container maxWidth="md" sx={{paddingY:4, display:"flex", flexDirection:"column", gap:"1rem"}}>
            <Typography variant="h4" gutterBottom fontWeight="bold" textAlign={"center"}>
                {t("termsAndConditions.title")}
            </Typography>

            <Typography variant="body1">{t("termsAndConditions.intro")}</Typography>

            <Divider sx={{ my: 3 }} />

            <Section
                title={t("termsAndConditions.sections.purpose.title")}
                content={t("termsAndConditions.sections.purpose.description")}
                list={t("termsAndConditions.sections.purpose.items", { returnObjects: true }) as unknown as string[]}
            />

            <Divider sx={{ my: 3 }} />

            <Section
                title={t("termsAndConditions.sections.rights.title")}
                content={t("termsAndConditions.sections.rights.description")}
                list={t("termsAndConditions.sections.rights.items", { returnObjects: true }) as unknown as string[]}
            />

            <Divider sx={{ my: 3 }} />

            <Section
                title={t("termsAndConditions.sections.procedures.title")}
                content={t("termsAndConditions.sections.procedures.description")}
            />

            <Divider sx={{ my: 3 }} />

            <Section
                title={t("termsAndConditions.sections.security.title")}
                content={t("termsAndConditions.sections.security.description")}
            />

            <Divider sx={{ my: 3 }} />

            <Section
                title={t("termsAndConditions.sections.retention.title")}
                content={t("termsAndConditions.sections.retention.description")}
            />

            <Divider sx={{ my: 3 }} />

            <Section
                title={t("termsAndConditions.sections.changes.title")}
                content={t("termsAndConditions.sections.changes.description")}
            />

            <Divider sx={{ my: 3 }} />

            <Section
                title={t("termsAndConditions.sections.acceptance.title")}
                content={t("termsAndConditions.sections.acceptance.description")}
            />

        </Container>
    );
}

function Section({
    title,
    content,
    list,
}: {
    title: string;
    content: string;
    list?: string[];
}) {
    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                {content}
            </Typography>
            {Array.isArray(list) && (
                <ul style={{ marginLeft: "1.5rem" }}>
                    {list.map((item, i) => (
                        <li key={i}>
                            <Typography variant="body2" color="text.secondary">
                                {item}
                            </Typography>
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );
}
