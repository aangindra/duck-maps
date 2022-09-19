import React, { useState, useEffect, useRef } from "react";
import Map from "google-map-react";
import RoomIcon from "@mui/icons-material/Room";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { orderBy, get } from "lodash";
import { getPlaces, getPlaceDetails } from "./store/actions/placeAction";
import { PLACE } from "./store/actions/actionTypes";
import useStyles from "./Home.styles";
import CustomInput from "./components/CustomInput";
import PlaceDetail from "./components/PlaceDetail";
import PlaceList from "./components/PlaceList";

const Marker = () => (
  <div>
    <RoomIcon sx={{ color: "#ea4336" }} />
  </div>
);

const SavedKeyword = ({ classes, data, placeData, onSelectKeyword }) => {
  return data && data.length ? (
    <div
      className={classes.savedKeyword}
      style={placeData.length ? { paddingBottom: 0 } : {}}
    >
      {orderBy(data, ["_createdAt"], ["desc"])
        .slice(0, 3)
        .map((item, index) => (
          <div
            className={classes.searchList}
            key={`${item.keyword}_${index}`}
            onClick={onSelectKeyword(item.keyword)}
          >
            <AccessTimeIcon sx={{ color: "#a8a8a8" }} />
            <span>{item.keyword}</span>
          </div>
        ))}
    </div>
  ) : null;
};

const SearchResult = ({ classes, data, savedKeywords, onSelectPlace }) => {
  return data && data.length ? (
    <div
      className={classes.searchResult}
      style={
        savedKeywords.length
          ? { marginTop: 0, paddingTop: 0, paddingBottom: "12px" }
          : {}
      }
    >
      {data.map((item) => (
        <div
          className={classes.searchList}
          onClick={onSelectPlace(item)}
          key={item.place_id}
        >
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
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const savedKeywords = useSelector((state) => state.place.savedKeywords);
  const containerRef = useRef(null);
  const searchWrapperRef = useRef(null);
  const customInputRef = useRef(null);
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenPlaceList, setIsOpenPlaceList] = useState(false);

  const defaultProps = {
    zoom: 14,
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
    const searchInput = document.getElementById("searchInputField");
    const handleClickOutside = ({ target }) => {
      if (
        searchWrapperRef.current.contains(target) ||
        containerRef.current.contains(target)
      ) {
        if (!searchInput.contains(target)) {
          setIsOpenDropdown(false);
        }
        return;
      }
    };
    document.addEventListener("click", handleClickOutside);

    const handleSearchInputFocus = ({ target }) => {
      setIsOpenDropdown(true);
    };
    if (searchInput) {
      searchInput.addEventListener("focus", handleSearchInputFocus);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleSearchInputFocus);
    };
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    if (value.length >= 3) {
      setIsOpenDropdown(true);
      dispatch(getPlaces(placeData));
    } else {
      setIsOpenDropdown(false);
    }
  };

  const onSelectPlace = (place) => (e) => {
    const payload = {
      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      place_id: place.place_id,
      keyword: search,
    };
    dispatch(getPlaceDetails(payload));
    setSearch(place.description);
    if (place.place_id) {
      setIsOpenPlaceList(false);
    }
  };

  const handleClearInput = () => {
    dispatch({
      type: PLACE.UPDATE_SELECTED_LOCATION,
      payload: null,
    });
    setSearch("");
    setIsOpenDropdown(false);
    setIsOpenPlaceList(false);
  };

  const onSelectKeyword = (keyword) => (e) => {
    placeData.input = keyword;
    dispatch(getPlaces(placeData));
    setIsOpenDropdown(false);
    setIsOpenPlaceList(true);
  };

  return (
    <div className={classes.container} ref={containerRef}>
      <PlaceDetail data={selectedPlace} open={selectedPlace} />
      <PlaceList
        open={isOpenPlaceList}
        data={places}
        onSelectPlace={onSelectPlace}
      />
      <div className={classes.searchWrapper} ref={searchWrapperRef}>
        <CustomInput
          ref={customInputRef}
          value={search}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onClickSearch={onSelectKeyword}
          children={
            isOpenDropdown ? (
              <div>
                <SavedKeyword
                  classes={classes}
                  data={savedKeywords}
                  placeData={places}
                  keyword={search}
                  onSelectKeyword={onSelectKeyword}
                />
                <SearchResult
                  classes={classes}
                  data={places}
                  savedKeywords={savedKeywords}
                  onSelectPlace={onSelectPlace}
                />
              </div>
            ) : null
          }
          onClear={selectedPlace || isOpenPlaceList ? handleClearInput : null}
        />
      </div>
      <Map
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={get(selectedPlace, "geometry.location", userLocation)}
        defaultCenter={userLocation}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={get(selectedPlace, "geometry.location", userLocation).lat}
          lng={get(selectedPlace, "geometry.location", userLocation).lng}
        />
      </Map>
    </div>
  );
};

export default Home;
