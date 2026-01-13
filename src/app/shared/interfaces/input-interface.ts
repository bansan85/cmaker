import { CMakeComponentInterface } from '../../features/cmake-project/models/cmake-component-interface';
import { CheckboxesItemInterface } from './checkboxes-item-interface';
import { ValidatorInterface } from './validator-interface';

export type InputInterface<Model> = CheckboxesItemInterface &
  Model &
  ValidatorInterface &
  CMakeComponentInterface<Model>;
