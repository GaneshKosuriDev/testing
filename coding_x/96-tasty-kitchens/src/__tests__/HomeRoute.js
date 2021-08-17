import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

const websiteLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

const homeImage =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png'

const notFoundPageImage =
  'https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png'

const offersListResponse = {
  offers: [
    {
      image_url:
        'https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-jammu-special.jpg',
      id: 1,
    },
    {
      image_url:
        'https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-rajasthani-special.jpg',
      id: 2,
    },
    {
      image_url:
        'https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-uttar-pradesh-special.jpg',
      id: 3,
    },
    {
      image_url:
        'https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-north-indian-special.jpg',
      id: 4,
    },
  ],
}

const pageOneRestaurantsListInitialResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 345,
        rating: 3.4,
      },
      id: '2200043',
      name: 'Village Traditional Foods',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 700,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg',
      menu_type: 'VEG',
      location:
        '1-8-303, Sindhi Colony Rd, Sindhi Colony, Begumpet, Hyderabad, Telangana 500003',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 461,
        rating: 3.5,
      },
      name: 'BHotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/b-hotel-akbar-2200044.jpg',
      id: '2200044',
      menu_type: 'VEG',
      location:
        'Metro Pillar Number KUK39, 1-10-74, 1st Floor, Above Balaji Family Dhaba Hotel',
      opens_at: '09:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 206,
        rating: 3.9,
      },
      name: 'Hotel Sri Ganesh Bhavan',
      cost_for_two: 200,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hotel-sriganesh-bhavan-2200045.jpg',
      id: '2200045',
      menu_type: 'VEG',
      location: 'Fortune Enclave, Sri Ram Nagar Colony, Banjara Hills, ',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 276,
        rating: 3.8,
      },
      name: 'Arunodaya Restuarent',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/arunodaya-restaurant-2200132.jpg',
      id: '2200132',
      menu_type: 'VEG',
      location:
        'NV Plaza, 4th Floor, Punjagutta Rd, Dwarakapuri, Punjagutta, Hyderabad',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Very Good',
        rating_color: '5BA829',
        total_reviews: 140,
        rating: 4.1,
      },
      name: 'Cafe Madarassi',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 150,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/cafe-madarassi-2200153.jpg',
      id: '2200153',
      menu_type: 'VEG',
      location:
        'Dubai colony rode no:1 pradhan mantri kusal kendra 4th floor, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 192,
        rating: 3.8,
      },
      name: 'Time Pass The Park Restaurent',
      has_table_booking: 0,
      location: 'Hno. 1-98-9, plot no 23, Silicon Valley, Hyderabad,',
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/time-pass-the-park-restaurent-2200055.jpg',
      id: '2200055',
      menu_type: 'NON-VEG',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 71,
        rating: 3.8,
      },
      name: 'Come and Eat',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 400,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/come-and-eat-2200236.webp',
      id: '2200236',
      menu_type: 'VEG',
      location: ' Srinivasa Nagar, Ameerpet, Hyderabad,',
      opens_at: '11:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 111,
        rating: 3.5,
      },
      name: 'Hydarabad Spices',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 400,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hydarabad-spices-2200033.jpg',
      id: '2200033',
      menu_type: 'VEG',
      location:
        'Parkview garden Appartments,Masabtank, Humayun Nagar, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 94,
        rating: 3.7,
      },
      name: 'New Hotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/new-hotel-akbar-2200143.jpg',
      id: '2200143',
      menu_type: 'VEG',
      location: 'K P H B Phase 6, Kukatpally, Hyderabad',
      opens_at: '10:30 AM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const pageOneRestaurantsListSortByHighestResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Very Good',
        rating_color: '5BA829',
        total_reviews: 140,
        rating: 4.1,
      },
      name: 'Cafe Madarassi',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 150,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/cafe-madarassi-2200153.jpg',
      id: '2200153',
      menu_type: 'VEG',
      location:
        'Dubai colony rode no:1 pradhan mantri kusal kendra 4th floor, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 206,
        rating: 3.9,
      },
      name: 'Hotel Sri Ganesh Bhavan',
      cost_for_two: 200,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hotel-sriganesh-bhavan-2200045.jpg',
      id: '2200045',
      menu_type: 'VEG',
      location: 'Fortune Enclave, Sri Ram Nagar Colony, Banjara Hills, ',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 276,
        rating: 3.8,
      },
      name: 'Arunodaya Restuarent',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/arunodaya-restaurant-2200132.jpg',
      id: '2200132',
      menu_type: 'VEG',
      location:
        'NV Plaza, 4th Floor, Punjagutta Rd, Dwarakapuri, Punjagutta, Hyderabad',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 192,
        rating: 3.8,
      },
      name: 'Time Pass The Park Restaurent',
      has_table_booking: 0,
      location: 'Hno. 1-98-9, plot no 23, Silicon Valley, Hyderabad,',
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/time-pass-the-park-restaurent-2200055.jpg',
      id: '2200055',
      menu_type: 'NON-VEG',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 71,
        rating: 3.8,
      },
      name: 'Come and Eat',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 400,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/come-and-eat-2200236.webp',
      id: '2200236',
      menu_type: 'VEG',
      location: ' Srinivasa Nagar, Ameerpet, Hyderabad,',
      opens_at: '11:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 94,
        rating: 3.7,
      },
      name: 'New Hotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/new-hotel-akbar-2200143.jpg',
      id: '2200143',
      menu_type: 'VEG',
      location: 'K P H B Phase 6, Kukatpally, Hyderabad',
      opens_at: '10:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 461,
        rating: 3.5,
      },
      name: 'BHotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/b-hotel-akbar-2200044.jpg',
      id: '2200044',
      menu_type: 'VEG',
      location:
        'Metro Pillar Number KUK39, 1-10-74, 1st Floor, Above Balaji Family Dhaba Hotel',
      opens_at: '09:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 111,
        rating: 3.5,
      },
      name: 'Hydarabad Spices',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 400,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hydarabad-spices-2200033.jpg',
      id: '2200033',
      menu_type: 'VEG',
      location:
        'Parkview garden Appartments,Masabtank, Humayun Nagar, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 345,
        rating: 3.4,
      },
      id: '2200043',
      name: 'Village Traditional Foods',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 700,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg',
      menu_type: 'VEG',
      location:
        '1-8-303, Sindhi Colony Rd, Sindhi Colony, Begumpet, Hyderabad, Telangana 500003',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const pageOneRestaurantsListSortByLowestResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 345,
        rating: 3.4,
      },
      id: '2200043',
      name: 'Village Traditional Foods',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 700,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg',
      menu_type: 'VEG',
      location:
        '1-8-303, Sindhi Colony Rd, Sindhi Colony, Begumpet, Hyderabad, Telangana 500003',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 461,
        rating: 3.5,
      },
      name: 'BHotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/b-hotel-akbar-2200044.jpg',
      id: '2200044',
      menu_type: 'VEG',
      location:
        'Metro Pillar Number KUK39, 1-10-74, 1st Floor, Above Balaji Family Dhaba Hotel',
      opens_at: '09:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 111,
        rating: 3.5,
      },
      name: 'Hydarabad Spices',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 400,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hydarabad-spices-2200033.jpg',
      id: '2200033',
      menu_type: 'VEG',
      location:
        'Parkview garden Appartments,Masabtank, Humayun Nagar, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 94,
        rating: 3.7,
      },
      name: 'New Hotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/new-hotel-akbar-2200143.jpg',
      id: '2200143',
      menu_type: 'VEG',
      location: 'K P H B Phase 6, Kukatpally, Hyderabad',
      opens_at: '10:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 276,
        rating: 3.8,
      },
      name: 'Arunodaya Restuarent',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/arunodaya-restaurant-2200132.jpg',
      id: '2200132',
      menu_type: 'VEG',
      location:
        'NV Plaza, 4th Floor, Punjagutta Rd, Dwarakapuri, Punjagutta, Hyderabad',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 192,
        rating: 3.8,
      },
      name: 'Time Pass The Park Restaurent',
      has_table_booking: 0,
      location: 'Hno. 1-98-9, plot no 23, Silicon Valley, Hyderabad,',
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/time-pass-the-park-restaurent-2200055.jpg',
      id: '2200055',
      menu_type: 'NON-VEG',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 71,
        rating: 3.8,
      },
      name: 'Come and Eat',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 400,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/come-and-eat-2200236.webp',
      id: '2200236',
      menu_type: 'VEG',
      location: ' Srinivasa Nagar, Ameerpet, Hyderabad,',
      opens_at: '11:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 206,
        rating: 3.9,
      },
      name: 'Hotel Sri Ganesh Bhavan',
      cost_for_two: 200,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hotel-sriganesh-bhavan-2200045.jpg',
      id: '2200045',
      menu_type: 'VEG',
      location: 'Fortune Enclave, Sri Ram Nagar Colony, Banjara Hills, ',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Very Good',
        rating_color: '5BA829',
        total_reviews: 140,
        rating: 4.1,
      },
      name: 'Cafe Madarassi',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 150,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/cafe-madarassi-2200153.jpg',
      id: '2200153',
      menu_type: 'VEG',
      location:
        'Dubai colony rode no:1 pradhan mantri kusal kendra 4th floor, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const pageTwoRestaurantsListInitialResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 122,
        rating: 3.4,
      },
      name: 'Oyalo Pizza',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 800,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/oyalo-pizza-2200030.jpg',
      id: '2200030',
      menu_type: 'VEG',
      location: 'Bachupally, Hyderabad',
      opens_at: '02:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 56,
        rating: 3.6,
      },
      name: 'Royal Spicy Foods',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 150,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/royal-spicy-foods-2200201.jpg',
      id: '2200201',
      menu_type: 'VEG',
      location: 'Mehdipatnam, Hyderabad',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 44,
        rating: 3.4,
      },
      name: 'JayaSree Restaurant',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 600,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/jaya-sree-restaurant-2200149.jpg',
      id: '2200149',
      menu_type: 'VEG',
      location: 'Somajiguda Beside Lane of Ford Car show Room, ',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 98,
        rating: 3.4,
      },
      name: 'Street Food Avenue',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 1200,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/street-food-avenue-2200001.webp',
      id: '2200001',
      menu_type: 'VEG',
      location:
        ' Sun Complex. Beside Airtel Office, opp. Indo English School, Santosh Nagar, Hyderabad,',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 91,
        rating: 3.5,
      },
      name: 'Kalasree Restaurent',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 300,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/kalasree-restaurent-2200067.webp',
      id: '2200067',
      menu_type: 'VEG',
      location:
        ' SR Nagar Main Rd, Sanjeeva Reddy Nagar Office Area, Sanjeeva Reddy Nagar, Hyderabad,',
      opens_at: '04:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 26,
        rating: 3.4,
      },
      name: 'Kwality',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Bakery',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/kwality-2200358.jpg',
      id: '2200358',
      menu_type: 'VEG',
      location:
        'Near, Ground Floor, Gowra Trinity, Police Lane, Passport Office Rd, Patigadda, ',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 51,
        rating: 3.6,
      },
      name: 'Mr.Ice Cream',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 700,
      cuisine: 'Bakery',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/mr-ice-cream-2200283.webp',
      id: '2200283',
      menu_type: 'VEG',
      location: 'Street Number 6, Domalguda, Himayatnagar, Hyderabad,',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: false,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 49,
        rating: 3.4,
      },
      name: 'Upper Crust',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 350,
      cuisine: 'Bakery',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/upper-crust-2300162.webp',
      id: '2300162',
      menu_type: 'VEG',
      location: 'Balapur Basthi, Banjara Hills, Hyderabad,',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 97,
        rating: 3.9,
      },
      name: 'Mr Brown',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Bakery',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/mr-brown-2300183.webp',
      id: '2300183',
      menu_type: 'VEG',
      location: 'Addagutta Society - HMT Hills Rd, Kukatpally, Hyderabad,',
      opens_at: '04:00 PM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const apiUrlOffers = 'https://apis.ccbp.in/restaurants-list/offers'
