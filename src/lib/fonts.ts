import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../app/fonts/Inter_18pt-Thin.ttf",
      style: "normal",
      weight: "100",
    },
    {
      path: "../app/fonts/Inter_18pt-Light.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../app/fonts/Inter_18pt-ExtraLight.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../app/fonts/Inter_18pt-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../app/fonts/Inter_18pt-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../app/fonts/Inter_18pt-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../app/fonts/Inter_18pt-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../app/fonts/Inter_18pt-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../app/fonts/Inter_18pt-Black.ttf",
      style: "normal",
      weight: "900",
    },
  ],
  variable: "--font-inter",
});
