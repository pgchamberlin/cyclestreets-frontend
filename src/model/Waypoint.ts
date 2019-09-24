import { Option } from './Option';

export interface Waypoint {
  id: string;
  inputValue: string;
  selection: Option | null;
  optionsQuery: string | null;
  options: Option[];
}
