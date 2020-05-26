import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/DotLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

function Spinner({ size, color }) {
  return (
    <ClipLoader
      css={override}
      size={size}
      color={color || 'aqua'}
      loading='true'
    />
  );
}

export default Spinner;