const restaurantsAPIURL = 'https://apis.ccbp.in/restaurants-list'

const server = setupServer(
  rest.get(apiUrlOffers, (req, res, ctx) => res(ctx.json(offersListResponse))),
  rest.get(restaurantsAPIURL, (req, res, ctx) => {
    const query = req.url.searchParams
    const offset = query.get('offset')
    const limit = query.get('limit')
    const sortByRating = query.get('sort_by_rating')
    if (offset === '0' && (sortByRating === undefined || sortByRating === '')) {
      return res(ctx.json(pageOneRestaurantsListInitialResponse))
    } else if (offset === '0' && sortByRating === 'Highest') {
      return res(ctx.json(pageOneRestaurantsListSortByHighestResponse))
    } else if (offset === '0' && sortByRating === 'Lowest') {
      return res(ctx.json(pageOneRestaurantsListSortByLowestResponse))
    } else return res(ctx.json(pageTwoRestaurantsListSortByHighestResponse))
  }),
)

const loginRoutePath = '/login'
const homeRoutePath = '/'
const notFoundRoutePath = '/bad-path'

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

const rtlRender = (ui = <App />, path = '/') => {
  const history = createMemoryHistory()
  history.push(path)
  render(<Router history={history}>{ui}</Router>)
  return {
    history,
  }
}

