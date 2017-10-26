import React from 'react';
import ChipInput from './ChipInput';
import FrontMatterTextfield from './FrontMatterTextfield';

export default props => [
  <ChipInput
    key="1"
    id="ingredients"
    onChange={ingredients => props.onChange({ ingredients })}
    chipData={props.ingredients}
  />,
  <FrontMatterTextfield
    key="2"
    id="instructions"
    multiline
    rows={2}
    rowsMax={5}
    {...props}
  />,
  <FrontMatterTextfield key="3" id="preptime" inputType="number" {...props} />,
  <FrontMatterTextfield key="4" id="cooktime" inputType="number" {...props} />,
  <FrontMatterTextfield key="5" id="recipeyield" {...props} />,
  <FrontMatterTextfield key="6" id="servingsize" {...props} />,
  <FrontMatterTextfield key="7" id="calories" inputType="number" {...props} />,
  <FrontMatterTextfield
    key="8"
    id="fatcontent"
    inputType="number"
    {...props}
  />,
];
