import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import Cookies from 'js-cookie'

import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {setupServer} from 'msw/node'
import {rest} from 'msw'

import App from '../App'

const websiteLogo =
  'https://res.cloudinary.com/dj7inbtyj/image/upload/v1628333520/Mini%20Projects/Frame_274_rdzv2v.png'

const websiteTextLogo =
  'https://res.cloudinary.com/dj7inbtyj/image/upload/v1628333521/Mini%20Projects/Features_yewexf.png'

const loginImage =
  'https://res.cloudinary.com/dj7inbtyj/image/upload/v1628333426/Mini%20Projects/Rectangle_1456_q3zlrx.png'

const loginRoutePath = '/login'
const homeRoutePath = '/'

const loginSuccessResponse = {
  jwt_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
}

const passwordIncorrect = {
  error_msg: "Username and Password didn't match",
}

const invalidUser = {
  error_msg: 'Username is not found',
}
const invalidInputs = {
  error_msg: 'Username or password is invalid',
}

const apiUrl = 'https://apis.ccbp.in/login'

const server = setupServer(
  rest.post(apiUrl, (req, res, ctx) => {
    const username = JSON.parse(req.body).username
    const password = JSON.parse(req.body).password

    if (
      username === '' ||
      password === '' ||
      username === undefined ||
      password === undefined
    )
      return res(ctx.status(400, 'invalid request'), ctx.json(invalidInputs))
    else if (username === 'rahul' && password === 'rahul@2021')
      return res(ctx.json(loginSuccessResponse))
    else if (username === 'rahul' && password !== 'rahul@2021')
      return res(
        ctx.status(401, 'invalid request'),
        ctx.json(passwordIncorrect),
      )
    else return res(ctx.status(404, 'invalid request'), ctx.json(invalidUser))
  }),
)

let historyInstance
const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const mockSetCookie = () => {
  jest.spyOn(Cookies, 'set')
  Cookies.set = jest.fn()
}

