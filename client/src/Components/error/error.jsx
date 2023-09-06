import "./error.scss";
import ErrorIcon from '@mui/icons-material/Error';

import React from 'react'

function Error({error}) {
  return (
    <div className="error-container">
        <h3 className="title">Ooops, something went wrong...</h3>
        <p>{error}</p>
        <ErrorIcon/>
    </div>
  )
}

export default Error;