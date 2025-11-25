import useNavbarHeight from "@/shared/hooks/useNavbarHeight";
import {
  Container,
  Typography,
  Box,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { HeroEventsFilterCTA } from "./HeroEventsFilterCTA";


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
        alignItems: { xs: "flex-start", md: "center" },
        overflow: "hidden",
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "50%",
          height: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(100px)",
          animation: "pulse 8s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": {
              opacity: 1,
              transform: "scale(1)",
            },
            "50%": {
              opacity: 0.8,
              transform: "scale(1.1)",
            },
          },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: "40%",
          height: "40%",
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.06)} 0%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "pulse 10s ease-in-out infinite reverse",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${alpha(theme.palette.divider, 0.03)} 1px, transparent 1px),
                            linear-gradient(90deg, ${alpha(theme.palette.divider, 0.03)} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          pt: { xs: 10, md: 0 },
          pb: { xs: 6, md: 0 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 8 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Box
            flex={1}
            sx={{
              animation: "fadeInLeft 0.8s ease-out",
              "@keyframes fadeInLeft": {
                from: {
                  opacity: 0,
                  transform: "translateX(-30px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >


            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.2rem", sm: "2.7rem", md: "3.6rem" },
                lineHeight: { xs: 1.15, md: 1.1 },
                mb: { xs: 2.5, md: 3 },
                letterSpacing: "-0.02em",
                wordBreak: "break-word",
              }}
            >
              <Box
                component="span"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("hero.title")}
              </Box>
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: { xs: 3, md: 4 },
                maxWidth: { xs: "100%", sm: "520px", md: "600px" },
                color: "text.secondary",
                lineHeight: 1.65,
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.22rem" },
                fontWeight: 400,
              }}
            >
              {t("hero.subtitle")}
            </Typography>
            <HeroEventsFilterCTA />
          </Box>

          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
              animation: "fadeInRight 0.8s ease-out",
              "@keyframes fadeInRight": {
                from: {
                  opacity: 0,
                  transform: "translateX(30px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: { xs: 260, sm: 320, md: 500 },
                height: { xs: 260, sm: 320, md: 500 },
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.05)} 50%, transparent 70%)`,
                animation: "float 6s ease-in-out infinite",
                "@keyframes float": {
                  "0%, 100%": {
                    transform: "translateY(0px) scale(1)",
                  },
                  "50%": {
                    transform: "translateY(-20px) scale(1.05)",
                  },
                },
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: { xs: 300, sm: 360, md: 550 },
                height: { xs: 300, sm: 360, md: 550 },
                borderRadius: "50%",
                border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                animation: "rotate 20s linear infinite",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "10%",
                  left: "50%",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: theme.palette.primary.main,
                  boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.6)}`,
                },
                "@keyframes rotate": {
                  from: { transform: "rotate(0deg)" },
                  to: { transform: "rotate(360deg)" },
                },
              }}
            />

            <Box
              component="img"
              src="/hero/illustration.png"
              alt="Hero illustration"
              loading="eager"
              fetchPriority="high"
              sx={{
                width: { xs: "78%", sm: "70%", md: "85%" },
                maxWidth: { xs: 240, sm: 320, md: 400 },
                position: "relative",
                zIndex: 1,
                filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.15))",
                animationDelay: "0.5s",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "15%",
                right: "10%",
                width: "60px",
                height: "60px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                backdropFilter: "blur(10px)",
                animation: "float 4s ease-in-out infinite",
                animationDelay: "1s",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "20%",
                left: "5%",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.1)})`,
                backdropFilter: "blur(10px)",
                animation: "float 5s ease-in-out infinite reverse",
                animationDelay: "0.5s",
              }}
            />
          </Box>
        </Stack>
      </Container>

      <Box
        component="svg"
        viewBox="0 0 1440 100"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          transform: "translateY(1px)",
        }}
      >
        <path
          fill={alpha(theme.palette.primary.main, 0.03)}
          d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,74.7C1248,75,1344,53,1392,42.7L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
        ></path>
      </Box>
    </Box>
  );
}
