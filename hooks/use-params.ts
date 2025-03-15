import { useParams as useNextParams } from "next/navigation"

export function useParams<T>() {
  const params = useNextParams() as T
  return Promise.resolve(params)
}

export default useParams
