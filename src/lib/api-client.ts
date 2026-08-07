/**
 * FastAPI 백엔드 호출용 공통 클라이언트.
 * 각 팀원은 이 파일을 확장하지 말고, api/ 폴더에 도메인별 함수(예: getPackages, confirmPackage)를
 * 만들어서 이 apiFetch를 호출하는 방식으로 써주세요. (중복 baseURL/에러처리 방지)
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `API Error ${status}`);
    this.status = status;
    this.body = body;
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    throw new ApiError(res.status, data);
  }

  return data as T;
}

// 사용 예시:
// const packages = await apiFetch<PackageDto[]>("/api/packages/today");
// await apiFetch("/api/packages/confirm", { method: "POST", body: { packageId } });

/**
 * WebSocket 연결 헬퍼. 실시간 재조립 이벤트 구독에 사용.
 * 사용 예시:
 *   const ws = connectSocket("/ws/driver/123");
 *   ws.onmessage = (e) => console.log(JSON.parse(e.data));
 */
export function connectSocket(path: string): WebSocket {
  const wsBase = import.meta.env.VITE_WS_BASE_URL ?? "ws://localhost:8000";
  return new WebSocket(`${wsBase}${path}`);
}
