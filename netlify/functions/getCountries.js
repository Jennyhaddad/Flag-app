const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


exports.handler = async function () {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Fel vid hämtning från API" }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Serverfel", details: err.message }),
    };
  }
};
