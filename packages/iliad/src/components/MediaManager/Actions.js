import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  container: {
    paddingRight: '70px',
  },
};

const TabContainer = props => (
  <div style={{ padding: 24 }}>{props.children}</div>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class MediaManagerActions extends Component {
  static contextTypes = {
    mediamanager: PropTypes.shape({
      multiple: PropTypes.bool.isRequired,
      onInsert: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired,
      onSelection: PropTypes.func.isRequired,
      onCarouselSettings: PropTypes.func.isRequired,
      handleTabChange: PropTypes.func.isRequired,
      index: PropTypes.number.isRequired,
      selection: PropTypes.array.isRequired,
      carouselSettings: PropTypes.shape({
        autoplay: PropTypes.bool.isRequired,
        loop: PropTypes.bool.isRequired,
        controls: PropTypes.bool.isRequired,
        delay: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  render() {
    const {
      mediamanager: { index, selection, onInsert, onCancel },
    } = this.context;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        {index > 0 && (
          <Button disabled={!selection.length} onClick={onInsert}>
            Insert
          </Button>
        )}
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    );
  }
}

export default withStyles(styleSheet)(MediaManagerActions);
