export function getHashVariable(variable: string, query = window.location.hash.substring(1)): string | boolean {
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return (false);
}

export function clearUrlParams() {
  window.history.pushState("", "", window.location.href.substr(0, window.location.href.indexOf('#')));
}

export function getUrlWithQueryParams(url: string, params: any) {
  const esc: any = encodeURIComponent;
  const query: string = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
  return url + '?' + query;
}