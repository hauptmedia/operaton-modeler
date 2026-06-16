import { formatFormFieldReport } from '../ProblemsReporter.js';

export const execute = (node, context) => {

  const {
    reporter,
    category
  } = context;

  if (node.type === 'button' && node?.action !== 'reset') {
    const errorMessage = 'Submit buttons will be hidden in favor of built-in ones in the Operaton Tasklist.';
    reporter.report(formatFormFieldReport(node, errorMessage, category));
  }

  return true;
};
