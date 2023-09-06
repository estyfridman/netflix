import React, { useState, useContext } from 'react';
import './ListItem.scss';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import { AuthContext } from '../../Context/AuthContext';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ADD_TO_MY_LIST, REMOVE_FROM_MY_LIST, GET_FAIL } from '../../Reducer/Actions.js'
import axios from 'axios';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { toast } from 'react-toastify';

const ListItem = ({ index, item }) => {

    const [isHovered, setIsHovered] = useState(false);
    const { user, myList, dispatch } = useContext(AuthContext);
    const [ismuted, setIsMuted] = useState(true);

    async function RemoveHandler() {
        try {
            const results = await axios.get(`api/lists/remove/${item._id}`, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
            console.log(results.data);
            dispatch({ type: REMOVE_FROM_MY_LIST, payload: results.data });
            toast.success("The removal was made successfully!", { 
                position: toast.POSITION.BOTTOM_RIGHT});
        } catch (error) {
            console.log(error.message);
        }
    };

    async function AddHandler() {
        try {
            const results = await axios.get(`api/lists/add/${item._id}`, {
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
            console.log(results.data);
            dispatch({ type: ADD_TO_MY_LIST, payload: results.data });
            toast.success("The addition was made successfully!", { 
                position: toast.POSITION.BOTTOM_RIGHT});
        } catch (error) {
            console.log(error.message);
            dispatch({ type: GET_FAIL, error: error.message });
        }
    };

    return (
        <>
            <div className='listItem' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className="contents">
                    <Link to={{ pathname: `/details/${item._id}` }}>
                        <img src={item?.imgThumb} alt={item.title} className="img-in-link" />
                    </Link>
                    {isHovered && (
                        <>
                            <Link to={{ pathname: `/details/${item._id}` }}>
                                <ReactPlayer
                                    className="video"
                                    height={145}
                                    width={300}
                                    url={item.trailer}
                                    playing={true}
                                    muted={ismuted}
                                    loop={true}
                                    volume={0.3}
                                ></ReactPlayer>
                            </Link>
                            <div className='volume'>
                                {ismuted ? (<VolumeUpIcon onClick={() => setIsMuted(false)}/>) : (<VolumeOffIcon onClick={() => setIsMuted(true)}/>) }
                            </div>
                            <div className='itemInfo'>
                                <div className='icons'>
                                    {
                                        myList && myList.contents && myList.contents.find((c) => c._id === item._id)
                                            ?
                                            (<RemoveIcon className="icon" onClick={() => { RemoveHandler(); }} />) :
                                            (<AddCircleOutlineIcon className="icon" onClick={() => { AddHandler(); }} />)
                                    }
                                </div>
                                <Link to={{ pathname: `/details/${item._id}` }} className="link">
                                    <div className="itemInfoTop">
                                        <span>{item.duration}</span>{' '}
                                        <span>| {' '}{item.year}</span>
                                    </div>
                                    <div className="genre">{item.genre}</div>
                                </Link>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ListItem;