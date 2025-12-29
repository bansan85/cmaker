import { computed, Injectable, resource, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  createValidationResource<TParams>(
    params: () => TParams,
    loader: (params: TParams) => Promise<boolean>,
    defaultValue: boolean
  ): Signal<boolean> {
    let lastValidValue = defaultValue;

    const validationResource = resource<boolean, TParams>({
      params,
      loader: (args) => loader(args.params),
      defaultValue,
    });

    const isValid = computed(() => {
      const status = validationResource.status();
      const value = validationResource.value();

      if (status === 'resolved') {
        lastValidValue = value;
        return value;
      }

      return lastValidValue;
    });

    return isValid;
  }
}
