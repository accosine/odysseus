import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationButton,
} from 'material-ui/BottomNavigation';

import './devices.min.css';

const styles = {
  root: {
    width: 500,
    position: 'relative',
    alignSelf: 'center',
    zIndex: 1,
  },
  devices: {
    display: 'flex',
    flexDirection: 'row',
    transform: 'scale(0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const Iphone6 = withStyles({
  screen: {
    zIndex: 3,
  },
  homebutton: {
    cursor: 'pointer',
  },
})(({ children, onHome, classes }) => (
  <div className="marvel-device iphone6plus silver">
    <div className="top-bar" />
    <div className="sleep" />
    <div className="volume" />
    <div className="camera" />
    <div className="sensor" />
    <div className="speaker" />
    <div className={classnames(classes.screen, 'screen')}>{children}</div>
    <div onClick={onHome} className={classnames('home', classes.homebutton)} />
    <div className="bottom-bar" />
  </div>
));

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, children, onClose } = this.props;
    const { value } = this.state;

    return [
      <div key="1" className={classes.root}>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationButton label="Desktop" />
          <BottomNavigationButton label="iPhone 6" />
        </BottomNavigation>
      </div>,
      value === 0 ? React.cloneElement(children, { key: '2' }) : null,
      <div key="3" className={classes.devices}>
        {value === 1 ? <Iphone6 onHome={onClose}>{children}</Iphone6> : null}
      </div>,
    ];
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
