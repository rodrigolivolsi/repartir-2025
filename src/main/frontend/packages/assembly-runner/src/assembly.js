"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TestAssemblyFactory = void 0;
var AssemblyRunner = /** @class */ (function () {
    function AssemblyRunner(adapters, drivers) {
        var _this = this;
        this.adapters = adapters;
        drivers.forEach(function (_a) {
            var name = _a.name, driver = _a.driver;
            _this.agregarDriver(name, driver);
        });
    }
    AssemblyRunner.prototype.agregarDriver = function (driverName, driver) {
        var anyObj = this;
        anyObj[driverName] = this.wrapDriver(driver, this.adapters);
    };
    AssemblyRunner.prototype.wrapDriver = function (driver, adapters) {
        var handler = {
            get: function (target, methodName, receiver) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return __awaiter(this, void 0, void 0, function () {
                        var i, adapter, adapterMethod, driverMethod;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < adapters.length)) return [3 /*break*/, 4];
                                    adapter = adapters[i];
                                    adapterMethod = adapter === null || adapter === void 0 ? void 0 : adapter[methodName];
                                    if (!(typeof adapterMethod === "function")) return [3 /*break*/, 3];
                                    return [4 /*yield*/, adapterMethod.apply(void 0, args)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    driverMethod = driver === null || driver === void 0 ? void 0 : driver[methodName];
                                    if (!(typeof driverMethod === "function")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, driverMethod.apply(void 0, args)];
                                case 5:
                                    _a.sent();
                                    _a.label = 6;
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                };
            }
        };
        return new Proxy(driver, handler);
    };
    return AssemblyRunner;
}());
function TestAssemblyFactory(assembly, _a) {
    var adaptersConstructorArgs = _a.adaptersConstructorArgs, driversConstructorArgs = _a.driversConstructorArgs;
    var adapters = assembly.adapters.map(function (adapter) {
        return adapter.constructor.apply(adapter, adaptersConstructorArgs);
    });
    var drivers = assembly.drivers.map(function (driver) { return ({
        name: driver.name,
        driver: driver.constructor.apply(driver, driversConstructorArgs)
    }); });
    return new AssemblyRunner(adapters, drivers);
}
exports.TestAssemblyFactory = TestAssemblyFactory;
