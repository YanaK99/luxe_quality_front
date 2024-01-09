import Stack from "@mui/material/Stack";
import style from "./style.module.css";
import Card from "../Card/Card";
import { IRent } from "../../types/modules.ts";

const Info = ({ data }: { data: IRent[] }) => {
  return (
    <Stack className={style.infoContainer} spacing={2}>
      {data &&
        data.map((rent) => {
          return (
            <Card
              name={rent.name}
              price={rent.price}
              description={rent.description}
              photo={rent.photo}
              key={rent._id}
            />
          );
        })}
    </Stack>
  );
};

export default Info;
