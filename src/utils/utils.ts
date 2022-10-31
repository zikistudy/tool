export const scale = (value:any, inMin:any, inMax:any, outMin:any, outMax:any) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };
  
  export const random = (min: number, max: number) => {
    return scale(Math.random(), 0, 1, min, max);
  };
  
  export const randomOne = <T>(arr: T[]): T => {
    return arr[Math.floor(random(0, arr.length))];
  };
  
  export const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(value, max));
  };
  
  export const lerp = (from: number, to: number, amount:any) => {
    return from + (to - from) * amount;
  };
  