export const useMap = () => {
  function splitArray(array, chunkSize) {
    const result = []; // Initialize an empty array to store the chunked arrays
    for (let i = 0; i < chunkSize; i++) {
      const chunk = array.splice(0, 1)[0]; // Extract a chunk of the array
      if (!chunk) break;
      result.push(chunk); // Push the chunk into the result array
    }
    return { result, remaining: array }; // Return the array of chunked arrays
  }
  // accept 3 parameter
  // array parameter is the array to be splited
  // chunkSize parameter is the size of each splitted array
  // splitted parameter is the container of each splitted array, default is []
  function splitArrayForGrid(
    array,
    chunkSize,
    splitted = []
  ) {
    const { result, remaining } = splitArray(
      array,
      chunkSize || 5
    );

    const pushObj = {
      values: result,
    };
    splitted.push(pushObj);
    if (remaining.length > 0)
      splitArrayForGrid(remaining, chunkSize, splitted);

    return splitted;
  }
  return {
    splitArray,
    splitArrayForGrid,
  };
};
