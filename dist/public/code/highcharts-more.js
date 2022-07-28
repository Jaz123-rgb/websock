"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*
 Highcharts JS v10.2.0 (2022-07-05)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (f) {
  "object" === (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? (f["default"] = f, module.exports = f) : "function" === typeof define && define.amd ? define("highcharts/highcharts-more", ["highcharts"], function (A) {
    f(A);
    f.Highcharts = A;
    return f;
  }) : f("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (f) {
  function A(f, b, e, a) {
    f.hasOwnProperty(b) || (f[b] = a.apply(null, e), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
      detail: {
        path: b,
        module: f[b]
      }
    })));
  }

  f = f ? f._modules : {};
  A(f, "Extensions/Pane.js", [f["Core/Chart/Chart.js"], f["Series/CenteredUtilities.js"], f["Core/Globals.js"], f["Core/Pointer.js"], f["Core/Utilities.js"]], function (f, b, e, a, d) {
    function p(c, t, h) {
      return Math.sqrt(Math.pow(c - h[0], 2) + Math.pow(t - h[1], 2)) <= h[2] / 2;
    }

    var l = d.addEvent,
        k = d.extend,
        y = d.merge,
        B = d.pick,
        c = d.splat;
    f.prototype.collectionsWithUpdate.push("pane");

    d = function () {
      function g(c, h) {
        this.options = this.chart = this.center = this.background = void 0;
        this.coll = "pane";
        this.defaultOptions = {
          center: ["50%", "50%"],
          size: "85%",
          innerSize: "0%",
          startAngle: 0
        };
        this.defaultBackgroundOptions = {
          shape: "circle",
          borderWidth: 1,
          borderColor: "#cccccc",
          backgroundColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [[0, "#ffffff"], [1, "#e6e6e6"]]
          },
          from: -Number.MAX_VALUE,
          innerRadius: 0,
          to: Number.MAX_VALUE,
          outerRadius: "105%"
        };
        this.init(c, h);
      }

      g.prototype.init = function (c, h) {
        this.chart = h;
        this.background = [];
        h.pane.push(this);
        this.setOptions(c);
      };

      g.prototype.setOptions = function (c) {
        this.options = y(this.defaultOptions, this.chart.angular ? {
          background: {}
        } : void 0, c);
      };

      g.prototype.render = function () {
        var g = this.options,
            h = this.options.background,
            z = this.chart.renderer;
        this.group || (this.group = z.g("pane-group").attr({
          zIndex: g.zIndex || 0
        }).add());
        this.updateCenter();
        if (h) for (h = c(h), g = Math.max(h.length, this.background.length || 0), z = 0; z < g; z++) {
          h[z] && this.axis ? this.renderBackground(y(this.defaultBackgroundOptions, h[z]), z) : this.background[z] && (this.background[z] = this.background[z].destroy(), this.background.splice(z, 1));
        }
      };

      g.prototype.renderBackground = function (c, h) {
        var g = "animate",
            a = {
          "class": "highcharts-pane " + (c.className || "")
        };
        this.chart.styledMode || k(a, {
          fill: c.backgroundColor,
          stroke: c.borderColor,
          "stroke-width": c.borderWidth
        });
        this.background[h] || (this.background[h] = this.chart.renderer.path().add(this.group), g = "attr");
        this.background[h][g]({
          d: this.axis.getPlotBandPath(c.from, c.to, c)
        }).attr(a);
      };

      g.prototype.updateCenter = function (c) {
        this.center = (c || this.axis || {}).center = b.getCenter.call(this);
      };

      g.prototype.update = function (c, g) {
        y(!0, this.options, c);
        this.setOptions(this.options);
        this.render();
        this.chart.axes.forEach(function (c) {
          c.pane === this && (c.pane = null, c.update({}, g));
        }, this);
      };

      return g;
    }();

    f.prototype.getHoverPane = function (c) {
      var g = this,
          h;
      c && g.pane.forEach(function (a) {
        var z = c.chartX - g.plotLeft,
            d = c.chartY - g.plotTop;
        p(g.inverted ? d : z, g.inverted ? z : d, a.center) && (h = a);
      });
      return h;
    };

    l(f, "afterIsInsidePlot", function (c) {
      this.polar && (c.isInsidePlot = this.pane.some(function (g) {
        return p(c.x, c.y, g.center);
      }));
    });
    l(a, "beforeGetHoverData", function (c) {
      var g = this.chart;
      g.polar ? (g.hoverPane = g.getHoverPane(c), c.filter = function (h) {
        return h.visible && !(!c.shared && h.directTouch) && B(h.options.enableMouseTracking, !0) && (!g.hoverPane || h.xAxis.pane === g.hoverPane);
      }) : g.hoverPane = void 0;
    });
    l(a, "afterGetHoverData", function (c) {
      var g = this.chart;
      c.hoverPoint && c.hoverPoint.plotX && c.hoverPoint.plotY && g.hoverPane && !p(c.hoverPoint.plotX, c.hoverPoint.plotY, g.hoverPane.center) && (c.hoverPoint = void 0);
    });
    e.Pane = d;
    return e.Pane;
  });
  A(f, "Series/AreaRange/AreaRangePoint.js", [f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b) {
    var e = this && this.__extends || function () {
      var _a = function a(d, b) {
        _a = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, c) {
          a.__proto__ = c;
        } || function (a, c) {
          for (var g in c) {
            c.hasOwnProperty(g) && (a[g] = c[g]);
          }
        };

        return _a(d, b);
      };

      return function (d, b) {
        function k() {
          this.constructor = d;
        }

        _a(d, b);

        d.prototype = null === b ? Object.create(b) : (k.prototype = b.prototype, new k());
      };
    }();

    f = f.seriesTypes.area.prototype;
    var a = f.pointClass.prototype,
        d = b.defined,
        p = b.isNumber;
    return function (b) {
      function k() {
        var a = null !== b && b.apply(this, arguments) || this;
        a.high = void 0;
        a.low = void 0;
        a.options = void 0;
        a.plotHigh = void 0;
        a.plotLow = void 0;
        a.plotHighX = void 0;
        a.plotLowX = void 0;
        a.plotX = void 0;
        a.series = void 0;
        return a;
      }

      e(k, b);

      k.prototype.setState = function () {
        var k = this.state,
            b = this.series,
            c = b.chart.polar;
        d(this.plotHigh) || (this.plotHigh = b.yAxis.toPixels(this.high, !0));
        d(this.plotLow) || (this.plotLow = this.plotY = b.yAxis.toPixels(this.low, !0));
        b.stateMarkerGraphic && (b.lowerStateMarkerGraphic = b.stateMarkerGraphic, b.stateMarkerGraphic = b.upperStateMarkerGraphic);
        this.graphic = this.upperGraphic;
        this.plotY = this.plotHigh;
        c && (this.plotX = this.plotHighX);
        a.setState.apply(this, arguments);
        this.state = k;
        this.plotY = this.plotLow;
        this.graphic = this.lowerGraphic;
        c && (this.plotX = this.plotLowX);
        b.stateMarkerGraphic && (b.upperStateMarkerGraphic = b.stateMarkerGraphic, b.stateMarkerGraphic = b.lowerStateMarkerGraphic, b.lowerStateMarkerGraphic = void 0);
        a.setState.apply(this, arguments);
      };

      k.prototype.haloPath = function () {
        var b = this.series.chart.polar,
            d = [];
        this.plotY = this.plotLow;
        b && (this.plotX = this.plotLowX);
        this.isInside && (d = a.haloPath.apply(this, arguments));
        this.plotY = this.plotHigh;
        b && (this.plotX = this.plotHighX);
        this.isTopInside && (d = d.concat(a.haloPath.apply(this, arguments)));
        return d;
      };

      k.prototype.isValid = function () {
        return p(this.low) && p(this.high);
      };

      return k;
    }(f.pointClass);
  });
  A(f, "Series/AreaRange/AreaRangeSeries.js", [f["Series/AreaRange/AreaRangePoint.js"], f["Core/Globals.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = this && this.__extends || function () {
      var _c = function c(a, g) {
        _c = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (c, C) {
          c.__proto__ = C;
        } || function (c, C) {
          for (var a in C) {
            C.hasOwnProperty(a) && (c[a] = C[a]);
          }
        };

        return _c(a, g);
      };

      return function (a, g) {
        function h() {
          this.constructor = a;
        }

        _c(a, g);

        a.prototype = null === g ? Object.create(g) : (h.prototype = g.prototype, new h());
      };
    }();

    b = b.noop;
    var p = e.seriesTypes,
        l = p.area,
        k = p.area.prototype,
        y = p.column.prototype,
        B = a.defined,
        c = a.extend,
        g = a.isArray,
        t = a.pick,
        h = a.merge,
        z = {
      lineWidth: 1,
      threshold: null,
      tooltip: {
        pointFormat: "<span style=\"color:{series.color}\">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>"
      },
      trackByArea: !0,
      dataLabels: {
        align: void 0,
        verticalAlign: void 0,
        xLow: 0,
        xHigh: 0,
        yLow: 0,
        yHigh: 0
      }
    };

    a = function (a) {
      function b() {
        var c = null !== a && a.apply(this, arguments) || this;
        c.data = void 0;
        c.options = void 0;
        c.points = void 0;
        c.lowerStateMarkerGraphic = void 0;
        c.xAxis = void 0;
        return c;
      }

      d(b, a);

      b.prototype.toYData = function (c) {
        return [c.low, c.high];
      };

      b.prototype.highToXY = function (c) {
        var a = this.chart,
            C = this.xAxis.postTranslate(c.rectPlotX || 0, this.yAxis.len - c.plotHigh);
        c.plotHighX = C.x - a.plotLeft;
        c.plotHigh = C.y - a.plotTop;
        c.plotLowX = c.plotX;
      };

      b.prototype.translate = function () {
        var c = this,
            a = c.yAxis;
        k.translate.apply(c);
        c.points.forEach(function (C) {
          var g = C.high,
              r = C.plotY;
          C.isNull ? C.plotY = null : (C.plotLow = r, C.plotHigh = a.translate(c.dataModify ? c.dataModify.modifyValue(g) : g, 0, 1, 0, 1), c.dataModify && (C.yBottom = C.plotHigh));
        });
        this.chart.polar && this.points.forEach(function (a) {
          c.highToXY(a);
          a.tooltipPos = [(a.plotHighX + a.plotLowX) / 2, (a.plotHigh + a.plotLow) / 2];
        });
      };

      b.prototype.getGraphPath = function (c) {
        var a = [],
            g = [],
            h = k.getGraphPath,
            r = this.options,
            q = this.chart.polar,
            v = q && !1 !== r.connectEnds,
            b = r.connectNulls,
            d,
            z = r.step;
        c = c || this.points;

        for (d = c.length; d--;) {
          var e = c[d];
          var n = q ? {
            plotX: e.rectPlotX,
            plotY: e.yBottom,
            doCurve: !1
          } : {
            plotX: e.plotX,
            plotY: e.plotY,
            doCurve: !1
          };
          e.isNull || v || b || c[d + 1] && !c[d + 1].isNull || g.push(n);
          var m = {
            polarPlotY: e.polarPlotY,
            rectPlotX: e.rectPlotX,
            yBottom: e.yBottom,
            plotX: t(e.plotHighX, e.plotX),
            plotY: e.plotHigh,
            isNull: e.isNull
          };
          g.push(m);
          a.push(m);
          e.isNull || v || b || c[d - 1] && !c[d - 1].isNull || g.push(n);
        }

        c = h.call(this, c);
        z && (!0 === z && (z = "left"), r.step = {
          left: "right",
          center: "center",
          right: "left"
        }[z]);
        a = h.call(this, a);
        g = h.call(this, g);
        r.step = z;
        r = [].concat(c, a);
        !this.chart.polar && g[0] && "M" === g[0][0] && (g[0] = ["L", g[0][1], g[0][2]]);
        this.graphPath = r;
        this.areaPath = c.concat(g);
        r.isArea = !0;
        r.xMap = c.xMap;
        this.areaPath.xMap = c.xMap;
        return r;
      };

      b.prototype.drawDataLabels = function () {
        var a = this.points,
            h = a.length,
            C = [],
            b = this.options.dataLabels,
            r = this.chart.inverted,
            q,
            v;

        if (b) {
          if (g(b)) {
            var d = b[0] || {
              enabled: !1
            };
            var z = b[1] || {
              enabled: !1
            };
          } else d = c({}, b), d.x = b.xHigh, d.y = b.yHigh, z = c({}, b), z.x = b.xLow, z.y = b.yLow;

          if (d.enabled || this._hasPointLabels) {
            for (q = h; q--;) {
              if (v = a[q]) {
                var t = d.inside ? v.plotHigh < v.plotLow : v.plotHigh > v.plotLow;
                v.y = v.high;
                v._plotY = v.plotY;
                v.plotY = v.plotHigh;
                C[q] = v.dataLabel;
                v.dataLabel = v.dataLabelUpper;
                v.below = t;
                r ? d.align || (d.align = t ? "right" : "left") : d.verticalAlign || (d.verticalAlign = t ? "top" : "bottom");
              }
            }

            this.options.dataLabels = d;
            k.drawDataLabels && k.drawDataLabels.apply(this, arguments);

            for (q = h; q--;) {
              if (v = a[q]) v.dataLabelUpper = v.dataLabel, v.dataLabel = C[q], delete v.dataLabels, v.y = v.low, v.plotY = v._plotY;
            }
          }

          if (z.enabled || this._hasPointLabels) {
            for (q = h; q--;) {
              if (v = a[q]) t = z.inside ? v.plotHigh < v.plotLow : v.plotHigh > v.plotLow, v.below = !t, r ? z.align || (z.align = t ? "left" : "right") : z.verticalAlign || (z.verticalAlign = t ? "bottom" : "top");
            }

            this.options.dataLabels = z;
            k.drawDataLabels && k.drawDataLabels.apply(this, arguments);
          }

          if (d.enabled) for (q = h; q--;) {
            if (v = a[q]) v.dataLabels = [v.dataLabelUpper, v.dataLabel].filter(function (c) {
              return !!c;
            });
          }
          this.options.dataLabels = b;
        }
      };

      b.prototype.alignDataLabel = function () {
        y.alignDataLabel.apply(this, arguments);
      };

      b.prototype.drawPoints = function () {
        var a = this.points.length,
            g;
        k.drawPoints.apply(this, arguments);

        for (g = 0; g < a;) {
          var h = this.points[g];
          h.origProps = {
            plotY: h.plotY,
            plotX: h.plotX,
            isInside: h.isInside,
            negative: h.negative,
            zone: h.zone,
            y: h.y
          };
          h.lowerGraphic = h.graphic;
          h.graphic = h.upperGraphic;
          h.plotY = h.plotHigh;
          B(h.plotHighX) && (h.plotX = h.plotHighX);
          h.y = t(h.high, h.origProps.y);
          h.negative = h.y < (this.options.threshold || 0);
          this.zones.length && (h.zone = h.getZone());
          this.chart.polar || (h.isInside = h.isTopInside = "undefined" !== typeof h.plotY && 0 <= h.plotY && h.plotY <= this.yAxis.len && 0 <= h.plotX && h.plotX <= this.xAxis.len);
          g++;
        }

        k.drawPoints.apply(this, arguments);

        for (g = 0; g < a;) {
          h = this.points[g], h.upperGraphic = h.graphic, h.graphic = h.lowerGraphic, h.origProps && (c(h, h.origProps), delete h.origProps), g++;
        }
      };

      b.defaultOptions = h(l.defaultOptions, z);
      return b;
    }(l);

    c(a.prototype, {
      deferTranslatePolar: !0,
      pointArrayMap: ["low", "high"],
      pointClass: f,
      pointValKey: "low",
      setStackedPoints: b
    });
    e.registerSeriesType("arearange", a);
    "";
    return a;
  });
  A(f, "Series/AreaSplineRange/AreaSplineRangeSeries.js", [f["Series/AreaRange/AreaRangeSeries.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e) {
    var a = this && this.__extends || function () {
      var _a2 = function a(b, d) {
        _a2 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (c, a) {
          c.__proto__ = a;
        } || function (c, a) {
          for (var g in a) {
            a.hasOwnProperty(g) && (c[g] = a[g]);
          }
        };

        return _a2(b, d);
      };

      return function (b, d) {
        function c() {
          this.constructor = b;
        }

        _a2(b, d);

        b.prototype = null === d ? Object.create(d) : (c.prototype = d.prototype, new c());
      };
    }(),
        d = b.seriesTypes.spline.prototype,
        p = e.merge;

    e = e.extend;

    var l = function (b) {
      function d() {
        var a = null !== b && b.apply(this, arguments) || this;
        a.options = void 0;
        a.data = void 0;
        a.points = void 0;
        return a;
      }

      a(d, b);
      d.defaultOptions = p(f.defaultOptions);
      return d;
    }(f);

    e(l.prototype, {
      getPointSpline: d.getPointSpline
    });
    b.registerSeriesType("areasplinerange", l);
    "";
    return l;
  });
  A(f, "Series/BoxPlot/BoxPlotSeries.js", [f["Series/Column/ColumnSeries.js"], f["Core/Globals.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = this && this.__extends || function () {
      var _a3 = function a(b, c) {
        _a3 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (c, a) {
          c.__proto__ = a;
        } || function (c, a) {
          for (var h in a) {
            a.hasOwnProperty(h) && (c[h] = a[h]);
          }
        };

        return _a3(b, c);
      };

      return function (b, c) {
        function g() {
          this.constructor = b;
        }

        _a3(b, c);

        b.prototype = null === c ? Object.create(c) : (g.prototype = c.prototype, new g());
      };
    }();

    b = b.noop;
    var p = a.extend,
        l = a.merge,
        k = a.pick;

    a = function (a) {
      function b() {
        var c = null !== a && a.apply(this, arguments) || this;
        c.data = void 0;
        c.options = void 0;
        c.points = void 0;
        return c;
      }

      d(b, a);

      b.prototype.pointAttribs = function () {
        return {};
      };

      b.prototype.translate = function () {
        var c = this.yAxis,
            g = this.pointArrayMap;
        a.prototype.translate.apply(this);
        this.points.forEach(function (a) {
          g.forEach(function (h) {
            null !== a[h] && (a[h + "Plot"] = c.translate(a[h], 0, 1, 0, 1));
          });
          a.plotHigh = a.highPlot;
        });
      };

      b.prototype.drawPoints = function () {
        var c = this,
            a = c.options,
            b = c.chart,
            h = b.renderer,
            d,
            e,
            f,
            l,
            E,
            C,
            D = 0,
            r,
            q,
            v,
            L,
            H = !1 !== c.doQuartiles,
            G,
            p = c.options.whiskerLength;
        c.points.forEach(function (g) {
          var m = g.graphic,
              z = m ? "animate" : "attr",
              n = g.shapeArgs,
              t = {},
              J = {},
              y = {},
              K = {},
              B = g.color || c.color;
          "undefined" !== typeof g.plotY && (r = Math.round(n.width), q = Math.floor(n.x), v = q + r, L = Math.round(r / 2), d = Math.floor(H ? g.q1Plot : g.lowPlot), e = Math.floor(H ? g.q3Plot : g.lowPlot), f = Math.floor(g.highPlot), l = Math.floor(g.lowPlot), m || (g.graphic = m = h.g("point").add(c.group), g.stem = h.path().addClass("highcharts-boxplot-stem").add(m), p && (g.whiskers = h.path().addClass("highcharts-boxplot-whisker").add(m)), H && (g.box = h.path(void 0).addClass("highcharts-boxplot-box").add(m)), g.medianShape = h.path(void 0).addClass("highcharts-boxplot-median").add(m)), b.styledMode || (J.stroke = g.stemColor || a.stemColor || B, J["stroke-width"] = k(g.stemWidth, a.stemWidth, a.lineWidth), J.dashstyle = g.stemDashStyle || a.stemDashStyle || a.dashStyle, g.stem.attr(J), p && (y.stroke = g.whiskerColor || a.whiskerColor || B, y["stroke-width"] = k(g.whiskerWidth, a.whiskerWidth, a.lineWidth), y.dashstyle = g.whiskerDashStyle || a.whiskerDashStyle || a.dashStyle, g.whiskers.attr(y)), H && (t.fill = g.fillColor || a.fillColor || B, t.stroke = a.lineColor || B, t["stroke-width"] = a.lineWidth || 0, t.dashstyle = g.boxDashStyle || a.boxDashStyle || a.dashStyle, g.box.attr(t)), K.stroke = g.medianColor || a.medianColor || B, K["stroke-width"] = k(g.medianWidth, a.medianWidth, a.lineWidth), K.dashstyle = g.medianDashStyle || a.medianDashStyle || a.dashStyle, g.medianShape.attr(K)), C = g.stem.strokeWidth() % 2 / 2, D = q + L + C, m = [["M", D, e], ["L", D, f], ["M", D, d], ["L", D, l]], g.stem[z]({
            d: m
          }), H && (C = g.box.strokeWidth() % 2 / 2, d = Math.floor(d) + C, e = Math.floor(e) + C, q += C, v += C, m = [["M", q, e], ["L", q, d], ["L", v, d], ["L", v, e], ["L", q, e], ["Z"]], g.box[z]({
            d: m
          })), p && (C = g.whiskers.strokeWidth() % 2 / 2, f += C, l += C, G = /%$/.test(p) ? L * parseFloat(p) / 100 : p / 2, m = [["M", D - G, f], ["L", D + G, f], ["M", D - G, l], ["L", D + G, l]], g.whiskers[z]({
            d: m
          })), E = Math.round(g.medianPlot), C = g.medianShape.strokeWidth() % 2 / 2, E += C, m = [["M", q, E], ["L", v, E]], g.medianShape[z]({
            d: m
          }));
        });
      };

      b.prototype.toYData = function (c) {
        return [c.low, c.q1, c.median, c.q3, c.high];
      };

      b.defaultOptions = l(f.defaultOptions, {
        threshold: null,
        tooltip: {
          pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>"
        },
        whiskerLength: "50%",
        fillColor: "#ffffff",
        lineWidth: 1,
        medianWidth: 2,
        whiskerWidth: 2
      });
      return b;
    }(f);

    p(a.prototype, {
      pointArrayMap: ["low", "q1", "median", "q3", "high"],
      pointValKey: "high",
      drawDataLabels: b,
      setStackedPoints: b
    });
    e.registerSeriesType("boxplot", a);
    "";
    return a;
  });
  A(f, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
    return {
      borderColor: void 0,
      borderWidth: 2,
      className: void 0,
      color: void 0,
      connectorClassName: void 0,
      connectorColor: void 0,
      connectorDistance: 60,
      connectorWidth: 1,
      enabled: !1,
      labels: {
        className: void 0,
        allowOverlap: !1,
        format: "",
        formatter: void 0,
        align: "right",
        style: {
          fontSize: "10px",
          color: "#000000"
        },
        x: 0,
        y: 0
      },
      maxSize: 60,
      minSize: 10,
      legendIndex: 0,
      ranges: {
        value: void 0,
        borderColor: void 0,
        color: void 0,
        connectorColor: void 0
      },
      sizeBy: "area",
      sizeByAbsoluteValue: !1,
      zIndex: 1,
      zThreshold: 0
    };
  });
  A(f, "Series/Bubble/BubbleLegendItem.js", [f["Core/Color/Color.js"], f["Core/FormatUtilities.js"], f["Core/Globals.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = f.parse,
        p = e.noop,
        l = a.arrayMax,
        k = a.arrayMin,
        y = a.isNumber,
        B = a.merge,
        c = a.pick,
        g = a.stableSort;
    "";
    return function () {
      function a(c, a) {
        this.options = this.symbols = this.visible = this.selected = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
        this.setState = p;
        this.init(c, a);
      }

      a.prototype.init = function (c, a) {
        this.options = c;
        this.visible = !0;
        this.chart = a.chart;
        this.legend = a;
      };

      a.prototype.addToLegend = function (c) {
        c.splice(this.options.legendIndex, 0, this);
      };

      a.prototype.drawLegendSymbol = function (a) {
        var h = this.chart,
            b = this.options,
            d = c(a.options.itemDistance, 20),
            e = b.ranges,
            k = b.connectorDistance;
        this.fontMetrics = h.renderer.fontMetrics(b.labels.style.fontSize);
        e && e.length && y(e[0].value) ? (g(e, function (c, a) {
          return a.value - c.value;
        }), this.ranges = e, this.setOptions(), this.render(), a = this.getMaxLabelSize(), e = this.ranges[0].radius, h = 2 * e, k = k - e + a.width, k = 0 < k ? k : 0, this.maxLabel = a, this.movementX = "left" === b.labels.align ? k : 0, this.legendItemWidth = h + k + d, this.legendItemHeight = h + this.fontMetrics.h / 2) : a.options.bubbleLegend.autoRanges = !0;
      };

      a.prototype.setOptions = function () {
        var a = this.ranges,
            g = this.options,
            b = this.chart.series[g.seriesIndex],
            e = this.legend.baseline,
            k = {
          zIndex: g.zIndex,
          "stroke-width": g.borderWidth
        },
            f = {
          zIndex: g.zIndex,
          "stroke-width": g.connectorWidth
        },
            C = {
          align: this.legend.options.rtl || "left" === g.labels.align ? "right" : "left",
          zIndex: g.zIndex
        },
            D = b.options.marker.fillOpacity,
            r = this.chart.styledMode;
        a.forEach(function (h, v) {
          r || (k.stroke = c(h.borderColor, g.borderColor, b.color), k.fill = c(h.color, g.color, 1 !== D ? d(b.color).setOpacity(D).get("rgba") : b.color), f.stroke = c(h.connectorColor, g.connectorColor, b.color));
          a[v].radius = this.getRangeRadius(h.value);
          a[v] = B(a[v], {
            center: a[0].radius - a[v].radius + e
          });
          r || B(!0, a[v], {
            bubbleAttribs: B(k),
            connectorAttribs: B(f),
            labelAttribs: C
          });
        }, this);
      };

      a.prototype.getRangeRadius = function (c) {
        var a = this.options;
        return this.chart.series[this.options.seriesIndex].getRadius.call(this, a.ranges[a.ranges.length - 1].value, a.ranges[0].value, a.minSize, a.maxSize, c);
      };

      a.prototype.render = function () {
        var c = this.chart.renderer,
            a = this.options.zThreshold;
        this.symbols || (this.symbols = {
          connectors: [],
          bubbleItems: [],
          labels: []
        });
        this.legendSymbol = c.g("bubble-legend");
        this.legendItem = c.g("bubble-legend-item");
        this.legendSymbol.translateX = 0;
        this.legendSymbol.translateY = 0;
        this.ranges.forEach(function (c) {
          c.value >= a && this.renderRange(c);
        }, this);
        this.legendSymbol.add(this.legendItem);
        this.legendItem.add(this.legendGroup);
        this.hideOverlappingLabels();
      };

      a.prototype.renderRange = function (c) {
        var a = this.options,
            g = a.labels,
            b = this.chart,
            h = b.series[a.seriesIndex],
            d = b.renderer,
            e = this.symbols;
        b = e.labels;
        var k = c.center,
            r = Math.abs(c.radius),
            q = a.connectorDistance || 0,
            v = g.align,
            f = a.connectorWidth,
            H = this.ranges[0].radius || 0,
            t = k - r - a.borderWidth / 2 + f / 2,
            l = this.fontMetrics;
        l = l.f / 2 - (l.h - l.f) / 2;
        var n = d.styledMode;
        q = this.legend.options.rtl || "left" === v ? -q : q;
        "center" === v && (q = 0, a.connectorDistance = 0, c.labelAttribs.align = "center");
        v = t + a.labels.y;
        var m = H + q + a.labels.x;
        e.bubbleItems.push(d.circle(H, k + ((t % 1 ? 1 : .5) - (f % 2 ? 0 : .5)), r).attr(n ? {} : c.bubbleAttribs).addClass((n ? "highcharts-color-" + h.colorIndex + " " : "") + "highcharts-bubble-legend-symbol " + (a.className || "")).add(this.legendSymbol));
        e.connectors.push(d.path(d.crispLine([["M", H, t], ["L", H + q, t]], a.connectorWidth)).attr(n ? {} : c.connectorAttribs).addClass((n ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (a.connectorClassName || "")).add(this.legendSymbol));
        c = d.text(this.formatLabel(c), m, v + l).attr(n ? {} : c.labelAttribs).css(n ? {} : g.style).addClass("highcharts-bubble-legend-labels " + (a.labels.className || "")).add(this.legendSymbol);
        b.push(c);
        c.placed = !0;
        c.alignAttr = {
          x: m,
          y: v + l
        };
      };

      a.prototype.getMaxLabelSize = function () {
        var c, a;
        this.symbols.labels.forEach(function (g) {
          a = g.getBBox(!0);
          c = c ? a.width > c.width ? a : c : a;
        });
        return c || {};
      };

      a.prototype.formatLabel = function (c) {
        var a = this.options,
            g = a.labels.formatter;
        a = a.labels.format;
        var d = this.chart.numberFormatter;
        return a ? b.format(a, c) : g ? g.call(c) : d(c.value, 1);
      };

      a.prototype.hideOverlappingLabels = function () {
        var c = this.chart,
            a = this.symbols;
        !this.options.labels.allowOverlap && a && (c.hideOverlappingLabels(a.labels), a.labels.forEach(function (c, g) {
          c.newOpacity ? c.newOpacity !== c.oldOpacity && a.connectors[g].show() : a.connectors[g].hide();
        }));
      };

      a.prototype.getRanges = function () {
        var a = this.legend.bubbleLegend,
            g = a.options.ranges,
            b,
            d = Number.MAX_VALUE,
            e = -Number.MAX_VALUE;
        a.chart.series.forEach(function (a) {
          a.isBubble && !a.ignoreSeries && (b = a.zData.filter(y), b.length && (d = c(a.options.zMin, Math.min(d, Math.max(k(b), !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), e = c(a.options.zMax, Math.max(e, l(b)))));
        });
        var f = d === e ? [{
          value: e
        }] : [{
          value: d
        }, {
          value: (d + e) / 2
        }, {
          value: e,
          autoRanges: !0
        }];
        g.length && g[0].radius && f.reverse();
        f.forEach(function (c, a) {
          g && g[a] && (f[a] = B(g[a], c));
        });
        return f;
      };

      a.prototype.predictBubbleSizes = function () {
        var c = this.chart,
            a = this.fontMetrics,
            g = c.legend.options,
            b = g.floating,
            d = (g = "horizontal" === g.layout) ? c.legend.lastLineHeight : 0,
            e = c.plotSizeX,
            k = c.plotSizeY,
            D = c.series[this.options.seriesIndex],
            r = D.getPxExtremes();
        c = Math.ceil(r.minPxSize);
        r = Math.ceil(r.maxPxSize);
        var q = Math.min(k, e);
        D = D.options.maxSize;
        if (b || !/%$/.test(D)) a = r;else if (D = parseFloat(D), a = (q + d - a.h / 2) * D / 100 / (D / 100 + 1), g && k - a >= e || !g && e - a >= k) a = r;
        return [c, Math.ceil(a)];
      };

      a.prototype.updateRanges = function (c, a) {
        var g = this.legend.options.bubbleLegend;
        g.minSize = c;
        g.maxSize = a;
        g.ranges = this.getRanges();
      };

      a.prototype.correctSizes = function () {
        var c = this.legend,
            a = this.chart.series[this.options.seriesIndex].getPxExtremes();
        1 < Math.abs(Math.ceil(a.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, a.maxPxSize), c.render());
      };

      return a;
    }();
  });
  A(f, "Series/Bubble/BubbleLegendComposition.js", [f["Series/Bubble/BubbleLegendDefaults.js"], f["Series/Bubble/BubbleLegendItem.js"], f["Core/DefaultOptions.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = e.setOptions,
        p = a.addEvent,
        l = a.objectEach,
        k = a.wrap,
        y;

    (function (a) {
      function c(c, a, b) {
        var d = this.legend,
            r = 0 <= g(this);

        if (d && d.options.enabled && d.bubbleLegend && d.options.bubbleLegend.autoRanges && r) {
          var q = d.bubbleLegend.options;
          r = d.bubbleLegend.predictBubbleSizes();
          d.bubbleLegend.updateRanges(r[0], r[1]);
          q.placed || (d.group.placed = !1, d.allItems.forEach(function (c) {
            c.legendGroup.translateY = null;
          }));
          d.render();
          this.getMargins();
          this.axes.forEach(function (c) {
            c.visible && c.render();
            q.placed || (c.setScale(), c.updateNames(), l(c.ticks, function (c) {
              c.isNew = !0;
              c.isNewLabel = !0;
            }));
          });
          q.placed = !0;
          this.getMargins();
          c.call(this, a, b);
          d.bubbleLegend.correctSizes();
          y(d, e(d));
        } else c.call(this, a, b), d && d.options.enabled && d.bubbleLegend && (d.render(), y(d, e(d)));
      }

      function g(c) {
        c = c.series;

        for (var a = 0; a < c.length;) {
          if (c[a] && c[a].isBubble && c[a].visible && c[a].zData.length) return a;
          a++;
        }

        return -1;
      }

      function e(c) {
        c = c.allItems;
        var a = [],
            g = c.length,
            b,
            r = 0;

        for (b = 0; b < g; b++) {
          if (c[b].legendItemHeight && (c[b].itemHeight = c[b].legendItemHeight), c[b] === c[g - 1] || c[b + 1] && c[b]._legendItemPos[1] !== c[b + 1]._legendItemPos[1]) {
            a.push({
              height: 0
            });
            var d = a[a.length - 1];

            for (r; r <= b; r++) {
              c[r].itemHeight > d.height && (d.height = c[r].itemHeight);
            }

            d.step = b;
          }
        }

        return a;
      }

      function h(c) {
        var a = this.bubbleLegend,
            d = this.options,
            h = d.bubbleLegend,
            r = g(this.chart);
        a && a.ranges && a.ranges.length && (h.ranges.length && (h.autoRanges = !!h.ranges[0].autoRanges), this.destroyItem(a));
        0 <= r && d.enabled && h.enabled && (h.seriesIndex = r, this.bubbleLegend = new b(h, this), this.bubbleLegend.addToLegend(c.allItems));
      }

      function z() {
        var c = this.chart,
            a = this.visible,
            b = this.chart.legend;
        b && b.bubbleLegend && (this.visible = !a, this.ignoreSeries = a, c = 0 <= g(c), b.bubbleLegend.visible !== c && (b.update({
          bubbleLegend: {
            enabled: c
          }
        }), b.bubbleLegend.visible = c), this.visible = a);
      }

      function y(c, a) {
        var g = c.options.rtl,
            b,
            r,
            d,
            h = 0;
        c.allItems.forEach(function (c, q) {
          b = c.legendGroup.translateX;
          r = c._legendItemPos[1];
          if ((d = c.movementX) || g && c.ranges) d = g ? b - c.options.maxSize / 2 : b + d, c.legendGroup.attr({
            translateX: d
          });
          q > a[h].step && h++;
          c.legendGroup.attr({
            translateY: Math.round(r + a[h].height / 2)
          });
          c._legendItemPos[1] = r + a[h].height / 2;
        });
      }

      var B = [];

      a.compose = function (a, g, b) {
        -1 === B.indexOf(a) && (B.push(a), d({
          legend: {
            bubbleLegend: f
          }
        }), k(a.prototype, "drawChartBox", c));
        -1 === B.indexOf(g) && (B.push(g), p(g, "afterGetAllItems", h));
        -1 === B.indexOf(b) && (B.push(b), p(b, "legendItemClick", z));
      };
    })(y || (y = {}));

    return y;
  });
  A(f, "Series/Bubble/BubblePoint.js", [f["Core/Series/Point.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e) {
    var a = this && this.__extends || function () {
      var _a4 = function a(b, d) {
        _a4 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, b) {
          a.__proto__ = b;
        } || function (a, b) {
          for (var d in b) {
            b.hasOwnProperty(d) && (a[d] = b[d]);
          }
        };

        return _a4(b, d);
      };

      return function (b, d) {
        function e() {
          this.constructor = b;
        }

        _a4(b, d);

        b.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e());
      };
    }();

    e = e.extend;

    b = function (b) {
      function d() {
        var a = null !== b && b.apply(this, arguments) || this;
        a.options = void 0;
        a.series = void 0;
        return a;
      }

      a(d, b);

      d.prototype.haloPath = function (a) {
        return f.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a);
      };

      return d;
    }(b.seriesTypes.scatter.prototype.pointClass);

    e(b.prototype, {
      ttBelow: !1
    });
    return b;
  });
  A(f, "Series/Bubble/BubbleSeries.js", [f["Core/Axis/Axis.js"], f["Series/Bubble/BubbleLegendComposition.js"], f["Series/Bubble/BubblePoint.js"], f["Core/Color/Color.js"], f["Core/Globals.js"], f["Core/Series/Series.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a, d, p, l, k) {
    var y = this && this.__extends || function () {
      var _c2 = function c(a, r) {
        _c2 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (c, a) {
          c.__proto__ = a;
        } || function (c, a) {
          for (var r in a) {
            a.hasOwnProperty(r) && (c[r] = a[r]);
          }
        };

        return _c2(a, r);
      };

      return function (a, r) {
        function b() {
          this.constructor = a;
        }

        _c2(a, r);

        a.prototype = null === r ? Object.create(r) : (b.prototype = r.prototype, new b());
      };
    }(),
        B = a.parse;

    a = d.noop;
    var c = l.seriesTypes;
    d = c.column;
    var g = c.scatter;
    c = k.addEvent;
    var t = k.arrayMax,
        h = k.arrayMin,
        z = k.clamp,
        J = k.extend,
        I = k.isNumber,
        K = k.merge,
        E = k.pick;

    k = function (c) {
      function a() {
        var a = null !== c && c.apply(this, arguments) || this;
        a.data = void 0;
        a.maxPxSize = void 0;
        a.minPxSize = void 0;
        a.options = void 0;
        a.points = void 0;
        a.radii = void 0;
        a.yData = void 0;
        a.zData = void 0;
        return a;
      }

      y(a, c);

      a.prototype.animate = function (a) {
        !a && this.points.length < this.options.animationLimit && this.points.forEach(function (a) {
          var c = a.graphic;
          c && c.width && (this.hasRendered || c.attr({
            x: a.plotX,
            y: a.plotY,
            width: 1,
            height: 1
          }), c.animate(this.markerAttribs(a), this.options.animation));
        }, this);
      };

      a.prototype.getRadii = function () {
        var a = this,
            c = this.zData,
            b = this.yData,
            g = [],
            d = this.chart.bubbleZExtremes;
        var h = this.getPxExtremes();
        var e = h.minPxSize,
            k = h.maxPxSize;

        if (!d) {
          var m = Number.MAX_VALUE,
              f = -Number.MAX_VALUE,
              t;
          this.chart.series.forEach(function (c) {
            c.bubblePadding && (c.visible || !a.chart.options.chart.ignoreHiddenSeries) && (c = (c.onPoint || c).getZExtremes()) && (m = Math.min(m || c.zMin, c.zMin), f = Math.max(f || c.zMax, c.zMax), t = !0);
          });
          t ? (d = {
            zMin: m,
            zMax: f
          }, this.chart.bubbleZExtremes = d) : d = {
            zMin: 0,
            zMax: 0
          };
        }

        var w = 0;

        for (h = c.length; w < h; w++) {
          var z = c[w];
          g.push(this.getRadius(d.zMin, d.zMax, e, k, z, b && b[w]));
        }

        this.radii = g;
      };

      a.prototype.getRadius = function (a, c, b, g, d, h) {
        var r = this.options,
            q = "width" !== r.sizeBy,
            m = r.zThreshold,
            e = c - a,
            v = .5;
        if (null === h || null === d) return null;

        if (I(d)) {
          r.sizeByAbsoluteValue && (d = Math.abs(d - m), e = Math.max(c - m, Math.abs(a - m)), a = 0);
          if (d < a) return b / 2 - 1;
          0 < e && (v = (d - a) / e);
        }

        q && 0 <= v && (v = Math.sqrt(v));
        return Math.ceil(b + v * (g - b)) / 2;
      };

      a.prototype.hasData = function () {
        return !!this.processedXData.length;
      };

      a.prototype.pointAttribs = function (a, c) {
        var b = this.options.marker.fillOpacity;
        a = p.prototype.pointAttribs.call(this, a, c);
        1 !== b && (a.fill = B(a.fill).setOpacity(b).get("rgba"));
        return a;
      };

      a.prototype.translate = function () {
        c.prototype.translate.call(this);
        this.getRadii();
        this.translateBubble();
      };

      a.prototype.translateBubble = function () {
        for (var a = this.data, c = this.radii, b = this.getPxExtremes().minPxSize, g = a.length; g--;) {
          var d = a[g],
              h = c ? c[g] : 0;
          I(h) && h >= b / 2 ? (d.marker = J(d.marker, {
            radius: h,
            width: 2 * h,
            height: 2 * h
          }), d.dlBox = {
            x: d.plotX - h,
            y: d.plotY - h,
            width: 2 * h,
            height: 2 * h
          }) : (d.shapeArgs = d.dlBox = void 0, d.plotY = 0, d.marker = {
            width: 0,
            height: 0
          });
        }
      };

      a.prototype.getPxExtremes = function () {
        var a = Math.min(this.chart.plotWidth, this.chart.plotHeight),
            c = function c(_c3) {
          if ("string" === typeof _c3) {
            var b = /%$/.test(_c3);
            _c3 = parseInt(_c3, 10);
          }

          return b ? a * _c3 / 100 : _c3;
        },
            b = c(E(this.options.minSize, 8));

        c = Math.max(c(E(this.options.maxSize, "20%")), b);
        return {
          minPxSize: b,
          maxPxSize: c
        };
      };

      a.prototype.getZExtremes = function () {
        var c = this.options,
            a = (this.zData || []).filter(I);

        if (a.length) {
          var b = E(c.zMin, z(h(a), !1 === c.displayNegative ? c.zThreshold || 0 : -Number.MAX_VALUE, Number.MAX_VALUE));
          c = E(c.zMax, t(a));
          if (I(b) && I(c)) return {
            zMin: b,
            zMax: c
          };
        }
      };

      a.compose = b.compose;
      a.defaultOptions = K(g.defaultOptions, {
        dataLabels: {
          formatter: function formatter() {
            var c = this.series.chart.numberFormatter,
                a = this.point.z;
            return I(a) ? c(a, -1) : "";
          },
          inside: !0,
          verticalAlign: "middle"
        },
        animationLimit: 250,
        marker: {
          lineColor: null,
          lineWidth: 1,
          fillOpacity: .5,
          radius: null,
          states: {
            hover: {
              radiusPlus: 0
            }
          },
          symbol: "circle"
        },
        minSize: 8,
        maxSize: "20%",
        softThreshold: !1,
        states: {
          hover: {
            halo: {
              size: 5
            }
          }
        },
        tooltip: {
          pointFormat: "({point.x}, {point.y}), Size: {point.z}"
        },
        turboThreshold: 0,
        zThreshold: 0,
        zoneAxis: "z"
      });
      return a;
    }(g);

    J(k.prototype, {
      alignDataLabel: d.prototype.alignDataLabel,
      applyZones: a,
      bubblePadding: !0,
      buildKDTree: a,
      directTouch: !0,
      isBubble: !0,
      pointArrayMap: ["y", "z"],
      pointClass: e,
      parallelArrays: ["x", "y", "z"],
      trackerGroups: ["group", "dataLabelsGroup"],
      specialGroup: "group",
      zoneAxis: "z"
    });
    c(k, "updatedData", function (c) {
      delete c.target.chart.bubbleZExtremes;
    });

    f.prototype.beforePadding = function () {
      var c = this,
          a = this.len,
          b = this.chart,
          g = 0,
          d = a,
          h = this.isXAxis,
          e = h ? "xData" : "yData",
          k = this.min,
          f = this.max - k,
          n = a / f,
          m;
      this.series.forEach(function (a) {
        if (a.bubblePadding && (a.visible || !b.options.chart.ignoreHiddenSeries)) {
          m = c.allowZoomOutside = !0;
          var r = a[e];
          h && ((a.onPoint || a).getRadii(0, 0, a), a.onPoint && (a.radii = a.onPoint.radii));
          if (0 < f) for (var q = r.length; q--;) {
            if (I(r[q]) && c.dataMin <= r[q] && r[q] <= c.max) {
              var v = a.radii && a.radii[q] || 0;
              g = Math.min((r[q] - k) * n - v, g);
              d = Math.max((r[q] - k) * n + v, d);
            }
          }
        }
      });
      m && 0 < f && !this.logarithmic && (d -= a, n *= (a + Math.max(0, g) - Math.min(d, a)) / a, [["min", "userMin", g], ["max", "userMax", d]].forEach(function (a) {
        "undefined" === typeof E(c.options[a[0]], c[a[1]]) && (c[a[0]] += a[2] / n);
      }));
    };

    l.registerSeriesType("bubble", k);
    "";
    "";
    return k;
  });
  A(f, "Series/ColumnRange/ColumnRangePoint.js", [f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b) {
    var e = this && this.__extends || function () {
      var _a5 = function a(b, d) {
        _a5 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, c) {
          a.__proto__ = c;
        } || function (a, c) {
          for (var b in c) {
            c.hasOwnProperty(b) && (a[b] = c[b]);
          }
        };

        return _a5(b, d);
      };

      return function (b, d) {
        function e() {
          this.constructor = b;
        }

        _a5(b, d);

        b.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e());
      };
    }(),
        a = f.seriesTypes;

    f = a.column.prototype.pointClass.prototype;
    var d = b.extend,
        p = b.isNumber;

    b = function (a) {
      function b() {
        var b = null !== a && a.apply(this, arguments) || this;
        b.options = void 0;
        b.series = void 0;
        return b;
      }

      e(b, a);

      b.prototype.isValid = function () {
        return p(this.low);
      };

      return b;
    }(a.arearange.prototype.pointClass);

    d(b.prototype, {
      setState: f.setState
    });
    return b;
  });
  A(f, "Series/ColumnRange/ColumnRangeSeries.js", [f["Series/ColumnRange/ColumnRangePoint.js"], f["Core/Globals.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = this && this.__extends || function () {
      var _a6 = function a(c, b) {
        _a6 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, c) {
          a.__proto__ = c;
        } || function (a, c) {
          for (var b in c) {
            c.hasOwnProperty(b) && (a[b] = c[b]);
          }
        };

        return _a6(c, b);
      };

      return function (c, b) {
        function d() {
          this.constructor = c;
        }

        _a6(c, b);

        c.prototype = null === b ? Object.create(b) : (d.prototype = b.prototype, new d());
      };
    }();

    b = b.noop;
    var p = e.seriesTypes,
        l = p.arearange,
        k = p.column,
        y = p.column.prototype,
        B = a.clamp;
    p = a.extend;
    var c = a.merge,
        g = a.pick,
        t = {
      pointRange: null,
      marker: null,
      states: {
        hover: {
          halo: !1
        }
      }
    };

    a = function (a) {
      function b() {
        return null !== a && a.apply(this, arguments) || this;
      }

      d(b, a);

      b.prototype.setOptions = function () {
        c(!0, arguments[0], {
          stacking: void 0
        });
        return l.prototype.setOptions.apply(this, arguments);
      };

      b.prototype.translate = function () {
        var a = this,
            c = this.yAxis,
            b = this.xAxis,
            d = b.startAngleRad,
            h = this.chart,
            e = this.xAxis.isRadial,
            r = Math.max(h.chartWidth, h.chartHeight) + 999,
            q,
            f,
            k,
            t,
            l;
        y.translate.apply(this);
        this.points.forEach(function (v) {
          var n = v.shapeArgs || {},
              m = a.options.minPointLength;
          v.plotHigh = t = B(c.translate(v.high, 0, 1, 0, 1), -r, r);
          v.plotLow = B(v.plotY, -r, r);
          l = t;
          q = g(v.rectPlotY, v.plotY) - t;
          Math.abs(q) < m ? (f = m - q, q += f, l -= f / 2) : 0 > q && (q *= -1, l -= q);
          e && a.polar ? (k = v.barX + d, v.shapeType = "arc", v.shapeArgs = a.polar.arc(l + q, l, k, k + v.pointWidth)) : (n.height = q, n.y = l, m = n.x, m = void 0 === m ? 0 : m, n = n.width, n = void 0 === n ? 0 : n, v.tooltipPos = h.inverted ? [c.len + c.pos - h.plotLeft - l - q / 2, b.len + b.pos - h.plotTop - m - n / 2, q] : [b.left - h.plotLeft + m + n / 2, c.pos - h.plotTop + l + q / 2, q]);
        });
      };

      b.prototype.pointAttribs = function () {
        return y.pointAttribs.apply(this, arguments);
      };

      b.prototype.translate3dPoints = function () {
        return y.translate3dPoints.apply(this, arguments);
      };

      b.prototype.translate3dShapes = function () {
        return y.translate3dShapes.apply(this, arguments);
      };

      b.defaultOptions = c(k.defaultOptions, l.defaultOptions, t);
      return b;
    }(l);

    p(a.prototype, {
      directTouch: !0,
      pointClass: f,
      trackerGroups: ["group", "dataLabelsGroup"],
      adjustForMissingColumns: y.adjustForMissingColumns,
      animate: y.animate,
      crispCol: y.crispCol,
      drawGraph: b,
      drawPoints: y.drawPoints,
      getSymbol: b,
      drawTracker: y.drawTracker,
      getColumnMetrics: y.getColumnMetrics
    });
    e.registerSeriesType("columnrange", a);
    "";
    return a;
  });
  A(f, "Series/ColumnPyramid/ColumnPyramidSeries.js", [f["Series/Column/ColumnSeries.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e) {
    var a = this && this.__extends || function () {
      var _a7 = function a(b, c) {
        _a7 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, c) {
          a.__proto__ = c;
        } || function (a, c) {
          for (var b in c) {
            c.hasOwnProperty(b) && (a[b] = c[b]);
          }
        };

        return _a7(b, c);
      };

      return function (b, c) {
        function d() {
          this.constructor = b;
        }

        _a7(b, c);

        b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d());
      };
    }(),
        d = f.prototype,
        p = e.clamp,
        l = e.merge,
        k = e.pick;

    e = function (b) {
      function e() {
        var a = null !== b && b.apply(this, arguments) || this;
        a.data = void 0;
        a.options = void 0;
        a.points = void 0;
        return a;
      }

      a(e, b);

      e.prototype.translate = function () {
        var a = this,
            b = a.chart,
            e = a.options,
            h = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
        h = a.borderWidth = k(e.borderWidth, h ? 0 : 1);
        var f = a.yAxis,
            l = e.threshold,
            B = a.translatedThreshold = f.getThreshold(l),
            y = k(e.minPointLength, 5),
            E = a.getColumnMetrics(),
            C = E.width,
            D = a.barW = Math.max(C, 1 + 2 * h),
            r = a.pointXOffset = E.offset;
        b.inverted && (B -= .5);
        e.pointPadding && (D = Math.ceil(D));
        d.translate.apply(a);
        a.points.forEach(function (c) {
          var d = k(c.yBottom, B),
              g = 999 + Math.abs(d),
              h = p(c.plotY, -g, f.len + g);
          g = c.plotX + r;
          var q = D / 2,
              t = Math.min(h, d);
          d = Math.max(h, d) - t;
          var n;
          c.barX = g;
          c.pointWidth = C;
          c.tooltipPos = b.inverted ? [f.len + f.pos - b.plotLeft - h, a.xAxis.len - g - q, d] : [g + q, h + f.pos - b.plotTop, d];
          h = l + (c.total || c.y);
          "percent" === e.stacking && (h = l + (0 > c.y) ? -100 : 100);
          h = f.toPixels(h, !0);
          var m = (n = b.plotHeight - h - (b.plotHeight - B)) ? q * (t - h) / n : 0;
          var z = n ? q * (t + d - h) / n : 0;
          n = g - m + q;
          m = g + m + q;
          var u = g + z + q;
          z = g - z + q;
          var w = t - y;
          var x = t + d;
          0 > c.y && (w = t, x = t + d + y);
          b.inverted && (u = f.width - t, n = h - (f.width - B), m = q * (h - u) / n, z = q * (h - (u - d)) / n, n = g + q + m, m = n - 2 * m, u = g - z + q, z = g + z + q, w = t, x = t + d - y, 0 > c.y && (x = t + d + y));
          c.shapeType = "path";
          c.shapeArgs = {
            x: n,
            y: w,
            width: m - n,
            height: d,
            d: [["M", n, w], ["L", m, w], ["L", u, x], ["L", z, x], ["Z"]]
          };
        });
      };

      e.defaultOptions = l(f.defaultOptions, {});
      return e;
    }(f);

    b.registerSeriesType("columnpyramid", e);
    "";
    return e;
  });
  A(f, "Series/ErrorBar/ErrorBarSeries.js", [f["Series/BoxPlot/BoxPlotSeries.js"], f["Series/Column/ColumnSeries.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = this && this.__extends || function () {
      var _a8 = function a(b, c) {
        _a8 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, c) {
          a.__proto__ = c;
        } || function (a, c) {
          for (var b in c) {
            c.hasOwnProperty(b) && (a[b] = c[b]);
          }
        };

        return _a8(b, c);
      };

      return function (b, c) {
        function d() {
          this.constructor = b;
        }

        _a8(b, c);

        b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d());
      };
    }(),
        p = e.seriesTypes.arearange,
        l = a.merge;

    a = a.extend;

    var k = function (a) {
      function e() {
        var c = null !== a && a.apply(this, arguments) || this;
        c.data = void 0;
        c.options = void 0;
        c.points = void 0;
        return c;
      }

      d(e, a);

      e.prototype.getColumnMetrics = function () {
        return this.linkedParent && this.linkedParent.columnMetrics || b.prototype.getColumnMetrics.call(this);
      };

      e.prototype.drawDataLabels = function () {
        var a = this.pointValKey;
        p && (p.prototype.drawDataLabels.call(this), this.data.forEach(function (c) {
          c.y = c[a];
        }));
      };

      e.prototype.toYData = function (a) {
        return [a.low, a.high];
      };

      e.defaultOptions = l(f.defaultOptions, {
        color: "#000000",
        grouping: !1,
        linkedTo: ":previous",
        tooltip: {
          pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>"
        },
        whiskerWidth: null
      });
      return e;
    }(f);

    a(k.prototype, {
      pointArrayMap: ["low", "high"],
      pointValKey: "high",
      doQuartiles: !1
    });
    e.registerSeriesType("errorbar", k);
    "";
    return k;
  });
  A(f, "Series/Gauge/GaugePoint.js", [f["Core/Series/SeriesRegistry.js"]], function (f) {
    var b = this && this.__extends || function () {
      var _b = function b(a, d) {
        _b = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, b) {
          a.__proto__ = b;
        } || function (a, b) {
          for (var d in b) {
            b.hasOwnProperty(d) && (a[d] = b[d]);
          }
        };

        return _b(a, d);
      };

      return function (a, d) {
        function e() {
          this.constructor = a;
        }

        _b(a, d);

        a.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e());
      };
    }();

    return function (e) {
      function a() {
        var a = null !== e && e.apply(this, arguments) || this;
        a.options = void 0;
        a.series = void 0;
        a.shapeArgs = void 0;
        return a;
      }

      b(a, e);

      a.prototype.setState = function (a) {
        this.state = a;
      };

      return a;
    }(f.series.prototype.pointClass);
  });
  A(f, "Series/Gauge/GaugeSeries.js", [f["Series/Gauge/GaugePoint.js"], f["Core/Globals.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = this && this.__extends || function () {
      var _a9 = function a(c, b) {
        _a9 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, c) {
          a.__proto__ = c;
        } || function (a, c) {
          for (var b in c) {
            c.hasOwnProperty(b) && (a[b] = c[b]);
          }
        };

        return _a9(c, b);
      };

      return function (c, b) {
        function d() {
          this.constructor = c;
        }

        _a9(c, b);

        c.prototype = null === b ? Object.create(b) : (d.prototype = b.prototype, new d());
      };
    }();

    b = b.noop;
    var p = e.series,
        l = e.seriesTypes.column,
        k = a.clamp,
        y = a.isNumber,
        B = a.extend,
        c = a.merge,
        g = a.pick,
        t = a.pInt;

    a = function (a) {
      function b() {
        var c = null !== a && a.apply(this, arguments) || this;
        c.data = void 0;
        c.points = void 0;
        c.options = void 0;
        c.yAxis = void 0;
        return c;
      }

      d(b, a);

      b.prototype.translate = function () {
        var a = this.yAxis,
            b = this.options,
            d = a.center;
        this.generatePoints();
        this.points.forEach(function (g) {
          var h = c(b.dial, g.dial),
              e = t(h.radius) * d[2] / 200,
              r = t(h.baseLength) * e / 100,
              f = t(h.rearLength) * e / 100,
              v = h.baseWidth,
              l = h.topWidth,
              p = b.overshoot,
              z = a.startAngleRad + a.translate(g.y, void 0, void 0, void 0, !0);
          if (y(p) || !1 === b.wrap) p = y(p) ? p / 180 * Math.PI : 0, z = k(z, a.startAngleRad - p, a.endAngleRad + p);
          z = 180 * z / Math.PI;
          g.shapeType = "path";
          g.shapeArgs = {
            d: h.path || [["M", -f, -v / 2], ["L", r, -v / 2], ["L", e, -l / 2], ["L", e, l / 2], ["L", r, v / 2], ["L", -f, v / 2], ["Z"]],
            translateX: d[0],
            translateY: d[1],
            rotation: z
          };
          g.plotX = d[0];
          g.plotY = d[1];
        });
      };

      b.prototype.drawPoints = function () {
        var a = this,
            b = a.chart,
            d = a.yAxis.center,
            g = a.pivot,
            h = a.options,
            e = h.pivot,
            r = b.renderer;
        a.points.forEach(function (d) {
          var g = d.graphic,
              e = d.shapeArgs,
              f = e.d,
              q = c(h.dial, d.dial);
          g ? (g.animate(e), e.d = f) : d.graphic = r[d.shapeType](e).attr({
            rotation: e.rotation,
            zIndex: 1
          }).addClass("highcharts-dial").add(a.group);
          if (!b.styledMode) d.graphic[g ? "animate" : "attr"]({
            stroke: q.borderColor,
            "stroke-width": q.borderWidth,
            fill: q.backgroundColor
          });
        });
        g ? g.animate({
          translateX: d[0],
          translateY: d[1]
        }) : e && (a.pivot = r.circle(0, 0, e.radius).attr({
          zIndex: 2
        }).addClass("highcharts-pivot").translate(d[0], d[1]).add(a.group), b.styledMode || a.pivot.attr({
          fill: e.backgroundColor,
          stroke: e.borderColor,
          "stroke-width": e.borderWidth
        }));
      };

      b.prototype.animate = function (a) {
        var c = this;
        a || c.points.forEach(function (a) {
          var b = a.graphic;
          b && (b.attr({
            rotation: 180 * c.yAxis.startAngleRad / Math.PI
          }), b.animate({
            rotation: a.shapeArgs.rotation
          }, c.options.animation));
        });
      };

      b.prototype.render = function () {
        this.group = this.plotGroup("group", "series", this.visible ? "inherit" : "hidden", this.options.zIndex, this.chart.seriesGroup);
        p.prototype.render.call(this);
        this.group.clip(this.chart.clipRect);
      };

      b.prototype.setData = function (a, c) {
        p.prototype.setData.call(this, a, !1);
        this.processData();
        this.generatePoints();
        g(c, !0) && this.chart.redraw();
      };

      b.prototype.hasData = function () {
        return !!this.points.length;
      };

      b.defaultOptions = c(p.defaultOptions, {
        dataLabels: {
          borderColor: "#cccccc",
          borderRadius: 3,
          borderWidth: 1,
          crop: !1,
          defer: !1,
          enabled: !0,
          verticalAlign: "top",
          y: 15,
          zIndex: 2
        },
        dial: {
          backgroundColor: "#000000",
          baseLength: "70%",
          baseWidth: 3,
          borderColor: "#cccccc",
          borderWidth: 0,
          radius: "80%",
          rearLength: "10%",
          topWidth: 1
        },
        pivot: {
          radius: 5,
          borderWidth: 0,
          borderColor: "#cccccc",
          backgroundColor: "#000000"
        },
        tooltip: {
          headerFormat: ""
        },
        showInLegend: !1
      });
      return b;
    }(p);

    B(a.prototype, {
      angular: !0,
      directTouch: !0,
      drawGraph: b,
      drawTracker: l.prototype.drawTracker,
      fixedBox: !0,
      forceDL: !0,
      noSharedTooltip: !0,
      pointClass: f,
      trackerGroups: ["group", "dataLabelsGroup"]
    });
    e.registerSeriesType("gauge", a);
    "";
    return a;
  });
  A(f, "Series/PackedBubble/PackedBubblePoint.js", [f["Core/Chart/Chart.js"], f["Core/Series/Point.js"], f["Core/Series/SeriesRegistry.js"]], function (f, b, e) {
    var a = this && this.__extends || function () {
      var _a10 = function a(b, d) {
        _a10 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, b) {
          a.__proto__ = b;
        } || function (a, b) {
          for (var d in b) {
            b.hasOwnProperty(d) && (a[d] = b[d]);
          }
        };

        return _a10(b, d);
      };

      return function (b, d) {
        function e() {
          this.constructor = b;
        }

        _a10(b, d);

        b.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e());
      };
    }();

    return function (d) {
      function e() {
        var a = null !== d && d.apply(this, arguments) || this;
        a.degree = NaN;
        a.mass = NaN;
        a.radius = NaN;
        a.options = void 0;
        a.series = void 0;
        a.value = null;
        return a;
      }

      a(e, d);

      e.prototype.destroy = function () {
        this.series.layout && this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
        return b.prototype.destroy.apply(this, arguments);
      };

      e.prototype.firePointEvent = function () {
        var a = this.series.options;

        if (this.isParentNode && a.parentNode) {
          var d = a.allowPointSelect;
          a.allowPointSelect = a.parentNode.allowPointSelect;
          b.prototype.firePointEvent.apply(this, arguments);
          a.allowPointSelect = d;
        } else b.prototype.firePointEvent.apply(this, arguments);
      };

      e.prototype.select = function () {
        var a = this.series.chart;
        this.isParentNode ? (a.getSelectedPoints = a.getSelectedParentNodes, b.prototype.select.apply(this, arguments), a.getSelectedPoints = f.prototype.getSelectedPoints) : b.prototype.select.apply(this, arguments);
      };

      return e;
    }(e.seriesTypes.bubble.prototype.pointClass);
  });
  A(f, "Series/Networkgraph/DraggableNodes.js", [f["Core/Chart/Chart.js"], f["Core/Globals.js"], f["Core/Utilities.js"]], function (f, b, e) {
    var a = e.addEvent;
    b.dragNodesMixin = {
      onMouseDown: function onMouseDown(a, b) {
        b = this.chart.pointer.normalize(b);
        a.fixedPosition = {
          chartX: b.chartX,
          chartY: b.chartY,
          plotX: a.plotX,
          plotY: a.plotY
        };
        a.inDragMode = !0;
      },
      onMouseMove: function onMouseMove(a, b) {
        if (a.fixedPosition && a.inDragMode) {
          var d = this.chart,
              e = d.pointer.normalize(b);
          b = a.fixedPosition.chartX - e.chartX;
          e = a.fixedPosition.chartY - e.chartY;
          var f = void 0,
              p = void 0,
              c = d.graphLayoutsLookup;
          if (5 < Math.abs(b) || 5 < Math.abs(e)) f = a.fixedPosition.plotX - b, p = a.fixedPosition.plotY - e, d.isInsidePlot(f, p) && (a.plotX = f, a.plotY = p, a.hasDragged = !0, this.redrawHalo(a), c.forEach(function (a) {
            a.restartSimulation();
          }));
        }
      },
      onMouseUp: function onMouseUp(a, b) {
        a.fixedPosition && (a.hasDragged && (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw()), a.inDragMode = a.hasDragged = !1, this.options.fixedDraggable || delete a.fixedPosition);
      },
      redrawHalo: function redrawHalo(a) {
        a && this.halo && this.halo.attr({
          d: a.haloPath(this.options.states.hover.halo.size)
        });
      }
    };
    a(f, "load", function () {
      var b = this,
          e,
          f,
          k;
      b.container && (e = a(b.container, "mousedown", function (d) {
        var e = b.hoverPoint;
        e && e.series && e.series.hasDraggableNodes && e.series.options.draggable && (e.series.onMouseDown(e, d), f = a(b.container, "mousemove", function (a) {
          return e && e.series && e.series.onMouseMove(e, a);
        }), k = a(b.container.ownerDocument, "mouseup", function (a) {
          f();
          k();
          return e && e.series && e.series.onMouseUp(e, a);
        }));
      }));
      a(b, "destroy", function () {
        e();
      });
    });
  });
  A(f, "Series/Networkgraph/Integrations.js", [f["Core/Globals.js"]], function (f) {
    f.networkgraphIntegrations = {
      verlet: {
        attractiveForceFunction: function attractiveForceFunction(b, e) {
          return (e - b) / b;
        },
        repulsiveForceFunction: function repulsiveForceFunction(b, e) {
          return (e - b) / b * (e > b ? 1 : 0);
        },
        barycenter: function barycenter() {
          var b = this.options.gravitationalConstant,
              e = this.barycenter.xFactor,
              a = this.barycenter.yFactor;
          e = (e - (this.box.left + this.box.width) / 2) * b;
          a = (a - (this.box.top + this.box.height) / 2) * b;
          this.nodes.forEach(function (b) {
            b.fixedPosition || (b.plotX -= e / b.mass / b.degree, b.plotY -= a / b.mass / b.degree);
          });
        },
        repulsive: function repulsive(b, e, a) {
          e = e * this.diffTemperature / b.mass / b.degree;
          b.fixedPosition || (b.plotX += a.x * e, b.plotY += a.y * e);
        },
        attractive: function attractive(b, e, a) {
          var d = b.getMass(),
              f = -a.x * e * this.diffTemperature;
          e = -a.y * e * this.diffTemperature;
          b.fromNode.fixedPosition || (b.fromNode.plotX -= f * d.fromNode / b.fromNode.degree, b.fromNode.plotY -= e * d.fromNode / b.fromNode.degree);
          b.toNode.fixedPosition || (b.toNode.plotX += f * d.toNode / b.toNode.degree, b.toNode.plotY += e * d.toNode / b.toNode.degree);
        },
        integrate: function integrate(b, e) {
          var a = -b.options.friction,
              d = b.options.maxSpeed,
              f = (e.plotX + e.dispX - e.prevX) * a;
          a *= e.plotY + e.dispY - e.prevY;
          var l = Math.abs,
              k = l(f) / (f || 1);
          l = l(a) / (a || 1);
          f = k * Math.min(d, Math.abs(f));
          a = l * Math.min(d, Math.abs(a));
          e.prevX = e.plotX + e.dispX;
          e.prevY = e.plotY + e.dispY;
          e.plotX += f;
          e.plotY += a;
          e.temperature = b.vectorLength({
            x: f,
            y: a
          });
        },
        getK: function getK(b) {
          return Math.pow(b.box.width * b.box.height / b.nodes.length, .5);
        }
      },
      euler: {
        attractiveForceFunction: function attractiveForceFunction(b, e) {
          return b * b / e;
        },
        repulsiveForceFunction: function repulsiveForceFunction(b, e) {
          return e * e / b;
        },
        barycenter: function barycenter() {
          var b = this.options.gravitationalConstant,
              e = this.barycenter.xFactor,
              a = this.barycenter.yFactor;
          this.nodes.forEach(function (d) {
            if (!d.fixedPosition) {
              var f = d.getDegree();
              f *= 1 + f / 2;
              d.dispX += (e - d.plotX) * b * f / d.degree;
              d.dispY += (a - d.plotY) * b * f / d.degree;
            }
          });
        },
        repulsive: function repulsive(b, e, a, d) {
          b.dispX += a.x / d * e / b.degree;
          b.dispY += a.y / d * e / b.degree;
        },
        attractive: function attractive(b, e, a, d) {
          var f = b.getMass(),
              l = a.x / d * e;
          e *= a.y / d;
          b.fromNode.fixedPosition || (b.fromNode.dispX -= l * f.fromNode / b.fromNode.degree, b.fromNode.dispY -= e * f.fromNode / b.fromNode.degree);
          b.toNode.fixedPosition || (b.toNode.dispX += l * f.toNode / b.toNode.degree, b.toNode.dispY += e * f.toNode / b.toNode.degree);
        },
        integrate: function integrate(b, e) {
          e.dispX += e.dispX * b.options.friction;
          e.dispY += e.dispY * b.options.friction;
          var a = e.temperature = b.vectorLength({
            x: e.dispX,
            y: e.dispY
          });
          0 !== a && (e.plotX += e.dispX / a * Math.min(Math.abs(e.dispX), b.temperature), e.plotY += e.dispY / a * Math.min(Math.abs(e.dispY), b.temperature));
        },
        getK: function getK(b) {
          return Math.pow(b.box.width * b.box.height / b.nodes.length, .3);
        }
      }
    };
  });
  A(f, "Series/Networkgraph/QuadTree.js", [f["Core/Globals.js"], f["Core/Utilities.js"]], function (f, b) {
    b = b.extend;

    var e = f.QuadTreeNode = function (a) {
      this.box = a;
      this.boxSize = Math.min(a.width, a.height);
      this.nodes = [];
      this.body = this.isInternal = !1;
      this.isEmpty = !0;
    };

    b(e.prototype, {
      insert: function insert(a, b) {
        this.isInternal ? this.nodes[this.getBoxPosition(a)].insert(a, b - 1) : (this.isEmpty = !1, this.body ? b ? (this.isInternal = !0, this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, b - 1), this.body = !0), this.nodes[this.getBoxPosition(a)].insert(a, b - 1)) : (b = new e({
          top: a.plotX,
          left: a.plotY,
          width: .1,
          height: .1
        }), b.body = a, b.isInternal = !1, this.nodes.push(b)) : (this.isInternal = !1, this.body = a));
      },
      updateMassAndCenter: function updateMassAndCenter() {
        var a = 0,
            b = 0,
            e = 0;
        this.isInternal ? (this.nodes.forEach(function (d) {
          d.isEmpty || (a += d.mass, b += d.plotX * d.mass, e += d.plotY * d.mass);
        }), b /= a, e /= a) : this.body && (a = this.body.mass, b = this.body.plotX, e = this.body.plotY);
        this.mass = a;
        this.plotX = b;
        this.plotY = e;
      },
      divideBox: function divideBox() {
        var a = this.box.width / 2,
            b = this.box.height / 2;
        this.nodes[0] = new e({
          left: this.box.left,
          top: this.box.top,
          width: a,
          height: b
        });
        this.nodes[1] = new e({
          left: this.box.left + a,
          top: this.box.top,
          width: a,
          height: b
        });
        this.nodes[2] = new e({
          left: this.box.left + a,
          top: this.box.top + b,
          width: a,
          height: b
        });
        this.nodes[3] = new e({
          left: this.box.left,
          top: this.box.top + b,
          width: a,
          height: b
        });
      },
      getBoxPosition: function getBoxPosition(a) {
        var b = a.plotY < this.box.top + this.box.height / 2;
        return a.plotX < this.box.left + this.box.width / 2 ? b ? 0 : 3 : b ? 1 : 2;
      }
    });

    f = f.QuadTree = function (a, b, f, l) {
      this.box = {
        left: a,
        top: b,
        width: f,
        height: l
      };
      this.maxDepth = 25;
      this.root = new e(this.box, "0");
      this.root.isInternal = !0;
      this.root.isRoot = !0;
      this.root.divideBox();
    };

    b(f.prototype, {
      insertNodes: function insertNodes(a) {
        a.forEach(function (a) {
          this.root.insert(a, this.maxDepth);
        }, this);
      },
      visitNodeRecursive: function visitNodeRecursive(a, b, e) {
        var d;
        a || (a = this.root);
        a === this.root && b && (d = b(a));
        !1 !== d && (a.nodes.forEach(function (a) {
          if (a.isInternal) {
            b && (d = b(a));
            if (!1 === d) return;
            this.visitNodeRecursive(a, b, e);
          } else a.body && b && b(a.body);

          e && e(a);
        }, this), a === this.root && e && e(a));
      },
      calculateMassAndCenter: function calculateMassAndCenter() {
        this.visitNodeRecursive(null, null, function (a) {
          a.updateMassAndCenter();
        });
      }
    });
  });
  A(f, "Series/Networkgraph/Layouts.js", [f["Core/Chart/Chart.js"], f["Core/Animation/AnimationUtilities.js"], f["Core/Globals.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = b.setAnimation;
    b = a.addEvent;
    var p = a.clamp,
        l = a.defined,
        k = a.extend,
        y = a.isFunction,
        B = a.pick;
    e.layouts = {
      "reingold-fruchterman": function reingoldFruchterman() {}
    };
    k(e.layouts["reingold-fruchterman"].prototype, {
      init: function init(a) {
        this.options = a;
        this.nodes = [];
        this.links = [];
        this.series = [];
        this.box = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
        this.setInitialRendering(!0);
        this.integration = e.networkgraphIntegrations[a.integration];
        this.enableSimulation = a.enableSimulation;
        this.attractiveForce = B(a.attractiveForce, this.integration.attractiveForceFunction);
        this.repulsiveForce = B(a.repulsiveForce, this.integration.repulsiveForceFunction);
        this.approximation = a.approximation;
      },
      updateSimulation: function updateSimulation(a) {
        this.enableSimulation = B(a, this.options.enableSimulation);
      },
      start: function start() {
        var a = this.series,
            b = this.options;
        this.currentStep = 0;
        this.forces = a[0] && a[0].forces || [];
        this.chart = a[0] && a[0].chart;
        this.initialRendering && (this.initPositions(), a.forEach(function (a) {
          a.finishedAnimating = !0;
          a.render();
        }));
        this.setK();
        this.resetSimulation(b);
        this.enableSimulation && this.step();
      },
      step: function step() {
        var a = this,
            b = this.series;
        a.currentStep++;
        "barnes-hut" === a.approximation && (a.createQuadTree(), a.quadTree.calculateMassAndCenter());
        a.forces.forEach(function (c) {
          a[c + "Forces"](a.temperature);
        });
        a.applyLimits(a.temperature);
        a.temperature = a.coolDown(a.startTemperature, a.diffTemperature, a.currentStep);
        a.prevSystemTemperature = a.systemTemperature;
        a.systemTemperature = a.getSystemTemperature();
        a.enableSimulation && (b.forEach(function (a) {
          a.chart && a.render();
        }), a.maxIterations-- && isFinite(a.temperature) && !a.isStable() ? (a.simulation && e.win.cancelAnimationFrame(a.simulation), a.simulation = e.win.requestAnimationFrame(function () {
          a.step();
        })) : a.simulation = !1);
      },
      stop: function stop() {
        this.simulation && e.win.cancelAnimationFrame(this.simulation);
      },
      setArea: function setArea(a, b, d, e) {
        this.box = {
          left: a,
          top: b,
          width: d,
          height: e
        };
      },
      setK: function setK() {
        this.k = this.options.linkLength || this.integration.getK(this);
      },
      addElementsToCollection: function addElementsToCollection(a, b) {
        a.forEach(function (a) {
          -1 === b.indexOf(a) && b.push(a);
        });
      },
      removeElementFromCollection: function removeElementFromCollection(a, b) {
        a = b.indexOf(a);
        -1 !== a && b.splice(a, 1);
      },
      clear: function clear() {
        this.nodes.length = 0;
        this.links.length = 0;
        this.series.length = 0;
        this.resetSimulation();
      },
      resetSimulation: function resetSimulation() {
        this.forcedStop = !1;
        this.systemTemperature = 0;
        this.setMaxIterations();
        this.setTemperature();
        this.setDiffTemperature();
      },
      restartSimulation: function restartSimulation() {
        this.simulation ? this.resetSimulation() : (this.setInitialRendering(!1), this.enableSimulation ? this.start() : this.setMaxIterations(1), this.chart && this.chart.redraw(), this.setInitialRendering(!0));
      },
      setMaxIterations: function setMaxIterations(a) {
        this.maxIterations = B(a, this.options.maxIterations);
      },
      setTemperature: function setTemperature() {
        this.temperature = this.startTemperature = Math.sqrt(this.nodes.length);
      },
      setDiffTemperature: function setDiffTemperature() {
        this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1);
      },
      setInitialRendering: function setInitialRendering(a) {
        this.initialRendering = a;
      },
      createQuadTree: function createQuadTree() {
        this.quadTree = new e.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
        this.quadTree.insertNodes(this.nodes);
      },
      initPositions: function initPositions() {
        var a = this.options.initialPositions;
        y(a) ? (a.call(this), this.nodes.forEach(function (a) {
          l(a.prevX) || (a.prevX = a.plotX);
          l(a.prevY) || (a.prevY = a.plotY);
          a.dispX = 0;
          a.dispY = 0;
        })) : "circle" === a ? this.setCircularPositions() : this.setRandomPositions();
      },
      setCircularPositions: function setCircularPositions() {
        function a(b) {
          b.linksFrom.forEach(function (b) {
            l[b.toNode.id] || (l[b.toNode.id] = !0, k.push(b.toNode), a(b.toNode));
          });
        }

        var b = this.box,
            d = this.nodes,
            e = 2 * Math.PI / (d.length + 1),
            f = d.filter(function (a) {
          return 0 === a.linksTo.length;
        }),
            k = [],
            l = {},
            y = this.options.initialPositionRadius;
        f.forEach(function (b) {
          k.push(b);
          a(b);
        });
        k.length ? d.forEach(function (a) {
          -1 === k.indexOf(a) && k.push(a);
        }) : k = d;
        k.forEach(function (a, c) {
          a.plotX = a.prevX = B(a.plotX, b.width / 2 + y * Math.cos(c * e));
          a.plotY = a.prevY = B(a.plotY, b.height / 2 + y * Math.sin(c * e));
          a.dispX = 0;
          a.dispY = 0;
        });
      },
      setRandomPositions: function setRandomPositions() {
        function a(a) {
          a = a * a / Math.PI;
          return a -= Math.floor(a);
        }

        var b = this.box,
            d = this.nodes,
            e = d.length + 1;
        d.forEach(function (c, d) {
          c.plotX = c.prevX = B(c.plotX, b.width * a(d));
          c.plotY = c.prevY = B(c.plotY, b.height * a(e + d));
          c.dispX = 0;
          c.dispY = 0;
        });
      },
      force: function force(a) {
        this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1));
      },
      barycenterForces: function barycenterForces() {
        this.getBarycenter();
        this.force("barycenter");
      },
      getBarycenter: function getBarycenter() {
        var a = 0,
            b = 0,
            d = 0;
        this.nodes.forEach(function (c) {
          b += c.plotX * c.mass;
          d += c.plotY * c.mass;
          a += c.mass;
        });
        return this.barycenter = {
          x: b,
          y: d,
          xFactor: b / a,
          yFactor: d / a
        };
      },
      barnesHutApproximation: function barnesHutApproximation(a, b) {
        var c = this.getDistXY(a, b),
            d = this.vectorLength(c);
        if (a !== b && 0 !== d) if (b.isInternal) {
          if (b.boxSize / d < this.options.theta && 0 !== d) {
            var e = this.repulsiveForce(d, this.k);
            this.force("repulsive", a, e * b.mass, c, d);
            var g = !1;
          } else g = !0;
        } else e = this.repulsiveForce(d, this.k), this.force("repulsive", a, e * b.mass, c, d);
        return g;
      },
      repulsiveForces: function repulsiveForces() {
        var a = this;
        "barnes-hut" === a.approximation ? a.nodes.forEach(function (b) {
          a.quadTree.visitNodeRecursive(null, function (c) {
            return a.barnesHutApproximation(b, c);
          });
        }) : a.nodes.forEach(function (b) {
          a.nodes.forEach(function (c) {
            if (b !== c && !b.fixedPosition) {
              var d = a.getDistXY(b, c);
              var e = a.vectorLength(d);

              if (0 !== e) {
                var g = a.repulsiveForce(e, a.k);
                a.force("repulsive", b, g * c.mass, d, e);
              }
            }
          });
        });
      },
      attractiveForces: function attractiveForces() {
        var a = this,
            b,
            d,
            e;
        a.links.forEach(function (c) {
          c.fromNode && c.toNode && (b = a.getDistXY(c.fromNode, c.toNode), d = a.vectorLength(b), 0 !== d && (e = a.attractiveForce(d, a.k), a.force("attractive", c, e, b, d)));
        });
      },
      applyLimits: function applyLimits() {
        var a = this;
        a.nodes.forEach(function (b) {
          b.fixedPosition || (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), b.dispX = 0, b.dispY = 0);
        });
      },
      applyLimitBox: function applyLimitBox(a, b) {
        var c = a.radius;
        a.plotX = p(a.plotX, b.left + c, b.width - c);
        a.plotY = p(a.plotY, b.top + c, b.height - c);
      },
      coolDown: function coolDown(a, b, d) {
        return a - b * d;
      },
      isStable: function isStable() {
        return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature;
      },
      getSystemTemperature: function getSystemTemperature() {
        return this.nodes.reduce(function (a, b) {
          return a + b.temperature;
        }, 0);
      },
      vectorLength: function vectorLength(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y);
      },
      getDistR: function getDistR(a, b) {
        a = this.getDistXY(a, b);
        return this.vectorLength(a);
      },
      getDistXY: function getDistXY(a, b) {
        var c = a.plotX - b.plotX;
        a = a.plotY - b.plotY;
        return {
          x: c,
          y: a,
          absX: Math.abs(c),
          absY: Math.abs(a)
        };
      }
    });
    b(f, "predraw", function () {
      this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function (a) {
        a.stop();
      });
    });
    b(f, "render", function () {
      function a(a) {
        a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.enableSimulation && (a.beforeStep && a.beforeStep(), a.step(), e = !1, b = !0);
      }

      var b = !1;

      if (this.graphLayoutsLookup) {
        d(!1, this);

        for (this.graphLayoutsLookup.forEach(function (a) {
          a.start();
        }); !e;) {
          var e = !0;
          this.graphLayoutsLookup.forEach(a);
        }

        b && this.series.forEach(function (a) {
          a && a.layout && a.render();
        });
      }
    });
    b(f, "beforePrint", function () {
      this.graphLayoutsLookup && (this.graphLayoutsLookup.forEach(function (a) {
        a.updateSimulation(!1);
      }), this.redraw());
    });
    b(f, "afterPrint", function () {
      this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function (a) {
        a.updateSimulation();
      });
      this.redraw();
    });
  });
  A(f, "Series/PackedBubble/PackedBubbleComposition.js", [f["Core/Chart/Chart.js"], f["Core/Globals.js"], f["Core/Utilities.js"]], function (f, b, e) {
    var a = b.layouts["reingold-fruchterman"],
        d = e.addEvent,
        p = e.extendClass,
        l = e.pick;

    f.prototype.getSelectedParentNodes = function () {
      var a = [];
      this.series.forEach(function (b) {
        b.parentNode && b.parentNode.selected && a.push(b.parentNode);
      });
      return a;
    };

    b.networkgraphIntegrations.packedbubble = {
      repulsiveForceFunction: function repulsiveForceFunction(a, b, d, c) {
        return Math.min(a, (d.marker.radius + c.marker.radius) / 2);
      },
      barycenter: function barycenter() {
        var a = this,
            b = a.options.gravitationalConstant,
            d = a.box,
            c = a.nodes,
            e,
            f;
        c.forEach(function (g) {
          a.options.splitSeries && !g.isParentNode ? (e = g.series.parentNode.plotX, f = g.series.parentNode.plotY) : (e = d.width / 2, f = d.height / 2);
          g.fixedPosition || (g.plotX -= (g.plotX - e) * b / (g.mass * Math.sqrt(c.length)), g.plotY -= (g.plotY - f) * b / (g.mass * Math.sqrt(c.length)));
        });
      },
      repulsive: function repulsive(a, b, d, c) {
        var e = b * this.diffTemperature / a.mass / a.degree;
        b = d.x * e;
        d = d.y * e;
        a.fixedPosition || (a.plotX += b, a.plotY += d);
        c.fixedPosition || (c.plotX -= b, c.plotY -= d);
      },
      integrate: b.networkgraphIntegrations.verlet.integrate,
      getK: b.noop
    };
    b.layouts.packedbubble = p(a, {
      beforeStep: function beforeStep() {
        this.options.marker && this.series.forEach(function (a) {
          a && a.calculateParentRadius();
        });
      },
      isStable: function isStable() {
        var a = Math.abs(this.prevSystemTemperature - this.systemTemperature);
        return 1 > Math.abs(10 * this.systemTemperature / Math.sqrt(this.nodes.length)) && .00001 > a || 0 >= this.temperature;
      },
      setCircularPositions: function setCircularPositions() {
        var a = this,
            b = a.box,
            d = a.nodes,
            c = 2 * Math.PI / (d.length + 1),
            e,
            f,
            h = a.options.initialPositionRadius;
        d.forEach(function (d, g) {
          a.options.splitSeries && !d.isParentNode ? (e = d.series.parentNode.plotX, f = d.series.parentNode.plotY) : (e = b.width / 2, f = b.height / 2);
          d.plotX = d.prevX = l(d.plotX, e + h * Math.cos(d.index || g * c));
          d.plotY = d.prevY = l(d.plotY, f + h * Math.sin(d.index || g * c));
          d.dispX = 0;
          d.dispY = 0;
        });
      },
      repulsiveForces: function repulsiveForces() {
        var a = this,
            b,
            d,
            c,
            e = a.options.bubblePadding;
        a.nodes.forEach(function (f) {
          f.degree = f.mass;
          f.neighbours = 0;
          a.nodes.forEach(function (g) {
            b = 0;
            f === g || f.fixedPosition || !a.options.seriesInteraction && f.series !== g.series || (c = a.getDistXY(f, g), d = a.vectorLength(c) - (f.marker.radius + g.marker.radius + e), 0 > d && (f.degree += .01, f.neighbours++, b = a.repulsiveForce(-d / Math.sqrt(f.neighbours), a.k, f, g)), a.force("repulsive", f, b * g.mass, c, g, d));
          });
        });
      },
      applyLimitBox: function applyLimitBox(b) {
        if (this.options.splitSeries && !b.isParentNode && this.options.parentNodeLimit) {
          var d = this.getDistXY(b, b.series.parentNode);
          var e = b.series.parentNodeRadius - b.marker.radius - this.vectorLength(d);
          0 > e && e > -2 * b.marker.radius && (b.plotX -= .01 * d.x, b.plotY -= .01 * d.y);
        }

        a.prototype.applyLimitBox.apply(this, arguments);
      }
    });
    d(f, "beforeRedraw", function () {
      this.allDataPoints && delete this.allDataPoints;
    });
  });
  A(f, "Series/PackedBubble/PackedBubbleSeries.js", [f["Core/Color/Color.js"], f["Core/Globals.js"], f["Series/PackedBubble/PackedBubblePoint.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a, d) {
    var p = this && this.__extends || function () {
      var _a11 = function a(b, c) {
        _a11 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, b) {
          a.__proto__ = b;
        } || function (a, b) {
          for (var c in b) {
            b.hasOwnProperty(c) && (a[c] = b[c]);
          }
        };

        return _a11(b, c);
      };

      return function (b, c) {
        function d() {
          this.constructor = b;
        }

        _a11(b, c);

        b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d());
      };
    }(),
        l = f.parse,
        k = a.series,
        y = a.seriesTypes.bubble,
        B = d.addEvent,
        c = d.clamp,
        g = d.defined,
        t = d.extend,
        h = d.fireEvent,
        z = d.isArray,
        J = d.isNumber,
        A = d.merge,
        I = d.pick,
        E = b.dragNodesMixin;

    f = function (a) {
      function d() {
        var b = null !== a && a.apply(this, arguments) || this;
        b.chart = void 0;
        b.data = void 0;
        b.layout = void 0;
        b.options = void 0;
        b.points = void 0;
        b.xData = void 0;
        return b;
      }

      p(d, a);

      d.prototype.accumulateAllPoints = function (a) {
        var b = a.chart,
            c = [],
            d,
            e;

        for (d = 0; d < b.series.length; d++) {
          if (a = b.series[d], a.is("packedbubble") && a.visible || !b.options.chart.ignoreHiddenSeries) for (e = 0; e < a.yData.length; e++) {
            c.push([null, null, a.yData[e], a.index, e, {
              id: e,
              marker: {
                radius: 0
              }
            }]);
          }
        }

        return c;
      };

      d.prototype.addLayout = function () {
        var a = this.options.layoutAlgorithm,
            c = this.chart.graphLayoutsStorage,
            d = this.chart.graphLayoutsLookup,
            e = this.chart.options.chart;
        c || (this.chart.graphLayoutsStorage = c = {}, this.chart.graphLayoutsLookup = d = []);
        var f = c[a.type];
        f || (a.enableSimulation = g(e.forExport) ? !e.forExport : a.enableSimulation, c[a.type] = f = new b.layouts[a.type](), f.init(a), d.splice(f.index, 0, f));
        this.layout = f;
        this.points.forEach(function (a) {
          a.mass = 2;
          a.degree = 1;
          a.collisionNmb = 1;
        });
        f.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
        f.addElementsToCollection([this], f.series);
        f.addElementsToCollection(this.points, f.nodes);
      };

      d.prototype.addSeriesLayout = function () {
        var a = this.options.layoutAlgorithm,
            c = this.chart.graphLayoutsStorage,
            d = this.chart.graphLayoutsLookup,
            e = A(a, a.parentNodeOptions, {
          enableSimulation: this.layout.options.enableSimulation
        });
        var f = c[a.type + "-series"];
        f || (c[a.type + "-series"] = f = new b.layouts[a.type](), f.init(e), d.splice(f.index, 0, f));
        this.parentNodeLayout = f;
        this.createParentNodes();
      };

      d.prototype.calculateParentRadius = function () {
        var a = this.seriesBox();
        this.parentNodeRadius = c(Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20, 20, a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20);
        this.parentNode && (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius);
      };

      d.prototype.calculateZExtremes = function () {
        var a = this.options.zMin,
            b = this.options.zMax,
            c = Infinity,
            d = -Infinity;
        if (a && b) return [a, b];
        this.chart.series.forEach(function (a) {
          a.yData.forEach(function (a) {
            g(a) && (a > d && (d = a), a < c && (c = a));
          });
        });
        a = I(a, c);
        b = I(b, d);
        return [a, b];
      };

      d.prototype.checkOverlap = function (a, b) {
        var c = a[0] - b[0],
            d = a[1] - b[1];
        return -.001 > Math.sqrt(c * c + d * d) - Math.abs(a[2] + b[2]);
      };

      d.prototype.createParentNodes = function () {
        var a = this,
            b = a.chart,
            c = a.parentNodeLayout,
            d,
            e = a.parentNode,
            f = a.pointClass,
            g = a.layout.options,
            h = {
          radius: a.parentNodeRadius,
          lineColor: a.color,
          fillColor: l(a.color).brighten(.4).get()
        };
        g.parentNodeOptions && (h = A(g.parentNodeOptions.marker || {}, h));
        a.parentNodeMass = 0;
        a.points.forEach(function (b) {
          a.parentNodeMass += Math.PI * Math.pow(b.marker.radius, 2);
        });
        a.calculateParentRadius();
        c.nodes.forEach(function (b) {
          b.seriesIndex === a.index && (d = !0);
        });
        c.setArea(0, 0, b.plotWidth, b.plotHeight);
        d || (e || (e = new f().init(this, {
          mass: a.parentNodeRadius / 2,
          marker: h,
          dataLabels: {
            inside: !1
          },
          states: {
            normal: {
              marker: h
            },
            hover: {
              marker: h
            }
          },
          dataLabelOnNull: !0,
          degree: a.parentNodeRadius,
          isParentNode: !0,
          seriesIndex: a.index
        })), a.parentNode && (e.plotX = a.parentNode.plotX, e.plotY = a.parentNode.plotY), a.parentNode = e, c.addElementsToCollection([a], c.series), c.addElementsToCollection([e], c.nodes));
      };

      d.prototype.deferLayout = function () {
        var a = this.options.layoutAlgorithm;
        this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout());
      };

      d.prototype.destroy = function () {
        this.chart.graphLayoutsLookup && this.chart.graphLayoutsLookup.forEach(function (a) {
          a.removeElementFromCollection(this, a.series);
        }, this);
        this.parentNode && this.parentNodeLayout && (this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes), this.parentNode.dataLabel && (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy()));
        k.prototype.destroy.apply(this, arguments);
      };

      d.prototype.drawDataLabels = function () {
        var a = this.options.dataLabels.textPath,
            b = this.points;
        k.prototype.drawDataLabels.apply(this, arguments);
        this.parentNode && (this.parentNode.formatPrefix = "parentNode", this.points = [this.parentNode], this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath, k.prototype.drawDataLabels.apply(this, arguments), this.points = b, this.options.dataLabels.textPath = a);
      };

      d.prototype.drawGraph = function () {
        if (this.layout && this.layout.options.splitSeries) {
          var a = this.chart;
          var b = this.layout.options.parentNodeOptions.marker;
          var c = {
            fill: b.fillColor || l(this.color).brighten(.4).get(),
            opacity: b.fillOpacity,
            stroke: b.lineColor || this.color,
            "stroke-width": I(b.lineWidth, this.options.lineWidth)
          };
          this.parentNodesGroup || (this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", this.visible ? "inherit" : "hidden", .1, a.seriesGroup), this.group.attr({
            zIndex: 2
          }));
          this.calculateParentRadius();
          b = A({
            x: this.parentNode.plotX - this.parentNodeRadius,
            y: this.parentNode.plotY - this.parentNodeRadius,
            width: 2 * this.parentNodeRadius,
            height: 2 * this.parentNodeRadius
          }, c);
          this.parentNode.graphic || (this.graph = this.parentNode.graphic = a.renderer.symbol(c.symbol).add(this.parentNodesGroup));
          this.parentNode.graphic.attr(b);
        }
      };

      d.prototype.drawTracker = function () {
        var b = this.parentNode;
        a.prototype.drawTracker.call(this);

        if (b) {
          var c = z(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : [];
          b.graphic && (b.graphic.element.point = b);
          c.forEach(function (a) {
            a.div ? a.div.point = b : a.element.point = b;
          });
        }
      };

      d.prototype.getPointRadius = function () {
        var a = this,
            b = a.chart,
            d = a.options,
            e = d.useSimulation,
            f = Math.min(b.plotWidth, b.plotHeight),
            g = {},
            h = [],
            n = b.allDataPoints,
            m,
            k,
            u,
            w;
        ["minSize", "maxSize"].forEach(function (a) {
          var b = parseInt(d[a], 10),
              c = /%$/.test(d[a]);
          g[a] = c ? f * b / 100 : b * Math.sqrt(n.length);
        });
        b.minRadius = m = g.minSize / Math.sqrt(n.length);
        b.maxRadius = k = g.maxSize / Math.sqrt(n.length);
        var x = e ? a.calculateZExtremes() : [m, k];
        (n || []).forEach(function (b, d) {
          u = e ? c(b[2], x[0], x[1]) : b[2];
          w = a.getRadius(x[0], x[1], m, k, u);
          0 === w && (w = null);
          n[d][2] = w;
          h.push(w);
        });
        a.radii = h;
      };

      d.prototype.init = function () {
        k.prototype.init.apply(this, arguments);
        this.eventsToUnbind.push(B(this, "updatedData", function () {
          this.chart.series.forEach(function (a) {
            a.type === this.type && (a.isDirty = !0);
          }, this);
        }));
        return this;
      };

      d.prototype.onMouseUp = function (a) {
        if (a.fixedPosition && !a.removed) {
          var b,
              c,
              d = this.layout,
              e = this.parentNodeLayout;
          e && d.options.dragBetweenSeries && e.nodes.forEach(function (e) {
            a && a.marker && e !== a.series.parentNode && (b = d.getDistXY(a, e), c = d.vectorLength(b) - e.marker.radius - a.marker.radius, 0 > c && (e.series.addPoint(A(a.options, {
              plotX: a.plotX,
              plotY: a.plotY
            }), !1), d.removeElementFromCollection(a, d.nodes), a.remove()));
          });
          E.onMouseUp.apply(this, arguments);
        }
      };

      d.prototype.placeBubbles = function (a) {
        var b = this.checkOverlap,
            c = this.positionBubble,
            d = [],
            e = 1,
            f = 0,
            g = 0;
        var h = [];
        var m;
        a = a.sort(function (a, b) {
          return b[2] - a[2];
        });

        if (a.length) {
          d.push([[0, 0, a[0][2], a[0][3], a[0][4]]]);
          if (1 < a.length) for (d.push([[0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]]), m = 2; m < a.length; m++) {
            a[m][2] = a[m][2] || 1, h = c(d[e][f], d[e - 1][g], a[m]), b(h, d[e][0]) ? (d.push([]), g = 0, d[e + 1].push(c(d[e][f], d[e][0], a[m])), e++, f = 0) : 1 < e && d[e - 1][g + 1] && b(h, d[e - 1][g + 1]) ? (g++, d[e].push(c(d[e][f], d[e - 1][g], a[m])), f++) : (f++, d[e].push(h));
          }
          this.chart.stages = d;
          this.chart.rawPositions = [].concat.apply([], d);
          this.resizeRadius();
          h = this.chart.rawPositions;
        }

        return h;
      };

      d.prototype.pointAttribs = function (a, b) {
        var c = this.options,
            d = c.marker;
        a && a.isParentNode && c.layoutAlgorithm && c.layoutAlgorithm.parentNodeOptions && (d = c.layoutAlgorithm.parentNodeOptions.marker);
        c = d.fillOpacity;
        a = k.prototype.pointAttribs.call(this, a, b);
        1 !== c && (a["fill-opacity"] = c);
        return a;
      };

      d.prototype.positionBubble = function (a, b, c) {
        var d = Math.sqrt,
            e = Math.asin,
            f = Math.acos,
            g = Math.pow,
            h = Math.abs;
        d = d(g(a[0] - b[0], 2) + g(a[1] - b[1], 2));
        f = f((g(d, 2) + g(c[2] + b[2], 2) - g(c[2] + a[2], 2)) / (2 * (c[2] + b[2]) * d));
        e = e(h(a[0] - b[0]) / d);
        a = (0 > a[1] - b[1] ? 0 : Math.PI) + f + e * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1);
        return [b[0] + (b[2] + c[2]) * Math.sin(a), b[1] - (b[2] + c[2]) * Math.cos(a), c[2], c[3], c[4]];
      };

      d.prototype.render = function () {
        var a = [];
        k.prototype.render.apply(this, arguments);
        this.options.dataLabels.allowOverlap || (this.data.forEach(function (b) {
          z(b.dataLabels) && b.dataLabels.forEach(function (b) {
            a.push(b);
          });
        }), this.options.useSimulation && this.chart.hideOverlappingLabels(a));
      };

      d.prototype.resizeRadius = function () {
        var a = this.chart,
            b = a.rawPositions,
            c = Math.min,
            d = Math.max,
            e = a.plotLeft,
            f = a.plotTop,
            g = a.plotHeight,
            h = a.plotWidth,
            m,
            k,
            u;
        var w = m = Number.POSITIVE_INFINITY;
        var x = k = Number.NEGATIVE_INFINITY;

        for (u = 0; u < b.length; u++) {
          var l = b[u][2];
          w = c(w, b[u][0] - l);
          x = d(x, b[u][0] + l);
          m = c(m, b[u][1] - l);
          k = d(k, b[u][1] + l);
        }

        u = [x - w, k - m];
        c = c.apply([], [(h - e) / u[0], (g - f) / u[1]]);

        if (1e-10 < Math.abs(c - 1)) {
          for (u = 0; u < b.length; u++) {
            b[u][2] *= c;
          }

          this.placeBubbles(b);
        } else a.diffY = g / 2 + f - m - (k - m) / 2, a.diffX = h / 2 + e - w - (x - w) / 2;
      };

      d.prototype.seriesBox = function () {
        var a = this.chart,
            b = Math.max,
            c = Math.min,
            d,
            e = [a.plotLeft, a.plotLeft + a.plotWidth, a.plotTop, a.plotTop + a.plotHeight];
        this.data.forEach(function (a) {
          g(a.plotX) && g(a.plotY) && a.marker.radius && (d = a.marker.radius, e[0] = c(e[0], a.plotX - d), e[1] = b(e[1], a.plotX + d), e[2] = c(e[2], a.plotY - d), e[3] = b(e[3], a.plotY + d));
        });
        return J(e.width / e.height) ? e : null;
      };

      d.prototype.setVisible = function () {
        var a = this;
        k.prototype.setVisible.apply(a, arguments);
        a.parentNodeLayout && a.graph ? a.visible ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show()) : (a.graph.hide(), a.parentNodeLayout.removeElementFromCollection(a.parentNode, a.parentNodeLayout.nodes), a.parentNode.dataLabel && a.parentNode.dataLabel.hide()) : a.layout && (a.visible ? a.layout.addElementsToCollection(a.points, a.layout.nodes) : a.points.forEach(function (b) {
          a.layout.removeElementFromCollection(b, a.layout.nodes);
        }));
      };

      d.prototype.translate = function () {
        var a = this.chart,
            b = this.data,
            c = this.index,
            d,
            e = this.options.useSimulation;
        this.processedXData = this.xData;
        this.generatePoints();
        g(a.allDataPoints) || (a.allDataPoints = this.accumulateAllPoints(this), this.getPointRadius());
        if (e) var f = a.allDataPoints;else f = this.placeBubbles(a.allDataPoints), this.options.draggable = !1;

        for (d = 0; d < f.length; d++) {
          if (f[d][3] === c) {
            var k = b[f[d][4]];
            var n = I(f[d][2], void 0);
            e || (k.plotX = f[d][0] - a.plotLeft + a.diffX, k.plotY = f[d][1] - a.plotTop + a.diffY);
            J(n) && (k.marker = t(k.marker, {
              radius: n,
              width: 2 * n,
              height: 2 * n
            }), k.radius = n);
          }
        }

        e && this.deferLayout();
        h(this, "afterTranslate");
      };

      d.defaultOptions = A(y.defaultOptions, {
        minSize: "10%",
        maxSize: "50%",
        sizeBy: "area",
        zoneAxis: "y",
        crisp: !1,
        tooltip: {
          pointFormat: "Value: {point.value}"
        },
        draggable: !0,
        useSimulation: !0,
        parentNode: {
          allowPointSelect: !1
        },
        dataLabels: {
          formatter: function formatter() {
            var a = this.series.chart.numberFormatter,
                b = this.point.value;
            return J(b) ? a(b, -1) : "";
          },
          parentNodeFormatter: function parentNodeFormatter() {
            return this.name;
          },
          parentNodeTextPath: {
            enabled: !0
          },
          padding: 0,
          style: {
            transition: "opacity 2000ms"
          }
        },
        layoutAlgorithm: {
          initialPositions: "circle",
          initialPositionRadius: 20,
          bubblePadding: 5,
          parentNodeLimit: !1,
          seriesInteraction: !0,
          dragBetweenSeries: !1,
          parentNodeOptions: {
            maxIterations: 400,
            gravitationalConstant: .03,
            maxSpeed: 50,
            initialPositionRadius: 100,
            seriesInteraction: !0,
            marker: {
              fillColor: null,
              fillOpacity: 1,
              lineWidth: null,
              lineColor: null,
              symbol: "circle"
            }
          },
          enableSimulation: !0,
          type: "packedbubble",
          integration: "packedbubble",
          maxIterations: 1E3,
          splitSeries: !1,
          maxSpeed: 5,
          gravitationalConstant: .01,
          friction: -.981
        }
      });
      return d;
    }(y);

    t(f.prototype, {
      alignDataLabel: k.prototype.alignDataLabel,
      axisTypes: [],
      directTouch: !0,
      forces: ["barycenter", "repulsive"],
      hasDraggableNodes: !0,
      isCartesian: !1,
      noSharedTooltip: !0,
      onMouseDown: E.onMouseDown,
      onMouseMove: E.onMouseMove,
      pointArrayMap: ["value"],
      pointClass: e,
      pointValKey: "value",
      redrawHalo: E.redrawHalo,
      requireSorting: !1,
      searchPoint: b.noop,
      trackerGroups: ["group", "dataLabelsGroup", "parentNodesGroup"]
    });
    a.registerSeriesType("packedbubble", f);
    "";
    "";
    return f;
  });
  A(f, "Series/Polygon/PolygonSeries.js", [f["Core/Globals.js"], f["Core/Legend/LegendSymbol.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = this && this.__extends || function () {
      var _a12 = function a(b, c) {
        _a12 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, b) {
          a.__proto__ = b;
        } || function (a, b) {
          for (var c in b) {
            b.hasOwnProperty(c) && (a[c] = b[c]);
          }
        };

        return _a12(b, c);
      };

      return function (b, c) {
        function d() {
          this.constructor = b;
        }

        _a12(b, c);

        b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d());
      };
    }();

    f = f.noop;
    var p = e.series,
        l = e.seriesTypes,
        k = l.area,
        y = l.line,
        B = l.scatter;
    l = a.extend;
    var c = a.merge;

    a = function (a) {
      function b() {
        var b = null !== a && a.apply(this, arguments) || this;
        b.data = void 0;
        b.options = void 0;
        b.points = void 0;
        return b;
      }

      d(b, a);

      b.prototype.getGraphPath = function () {
        for (var a = y.prototype.getGraphPath.call(this), b = a.length + 1; b--;) {
          (b === a.length || "M" === a[b][0]) && 0 < b && a.splice(b, 0, ["Z"]);
        }

        return this.areaPath = a;
      };

      b.prototype.drawGraph = function () {
        this.options.fillColor = this.color;
        k.prototype.drawGraph.call(this);
      };

      b.defaultOptions = c(B.defaultOptions, {
        marker: {
          enabled: !1,
          states: {
            hover: {
              enabled: !1
            }
          }
        },
        stickyTracking: !1,
        tooltip: {
          followPointer: !0,
          pointFormat: ""
        },
        trackByArea: !0
      });
      return b;
    }(B);

    l(a.prototype, {
      type: "polygon",
      drawLegendSymbol: b.drawRectangle,
      drawTracker: p.prototype.drawTracker,
      setStackedPoints: f
    });
    e.registerSeriesType("polygon", a);
    "";
    return a;
  });
  A(f, "Core/Axis/WaterfallAxis.js", [f["Extensions/Stacking.js"], f["Core/Utilities.js"]], function (f, b) {
    var e = b.addEvent,
        a = b.objectEach,
        d;

    (function (b) {
      function d() {
        var a = this.waterfall.stacks;
        a && (a.changed = !1, delete a.alreadyChanged);
      }

      function k() {
        var a = this.options.stackLabels;
        a && a.enabled && this.waterfall.stacks && this.waterfall.renderStackTotals();
      }

      function p() {
        for (var a = this.axes, b = this.series, c = b.length; c--;) {
          b[c].options.stacking && (a.forEach(function (a) {
            a.isXAxis || (a.waterfall.stacks.changed = !0);
          }), c = 0);
        }
      }

      function B() {
        this.waterfall || (this.waterfall = new c(this));
      }

      var c = function () {
        function b(a) {
          this.axis = a;
          this.stacks = {
            changed: !1
          };
        }

        b.prototype.renderStackTotals = function () {
          var b = this.axis,
              c = b.waterfall.stacks,
              d = b.stacking && b.stacking.stackTotalGroup,
              e = new f(b, b.options.stackLabels, !1, 0, void 0);
          this.dummyStackItem = e;
          a(c, function (b) {
            a(b, function (a) {
              e.total = a.stackTotal;
              a.label && (e.label = a.label);
              f.prototype.render.call(e, d);
              a.label = e.label;
              delete e.label;
            });
          });
          e.total = null;
        };

        return b;
      }();

      b.Composition = c;

      b.compose = function (a, b) {
        e(a, "init", B);
        e(a, "afterBuildStacks", d);
        e(a, "afterRender", k);
        e(b, "beforeRedraw", p);
      };
    })(d || (d = {}));

    return d;
  });
  A(f, "Series/Waterfall/WaterfallPoint.js", [f["Series/Column/ColumnSeries.js"], f["Core/Series/Point.js"], f["Core/Utilities.js"]], function (f, b, e) {
    var a = this && this.__extends || function () {
      var _a13 = function a(b, d) {
        _a13 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, b) {
          a.__proto__ = b;
        } || function (a, b) {
          for (var c in b) {
            b.hasOwnProperty(c) && (a[c] = b[c]);
          }
        };

        return _a13(b, d);
      };

      return function (b, d) {
        function e() {
          this.constructor = b;
        }

        _a13(b, d);

        b.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e());
      };
    }(),
        d = e.isNumber;

    return function (e) {
      function f() {
        var a = null !== e && e.apply(this, arguments) || this;
        a.options = void 0;
        a.series = void 0;
        return a;
      }

      a(f, e);

      f.prototype.getClassName = function () {
        var a = b.prototype.getClassName.call(this);
        this.isSum ? a += " highcharts-sum" : this.isIntermediateSum && (a += " highcharts-intermediate-sum");
        return a;
      };

      f.prototype.isValid = function () {
        return d(this.y) || this.isSum || !!this.isIntermediateSum;
      };

      return f;
    }(f.prototype.pointClass);
  });
  A(f, "Series/Waterfall/WaterfallSeries.js", [f["Core/Axis/Axis.js"], f["Core/Chart/Chart.js"], f["Core/Series/SeriesRegistry.js"], f["Core/Utilities.js"], f["Core/Axis/WaterfallAxis.js"], f["Series/Waterfall/WaterfallPoint.js"]], function (f, b, e, a, d, p) {
    var l = this && this.__extends || function () {
      var _a14 = function a(b, c) {
        _a14 = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (a, b) {
          a.__proto__ = b;
        } || function (a, b) {
          for (var c in b) {
            b.hasOwnProperty(c) && (a[c] = b[c]);
          }
        };

        return _a14(b, c);
      };

      return function (b, c) {
        function d() {
          this.constructor = b;
        }

        _a14(b, c);

        b.prototype = null === c ? Object.create(c) : (d.prototype = c.prototype, new d());
      };
    }(),
        k = e.seriesTypes,
        y = k.column,
        B = k.line,
        c = a.arrayMax,
        g = a.arrayMin,
        t = a.correctFloat;

    k = a.extend;
    var h = a.isNumber,
        z = a.merge,
        A = a.objectEach,
        I = a.pick;

    a = function (a) {
      function b() {
        var b = null !== a && a.apply(this, arguments) || this;
        b.chart = void 0;
        b.data = void 0;
        b.options = void 0;
        b.points = void 0;
        b.stackedYNeg = void 0;
        b.stackedYPos = void 0;
        b.stackKey = void 0;
        b.xData = void 0;
        b.yAxis = void 0;
        b.yData = void 0;
        return b;
      }

      l(b, a);

      b.prototype.generatePoints = function () {
        var a;
        y.prototype.generatePoints.apply(this);
        var b = 0;

        for (a = this.points.length; b < a; b++) {
          var c = this.points[b];
          var d = this.processedYData[b];
          if (c.isIntermediateSum || c.isSum) c.y = t(d);
        }
      };

      b.prototype.translate = function () {
        var a = this.options,
            b = this.yAxis,
            c = I(a.minPointLength, 5),
            d = c / 2,
            e = a.threshold || 0,
            f = e,
            g = e;
        a = a.stacking;
        var k = b.waterfall.stacks[this.stackKey];
        y.prototype.translate.apply(this);

        for (var l = this.points, n = 0; n < l.length; n++) {
          var m = l[n];
          var F = this.processedYData[n];
          var u = m.shapeArgs;

          if (u && h(F)) {
            var w = [0, F];
            var x = m.y;

            if (a) {
              if (k) {
                w = k[n];

                if ("overlap" === a) {
                  var p = w.stackState[w.stateIndex--];
                  p = 0 <= x ? p : p - x;
                  Object.hasOwnProperty.call(w, "absolutePos") && delete w.absolutePos;
                  Object.hasOwnProperty.call(w, "absoluteNeg") && delete w.absoluteNeg;
                } else 0 <= x ? (p = w.threshold + w.posTotal, w.posTotal -= x) : (p = w.threshold + w.negTotal, w.negTotal -= x, p -= x), !w.posTotal && Object.hasOwnProperty.call(w, "absolutePos") && (w.posTotal = w.absolutePos, delete w.absolutePos), !w.negTotal && Object.hasOwnProperty.call(w, "absoluteNeg") && (w.negTotal = w.absoluteNeg, delete w.absoluteNeg);

                m.isSum || (w.connectorThreshold = w.threshold + w.stackTotal);
                b.reversed ? (F = 0 <= x ? p - x : p + x, x = p) : (F = p, x = p - x);
                m.below = F <= e;
                u.y = b.translate(F, !1, !0, !1, !0);
                u.height = Math.abs(u.y - b.translate(x, !1, !0, !1, !0));
                if (x = b.waterfall.dummyStackItem) x.x = n, x.label = k[n].label, x.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[n], this.stackedYPos[n]);
              }
            } else p = Math.max(f, f + x) + w[0], u.y = b.translate(p, !1, !0, !1, !0), m.isSum ? (u.y = b.translate(w[1], !1, !0, !1, !0), u.height = Math.min(b.translate(w[0], !1, !0, !1, !0), b.len) - u.y, m.below = w[1] <= e) : m.isIntermediateSum ? (0 <= x ? (F = w[1] + g, x = g) : (F = g, x = w[1] + g), b.reversed && (F ^= x, x ^= F, F ^= x), u.y = b.translate(F, !1, !0, !1, !0), u.height = Math.abs(u.y - Math.min(b.translate(x, !1, !0, !1, !0), b.len)), g += w[1], m.below = F <= e) : (u.height = 0 < F ? b.translate(f, !1, !0, !1, !0) - u.y : b.translate(f, !1, !0, !1, !0) - b.translate(f - F, !1, !0, !1, !0), f += F, m.below = f < e), 0 > u.height && (u.y += u.height, u.height *= -1);

            m.plotY = u.y = Math.round(u.y || 0) - this.borderWidth % 2 / 2;
            u.height = Math.max(Math.round(u.height || 0), .001);
            m.yBottom = u.y + u.height;
            u.height <= c && !m.isNull ? (u.height = c, u.y -= d, m.plotY = u.y, m.minPointLengthOffset = 0 > m.y ? -d : d) : (m.isNull && (u.width = 0), m.minPointLengthOffset = 0);
            x = m.plotY + (m.negative ? u.height : 0);
            m.below && (m.plotY += u.height);
            m.tooltipPos && (this.chart.inverted ? m.tooltipPos[0] = b.len - x : m.tooltipPos[1] = x);
            m.isInside = this.isPointInside(m);
          }
        }
      };

      b.prototype.processData = function (b) {
        var c = this.options,
            d = this.yData,
            e = c.data,
            f = d.length,
            g = c.threshold || 0,
            h,
            k,
            l,
            n,
            m;

        for (m = k = h = l = n = 0; m < f; m++) {
          var F = d[m];
          var u = e && e[m] ? e[m] : {};
          "sum" === F || u.isSum ? d[m] = t(k) : "intermediateSum" === F || u.isIntermediateSum ? (d[m] = t(h), h = 0) : (k += F, h += F);
          l = Math.min(k, l);
          n = Math.max(k, n);
        }

        a.prototype.processData.call(this, b);
        c.stacking || (this.dataMin = l + g, this.dataMax = n);
      };

      b.prototype.toYData = function (a) {
        return a.isSum ? "sum" : a.isIntermediateSum ? "intermediateSum" : a.y;
      };

      b.prototype.updateParallelArrays = function (b, c) {
        a.prototype.updateParallelArrays.call(this, b, c);
        if ("sum" === this.yData[0] || "intermediateSum" === this.yData[0]) this.yData[0] = null;
      };

      b.prototype.pointAttribs = function (a, b) {
        var c = this.options.upColor;
        c && !a.options.color && (a.color = 0 < a.y ? c : null);
        a = y.prototype.pointAttribs.call(this, a, b);
        delete a.dashstyle;
        return a;
      };

      b.prototype.getGraphPath = function () {
        return [["M", 0, 0]];
      };

      b.prototype.getCrispPath = function () {
        var a = this.data,
            b = this.yAxis,
            c = a.length,
            d = Math.round(this.graph.strokeWidth()) % 2 / 2,
            e = Math.round(this.borderWidth) % 2 / 2,
            f = this.xAxis.reversed,
            g = this.yAxis.reversed,
            h = this.options.stacking,
            k = [],
            n;

        for (n = 1; n < c; n++) {
          var m = a[n].shapeArgs;
          var l = a[n - 1];
          var u = a[n - 1].shapeArgs;
          var w = b.waterfall.stacks[this.stackKey];
          var x = 0 < l.y ? -u.height : 0;
          w && u && m && (w = w[n - 1], h ? (w = w.connectorThreshold, x = Math.round(b.translate(w, 0, 1, 0, 1) + (g ? x : 0)) - d) : x = u.y + l.minPointLengthOffset + e - d, k.push(["M", (u.x || 0) + (f ? 0 : u.width || 0), x], ["L", (m.x || 0) + (f ? m.width || 0 : 0), x]));
          u && k.length && (!h && 0 > l.y && !g || 0 < l.y && g) && ((l = k[k.length - 2]) && "number" === typeof l[2] && (l[2] += u.height || 0), (l = k[k.length - 1]) && "number" === typeof l[2] && (l[2] += u.height || 0));
        }

        return k;
      };

      b.prototype.drawGraph = function () {
        B.prototype.drawGraph.call(this);
        this.graph.attr({
          d: this.getCrispPath()
        });
      };

      b.prototype.setStackedPoints = function () {
        function a(a, b, c, d) {
          if (A) for (c; c < A; c++) {
            t.stackState[c] += d;
          } else t.stackState[0] = a, A = t.stackState.length;
          t.stackState.push(t.stackState[A - 1] + b);
        }

        var b = this.options,
            c = this.yAxis.waterfall.stacks,
            d = b.threshold,
            e = d || 0,
            f = e,
            g = this.stackKey,
            h = this.xData,
            k = h.length,
            n,
            m,
            l;
        this.yAxis.stacking.usePercentage = !1;
        var u = m = l = e;

        if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
          var w = c.changed;
          (n = c.alreadyChanged) && 0 > n.indexOf(g) && (w = !0);
          c[g] || (c[g] = {});
          n = c[g];

          for (var x = 0; x < k; x++) {
            var p = h[x];
            if (!n[p] || w) n[p] = {
              negTotal: 0,
              posTotal: 0,
              stackTotal: 0,
              threshold: 0,
              stateIndex: 0,
              stackState: [],
              label: w && n[p] ? n[p].label : void 0
            };
            var t = n[p];
            var z = this.yData[x];
            0 <= z ? t.posTotal += z : t.negTotal += z;
            var y = b.data[x];
            p = t.absolutePos = t.posTotal;
            var B = t.absoluteNeg = t.negTotal;
            t.stackTotal = p + B;
            var A = t.stackState.length;
            y && y.isIntermediateSum ? (a(l, m, 0, l), l = m, m = d, e ^= f, f ^= e, e ^= f) : y && y.isSum ? (a(d, u, A), e = d) : (a(e, z, 0, u), y && (u += z, m += z));
            t.stateIndex++;
            t.threshold = e;
            e += t.stackTotal;
          }

          c.changed = !1;
          c.alreadyChanged || (c.alreadyChanged = []);
          c.alreadyChanged.push(g);
        }
      };

      b.prototype.getExtremes = function () {
        var a = this.options.stacking;

        if (a) {
          var b = this.yAxis;
          b = b.waterfall.stacks;
          var d = this.stackedYNeg = [];
          var e = this.stackedYPos = [];
          "overlap" === a ? A(b[this.stackKey], function (a) {
            d.push(g(a.stackState));
            e.push(c(a.stackState));
          }) : A(b[this.stackKey], function (a) {
            d.push(a.negTotal + a.threshold);
            e.push(a.posTotal + a.threshold);
          });
          return {
            dataMin: g(d),
            dataMax: c(e)
          };
        }

        return {
          dataMin: this.dataMin,
          dataMax: this.dataMax
        };
      };

      b.defaultOptions = z(y.defaultOptions, {
        dataLabels: {
          inside: !0
        },
        lineWidth: 1,
        lineColor: "#333333",
        dashStyle: "Dot",
        borderColor: "#333333",
        states: {
          hover: {
            lineWidthPlus: 0
          }
        }
      });
      return b;
    }(y);

    k(a.prototype, {
      getZonesGraphs: B.prototype.getZonesGraphs,
      pointValKey: "y",
      showLine: !0,
      pointClass: p
    });
    e.registerSeriesType("waterfall", a);
    d.compose(f, b);
    "";
    return a;
  });
  A(f, "Core/Axis/RadialAxis.js", [f["Core/Axis/AxisDefaults.js"], f["Core/DefaultOptions.js"], f["Core/Globals.js"], f["Core/Utilities.js"]], function (f, b, e, a) {
    var d = b.defaultOptions,
        p = e.noop,
        l = a.addEvent,
        k = a.correctFloat,
        y = a.defined,
        B = a.extend,
        c = a.fireEvent,
        g = a.merge,
        t = a.pick,
        h = a.relativeLength,
        z = a.wrap,
        A;

    (function (a) {
      function b() {
        this.autoConnect = this.isCircular && "undefined" === typeof t(this.userMax, this.options.max) && k(this.endAngleRad - this.startAngleRad) === k(2 * Math.PI);
        !this.isCircular && this.chart.inverted && this.max++;
        this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0);
      }

      function e() {
        var a = this;
        return function () {
          if (a.isRadial && a.tickPositions && a.options.labels && !0 !== a.options.labels.allowOverlap) return a.tickPositions.map(function (b) {
            return a.ticks[b] && a.ticks[b].label;
          }).filter(function (a) {
            return !!a;
          });
        };
      }

      function A() {
        return p;
      }

      function D(a, b, c) {
        var d = this.pane.center,
            e = a.value;

        if (this.isCircular) {
          if (y(e)) a.point && (f = a.point.shapeArgs || {}, f.start && (e = this.chart.inverted ? this.translate(a.point.rectPlotY, !0) : a.point.x));else {
            var f = a.chartX || 0;
            var g = a.chartY || 0;
            e = this.translate(Math.atan2(g - c, f - b) - this.startAngleRad, !0);
          }
          a = this.getPosition(e);
          f = a.x;
          g = a.y;
        } else y(e) || (f = a.chartX, g = a.chartY), y(f) && y(g) && (c = d[1] + this.chart.plotTop, e = this.translate(Math.min(Math.sqrt(Math.pow(f - b, 2) + Math.pow(g - c, 2)), d[2] / 2) - d[3] / 2, !0));

        return [e, f || 0, g || 0];
      }

      function r(a, b, c) {
        a = this.pane.center;
        var d = this.chart,
            e = this.left || 0,
            f = this.top || 0,
            g = t(b, a[2] / 2 - this.offset);
        "undefined" === typeof c && (c = this.horiz ? 0 : this.center && -this.center[3] / 2);
        c && (g += c);
        this.isCircular || "undefined" !== typeof b ? (b = this.chart.renderer.symbols.arc(e + a[0], f + a[1], g, g, {
          start: this.startAngleRad,
          end: this.endAngleRad,
          open: !0,
          innerR: 0
        }), b.xBounds = [e + a[0]], b.yBounds = [f + a[1] - g]) : (b = this.postTranslate(this.angleRad, g), b = [["M", this.center[0] + d.plotLeft, this.center[1] + d.plotTop], ["L", b.x, b.y]]);
        return b;
      }

      function q() {
        this.constructor.prototype.getOffset.call(this);
        this.chart.axisOffset[this.side] = 0;
      }

      function v(a, b, c) {
        var d = this.chart,
            e = function e(a) {
          if ("string" === typeof a) {
            var b = parseInt(a, 10);
            w.test(a) && (b = b * m / 100);
            return b;
          }

          return a;
        },
            f = this.center,
            g = this.startAngleRad,
            m = f[2] / 2,
            h = Math.min(this.offset, 0),
            n = this.left || 0,
            k = this.top || 0,
            w = /%$/,
            u = this.isCircular,
            l = t(e(c.outerRadius), m),
            x = e(c.innerRadius);

        e = t(e(c.thickness), 10);
        if ("polygon" === this.options.gridLineInterpolation) h = this.getPlotLinePath({
          value: a
        }).concat(this.getPlotLinePath({
          value: b,
          reverse: !0
        }));else {
          a = Math.max(a, this.min);
          b = Math.min(b, this.max);
          a = this.translate(a);
          b = this.translate(b);
          u || (l = a || 0, x = b || 0);
          if ("circle" !== c.shape && u) c = g + (a || 0), g += b || 0;else {
            c = -Math.PI / 2;
            g = 1.5 * Math.PI;
            var p = !0;
          }
          l -= h;
          h = d.renderer.symbols.arc(n + f[0], k + f[1], l, l, {
            start: Math.min(c, g),
            end: Math.max(c, g),
            innerR: t(x, l - (e - h)),
            open: p
          });
          u && (u = (g + c) / 2, n = n + f[0] + f[2] / 2 * Math.cos(u), h.xBounds = u > -Math.PI / 2 && u < Math.PI / 2 ? [n, d.plotWidth] : [0, n], h.yBounds = [k + f[1] + f[2] / 2 * Math.sin(u)], h.yBounds[0] += u > -Math.PI && 0 > u || u > Math.PI ? -10 : 10);
        }
        return h;
      }

      function I(a) {
        var b = this,
            c = this.pane.center,
            d = this.chart,
            e = d.inverted,
            f = a.reverse,
            g = this.pane.options.background ? this.pane.options.background[0] || this.pane.options.background : {},
            m = g.innerRadius || "0%",
            n = g.outerRadius || "100%",
            k = c[0] + d.plotLeft,
            w = c[1] + d.plotTop,
            u = this.height,
            l = a.isCrosshair;
        g = c[3] / 2;
        var x = a.value,
            p;
        var r = this.getPosition(x);
        var q = r.x;
        r = r.y;
        l && (r = this.getCrosshairPosition(a, k, w), x = r[0], q = r[1], r = r[2]);
        if (this.isCircular) x = Math.sqrt(Math.pow(q - k, 2) + Math.pow(r - w, 2)), f = "string" === typeof m ? h(m, 1) : m / x, d = "string" === typeof n ? h(n, 1) : n / x, c && g && (g /= x, f < g && (f = g), d < g && (d = g)), c = [["M", k + f * (q - k), w - f * (w - r)], ["L", q - (1 - d) * (q - k), r + (1 - d) * (w - r)]];else if ((x = this.translate(x)) && (0 > x || x > u) && (x = 0), "circle" === this.options.gridLineInterpolation) c = this.getLinePath(0, x, g);else if (c = [], d[e ? "yAxis" : "xAxis"].forEach(function (a) {
          a.pane === b.pane && (p = a);
        }), p) for (k = p.tickPositions, p.autoConnect && (k = k.concat([k[0]])), f && (k = k.slice().reverse()), x && (x += g), w = 0; w < k.length; w++) {
          g = p.getPosition(k[w], x), c.push(w ? ["L", g.x, g.y] : ["M", g.x, g.y]);
        }
        return c;
      }

      function H(a, b) {
        a = this.translate(a);
        return this.postTranslate(this.isCircular ? a : this.angleRad, t(this.isCircular ? b : 0 > a ? 0 : a, this.center[2] / 2) - this.offset);
      }

      function G() {
        var a = this.center,
            b = this.chart,
            c = this.options.title;
        return {
          x: b.plotLeft + a[0] + (c.x || 0),
          y: b.plotTop + a[1] - {
            high: .5,
            middle: .25,
            low: 0
          }[c.align] * a[2] + (c.y || 0)
        };
      }

      function J(a) {
        a.beforeSetTickPositions = b;
        a.createLabelCollector = e;
        a.getCrosshairPosition = D;
        a.getLinePath = r;
        a.getOffset = q;
        a.getPlotBandPath = v;
        a.getPlotLinePath = I;
        a.getPosition = H;
        a.getTitlePosition = G;
        a.postTranslate = P;
        a.setAxisSize = V;
        a.setAxisTranslation = W;
        a.setOptions = U;
      }

      function n() {
        var a = this.chart,
            b = this.options,
            c = this.pane,
            d = c && c.options;
        a.angular && this.isXAxis || !c || !a.angular && !a.polar || (this.angleRad = (b.angle || 0) * Math.PI / 180, this.startAngleRad = (d.startAngle - 90) * Math.PI / 180, this.endAngleRad = (t(d.endAngle, d.startAngle + 360) - 90) * Math.PI / 180, this.offset = b.offset || 0);
      }

      function m(a) {
        this.isRadial && (a.align = void 0, a.preventDefault());
      }

      function F() {
        if (this.chart && this.chart.labelCollectors) {
          var a = this.labelCollector ? this.chart.labelCollectors.indexOf(this.labelCollector) : -1;
          0 <= a && this.chart.labelCollectors.splice(a, 1);
        }
      }

      function u(a) {
        var b = this.chart,
            c = b.inverted,
            d = b.angular,
            e = b.polar,
            m = this.isXAxis,
            h = this.coll,
            n = d && m,
            k = b.options;
        a = a.userOptions.pane || 0;
        a = this.pane = b.pane && b.pane[a];
        var w;
        if ("colorAxis" === h) this.isRadial = !1;else {
          if (d) {
            if (n ? (this.isHidden = !0, this.createLabelCollector = A, this.getOffset = p, this.render = this.redraw = Q, this.setTitle = this.setCategories = this.setScale = p) : J(this), w = !m) this.defaultPolarOptions = T;
          } else e && (J(this), this.defaultPolarOptions = (w = this.horiz) ? S : g("xAxis" === h ? f.defaultXAxisOptions : f.defaultYAxisOptions, X), c && "yAxis" === h && (this.defaultPolarOptions.stackLabels = f.defaultYAxisOptions.stackLabels, this.defaultPolarOptions.reversedStacks = !0));

          d || e ? (this.isRadial = !0, k.chart.zoomType = null, this.labelCollector || (this.labelCollector = this.createLabelCollector()), this.labelCollector && b.labelCollectors.push(this.labelCollector)) : this.isRadial = !1;
          a && w && (a.axis = this);
          this.isCircular = w;
        }
      }

      function w() {
        this.isRadial && this.beforeSetTickPositions();
      }

      function x(a) {
        var b = this.label;

        if (b) {
          var c = this.axis,
              d = b.getBBox(),
              e = c.options.labels,
              f = (c.translate(this.pos) + c.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360,
              g = Math.round(f),
              m = y(e.y) ? 0 : .3 * -d.height,
              n = e.y,
              k = 20,
              w = e.align,
              u = "end",
              x = 0 > g ? g + 360 : g,
              l = x,
              p = 0,
              r = 0;

          if (c.isRadial) {
            var q = c.getPosition(this.pos, c.center[2] / 2 + h(t(e.distance, -25), c.center[2] / 2, -c.center[2] / 2));
            "auto" === e.rotation ? b.attr({
              rotation: f
            }) : y(n) || (n = c.chart.renderer.fontMetrics(b.styles && b.styles.fontSize).b - d.height / 2);
            y(w) || (c.isCircular ? (d.width > c.len * c.tickInterval / (c.max - c.min) && (k = 0), w = f > k && f < 180 - k ? "left" : f > 180 + k && f < 360 - k ? "right" : "center") : w = "center", b.attr({
              align: w
            }));

            if ("auto" === w && 2 === c.tickPositions.length && c.isCircular) {
              90 < x && 180 > x ? x = 180 - x : 270 < x && 360 >= x && (x = 540 - x);
              180 < l && 360 >= l && (l = 360 - l);
              if (c.pane.options.startAngle === g || c.pane.options.startAngle === g + 360 || c.pane.options.startAngle === g - 360) u = "start";
              w = -90 <= g && 90 >= g || -360 <= g && -270 >= g || 270 <= g && 360 >= g ? "start" === u ? "right" : "left" : "start" === u ? "left" : "right";
              70 < l && 110 > l && (w = "center");
              15 > x || 180 <= x && 195 > x ? p = .3 * d.height : 15 <= x && 35 >= x ? p = "start" === u ? 0 : .75 * d.height : 195 <= x && 215 >= x ? p = "start" === u ? .75 * d.height : 0 : 35 < x && 90 >= x ? p = "start" === u ? .25 * -d.height : d.height : 215 < x && 270 >= x && (p = "start" === u ? d.height : .25 * -d.height);
              15 > l ? r = "start" === u ? .15 * -d.height : .15 * d.height : 165 < l && 180 >= l && (r = "start" === u ? .15 * d.height : .15 * -d.height);
              b.attr({
                align: w
              });
              b.translate(r, p + m);
            }

            a.pos.x = q.x + (e.x || 0);
            a.pos.y = q.y + (n || 0);
          }
        }
      }

      function O(a) {
        this.axis.getPosition && B(a.pos, this.axis.getPosition(this.pos));
      }

      function P(a, b) {
        var c = this.chart,
            d = this.center;
        a = this.startAngleRad + a;
        return {
          x: c.plotLeft + d[0] + Math.cos(a) * b,
          y: c.plotTop + d[1] + Math.sin(a) * b
        };
      }

      function Q() {
        this.isDirty = !1;
      }

      function V() {
        this.constructor.prototype.setAxisSize.call(this);

        if (this.isRadial) {
          this.pane.updateCenter(this);
          var a = this.center = this.pane.center.slice();
          if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad;else {
            var b = this.postTranslate(this.angleRad, a[3] / 2);
            a[0] = b.x - this.chart.plotLeft;
            a[1] = b.y - this.chart.plotTop;
          }
          this.len = this.width = this.height = (a[2] - a[3]) * t(this.sector, 1) / 2;
        }
      }

      function W() {
        this.constructor.prototype.setAxisTranslation.call(this);
        this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : (this.center[2] - this.center[3]) / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0);
      }

      function U(a) {
        a = this.options = g(this.constructor.defaultOptions, this.defaultPolarOptions, d[this.coll], a);
        a.plotBands || (a.plotBands = []);
        c(this, "afterSetOptions");
      }

      function R(a, b, c, d, e, f, g) {
        var m = this.axis;
        m.isRadial ? (a = m.getPosition(this.pos, m.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, e, f, g);
        return b;
      }

      var M = [],
          S = {
        gridLineWidth: 1,
        labels: {
          align: void 0,
          distance: 15,
          x: 0,
          y: void 0,
          style: {
            textOverflow: "none"
          }
        },
        maxPadding: 0,
        minPadding: 0,
        showLastLabel: !1,
        tickLength: 0
      },
          T = {
        labels: {
          align: "center",
          x: 0,
          y: void 0
        },
        minorGridLineWidth: 0,
        minorTickInterval: "auto",
        minorTickLength: 10,
        minorTickPosition: "inside",
        minorTickWidth: 1,
        tickLength: 10,
        tickPosition: "inside",
        tickWidth: 2,
        title: {
          rotation: 0
        },
        zIndex: 2
      },
          X = {
        gridLineInterpolation: "circle",
        gridLineWidth: 1,
        labels: {
          align: "right",
          x: -3,
          y: -2
        },
        showLastLabel: !1,
        title: {
          x: 4,
          text: null,
          rotation: 90
        }
      };

      a.compose = function (a, b) {
        -1 === M.indexOf(a) && (M.push(a), l(a, "afterInit", n), l(a, "autoLabelAlign", m), l(a, "destroy", F), l(a, "init", u), l(a, "initialAxisTranslation", w));
        -1 === M.indexOf(b) && (M.push(b), l(b, "afterGetLabelPosition", x), l(b, "afterGetPosition", O), z(b.prototype, "getMarkPath", R));
        return a;
      };
    })(A || (A = {}));

    return A;
  });
  A(f, "Series/PolarComposition.js", [f["Core/Animation/AnimationUtilities.js"], f["Core/Globals.js"], f["Extensions/Pane.js"], f["Core/Axis/RadialAxis.js"], f["Core/Utilities.js"]], function (f, b, e, a, d) {
    function p(a, b, c, d) {
      var e = d ? 1 : 0;
      var f = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0;
      b = 0 > f - 1 ? a.length - (1 + e) : f - 1;
      var g = a[b];
      e = a[f + 1 > a.length - 1 ? e : f + 1];
      var m = g.plotY;
      var h = e.plotX;
      var k = e.plotY;
      e = a[f].plotX;
      f = a[f].plotY;
      g = (1.5 * e + g.plotX) / 2.5;
      m = (1.5 * f + m) / 2.5;
      h = (1.5 * e + h) / 2.5;
      var n = (1.5 * f + k) / 2.5;
      k = Math.sqrt(Math.pow(g - e, 2) + Math.pow(m - f, 2));
      var u = Math.sqrt(Math.pow(h - e, 2) + Math.pow(n - f, 2));
      g = Math.atan2(m - f, g - e);
      n = Math.PI / 2 + (g + Math.atan2(n - f, h - e)) / 2;
      Math.abs(g - n) > Math.PI / 2 && (n -= Math.PI);
      g = e + Math.cos(n) * k;
      m = f + Math.sin(n) * k;
      h = e + Math.cos(Math.PI + n) * u;
      n = f + Math.sin(Math.PI + n) * u;
      e = {
        rightContX: h,
        rightContY: n,
        leftContX: g,
        leftContY: m,
        plotX: e,
        plotY: f
      };
      c && (e.prevPointCont = p(a, b, !1, d));
      return e;
    }

    function l() {
      (this.pane || []).forEach(function (a) {
        a.render();
      });
    }

    function k() {
      var a = this;
      this.pane || (this.pane = []);
      this.options.pane = v(this.options.pane);
      this.options.pane.forEach(function (b) {
        new e(b, a);
      }, this);
    }

    function y() {
      var a = this.chart;
      a.polar && (this.polar = new N(this), a.inverted && (this.isRadialSeries = !0, this.is("column") && (this.isRadialBar = !0)));
    }

    function B() {
      if (this.chart.polar && this.xAxis) {
        var a = this.chart;
        (this.kdByAngle = a.tooltip && a.tooltip.shared) ? this.searchPoint = this.polar.searchPointByAngle : this.options.findNearestPointBy = "xy";
        if (!this.preventPostTranslate) for (var c = this.points, d = c.length, e = void 0; d--;) {
          e = c[d], this.polar.toXY(e), !a.hasParallelCoordinates && !this.yAxis.reversed && e.y < this.yAxis.min && (e.isNull = !0);
        }
        this.hasClipCircleSetter || (this.hasClipCircleSetter = !!this.eventsToUnbind.push(E(this, "afterRender", function () {
          if (a.polar) {
            var c = this.yAxis.pane.center;
            if (this.clipCircle) this.clipCircle.animate({
              x: c[0],
              y: c[1],
              r: c[2] / 2,
              innerR: c[3] / 2
            });else {
              var d = a.renderer,
                  e = c[0],
                  f = c[1],
                  g = c[2] / 2,
                  m = c[3] / 2;
              c = L();
              var h = d.createElement("clipPath").attr({
                id: c
              }).add(d.defs);
              d = m ? d.arc(e, f, g, m, 0, 2 * Math.PI).add(h) : d.circle(e, f, g).add(h);
              d.id = c;
              d.clipPath = h;
              this.clipCircle = d;
            }
            this.group.clip(this.clipCircle);
            this.setClip = b.noop;
          }
        })));
      }
    }

    function c(a, b) {
      return D(this.pane || [], function (a) {
        return a.options.id === b;
      }) || a.call(this, b);
    }

    function g(a, b, c, d, e, f) {
      var g = this.chart,
          h = q(d.inside, !!this.options.stacking);
      g.polar ? (a = b.rectPlotX / Math.PI * 180, g.inverted ? (this.forceDL = g.isInsidePlot(b.plotX, Math.round(b.plotY)), h && b.shapeArgs ? (e = b.shapeArgs, e = this.yAxis.postTranslate(((e.start || 0) + (e.end || 0)) / 2 - this.xAxis.startAngleRad, b.barX + b.pointWidth / 2), e = {
        x: e.x - g.plotLeft,
        y: e.y - g.plotTop
      }) : b.tooltipPos && (e = {
        x: b.tooltipPos[0],
        y: b.tooltipPos[1]
      }), d.align = q(d.align, "center"), d.verticalAlign = q(d.verticalAlign, "middle")) : (null === d.align && (d.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === d.verticalAlign && (d.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle")), Object.getPrototypeOf(Object.getPrototypeOf(this)).alignDataLabel.call(this, b, c, d, e, f), this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end ? c.hide() : c.show()) : a.call(this, b, c, d, e, f);
    }

    function t(a) {
      var b = this.options,
          c = b.stacking,
          e = this.chart,
          f = this.xAxis,
          g = this.yAxis,
          h = g.reversed,
          k = g.center,
          n = f.startAngleRad,
          l = f.endAngleRad - n,
          p = 0,
          q = 0,
          t = 0;
      this.preventPostTranslate = !0;
      a.call(this);

      if (f.isRadial) {
        a = this.points;
        f = a.length;
        var v = g.translate(g.min);
        var z = g.translate(g.max);
        b = b.threshold || 0;
        e.inverted && r(b) && (p = g.translate(b), C(p) && (0 > p ? p = 0 : p > l && (p = l), this.translatedThreshold = p + n));

        for (; f--;) {
          b = a[f];
          var y = b.barX;
          var B = b.x;
          var A = b.y;
          b.shapeType = "arc";

          if (e.inverted) {
            b.plotY = g.translate(A);
            c && g.stacking ? (A = g.stacking.stacks[(0 > A ? "-" : "") + this.stackKey], this.visible && A && A[B] && !b.isNull && (t = A[B].points[this.getStackIndicator(void 0, B, this.index).key], q = g.translate(t[0]), t = g.translate(t[1]), C(q) && (q = d.clamp(q, 0, l)))) : (q = p, t = b.plotY);
            q > t && (t = [q, q = t][0]);
            if (!h) {
              if (q < v) q = v;else if (t > z) t = z;else {
                if (t < v || q > z) q = t = 0;
              }
            } else if (t > v) t = v;else if (q < z) q = z;else if (q > v || t < z) q = t = l;
            g.min > g.max && (q = t = h ? l : 0);
            q += n;
            t += n;
            k && (b.barX = y += k[3] / 2);
            B = Math.max(y, 0);
            A = Math.max(y + b.pointWidth, 0);
            b.shapeArgs = {
              x: k && k[0],
              y: k && k[1],
              r: A,
              innerR: B,
              start: q,
              end: t
            };
            b.opacity = q === t ? 0 : void 0;
            b.plotY = (C(this.translatedThreshold) && (q < this.translatedThreshold ? q : t)) - n;
          } else q = y + n, b.shapeArgs = this.polar.arc(b.yBottom, b.plotY, q, q + b.pointWidth);

          this.polar.toXY(b);
          e.inverted ? (y = g.postTranslate(b.rectPlotY, y + b.pointWidth / 2), b.tooltipPos = [y.x - e.plotLeft, y.y - e.plotTop]) : b.tooltipPos = [b.plotX, b.plotY];
          k && (b.ttBelow = b.plotY > k[1]);
        }
      }
    }

    function h(a, b) {
      var c = this;

      if (this.chart.polar) {
        b = b || this.points;

        for (var d = 0; d < b.length; d++) {
          if (!b[d].isNull) {
            var e = d;
            break;
          }
        }

        if (!1 !== this.options.connectEnds && "undefined" !== typeof e) {
          this.connectEnds = !0;
          b.splice(b.length, 0, b[e]);
          var f = !0;
        }

        b.forEach(function (a) {
          "undefined" === typeof a.polarPlotY && c.polar.toXY(a);
        });
      }

      e = a.apply(this, [].slice.call(arguments, 1));
      f && b.pop();
      return e;
    }

    function z(a, b) {
      var c = this.chart,
          d = {
        xAxis: [],
        yAxis: []
      };
      c.polar ? c.axes.forEach(function (a) {
        if ("colorAxis" !== a.coll) {
          var e = a.isXAxis,
              f = a.center,
              g = b.chartX - f[0] - c.plotLeft;
          f = b.chartY - f[1] - c.plotTop;
          d[e ? "xAxis" : "yAxis"].push({
            axis: a,
            value: a.translate(e ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0)
          });
        }
      }) : d = a.call(this, b);
      return d;
    }

    function A(a, c) {
      var d = this,
          e = this.chart,
          f = this.group,
          g = this.markerGroup,
          h = this.xAxis && this.xAxis.center,
          k = e.plotLeft,
          m = e.plotTop,
          l = this.options.animation,
          n,
          p,
          t,
          r;
      if (e.polar) {
        if (d.isRadialBar) c || (d.startAngleRad = q(d.translatedThreshold, d.xAxis.startAngleRad), b.seriesTypes.pie.prototype.animate.call(d, c));else {
          if (e.renderer.isSVG) if (l = K(l), d.is("column")) {
            if (!c) {
              var v = h[3] / 2;
              d.points.forEach(function (a) {
                n = a.graphic;
                t = (p = a.shapeArgs) && p.r;
                r = p && p.innerR;
                n && p && (n.attr({
                  r: v,
                  innerR: v
                }), n.animate({
                  r: t,
                  innerR: r
                }, d.options.animation));
              });
            }
          } else c ? (a = {
            translateX: h[0] + k,
            translateY: h[1] + m,
            scaleX: .001,
            scaleY: .001
          }, f.attr(a), g && g.attr(a)) : (a = {
            translateX: k,
            translateY: m,
            scaleX: 1,
            scaleY: 1
          }, f.animate(a, l), g && g.animate(a, l));
        }
      } else a.call(this, c);
    }

    function I(a, b, c, d) {
      this.chart.polar ? d ? (a = p(b, d, !0, this.connectEnds), b = a.prevPointCont && a.prevPointCont.rightContX, c = a.prevPointCont && a.prevPointCont.rightContY, a = ["C", r(b) ? b : a.plotX, r(c) ? c : a.plotY, r(a.leftContX) ? a.leftContX : a.plotX, r(a.leftContY) ? a.leftContY : a.plotY, a.plotX, a.plotY]) : a = ["M", c.plotX, c.plotY] : a = a.call(this, b, c, d);
      return a;
    }

    var K = f.animObject,
        E = d.addEvent,
        C = d.defined,
        D = d.find,
        r = d.isNumber,
        q = d.pick,
        v = d.splat,
        L = d.uniqueKey,
        H = d.wrap,
        G = [],
        N = function () {
      function b(a) {
        this.series = a;
      }

      b.compose = function (b, d, e, f, p, n, q, r, v) {
        a.compose(b, p);
        -1 === G.indexOf(d) && (G.push(d), E(d, "afterDrawChartBox", l), E(d, "getAxes", k), H(d.prototype, "get", c));
        -1 === G.indexOf(e) && (G.push(e), H(e.prototype, "getCoordinates", z));
        -1 === G.indexOf(f) && (G.push(f), E(f, "afterInit", y), E(f, "afterTranslate", B, {
          order: 2
        }), H(f.prototype, "animate", A));
        q && -1 === G.indexOf(q) && (G.push(q), b = q.prototype, H(b, "alignDataLabel", g), H(b, "animate", A), H(b, "translate", t));
        r && -1 === G.indexOf(r) && (G.push(r), H(r.prototype, "getGraphPath", h));
        v && -1 === G.indexOf(v) && (G.push(v), r = v.prototype, H(r, "getPointSpline", I), n && -1 === G.indexOf(n) && (G.push(n), n.prototype.getPointSpline = r.getPointSpline));
      };

      b.prototype.arc = function (a, b, c, d) {
        var e = this.series,
            f = e.xAxis.center,
            g = e.yAxis.len,
            h = f[3] / 2;
        b = g - b + h;
        a = g - q(a, g) + h;
        e.yAxis.reversed && (0 > b && (b = h), 0 > a && (a = h));
        return {
          x: f[0],
          y: f[1],
          r: b,
          innerR: a,
          start: c,
          end: d
        };
      };

      b.prototype.searchPointByAngle = function (a) {
        var b = this.series,
            c = b.chart,
            d = b.xAxis.pane.center;
        return b.searchKDTree({
          clientX: 180 + -180 / Math.PI * Math.atan2(a.chartX - d[0] - c.plotLeft, a.chartY - d[1] - c.plotTop)
        });
      };

      b.prototype.toXY = function (a) {
        var b = this.series,
            c = b.chart,
            d = b.xAxis,
            e = b.yAxis,
            f = a.plotX,
            g = c.inverted,
            h = a.y,
            k = a.plotY,
            l = g ? f : e.len - k;
        g && b && !b.isRadialBar && (a.plotY = k = r(h) ? e.translate(h) : 0);
        a.rectPlotX = f;
        a.rectPlotY = k;
        e.center && (l += e.center[3] / 2);
        r(k) && (e = g ? e.postTranslate(k, l) : d.postTranslate(f, l), a.plotX = a.polarPlotX = e.x - c.plotLeft, a.plotY = a.polarPlotY = e.y - c.plotTop);
        b.kdByAngle ? (b = (f / Math.PI * 180 + d.pane.options.startAngle) % 360, 0 > b && (b += 360), a.clientX = b) : a.clientX = a.plotX;
      };

      return b;
    }();

    return N;
  });
  A(f, "masters/highcharts-more.src.js", [f["Core/Globals.js"], f["Core/Series/SeriesRegistry.js"], f["Series/Bubble/BubbleSeries.js"], f["Series/PolarComposition.js"]], function (f, b, e, a) {
    e.compose(f.Chart, f.Legend, f.Series);
    a.compose(f.Axis, f.Chart, f.Pointer, f.Series, f.Tick, b.seriesTypes.areasplinerange, b.seriesTypes.column, b.seriesTypes.line, b.seriesTypes.spline);
  });
});