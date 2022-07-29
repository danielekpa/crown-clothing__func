const handleChange = function (e, state, setState) {
  e.preventDefault();
  const { name, value } = e.target;
  // console.log(value);
  setState({ ...state, [name]: value });
}

export { handleChange };