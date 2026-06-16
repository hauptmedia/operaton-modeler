export default function createOperatonModdleDescriptor(camundaDescriptor, uri) {

  // Keep the Camunda package name/prefix because upstream platform modules
  // address these moddle types internally as camunda:*.
  return {
    ...clone(camundaDescriptor),
    uri
  };
}

function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  }

  if (value && typeof value === 'object') {
    return Object.keys(value).reduce((result, key) => {
      result[key] = clone(value[key]);
      return result;
    }, {});
  }

  return value;
}
