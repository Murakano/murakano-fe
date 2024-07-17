export const updateState = (field, value, setState) => {
  setState((prevState) => ({
    ...prevState,
    [field]: value,
  }));
};

export const handleInputChange = (e, setState) => {
  const { name, value } = e.target;
  setState((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
