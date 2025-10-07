import useNavbarHeight from "@/shared/hooks/useNavbarHeight";
import { Container, Typography, Button, Box, Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navbarHeight = useNavbarHeight();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      }}
    >

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
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
              }}
            >
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("hero.title")}
              </Box>
            </Typography>

            <Typography
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

            >
              {t("hero.cta")}
            </Button>
          </Box>

          <Box flex={1} sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="/hero/illustration.png"
              alt="Hero illustration"
              sx={{
                width: { xs: "100%", md: "80%" },
                maxWidth: { xs: "200px", md: "320px" },
                filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.1))",
              }}
            />
          </Box>
        </Stack>
      </Container>

      <Box
        component="svg"
        viewBox="0 0 1440 320"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          zIndex: 0,
        }}
      >
        <path
          fill={theme.palette.primary.main}
          fillOpacity="0.1"
          d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,186.7C672,171,768,117,864,122.7C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </Box>
    </Box>
  );
}
