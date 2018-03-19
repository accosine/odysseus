import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import classnames from 'classnames';
import Editor from './Editor';
import FixedButton from './FixedButton';
import SaveIcon from 'material-ui-icons/Save';
import { CircularProgress } from 'material-ui/Progress';
import Preview from './Preview';
import Shortcodes from './Shortcodes';
import FrontMatter from './FrontMatter';
import connectFirebase from '../util/connect-firebase';

const styleSheet = theme => ({
  root: {
    padding: '0 30px 47px 30px',
    flexGrow: 1,
    flexShrink: 1,
    height: 'fit-content',
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  row: {
    margin: 0,
  },
  paper: {
    padding: 10,
    color: theme.palette.text.secondary,
    height: '100%',
  },
  title: {
    textAlign: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  progress: {
    position: 'absolute',
  },
});

class SplitScreen extends Component {
  state = {
    loading: false,
    isSaving: false,
    caretPosition: { start: 0, end: 0 },
    frontmatterExpanded: this.props.match.params.slug ? false : true,
    content: '',
    date: '',
    datemodified: '',
    title: '',
    author: '',
    description: '',
    collection: '',
    headline: '',
    subline: '',
    layout: '',
    type: '',
    picture: '',
    attribution: '',
    alt: '',
    slug: '',
    // recipe
    ingredients: [],
    instructions: '',
    preptime: '',
    cooktime: '',
    recipeyield: '',
    servingsize: '',
    calories: '',
    fatcontent: '',
    // review
    itemtype: '',
    itemname: '',
    director: '',
    releasedate: '',
    wikipediaurl: '',
    rating: '',
    verdict: '',
    reviewbody: '',
  };

  subscribe = slug => {
    const { firebase, match: { params: { kind } } } = this.props;
    this.firestoreUnsubscribe = firebase.firestore
      .collection(kind === 'article' ? 'articles' : 'pages')
      .doc(slug)
      .onSnapshot(snapshot =>
        this.setState({
          loading: false,
          ...(snapshot.exists ? snapshot.data() : {}),
        })
      );
  };

  componentDidMount() {
    const { match: { params: { slug } } } = this.props;
    if (slug) {
      this.subscribe(slug);
    }
  }

  componentWillUnmount() {
    // Remove database change listener
    if (this.props.match.params.slug) {
      this.firestoreUnsubscribe();
    }
  }

  onEdit = (text, caretPosition) => {
    this.setState({ content: text, caretPosition });
  };

  onCaretPosition = caretPosition => {
    this.setState({ caretPosition });
  };

  onFrontmatterExpand = () => {
    this.setState({ frontmatterExpanded: !this.state.frontmatterExpanded });
  };

  onSave = () => {
    const {
      caretPosition,
      frontmatterExpanded,
      isSaving,
      loading,
      ...contentState
    } = this.state;
    const {
      history,
      firebase: { firestore },
      match: { params: { kind } },
    } = this.props;
    this.setState(
      {
        isSaving: true,
      },
      () => {
        firestore
          .collection(kind === 'article' ? 'articles' : 'pages')
          .doc(contentState.slug)
          .set(contentState)
          .then(() => {
            this.setState({ isSaving: false });
            history.replace(
              `/editor/${kind === 'page' ? 'page/' : 'article/'}${
                contentState.slug
              }`
            );
          });
        // subscribe to slug ref if article is new
        if (!this.firestoreUnsubscribe) {
          this.subscribe(contentState.slug);
        }
      }
    );
  };

  onShortcode = shortcodeText => {
    // Get caret position, slice text till caret position, add shortcode in
    // between, append the rest of the slice and set state to new text.
    const { content, caretPosition } = this.state;
    const newText =
      content.slice(0, caretPosition.start) +
      shortcodeText +
      content.slice(caretPosition.end, content.length);
    this.setState({ content: newText });
  };

  handleFrontmatterChange = change => this.setState(change);

  render() {
    const { classes, match: { params: { slug, kind } } } = this.props;
    const {
      frontmatterExpanded,
      caretPosition,
      isSaving,
      loading,
      content,
      ...frontmatter
    } = this.state;

    return (
      <Grid container spacing={0} direction="column" className={classes.root}>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: frontmatterExpanded,
          })}
          onClick={this.onFrontmatterExpand}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Grid container className={classes.row} spacing={8}>
          <Grid item xs={12}>
            <Collapse in={frontmatterExpanded}>
              <Typography variant="headline">Frontmatter</Typography>
              <FrontMatter
                {...frontmatter}
                kind={kind}
                disableSlug={!!slug}
                onChange={this.handleFrontmatterChange}
              />
            </Collapse>
          </Grid>
        </Grid>
        <Grid container className={classes.row} spacing={8}>
          <Grid item xs={12}>
            <Paper>
              <Shortcodes onShortcode={this.onShortcode} />
            </Paper>
          </Grid>
        </Grid>
        <Grid
          className={classnames(classes.container, classes.row)}
          container
          spacing={8}
        >
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography
                variant="headline"
                className={classes.title}
                gutterBottom
              >
                Markdown
              </Typography>
              <Divider />
              <Editor
                text={content}
                onCaretPosition={this.onCaretPosition}
                onEdit={this.onEdit}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography
                variant="headline"
                gutterBottom
                className={classes.title}
              >
                Preview
              </Typography>
              <Divider />
              <Preview text={content} kind={kind} {...frontmatter} />
            </Paper>
          </Grid>
        </Grid>
        <FixedButton onClick={this.onSave} disabled={isSaving} position="right">
          <SaveIcon />
          {isSaving && (
            <CircularProgress size={60} className={classes.progress} />
          )}
        </FixedButton>
      </Grid>
    );
  }
}

SplitScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(connectFirebase(SplitScreen));
