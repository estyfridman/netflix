import './DetailsPage.scss';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Navbar from '../../Components/navbar/navbar.jsx';

const DetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const { user } = useContext(AuthContext);
  
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
    <div className='main'>
      <Navbar />
      <div className="centered">
        <div className="details">
          {content ? 
          (<div className="details">
            <img src={content.imgVertical} className='picture' alt={content.title}/>
          <div className='info'>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
            <p>Type {(content.isSeries ? 'Series' : 'Movie')}</p>
            <p>Year: {content.year}</p>
            <p>Duration: {content.duration}</p>
            <p>Age restriction: {content.limit}+</p>
            <p>Genre: {content.genre}</p>
          </div>
          <div className="buttons">
              <button
                className="play"
                onClick={() => navigate(`/watch/${content._id}`)}>
                <PlayArrowIcon />
                <span>Play</span>
              </button>
            </div>
          </div>)
        :
        (<div>Problem loading movie details</div>)
        }
              
        </div>

      </div>
    </div>
  )
}

export default DetailsPage;
