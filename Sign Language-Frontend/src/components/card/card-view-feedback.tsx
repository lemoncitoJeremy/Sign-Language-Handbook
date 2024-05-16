import StarRatings from 'react-star-ratings';
import "../../style.scss"


function FeedbackCard(props: any){
    console.log(props);
    return(
        <div className="card feedback-card">
            <div className="card-header border-0 request-table-header">
                <p className="h4">{props.name}</p>
            </div>
            <div className="card-body">
                <StarRatings
                    rating={props.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    starDimension='40px'
                />
                <p className="h5 d-inline date">{props.date}</p>
                <p className='feedback-message'>
                    {props.msg}
                </p>
            </div>
        </div>
    )
}

export default FeedbackCard;