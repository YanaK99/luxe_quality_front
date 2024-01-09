import { ChangeEvent, FormEvent, useState } from "react";
import style from "../Form/style.module.css";
import Box from "@mui/material/Box";
import { Autocomplete, TextField } from "@mui/material";
import dataRegions from "../../data.json";
import { IRent } from "../../types/modules";

type FormProps = {
  onSubmit: (data: IRent) => void;
  onCancel: () => void;
};

export const Form = ({ onSubmit, onCancel }: FormProps) => {
  const [formData, setFormData] = useState<IRent>({
    region: "",
    name: "",
    description: "",
    photo: "",
    price: 0,
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };
  console.log(formData);
  return (
    <form onSubmit={handleSubmit}>
      <Box className={style.formContainer}>
        <h2 className={style.formTitle}>Form to adding new rent:</h2>
        <Box className={style.formItems}>
          <Autocomplete
            value={formData.region}
            onChange={(_, newValue: string | null) => {
              handleChange({
                target: {
                  value: newValue as string,
                  name: "region",
                },
              } as ChangeEvent<HTMLInputElement>);
            }}
            id="disable-close-on-select"
            options={dataRegions.features.map(
              (item) => item.properties.NL_NAME_1,
            )}
            sx={{
              width: 260,
              margin: "0 auto",
              paddingBottom: 5,
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
                backgroundColor: "rgb(58,56,56)",
                "& fieldset": {
                  borderColor: "white !important",
                },
              },
            }}
            renderInput={(params) => <TextField {...params} label="Region" />}
          />
          <label className={style.formItem}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label className={style.formItem}>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className={style.formItem}>
            Photo:
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />
          </label>
          <label className={style.formItem}>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <label className={style.formItem}>
            Latitude:
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </label>
          <label className={style.formItem}>
            Longitude:
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </label>
        </Box>
        <Box className={style.buttonBlock}>
          <button className={style.buttonItem} type="submit">
            New rent
          </button>
          <button className={style.buttonItem} type="button" onClick={onCancel}>
            Cancel
          </button>
        </Box>
      </Box>
    </form>
  );
};

export default Form;
