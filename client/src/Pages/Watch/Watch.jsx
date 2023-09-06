import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './Watch.scss';
import HomeIcon from '@mui/icons-material/Home';

const Watch = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const { user } = useContext(AuthContext);

  
  const navigate = useNavigate();
  useEffect(() => {
    const getContent = async () => {
      try {
        const fetchedContent = await axios.get(`api/content/get/${id}`, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
        setContent(fetchedContent.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContent();
  }, [id, user.token]);


  return (
    <div className="watch">
      <div className="link-container">
      <Link className="link" to='/home'>
        <HomeIcon/>
        Home
      </Link>
      <div className="link" onClick={() => navigate(-1)}>
        <ArrowBackIcon/>
        Back
      </div>
      </div>

      <div className='movie-container'>
      {content && content.movie && (
        <ReactPlayer controls={true}
        className="video"
        url={content.movie}
        playing={true}>
      </ReactPlayer>
      )}
      </div>
      
    </div>
  );
};

export default Watch;