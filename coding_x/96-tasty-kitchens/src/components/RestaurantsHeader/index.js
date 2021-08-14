import './index.css'

const optionProperties = ['selected', 'disabled', 'hidden']

const RestaurantsHeader = props => {
  const {sortByOptions, activeOptionId, updateActiveOptionId} = props
  const onChangeSortBy = event => {
    updateActiveOptionId(event.target.value)
  }
  return (
    <div className="Restaurants-header">
      <div className="text-container">
        <h1 className="Restaurants-list-heading">Popular Restaurants</h1>
        <p className="Restaurants-list-description">
          Select Your favourite restaurent special dish and make your day
          happy...
        </p>
      </div>

      <div className="sort-by-container">
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortBy}
          data-testid="select"
        >
          {sortByOptions.map((eachOption, index) => {
            if (index) {
              return (
                <option
                  key={eachOption.id}
                  value={eachOption.value}
                  className="select-option"
                  data-testid="select-option"
                >
                  {eachOption.displayText}
                </option>
              )
            }
            return (
              <option
                key={eachOption.id}
                value={eachOption.value}
                className="select-option"
                data-testid="select-option"
                disabled
              >
                {eachOption.displayText}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
export default RestaurantsHeader
