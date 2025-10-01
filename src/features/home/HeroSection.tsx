import { Container, Typography, Button, Box, Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={8}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex={1}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "3rem" },
                lineHeight: 1.2,
                color: theme.palette.primary.main,
              }}
            >
              {t("hero.title")}
            </Typography>

            <Typography
              variant="h6"
              component="p"
              gutterBottom
              sx={{ mb: 4, maxWidth: "600px" }}
            >
              {t("hero.subtitle")}
            </Typography>

            <Button
              variant="contained"
              size="large"
              disableRipple 
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {t("hero.cta")}
            </Button>
          </Box>

          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="/hero/illustration.png"
              alt="Hero illustration"
              sx={{
                width: { xs: "100%", md: "80%" },
                maxWidth: "380px",
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
