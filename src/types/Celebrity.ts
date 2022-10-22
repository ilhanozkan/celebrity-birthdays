export interface ICelebrity {
  name: string;
  birthday: string;
  age: number;
  is_alive: boolean;
  gender: string;
}

export interface Props {
  info: ICelebrity;
  setData: any;
}
