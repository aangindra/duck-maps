import { makeStyles } from "tss-react/mui";

export const styles = (theme) => ({
  title: {
    cursor: "pointer",
    "&:hover": {
      color: "#3d4042",
    },
  },
});

export default makeStyles()(styles);
