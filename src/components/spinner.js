import React from 'react'
import { css } from '@emotion/core'
import { ClipLoader } from 'react-spinners'

const override = css`
    display: block;
    margin: 30px;
    margin-right: auto;
    margin-left: auto;
`;

class Spinner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className='sweet-loading'>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}

export default Spinner