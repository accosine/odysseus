import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import FrontMatterTextfield from './FrontMatterTextfield';
import FrontMatterImagePicker from './FrontMatterImagePicker';
import config from '../../config';

import RecipeFrontMatter from './RecipeFrontMatter';
import ReviewFrontMatter from './ReviewFrontMatter';
import VideoFrontMatter from './VideoFrontMatter';

const { authors, collections, layouts, types } = config.application;

const styleSheet = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

// TODO: add date and date modified to frontmatter

const FrontMatter = ({ itemtype, disableSlug, ...props }) => (
  <div className={props.classes.container}>
    <FrontMatterImagePicker
      onInsert={selected => {
        props.onChange({ picture: selected.name });
        props.onChange({ attribution: selected.attribution });
        props.onChange({ alt: selected.alt });
      }}
    />
    <FrontMatterTextfield id="title" {...props} />
    <FormControl margin="normal">
      <InputLabel htmlFor="author">author</InputLabel>
      <Select
        value={props.author}
        onChange={event => props.onChange({ author: event.target.value })}
        input={<Input id="author" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(authors).map(author => (
          <MenuItem key={author} value={author}>
            {authors[author].name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FrontMatterTextfield id="description" {...props} />
    <FormControl margin="normal">
      <InputLabel htmlFor="collection">collection</InputLabel>
      <Select
        value={props.collection}
        onChange={event => props.onChange({ collection: event.target.value })}
        input={<Input id="collection" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(collections).map(collection => (
          <MenuItem key={collection} value={collection}>
            {collections[collection].name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FrontMatterTextfield id="headline" {...props} />
    <FrontMatterTextfield id="subline" {...props} />
    <FormControl margin="normal">
      <InputLabel htmlFor="layout">layout</InputLabel>
      <Select
        value={props.layout}
        onChange={event => props.onChange({ layout: event.target.value })}
        input={<Input id="layout" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(layouts).map(layout => (
          <MenuItem key={layout} value={layout}>
            {layout}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl margin="normal">
      <InputLabel htmlFor="type">type</InputLabel>
      <Select
        value={props.type}
        onChange={event => props.onChange({ type: event.target.value })}
        input={<Input id="type" />}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {Object.keys(types).map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FrontMatterTextfield id="picture" {...props} />
    <FrontMatterTextfield id="attribution" {...props} />
    <FrontMatterTextfield id="alt" {...props} />
    <FrontMatterTextfield disabled={disableSlug} id="slug" {...props} />
    {props.type === 'review' ? (
      <ReviewFrontMatter {...props} itemtype={itemtype} />
    ) : props.type === 'recipe' ? (
      <RecipeFrontMatter {...props} />
    ) : props.type === 'video' ? (
      <VideoFrontMatter {...props} />
    ) : null}
  </div>
);

FrontMatter.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  subline: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  attribution: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  disableSlug: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(FrontMatter);
