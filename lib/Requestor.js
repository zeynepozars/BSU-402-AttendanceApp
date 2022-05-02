module.exports = {
  upload: async function (url, api_key, photo, query_params) {
    var ret = [];
    for (var d in query_params) {
      ret.push(
        encodeURIComponent(d) + "=" + encodeURIComponent(query_params[d])
      );
    }

    var url = url + "?" + ret.join("&");

    return await fetch(
      url,
      "POST",
      {
        Accept: "application/json",
        "Content-Type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": api_key,
      },
      photo
    )
      .then((res) => {
        return res;
      })
      /*
      .then((json) => {
        console.log("json: " + JSON.stringify(json));
        return json;
      })*/
      .catch(function (error) {
        console.log(error);
      });
  },

  request: async function (url, method, api_key, data) {
    let headers = {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": api_key,
    };

    let options = {
      method: method,
      headers: headers,
    };

    if (typeof data != "undefined") {
      options.body = data;
    }

    return await fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
