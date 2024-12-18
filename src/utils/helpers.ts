import { OMDBResponse } from "../types";

type SortableData = Record<string, any>;
type RatingsData=Record<string,OMDBResponse>

/**To sort the passed data based on the passed key */
export const sortData = (key: string, data: SortableData[], order: "asc" | "desc" = "asc") => {
  return data.sort((a, b) => {
    const comparison = typeof a[key] === "number" && typeof b[key] === "number"
      ? a[key] - b[key] // Numeric comparison
      : String(a[key]).localeCompare(String(b[key])); // String comparison
    return order === "asc" ? comparison : -comparison;
  });
};


/**To generate an Array from an passed object */
export const generateArray = (data: RatingsData): { episodeId: number; imdbRating: string }[] => {
  return Object.values(data).map(rating => ({
    episodeId: rating.episodeId,
    imdbRating: rating.imdbRating,
  }));
};


/**Returns the fullyear from the passed date in string format */
export const getYearFromDate = (date:string)=>{
  return new Date(date).getFullYear();
}

/**Returns the filtered data based on the passed term */
export const getFilteredList = (data: SortableData[], term:string)=>{
  const lowercaseTerm = term.toLowerCase()
  return data.filter(d=>d.title.toLowerCase().includes(lowercaseTerm));
}

/**Returns the Rating object based on the episode id and the episode key in the Rating obj */
export const getRatingObj = <T extends Record<string,OMDBResponse>>(data:T, key:keyof OMDBResponse, id:number)=>{
  return Object.values(data).find((item)=>item[key] === id) || null;
}
