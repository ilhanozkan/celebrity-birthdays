export interface ICelebrity {
  name: string;
  birthday: string;
  age: number;
  is_alive: boolean;
  gender: string;
}

export interface ICelebrityState {
  value: ICelebrity[];
}

export interface Props {
  info: ICelebrity;
}
