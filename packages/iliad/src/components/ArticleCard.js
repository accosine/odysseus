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
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '20%',
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
        <CardContent className={classes.content}>
          <Typography align="left" variant="headline">
            {title}
          </Typography>
          <Typography align="left" variant="subheading">
            {headline}
          </Typography>
          <Typography align="left" variant="caption">
            {description}
          </Typography>
        </CardContent>
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
