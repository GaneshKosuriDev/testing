import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {within} from '@testing-library/dom'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const restaurantDetailsPath = '/restaurant/2200043'
const cartRoutePath = '/cart'

const restaurantDetailsResponse = {
  rating: 3.4,
  id: '2200043',
  name: 'Village Traditional Foods',
  cost_for_two: 700,
  cuisine: 'North Indian, Chinese',
  image_url:
    'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg',
  reviews_count: 345,
  opens_at: '10:00 AM, Tomorrow',
  location:
    '1-8-303, Sindhi Colony Rd, Sindhi Colony, Begumpet, Hyderabad, Telangana 500003',
  items_count: 15,
  food_items: [
    {
      name: 'Chicken Salad',
      cost: 345,
      food_type: 'NON-VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-salad-16.jpg',
      id: 'c172e4b2-9288-4a6f-b77b-510eef8e945d',
      rating: 4,
    },
    {
      name: 'Onion Salad',
      cost: 315,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/onion-salad-17.jpg',
      id: '02d8f007-af50-4da5-b22d-9072cd026b69',
      rating: 4.2,
    },
    {
      name: 'Okra Salad',
      cost: 375,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/okra-salad-18.jpg',
      id: '6668718b-6f1c-49d1-854e-f92c6802484e',
      rating: 3.8,
    },
    {
      name: 'Mutton Salad',
      cost: 335,
      food_type: 'NON-VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/mutton-salad-19.cms',
      id: 'e6005897-c520-457a-be5a-11a77f8d0cba',
      rating: 4.2,
    },
    {
      name: 'veg Salad',
      cost: 465,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/veg-salad-20.jpg',
      id: 'a11c6cc7-0a2a-4327-b8b0-e19dc461d3fa',
      rating: 5,
    },
    {
      name: 'VEG Quesadilla',
      cost: 610,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/veg-quesadilla-21.jpg',
      id: 'bb6a0157-c8e4-4e06-8a99-47dc74763c40',
      rating: 4.5,
    },
    {
      name: 'Masala Dosa',
      cost: 550,
      food_type: 'NON-VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/masala-dosa-22.jpg',
      id: '77097c70-d83e-4960-a7cf-9251f41eb327',
      rating: 3,
    },
    {
      name: 'Panner Dosa',
      cost: 640,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/panner-dosa-23.jpg',
      id: 'b02d5577-5bc8-4781-b6da-f77511ea7f44',
      rating: 3.8,
    },
    {
      name: 'Cheese Dosa',
      cost: 430,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/cheese-dosa-24.jpg',
      id: '227cabca-2a08-4d91-93ad-58a3b2fec34d',
      rating: 3.4,
    },
    {
      name: 'Chicken Tickels',
      cost: 205,
      food_type: 'NON-VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-tickels-25.jpg',
      id: 'd621521e-8530-4f2e-9b77-ee619080c748',
      rating: 3.8,
    },
    {
      name: 'Kids Steak Taco',
      cost: 200,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/kids-steak-taco-26.jpg',
      id: 'd795190c-1216-4573-82f2-7ddc7060a5a3',
      rating: 4.2,
    },
    {
      name: 'Chips',
      cost: 540,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chips-27.jpg',
      id: '525cfc3f-1794-48ac-9c6a-483abb122358',
      rating: 3.8,
    },
    {
      name: 'Chips and Salsa',
      cost: 570,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chips-and-salsa-28.jpg',
      id: '57a81f40-0298-4aab-afc1-9b730a2ba869',
      rating: 4.5,
    },
    {
      name: 'Chips and Guacamole',
      cost: 770,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chips-and-guacamole-29.jpg',
      id: 'e3f3c433-7004-44ba-92b8-d34c4dea7c69',
      rating: 3.8,
    },
    {
      name: 'Chips and Queso',
      cost: 770,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chips-and-queso-30.jpg',
      id: '5163f8a2-84f5-4b55-b88d-09187431439f',
      rating: 5,
    },
  ],
}

