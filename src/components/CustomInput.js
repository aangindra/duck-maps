import React, { Fragment } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import useStyles from "./CustomInput.styles";

const CustomInput = ({ onChange, children }) => {
  const { classes } = useStyles();

  return (
    <Fragment>
      <Paper className={classes.paper} component="form">
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search your place (min. 3 characters)"
          inputProps={{ "aria-label": "search your place" }}
          onChange={onChange}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {children}
    </Fragment>
  );
};

export default CustomInput;
