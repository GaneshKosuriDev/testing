import {Component} from 'react'

import './index.css'

class FoodItems extends Component {
  state = {isClicked: false, activeCount: 1}

  handleClick = () => {
    const {isClicked} = this.state
    this.setState({isClicked: !isClicked})
    this.updateLocalStorage(1)
  }

  isFoodItemPresentInCart = () => {
    const oldLocalStorageItems =
      JSON.parse(localStorage.getItem('cartData')) || []
    const {
      itemDetails: {id},
    } = this.props

    const isItemPresent = oldLocalStorageItems.filter(
      eachItem => eachItem.id === id,
    )
    if (isItemPresent.length) {
      return true
    }
    return false
  }

  updateLocalStorage = count => {
    const oldLocalStorageItems =
      JSON.parse(localStorage.getItem('cartData')) || []
    const {itemDetails} = this.props
    Object.assign(itemDetails, {count})
    if (this.isFoodItemPresentInCart()) {
      const newData = oldLocalStorageItems.map(eachItem => {
        const item = eachItem
        if (item.id === itemDetails.id) {
          item.count = count
        }
        return item
      })
      localStorage.setItem('cartData', JSON.stringify(newData))
    } else {
      oldLocalStorageItems.push(itemDetails)
      localStorage.setItem('cartData', JSON.stringify(oldLocalStorageItems))
    }
  }

  removeItemFromLocalStorage = () => {
    const oldLocalStorageItems = JSON.parse(localStorage.getItem('cartData'))
    const {
      itemDetails: {id},
    } = this.props
    const itemIndex = oldLocalStorageItems.findIndex(
      eachItem => eachItem.id === id,
    )
    oldLocalStorageItems.splice(itemIndex, 1)
    localStorage.setItem('cartData', JSON.stringify(oldLocalStorageItems))
  }

  onClickMinusIcon = () => {
    const {activeCount} = this.state

    if (activeCount === 1) {
      this.setState({isClicked: false})
      this.removeItemFromLocalStorage()
    } else if (activeCount > 1) {
      this.setState(prevState => ({
        activeCount: prevState.activeCount - 1,
      }))
      this.updateLocalStorage(activeCount - 1)
    }
  }

  onClickPlusIcon = () => {
    const {activeCount} = this.state
    this.setState(prevState => ({
      activeCount: prevState.activeCount + 1,
    }))
    this.updateLocalStorage(activeCount + 1)
  }

  render() {
    const {itemDetails} = this.props
    const {isClicked, activeCount} = this.state

    return (
      <>
        <div className="each-food-item-container" data-testid="foodItem">
          <div className="each-item-image">
            <img
              src={itemDetails.imageUrl}
              alt="food-item"
              className="item-image"
            />
          </div>
          <div className="each-item-details-container">
            <h1 className="item-name">{itemDetails.name}</h1>
            <div className="cost-container">
              {/* <FaRupeeSign className="each-item-rupees-icon" /> */}
              <p className="item-cost">{itemDetails.cost}</p>
            </div>
            <div className="rating-container">
              <img
                src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628482940/Mini%20Projects/star_t0atqk.png"
                alt="star"
                className="star-icon"
              />
              <p className="item-rating">{itemDetails.rating}</p>
            </div>
            {isClicked ? (
              <div className="each-item-counter-container" id={itemDetails.id}>
                <div className="minus-icon-container">
                  <img
                    src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628482877/Mini%20Projects/minus-icon_idmjn3.png"
                    alt="minus-icon"
                    className="minus-icon"
                    onClick={this.onClickMinusIcon}
                  />
                </div>
                <p className="count-value" data-testid="active-count">
                  {activeCount}
                </p>
                <div className="plus-icon-container">
                  <img
                    src="https://res.cloudinary.com/dj7inbtyj/image/upload/v1628482877/Mini%20Projects/plus-icon_nphdse.png"
                    alt="plus-icon"
                    className="plus-icon"
                    onClick={this.onClickPlusIcon}
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="add-item-button"
                onClick={this.handleClick}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default FoodItems
