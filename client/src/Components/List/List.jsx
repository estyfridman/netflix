import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ListItem from '../ListItem/ListItem';
import './List.scss';

const List = ({ list }) => {
  const responsive = {
    superLargeDesktop5: {
      breakpoint: { max: 4000, min: 2100 },
      items: 8,
    },
    superLargeDesktop4: {
      breakpoint: { max: 2100, min: 1875 },
      items: 7,
    },
    superLargeDesktop3: {
      breakpoint: { max: 1875, min: 1650 },
      items: 6,
    },
    superLargeDesktop2: {
      breakpoint: { max: 1650, min: 1425 },
      items: 5,
    },
    superLargeDesktop: {
      breakpoint: { max: 1425, min: 1200 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 676 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 676, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <Carousel className="carousel"
        responsive={responsive}
        infinite={list.contents.length > 1}
        centerMode={true}
        swipeable={true}
        draggable={true}
        itemClass="carousel-item">
        {list.contents.map((item, i) => (
          <ListItem className="item" key={i} item={item} />
        ))}
      </Carousel>
    </div>
  )
}

export default List;