const originalConsoleError = console.error

describe('Tasty Kitchen Application Authentication Home Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it.skip('When HTTP GET request should be made to offersApi is successful, the page should consist of at least two HTML list items, and the offers list should be rendered using a unique key as a prop for each similar offer item :::5:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    rtlRender(<App />, homeRoutePath)
    restoreGetCookieFns()

    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    console.error = originalConsoleError
    restoreGetCookieFns()
  })

  it.skip('HomeRoute should consist of an HTML image element with the given logo URL as src and alt text as "website logo":::5:::', async () => {
    rtlRender(<App />, homeRoutePath)
    const imageEls = screen.getAllByRole('img', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
  })

  it.skip('HomeRoute should consist of an HTML list item element with "Home" as text content:::5:::', async () => {
    rtlRender(<App />, homeRoutePath)
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[0].textContent).toMatch(/Home/i)
  })

  it.skip('HomeRoute should consist of an HTML list item element with "Cart" as text content:::5:::', async () => {
    rtlRender(<App />, homeRoutePath)
    const listEl = screen.getAllByRole('listitem')
    expect(listEl[1].textContent).toMatch(/Cart/i)
  })

  it.skip('HomeRoute should consist of an HTML button element with "Logout" as text content:::5:::', async () => {
    rtlRender(<App />, homeRoutePath)
    expect(
      await screen.getByRole('button', {
        name: /Logout/,
        exact: false,
      }),
    ).toBeInTheDocument()
  })

  it.skip('When the logout button is clicked then the Cookies.remove() method should be called with the "jwt_token" string as an argument:::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)

    const logoutBtn = await screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.click(logoutBtn)
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it.skip('When the logout button is clicked then the history.replace() method should be called with the argument "/login":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    const logoutBtn = await screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })

    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(logoutBtn)
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it.skip('When the logout button is clicked then the page should be navigated to LoginRoute:::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
      exact: false,
    })
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(logoutBtn)

    await waitFor(() => expect(history.location.pathname).toBe(loginRoutePath))
    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })

  it.skip('When the "/bad-path" is provided in the browser tab then the page should be navigated to NotFoundRoute and consists of an HTML image element with the given not found image and alt text as "page not found":::5:::', async () => {
    const {history} = rtlRender(<App />, notFoundRoutePath)
    const imageEl = await screen.getByRole('img', {
      name: /page not found/i,
      exact: false,
    })
    expect(imageEl).toBeInTheDocument()
    expect(history.location.pathname).toBe(notFoundRoutePath)
  })

  it.skip('HomeRoute should consist of an HTML heading element with "Popular Restaurants" as text content:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      await screen.getByRole('heading', {
        name: /Popular Restaurants/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it.skip('HomeRoute should consist of an HTML paragraph element with "Select Your favourite restaurent special dish and make your day happy..." as text content:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = await screen.getByText(
      /Select Your favourite restaurent special dish and make your day happy.../i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it.skip('When the Home Route is opened, it should initially contain an HTML container element with testid attribute value as "loader":::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    await screen.queryByTestId('loader')

    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it.skip('When the Restaurants List offers and Restaurants data fetched successfully then the HTML container element with testid attribute value as "loader" should not visible to the user:::5:::', async () => {
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    await screen.queryByTestId('loader')

    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    await expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    restoreGetCookieFns()
  })

  it.skip('When the Home Route is opened then the page should contain at least 2 HTML images with alt text as "offer":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })

  it.skip('When the Home Route is opened then the page should contain 9 HTML images restaurants list items with aria-label="restaurant-list":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByRole('listitem', {
      name: /restaurant-item/i,
    })
    expect(restaurantsListItems.length).toBe(9)
    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })

  it.skip('When the Home Route is opened then the page should contain at least 2 HTML images with alt text as "offer":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })

  it.skip('The Restaurants List select filter should contain "Sort By" as default selected value:::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('option', {name: 'Sort by'}).selected).toBe(true)
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(false)
    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })

  it.skip('The Restraunts List should be sort by Highest when user select sort by filter value as "Highest":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.selectOptions(screen.getByRole('combobox'), ['Highest'])
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Cafe Madarassi/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('option', {name: 'Sort by'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(true)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(false)

    const {restaurants} = pageOneRestaurantsListSortByHighestResponse
    const {name} = restaurants[0]
    const restaurantsListItems = screen.getAllByRole('listitem', {
      name: /restaurant-item/i,
    })
    expect(
      await within(restaurantsListItems[0]).findByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })

  it.skip('The Restraunts List should be sort by Highest when user select sort by filter value as "Lowest":::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.selectOptions(screen.getByRole('combobox'), ['Lowest'])
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('option', {name: 'Sort by'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(true)

    const {restaurants} = pageOneRestaurantsListSortByLowestResponse
    const {name} = restaurants[3]
    const restaurantsListItems = screen.getAllByRole('listitem', {
      name: /restaurant-item/i,
    })
    expect(
      await within(restaurantsListItems[3]).findByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })

  it.skip('When the HTML button element with testid="pagination-right-button" is clicked then restraunts List of second page with selected filter should be visible to the user:::5:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    // userEvent.selectOptions(screen.getByRole('combobox'), ['Highest'])
    // const paginationRightBtn = await screen.findByTestId(
    //   'pagination-right-button',
    // )

    screen.debug()

    // expect(paginationRightBtn).toBeInTheDocument()
    // const {} = pageTwoRestaurantsListInitialResponse
    // userEvent.click(screen.getByText('Check'))
    // userEvent.click(paginationRightBtn)
    // await screen.findAllByAltText(/offer/i, {exact: false})
    // expect(
    //   await screen.findByRole('heading', {
    //     name: /Oyalo Pizza/i,
    //     exact: false,
    //   }),
    // ).toBeInTheDocument()

    // const {restaurants} = pageOneRestaurantsListSortByLowestResponse
    // const {name} = restaurants[3]
    // const restaurantsListItems = screen.getAllByRole('listitem', {
    //   name: /restaurant-item/i,
    // })

    // expect(
    //   await within(restaurantsListItems[3]).findByRole('heading', {
    //     name,
    //     exact: false,
    //   }),
    // ).toBeInTheDocument()

    restoreGetCookieFns()
    restoreRemoveCookieFns()
  })
})
