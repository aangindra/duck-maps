import React from "react";
import lodash from "lodash";
import RoomIcon from "@mui/icons-material/Room";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";
import { AnimatePresence, motion } from "framer-motion";

const PlaceDetail = ({ open, data }) => {
  const isPlaceOpen = lodash.get(data, "opening_hours.open_now", false);
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
            // transition: { delay: 0.5, duration: 0.3 },
          }}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "#fff",
            zIndex: 99,
          }}
        >
          <div style={{ marginTop: "8rem", padding: "0 1.5rem" }}>
            <h2>{data.name}</h2>
            {data.formatted_address && (
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <RoomIcon />
                <span>{data.formatted_address}</span>
              </div>
            )}
            {data.opening_hours && (
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <AccessTimeIcon />
                {!isPlaceOpen ? (
                  <span style={{ color: "#188038" }}>Open</span>
                ) : (
                  <span style={{ color: "#d93025" }}>Close</span>
                )}
              </div>
            )}
            {data.formatted_phone_number && (
              <div
                style={{
                  display: "flex",
                  columnGap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <PhoneIcon />
                <span>{data.formatted_phone_number}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
      ;
    </AnimatePresence>
  );
};

export default PlaceDetail;
