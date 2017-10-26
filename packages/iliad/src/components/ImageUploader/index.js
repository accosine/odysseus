import React, { Component } from 'react';
import { DragDropContext, DragDropContextProvider } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';
import FileList from './FileList';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import SaveIcon from 'material-ui-icons/Save';
import connectFirebase from '../../util/connect-firebase';

const styleSheet = {
  savebutton: {
    position: 'absolute',
  },
  wrapper: {
    position: 'relative',
  },
  progress: {
    top: -2,
    left: -2,
    position: 'absolute',
    color: green[500],
  },
};

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppedFiles: [],
      upload: 0,
      isUploading: false,
      images: '',
    };
  }

  componentDidMount() {
    const { firebase: { CONNECT, DATABASE, ACTIONS, REFS } } = this.props;
    // Add database change listener for each reference in the refs object
    CONNECT('images', DATABASE, REFS, ACTIONS);
    REFS['images'].on('value', snapshot => {
      this.setState({ images: snapshot.val() });
    });
  }

  componentWillUnmount() {
    // Remove all database change listeners
    this.props.firebase.REFS['images'].off();
  }

  uploadFiles = files => {
    const { firebase: { DATABASE, REFS, STORAGE } } = this.props;
    this.setState({ isUploading: true });
    const timestamp = Date.now();
    const incrementUpload = cb =>
      this.setState({ upload: this.state.upload + 1 }, cb);
    const switchTabIfReady = (tabnumber, arrlength) => {
      if (this.state.upload === arrlength) {
        this.props.switchTab(null, tabnumber);
      }
    };
    const writeNewImage = (imageData, newImageKey) => {
      var updates = {};
      updates['/images/' + newImageKey] = imageData;

      return DATABASE.ref().update(updates);
    };
    const fileext = type => {
      let extension;
      switch (type) {
        case 'image/jpeg':
          extension = '.jpg';
          break;
        case 'image/gif':
          extension = '.gif';
          break;
        case 'image/png':
          extension = '.png';
          break;
        default:
      }
      return extension;
    };
    // TODO: conveniece function which adds file extension
    // TODO: write file name and file tags to firebase
    const storageRef = STORAGE.ref();
    const uploadTasks = files.map(file => {
      // Get a key for a new image
      var newImageKey = REFS['images'].push().key;
      console.log(newImageKey);

      return storageRef
        .child(`${file.newname}` + timestamp + fileext(file.type))
        .put(file, { customMetadata: { dbkey: newImageKey } })
        .then(function(snapshot) {
          incrementUpload(() => {
            switchTabIfReady(1, files.length);
          });
          writeNewImage(
            {
              name: file.newname + timestamp + fileext(file.type),
              attribution: file.newattribution,
              caption: file.newcaption,
              alt: file.newalttext,
              width: file.width,
              height: file.height,
            },
            newImageKey
          );
          console.log(snapshot);
          console.log('Uploaded an image!');
        })
        .catch(console.log);
    });
  };

  handleFileDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.setState({ droppedFiles });
    }
  };

  render() {
    const { FILE } = NativeTypes;
    const { droppedFiles, isUploading } = this.state;
    const { classes } = this.props;

    const hasFiles = droppedFiles.length > 0;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <TargetBox accepts={[FILE]} onDrop={this.handleFileDrop} />
          <FileList files={droppedFiles} />
          <div className={classes.wrapper}>
            <Button
              disabled={!hasFiles || isUploading}
              onClick={() => this.uploadFiles(droppedFiles)}
              fab
              color="accent"
              className={classes.savebutton}
            >
              <SaveIcon />
            </Button>
            {isUploading && (
              <CircularProgress size={60} className={classes.progress} />
            )}
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}
export default withStyles(styleSheet)(
  DragDropContext(HTML5Backend)(connectFirebase(ImageUploader))
);
