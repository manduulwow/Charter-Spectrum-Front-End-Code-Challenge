import React, { Fragment } from 'react';
import './main.css';

type TableRestaurantProps = {
    showInfo: boolean,
    restaurantInfo: {
        name: string,
        address1: string,
        attire: string,
        hours: string,
        telephone: string,
        website: string,
        city: string
    },
    setShowInfo: Function
}

const RestaurantMoreInfo = ({ showInfo, restaurantInfo, setShowInfo }: TableRestaurantProps) => {
    const onClose = () => {
        setShowInfo(false);
    }
    return (
        (showInfo) ?
            <div className="res-more-container" >
                <div className="res-more-curtain" onClick={onClose}></div>
                <div className="res-more-box">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{restaurantInfo.name}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{restaurantInfo.address1}, {restaurantInfo.city}</td>
                            </tr>
                            <tr>
                                <td>Attire</td>
                                <td>{restaurantInfo.attire}</td>
                            </tr>
                            <tr>
                                <td>Hours</td>
                                <td>{restaurantInfo.hours}</td>
                            </tr>
                            <tr>
                                <td>Telephone</td>
                                <td>{restaurantInfo.telephone}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td><a href={restaurantInfo.website}>{restaurantInfo.website}</a></td>
                            </tr>
                            <tr>
                                <td style={{ border: 'none' }}><button onClick={onClose}>Close</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div > : <Fragment></Fragment>
    )
}

export default RestaurantMoreInfo;