const restoreSetCookieFns = () => {
  Cookies.set.mockRestore()
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

const rtlRender = (ui = <App />, path = '/') => {
  historyInstance = createMemoryHistory()
  historyInstance.push(path)
  render(<Router history={historyInstance}>{ui}</Router>)
  return {
    history: historyInstance,
  }
}

describe('Tasty Kitchen Authentication Login Route Tests', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error')
    server.listen()
  })

  afterEach(() => {
    expect(console.error).not.toHaveBeenCalled()
    server.resetHandlers()
  })
  afterAll(() => {
    console.error.mockRestore()
    server.close()
  })

  it('When a user successfully sign in then the Cookies.set() method should be called:::5:::', async () => {
    mockSetCookie()
    rtlRender(<App />, loginRoutePath)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(submitButton)
    await waitFor(() => expect(Cookies.set).toHaveBeenCalled())
    restoreSetCookieFns()
  })

  it('When a user successfully sign in then the Cookies.set() method should be called with three arguments - "jwt_token" string as the first argument, JWT token value as the second argument and expiry days as the third argument:::5:::', async () => {
    mockSetCookie()
    rtlRender(<App />, loginRoutePath)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const submitButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(submitButton)
    await waitFor(() =>
      expect(Cookies.set).toHaveBeenCalledWith(
        'jwt_token',
        loginSuccessResponse.jwt_token,
        expect.objectContaining({expires: expect.any(Number)}),
      ),
    )
    restoreSetCookieFns()
  })

  it('When the "/login" is provided in the browser tab then the page should be navigated to LoginRoute and consists of an HTML input element with "lucifer" as a placeholder:::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(
      screen.getByPlaceholderText(/Lucifer/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it.skip('LoginRoute should consist of an HTML input element with "Password" as a placeholder:::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(
      screen.getByPlaceholderText(/Password/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it('LoginRoute should consist of an HTML image element with the given logo URL as src and alt text as "website logo":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    const imageEl = screen.getAllByRole('img', {name: /website logo/i})
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(websiteLogo)
  })

  it('LoginRoute should consist of an HTML image element with the given text logo URL as src and alt text as "website text logo":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    const imageEl = screen.getAllByRole('img', {name: /website text logo/i})
    expect(imageEl[0]).toBeInTheDocument()
    expect(imageEl[0].src).toBe(websiteTextLogo)
  })

  it('LoginRoute should consist of an HTML image element with the given login URL as src and alt text as "website login":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    const imageEl = screen.getByRole('img', {name: /website login/i})
    expect(imageEl).toBeInTheDocument()
    expect(imageEl.src).toBe(loginImage)
  })

  it('LoginRoute should consist of an HTML label element with text content as "USERNAME":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it('LoginRoute should consist of the USERNAME input field with type as "text":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }).type,
    ).toBe('text')
  })

  it('LoginRoute should consist of an HTML label element with text content as "PASSWORD":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(
      screen.getByLabelText(/PASSWORD/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
  })
  it('LoginRoute should consist of the PASSWORD input field with type as "password":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    expect(screen.getByLabelText(/PASSWORD/i, {exact: false}).type).toBe(
      'password',
    )
  })
  it('LoginRoute should consist of an HTML button element with "Sign in" as text content and type as "submit":::5:::', () => {
    rtlRender(<App />, loginRoutePath)
    const buttonEl = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    expect(buttonEl).toBeInTheDocument()
    expect(buttonEl.type).toBe('submit')
  })

  it('When an authenticated user tries to access the LoginRoute then the page should be redirected to HomeRoute:::5:::', async () => {
    mockGetCookie()
    const {history} = rtlRender(<App />, loginRoutePath)
    await waitFor(() => expect(history.location.pathname).toBe(homeRoutePath))
    restoreGetCookieFns()
  })

  it('When a valid username is provided and the sign in button is clicked with an empty password then the respective error message should be displayed using an HTML paragraph element:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    expect(history.location.pathname).toBe(loginRoutePath)

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(signinButton)
    await waitFor(() =>
      screen.getByText(/Username or password is invalid/i, {
        exact: false,
      }),
    )
    const paragraphEl = screen.getByText(/Username or password is invalid/i, {
      exact: false,
    })
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
  })

  it('When a valid username is provided and the sign in button is clicked with an empty password then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, '')
    userEvent.click(signinButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Username or password is invalid/i, {
          exact: false,
        }),
      ).toBeInTheDocument(),
    )
    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it('When a non-empty password is provided and the sign in button is clicked with an empty username then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, '')
    userEvent.type(passwordField, 'rahul1')
    userEvent.click(signinButton)
    await waitFor(() =>
      expect(
        screen.getByText(/Username or password is invalid/i, {
          exact: false,
        }),
      ).toBeInTheDocument(),
    )

    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it('When an invalid username and password are provided and the Sign in button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'unknown')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(signinButton)
    await waitFor(() =>
      expect(
        screen.getByText(/Username is not found/i, {
          exact: false,
        }),
      ).toBeInTheDocument(),
    )
    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it('When a valid username and invalid password are provided and the sign in button is clicked then the respective error message should be displayed and the page should not be navigated:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)
    mockHistoryReplace(history)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    expect(history.location.pathname).toBe('/login')

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'wrongPassword')
    userEvent.click(signinButton)

    await waitFor(() =>
      expect(
        screen.getByText(/Username and Password didn't match/i, {exact: false}),
      ).toBeInTheDocument(),
    )
    expect(history.location.pathname).toBe(loginRoutePath)
  })

  it('When a valid username and password are provided and the sign button is clicked then the page should be navigated to HomeRoute:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })

    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(signinButton)

    mockGetCookie()
    await waitFor(() => expect(history.location.pathname).toBe(homeRoutePath))

    restoreGetCookieFns()
  })

  it('When a valid username and password are provided and the sign in button is clicked then the history.replace() method should be called:::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)
    mockHistoryReplace(history)

    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(signinButton)
    await waitFor(() => expect(history.replace).toHaveBeenCalled())
    restoreHistoryReplace(history)
  })

  it('When a valid username and password are provided and the sign in button is clicked then the history.replace() method should be called with the argument "/":::5:::', async () => {
    const {history} = rtlRender(<App />, loginRoutePath)
    mockHistoryReplace(history)
    const usernameField = screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    const passwordField = screen.getByLabelText(/PASSWORD/i, {
      exact: false,
    })
    const signinButton = screen.getByRole('button', {
      name: /Sign in/i,
      exact: false,
    })
    userEvent.type(usernameField, 'rahul')
    userEvent.type(passwordField, 'rahul@2021')
    userEvent.click(signinButton)
    await waitFor(() => screen.queryByText('Home'))
    restoreHistoryReplace(history)
  })
})
