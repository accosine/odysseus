import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageCard from './ImageCard';
import CarouselSettings from './CarouselSettings';
import { withStyles } from 'material-ui/styles';
import connectFirebase from '../../util/connect-firebase';

const styleSheet = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    padding: theme.spacing.unit * 1,
  },
  card: {
    display: 'flex',
    width: '30vw',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '75%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
  },
  input: {
    margin: theme.spacing.unit,
  },
  headline: {
    textOverflow: 'ellipsis',
  },
});

class ImagePicker extends Component {
  state = {
    images: {},
    selected: [],
  };

  componentDidMount() {
    const { firebase: { CONNECT, DATABASE, REFS, ACTIONS } } = this.props;
    CONNECT('images', DATABASE, REFS, ACTIONS);
    // Add database change listener for each reference in the refs object
    REFS['images'].on('value', snapshot => {
      this.setState({ images: snapshot.val() || {} });
    });
  }

  componentWillUnmount() {
    // Remove all database change listeners
    this.props.firebase.REFS['images'].off();
  }

  addSelection = key => {
    this.setState({ selected: [...this.state.selected, key] }, () => {
      this.props.onSelection(
        this.state.selected.map(key => this.state.images[key])
      );
    });
  };

  render() {
    const {
      classes,
      carouselSettings,
      onCarouselSettings,
      multiple,
      ...rest
    } = this.props;

    return (
      <div className={classes.container}>
        {this.state.selected.length > 1 && multiple ? (
          <CarouselSettings
            onCarouselSettings={onCarouselSettings}
            carouselSettings={carouselSettings}
          />
        ) : (
          ''
        )}
        {Object.keys(this.state.images).length ? (
          Object.keys(this.state.images).map((key, index) => (
            <div key={key}>
              <ImageCard
                disabled={!multiple && this.state.selected.length >= 1}
                addSelection={this.addSelection}
                image={this.state.images[key]}
                reference={key}
                {...rest}
              />
            </div>
          ))
        ) : (
          'No images uploaded yet.'
        )}
      </div>
    );
  }
}

ImagePicker.propTypes = {
  carouselSettings: PropTypes.object.isRequired,
  onCarouselSettings: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(ImagePicker));
