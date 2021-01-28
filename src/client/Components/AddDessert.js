import { useReducer, useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from "react-router-dom";

import { addDessert } from '../api';

// import FormField from './FormField';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

function AddDessert() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [formError, setFormError] = useState(false);
  const history = useHistory();

  const mutation = useMutation(addDessert);

  const handleSubmit = (e) => {
      e.preventDefault();

      if (Object.keys(formData).length === 5) {
        const { dessert, calories, fat, carb, protein } = formData;
        mutation.mutate({
          dessert,
          calories: Number(calories),
          fat: Number(fat),
          carb: Number(carb),
          protein: Number(protein)
        }, {
          onSuccess: () => {
            history.push('/')
          }
        })
        setFormError(false);
      } else {
        setFormError(true);
      }
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }

  return (
    <div className="flex flex-column items-center justify-center wrapper">
      {formError && (
        <div className="flex items-center justify-center pa3 bg-lightest-blue navy">
            <svg className="w1" data-icon="info" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
              <title>info icon</title>
              <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
            </svg>
          <span class="lh-title ml3">Please provide a value for all fields</span>
        </div>
      )}
      <form className="pa4 w-33-ns black-80" onSubmit={handleSubmit}>
        <fieldset className="mb2">
          <div className="measure pb3">
            <label for="dessert" className="f6 b db mb2">Dessert Name</label>
            <input 
              id="dessert"
              name="dessert"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="text"
              aria-describedby="dessert-desc"
              onChange={handleChange} 
            />
          </div>
          <div className="measure pb3">
            <label for="calories" className="f6 b db mb2">Calories</label>
            <input
              id="calories"
              name="calories"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="number"
              min="0"
              aria-describedby="calories-desc"
              onChange={handleChange}
            />
          </div>
          <div className="measure pb3">
            <label for="fat" className="f6 b db mb2">Fat</label>
            <input
              id="fat"
              name="fat"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="number"
              min="0"
              aria-describedby="fat-desc"
              onChange={handleChange} 
            />
          </div>
          <div className="measure pb3">
            <label for="carbs" className="f6 b db mb2">Carbs</label>
            <input
              id="carb"
              name="carb"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="number"
              min="0"
              aria-describedby="carb-desc"
              onChange={handleChange}
            />
          </div>
          <div className="measure pb3">
            <label for="protein" className="f6 b db mb2">Protein</label>
            <input
              id="protein"
              name="protein"
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="number"
              min="0"
              aria-describedby="protein-desc"
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <button className="bg-dark-green white ph2 pv2 w-100 pointer br2" type="submit">Submit</button>
      </form>
  </div>
  )
}

export default AddDessert