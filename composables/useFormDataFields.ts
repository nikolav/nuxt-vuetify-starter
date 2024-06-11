type TFormFieldsOnSubmit = (...args: any[]) => void;
type TFormFieldsValidator = (value: any) => boolean;
export const useFormDataFields = (
  KEY: string,
  FIELDS: Record<string, TFormFieldsValidator>,
  config?: {
    onSubmit?: TFormFieldsOnSubmit;
  }
) => {
  const main$$ = useStoreMain();
  const form = reduce(
    FIELDS,
    (formdata, _v, field) => {
      formdata[field] = computed({
        get: () => main$$.get(`${KEY} --${field}`),
        set: (val) => main$$.put({ [`${KEY} --${field}`]: val }),
      });
      return formdata;
    },
    <Record<string, Ref>>{}
  );
  const valid = computed(() =>
    every(FIELDS, (validator, field) => validator(form[field].value))
  );
  const dump = () =>
    reduce(
      FIELDS,
      (node, _v, field) => {
        node[field] = form[field].value;
        return node;
      },
      <Record<string, any>>{}
    );
  const submit = async () => {
    if (!valid.value) return;
    (config?.onSubmit || noop)(dump());
  };
  const clear = () => {
    each(FIELDS, (_v, field) => {
      form[field].value = undefined;
    });
  };

  return {
    KEY,
    form,
    valid,
    submit,
    clear,
    dump,
  };
};
