const apiKey = process.env.REACT_APP_API_KEY;

export const checkWord = async (word) => {

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "dictionary-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`,
      options
    );
    const json = await response.json();
    if (json.valid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error validating the word.");
  }
};

export const getNewWord = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(
      "https://random-words5.p.rapidapi.com/getRandom?wordLength=5",
      options
    );
    const word = await response.text();
    return word;
  } catch (error){
    throw new Error("Error getting the new word.");
  }
};
