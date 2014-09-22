// QUnit has problems with counting the total number of tests, issue is explained
// here including a fix: https://github.com/karma-runner/karma/issues/966

var testCount = 0;
var qunitTest = QUnit.test;

QUnit.test = window.test = function () {
  testCount += 1;
  qunitTest.apply(this, arguments);
};

QUnit.begin(function (args) {
  args.totalTests = testCount;
});



