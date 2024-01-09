import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { v4 } from "uuid";
import "leaflet/dist/leaflet.css";

import statesData from "./data.json";
import "./App.css";
import iconURL from "./assets/icon/point.png";
import { getTitleLayerAttribution } from "./utils/getTitleLayerAttribution.ts";
import {
  PATH_OPTIONS,
  POLYGON_MOUSEOUT_STYLE,
  POLYGON_MOUSEOVER_STYLE,
} from "./constants.ts";

import Info from "./components/Info/Info";
import Box from "@mui/material/Box";
import { useState } from "react";
import Form from "./components/Form/Form";
import { IRent } from "./types/modules.ts";
import { useGetRents } from "./hooks/useGetRents.ts";
import { useAddRent } from "./hooks/useAddRent.ts";
import { useGetRent } from "./hooks/useGetRent.ts";

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { markers, rents, setRents, pushRent, fetchRents } = useGetRents();
  const { addRent } = useAddRent(pushRent);
  const { fetchRent } = useGetRent((rent: IRent) => setRents([rent]));

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleSubmit = async (formData: IRent) => {
    addRent(formData);
  };

  const CENTER: LatLngExpression = [49.03859254629898, 31.451226934151457];
  const INIT_ZOOM = 6;

  const customIcon = new Icon({
    iconUrl: iconURL,
    iconSize: [38, 38],
  });

  return (
    <Box className="mainBox">
      <MapContainer center={CENTER} zoom={INIT_ZOOM} className="mapContainer">
        <TileLayer
          url={`${import.meta.env.VITE_MAP_URL}${import.meta.env.VITE_KEY}`}
          attribution={getTitleLayerAttribution()}
        />
        <MarkerClusterGroup>
          {markers.map(({ geocode, id }) => (
            <Marker
              position={geocode as LatLngExpression}
              icon={customIcon}
              key={v4()}
              eventHandlers={{
                click: () => {
                  fetchRent(id as string);
                },
              }}
            />
          ))}
        </MarkerClusterGroup>
        {statesData.features.map((state, index) => {
          const coordinates: LatLngExpression[] =
            state.geometry.coordinates[0][0].map((item) => [item[1], item[0]]);

          return (
            <Polygon
              pathOptions={PATH_OPTIONS}
              positions={coordinates}
              key={index}
              eventHandlers={{
                mouseover: (e) => {
                  const layer = e.target;
                  layer.setStyle(POLYGON_MOUSEOVER_STYLE);
                },
                mouseout: (e) => {
                  const layer = e.target;
                  layer.setStyle(POLYGON_MOUSEOUT_STYLE);
                },
              }}
            />
          );
        })}
      </MapContainer>
      <Info data={rents} />
      {isFormOpen && <Form onSubmit={handleSubmit} onCancel={toggleForm} />}
      <button className="addButton" onClick={toggleForm}>
        +
      </button>
      <button className="resetButton" onClick={fetchRents}>
        RESET
      </button>
    </Box>
  );
}
