import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getVan } from "../api"

export default function CaravanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    const location = useLocation()


    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id])
    
    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const search = location.state?.search || "";
    const type = location.state?.type || "all";
    
    return (
        <div className="caravan-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span className="back-button-text">Back to {type} vans</span></Link>
            
            {van && (
                <div className="caravan-detail">
                    <div className="caravan-detail-image-container">
                        <img src={van.imageUrl} className="caravan--detail--image" />
                        {/* <i className={`van-type ${van.type} selected`}>
                            {van.type}
                        </i> */}
                        <div className="caravan-image-text-price">
                            <div className="name--container">
                                <h4 className="caravan-name">Name:</h4>
                                <h2 className="caravan-name name">{van.name}</h2>
                            </div>
                            <div className="price--container">
                                <h4 className="caravan-price">Price:</h4>
                                <p className="caravan-price price"><span>${van.price}</span>/day</p>
                            </div>
                        </div>
                    </div>
                    <p className="caravan--details-description">{van.description}</p>
                    <Link to='/login'  className="link-button">Rent this van</Link>
                </div>
            )}
        </div>
    )
}