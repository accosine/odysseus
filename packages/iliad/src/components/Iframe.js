import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styleSheet = {
  container: {
    height: '100%',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
    background: 'white',
  },
  hidden: {
    visibility: 'hidden',
  },
};

class Iframe extends Component {
  state = {
    scrollY: 0,
  };

  componentDidMount() {
    this.updateIframe();
  }

  componentDidUpdate() {
    this.updateIframe();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.html !== this.props.html;
  }

  createIframe = () => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute(
      'class',
      classnames(this.props.classes.iframe, this.props.classes.hidden)
    );
    iframe.setAttribute('title', 'preview');
    return iframe;
  };

  updateIframe = () => {
    const iframe = this.createIframe();
    this.container.appendChild(iframe);

    const iframeDocument = iframe.contentDocument;
    iframeDocument.open();
    iframeDocument.write('');
    iframeDocument.write(this.props.html);
    iframeDocument.close();
    iframeDocument.addEventListener('scroll', event =>
      this.setState({ scrollY: event.target.scrollingElement.scrollTop })
    );
    iframe.contentWindow.onload = () => {
      if (this.container.children.length === 2) {
        this.container.removeChild(this.container.firstChild);
      }
      iframe.className = classnames(this.props.classes.iframe);
      iframe.contentWindow.scrollTo(0, this.state.scrollY);
    };
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container} ref={ref => (this.container = ref)} />
    );
  }
}

Iframe.propTypes = {
  html: PropTypes.string.isRequired,
};
export default withStyles(styleSheet)(Iframe);
