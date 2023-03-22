const prefix = "http://192.168.0.250:3001";

function bindUrl(path: string, pathParams: any) {
  var url = path;
  url = url.replace(/\{([\w-]+)\}/g, (fullMatch, key) => {
    var value;
    if (pathParams?.hasOwnProperty?.(key)) {
      value = pathParams[key];
    } else {
      value = fullMatch;
    }
    return encodeURIComponent(value);
  });
  return url;
}

const post = async (url: string, params = {}) => {
  const result = await fetch(`${prefix}${url}`, {
    method: "POST",
    mode: "cors", // 支持跨域
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json());
  return result;
};

const get = async (url: string, params = {}) => {
  const result = await fetch(bindUrl(`${prefix}${url}`, params), {
    method: "GET",
    mode: "cors", // 支持跨域
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  console.log({ result });

  return result;
};

export { post, get };
