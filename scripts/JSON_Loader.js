export async function loadJSONData(url) {
  try {
    const response = await fetch(url); // network request

    var jsonData = await response.json(); // Parse the JSON into an object
    console.log(jsonData);

    return jsonData;
  } 
  
  catch (error) {
    console.error('Error fetching JSON:', error);
  }
}