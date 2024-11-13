"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var users_exports = {};
__export(users_exports, {
  default: () => users_default
});
module.exports = __toCommonJS(users_exports);
var import_express = __toESM(require("express"));
var import_user_svc = __toESM(require("../services/user-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_user_svc.default.index().then((users) => res.json(users)).catch((err) => res.status(500).send(err));
});
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  import_user_svc.default.getUserById(userId).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  }).catch((err) => res.status(500).send(err));
});
router.post("/", (req, res) => {
  import_user_svc.default.createUser(req.body).then((newUser) => res.status(201).json(newUser)).catch((err) => res.status(500).send(err));
});
router.put("/:userId", (req, res) => {
  const { userId } = req.params;
  import_user_svc.default.updateUser(userId, req.body).then((updatedUser) => {
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  }).catch((err) => res.status(500).send(err));
});
router.delete("/:userId", (req, res) => {
  const { userId } = req.params;
  import_user_svc.default.deleteUser(userId).then((deleted) => {
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).send("User not found");
    }
  }).catch((err) => res.status(500).send(err));
});
var users_default = router;
