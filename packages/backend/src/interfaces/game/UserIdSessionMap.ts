interface UserIdSessionMapData {
  session: string;
  username: string;
}

export default interface UserIdSessionMap {
  [key: string]: UserIdSessionMapData;
}
