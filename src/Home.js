import React, { useState, useCallback, useEffect } from "react";
import Map from "google-map-react";
import RoomIcon from "@mui/icons-material/Room";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { getPlaces } from "./store/actions/placeAction";
import useStyles from "./Home.styles";
import CustomInput from "./components/CustomInput";
import { MAPS } from "./constants";

const Marker = () => (
  <div>
    <RoomIcon sx={{ color: "#ea4336" }} />
  </div>
);

const SearchResult = ({ classes, data }) => {
  return data && data.length ? (
    <div className={classes.searchResult}>
      {data.map((item) => (
        <div className={classes.searchList}>
          {/* <AccessTimeIcon /> */}
          <RoomIcon sx={{ color: "#a8a8a8" }} />
          <span>{item.description}</span>
        </div>
      ))}
    </div>
  ) : null;
};

const Home = () => {
  const userLocation = useSelector((state) => state.user.userLocation);
  const places = useSelector((state) => state.place.places);
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const defaultProps = {
    zoom: 11,
  };

  const placeData = {
    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    location: `${userLocation.lat},${userLocation.lng}`,
    input: search,
    language: "en",
    types: "establishment",
    radius: 5000,
  };

  useEffect(() => {
    if (search.length >= 3) {
      dispatch(getPlaces(placeData));
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSearchDebounce = useCallback(debounce(handleSearch, 1000), []);

  return (
    <div className={classes.container}>
      <div className={classes.searchWrapper}>
        <CustomInput
          onChange={handleSearchDebounce}
          children={<SearchResult classes={classes} data={places} />}
        />
      </div>
      <Map
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={MAPS.defaultLocation}
        defaultZoom={defaultProps.zoom}
      >
        <Marker lat={MAPS.defaultLocation.lat} lng={MAPS.defaultLocation.lng} />
      </Map>
    </div>
  );
};

export default Home;
