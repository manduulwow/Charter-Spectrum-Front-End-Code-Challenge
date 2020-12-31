import React, { ChangeEvent, useEffect, useState } from 'react';
import RestaurantMoreInfo from './RestaurantMoreInfo/main';
import Select from './Select/select';
import './main.css';

interface Restaurants {
    address1: string,
    attire: string,
    city: string,
    genre: string,
    hours: string,
    id: string,
    lat: number,
    long: number,
    name: string,
    state: string,
    tags: string,
    telephone: string,
    website: string,
    zip: number
}

type TableRestaurantProps = {
    restaurants: Restaurants[],
    setRestaurants: Function,
    reset: Function
}

const TableRestaurant = ({ restaurants, setRestaurants, reset }: TableRestaurantProps) => {
    const [stateFilter, setStateFilter] = useState('All');
    const [genreFilter, setGenreFilter] = useState('All');
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [restaurantInfo, setRestaurantInfo] = useState({
        name: '',
        address1: '',
        attire: '',
        hours: '',
        telephone: '',
        website: '',
        city: ''
    });
    const [pages, setPages] = useState(Math.floor(restaurants.length/10) + ((restaurants.length%10 > 1) ? 1 : 0));
    let restaurantsInfo = [];

    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    let genres: string[] = [];

    restaurants.forEach(restaurant => {
        const restaurant_genre = restaurant.genre.split(',');
        genres = [...genres, ...restaurant_genre];
    });

    genres = Array.from(new Set(genres.sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    })));

    const StateSelect = <Select values={states} func={setStateFilter} resetPage={setCurrentPage}/>
    const GenreSelect = <Select values={genres} func={setGenreFilter} resetPage={setCurrentPage}/>
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
        if (e.currentTarget.value === '') {
            reset();
        }
    }
    const onSearch = () => {
        setRestaurants(restaurants.filter(restaurant => {
            if (restaurant.genre.split(',').indexOf(searchValue) !== -1) return 1;
            if (restaurant.name === searchValue || restaurant.city === searchValue) return 1;
            return 0;
        }));
        setCurrentPage(0);
    }
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')
            onSearch();
    }
    const onRestaurantClick = (restaurant: {name:string, city:string, hours:string, telephone:string, website:string, address1:string, attire:string}) => {
        setRestaurantInfo(restaurant);
        setShowInfo(true);
    }
    restaurantsInfo = restaurants.filter(restaurant => {
        if (stateFilter === 'All') return 1;
        return (restaurant.state === stateFilter) ? 1 : 0;
    }).filter(restaurant => {
        if (genreFilter === 'All') return 1;
        return (restaurant.genre.split(',').find(genre => genre === genreFilter)) ? 1 : 0;
    })
            
    useEffect(() => {
        setPages(Math.floor(restaurantsInfo.length/10) + ((restaurantsInfo.length%10 > 1) ? 1 : 0));
    },[pages,restaurantsInfo.length]);

    return <div className="container-rs">
        <span>State </span>{StateSelect}
        <span>Genre </span>{GenreSelect}
        <span>Search </span>
        <input type="search" placeholder="Search by name, city, genre" className="search-input" onChange={onSearchChange} value={searchValue} onKeyPress={onKeyPress} />
        <button onClick={onSearch}>Search</button>
        {
            (restaurantsInfo.length > 0) ?
                <table className="table-restaurant border-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Phone number</th>
                            <th>Genres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            restaurantsInfo.slice(currentPage, currentPage + 10).sort((a, b) => {
                                if (a.name < b.name) { return -1; }
                                if (a.name > b.name) { return 1; }
                                return 0;
                            }).map((restaurant, index) => (
                                <tr key={restaurant.id} onClick={() => onRestaurantClick(restaurant)}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>{restaurant.name}</td>
                                    <td>{restaurant.city}</td>
                                    <td className="text-center">{restaurant.state}</td>
                                    <td className="text-center">{restaurant.telephone}</td>
                                    <td className="text-center">{restaurant.genre}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                :
                <div>
                    {
                        (stateFilter === 'All') ? <p>We currently don't have any restaurant information</p> : <p>We don't have any restaurant information in {stateFilter}</p>
                    }
                </div>
        }
        <div className="pagination-container">
            {
                Array(pages).fill(Number).map((_, i) => <div key={i} className="pagination-item"><button onClick={() => setCurrentPage(i * 10)}>{i + 1}</button></div>)
            }
        </div>
        <RestaurantMoreInfo showInfo={showInfo} setShowInfo={setShowInfo} restaurantInfo={restaurantInfo} />
    </div>
}

export default TableRestaurant;