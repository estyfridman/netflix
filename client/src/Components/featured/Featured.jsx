import React, { useState, useContext, useEffect } from 'react';
import './Featured.scss';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

const Featured = ({ type }) => {
    const [randomContent, setRandomContent] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getRandomContent = async () => {
            
        try { 
            let path = 'api/content/random';
            let pathType = type ? `?type=${type}` : '';
            const responce = await axios.get(path + pathType, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
            if (responce) setRandomContent(responce.data);
        } catch (error) {
            console.log(error);
        } };

        getRandomContent();
        const interval = setInterval(() => {
            getRandomContent();
          }, 4000);
          return () => clearInterval(interval);
        }, [type]);



    return (
        <div className="featured">

            <img src={randomContent.img} alt={randomContent.title} />
            <div className="info">
                <img src={randomContent.imgTitle} alt={randomContent.title} />

                    {randomContent &&  randomContent.description && randomContent.description.length > 250 ? (
                        <span>{randomContent.description.slice(0, 250)}...</span>
                    ) : (
                        <span>{randomContent.description}</span>
                    )}             

                <div className='buttons'>
                    <button className='play' onClick={() => navigate(`/watch/${randomContent._id}`)}>
                        <PlayArrowIcon />
                        <span>Play</span>
                    </button>

                    <button className='more' onClick={() => navigate(`/details/${randomContent._id}`)}>
                        <InfoIcon />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Featured;