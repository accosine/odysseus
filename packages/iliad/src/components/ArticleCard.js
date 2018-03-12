import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import addSizeSuffix from '../util/addSizeSuffix';
import config from '../config.js';

const styles = theme => ({
  card: {
    display: 'flex',
    width: '80vw',
    marginBottom: theme.spacing.unit * 2,
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'transform 0.1s',
    '&:hover': {
      transform: 'translate(1px, 1px)',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '20%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
});

class MediaControlCard extends Component {
  state = {
    raised: false,
  };

  handleMouseEnter = () => this.setState({ raised: true });
  handleMouseLeave = () => this.setState({ raised: false });

  render() {
    const {
      classes,
      onClick,
      title,
      headline,
      description,
      picture,
    } = this.props;
    const { raised } = this.state;

    return (
      <Card
        raised={raised}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={classes.card}
        onClick={onClick}
      >
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline">{title}</Typography>
            <Typography type="subheading" color="secondary">
              {headline}
            </Typography>
            <Typography type="caption" color="secondary">
              {description}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={
            config.application.media +
            addSizeSuffix(picture, '-s') +
            config.application.mediasuffix
          }
        />
      </Card>
    );
  }
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
