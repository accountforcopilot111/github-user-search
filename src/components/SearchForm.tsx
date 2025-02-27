import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { useDebouncedCallback } from "use-debounce";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
});

interface SearchFormProps {
  onSubmit: (username: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
    },
  });

  const debouncedSubmit = useDebouncedCallback((value: string) => {
    onSubmit(value);
  }, 2000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue("username", value);
    debouncedSubmit(value);
  };

  return (
    <TextField
      label="GitHub Username"
      variant="outlined"
      fullWidth
      {...register("username")}
      onChange={handleChange}
      error={!!errors.username}
      helperText={errors.username?.message}
    />
  );
};
