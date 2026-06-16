import camundaDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import createOperatonModdleDescriptor from './createOperatonModdleDescriptor';

export default createOperatonModdleDescriptor(
  camundaDescriptor,
  'http://operaton.org/schema/1.0/bpmn'
);
