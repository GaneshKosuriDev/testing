import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import AllRestaurants from '../AllRestaurants'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Sort by',
    value: '',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    offersList: [],
    isLoading: false,
    restaurantsList: [],
    activePage: 1,
    limit: 9,
    activeOptionId: sortByOptions[0].value,
  }

  componentDidMount() {
    this.getOffersList()
    this.getRestaurantsList()
  }

  getOffersList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.offers.map(offer => ({
      imageUrl: offer.image_url,
      id: offer.id,
    }))
    this.setState({
      offersList: updatedData,
    })
  }

  getRestaurantsList = async () => {
    this.setState({
      isLoading: true,
    })
    const {activePage, limit, activeOptionId} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${
      (activePage - 1) * limit
    }&limit=${limit}&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(restaurant => ({
        imageUrl: restaurant.image_url,
        id: restaurant.id,
        name: restaurant.name,
        userRating: restaurant.user_rating,
        rating: restaurant.user_rating.rating,
        ratingText: restaurant.user_rating.rating_text,
      }))
      this.setState({
        restaurantsList: updatedData,
        isLoading: false,
      })
    }
  }

  onClickLeftPage = () => {
    const {activePage} = this.state
    if (activePage > 1 && activePage < 5) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    } else if (activePage < 1) {
      this.setState({activePage: 1}, this.getRestaurantsList)
    }
  }

  onClickRightPage = () => {
    const {activePage} = this.state
    if (activePage > 0 && activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    } else if (activePage > 4) {
      this.setState({activePage: 4}, this.getRestaurantsList)
    }
  }

  updateActiveOptionId = activeOptionId => {
    this.setState({activeOptionId}, this.getRestaurantsList)
  }

  renderOffersList = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      cssEase: 'linear',
    }
    return (
      <div style={{width: '80%'}}>
        <Slider {...settings}>
          {offersList.map(offer => (
            <div className="react-slick-item" key={offer.id}>
              <img
                className="poster"
                src={offer.imageUrl}
                width="100%"
                height="100%"
                alt="offer"
              />
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader testid="loader" type="Oval" color="gold" height="40" width="50" />
    </div>
  )

  render() {
    const {isLoading, restaurantsList, activeOptionId, activePage} = this.state
    const {history} = this.props
    return (
      <div className="home-container">
        <Header history={history} />
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            <div className="home-offers-image">{this.renderOffersList()}</div>
            <AllRestaurants
              onClickRightPage={this.onClickRightPage}
              onClickLeftPage={this.onClickLeftPage}
              restaurantsList={restaurantsList}
              updateActiveOptionId={this.updateActiveOptionId}
              sortByOptions={sortByOptions}
              activeOptionId={activeOptionId}
              activePage={activePage}
            />
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default Home
