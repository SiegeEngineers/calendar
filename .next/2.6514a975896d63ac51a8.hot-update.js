webpackHotUpdate(2,{

/***/ 94:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(44);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _inherits2 = __webpack_require__(1);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _promise = __webpack_require__(95);

	var _promise2 = _interopRequireDefault(_promise);

	var _regenerator = __webpack_require__(111);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(115);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(77);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(81);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(82);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(86);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	var _immutable = __webpack_require__(116);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _css = __webpack_require__(90);

	var _css2 = _interopRequireDefault(_css);

	var _googleSpreadsheets = __webpack_require__(117);

	var _googleSpreadsheets2 = _interopRequireDefault(_googleSpreadsheets);

	var _momentTimezone = __webpack_require__(124);

	var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

	var _jstz = __webpack_require__(238);

	var _jstz2 = _interopRequireDefault(_jstz);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var gKey = '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg';

	var _class = function (_React$Component) {
	  (0, _inherits3.default)(_class, _React$Component);

	  function _class(props) {
	    (0, _classCallCheck3.default)(this, _class);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

	    _this.state = { timezone: false };
	    return _this;
	  }

	  (0, _createClass3.default)(_class, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _momentTimezone2.default.locale(window.navigator.language);
	      this.setState({ timezone: _jstz2.default.determine() });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var d = fromJSOrdered(this.props);
	      // if (this.state.timezone) moment.locale(this.state.timezone)
	      return _react2.default.createElement(
	        'div',
	        { className: general },
	        _react2.default.createElement(
	          'div',
	          { className: topNoteStyle },
	          _react2.default.createElement(
	            'b',
	            null,
	            'Professional Age of Empires 2 Calendar'
	          ),
	          _react2.default.createElement('br', null),
	          'new to pro AoE2? ',
	          _react2.default.createElement(
	            'a',
	            { href: 'test' },
	            'learn more'
	          ),
	          _react2.default.createElement('br', null),
	          this.state.timezone ? 'all times in ' + this.state.timezone.name() : ''
	        ),
	        d.get('matches').map(function (match) {
	          return _react2.default.createElement(
	            'div',
	            { className: matchStyle, onClick: function onClick() {
	                return test(d);
	              } },
	            _react2.default.createElement('hr', { className: matchDividerStyle }),
	            _react2.default.createElement(
	              'div',
	              { className: (0, _css.merge)(player, left) },
	              match.get('team'),
	              _react2.default.createElement('img', { className: (0, _css.merge)(flag, { float: 'right' }),
	                src: d.getIn(['flags', d.getIn(['players', match.get('team'), 'country']), 'url']) })
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: divider },
	              ' ',
	              _this2.state.timezone ? _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                  'div',
	                  { className: dateStyle },
	                  (0, _momentTimezone2.default)(new Date(match.get('time') + ' UTC')).format('ll')
	                ),
	                _react2.default.createElement(
	                  'div',
	                  null,
	                  (0, _momentTimezone2.default)(new Date(match.get('time') + ' UTC')).format('LT')
	                )
	              ) : '...'
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: (0, _css.merge)(player, right) },
	              _react2.default.createElement('img', { className: (0, _css.merge)(flag, { float: 'left' }),
	                src: d.getIn(['flags', d.getIn(['players', match.get('team_2'), 'country']), 'url']) }),
	              match.get('team_2')
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: eventStyle },
	              match.get('event'),
	              ' - ',
	              match.get('round'),
	              ' - ',
	              match.get('format')
	            )
	          );
	        }),
	        _react2.default.createElement(
	          'div',
	          { className: footerStyle },
	          _react2.default.createElement('hr', null),
	          _react2.default.createElement(
	            'span',
	            null,
	            'made by patao with love'
	          )
	        )
	      );
	    }
	  }], [{
	    key: 'getInitialProps',
	    value: function () {
	      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
	        var req = _ref2.req;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.t0 = req ? true : false;
	                _context.next = 3;
	                return getRows('oe5g22b', 'name');

	              case 3:
	                _context.t1 = _context.sent;
	                _context.next = 6;
	                return getRows('od6');

	              case 6:
	                _context.t2 = _context.sent;
	                _context.next = 9;
	                return getRows('ojz6xko', 'name');

	              case 9:
	                _context.t3 = _context.sent;
	                return _context.abrupt('return', {
	                  server: _context.t0,
	                  players: _context.t1,
	                  matches: _context.t2,
	                  flags: _context.t3
	                });

	              case 11:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function getInitialProps(_x) {
	        return _ref.apply(this, arguments);
	      }

	      return getInitialProps;
	    }()
	  }]);
	  return _class;
	}(_react2.default.Component);

	// testing


	exports.default = _class;
	var fromJSOrdered = function fromJSOrdered(js) {
	  return (typeof js === 'undefined' ? 'undefined' : (0, _typeof3.default)(js)) !== 'object' || js === null ? js : Array.isArray(js) ? _immutable2.default.Seq(js).map(fromJSOrdered).toList() : _immutable2.default.Seq(js).map(fromJSOrdered).toOrderedMap();
	};

	// Experiment
	var test = function test(d) {
	  window.d = d;
	  window.g = _googleSpreadsheets2.default;
	  (0, _googleSpreadsheets2.default)({ key: '19FQEKyzV7hHqDxJ3BSdNDNmxAa-otUXhmhHoJhv31wg' }, function (err, sheet) {
	    window.sheet = sheet;
	  });
	};

	// Data fetchers
	var getRows = function getRows(worksheetId, keyName) {
	  return new _promise2.default(function (resolve, reject) {
	    _googleSpreadsheets2.default.rows({ key: gKey, worksheet: worksheetId }, function (err, rows) {
	      if (err !== null) return reject(err);
	      var results = keyName ? rows.reduce(function (prev, cur) {
	        return prev.set(cur[keyName], cur);
	      }, _immutable2.default.OrderedMap()) : _immutable2.default.fromJS(rows);
	      resolve(results);
	    });
	  });
	};

	// Styling
	var general = (0, _css2.default)({ fontFamily: 'Century Gothic, sans-serif',
	  width: 80 * 12 + 'px',
	  paddingLeft: 10 + 'px',
	  paddingRight: 10 + 'px',
	  margin: 'auto',
	  color: '#333333'
	});

	var dateStyle = (0, _css2.default)({ fontSize: '12pt' });
	var player = (0, _css2.default)({ fontSize: '30pt', fontVariant: 'small-caps' });
	var divider = (0, _css2.default)({ fontSize: '16pt', paddingTop: '2px', textAlign: 'center', float: 'left', width: 80 * 2 + 'px' });
	var topNoteStyle = (0, _css2.default)({ textAlign: 'center', fontSize: '10pt', fontStyle: 'italic' });
	var matchStyle = (0, _css2.default)({ clear: 'both', paddingTop: '2em' });
	var matchDividerStyle = (0, _css2.default)({ width: '100px', marginBottom: '2em' });
	var eventStyle = (0, _css2.default)({ clear: 'both', textAlign: 'center', fontSize: '10pt', fontWeight: 'bold', paddingTop: '1em' });
	var footerStyle = (0, _css2.default)({ width: '100%', marginTop: '2em', textAlign: 'center' });
	var left = (0, _css2.default)({ float: 'left', textAlign: 'right', width: 80 * 5 + 'px' });
	var right = (0, _css2.default)({ float: 'right', textAlign: 'left', width: 80 * 5 + 'px' });
	var flag = (0, _css2.default)({ height: '1em', paddingTop: '5px', margin: '0px 0.5em 0px 0.5em', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))' });
	    if (true) {
	      module.hot.accept()

	      var Component = module.exports.default || module.exports
	      Component.__route = "/"

	      if (module.hot.status() !== 'idle') {
	        var components = next.router.components
	        for (var r in components) {
	          if (!components.hasOwnProperty(r)) continue

	          if (components[r].Component.__route === "/") {
	            next.router.update(r, Component)
	          }
	        }
	      }
	    }
	  

/***/ }

})