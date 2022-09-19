import React, { forwardRef, Fragment } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { noop } from "lodash";
import useStyles from "./CustomInput.styles";

const CustomInput = forwardRef((props, ref) => {
  const {
    value,
    children,
    onClear = noop,
    onChange = noop,
    onClickSearch = noop,
  } = props;
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
          onKeyDown={(e) => {
            if (e && e.keyCode === 13 && value && value.length >= 3) {
              e.preventDefault();
              onClickSearch(value)();
            }
          }}
          id="searchInputField"
          autoComplete={"off"}
        />
        {value && value.length >= 3 && (
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={() => {
              onClickSearch(value)();
            }}
          >
            <SearchIcon />
          </IconButton>
        )}
        {onClear && (
          <Fragment>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="close"
              onClick={onClear}
            >
              <CloseIcon />
            </IconButton>
          </Fragment>
        )}
      </Paper>
      {children}
    </div>
  );
});

export default CustomInput;
