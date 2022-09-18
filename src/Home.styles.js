import { makeStyles } from "tss-react/mui";
import { alpha } from "@mui/material";

export const styles = (theme) => ({
  container: {
    height: "100vh",
    width: "100%",
    position: "relative",
  },
  searchWrapper: {
    position: "absolute",
    zIndex: 99999,
    top: 16,
    left: 16,
    width: 400,
  },
  searchResult: {
    backgroundColor: "#fff",
    marginTop: theme.spacing(0.1),
    padding: theme.spacing(1.5, 0),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    boxShadow: "0 2px 4px rgb(0 0 0 / 20%)",
  },
  savedKeyword: {
    backgroundColor: "#fff",
    marginTop: theme.spacing(0.1),
    padding: theme.spacing(1.5, 0),
    boxShadow: "0 2px 4px rgb(0 0 0 / 20%)",
  },
  searchList: {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
    padding: theme.spacing(0.8, 2),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: alpha("#3d4042", 0.04),
    },

    "& span": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});

export default makeStyles()(styles);
