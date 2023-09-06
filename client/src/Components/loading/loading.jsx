import CircleLoader  from 'react-spinners/CircleLoader';
import "./loading.scss"


function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-item">
      <CircleLoader 
        color={'#B793D9'}
        loading={true}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
   
      <span className="loading">Loading...</span>
    </div>
  );
}

export default Loading;