import { formJSVersions } from '../../util/formVersion';

export const updateFormData = function(form, property, value) {
  const formObj = JSON.parse(form);
  formObj[property] = value;
  return JSON.stringify(formObj);
};

export const updateFormComponent = function(form, componentKey, property, value) {
  const formObj = JSON.parse(form);
  const component = formObj.components.find(c => c.key === componentKey);
  if (component) {
    component[property] = value;
  }
  return JSON.stringify(formObj);
};

export const addFormComponent = function(form, component, position) {
  const formObj = JSON.parse(form);
  formObj.components.splice(position, 0, component);
  return JSON.stringify(formObj);
};

export const removeFormComponent = function(form, key) {
  const formObj = JSON.parse(form);
  const idx = formObj.components.indexOf(c => c.key === key);
  if (idx > -1) formObj.components.splice(idx, 1);
  return JSON.stringify(formObj);
};

export const updateTestFormVersion = function(form, version) {
  formJSVersions['Operaton']['test_ver'] = version;
  return updateFormData(form, 'executionPlatformVersion', 'test_ver');
};
