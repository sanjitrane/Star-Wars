import { OMDBResponse } from "../types";
type SortableData = Record<string, any>;

export const sortData = (key: string, data: SortableData[], order: "asc" | "desc" = "asc") => {
  return data.sort((a, b) => {
    const comparison = typeof a[key] === "number" && typeof b[key] === "number"
      ? a[key] - b[key] // Numeric comparison
      : String(a[key]).localeCompare(String(b[key])); // String comparison
    return order === "asc" ? comparison : -comparison;
  });
};

type RatingsData=Record<string,OMDBResponse>

export const generateArray = (data: RatingsData): { episodeId: number; imdbRating: string }[] => {
  return Object.values(data).map(rating => ({
    episodeId: rating.episodeId,
    imdbRating: rating.imdbRating,
  }));
};

export const getYearFromDate = (date:string)=>{
  return new Date(date).getFullYear();
}

export const getFilteredList = (data: SortableData[], term:string)=>{
  const lowercaseTerm = term.toLowerCase()
  return data.filter(d=>d.title.toLowerCase().includes(lowercaseTerm));
}

export const getRatingObj = <T extends Record<string,OMDBResponse>>(data:T, key:keyof OMDBResponse, id:number)=>{
  return Object.values(data).find((item)=>item[key] === id) || null;
}
