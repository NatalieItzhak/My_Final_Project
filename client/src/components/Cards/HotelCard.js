import { vacayDates, } from '../actions/hotel';
import { useHistory, Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const HotelCard = ({ h, deleteHotel = (f) => f,
    owner = false,
    showMoreBtn = true,
}) => {

    const history = useHistory();
    return (
        <>
            <div className="cont" >
                <div className="card card-deck">
                    <div >
                        {h.image && h.image.contentType ? (
                            <img
                                className="image img img-fluid"
                                src={`/api/hotel/img/${h._id}`}
                                alt="hotel image"
                            />
                        ) : (
                            <img
                                className="card-image img img-fluid"
                                src="http://via.placeholder.com/1000x800.png?text=Hotel"
                                alt="hotel image"
                            />
                        )}

                    </div>
                    <div >
                        <div className="card-body">
                            <h3 className="title ">{h.title}</h3>
                            <h6 className="p-2 m-2 price">{h.price}$</h6>
                            <p>{h.location}</p>
                            <p className="card-text contentD">{h.content}</p>
                            <p className="card-text">
                                <span className="float-right">
                                    {vacayDates(h.from, h.to)} {vacayDates(h.from, h.to) <= 1 ? 'day' : 'days'}
                                </span>
                            </p>
                            <p className="card-text">Suits for {h.guests}  {(h.guests) <= 1 ? 'guest' : 'guests'}</p>
                            <p className="card-text">Avialable from {new Date(h.from).toLocaleDateString()}</p>
                            <div className="d-flex justify-content-between h4">
                                {showMoreBtn && (
                                    <button className="button " onClick={() => history.push(`/paypal`)}>Order</button>
                                )}
                                {owner && (
                                        <>
                                            <Link to={`/hotel/edit/${h._id}`}>
                                                <EditOutlined className="text-warning" />
                                            </Link>
                                            <DeleteOutlined onClick={() => deleteHotel(h._id)}
                                                className="text-danger" />
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default HotelCard;