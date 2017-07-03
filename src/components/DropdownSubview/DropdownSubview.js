import * as React from 'react';
import {connect} from 'react-redux';
import './DropdownSubview.css';
import DropdownSubviewArtist from '../DropdownSubviewArtist/DropdownSubviewArtist';
import {getArtistFromSearchState, getFullArtistFromSearchState} from '../../store/reducers/search';
import {ArtistData} from '../../store/reducers/app';

class DropdownSubview extends React.Component {
  props: {
    selectedSubviewArtist: ArtistData,
    selectedSubviewArtistFull: ArtistData,
  };

  render() {
    const {selectedSubviewArtist, selectedSubviewArtistFull} = this.props;
    return (
      <div className='DropdownSubview'>
        <DropdownSubviewArtist artist={selectedSubviewArtist} artistFull={selectedSubviewArtistFull}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedSubviewArtist: getArtistFromSearchState(state.search),
    selectedSubviewArtistFull: getFullArtistFromSearchState(state.search),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const DropdownSubviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownSubview);

export default DropdownSubviewContainer;