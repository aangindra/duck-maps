import React, { forwardRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "./CustomInput.styles";

const CustomInput = forwardRef((props, ref) => {
  const { value, onChange, children, onClear } = props;
  const { classes } = useStyles();

  return (
    <div ref={ref}>
      <Paper className={classes.paper} component="form">
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          value={value}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search your place (min. 3 characters)"
          inputProps={{ "aria-label": "search your place" }}
          onChange={onChange}
          id="searchInputField"
          autoComplete={"off"}
        />
        {onClear && (
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="close"
            onClick={onClear}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Paper>
      {children}
    </div>
  );
});

export default CustomInput;
