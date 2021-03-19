import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const InputText = ({ name, label, updateState, value }) => (
  <TextField
    variant="outlined"
    id={ name }
    label={ label }
    value={ value }
    onChange={ (evt) => updateState(evt.target.value) }
    inputProps={ { 'data-testid': name } }
    required
  />
);

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
};

export default InputText;
