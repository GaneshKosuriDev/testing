import {Component} from 'react'

import './index.css'

class FoodItems extends Component {
  state = {isClicked: false, activeCount: 1, itemId: ''}

  handleClick = () => {
    const {itemDetails} = this.props
    const {isClicked} = this.state
    this.setState({isClicked: !isClicked, itemId: itemDetails.id})
    this.updateLocalStorage(1)
  }

  isFoodItemPresentInCart = () => {
    const oldItem = JSON.parse(localStorage.getItem('cartData')) || []
    const {
      itemDetails: {id},
    } = this.props

    const isItemPresent = oldItem.filter(eachItem => eachItem.id === id)
    if (isItemPresent.length) {
      return true
    }
    return false
  }

  updateLocalStorage = count => {
    const oldItem = JSON.parse(localStorage.getItem('cartData')) || []
    const {itemDetails} = this.props
    Object.assign(itemDetails, {count})
    if (this.isFoodItemPresentInCart()) {
      const newData = oldItem.map(eachItem => {
        const item = eachItem
        if (item.id === itemDetails.id) {
          item.count = eachItem.count + 1
        }
        return item
      })
      localStorage.setItem('cartData', JSON.stringify(newData))
    } else {
      oldItem.push(itemDetails)
      localStorage.setItem('cartData', JSON.stringify(oldItem))
    }
  }

  onClickMinusIcon = () => {
    const {activeCount} = this.state

    if (activeCount === 1) {
      this.setState({isClicked: false})
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
        <div className="each-food-item-container">
          <div className="each-item-image">
            <img
              src={itemDetails.imageUrl}
              alt={`img${itemDetails.id}`}
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
                <p className="count-value">{activeCount}</p>
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
