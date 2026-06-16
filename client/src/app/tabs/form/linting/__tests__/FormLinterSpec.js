import {
  FormLinter
} from '../FormLinter';

import form from './fixtures/basicForm.form';
import { addFormComponent, updateFormComponent, updateTestFormVersion } from './helpers/formUtils';

describe('tabs/form/linting - FormLinter', function() {

  describe('loadPluginRegistry', function() {

    it('should create plugin rules registry if plugin provided', function() {

      // given
      const plugins = [
        {
          rules: {
            'no-number-in-dynamic-list': {
              'execute': (node, context) => true,
              'config': {
                'severity': 'error',
                'before': '1.20.0'
              },
            }
          }
        },
        {
          rules: {
            'no-pizza-in-text-field': {
              'execute': (node, context) => true,
              'config': {
                'severity': 'warn',
                'before': '1.20.0'
              }
            },
          }
        }
      ];

      // when
      const fl = new FormLinter(plugins);

      // then
      expect(fl.pluginRegistry).to.eql({
        rules: {
          'no-number-in-dynamic-list': plugins[0].rules['no-number-in-dynamic-list'].execute,
          'no-pizza-in-text-field': plugins[1].rules['no-pizza-in-text-field'].execute
        },
        config: {
          'no-number-in-dynamic-list': plugins[0].rules['no-number-in-dynamic-list'].config,
          'no-pizza-in-text-field': plugins[1].rules['no-pizza-in-text-field'].config
        }
      });

    });


    it('should not create plugin rules registry if no plugin provided', function() {

      // given
      const fl = new FormLinter();

      // then
      expect(fl.pluginRegistry).to.eql({ rules: {}, config: {} });

    });

  });


  describe('lint', function() {

    let testForm;

    beforeEach(function() {
      testForm = form;
    });

    it('should not show lint errors in valid form', function() {

      // given
      const fl = new FormLinter();
      testForm = updateTestFormVersion(testForm, '1.14.0');

      // when
      const reports = fl.lint(testForm);

      // then
      expect(reports).to.eql([]);

    });

    it('should show lint errors for "discourage-disabled-fields" rule', function() {

      // given
      const fl = new FormLinter();
      testForm = updateTestFormVersion(testForm, '1.14.0');
      testForm = updateFormComponent(testForm, 'creditor', 'disabled', true);

      // when
      const reports = fl.lint(testForm);

      // then
      expect(reports).to.eql([
        { id: 'Field_0882m7g', label: 'Creditor', 'message': 'The use of disabled fields is not recommended due to accessibility concerns. We advise using read-only instead.', category: 'warn' }
      ]);

    });

    it('should show lint errors for "form-element-type" rule', function() {

      // given
      const fl = new FormLinter();
      testForm = updateTestFormVersion(testForm, '0.0.1');
      testForm = addFormComponent(testForm, { label: 'Checkbox', type: 'checkbox', id: 'test_checkbox', key:'checkbox_0123' });

      // when
      const reports = fl.lint(testForm);

      // then
      expect(reports).to.eql([
        { id: 'test_checkbox', label: 'Checkbox', message: 'A <Checkbox> is not supported by Operaton test_ver', category: 'error' }
      ]);

    });

    it('should show lint errors for "no-empty-lists" rule', function() {

      // given
      const fl = new FormLinter();
      testForm = updateTestFormVersion(testForm, '1.14.0');
      testForm = addFormComponent(testForm, { label: 'Dynamic List', type: 'dynamiclist', id: 'test_dynamiclist', key:'dynamiclist_0123', components: [] });

      // when
      const reports = fl.lint(testForm);

      // then
      expect(reports).to.eql([
        { id: 'test_dynamiclist', label: 'Dynamic List', message: 'Dynamic lists require child components to render', category: 'warn' }
      ]);

    });

    it('should show lint errors for "no-submit-button" rule', function() {

      // given
      const fl = new FormLinter();
      testForm = updateTestFormVersion(testForm, '1.14.0');
      testForm = addFormComponent(testForm, { label: 'Submit', type: 'button', id: 'test_submit', action: 'submit', key:'submit_0123' });

      // when
      const reports = fl.lint(testForm);

      // then
      expect(reports).to.eql([
        { id: 'test_submit', label: 'Submit', message: 'Submit buttons will be hidden in favor of built-in ones in the Operaton Tasklist.', category: 'info' }
      ]);

    });

    it('should show lint errors for "validate-feel" rule', function() {

      // given
      const fl = new FormLinter();
      testForm = updateTestFormVersion(testForm, '1.14.0');
      testForm = updateFormComponent(testForm, 'creditor', 'id', '=^15');

      // when
      const reports = fl.lint(testForm);

      // then
      expect(reports).to.eql([
        { id: '=^15', label: 'Creditor', message: 'Invalid FEEL expression in <id>', category: 'error' }
      ]);

    });

    it('should show lint errors for a plugin "no-number-in-dynamic-list" rule', function() {

      // given
      const plugins = [
        {
          'rules': {
            'no-number-in-dynamic-list': {
              'execute': (node, context) => {

                const { reporter, category, formatReport } = context;
                if (node.type === 'dynamiclist' && node.components && node.components.length > 0) {
                  const numberComponent = node.components.find(c => c.type === 'number');
                  if (numberComponent) {
                    reporter.report(formatReport(node, 'Number components are not allowed in dynamic lists', category));
                  }
                }
                return true;
              },
              'config': {
                'severity': 'error',
                'before': '1.20.0'
              },
            }
          }
        }
      ];

      const fl = new FormLinter(plugins);
      testForm = updateTestFormVersion(testForm, '1.14.0');
      testForm = addFormComponent(testForm, {
        label: 'Dynamic List',
        type: 'dynamiclist',
        id: 'test_dynamiclist',
        key:'dynamiclist_0123',
        components: [
          {
            label: 'Number',
            type: 'number',
            id: 'test_number',
            key: 'number_1'
          }
        ] });

      // when
      const reports = fl.lint(testForm);

      // then
      expect(reports).to.eql([
        { id: 'test_dynamiclist', label: 'Dynamic List', message: 'Number components are not allowed in dynamic lists', category: 'error' }
      ]);

    });

  });

});

