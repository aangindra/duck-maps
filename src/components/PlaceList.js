import React, { Fragment } from "react";
import { noop } from "lodash";
import RoomIcon from "@mui/icons-material/Room";
import useStyles from "./PlaceList.style";
import { AnimatePresence, motion } from "framer-motion";
import Divider from "@mui/material/Divider";

const PlaceList = ({ open, data, onSelectPlace = noop }) => {
  const { classes } = useStyles();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: 430,
          }}
          exit={{
            width: 0,
            transition: { delay: 0.5, duration: 0.3 },
          }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#fff",
            zIndex: 99,
            overflow: "scroll",
          }}
        >
          {data.map((item, index) => (
            <Fragment key={item.place_id}>
              <div
                style={{
                  marginTop: index === 0 ? "6rem" : 0,
                  padding: "0 1.5rem",
                }}
                onClick={onSelectPlace(item)}
              >
                <h2 className={classes.title}>
                  {item.structured_formatting.main_text}
                </h2>
                {item.structured_formatting.secondary_text && (
                  <div
                    style={{
                      display: "flex",
                      columnGap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <RoomIcon />
                    <span>{item.structured_formatting.secondary_text}</span>
                  </div>
                )}
              </div>
              <Divider light />
            </Fragment>
          ))}
        </motion.div>
      )}
      ;
    </AnimatePresence>
  );
};

export default PlaceList;
