const BASE_URL = "http://185.244.172.108:8081/v1/outlay-rows/entity/128439/row";

export function api(input: string, init?: RequestInit | undefined) {
  return fetch(BASE_URL + input, init);
}
