import { makeStyles } from "tss-react/mui";

export const styles = (theme) => ({
  title: {
    cursor: "pointer",
    "&:hover": {
      color: "#3d4042",
    },
  },
  sidebarContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#fff",
    zIndex: 99,
    overflow: "scroll",
  },
  rowColumn: {
    display: "flex",
    columnGap: "1rem",
    marginBottom: "1rem",
  },
});

export default makeStyles()(styles);
