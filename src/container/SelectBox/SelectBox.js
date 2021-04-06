import React from 'react';
import axios from 'axios';
import Movie from '../../component/Movie/Movie';
import './SelectBox.css';
import { connect } from 'react-redux';

const GENRE_URL =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=70fdad2a997cb9f5f3d081563775c61f&language=en-US';
const SEARCH_URL =
  'https://api.themoviedb.org/3/discover/movie?api_key=70fdad2a997cb9f5f3d081563775c61f&language=en-US&with_genres=';

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      movies: [],
      id: 28,
    };
  }
  componentDidMount() {
    axios
      .get(GENRE_URL)
      .then((response) => {
        console.log('FETCHED DATA SUCCESSFULLY');
        console.log(response.data.genres);
        this.setState({ genres: response.data.genres });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    console.log(
      'order by: ',
      e.target[e.target.selectedIndex].getAttribute('id')
    );
    this.setState({ id: e.target[e.target.selectedIndex].getAttribute('id') });
  };

  searchMovieHandler = (event, id) => {
    event.preventDefault();
    const url = SEARCH_URL + id;
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.setState({ movies: response.data.results });
        console.log(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
  };

  render() {
    let options = [];
    this.state.genres.map((option) => {
      return options.push(
        <option key={option.id} id={option.id} value={option.name}>
          {option.name}
        </option>
      );
    });
    let movie = null;
    if (this.state.movies) {
      movie = <Movie data={this.state.movies} />;
    }
    return (
      <div>
        <div className="Input">
          <form>
            <select className="InputElement" onChange={this.handleChange}>
              {options}
            </select>
            <button
              className="Button"
              onClick={(event) => this.searchMovieHandler(event, this.state.id)}
            >
              SUBMIT
            </button>
          </form>
        </div>
        {movie}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps)(SelectBox);

//--------------------------------------------------------------------------------

/* import React from 'react';
import Button from '../../component/Button/Button';
import Input from '../../component/Input/Input';

class SelectBox extends React.Component {
  state = {
    selectForm: {
      movieSelect: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'SCI-FI', displayValue: 'SCI_FI' },
            { value: 'Romantic', displayValue: 'Romantic' },
            { value: 'Biography', displayValue: 'Biography' },
            { value: 'Historical', displayValue: 'Historical' },
            { value: 'Crime', displayValue: 'Crime' },
            { value: 'Frictional', displayValue: 'Frictional' },
          ],
        },
        value: 'SCI_FI',
        validation: {},
        valid: true,
      },
    },
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  selectChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.selectForm,
      [controlName]: {
        ...this.state.selectForm[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.selectForm[controlName].validation
        ),
      },
    };
    this.setState({ selectForm: updatedControls });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.selectForm) {
      formElementsArray.push({
        id: key,
        config: this.state.selectForm[key],
      });
    }

    let form = (
      <form>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.selectChangeHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success">SEARCH</Button>
      </form>
    );

    return (
      <div>
        <h4>Select Your Movie Category</h4>
        {form}
      </div>
    );
  }
}

export default SelectBox;
 */

