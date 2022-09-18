import React, {
  useState,
  forwardRef,
  useRef,
  useEffect,
  useImperativeHandle,
} from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import useStyles from "./CustomInput.styles";

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const [isFocusInput, setIsFocusInput] = useState(false);
  const { onChange, children } = props;
  const { classes } = useStyles();

  useImperativeHandle(ref, () => ({
    isFocused: document.activeElement === inputRef.current,
  }));

  return (
    <div ref={ref}>
      <Paper className={classes.paper} component="form">
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search your place (min. 3 characters)"
          inputProps={{ "aria-label": "search your place" }}
          onChange={onChange}
          onFocus={(e) => setIsFocusInput(true)}
          id="searchInputField"
          autoComplete={"off"}
          ref={inputRef}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {children}
    </div>
  );
});

export default CustomInput;
