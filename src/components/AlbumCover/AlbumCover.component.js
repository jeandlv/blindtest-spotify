import React, { Component } from 'react';
import get from 'lodash/get';
import noCoverImage from '../../bin/no-cover-image.png';
const ALBUM_COVER_SIZE = 400;
const ALT_TEXT_COVER_IMG = "Album Cover Image";

class AlbumCover extends Component {
    render() {
        const coverImageSrc = get(this.props.track, 'album.images[0].url', noCoverImage);
        return (
            <img alt={ALT_TEXT_COVER_IMG} src={coverImageSrc} style={{ width: ALBUM_COVER_SIZE, height: ALBUM_COVER_SIZE }} />
        );
    }
}

export default AlbumCover;