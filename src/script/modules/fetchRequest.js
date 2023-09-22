const urlServ = 'https://zealous-veiled-terrier.glitch.me/';

const fetchRequest = async (postfix, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`${urlServ}${postfix}`, options);
    const data = await response.json();

    if (response.ok) {
      if (callback) callback(null, data);

      return data;
    }

    throw new Error(data.message);
  } catch (err) {
    if (callback) callback(err);
  }
};

export {
  fetchRequest,
  urlServ,
};
