import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import FixedButton from './FixedButton';
import Dialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import FullscreenExitIcon from 'material-ui-icons/FullscreenExit';
import theme from 'nausicaa';
import config from '../config.js';

import DevicePreview from './DevicePreview';
import Iframe from './Iframe';

const styleSheet = {
  container: {
    width: '100%',
    height: '90%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
    background: 'white',
  },
};

class Preview extends Component {
  state = {
    fullscreen: false,
    preview: '',
  };

  renderTimeout = null;

  componentDidMount() {
    this.updatePreview();
  }

  componentDidUpdate() {
    this.updatePreview();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.preview !== nextState.preview ||
      this.state.fullscreen !== nextState.fullscreen ||
      this.props.text !== nextProps.text ||
      this.props.title !== nextProps.title ||
      this.props.author !== nextProps.author ||
      this.props.description !== nextProps.description ||
      this.props.collection !== nextProps.collection ||
      this.props.headline !== nextProps.headline ||
      this.props.subline !== nextProps.subline ||
      this.props.layout !== nextProps.layout ||
      this.props.type !== nextProps.type ||
      this.props.picture !== nextProps.picture ||
      this.props.attribution !== nextProps.attribution ||
      this.props.alt !== nextProps.alt ||
      this.props.slug !== nextProps.slug
    );
  }

  updatePreview = () => {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }

    this.renderTimeout = setTimeout(() => {
      const { text, ...frontmatter } = this.props;
      let preview;
      try {
        preview = theme(text, frontmatter, config);
      } catch (error) {
        console.log(error);
        preview = '';
      }
      this.setState({ preview });
    }, this.props.renderDelay);
  };

  render() {
    const { classes } = this.props;
    const { fullscreen, preview } = this.state;
    return [
      <div key="1" className={classes.container}>
        {fullscreen ? (
          <FixedButton
            position="left"
            onClick={() => this.setState({ fullscreen: false })}
          >
            <FullscreenExitIcon />
          </FixedButton>
        ) : (
          [
            <Iframe key="1" html={preview} />,
            <FixedButton
              key="2"
              position="left"
              onClick={() => this.setState({ fullscreen: true })}
            >
              <FullscreenIcon />
            </FixedButton>,
          ]
        )}
      </div>,
      fullscreen ? (
        <Dialog
          key="2"
          fullScreen
          open
          onRequestClose={() => this.setState({ fullscreen: false })}
          transition={<Slide direction="up" />}
        >
          <DevicePreview onClose={() => this.setState({ fullscreen: false })}>
            <Iframe html={preview} />
          </DevicePreview>
        </Dialog>
      ) : null,
    ];
  }
}

Preview.defaultProps = {
  renderDelay: 750,
};

Preview.propTypes = {
  text: PropTypes.string.isRequired,
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
  renderDelay: PropTypes.number.isRequired,
};

export default withStyles(styleSheet)(Preview);