const server = setupServer(
  rest.get('https://apis.ccbp.in/restaurants-list/:id', (req, res, ctx) =>
    res(ctx.json(restaurantDetailsResponse)),
  ),
)

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

const renderWithBrowserRouter = (ui = <App />, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const rtlRender = (ui = <App />, path = '/') => {
  const history = createMemoryHistory()
  history.push(path)
  render(<Router history={history}>{ui}</Router>)
  return {
    history,
  }
}

const mockLocalStorage = (function () {
  let store = {}

  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    },
  }
})()

const restoreLocalStorage = () => {
  localStorage.clear()
}

const originalConsoleError = console.error

describe('Restaurant Details Route tests', () => {
  beforeAll(() => {
    server.listen()
  })

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    })
  })

  afterEach(() => {
    server.resetHandlers()
    restoreLocalStorage()
  })

  afterAll(() => {
    server.close()
  })

  it('When HTTP GET request should be made to restaurantDetailsAPI is successful, the page should consist of at least two HTML list items, and the food items list should be rendered using a unique key as a prop for each food item :::5:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    rtlRender(<App />, restaurantDetailsPath)
    restoreGetCookieFns()

    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    console.error = originalConsoleError
    restoreGetCookieFns()
  })

  it('The Restaurant Details Page should contain at least 15 food item images with alt text "food-item" :::5:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    rtlRender(<App />, restaurantDetailsPath)
    restoreGetCookieFns()

    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()
    const foodItemsLength = restaurantDetailsResponse.food_items.length
    const foodItems = screen.getAllByAltText(/food-item/i, {exact: false})
    expect(foodItems.length).toBe(foodItemsLength)

    console.error = originalConsoleError
    restoreGetCookieFns()
  })

  it('The Empty Cart view should be displayed when the user didnt add any food items to the cart:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])
    rtlRender(<App />, cartRoutePath)
    expect(
      await screen.findByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the Restaurant Details Route is accessed, then the HTML container element with testid attribute value as "loader" should not visible to the user:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    await screen.queryByTestId('loader')

    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()
    await expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, an HTML image element with alt as "restaurant" and src equal to the value of the key "image_url" should be displayed:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)

    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /^restaurant/i, exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', {name: /^restaurant/i, exact: false}).src,
    ).toBe(restaurantDetailsResponse.image_url)
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, an HTML main heading element with text content as the value of the key "name" should be displayed:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, an HTML paragraph element with text content as the value of the key "cuisine" should be displayed:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(restaurantDetailsResponse.cuisine, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(restaurantDetailsResponse.cuisine, {exact: false})
        .tagName,
    ).toBe('P')
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, an HTML paragraph element with text content as the value of the key "rating" should be displayed:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(restaurantDetailsResponse.rating, {exact: false})[0],
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(restaurantDetailsResponse.rating, {exact: false})[0]
        .tagName,
    ).toBe('P')
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, an HTML paragraph element with text content as the value of the key "cost_for_two" should be displayed:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(restaurantDetailsResponse.cost_for_two, {exact: false}),
    ).toBeInTheDocument()
    expect(
      screen.getByText(restaurantDetailsResponse.cost_for_two, {exact: false})
        .tagName,
    ).toBe('P')
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, an HTML paragraph element with text content as "Cost for two":::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/Cost for two/i, {exact: false}),
    ).toBeInTheDocument()
    expect(screen.getByText(/Cost for two/i, {exact: false}).tagName).toBe('P')
    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, the page should contain all the food item images in that restaurant with alt text as "food-item":::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByRole('img', {
      name: /food-item/i,
      exact: false,
    })

    const {food_items} = restaurantDetailsResponse

    expect(foodItems.length).toBe(food_items.length)

    restoreGetCookieFns()
  })

  it('The Cart should be empty by default when user didnt add food items to it:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})

    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])

    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('When the HTTP GET request in the Restaurant Details route is successful, When the HTML button element with text Add is clicked in any Food item then Item should be added to cart:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})

    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByTestId('foodItem')
    const firstFoodItem = foodItems[0]
    const firstFoodItemAddButton = within(firstFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })

    userEvent.click(firstFoodItemAddButton)
    // TODO: need to resolve
    // expect(localStorage.setItem).toHaveBeenCalled()
    const activeFoodItemCountElement = within(firstFoodItem).getByTestId(
      'active-count',
    )

    expect(activeFoodItemCountElement.textContent).toBe('1')
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])

    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The Cart Should be empty when the user remove all food items in restaurant Details Route:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByTestId('foodItem')
    const firstFoodItem = foodItems[0]
    const firstFoodItemAddButton = within(firstFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(firstFoodItemAddButton)
    expect(
      within(firstFoodItem).queryByRole('button', {
        name: /Add/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()
    const firstFoodItemActiveCountElement = within(firstFoodItem).getByTestId(
      'active-count',
    )
    expect(firstFoodItemActiveCountElement.textContent).toBe('1')
    const firstFoodItemMinusButton = within(firstFoodItem).getByTestId(
      'minus-button',
    )
    userEvent.click(firstFoodItemMinusButton)
    const secondFoodItem = foodItems[1]
    const secondFoodItemAddButton = within(secondFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(secondFoodItemAddButton)
    const secondFoodItemActiveCountElement = within(secondFoodItem).getByTestId(
      'active-count',
    )
    expect(secondFoodItemActiveCountElement.textContent).toBe('1')
    const secondFoodItemMinusButton = within(secondFoodItem).getByTestId(
      'minus-button',
    )
    userEvent.click(secondFoodItemMinusButton)
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])
    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('The Cart Route should contain food items with added quantity:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByTestId('foodItem')
    const firstFoodItem = foodItems[0]
    const firstFoodItemAddButton = within(firstFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(firstFoodItemAddButton)
    expect(
      within(firstFoodItem).queryByRole('button', {
        name: /Add/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()
    const firstFoodItemActiveCountElement = within(firstFoodItem).getByTestId(
      'active-count',
    )
    expect(firstFoodItemActiveCountElement.textContent).toBe('1')
    const firstFoodItemPlusButton = within(firstFoodItem).getByTestId(
      'plus-button',
    )
    userEvent.click(firstFoodItemPlusButton)

    const secondFoodItem = foodItems[1]
    const secondFoodItemAddButton = within(secondFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(secondFoodItemAddButton)
    const secondFoodItemActiveCountElement = within(secondFoodItem).getByTestId(
      'active-count',
    )
    expect(secondFoodItemActiveCountElement.textContent).toBe('1')
    const secondFoodItemPlusButton = within(secondFoodItem).getByTestId(
      'plus-button',
    )
    userEvent.click(secondFoodItemPlusButton)

    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])
    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const cartItems = screen.getAllByTestId('cartItem')
    const firstCartItem = cartItems[0]
    const secondCartItem = cartItems[1]
    const firstCartItemQuantity = within(firstCartItem).getByText('2')
    const secondCartItemQuantity = within(secondCartItem).getByText('2')
    expect(firstCartItemQuantity).toBeInTheDocument()
    expect(secondCartItemQuantity).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it('The Cart should be empty when the user remove the items in the Cart by Decreasing quantity for all the cart items:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByTestId('foodItem')
    const firstFoodItem = foodItems[0]
    const firstFoodItemAddButton = within(firstFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(firstFoodItemAddButton)
    expect(
      within(firstFoodItem).queryByRole('button', {
        name: /Add/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])
    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const cartItems = screen.getAllByTestId('cartItem')
    const firstCartItem = cartItems[0]
    const firstCartItemQuantity = within(firstCartItem).getByText('1')
    expect(firstCartItemQuantity).toBeInTheDocument()
    const firstCartItemMinusButton = within(firstCartItem).getByTestId(
      'cart-minus-button',
    )
    userEvent.click(firstCartItemMinusButton)
    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it('The cart total price value should change accordingly when the cart items quantity is changed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByTestId('foodItem')
    const firstFoodItem = foodItems[0]
    const firstFoodItemAddButton = within(firstFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(firstFoodItemAddButton)
    expect(
      within(firstFoodItem).queryByRole('button', {
        name: /Add/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])
    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const cartItems = screen.getAllByTestId('cartItem')
    const firstCartItem = cartItems[0]
    const firstCartItemQuantity = within(firstCartItem).getByTestId(
      'item-quantity',
    )
    expect(firstCartItemQuantity.textContent).toBe('1')
    const firstCartItemPlusButton = within(firstCartItem).getByTestId(
      'cart-plus-button',
    )
    userEvent.click(firstCartItemPlusButton)
    userEvent.click(firstCartItemPlusButton)
    expect(firstCartItemQuantity.textContent).toBe('3')
    const {food_items} = restaurantDetailsResponse
    const {cost} = food_items[0]
    const quantityThreeTotalPrice = `${3 * cost}.00`
    const totalPriceElement = screen.getByTestId('total-price')
    expect(totalPriceElement.textContent).toBe(quantityThreeTotalPrice)
    const firstCartItemMinusButton = within(firstCartItem).getByTestId(
      'cart-minus-button',
    )
    userEvent.click(firstCartItemMinusButton)
    expect(firstCartItemQuantity.textContent).toBe('2')
    const quantityTwoTotalPrice = `${2 * cost}.00`
    expect(totalPriceElement.textContent).toBe(quantityTwoTotalPrice)
    restoreGetCookieFns()
  })

  it('When the user click the HTML button element with text "Place Order" then the "Payment Successful" view should be displayed:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByTestId('foodItem')
    const firstFoodItem = foodItems[0]
    const firstFoodItemAddButton = within(firstFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(firstFoodItemAddButton)
    expect(
      within(firstFoodItem).queryByRole('button', {
        name: /Add/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])
    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const cartItems = screen.getAllByTestId('cartItem')
    const firstCartItem = cartItems[0]
    const firstCartItemQuantity = within(firstCartItem).getByTestId(
      'item-quantity',
    )
    expect(firstCartItemQuantity.textContent).toBe('1')
    const placeOrderButton = screen.getByRole('button', {
      name: /Place Order/i,
      exact: false,
    })
    userEvent.click(placeOrderButton)
    expect(
      await screen.getByRole('heading', {
        name: /Payment Successful/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const successMessageElement = screen.getByText(
      /Thank you for ordering Your payment is successfully completed/i,
      {exact: false},
    )
    expect(successMessageElement.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it('After Payment Successful, If the user click the HTML button element with text "Go to Home Page" then the page should redirect to home page:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />, {route: restaurantDetailsPath})
    expect(
      await screen.findByRole('heading', {
        name: restaurantDetailsResponse.name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const foodItems = screen.getAllByTestId('foodItem')
    const firstFoodItem = foodItems[0]
    const firstFoodItemAddButton = within(firstFoodItem).getByRole('button', {
      name: /Add/i,
      exact: false,
    })
    userEvent.click(firstFoodItemAddButton)
    expect(
      within(firstFoodItem).queryByRole('button', {
        name: /Add/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
    userEvent.click(listEl[1])
    expect(
      await screen.queryByRole('heading', {
        name: /No Order Yet!/i,
        exact: false,
      }),
    ).not.toBeInTheDocument()

    const cartItems = screen.getAllByTestId('cartItem')
    const firstCartItem = cartItems[0]
    const firstCartItemQuantity = within(firstCartItem).getByTestId(
      'item-quantity',
    )
    expect(firstCartItemQuantity.textContent).toBe('1')
    const placeOrderButton = screen.getByRole('button', {
      name: /Place Order/i,
      exact: false,
    })
    userEvent.click(placeOrderButton)
    expect(
      await screen.getByRole('heading', {
        name: /Payment Successful/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const successMessageElement = screen.getByText(
      /Thank you for ordering Your payment is successfully completed/i,
      {exact: false},
    )
    expect(successMessageElement.tagName).toBe('P')
    const goToHomePage = screen.getByRole('button', {
      name: /Go to Home Page/i,
      exact: false,
    })
    userEvent.click(goToHomePage)
    restoreGetCookieFns()
  })
})
