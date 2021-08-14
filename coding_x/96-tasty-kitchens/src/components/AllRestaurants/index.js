import {Component} from 'react'
import {Link} from 'react-router-dom'

import RestaurantsHeader from '../RestaurantsHeader'

import './index.css'

class AllRestaurants extends Component {
  renderRestaurantsList = () => {
    const {
      restaurantsList,
      activeOptionId,
      activePage,
      sortByOptions,
      updateActiveOptionId,
      onClickLeftPage,
      onClickRightPage,
    } = this.props
    console.log('restaurantsList', restaurantsList)
    return (
      <div>
        <RestaurantsHeader
          sortByOptions={sortByOptions}
          activeOptionId={activeOptionId}
          updateActiveOptionId={updateActiveOptionId}
        />

        <div className="Restaurants-container" key={restaurantsList.id}>
          <ul className="Restaurants-items-container" aria-label="restaurants">
            {restaurantsList.map(item => (
              <li key={item.id} aria-label="restaurant-item">
                <Link
                  to={`/restaurant/${item.id}`}
                  style={{textDecoration: 'none'}}
                  key={item.id}
                >
                  <div className="Restaurant-item-container">
                    <div className="restaurant-img-container">
                      <img
                        src={item.imageUrl}
                        alt="restaurant"
                        className="restaurant-img"
                      />
                    </div>
                    <div className="restaurant-details-container">
                      <h1 className="restaurant-name">{item.name}</h1>
                      <p className="restaurant-food-type">Fast Food</p>
                      <div className="restaurant-rating-container">
                        <img
                          src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628482940/Mini%20Projects/star_t0atqk.png"
                          alt="star"
                          className="star-icon"
                        />
                        <p className="rating-value">{item.userRating.rating}</p>
                        <p className="total-ratings-value">
                          ({item.userRating.total_reviews})
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="pagination-container">
            <img
              src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628482424/Mini%20Projects/left-Icon_k6ywah.png"
              alt="left-icon"
              className="pagination-icon"
              onClick={onClickLeftPage}
            />
            <p className="page-count-numbers">
              <span>{activePage}</span> to <span>4</span>
            </p>
            <img
              src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628482424/Mini%20Projects/right-Icon_eo1jkg.png"
              alt="left-icon"
              className="pagination-icon"
              onClick={onClickRightPage}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.renderRestaurantsList()}</div>
  }
}

export default AllRestaurants
