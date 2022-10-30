const getXAxisLabels = (result) => {
  let xAxisData = result.map((item) => {
    return item.created_on;
  });
  let xAxisLabels = [...new Set(xAxisData)];
  return xAxisLabels;
};

module.exports = {
  getXAxisLabels,
};
