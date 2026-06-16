import { capitalize, getExecutionPlatformLabel, toSemverMinor, textToLabel, getIndefiniteArticle } from '../helpers';


describe('tabs/form/linting/util - helpers', function() {

  describe('capitalize', function() {

    it('should capitalize string', function() {

      // given
      const string = 'hello world';

      // when
      const cap = capitalize(string);

      // then
      expect(cap).to.eql('Hello world');

    });

  });

  describe('getExecutionPlatformLabel', function() {

    it('should return execution platform label', function() {

      // given
      const schema = {
        executionPlatform: 'Operaton',
        executionPlatformVersion: '1.0',
      };

      // when
      const label = getExecutionPlatformLabel(schema);

      // then
      expect(label).to.eql('Operaton 1.0');

    });

  });

  describe('toSemverMinor', function() {

    it('should extract a minor semantic version from full version', function() {

      // given
      const version = '1.0.dev-1.test';

      // when
      const minor = toSemverMinor(version);

      // then
      expect(minor).to.eql('1.0');

    });

  });

  describe('textToLabel', function() {

    it('should shorten text if exceeding 30 characters', function() {

      // given
      const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';

      // when
      const label = textToLabel(text);

      // then
      expect(label).to.eql('Lorem ipsum dolor sit amet ...');

    });

  });

  describe('getIndefiniteArticle', function() {

    it('should return indefinite article "a" based on type', function() {

      // given
      const type = 'dynamiclist';

      // when
      const article = getIndefiniteArticle(type, false);

      // then
      expect(article).to.eql('a');

    });

    it('should return indefinite article "An" based on Image type', function() {

      // given
      const type = 'Image';

      // when
      const article = getIndefiniteArticle(type, true);

      // then
      expect(article).to.eql('An');

    });

  });

});

