/**
 * Copyright 2026 the Operaton contributors.
 *
 * Licensed under the MIT license. See the LICENSE file in the project root.
 */

const NAMESPACES = {
  bpmn: {
    camunda: 'http://camunda.org/schema/1.0/bpmn',
    operaton: 'http://operaton.org/schema/1.0/bpmn'
  },
  dmn: {
    camunda: 'http://camunda.org/schema/1.0/dmn',
    operaton: 'http://operaton.org/schema/1.0/dmn'
  }
};

export function normalizeOperatonXml(xml, type, options = {}) {
  if (typeof xml !== 'string') {
    return xml;
  }

  const {
    ensureNamespace = false
  } = options;

  const namespaces = NAMESPACES[ type ];

  if (!namespaces) {
    return xml;
  }

  let normalized = xml
    .replace(new RegExp(`\\sxmlns:camunda="(${ escapeRegExp(namespaces.camunda) }|${ escapeRegExp(namespaces.operaton) })"`, 'g'), '')
    .replace(/(<\/?)camunda(:[A-Za-z0-9-.]+(?=>|\s))/g, '$1operaton$2')
    .replace(/(\s)camunda(:[A-Za-z0-9-.]+)/g, '$1operaton$2');

  if (
    (ensureNamespace || normalized.includes('operaton:')) &&
    !normalized.includes(`xmlns:operaton="${ namespaces.operaton }"`)
  ) {
    normalized = normalized.replace(
      /<([A-Za-z0-9_.-]+:)?definitions\b/,
      `$& xmlns:operaton="${ namespaces.operaton }"`
    );
  }

  return normalized;
}

export function usesOperatonExtensionNamespace(xml, type) {
  return typeof xml === 'string' && xml.includes(NAMESPACES[ type ]?.operaton);
}

function escapeRegExp(pattern) {
  return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
