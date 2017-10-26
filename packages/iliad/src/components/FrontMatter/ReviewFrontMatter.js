import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import FrontMatterTextfield from './FrontMatterTextfield';

export default props => [
  <FormControl key="1" margin="normal">
    <InputLabel htmlFor="itemtype">type</InputLabel>
    <Select
      value={props.itemtype}
      onChange={event => props.onChange({ itemtype: event.target.value })}
      input={<Input id="itemtype" />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value="movie">Movie</MenuItem>
      <MenuItem value="book">Book</MenuItem>
      ))}
    </Select>
  </FormControl>,
  <FrontMatterTextfield key="2" id="itemname" {...props} />,
  <FrontMatterTextfield key="3" id="director" {...props} />,
  <FrontMatterTextfield key="4" id="releasedate" inputType="date" {...props} />,
  <FrontMatterTextfield key="5" id="wikipediaurl" {...props} />,
  <FrontMatterTextfield key="6" id="rating" {...props} />,
  <FrontMatterTextfield key="7" id="verdict" {...props} />,
  <FrontMatterTextfield key="8" id="reviewbody" {...props} />,
];
