import { default as CardMUI } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IRent } from "../../types/modules.ts";

export default function Card(data: IRent) {
  return (
    <CardMUI sx={{ minHeight: 300, maxWidth: 345, borderRadius: 0 }}>
      <CardMedia sx={{ minHeight: 140 }} image={data.photo ?? ''} title={data.name} />
      <CardContent>
        <Typography gutterBottom component="div">
          {data.name}
        </Typography>
        <Typography gutterBottom component="div">
          {data.description}
        </Typography>
        <Typography gutterBottom component="div">
          {data.price} $
        </Typography>
      </CardContent>
    </CardMUI>
  );
}
