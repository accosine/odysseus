import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withTheme = ComponentToWrap => {
  class C extends Component {
    static contextTypes = {
      theme: PropTypes.object.isRequired,
    };
    render() {
      const { theme } = this.context;
      return <ComponentToWrap {...this.props} theme={theme} />;
    }
  }
  C.displayName = `withTheme(${ComponentToWrap.displayName ||
    ComponentToWrap.name})`;
  return C;
};
export default withTheme;
