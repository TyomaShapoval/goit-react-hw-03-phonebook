import { FilterInput, Label } from './Filter.styled';
import PropTypes from 'prop-types';

export default function  Filter ({ value, onChange }) {
  return (
    <Label>
      Find contacts by name
      <FilterInput
        type="text"
        name="filter"
        placeholder="Enter name"
        value={value}
        onChange={onChange}
      ></FilterInput>
    </Label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};