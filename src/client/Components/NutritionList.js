import { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient
} from 'react-query';

import { fetchDesserts, deleteDessert } from '../api';
import NutritionInfoRow from './NutritionInfoRow';

function useDesserts() {
  return useQuery("desserts", fetchDesserts);
}

function NutritionList() {
  const [selected, setSelected] = useState([]);
  const { data, isFetching } = useDesserts();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteDessert, {
    onSuccess: () => {
      queryClient.invalidateQueries("desserts");
    }
  });
  const history = useHistory();

  const handleAddNew = (e) => {
    e.preventDefault();
    history.push('/add');
  }

  const handleDelete = (e) => {
    e.preventDefault();
    for (const dessert of selected) {
      mutation.mutate({
        dessert
      })
    }
    setSelected([])
  }

  const handleSelect = (name) => {
    setSelected(prevSelected => {
      if (prevSelected.indexOf(name) !== -1) {
          let newSelected = prevSelected.filter(item => item !== name)
          return newSelected
      }
      return [...prevSelected, name]
    });
  }

  return (
    <div className="pa4">
        <div className="overflow-auto">
          <div className="mw8 center flex justify-between pb3">
            <span>{selected.length > 0 && <p>{selected.length} items selected</p>}</span>
            <div>
              <button className="bg-dark-green white ph2 pv2 br2 w4 ma2" type="button" onClick={handleAddNew}>+ Add New</button>
              <button className="bg-dark-red white ph2 pv2 br2 w4 ma2" type="button" disabled={selected.length === 0} onClick={handleDelete}>Delete</button>
            </div>
          </div>
          <table className="f6 w-100 mw8 center" cellSpacing="0">
            <thead>
              <tr>
                <th className="fw6 bb b--black-20 tl pv3 pr3 bg-white"/>
                <th className="fw6 bb b--black-20 tl pv3 pr3 bg-white">Dessert</th>
                <th className="fw6 bb b--black-20 tl pv3 pr3 bg-white">Calories</th>
                <th className="fw6 bb b--black-20 tl pv3 pr3 bg-white">Fat</th>
                <th className="fw6 bb b--black-20 tl pv3 pr3 bg-white">Carbs</th>
                <th className="fw6 bb b--black-20 tl pv3 pr3 bg-white">Protein</th>
              </tr>
            </thead>
            {!isFetching && (
              <tbody className="lh-copy">
                {data.length > 0 && data.map(item => <NutritionInfoRow key={item.dessert} item={item} selectCb={handleSelect} />)}
              </tbody>
            )}
          </table>
        </div>
    </div>
  )
}

export default NutritionList