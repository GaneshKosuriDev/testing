import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import {FaRupeeSign, FaCheckCircle} from 'react-icons/fa'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import CartEmpty from '../CartEmpty'

class Cart extends Component {
  state = {itemsList: [], isClicked: false}

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    const items = localStorage.getItem('cartData')
    let oldLocalStorageItems = []
    if (items) {
      oldLocalStorageItems = JSON.parse(items)
    }
    if (oldLocalStorageItems) {
      const orderItem = oldLocalStorageItems.map(item => ({
        name: item.name,
        id: item.id,
        imageUrl: item.imageUrl,
        cost: item.cost,
        count: item.count,
      }))
      this.setState({itemsList: orderItem})
    } else {
      this.setState({itemsList: 0})
    }
  }

  onClickMinus = id => {
    const {itemsList} = this.state
    const updatedCartItems = itemsList.map(cartItem => {
      if (cartItem.id === id) {
        const updatedItem = cartItem
        const updatedCount = cartItem.count - 1
        if (updatedCount) {
          updatedItem.count = updatedCount
          return updatedItem
        }
        return null
      }
      return cartItem
    })
    const filteredCartItems = updatedCartItems.filter(cartItem => cartItem)
    this.setState({itemsList: filteredCartItems})
    localStorage.setItem('cartData', JSON.stringify(filteredCartItems))
  }

  onClickPlus = id => {
    const {itemsList} = this.state
    const updatedCartItems = itemsList.map(cartItem => {
      if (cartItem.id === id) {
        const updatedItem = cartItem
        updatedItem.count = updatedItem.count + 1
        return updatedItem
      }
      return cartItem
    })
    this.setState({itemsList: updatedCartItems})
    localStorage.setItem('cartData', JSON.stringify(updatedCartItems))
  }

  clickPlaceOrder = () => {
    this.setState({isClicked: !this.isClicked})
    localStorage.removeItem('cartData')
  }

  renderCartData = () => {
    const {itemsList} = this.state
    const costList = itemsList.map(item => item.cost * item.count)
    const sum = costList.reduce((a, b) => a + b, 0)
    return (
      <div className="all-cart-items-container">
        <Header />
        <div className="items-cart-container">
          <div className="desktop-cart-container">
            <div className="item-quantity-price-heading-container">
              <p className="title">Item</p>
              <p className="title">Quantity</p>
              <p className="title">Price</p>
            </div>
            <div>
              {itemsList.map(item => (
                <div
                  className="desktop-order-container"
                  key={item.id}
                  testid="cartItem"
                >
                  <div className="desktop-ordered-item-heading-img-container">
                    <div className="desktop-ordered-item-heading-img-align">
                      <img
                        src={item.imageUrl}
                        alt="img"
                        className="desktop-ordered-item-img"
                      />
                      <h1 className="desktop-ordered-item-heading">
                        {item.name}
                      </h1>
                    </div>
                  </div>
                  <div className="desktop-ordered-item-count-container">
                    <div className="desktop-ordered-item-count-align">
                      <button
                        className="cart-minus-icon"
                        onClick={() => this.onClickMinus(item.id)}
                        testid="cart-minus-button"
                      >
                        <HiOutlineMinusSm className="dish-minus-icon" />
                      </button>
                      <p className="dish-count" testid="item-quantity">
                        {item.count}
                      </p>
                      <button
                        className="cart-plus-icon"
                        onClick={() => this.onClickPlus(item.id)}
                        testid="cart-plus-button"
                      >
                        <BsPlus className="dish-plus-icon" />
                      </button>
                    </div>
                  </div>
                  <div className="desktop-ordered-item-price-container">
                    <div className="desktop-ordered-item-price-align">
                      <FaRupeeSign className="dish-rupees-icon" />
                      <p className="dish-cost">{`${item.cost}.00`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="check-out-container">
              <div className="price-container">
                <h1 className="final-price-heading">Order Total:</h1>
                <div className="total-price-container">
                  <FaRupeeSign className="dish-rupees-icon" />
                  <p
                    className="final-price"
                    testid="total-price"
                  >{`${sum}.00`}</p>
                </div>
              </div>
              <div className="order-placed-btn-container">
                <button
                  type="button"
                  className="order-placed-btn"
                  onClick={this.clickPlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderPaymentSuccess = () => (
    <div>
      <Header />
      <div className="success-container">
        <div className="success-card">
          <FaCheckCircle className="check-circle-icon" />
          <h1 className="success-heading">Payment Successful</h1>
          <p className="success-para">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <Link to="/" style={{textDecoration: 'none'}}>
            <button type="button" className="back-to-home-btn">
              Go To Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  )

  render() {
    const {itemsList, isClicked} = this.state
    const size = itemsList.length
    return (
      <div>
        {isClicked ? (
          this.renderPaymentSuccess()
        ) : (
          <div>{size > 0 ? this.renderCartData() : <CartEmpty />}</div>
        )}
      </div>
    )
  }
}

export default Cart
