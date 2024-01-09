const MAP_ATTRIBUTIONS = [
  {
    link: import.meta.env.VITE_TITLE_LAYER_ATTR_1,
    name: "MapTiler",
  },
  {
    link: import.meta.env.VITE_TITLE_LAYER_ATTR_2,
    name: "OpenStreetMap contributors",
  },
];
export const getTitleLayerAttribution = () =>
  `<a href=${MAP_ATTRIBUTIONS[0].link} target="_blank">&copy; ${MAP_ATTRIBUTIONS[0].name}</a> <a href=${MAP_ATTRIBUTIONS[1].link} target="_blank">&copy; ${MAP_ATTRIBUTIONS[1].name}</a>`;
