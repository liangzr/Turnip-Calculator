import React, { useCallback } from "react";
import { arrayOf, string, func } from "prop-types";
import {
  TextField,
  FormGroup,
  InputAdornment,
  Button,
  Box,
  makeStyles,
} from "@material-ui/core";

const useButtonStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  label: {
    textTransform: "capitalize",
  },
}));

const ClearButton = (props) => {
  const classes = useButtonStyles();
  return (
    <Button
      classes={classes}
      disableRipple
      size="small"
      variant="contained"
      {...props}
    >
      清空数据!
    </Button>
  );
};

const names = [
  "买入价格",
  ..."周一 周二 周三 周四 周五 周六"
    .split(" ")
    .reduce((curr, day) => [...curr, ...[`${day}/上午`, `${day}/下午`]], []),
];

const Filter = ({ filters, onChange }) => {
  const handleChange = useCallback(
    (index) => ({
      target: {
        value,
        validity: { valid },
      },
    }) => {
      if (!valid) return;
      const newFilters = Array.from({ length: 13 }, (v, i) =>
        index === i ? value : filters[i]
      );
      onChange(newFilters);
    },
    [filters, onChange]
  );

  const fields = Array.from({ length: 13 }, (v, i) => i).map((index) => (
    <TextField
      key={`value-${index}`}
      type="tel"
      variant="standard"
      color="secondary"
      label={names[index]}
      fullWidth
      inputProps={{ pattern: "[0-9]*" }}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      value={filters[index] || ""}
      onChange={handleChange(index)}
    />
  ));

  return (
    <Box
      borderRadius={16}
      bgcolor="primary.light"
      display="flex"
      flexDirection="column"
    >
      <FormGroup>
        <Box
          m={2}
          p={2}
          mb={-1}
          borderRadius={16}
          bgcolor="bkgs.mainAlt"
          display="flex"
        >
          {fields[0]}
        </Box>
        <Box m={2} ml={1} mr={1} display="flex" flexWrap="wrap">
          {fields.slice(1).reduce(
            (prev, curr, index) =>
              index % 2
                ? [
                    ...prev.slice(0, -1),
                    <Box
                      key={index}
                      p={1}
                      width={{ xs: 0.5, sm: 1 / 3, md: 1 / 6 }}
                    >
                      <Box p={2} bgcolor="bkgs.mainAlt" borderRadius={16}>
                        <Box m={1}>{prev.slice(-1)}</Box>
                        <Box m={1}>{curr}</Box>
                      </Box>
                    </Box>,
                  ]
                : [...prev, curr],
            []
          )}
        </Box>
      </FormGroup>
      <Box alignSelf="flex-end" mt={-2}>
        <ClearButton
          onClick={() => {
            onChange([]);
          }}
        />
      </Box>
    </Box>
  );
};

Filter.propTypes = {
  filters: arrayOf(string).isRequired,
  onChange: func.isRequired,
};

export default Filter;
