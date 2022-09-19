import React, { Fragment } from "react";
import { noop } from "lodash";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import useStyles from "./Index.style";
import { AnimatePresence, motion } from "framer-motion";
import Divider from "@mui/material/Divider";

const PlaceList = ({ open, data, onClick = noop }) => {
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
          className={classes.sidebarContainer}
        >
          {!data ||
            (data.length < 1 && (
              <h2 style={{ marginTop: "6rem", textAlign: "center" }}>
                You don't have search history!
              </h2>
            ))}
          {data.map((item, index) => (
            <Fragment key={item.place_id}>
              <div
                style={{
                  marginTop: index === 0 ? "6rem" : 0,
                  padding: "0 1.5rem",
                }}
                onClick={onClick(item)}
              >
                <h2 className={classes.title}>{item.keyword}</h2>
                {item._createdAt && (
                  <div className={classes.rowColumn}>
                    <AccessTimeIcon />
                    <span>
                      Search At:{" "}
                      {dayjs(item._createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
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
