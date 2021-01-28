function NutritionInfoRow({item, selectCb = null}) {
  const {
    dessert,
    nutritionInfo: {
      calories,
      fat,
      carb,
      protein
    }
  } = item;

  const handleSelect = (e) => {
    if (selectCb !== null && typeof selectCb === 'function') {
      selectCb(dessert)
    }
  }

  return (
    <tr>
      <td className="pv3 pr3 bb b--black-20"><input type="checkbox" onClick={handleSelect}/></td>
      <td className="pv3 pr3 bb b--black-20">{dessert}</td>
      <td className="pv3 pr3 bb b--black-20">{calories}</td>
      <td className="pv3 pr3 bb b--black-20">{fat}</td>
      <td className="pv3 pr3 bb b--black-20">{carb}</td>
      <td className="pv3 pr3 bb b--black-20">{protein}</td>
    </tr>
  )
}

export default NutritionInfoRow