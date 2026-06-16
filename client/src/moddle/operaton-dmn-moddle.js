import camundaDescriptor from 'camunda-dmn-moddle/resources/camunda';

import createOperatonModdleDescriptor from './createOperatonModdleDescriptor';

export default createOperatonModdleDescriptor(
  camundaDescriptor,
  'http://operaton.org/schema/1.0/dmn'
);
