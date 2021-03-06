// Generated by purs version 0.14.9
"use strict";
var Control_Applicative = require("../Control.Applicative/index.js");
var Control_Bind = require("../Control.Bind/index.js");
var Data_Array = require("../Data.Array/index.js");
var Data_Boolean = require("../Data.Boolean/index.js");
var Data_Eq = require("../Data.Eq/index.js");
var Data_EuclideanRing = require("../Data.EuclideanRing/index.js");
var Data_Foldable = require("../Data.Foldable/index.js");
var Data_Function = require("../Data.Function/index.js");
var Data_Functor = require("../Data.Functor/index.js");
var Data_HeytingAlgebra = require("../Data.HeytingAlgebra/index.js");
var Data_Maybe = require("../Data.Maybe/index.js");
var Data_Monoid = require("../Data.Monoid/index.js");
var Data_Ord = require("../Data.Ord/index.js");
var Data_Show = require("../Data.Show/index.js");
var Data_String_CodePoints = require("../Data.String.CodePoints/index.js");
var Data_String_CodeUnits = require("../Data.String.CodeUnits/index.js");
var Data_Traversable = require("../Data.Traversable/index.js");
var Data_Tuple = require("../Data.Tuple/index.js");
var Data_Unfoldable = require("../Data.Unfoldable/index.js");
var Matrix = function (x) {
    return x;
};
var width = function (v) {
    return v.size.x;
};
var values = function (v) {
    return v.values;
};
var toIndexedArray = function (m) {
    var w = width(m);
    var f = function (ix) {
        return function (a) {
            return {
                x: Data_EuclideanRing.mod(Data_EuclideanRing.euclideanRingInt)(ix)(w),
                y: Data_EuclideanRing.div(Data_EuclideanRing.euclideanRingInt)(ix)(w),
                value: a
            };
        };
    };
    return Data_Array.mapWithIndex(f)(values(m));
};
var size = function (v) {
    return v.size;
};
var repeat = function (x) {
    return function (y) {
        return function (v) {
            return {
                size: {
                    x: x,
                    y: y
                },
                values: Data_Array.replicate(x * y | 0)(v)
            };
        };
    };
};
var overValues = function (dictFunctor) {
    return function (f) {
        return function (v) {
            return Data_Functor.map(dictFunctor)(Data_Functor.map(Data_Functor.functorFn)(Matrix)(function (v1) {
                return {
                    size: v.size,
                    values: v1
                };
            }))(f(v.values));
        };
    };
};
var mapMatrix = function (f) {
    return function (v) {
        return {
            size: v.size,
            values: Data_Functor.map(Data_Functor.functorArray)(f)(v.values)
        };
    };
};
var leftPad = function (x) {
    return function (s) {
        return Data_String_CodeUnits.fromCharArray(Data_Array.replicate(x - Data_String_CodePoints.length(s) | 0)(" ")) + s;
    };
};
var isEmpty = function (v) {
    return Data_Array["null"](v.values);
};
var indexedMap = function (f) {
    return function (m) {
        return {
            size: size(m),
            values: Data_Functor.map(Data_Functor.functorArray)(function (v) {
                return f(v.x)(v.y)(v.value);
            })(toIndexedArray(m))
        };
    };
};
var height = function (v) {
    return v.size.y;
};
var modify = function (x) {
    return function (y) {
        return function ($$new) {
            return function (m) {
                if (x >= 0 && (y >= 0 && (x < width(m) && y < height(m)))) {
                    return overValues(Data_Maybe.functorMaybe)(Data_Array.modifyAt((y * width(m) | 0) + x | 0)($$new))(m);
                };
                if (Data_Boolean.otherwise) {
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match at Matrix (line 132, column 1 - line 132, column 64): " + [ x.constructor.name, y.constructor.name, $$new.constructor.name, m.constructor.name ]);
            };
        };
    };
};
var set = function (x) {
    return function (y) {
        return function ($$new) {
            return modify(x)(y)(Data_Function["const"]($$new));
        };
    };
};
var zipWith = function (f) {
    return function (a) {
        return function (b) {
            if (width(a) !== width(b) || height(a) !== height(b)) {
                return Data_Maybe.Nothing.value;
            };
            if (Data_Boolean.otherwise) {
                return new Data_Maybe.Just({
                    size: size(a),
                    values: Data_Array.zipWith(f)(values(a))(values(b))
                });
            };
            throw new Error("Failed pattern match at Matrix (line 211, column 1 - line 211, column 72): " + [ f.constructor.name, a.constructor.name, b.constructor.name ]);
        };
    };
};
var getRow = function (y) {
    return function (m) {
        if (y < 0 || y >= height(m)) {
            return Data_Maybe.Nothing.value;
        };
        if (Data_Boolean.otherwise) {
            var w = width(m);
            var start = y * w | 0;
            var end = start + w | 0;
            return new Data_Maybe.Just(Data_Array.slice(start)(end)(values(m)));
        };
        throw new Error("Failed pattern match at Matrix (line 140, column 1 - line 140, column 47): " + [ y.constructor.name, m.constructor.name ]);
    };
};
var rows = function (m) {
    return Data_Unfoldable.unfoldr(Data_Unfoldable.unfoldableArray)(function (rowIndex) {
        return Control_Bind.bind(Data_Maybe.bindMaybe)(getRow(rowIndex)(m))(function (row) {
            return Control_Applicative.pure(Data_Maybe.applicativeMaybe)(new Data_Tuple.Tuple(row, rowIndex + 1 | 0));
        });
    })(0);
};
var getColumn = function (x) {
    return function (m) {
        if (x < 0 || x >= width(m)) {
            return Data_Maybe.Nothing.value;
        };
        if (Data_Boolean.otherwise) {
            var w = width(m);
            var maxIndex = Data_Array.length(values(m)) - 1 | 0;
            var indices = Data_Unfoldable.unfoldr(Data_Unfoldable.unfoldableArray)(function (ix) {
                var $43 = ix > maxIndex;
                if ($43) {
                    return Data_Maybe.Nothing.value;
                };
                return new Data_Maybe.Just(new Data_Tuple.Tuple(ix, ix + w | 0));
            })(x);
            return Data_Traversable.traverse(Data_Traversable.traversableArray)(Data_Maybe.applicativeMaybe)(function (v) {
                return Data_Array.index(values(m))(v);
            })(indices);
        };
        throw new Error("Failed pattern match at Matrix (line 152, column 1 - line 152, column 50): " + [ x.constructor.name, m.constructor.name ]);
    };
};
var prettyPrintMatrix = function (showElem) {
    return function (m$prime) {
        if (isEmpty(m$prime)) {
            return "()";
        };
        if (Data_Boolean.otherwise) {
            var appendColumn = function (column) {
                return function (acc) {
                    var maxLength = Data_Maybe.fromMaybe(0)(Data_Foldable.maximum(Data_Ord.ordInt)(Data_Foldable.foldableArray)(Data_Functor.map(Data_Functor.functorArray)(Data_String_CodePoints.length)(column)));
                    var app = function (previous) {
                        return function (next) {
                            return leftPad(maxLength)(next) + (", " + previous);
                        };
                    };
                    return Data_Array.zipWith(app)(acc)(column);
                };
            };
            var m = mapMatrix(showElem)(m$prime);
            var w = width(m);
            var h = height(m);
            var columnsm = Data_Traversable.traverse(Data_Traversable.traversableArray)(Data_Maybe.applicativeMaybe)(Data_Function.flip(getColumn)(m))(Data_Array.range(0)(w - 1 | 0));
            var acc = Data_Array.replicate(h)("");
            if (columnsm instanceof Data_Maybe.Nothing) {
                return "Dimensions error";
            };
            if (columnsm instanceof Data_Maybe.Just) {
                return Data_Foldable.intercalate(Data_Foldable.foldableArray)(Data_Monoid.monoidString)("\x0a")(Data_Array.mapMaybe(Data_String_CodeUnits.stripSuffix(", "))(Data_Foldable.foldr(Data_Foldable.foldableArray)(appendColumn)(acc)(columnsm.value0)));
            };
            throw new Error("Failed pattern match at Matrix (line 231, column 5 - line 236, column 44): " + [ columnsm.constructor.name ]);
        };
        throw new Error("Failed pattern match at Matrix (line 220, column 1 - line 220, column 58): " + [ showElem.constructor.name, m$prime.constructor.name ]);
    };
};
var showMatrix = function (dictShow) {
    return {
        show: prettyPrintMatrix(Data_Show.show(dictShow))
    };
};
var get = function (x) {
    return function (y) {
        return function (m) {
            if (x >= 0 && (y >= 0 && (x < width(m) && y < height(m)))) {
                return Data_Array.index(values(m))((y * width(m) | 0) + x | 0);
            };
            if (Data_Boolean.otherwise) {
                return Data_Maybe.Nothing.value;
            };
            throw new Error("Failed pattern match at Matrix (line 119, column 1 - line 119, column 42): " + [ x.constructor.name, y.constructor.name, m.constructor.name ]);
        };
    };
};
var functorMatrix = {
    map: mapMatrix
};
var fromArray = function (vals) {
    var width$prime = Data_Maybe.fromMaybe(0)(Data_Functor.mapFlipped(Data_Maybe.functorMaybe)(Data_Array.head(vals))(Data_Array.length));
    var height$prime = Data_Array.length(vals);
    var allSame = Data_Foldable.all(Data_Foldable.foldableArray)(Data_HeytingAlgebra.heytingAlgebraBoolean)(function ($53) {
        return (function (v) {
            return width$prime === v;
        })(Data_Array.length($53));
    })(vals);
    var $51 = !allSame;
    if ($51) {
        return Data_Maybe.Nothing.value;
    };
    return new Data_Maybe.Just({
        size: {
            x: width$prime,
            y: height$prime
        },
        values: Data_Array.concat(vals)
    });
};
var foldableMatrix = {
    foldr: function (f) {
        return function (b) {
            return function (m) {
                return Data_Foldable.foldr(Data_Foldable.foldableArray)(f)(b)(values(m));
            };
        };
    },
    foldl: function (f) {
        return function (b) {
            return function (m) {
                return Data_Foldable.foldl(Data_Foldable.foldableArray)(f)(b)(values(m));
            };
        };
    },
    foldMap: function (dictMonoid) {
        return function (f) {
            return function (m) {
                return Data_Foldable.foldMap(Data_Foldable.foldableArray)(dictMonoid)(f)(values(m));
            };
        };
    }
};
var traversableMatrix = {
    traverse: function (dictApplicative) {
        return function (f) {
            return overValues((dictApplicative.Apply0()).Functor0())(Data_Traversable.traverse(Data_Traversable.traversableArray)(dictApplicative)(f));
        };
    },
    sequence: function (dictApplicative) {
        return Data_Traversable.sequenceDefault(traversableMatrix)(dictApplicative);
    },
    Functor0: function () {
        return functorMatrix;
    },
    Foldable1: function () {
        return foldableMatrix;
    }
};
var eqMatrix = function (dictEq) {
    return {
        eq: function (m1) {
            return function (m2) {
                return Data_Eq.eq(Data_Eq.eqArray(dictEq))(values(m1))(values(m2));
            };
        }
    };
};
var empty = {
    size: {
        x: 0,
        y: 0
    },
    values: [  ]
};
var columns = function (m) {
    return Data_Unfoldable.unfoldr(Data_Unfoldable.unfoldableArray)(function (columnIndex) {
        var oneColumn = Data_Unfoldable.unfoldr(Data_Unfoldable.unfoldableArray)(function (rowIndex) {
            return Control_Bind.bind(Data_Maybe.bindMaybe)(get(columnIndex)(rowIndex)(m))(function (el) {
                return Control_Applicative.pure(Data_Maybe.applicativeMaybe)(new Data_Tuple.Tuple(el, rowIndex + 1 | 0));
            });
        })(0);
        var $52 = Data_Array["null"](oneColumn);
        if ($52) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(new Data_Tuple.Tuple(oneColumn, columnIndex + 1 | 0));
    })(0);
};
module.exports = {
    height: height,
    width: width,
    repeat: repeat,
    fromArray: fromArray,
    get: get,
    getRow: getRow,
    getColumn: getColumn,
    rows: rows,
    columns: columns,
    prettyPrintMatrix: prettyPrintMatrix,
    empty: empty,
    isEmpty: isEmpty,
    set: set,
    modify: modify,
    toIndexedArray: toIndexedArray,
    indexedMap: indexedMap,
    zipWith: zipWith,
    showMatrix: showMatrix,
    eqMatrix: eqMatrix,
    functorMatrix: functorMatrix,
    foldableMatrix: foldableMatrix,
    traversableMatrix: traversableMatrix
};
