import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    Link,
    Box,
    Divider,
    Stack,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/routes/routes";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

interface Props {
    open: boolean;
    version: string;
    onAccept: () => void;
    onClose: () => void;
}

export default function TermsAndConditionsModal({
    open,
    version,
    onAccept,
    onClose,
}: Props) {
    const { t } = useTranslation();
    const [checked, setChecked] = useState(false);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 1,
                    backgroundColor: "background.paper",
                },
            }}
        >
            <DialogTitle
                id="terms-dialog-title"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "primary.main",
                    px: 3,
                    pt: 3,
                }}
            >
                <GavelRoundedIcon color="primary" sx={{ fontSize: 26 }} />
                {t("auth.terms.title")}
            </DialogTitle>

            <Divider sx={{ my: 1 }} />

            <DialogContent sx={{ px: 3, py: 2 }}>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {t("auth.terms.message")}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <Typography variant="body2" color="text.secondary">
                        {t("auth.terms.version")}
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                        {version}
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        backgroundColor: "grey.50",
                        borderRadius: 2,
                        px: 2,
                        py: 1.5,
                        mb: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {t("auth.terms.preview")}
                    </Typography>

                    <Link
                        href={ROUTES.TERMS_AND_CONDITIONS}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="primary"
                        sx={{ display: "inline-block", mt: 1 }}
                    >
                        {t("auth.terms.view")}
                    </Link>
                </Box>

                <FormControlLabel
                    control={
                        <Checkbox
                            color="primary"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                    }
                    label={<Typography variant="body2">{t("auth.terms.accept")}</Typography>}
                    sx={{
                        userSelect: "none",
                        mt: 1,
                        "& .MuiTypography-root": { fontSize: "0.9rem" },
                    }}
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                <Button
                    onClick={onClose}
                    variant="text"
                    sx={{ borderRadius: 2, textTransform: "none" }}
                >
                    {t("common.actions.cancel")}
                </Button>
                <Button
                    onClick={onAccept}
                    variant="contained"
                    disabled={!checked}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        px: 3,
                        py: 1,
                        fontWeight: 600,
                    }}
                >
                    {t("common.actions.confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
