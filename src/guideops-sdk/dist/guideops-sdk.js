var At = Object.defineProperty;
var It = (e, t, n) => t in e ? At(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var U = (e, t, n) => It(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as S, jsxs as xe, Fragment as he } from "react/jsx-runtime";
import { createContext as bt, useMemo as _t, useContext as Ct, useState as F, useCallback as z, useEffect as ce, useRef as We } from "react";
class B extends Error {
  constructor(n, r) {
    const i = `${B.extractMessage(n)}: ${JSON.stringify({
      response: n,
      request: r
    })}`;
    super(i);
    U(this, "response");
    U(this, "request");
    Object.setPrototypeOf(this, B.prototype), this.response = n, this.request = r, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, B);
  }
  static extractMessage(n) {
    var r, i;
    return ((i = (r = n.errors) == null ? void 0 : r[0]) == null ? void 0 : i.message) ?? `GraphQL Error (Code: ${String(n.status)})`;
  }
}
const De = (e) => e.toUpperCase(), fe = (e) => typeof e == "function" ? e() : e, Je = (e, t) => e.map((n, r) => [n, t[r]]), V = (e) => {
  let t = {};
  return e instanceof Headers ? t = Ot(e) : Array.isArray(e) ? e.forEach(([n, r]) => {
    n && r !== void 0 && (t[n] = r);
  }) : e && (t = e), t;
}, Ot = (e) => {
  const t = {};
  return e.forEach((n, r) => {
    t[r] = n;
  }), t;
}, kt = (e) => {
  try {
    const t = e();
    return Dt(t) ? t.catch((n) => Se(n)) : t;
  } catch (t) {
    return Se(t);
  }
}, Se = (e) => e instanceof Error ? e : new Error(String(e)), Dt = (e) => typeof e == "object" && e !== null && "then" in e && typeof e.then == "function" && "catch" in e && typeof e.catch == "function" && "finally" in e && typeof e.finally == "function", _e = (e) => {
  throw new Error(`Unhandled case: ${String(e)}`);
}, se = (e) => typeof e == "object" && e !== null && !Array.isArray(e), St = (e, t) => e.documents ? e : {
  documents: e,
  requestHeaders: t,
  signal: void 0
}, Lt = (e, t, n) => e.query ? e : {
  query: e,
  variables: t,
  requestHeaders: n,
  signal: void 0
};
function oe(e, t) {
  if (!!!e)
    throw new Error(t);
}
function Rt(e) {
  return typeof e == "object" && e !== null;
}
function Pt(e, t) {
  if (!!!e)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const Ft = /\r\n|[\n\r]/g;
function Te(e, t) {
  let n = 0, r = 1;
  for (const i of e.body.matchAll(Ft)) {
    if (typeof i.index == "number" || Pt(!1), i.index >= t)
      break;
    n = i.index + i[0].length, r += 1;
  }
  return {
    line: r,
    column: t + 1 - n
  };
}
function Bt(e) {
  return Qe(
    e.source,
    Te(e.source, e.start)
  );
}
function Qe(e, t) {
  const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, i = t.line - 1, s = e.locationOffset.line - 1, o = t.line + s, u = t.line === 1 ? n : 0, c = t.column + u, d = `${e.name}:${o}:${c}
`, p = r.split(/\r\n|[\n\r]/g), m = p[i];
  if (m.length > 120) {
    const l = Math.floor(c / 80), h = c % 80, f = [];
    for (let v = 0; v < m.length; v += 80)
      f.push(m.slice(v, v + 80));
    return d + Le([
      [`${o} |`, f[0]],
      ...f.slice(1, l + 1).map((v) => ["|", v]),
      ["|", "^".padStart(h)],
      ["|", f[l + 1]]
    ]);
  }
  return d + Le([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, p[i - 1]],
    [`${o} |`, m],
    ["|", "^".padStart(c)],
    [`${o + 1} |`, p[i + 1]]
  ]);
}
function Le(e) {
  const t = e.filter(([r, i]) => i !== void 0), n = Math.max(...t.map(([r]) => r.length));
  return t.map(([r, i]) => r.padStart(n) + (i ? " " + i : "")).join(`
`);
}
function Mt(e) {
  const t = e[0];
  return t == null || "kind" in t || "length" in t ? {
    nodes: t,
    source: e[1],
    positions: e[2],
    path: e[3],
    originalError: e[4],
    extensions: e[5]
  } : t;
}
class Ce extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(t, ...n) {
    var r, i, s;
    const { nodes: o, source: u, positions: c, path: d, originalError: p, extensions: m } = Mt(n);
    super(t), this.name = "GraphQLError", this.path = d ?? void 0, this.originalError = p ?? void 0, this.nodes = Re(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const l = Re(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((f) => f.loc).filter((f) => f != null)
    );
    this.source = u ?? (l == null || (i = l[0]) === null || i === void 0 ? void 0 : i.source), this.positions = c ?? (l == null ? void 0 : l.map((f) => f.start)), this.locations = c && u ? c.map((f) => Te(u, f)) : l == null ? void 0 : l.map((f) => Te(f.source, f.start));
    const h = Rt(
      p == null ? void 0 : p.extensions
    ) ? p == null ? void 0 : p.extensions : void 0;
    this.extensions = (s = m ?? h) !== null && s !== void 0 ? s : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), p != null && p.stack ? Object.defineProperty(this, "stack", {
      value: p.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Ce) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let t = this.message;
    if (this.nodes)
      for (const n of this.nodes)
        n.loc && (t += `

` + Bt(n.loc));
    else if (this.source && this.locations)
      for (const n of this.locations)
        t += `

` + Qe(this.source, n);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function Re(e) {
  return e === void 0 || e.length === 0 ? void 0 : e;
}
function k(e, t, n) {
  return new Ce(`Syntax Error: ${n}`, {
    source: e,
    positions: [t]
  });
}
class $t {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(t, n, r) {
    this.start = t.start, this.end = n.end, this.startToken = t, this.endToken = n, this.source = r;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class Xe {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(t, n, r, i, s, o) {
    this.kind = t, this.start = n, this.end = r, this.line = i, this.column = s, this.value = o, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const Ze = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "description",
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: [
    "description",
    "variable",
    "type",
    "defaultValue",
    "directives"
  ],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "description",
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"],
  TypeCoordinate: ["name"],
  MemberCoordinate: ["name", "memberName"],
  ArgumentCoordinate: ["name", "fieldName", "argumentName"],
  DirectiveCoordinate: ["name"],
  DirectiveArgumentCoordinate: ["name", "argumentName"]
}, qt = new Set(Object.keys(Ze));
function Pe(e) {
  const t = e == null ? void 0 : e.kind;
  return typeof t == "string" && qt.has(t);
}
var j;
(function(e) {
  e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
})(j || (j = {}));
var Ne;
(function(e) {
  e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Ne || (Ne = {}));
var T;
(function(e) {
  e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension", e.TYPE_COORDINATE = "TypeCoordinate", e.MEMBER_COORDINATE = "MemberCoordinate", e.ARGUMENT_COORDINATE = "ArgumentCoordinate", e.DIRECTIVE_COORDINATE = "DirectiveCoordinate", e.DIRECTIVE_ARGUMENT_COORDINATE = "DirectiveArgumentCoordinate";
})(T || (T = {}));
function we(e) {
  return e === 9 || e === 32;
}
function W(e) {
  return e >= 48 && e <= 57;
}
function Ke(e) {
  return e >= 97 && e <= 122 || // A-Z
  e >= 65 && e <= 90;
}
function et(e) {
  return Ke(e) || e === 95;
}
function Ut(e) {
  return Ke(e) || W(e) || e === 95;
}
function Vt(e) {
  var t;
  let n = Number.MAX_SAFE_INTEGER, r = null, i = -1;
  for (let o = 0; o < e.length; ++o) {
    var s;
    const u = e[o], c = jt(u);
    c !== u.length && (r = (s = r) !== null && s !== void 0 ? s : o, i = o, o !== 0 && c < n && (n = c));
  }
  return e.map((o, u) => u === 0 ? o : o.slice(n)).slice(
    (t = r) !== null && t !== void 0 ? t : 0,
    i + 1
  );
}
function jt(e) {
  let t = 0;
  for (; t < e.length && we(e.charCodeAt(t)); )
    ++t;
  return t;
}
function Ht(e, t) {
  const n = e.replace(/"""/g, '\\"""'), r = n.split(/\r\n|[\n\r]/g), i = r.length === 1, s = r.length > 1 && r.slice(1).every((h) => h.length === 0 || we(h.charCodeAt(0))), o = n.endsWith('\\"""'), u = e.endsWith('"') && !o, c = e.endsWith("\\"), d = u || c, p = (
    // add leading and trailing new lines only if it improves readability
    !i || e.length > 70 || d || s || o
  );
  let m = "";
  const l = i && we(e.charCodeAt(0));
  return (p && !l || s) && (m += `
`), m += n, (p || d) && (m += `
`), '"""' + m + '"""';
}
var a;
(function(e) {
  e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.DOT = ".", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
})(a || (a = {}));
class Gt {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(t) {
    const n = new Xe(a.SOF, 0, 0, 0, 0);
    this.source = t, this.lastToken = n, this.token = n, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let t = this.token;
    if (t.kind !== a.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const n = zt(this, t.end);
          t.next = n, n.prev = t, t = n;
        }
      while (t.kind === a.COMMENT);
    return t;
  }
}
function Yt(e) {
  return e === a.BANG || e === a.DOLLAR || e === a.AMP || e === a.PAREN_L || e === a.PAREN_R || e === a.DOT || e === a.SPREAD || e === a.COLON || e === a.EQUALS || e === a.AT || e === a.BRACKET_L || e === a.BRACKET_R || e === a.BRACE_L || e === a.PIPE || e === a.BRACE_R;
}
function H(e) {
  return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
}
function de(e, t) {
  return tt(e.charCodeAt(t)) && nt(e.charCodeAt(t + 1));
}
function tt(e) {
  return e >= 55296 && e <= 56319;
}
function nt(e) {
  return e >= 56320 && e <= 57343;
}
function $(e, t) {
  const n = e.source.body.codePointAt(t);
  if (n === void 0)
    return a.EOF;
  if (n >= 32 && n <= 126) {
    const r = String.fromCodePoint(n);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
}
function O(e, t, n, r, i) {
  const s = e.line, o = 1 + n - e.lineStart;
  return new Xe(t, n, r, s, o, i);
}
function zt(e, t) {
  const n = e.source.body, r = n.length;
  let i = t;
  for (; i < r; ) {
    const s = n.charCodeAt(i);
    switch (s) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++i;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++i, ++e.line, e.lineStart = i;
        continue;
      case 13:
        n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++e.line, e.lineStart = i;
        continue;
      // Comment
      case 35:
        return Wt(e, i);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return O(e, a.BANG, i, i + 1);
      case 36:
        return O(e, a.DOLLAR, i, i + 1);
      case 38:
        return O(e, a.AMP, i, i + 1);
      case 40:
        return O(e, a.PAREN_L, i, i + 1);
      case 41:
        return O(e, a.PAREN_R, i, i + 1);
      case 46:
        if (n.charCodeAt(i + 1) === 46 && n.charCodeAt(i + 2) === 46)
          return O(e, a.SPREAD, i, i + 3);
        break;
      case 58:
        return O(e, a.COLON, i, i + 1);
      case 61:
        return O(e, a.EQUALS, i, i + 1);
      case 64:
        return O(e, a.AT, i, i + 1);
      case 91:
        return O(e, a.BRACKET_L, i, i + 1);
      case 93:
        return O(e, a.BRACKET_R, i, i + 1);
      case 123:
        return O(e, a.BRACE_L, i, i + 1);
      case 124:
        return O(e, a.PIPE, i, i + 1);
      case 125:
        return O(e, a.BRACE_R, i, i + 1);
      // StringValue
      case 34:
        return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 ? en(e, i) : Qt(e, i);
    }
    if (W(s) || s === 45)
      return Jt(e, i, s);
    if (et(s))
      return tn(e, i);
    throw k(
      e.source,
      i,
      s === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : H(s) || de(n, i) ? `Unexpected character: ${$(e, i)}.` : `Invalid character: ${$(e, i)}.`
    );
  }
  return O(e, a.EOF, r, r);
}
function Wt(e, t) {
  const n = e.source.body, r = n.length;
  let i = t + 1;
  for (; i < r; ) {
    const s = n.charCodeAt(i);
    if (s === 10 || s === 13)
      break;
    if (H(s))
      ++i;
    else if (de(n, i))
      i += 2;
    else
      break;
  }
  return O(
    e,
    a.COMMENT,
    t,
    i,
    n.slice(t + 1, i)
  );
}
function Jt(e, t, n) {
  const r = e.source.body;
  let i = t, s = n, o = !1;
  if (s === 45 && (s = r.charCodeAt(++i)), s === 48) {
    if (s = r.charCodeAt(++i), W(s))
      throw k(
        e.source,
        i,
        `Invalid number, unexpected digit after 0: ${$(
          e,
          i
        )}.`
      );
  } else
    i = me(e, i, s), s = r.charCodeAt(i);
  if (s === 46 && (o = !0, s = r.charCodeAt(++i), i = me(e, i, s), s = r.charCodeAt(i)), (s === 69 || s === 101) && (o = !0, s = r.charCodeAt(++i), (s === 43 || s === 45) && (s = r.charCodeAt(++i)), i = me(e, i, s), s = r.charCodeAt(i)), s === 46 || et(s))
    throw k(
      e.source,
      i,
      `Invalid number, expected digit but got: ${$(
        e,
        i
      )}.`
    );
  return O(
    e,
    o ? a.FLOAT : a.INT,
    t,
    i,
    r.slice(t, i)
  );
}
function me(e, t, n) {
  if (!W(n))
    throw k(
      e.source,
      t,
      `Invalid number, expected digit but got: ${$(
        e,
        t
      )}.`
    );
  const r = e.source.body;
  let i = t + 1;
  for (; W(r.charCodeAt(i)); )
    ++i;
  return i;
}
function Qt(e, t) {
  const n = e.source.body, r = n.length;
  let i = t + 1, s = i, o = "";
  for (; i < r; ) {
    const u = n.charCodeAt(i);
    if (u === 34)
      return o += n.slice(s, i), O(e, a.STRING, t, i + 1, o);
    if (u === 92) {
      o += n.slice(s, i);
      const c = n.charCodeAt(i + 1) === 117 ? n.charCodeAt(i + 2) === 123 ? Xt(e, i) : Zt(e, i) : Kt(e, i);
      o += c.value, i += c.size, s = i;
      continue;
    }
    if (u === 10 || u === 13)
      break;
    if (H(u))
      ++i;
    else if (de(n, i))
      i += 2;
    else
      throw k(
        e.source,
        i,
        `Invalid character within String: ${$(
          e,
          i
        )}.`
      );
  }
  throw k(e.source, i, "Unterminated string.");
}
function Xt(e, t) {
  const n = e.source.body;
  let r = 0, i = 3;
  for (; i < 12; ) {
    const s = n.charCodeAt(t + i++);
    if (s === 125) {
      if (i < 5 || !H(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: i
      };
    }
    if (r = r << 4 | Y(s), r < 0)
      break;
  }
  throw k(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(
      t,
      t + i
    )}".`
  );
}
function Zt(e, t) {
  const n = e.source.body, r = Fe(n, t + 2);
  if (H(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (tt(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
    const i = Fe(n, t + 8);
    if (nt(i))
      return {
        value: String.fromCodePoint(r, i),
        size: 12
      };
  }
  throw k(
    e.source,
    t,
    `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`
  );
}
function Fe(e, t) {
  return Y(e.charCodeAt(t)) << 12 | Y(e.charCodeAt(t + 1)) << 8 | Y(e.charCodeAt(t + 2)) << 4 | Y(e.charCodeAt(t + 3));
}
function Y(e) {
  return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
}
function Kt(e, t) {
  const n = e.source.body;
  switch (n.charCodeAt(t + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw k(
    e.source,
    t,
    `Invalid character escape sequence: "${n.slice(
      t,
      t + 2
    )}".`
  );
}
function en(e, t) {
  const n = e.source.body, r = n.length;
  let i = e.lineStart, s = t + 3, o = s, u = "";
  const c = [];
  for (; s < r; ) {
    const d = n.charCodeAt(s);
    if (d === 34 && n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34) {
      u += n.slice(o, s), c.push(u);
      const p = O(
        e,
        a.BLOCK_STRING,
        t,
        s + 3,
        // Return a string of the lines joined with U+000A.
        Vt(c).join(`
`)
      );
      return e.line += c.length - 1, e.lineStart = i, p;
    }
    if (d === 92 && n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 && n.charCodeAt(s + 3) === 34) {
      u += n.slice(o, s), o = s + 1, s += 4;
      continue;
    }
    if (d === 10 || d === 13) {
      u += n.slice(o, s), c.push(u), d === 13 && n.charCodeAt(s + 1) === 10 ? s += 2 : ++s, u = "", o = s, i = s;
      continue;
    }
    if (H(d))
      ++s;
    else if (de(n, s))
      s += 2;
    else
      throw k(
        e.source,
        s,
        `Invalid character within String: ${$(
          e,
          s
        )}.`
      );
  }
  throw k(e.source, s, "Unterminated string.");
}
function tn(e, t) {
  const n = e.source.body, r = n.length;
  let i = t + 1;
  for (; i < r; ) {
    const s = n.charCodeAt(i);
    if (Ut(s))
      ++i;
    else
      break;
  }
  return O(
    e,
    a.NAME,
    t,
    i,
    n.slice(t, i)
  );
}
const nn = 10, it = 2;
function Oe(e) {
  return pe(e, []);
}
function pe(e, t) {
  switch (typeof e) {
    case "string":
      return JSON.stringify(e);
    case "function":
      return e.name ? `[function ${e.name}]` : "[function]";
    case "object":
      return rn(e, t);
    default:
      return String(e);
  }
}
function rn(e, t) {
  if (e === null)
    return "null";
  if (t.includes(e))
    return "[Circular]";
  const n = [...t, e];
  if (sn(e)) {
    const r = e.toJSON();
    if (r !== e)
      return typeof r == "string" ? r : pe(r, n);
  } else if (Array.isArray(e))
    return an(e, n);
  return on(e, n);
}
function sn(e) {
  return typeof e.toJSON == "function";
}
function on(e, t) {
  const n = Object.entries(e);
  return n.length === 0 ? "{}" : t.length > it ? "[" + cn(e) + "]" : "{ " + n.map(
    ([i, s]) => i + ": " + pe(s, t)
  ).join(", ") + " }";
}
function an(e, t) {
  if (e.length === 0)
    return "[]";
  if (t.length > it)
    return "[Array]";
  const n = Math.min(nn, e.length), r = e.length - n, i = [];
  for (let s = 0; s < n; ++s)
    i.push(pe(e[s], t));
  return r === 1 ? i.push("... 1 more item") : r > 1 && i.push(`... ${r} more items`), "[" + i.join(", ") + "]";
}
function cn(e) {
  const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof e.constructor == "function") {
    const n = e.constructor.name;
    if (typeof n == "string" && n !== "")
      return n;
  }
  return t;
}
const ln = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production", un = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  ln ? function(t, n) {
    return t instanceof n;
  } : function(t, n) {
    if (t instanceof n)
      return !0;
    if (typeof t == "object" && t !== null) {
      var r;
      const i = n.prototype[Symbol.toStringTag], s = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (r = t.constructor) === null || r === void 0 ? void 0 : r.name
      );
      if (i === s) {
        const o = Oe(t);
        throw new Error(`Cannot use ${i} "${o}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class rt {
  constructor(t, n = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || oe(!1, `Body must be a string. Received: ${Oe(t)}.`), this.body = t, this.name = n, this.locationOffset = r, this.locationOffset.line > 0 || oe(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || oe(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function dn(e) {
  return un(e, rt);
}
function pn(e, t) {
  const n = new hn(e, t), r = n.parseDocument();
  return Object.defineProperty(r, "tokenCount", {
    enumerable: !1,
    value: n.tokenCount
  }), r;
}
class hn {
  constructor(t, n = {}) {
    const { lexer: r, ...i } = n;
    if (r)
      this._lexer = r;
    else {
      const s = dn(t) ? t : new rt(t);
      this._lexer = new Gt(s);
    }
    this._options = i, this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(a.NAME);
    return this.node(t, {
      kind: T.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: T.DOCUMENT,
      definitions: this.many(
        a.SOF,
        this.parseDefinition,
        a.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(a.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), n = t ? this._lexer.lookahead() : this._lexer.token;
    if (t && n.kind === a.BRACE_L)
      throw k(
        this._lexer.source,
        this._lexer.token.start,
        "Unexpected description, descriptions are not supported on shorthand queries."
      );
    if (n.kind === a.NAME) {
      switch (n.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      switch (n.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
      }
      if (t)
        throw k(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, only GraphQL definitions support descriptions."
        );
      switch (n.value) {
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(n);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const t = this._lexer.token;
    if (this.peek(a.BRACE_L))
      return this.node(t, {
        kind: T.OPERATION_DEFINITION,
        operation: j.QUERY,
        description: void 0,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const n = this.parseDescription(), r = this.parseOperationType();
    let i;
    return this.peek(a.NAME) && (i = this.parseName()), this.node(t, {
      kind: T.OPERATION_DEFINITION,
      operation: r,
      description: n,
      name: i,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const t = this.expectToken(a.NAME);
    switch (t.value) {
      case "query":
        return j.QUERY;
      case "mutation":
        return j.MUTATION;
      case "subscription":
        return j.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      a.PAREN_L,
      this.parseVariableDefinition,
      a.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: T.VARIABLE_DEFINITION,
      description: this.parseDescription(),
      variable: this.parseVariable(),
      type: (this.expectToken(a.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(a.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(a.DOLLAR), this.node(t, {
      kind: T.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: T.SELECTION_SET,
      selections: this.many(
        a.BRACE_L,
        this.parseSelection,
        a.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(a.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, n = this.parseName();
    let r, i;
    return this.expectOptionalToken(a.COLON) ? (r = n, i = this.parseName()) : i = n, this.node(t, {
      kind: T.FIELD,
      alias: r,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(a.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const n = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(a.PAREN_L, n, a.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(a.COLON), this.node(n, {
      kind: T.ARGUMENT,
      name: r,
      value: this.parseValueLiteral(t)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const t = this._lexer.token;
    this.expectToken(a.SPREAD);
    const n = this.expectOptionalKeyword("on");
    return !n && this.peek(a.NAME) ? this.node(t, {
      kind: T.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: T.INLINE_FRAGMENT,
      typeCondition: n ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(t, {
      kind: T.FRAGMENT_DEFINITION,
      description: n,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: T.FRAGMENT_DEFINITION,
      description: n,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(t) {
    const n = this._lexer.token;
    switch (n.kind) {
      case a.BRACKET_L:
        return this.parseList(t);
      case a.BRACE_L:
        return this.parseObject(t);
      case a.INT:
        return this.advanceLexer(), this.node(n, {
          kind: T.INT,
          value: n.value
        });
      case a.FLOAT:
        return this.advanceLexer(), this.node(n, {
          kind: T.FLOAT,
          value: n.value
        });
      case a.STRING:
      case a.BLOCK_STRING:
        return this.parseStringLiteral();
      case a.NAME:
        switch (this.advanceLexer(), n.value) {
          case "true":
            return this.node(n, {
              kind: T.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(n, {
              kind: T.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(n, {
              kind: T.NULL
            });
          default:
            return this.node(n, {
              kind: T.ENUM,
              value: n.value
            });
        }
      case a.DOLLAR:
        if (t)
          if (this.expectToken(a.DOLLAR), this._lexer.token.kind === a.NAME) {
            const r = this._lexer.token.value;
            throw k(
              this._lexer.source,
              n.start,
              `Unexpected variable "$${r}" in constant value.`
            );
          } else
            throw this.unexpected(n);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const t = this._lexer.token;
    return this.advanceLexer(), this.node(t, {
      kind: T.STRING,
      value: t.value,
      block: t.kind === a.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(t) {
    const n = () => this.parseValueLiteral(t);
    return this.node(this._lexer.token, {
      kind: T.LIST,
      values: this.any(a.BRACKET_L, n, a.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(t) {
    const n = () => this.parseObjectField(t);
    return this.node(this._lexer.token, {
      kind: T.OBJECT,
      fields: this.any(a.BRACE_L, n, a.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const n = this._lexer.token, r = this.parseName();
    return this.expectToken(a.COLON), this.node(n, {
      kind: T.OBJECT_FIELD,
      name: r,
      value: this.parseValueLiteral(t)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(t) {
    const n = [];
    for (; this.peek(a.AT); )
      n.push(this.parseDirective(t));
    return n;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(t) {
    const n = this._lexer.token;
    return this.expectToken(a.AT), this.node(n, {
      kind: T.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(t)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const t = this._lexer.token;
    let n;
    if (this.expectOptionalToken(a.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(a.BRACKET_R), n = this.node(t, {
        kind: T.LIST_TYPE,
        type: r
      });
    } else
      n = this.parseNamedType();
    return this.expectOptionalToken(a.BANG) ? this.node(t, {
      kind: T.NON_NULL_TYPE,
      type: n
    }) : n;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: T.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(a.STRING) || this.peek(a.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("schema");
    const r = this.parseConstDirectives(), i = this.many(
      a.BRACE_L,
      this.parseOperationTypeDefinition,
      a.BRACE_R
    );
    return this.node(t, {
      kind: T.SCHEMA_DEFINITION,
      description: n,
      directives: r,
      operationTypes: i
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const t = this._lexer.token, n = this.parseOperationType();
    this.expectToken(a.COLON);
    const r = this.parseNamedType();
    return this.node(t, {
      kind: T.OPERATION_TYPE_DEFINITION,
      operation: n,
      type: r
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("scalar");
    const r = this.parseName(), i = this.parseConstDirectives();
    return this.node(t, {
      kind: T.SCALAR_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("type");
    const r = this.parseName(), i = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(t, {
      kind: T.OBJECT_TYPE_DEFINITION,
      description: n,
      name: r,
      interfaces: i,
      directives: s,
      fields: o
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(a.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      a.BRACE_L,
      this.parseFieldDefinition,
      a.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(a.COLON);
    const s = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(t, {
      kind: T.FIELD_DEFINITION,
      description: n,
      name: r,
      arguments: i,
      type: s,
      directives: o
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      a.PAREN_L,
      this.parseInputValueDef,
      a.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseName();
    this.expectToken(a.COLON);
    const i = this.parseTypeReference();
    let s;
    this.expectOptionalToken(a.EQUALS) && (s = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(t, {
      kind: T.INPUT_VALUE_DEFINITION,
      description: n,
      name: r,
      type: i,
      defaultValue: s,
      directives: o
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("interface");
    const r = this.parseName(), i = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(t, {
      kind: T.INTERFACE_TYPE_DEFINITION,
      description: n,
      name: r,
      interfaces: i,
      directives: s,
      fields: o
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("union");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    return this.node(t, {
      kind: T.UNION_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i,
      types: s
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(a.EQUALS) ? this.delimitedMany(a.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("enum");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    return this.node(t, {
      kind: T.ENUM_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i,
      values: s
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      a.BRACE_L,
      this.parseEnumValueDefinition,
      a.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, n = this.parseDescription(), r = this.parseEnumValueName(), i = this.parseConstDirectives();
    return this.node(t, {
      kind: T.ENUM_VALUE_DEFINITION,
      description: n,
      name: r,
      directives: i
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw k(
        this._lexer.source,
        this._lexer.token.start,
        `${te(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("input");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    return this.node(t, {
      kind: T.INPUT_OBJECT_TYPE_DEFINITION,
      description: n,
      name: r,
      directives: i,
      fields: s
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      a.BRACE_L,
      this.parseInputValueDef,
      a.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const t = this._lexer.lookahead();
    if (t.kind === a.NAME)
      switch (t.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(t);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const n = this.parseConstDirectives(), r = this.optionalMany(
      a.BRACE_L,
      this.parseOperationTypeDefinition,
      a.BRACE_R
    );
    if (n.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: T.SCHEMA_EXTENSION,
      directives: n,
      operationTypes: r
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const n = this.parseName(), r = this.parseConstDirectives();
    if (r.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: T.SCALAR_TYPE_EXTENSION,
      name: n,
      directives: r
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    if (r.length === 0 && i.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: T.OBJECT_TYPE_EXTENSION,
      name: n,
      interfaces: r,
      directives: i,
      fields: s
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    if (r.length === 0 && i.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: T.INTERFACE_TYPE_EXTENSION,
      name: n,
      interfaces: r,
      directives: i,
      fields: s
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: T.UNION_TYPE_EXTENSION,
      name: n,
      directives: r,
      types: i
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: T.ENUM_TYPE_EXTENSION,
      name: n,
      directives: r,
      values: i
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: T.INPUT_OBJECT_TYPE_EXTENSION,
      name: n,
      directives: r,
      fields: i
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const t = this._lexer.token, n = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(a.AT);
    const r = this.parseName(), i = this.parseArgumentDefs(), s = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(t, {
      kind: T.DIRECTIVE_DEFINITION,
      description: n,
      name: r,
      arguments: i,
      repeatable: s,
      locations: o
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(a.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const t = this._lexer.token, n = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Ne, n.value))
      return n;
    throw this.unexpected(t);
  }
  // Schema Coordinates
  /**
   * SchemaCoordinate :
   *   - Name
   *   - Name . Name
   *   - Name . Name ( Name : )
   *   - \@ Name
   *   - \@ Name ( Name : )
   */
  parseSchemaCoordinate() {
    const t = this._lexer.token, n = this.expectOptionalToken(a.AT), r = this.parseName();
    let i;
    !n && this.expectOptionalToken(a.DOT) && (i = this.parseName());
    let s;
    return (n || i) && this.expectOptionalToken(a.PAREN_L) && (s = this.parseName(), this.expectToken(a.COLON), this.expectToken(a.PAREN_R)), n ? s ? this.node(t, {
      kind: T.DIRECTIVE_ARGUMENT_COORDINATE,
      name: r,
      argumentName: s
    }) : this.node(t, {
      kind: T.DIRECTIVE_COORDINATE,
      name: r
    }) : i ? s ? this.node(t, {
      kind: T.ARGUMENT_COORDINATE,
      name: r,
      fieldName: i,
      argumentName: s
    }) : this.node(t, {
      kind: T.MEMBER_COORDINATE,
      name: r,
      memberName: i
    }) : this.node(t, {
      kind: T.TYPE_COORDINATE,
      name: r
    });
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(t, n) {
    return this._options.noLocation !== !0 && (n.loc = new $t(
      t,
      this._lexer.lastToken,
      this._lexer.source
    )), n;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(t) {
    return this._lexer.token.kind === t;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(t) {
    const n = this._lexer.token;
    if (n.kind === t)
      return this.advanceLexer(), n;
    throw k(
      this._lexer.source,
      n.start,
      `Expected ${st(t)}, found ${te(n)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(t) {
    return this._lexer.token.kind === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(t) {
    const n = this._lexer.token;
    if (n.kind === a.NAME && n.value === t)
      this.advanceLexer();
    else
      throw k(
        this._lexer.source,
        n.start,
        `Expected "${t}", found ${te(n)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const n = this._lexer.token;
    return n.kind === a.NAME && n.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const n = t ?? this._lexer.token;
    return k(
      this._lexer.source,
      n.start,
      `Unexpected ${te(n)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(t, n, r) {
    this.expectToken(t);
    const i = [];
    for (; !this.expectOptionalToken(r); )
      i.push(n.call(this));
    return i;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(t, n, r) {
    if (this.expectOptionalToken(t)) {
      const i = [];
      do
        i.push(n.call(this));
      while (!this.expectOptionalToken(r));
      return i;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(t, n, r) {
    this.expectToken(t);
    const i = [];
    do
      i.push(n.call(this));
    while (!this.expectOptionalToken(r));
    return i;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(t, n) {
    this.expectOptionalToken(t);
    const r = [];
    do
      r.push(n.call(this));
    while (this.expectOptionalToken(t));
    return r;
  }
  advanceLexer() {
    const { maxTokens: t } = this._options, n = this._lexer.advance();
    if (n.kind !== a.EOF && (++this._tokenCounter, t !== void 0 && this._tokenCounter > t))
      throw k(
        this._lexer.source,
        n.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function te(e) {
  const t = e.value;
  return st(e.kind) + (t != null ? ` "${t}"` : "");
}
function st(e) {
  return Yt(e) ? `"${e}"` : e;
}
function fn(e) {
  return `"${e.replace(mn, vn)}"`;
}
const mn = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function vn(e) {
  return gn[e.charCodeAt(0)];
}
const gn = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], En = Object.freeze({});
function yn(e, t, n = Ze) {
  const r = /* @__PURE__ */ new Map();
  for (const N of Object.values(T))
    r.set(N, xn(t, N));
  let i, s = Array.isArray(e), o = [e], u = -1, c = [], d = e, p, m;
  const l = [], h = [];
  do {
    u++;
    const N = u === o.length, b = N && c.length !== 0;
    if (N) {
      if (p = h.length === 0 ? void 0 : l[l.length - 1], d = m, m = h.pop(), b)
        if (s) {
          d = d.slice();
          let _ = 0;
          for (const [C, I] of c) {
            const R = C - _;
            I === null ? (d.splice(R, 1), _++) : d[R] = I;
          }
        } else {
          d = { ...d };
          for (const [_, C] of c)
            d[_] = C;
        }
      u = i.index, o = i.keys, c = i.edits, s = i.inArray, i = i.prev;
    } else if (m) {
      if (p = s ? u : o[u], d = m[p], d == null)
        continue;
      l.push(p);
    }
    let A;
    if (!Array.isArray(d)) {
      var f, v;
      Pe(d) || oe(!1, `Invalid AST Node: ${Oe(d)}.`);
      const _ = N ? (f = r.get(d.kind)) === null || f === void 0 ? void 0 : f.leave : (v = r.get(d.kind)) === null || v === void 0 ? void 0 : v.enter;
      if (A = _ == null ? void 0 : _.call(t, d, p, m, l, h), A === En)
        break;
      if (A === !1) {
        if (!N) {
          l.pop();
          continue;
        }
      } else if (A !== void 0 && (c.push([p, A]), !N))
        if (Pe(A))
          d = A;
        else {
          l.pop();
          continue;
        }
    }
    if (A === void 0 && b && c.push([p, d]), N)
      l.pop();
    else {
      var x;
      i = {
        inArray: s,
        index: u,
        keys: o,
        edits: c,
        prev: i
      }, s = Array.isArray(d), o = s ? d : (x = n[d.kind]) !== null && x !== void 0 ? x : [], u = -1, c = [], m && h.push(m), m = d;
    }
  } while (i !== void 0);
  return c.length !== 0 ? c[c.length - 1][1] : e;
}
function xn(e, t) {
  const n = e[t];
  return typeof n == "object" ? n : typeof n == "function" ? {
    enter: n,
    leave: void 0
  } : {
    enter: e.enter,
    leave: e.leave
  };
}
function Tn(e) {
  return yn(e, wn);
}
const Nn = 80, wn = {
  Name: {
    leave: (e) => e.value
  },
  Variable: {
    leave: (e) => "$" + e.name
  },
  // Document
  Document: {
    leave: (e) => g(e.definitions, `

`)
  },
  OperationDefinition: {
    leave(e) {
      const t = ve(e.variableDefinitions) ? w(`(
`, g(e.variableDefinitions, `
`), `
)`) : w("(", g(e.variableDefinitions, ", "), ")"), n = w("", e.description, `
`) + g(
        [
          e.operation,
          g([e.name, t]),
          g(e.directives, " ")
        ],
        " "
      );
      return (n === "query" ? "" : n + " ") + e.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: e, type: t, defaultValue: n, directives: r, description: i }) => w("", i, `
`) + e + ": " + t + w(" = ", n) + w(" ", g(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: e }) => P(e)
  },
  Field: {
    leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: i }) {
      const s = w("", e, ": ") + t;
      let o = s + w("(", g(n, ", "), ")");
      return o.length > Nn && (o = s + w(`(
`, ae(g(n, `
`)), `
)`)), g([o, g(r, " "), i], " ");
    }
  },
  Argument: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: e, directives: t }) => "..." + e + w(" ", g(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: e, directives: t, selectionSet: n }) => g(
      [
        "...",
        w("on ", e),
        g(t, " "),
        n
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({
      name: e,
      typeCondition: t,
      variableDefinitions: n,
      directives: r,
      selectionSet: i,
      description: s
    }) => w("", s, `
`) + // Note: fragment variable definitions are experimental and may be changed
    // or removed in the future.
    `fragment ${e}${w("(", g(n, ", "), ")")} on ${t} ${w("", g(r, " "), " ")}` + i
  },
  // Value
  IntValue: {
    leave: ({ value: e }) => e
  },
  FloatValue: {
    leave: ({ value: e }) => e
  },
  StringValue: {
    leave: ({ value: e, block: t }) => t ? Ht(e) : fn(e)
  },
  BooleanValue: {
    leave: ({ value: e }) => e ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: e }) => e
  },
  ListValue: {
    leave: ({ values: e }) => "[" + g(e, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: e }) => "{" + g(e, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: e, value: t }) => e + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: e, arguments: t }) => "@" + e + w("(", g(t, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: e }) => e
  },
  ListType: {
    leave: ({ type: e }) => "[" + e + "]"
  },
  NonNullType: {
    leave: ({ type: e }) => e + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: e, directives: t, operationTypes: n }) => w("", e, `
`) + g(["schema", g(t, " "), P(n)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: e, type: t }) => e + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: e, name: t, directives: n }) => w("", e, `
`) + g(["scalar", t, g(n, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: i }) => w("", e, `
`) + g(
      [
        "type",
        t,
        w("implements ", g(n, " & ")),
        g(r, " "),
        P(i)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: e, name: t, arguments: n, type: r, directives: i }) => w("", e, `
`) + t + (ve(n) ? w(`(
`, ae(g(n, `
`)), `
)`) : w("(", g(n, ", "), ")")) + ": " + r + w(" ", g(i, " "))
  },
  InputValueDefinition: {
    leave: ({ description: e, name: t, type: n, defaultValue: r, directives: i }) => w("", e, `
`) + g(
      [t + ": " + n, w("= ", r), g(i, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: e, name: t, interfaces: n, directives: r, fields: i }) => w("", e, `
`) + g(
      [
        "interface",
        t,
        w("implements ", g(n, " & ")),
        g(r, " "),
        P(i)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, types: r }) => w("", e, `
`) + g(
      ["union", t, g(n, " "), w("= ", g(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, values: r }) => w("", e, `
`) + g(["enum", t, g(n, " "), P(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: e, name: t, directives: n }) => w("", e, `
`) + g([t, g(n, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: e, name: t, directives: n, fields: r }) => w("", e, `
`) + g(["input", t, g(n, " "), P(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: i }) => w("", e, `
`) + "directive @" + t + (ve(n) ? w(`(
`, ae(g(n, `
`)), `
)`) : w("(", g(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + g(i, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: e, operationTypes: t }) => g(
      ["extend schema", g(e, " "), P(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: e, directives: t }) => g(["extend scalar", e, g(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => g(
      [
        "extend type",
        e,
        w("implements ", g(t, " & ")),
        g(n, " "),
        P(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: e, interfaces: t, directives: n, fields: r }) => g(
      [
        "extend interface",
        e,
        w("implements ", g(t, " & ")),
        g(n, " "),
        P(r)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: e, directives: t, types: n }) => g(
      [
        "extend union",
        e,
        g(t, " "),
        w("= ", g(n, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: e, directives: t, values: n }) => g(["extend enum", e, g(t, " "), P(n)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: e, directives: t, fields: n }) => g(["extend input", e, g(t, " "), P(n)], " ")
  },
  // Schema Coordinates
  TypeCoordinate: {
    leave: ({ name: e }) => e
  },
  MemberCoordinate: {
    leave: ({ name: e, memberName: t }) => g([e, w(".", t)])
  },
  ArgumentCoordinate: {
    leave: ({ name: e, fieldName: t, argumentName: n }) => g([e, w(".", t), w("(", n, ":)")])
  },
  DirectiveCoordinate: {
    leave: ({ name: e }) => g(["@", e])
  },
  DirectiveArgumentCoordinate: {
    leave: ({ name: e, argumentName: t }) => g(["@", e, w("(", t, ":)")])
  }
};
function g(e, t = "") {
  var n;
  return (n = e == null ? void 0 : e.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
}
function P(e) {
  return w(`{
`, ae(g(e, `
`)), `
}`);
}
function w(e, t, n = "") {
  return t != null && t !== "" ? e + t + n : "";
}
function ae(e) {
  return w("  ", e.replace(/\n/g, `
  `));
}
function ve(e) {
  var t;
  return (t = e == null ? void 0 : e.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const Be = "Accept", Ae = "Content-Type", Ie = "application/json", ot = "application/graphql-response+json", Me = (e) => e.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), An = (e) => {
  const t = e.toLowerCase();
  return t.includes(ot) || t.includes(Ie);
}, $e = (e) => {
  try {
    if (Array.isArray(e))
      return {
        _tag: "Batch",
        executionResults: e.map(qe)
      };
    if (se(e))
      return {
        _tag: "Single",
        executionResult: qe(e)
      };
    throw new Error(`Invalid execution result: result is not object or array. 
Got:
${String(e)}`);
  } catch (t) {
    return t;
  }
}, qe = (e) => {
  if (typeof e != "object" || e === null)
    throw new Error("Invalid execution result: result is not object");
  let t, n, r;
  if ("errors" in e) {
    if (!se(e.errors) && !Array.isArray(e.errors))
      throw new Error("Invalid execution result: errors is not plain object OR array");
    t = e.errors;
  }
  if ("data" in e) {
    if (!se(e.data) && e.data !== null)
      throw new Error("Invalid execution result: data is not plain object");
    n = e.data;
  }
  if ("extensions" in e) {
    if (!se(e.extensions))
      throw new Error("Invalid execution result: extensions is not plain object");
    r = e.extensions;
  }
  return {
    data: n,
    errors: t,
    extensions: r
  };
}, In = (e) => e._tag === "Batch" ? e.executionResults.some(Ue) : Ue(e.executionResult), Ue = (e) => Array.isArray(e.errors) ? e.errors.length > 0 : !!e.errors, at = (e) => typeof e == "object" && e !== null && "kind" in e && e.kind === T.OPERATION_DEFINITION, bn = (e) => {
  var r;
  let t;
  const n = e.definitions.filter(at);
  return n.length === 1 && (t = (r = n[0].name) == null ? void 0 : r.value), t;
}, _n = (e) => {
  let t = !1;
  const n = e.definitions.filter(at);
  return n.length === 1 && (t = n[0].operation === "mutation"), t;
}, ge = (e, t) => {
  const n = typeof e == "string" || "kind" in e ? e : String(e), r = typeof n == "string" ? n : Tn(n);
  let i = !1, s;
  if (t)
    return { expression: r, isMutation: i, operationName: s };
  const o = kt(() => typeof n == "string" ? pn(n) : n);
  return o instanceof Error ? { expression: r, isMutation: i, operationName: s } : (s = bn(o), i = _n(o), { expression: r, operationName: s, isMutation: i });
}, ke = JSON, Ee = async (e) => {
  const t = {
    ...e,
    method: e.request._tag === "Single" ? e.request.document.isMutation ? "POST" : De(e.method ?? "post") : e.request.hasMutations ? "POST" : De(e.method ?? "post"),
    fetchOptions: {
      ...e.fetchOptions,
      errorPolicy: e.fetchOptions.errorPolicy ?? "none"
    }
  }, r = await On(t.method)(t), i = await r.text();
  let s;
  try {
    s = Cn(i, r.headers.get(Ae), e.fetchOptions.jsonSerializer ?? ke);
  } catch (u) {
    s = u;
  }
  const o = {
    status: r.status,
    headers: r.headers,
    body: i
  };
  if (!r.ok) {
    if (s instanceof Error)
      return new B({ ...o }, {
        query: e.request._tag === "Single" ? e.request.document.expression : e.request.query,
        variables: e.request.variables
      });
    const u = s._tag === "Batch" ? { ...s.executionResults, ...o } : {
      ...s.executionResult,
      ...o
    };
    return new B(u, {
      query: e.request._tag === "Single" ? e.request.document.expression : e.request.query,
      variables: e.request.variables
    });
  }
  if (s instanceof Error)
    throw s;
  if (In(s) && t.fetchOptions.errorPolicy === "none") {
    const u = s._tag === "Batch" ? { ...s.executionResults, ...o } : {
      ...s.executionResult,
      ...o
    };
    return new B(u, {
      query: e.request._tag === "Single" ? e.request.document.expression : e.request.query,
      variables: e.request.variables
    });
  }
  switch (s._tag) {
    case "Single":
      return {
        ...o,
        ...Ve(t)(s.executionResult)
      };
    case "Batch":
      return {
        ...o,
        data: s.executionResults.map(Ve(t))
      };
    default:
      _e(s);
  }
}, Ve = (e) => (t) => ({
  extensions: t.extensions,
  data: t.data,
  errors: e.fetchOptions.errorPolicy === "all" ? t.errors : void 0
}), Cn = (e, t, n) => t && An(t) ? $e(n.parse(e)) : $e(e), On = (e) => async (t) => {
  const n = new Headers(t.headers);
  let r = null, i;
  n.has(Be) || n.set(Be, [ot, Ie].join(", ")), e === "POST" ? (i = (t.fetchOptions.jsonSerializer ?? ke).stringify(kn(t)), typeof i == "string" && !n.has(Ae) && n.set(Ae, Ie)) : r = Dn(t);
  const s = { method: e, headers: n, body: i, ...t.fetchOptions };
  let o = new URL(t.url), u = s;
  if (t.middleware) {
    const d = await Promise.resolve(t.middleware({
      ...s,
      url: t.url,
      operationName: t.request._tag === "Single" ? t.request.document.operationName : void 0,
      variables: t.request.variables
    })), { url: p, ...m } = d;
    o = new URL(p), u = m;
  }
  return r && r.forEach((d, p) => {
    o.searchParams.append(p, d);
  }), await (t.fetch ?? fetch)(o, u);
}, kn = (e) => {
  switch (e.request._tag) {
    case "Single":
      return {
        query: e.request.document.expression,
        variables: e.request.variables,
        operationName: e.request.document.operationName
      };
    case "Batch":
      return Je(e.request.query, e.request.variables ?? []).map(([t, n]) => ({
        query: t,
        variables: n
      }));
    default:
      throw _e(e.request);
  }
}, Dn = (e) => {
  var r;
  const t = e.fetchOptions.jsonSerializer ?? ke, n = new URLSearchParams();
  switch (e.request._tag) {
    case "Single":
      return n.append("query", Me(e.request.document.expression)), e.request.variables && n.append("variables", t.stringify(e.request.variables)), e.request.document.operationName && n.append("operationName", e.request.document.operationName), n;
    case "Batch": {
      const i = ((r = e.request.variables) == null ? void 0 : r.map((u) => t.stringify(u))) ?? [], s = e.request.query.map(Me), o = Je(s, i).map(([u, c]) => ({
        query: u,
        variables: c
      }));
      return n.append("query", t.stringify(o)), n;
    }
    default:
      throw _e(e.request);
  }
};
class Sn {
  constructor(t, n = {}) {
    U(this, "url");
    U(this, "requestConfig");
    /**
     * Send a GraphQL query to the server.
     */
    U(this, "rawRequest", async (...t) => {
      const [n, r, i] = t, s = Lt(n, r, i), { headers: o, fetch: u = globalThis.fetch, method: c = "POST", requestMiddleware: d, responseMiddleware: p, excludeOperationName: m, ...l } = this.requestConfig, { url: h } = this;
      s.signal !== void 0 && (l.signal = s.signal);
      const f = ge(s.query, m), v = await Ee({
        url: h,
        request: {
          _tag: "Single",
          document: f,
          variables: s.variables
        },
        headers: {
          ...V(fe(o)),
          ...V(s.requestHeaders)
        },
        fetch: u,
        method: c,
        fetchOptions: l,
        middleware: d
      });
      if (p && await p(v, {
        operationName: f.operationName,
        variables: r,
        url: this.url
      }), v instanceof Error)
        throw v;
      return v;
    });
    this.url = t, this.requestConfig = n;
  }
  async request(t, ...n) {
    const [r, i] = n, s = Ln(t, r, i), { headers: o, fetch: u = globalThis.fetch, method: c = "POST", requestMiddleware: d, responseMiddleware: p, excludeOperationName: m, ...l } = this.requestConfig, { url: h } = this;
    s.signal !== void 0 && (l.signal = s.signal);
    const f = ge(s.document, m), v = await Ee({
      url: h,
      request: {
        _tag: "Single",
        document: f,
        variables: s.variables
      },
      headers: {
        ...V(fe(o)),
        ...V(s.requestHeaders)
      },
      fetch: u,
      method: c,
      fetchOptions: l,
      middleware: d
    });
    if (p && await p(v, {
      operationName: f.operationName,
      variables: s.variables,
      url: this.url
    }), v instanceof Error)
      throw v;
    return v.data;
  }
  async batchRequests(t, n) {
    const r = St(t, n), { headers: i, excludeOperationName: s, ...o } = this.requestConfig;
    r.signal !== void 0 && (o.signal = r.signal);
    const u = r.documents.map(({ document: l }) => ge(l, s)), c = u.map(({ expression: l }) => l), d = u.some(({ isMutation: l }) => l), p = r.documents.map(({ variables: l }) => l), m = await Ee({
      url: this.url,
      request: {
        _tag: "Batch",
        operationName: void 0,
        query: c,
        hasMutations: d,
        variables: p
      },
      headers: {
        ...V(fe(i)),
        ...V(r.requestHeaders)
      },
      fetch: this.requestConfig.fetch ?? globalThis.fetch,
      method: this.requestConfig.method || "POST",
      fetchOptions: o,
      middleware: this.requestConfig.requestMiddleware
    });
    if (this.requestConfig.responseMiddleware && await this.requestConfig.responseMiddleware(m, {
      operationName: void 0,
      variables: p,
      url: this.url
    }), m instanceof Error)
      throw m;
    return m.data;
  }
  setHeaders(t) {
    return this.requestConfig.headers = t, this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(t, n) {
    const { headers: r } = this.requestConfig;
    return r ? r[t] = n : this.requestConfig.headers = { [t]: n }, this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(t) {
    return this.url = t, this;
  }
}
const Ln = (e, t, n) => e.document ? e : {
  document: e,
  variables: t,
  requestHeaders: n,
  signal: void 0
}, ne = (e, ...t) => e.reduce((n, r, i) => `${n}${r}${i in t ? String(t[i]) : ""}`, "");
function Rn(e, t) {
  const n = new Sn(e, {
    requestMiddleware: async (r) => {
      const i = await t();
      return {
        ...r,
        headers: {
          ...r.headers,
          authorization: `Bearer ${i}`
        }
      };
    }
  });
  return {
    async getAssignedGuides(r, i) {
      const s = ne`
        query GetAssignedGuides($azureAdObjectId: String!, $schoolYear: String!) {
          assignedGuides(azureAdObjectId: $azureAdObjectId, schoolYear: $schoolYear) {
            id
            title
            description
            type
            priority
            steps {
              id
              stepOrder
              elementSelector
              title
              description
              side
              pageUrl
            }
          }
        }
      `;
      return (await n.request(s, { azureAdObjectId: r, schoolYear: i })).assignedGuides;
    },
    async getPendingHandbooks(r, i) {
      const s = ne`
        query GetPendingHandbooks($azureAdObjectId: String!, $schoolYear: String!) {
          pendingHandbooks(azureAdObjectId: $azureAdObjectId, schoolYear: $schoolYear) {
            id
            title
            contentUrl
            contentHtml
            schoolYear
            requiresAcknowledgment
          }
        }
      `;
      return (await n.request(s, { azureAdObjectId: r, schoolYear: i })).pendingHandbooks;
    },
    async recordAcknowledgment(r, i, s) {
      const o = ne`
        mutation RecordAcknowledgment($input: RecordAcknowledgmentInput!) {
          recordAcknowledgment(input: $input) {
            id
            handbookId
            acknowledgedAt
          }
        }
      `;
      return (await n.request(o, {
        input: { azureAdObjectId: r, handbookId: i, schoolYear: s }
      })).recordAcknowledgment;
    },
    async recordGuideCompletion(r, i) {
      const s = ne`
        mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
          recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
            id
          }
        }
      `;
      await n.request(s, { azureAdObjectId: r, guideId: i });
    }
  };
}
const ct = bt(null);
function lt() {
  const e = Ct(ct);
  if (!e)
    throw new Error("useGuideOpsContext must be used within a <GuideOpsProvider>");
  return e;
}
function ui({ config: e, children: t }) {
  const n = _t(() => ({
    client: Rn(e.apiUrl, e.getAccessToken),
    config: e
  }), [e]);
  return /* @__PURE__ */ S(ct.Provider, { value: n, children: t });
}
function Pn() {
  const { client: e, config: t } = lt(), [n, r] = F([]), [i, s] = F(!0), [o, u] = F(null), c = t.userId || "", d = z(async () => {
    if (c)
      try {
        s(!0), u(null);
        const m = await e.getPendingHandbooks(c, t.schoolYear);
        r(m);
      } catch (m) {
        u(m instanceof Error ? m : new Error("Failed to fetch handbooks"));
      } finally {
        s(!1);
      }
  }, [e, c, t.schoolYear]);
  ce(() => {
    d();
  }, [d]);
  const p = z(async (m) => {
    if (c)
      try {
        await e.recordAcknowledgment(c, m, t.schoolYear), r((l) => l.filter((h) => h.id !== m));
      } catch (l) {
        throw u(l instanceof Error ? l : new Error("Failed to record acknowledgment")), l;
      }
  }, [e, c, t.schoolYear]);
  return {
    pendingHandbooks: n,
    isLoading: i,
    error: o,
    acknowledge: p,
    hasAllAcknowledged: !i && n.length === 0,
    refresh: d
  };
}
let be = {}, ut;
function ye(e = {}) {
  be = {
    animate: !0,
    allowClose: !0,
    overlayClickBehavior: "close",
    overlayOpacity: 0.7,
    smoothScroll: !1,
    disableActiveInteraction: !1,
    showProgress: !1,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...e
  };
}
function E(e) {
  return e ? be[e] : be;
}
function Fn(e) {
  ut = e;
}
function L() {
  return ut;
}
let le = {};
function ie(e, t) {
  le[e] = t;
}
function M(e) {
  var t;
  (t = le[e]) == null || t.call(le);
}
function Bn() {
  le = {};
}
function re(e, t, n, r) {
  return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t;
}
function dt(e) {
  const t = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return e.flatMap((n) => {
    const r = n.matches(t), i = Array.from(n.querySelectorAll(t));
    return [...r ? [n] : [], ...i];
  }).filter((n) => getComputedStyle(n).pointerEvents !== "none" && qn(n));
}
function pt(e) {
  if (!e || $n(e))
    return;
  const t = E("smoothScroll"), n = e.offsetHeight > window.innerHeight;
  e.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !t || Mn(e) ? "auto" : "smooth",
    inline: "center",
    block: n ? "start" : "center"
  });
}
function Mn(e) {
  if (!e || !e.parentElement)
    return;
  const t = e.parentElement;
  return t.scrollHeight > t.clientHeight;
}
function $n(e) {
  const t = e.getBoundingClientRect();
  return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function qn(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
let ue = {};
function D(e, t) {
  ue[e] = t;
}
function y(e) {
  return e ? ue[e] : ue;
}
function je() {
  ue = {};
}
function Un(e, t, n, r) {
  let i = y("__activeStagePosition");
  const s = i || n.getBoundingClientRect(), o = r.getBoundingClientRect(), u = re(e, s.x, o.x - s.x, t), c = re(e, s.y, o.y - s.y, t), d = re(e, s.width, o.width - s.width, t), p = re(e, s.height, o.height - s.height, t);
  i = {
    x: u,
    y: c,
    width: d,
    height: p
  }, ft(i), D("__activeStagePosition", i);
}
function ht(e) {
  if (!e)
    return;
  const t = e.getBoundingClientRect(), n = {
    x: t.x,
    y: t.y,
    width: t.width,
    height: t.height
  };
  D("__activeStagePosition", n), ft(n);
}
function Vn() {
  const e = y("__activeStagePosition"), t = y("__overlaySvg");
  if (!e)
    return;
  if (!t) {
    console.warn("No stage svg found.");
    return;
  }
  const n = window.innerWidth, r = window.innerHeight;
  t.setAttribute("viewBox", `0 0 ${n} ${r}`);
}
function jn(e) {
  const t = Hn(e);
  document.body.appendChild(t), gt(t, (n) => {
    n.target.tagName === "path" && M("overlayClick");
  }), D("__overlaySvg", t);
}
function ft(e) {
  const t = y("__overlaySvg");
  if (!t) {
    jn(e);
    return;
  }
  const n = t.firstElementChild;
  if ((n == null ? void 0 : n.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  n.setAttribute("d", mt(e));
}
function Hn(e) {
  const t = window.innerWidth, n = window.innerHeight, r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  r.classList.add("driver-overlay", "driver-overlay-animated"), r.setAttribute("viewBox", `0 0 ${t} ${n}`), r.setAttribute("xmlSpace", "preserve"), r.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), r.setAttribute("version", "1.1"), r.setAttribute("preserveAspectRatio", "xMinYMin slice"), r.style.fillRule = "evenodd", r.style.clipRule = "evenodd", r.style.strokeLinejoin = "round", r.style.strokeMiterlimit = "2", r.style.zIndex = "10000", r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%";
  const i = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return i.setAttribute("d", mt(e)), i.style.fill = E("overlayColor") || "rgb(0,0,0)", i.style.opacity = `${E("overlayOpacity")}`, i.style.pointerEvents = "auto", i.style.cursor = "auto", r.appendChild(i), r;
}
function mt(e) {
  const t = window.innerWidth, n = window.innerHeight, r = E("stagePadding") || 0, i = E("stageRadius") || 0, s = e.width + r * 2, o = e.height + r * 2, u = Math.min(i, s / 2, o / 2), c = Math.floor(Math.max(u, 0)), d = e.x - r + c, p = e.y - r, m = s - c * 2, l = o - c * 2;
  return `M${t},0L0,0L0,${n}L${t},${n}L${t},0Z
    M${d},${p} h${m} a${c},${c} 0 0 1 ${c},${c} v${l} a${c},${c} 0 0 1 -${c},${c} h-${m} a${c},${c} 0 0 1 -${c},-${c} v-${l} a${c},${c} 0 0 1 ${c},-${c} z`;
}
function Gn() {
  const e = y("__overlaySvg");
  e && e.remove();
}
function Yn() {
  const e = document.getElementById("driver-dummy-element");
  if (e)
    return e;
  let t = document.createElement("div");
  return t.id = "driver-dummy-element", t.style.width = "0", t.style.height = "0", t.style.pointerEvents = "none", t.style.opacity = "0", t.style.position = "fixed", t.style.top = "50%", t.style.left = "50%", document.body.appendChild(t), t;
}
function He(e) {
  const { element: t } = e;
  let n = typeof t == "function" ? t() : typeof t == "string" ? document.querySelector(t) : t;
  n || (n = Yn()), Wn(n, e);
}
function zn() {
  const e = y("__activeElement"), t = y("__activeStep");
  e && (ht(e), Vn(), yt(e, t));
}
function Wn(e, t) {
  var n;
  const r = Date.now(), i = y("__activeStep"), s = y("__activeElement") || e, o = !s || s === e, u = e.id === "driver-dummy-element", c = s.id === "driver-dummy-element", d = E("animate"), p = t.onHighlightStarted || E("onHighlightStarted"), m = (t == null ? void 0 : t.onHighlighted) || E("onHighlighted"), l = (i == null ? void 0 : i.onDeselected) || E("onDeselected"), h = E(), f = y();
  !o && l && l(c ? void 0 : s, i, {
    config: h,
    state: f,
    driver: L()
  }), p && p(u ? void 0 : e, t, {
    config: h,
    state: f,
    driver: L()
  });
  const v = !o && d;
  let x = !1;
  Kn(), D("previousStep", i), D("previousElement", s), D("activeStep", t), D("activeElement", e);
  const N = () => {
    if (y("__transitionCallback") !== N)
      return;
    const b = Date.now() - r, A = 400 - b <= 400 / 2;
    t.popover && A && !x && v && (Ge(e, t), x = !0), E("animate") && b < 400 ? Un(b, 400, s, e) : (ht(e), m && m(u ? void 0 : e, t, {
      config: E(),
      state: y(),
      driver: L()
    }), D("__transitionCallback", void 0), D("__previousStep", i), D("__previousElement", s), D("__activeStep", t), D("__activeElement", e)), window.requestAnimationFrame(N);
  };
  D("__transitionCallback", N), window.requestAnimationFrame(N), pt(e), !v && t.popover && Ge(e, t), s.classList.remove("driver-active-element", "driver-no-interaction"), s.removeAttribute("aria-haspopup"), s.removeAttribute("aria-expanded"), s.removeAttribute("aria-controls"), ((n = t.disableActiveInteraction) != null ? n : E("disableActiveInteraction")) && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
}
function Jn() {
  var e;
  (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((t) => {
    t.classList.remove("driver-active-element", "driver-no-interaction"), t.removeAttribute("aria-haspopup"), t.removeAttribute("aria-expanded"), t.removeAttribute("aria-controls");
  });
}
function J() {
  const e = y("__resizeTimeout");
  e && window.cancelAnimationFrame(e), D("__resizeTimeout", window.requestAnimationFrame(zn));
}
function Qn(e) {
  var t;
  if (!y("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
    return;
  const n = y("__activeElement"), r = (t = y("popover")) == null ? void 0 : t.wrapper, i = dt([
    ...r ? [r] : [],
    ...n ? [n] : []
  ]), s = i[0], o = i[i.length - 1];
  if (e.preventDefault(), e.shiftKey) {
    const u = i[i.indexOf(document.activeElement) - 1] || o;
    u == null || u.focus();
  } else {
    const u = i[i.indexOf(document.activeElement) + 1] || s;
    u == null || u.focus();
  }
}
function vt(e) {
  var t;
  ((t = E("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? M("escapePress") : e.key === "ArrowRight" ? M("arrowRightPress") : e.key === "ArrowLeft" && M("arrowLeftPress"));
}
function gt(e, t, n) {
  const r = (i, s) => {
    const o = i.target;
    e.contains(o) && ((!n || n(o)) && (i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation()), s == null || s(i));
  };
  document.addEventListener("pointerdown", r, !0), document.addEventListener("mousedown", r, !0), document.addEventListener("pointerup", r, !0), document.addEventListener("mouseup", r, !0), document.addEventListener(
    "click",
    (i) => {
      r(i, t);
    },
    !0
  );
}
function Xn() {
  window.addEventListener("keyup", vt, !1), window.addEventListener("keydown", Qn, !1), window.addEventListener("resize", J), window.addEventListener("scroll", J);
}
function Zn() {
  window.removeEventListener("keyup", vt), window.removeEventListener("resize", J), window.removeEventListener("scroll", J);
}
function Kn() {
  const e = y("popover");
  e && (e.wrapper.style.display = "none");
}
function Ge(e, t) {
  var n, r;
  let i = y("popover");
  i && document.body.removeChild(i.wrapper), i = ti(), document.body.appendChild(i.wrapper);
  const {
    title: s,
    description: o,
    showButtons: u,
    disableButtons: c,
    showProgress: d,
    nextBtnText: p = E("nextBtnText") || "Next &rarr;",
    prevBtnText: m = E("prevBtnText") || "&larr; Previous",
    progressText: l = E("progressText") || "{current} of {total}"
  } = t.popover || {};
  i.nextButton.innerHTML = p, i.previousButton.innerHTML = m, i.progress.innerHTML = l, s ? (i.title.innerHTML = s, i.title.style.display = "block") : i.title.style.display = "none", o ? (i.description.innerHTML = o, i.description.style.display = "block") : i.description.style.display = "none";
  const h = u || E("showButtons"), f = d || E("showProgress") || !1, v = (h == null ? void 0 : h.includes("next")) || (h == null ? void 0 : h.includes("previous")) || f;
  i.closeButton.style.display = h.includes("close") ? "block" : "none", v ? (i.footer.style.display = "flex", i.progress.style.display = f ? "block" : "none", i.nextButton.style.display = h.includes("next") ? "block" : "none", i.previousButton.style.display = h.includes("previous") ? "block" : "none") : i.footer.style.display = "none";
  const x = c || E("disableButtons") || [];
  x != null && x.includes("next") && (i.nextButton.disabled = !0, i.nextButton.classList.add("driver-popover-btn-disabled")), x != null && x.includes("previous") && (i.previousButton.disabled = !0, i.previousButton.classList.add("driver-popover-btn-disabled")), x != null && x.includes("close") && (i.closeButton.disabled = !0, i.closeButton.classList.add("driver-popover-btn-disabled"));
  const N = i.wrapper;
  N.style.display = "block", N.style.left = "", N.style.top = "", N.style.bottom = "", N.style.right = "", N.id = "driver-popover-content", N.setAttribute("role", "dialog"), N.setAttribute("aria-labelledby", "driver-popover-title"), N.setAttribute("aria-describedby", "driver-popover-description");
  const b = i.arrow;
  b.className = "driver-popover-arrow";
  const A = ((n = t.popover) == null ? void 0 : n.popoverClass) || E("popoverClass") || "";
  N.className = `driver-popover ${A}`.trim(), gt(
    i.wrapper,
    (R) => {
      var Q, X, Z;
      const G = R.target, K = ((Q = t.popover) == null ? void 0 : Q.onNextClick) || E("onNextClick"), q = ((X = t.popover) == null ? void 0 : X.onPrevClick) || E("onPrevClick"), ee = ((Z = t.popover) == null ? void 0 : Z.onCloseClick) || E("onCloseClick");
      if (G.closest(".driver-popover-next-btn"))
        return K ? K(e, t, {
          config: E(),
          state: y(),
          driver: L()
        }) : M("nextClick");
      if (G.closest(".driver-popover-prev-btn"))
        return q ? q(e, t, {
          config: E(),
          state: y(),
          driver: L()
        }) : M("prevClick");
      if (G.closest(".driver-popover-close-btn"))
        return ee ? ee(e, t, {
          config: E(),
          state: y(),
          driver: L()
        }) : M("closeClick");
    },
    (R) => !(i != null && i.description.contains(R)) && !(i != null && i.title.contains(R)) && typeof R.className == "string" && R.className.includes("driver-popover")
  ), D("popover", i);
  const _ = ((r = t.popover) == null ? void 0 : r.onPopoverRender) || E("onPopoverRender");
  _ && _(i, {
    config: E(),
    state: y(),
    driver: L()
  }), yt(e, t), pt(N);
  const C = e.classList.contains("driver-dummy-element"), I = dt([N, ...C ? [] : [e]]);
  I.length > 0 && I[0].focus();
}
function Et() {
  const e = y("popover");
  if (!(e != null && e.wrapper))
    return;
  const t = e.wrapper.getBoundingClientRect(), n = E("stagePadding") || 0, r = E("popoverOffset") || 0;
  return {
    width: t.width + n + r,
    height: t.height + n + r,
    realWidth: t.width,
    realHeight: t.height
  };
}
function Ye(e, t) {
  const { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: s } = t;
  return e === "start" ? Math.max(
    Math.min(
      n.top - i,
      window.innerHeight - r.realHeight - s.width
    ),
    s.width
  ) : e === "end" ? Math.max(
    Math.min(
      n.top - (r == null ? void 0 : r.realHeight) + n.height + i,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - s.width
    ),
    s.width
  ) : e === "center" ? Math.max(
    Math.min(
      n.top + n.height / 2 - (r == null ? void 0 : r.realHeight) / 2,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - s.width
    ),
    s.width
  ) : 0;
}
function ze(e, t) {
  const { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: s } = t;
  return e === "start" ? Math.max(
    Math.min(
      n.left - i,
      window.innerWidth - r.realWidth - s.width
    ),
    s.width
  ) : e === "end" ? Math.max(
    Math.min(
      n.left - (r == null ? void 0 : r.realWidth) + n.width + i,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - s.width
    ),
    s.width
  ) : e === "center" ? Math.max(
    Math.min(
      n.left + n.width / 2 - (r == null ? void 0 : r.realWidth) / 2,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - s.width
    ),
    s.width
  ) : 0;
}
function yt(e, t) {
  const n = y("popover");
  if (!n)
    return;
  const { align: r = "start", side: i = "left" } = (t == null ? void 0 : t.popover) || {}, s = r, o = e.id === "driver-dummy-element" ? "over" : i, u = E("stagePadding") || 0, c = Et(), d = n.arrow.getBoundingClientRect(), p = e.getBoundingClientRect(), m = p.top - c.height;
  let l = m >= 0;
  const h = window.innerHeight - (p.bottom + c.height);
  let f = h >= 0;
  const v = p.left - c.width;
  let x = v >= 0;
  const N = window.innerWidth - (p.right + c.width);
  let b = N >= 0;
  const A = !l && !f && !x && !b;
  let _ = o;
  if (o === "top" && l ? b = x = f = !1 : o === "bottom" && f ? b = x = l = !1 : o === "left" && x ? b = l = f = !1 : o === "right" && b && (x = l = f = !1), o === "over") {
    const C = window.innerWidth / 2 - c.realWidth / 2, I = window.innerHeight / 2 - c.realHeight / 2;
    n.wrapper.style.left = `${C}px`, n.wrapper.style.right = "auto", n.wrapper.style.top = `${I}px`, n.wrapper.style.bottom = "auto";
  } else if (A) {
    const C = window.innerWidth / 2 - (c == null ? void 0 : c.realWidth) / 2, I = 10;
    n.wrapper.style.left = `${C}px`, n.wrapper.style.right = "auto", n.wrapper.style.bottom = `${I}px`, n.wrapper.style.top = "auto";
  } else if (x) {
    const C = Math.min(
      v,
      window.innerWidth - (c == null ? void 0 : c.realWidth) - d.width
    ), I = Ye(s, {
      elementDimensions: p,
      popoverDimensions: c,
      popoverPadding: u,
      popoverArrowDimensions: d
    });
    n.wrapper.style.left = `${C}px`, n.wrapper.style.top = `${I}px`, n.wrapper.style.bottom = "auto", n.wrapper.style.right = "auto", _ = "left";
  } else if (b) {
    const C = Math.min(
      N,
      window.innerWidth - (c == null ? void 0 : c.realWidth) - d.width
    ), I = Ye(s, {
      elementDimensions: p,
      popoverDimensions: c,
      popoverPadding: u,
      popoverArrowDimensions: d
    });
    n.wrapper.style.right = `${C}px`, n.wrapper.style.top = `${I}px`, n.wrapper.style.bottom = "auto", n.wrapper.style.left = "auto", _ = "right";
  } else if (l) {
    const C = Math.min(
      m,
      window.innerHeight - c.realHeight - d.width
    );
    let I = ze(s, {
      elementDimensions: p,
      popoverDimensions: c,
      popoverPadding: u,
      popoverArrowDimensions: d
    });
    n.wrapper.style.top = `${C}px`, n.wrapper.style.left = `${I}px`, n.wrapper.style.bottom = "auto", n.wrapper.style.right = "auto", _ = "top";
  } else if (f) {
    const C = Math.min(
      h,
      window.innerHeight - (c == null ? void 0 : c.realHeight) - d.width
    );
    let I = ze(s, {
      elementDimensions: p,
      popoverDimensions: c,
      popoverPadding: u,
      popoverArrowDimensions: d
    });
    n.wrapper.style.left = `${I}px`, n.wrapper.style.bottom = `${C}px`, n.wrapper.style.top = "auto", n.wrapper.style.right = "auto", _ = "bottom";
  }
  A ? n.arrow.classList.add("driver-popover-arrow-none") : ei(s, _, e);
}
function ei(e, t, n) {
  const r = y("popover");
  if (!r)
    return;
  const i = n.getBoundingClientRect(), s = Et(), o = r.arrow, u = s.width, c = window.innerWidth, d = i.width, p = i.left, m = s.height, l = window.innerHeight, h = i.top, f = i.height;
  o.className = "driver-popover-arrow";
  let v = t, x = e;
  if (t === "top" ? (p + d <= 0 ? (v = "right", x = "end") : p + d - u <= 0 && (v = "top", x = "start"), p >= c ? (v = "left", x = "end") : p + u >= c && (v = "top", x = "end")) : t === "bottom" ? (p + d <= 0 ? (v = "right", x = "start") : p + d - u <= 0 && (v = "bottom", x = "start"), p >= c ? (v = "left", x = "start") : p + u >= c && (v = "bottom", x = "end")) : t === "left" ? (h + f <= 0 ? (v = "bottom", x = "end") : h + f - m <= 0 && (v = "left", x = "start"), h >= l ? (v = "top", x = "end") : h + m >= l && (v = "left", x = "end")) : t === "right" && (h + f <= 0 ? (v = "bottom", x = "start") : h + f - m <= 0 && (v = "right", x = "start"), h >= l ? (v = "top", x = "start") : h + m >= l && (v = "right", x = "end")), !v)
    o.classList.add("driver-popover-arrow-none");
  else {
    o.classList.add(`driver-popover-arrow-side-${v}`), o.classList.add(`driver-popover-arrow-align-${x}`);
    const N = n.getBoundingClientRect(), b = o.getBoundingClientRect(), A = E("stagePadding") || 0, _ = N.left - A < window.innerWidth && N.right + A > 0 && N.top - A < window.innerHeight && N.bottom + A > 0;
    t === "bottom" && _ && (b.x > N.x && b.x + b.width < N.x + N.width ? r.wrapper.style.transform = "translateY(0)" : (o.classList.remove(`driver-popover-arrow-align-${x}`), o.classList.add("driver-popover-arrow-none"), r.wrapper.style.transform = `translateY(-${A / 2}px)`));
  }
}
function ti() {
  const e = document.createElement("div");
  e.classList.add("driver-popover");
  const t = document.createElement("div");
  t.classList.add("driver-popover-arrow");
  const n = document.createElement("header");
  n.id = "driver-popover-title", n.classList.add("driver-popover-title"), n.style.display = "none", n.innerText = "Popover Title";
  const r = document.createElement("div");
  r.id = "driver-popover-description", r.classList.add("driver-popover-description"), r.style.display = "none", r.innerText = "Popover description is here";
  const i = document.createElement("button");
  i.type = "button", i.classList.add("driver-popover-close-btn"), i.setAttribute("aria-label", "Close"), i.innerHTML = "&times;";
  const s = document.createElement("footer");
  s.classList.add("driver-popover-footer");
  const o = document.createElement("span");
  o.classList.add("driver-popover-progress-text"), o.innerText = "";
  const u = document.createElement("span");
  u.classList.add("driver-popover-navigation-btns");
  const c = document.createElement("button");
  c.type = "button", c.classList.add("driver-popover-prev-btn"), c.innerHTML = "&larr; Previous";
  const d = document.createElement("button");
  return d.type = "button", d.classList.add("driver-popover-next-btn"), d.innerHTML = "Next &rarr;", u.appendChild(c), u.appendChild(d), s.appendChild(o), s.appendChild(u), e.appendChild(i), e.appendChild(t), e.appendChild(n), e.appendChild(r), e.appendChild(s), {
    wrapper: e,
    arrow: t,
    title: n,
    description: r,
    footer: s,
    previousButton: c,
    nextButton: d,
    closeButton: i,
    footerButtons: u,
    progress: o
  };
}
function ni() {
  var e;
  const t = y("popover");
  t && ((e = t.wrapper.parentElement) == null || e.removeChild(t.wrapper));
}
function ii(e = {}) {
  ye(e);
  function t() {
    E("allowClose") && p();
  }
  function n() {
    const l = E("overlayClickBehavior");
    if (E("allowClose") && l === "close") {
      p();
      return;
    }
    if (typeof l == "function") {
      const h = y("__activeStep"), f = y("__activeElement");
      l(f, h, {
        config: E(),
        state: y(),
        driver: L()
      });
      return;
    }
    l === "nextStep" && r();
  }
  function r() {
    const l = y("activeIndex"), h = E("steps") || [];
    if (typeof l > "u")
      return;
    const f = l + 1;
    h[f] ? d(f) : p();
  }
  function i() {
    const l = y("activeIndex"), h = E("steps") || [];
    if (typeof l > "u")
      return;
    const f = l - 1;
    h[f] ? d(f) : p();
  }
  function s(l) {
    (E("steps") || [])[l] ? d(l) : p();
  }
  function o() {
    var l;
    if (y("__transitionCallback"))
      return;
    const h = y("activeIndex"), f = y("__activeStep"), v = y("__activeElement");
    if (typeof h > "u" || typeof f > "u" || typeof y("activeIndex") > "u")
      return;
    const x = ((l = f.popover) == null ? void 0 : l.onPrevClick) || E("onPrevClick");
    if (x)
      return x(v, f, {
        config: E(),
        state: y(),
        driver: L()
      });
    i();
  }
  function u() {
    var l;
    if (y("__transitionCallback"))
      return;
    const h = y("activeIndex"), f = y("__activeStep"), v = y("__activeElement");
    if (typeof h > "u" || typeof f > "u")
      return;
    const x = ((l = f.popover) == null ? void 0 : l.onNextClick) || E("onNextClick");
    if (x)
      return x(v, f, {
        config: E(),
        state: y(),
        driver: L()
      });
    r();
  }
  function c() {
    y("isInitialized") || (D("isInitialized", !0), document.body.classList.add("driver-active", E("animate") ? "driver-fade" : "driver-simple"), Xn(), ie("overlayClick", n), ie("escapePress", t), ie("arrowLeftPress", o), ie("arrowRightPress", u));
  }
  function d(l = 0) {
    var h, f, v, x, N, b, A, _;
    const C = E("steps");
    if (!C) {
      console.error("No steps to drive through"), p();
      return;
    }
    if (!C[l]) {
      p();
      return;
    }
    D("__activeOnDestroyed", document.activeElement), D("activeIndex", l);
    const I = C[l], R = C[l + 1], Q = C[l - 1], X = ((h = I.popover) == null ? void 0 : h.doneBtnText) || E("doneBtnText") || "Done", Z = E("allowClose"), G = typeof ((f = I.popover) == null ? void 0 : f.showProgress) < "u" ? (v = I.popover) == null ? void 0 : v.showProgress : E("showProgress"), K = (((x = I.popover) == null ? void 0 : x.progressText) || E("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${l + 1}`).replace("{{total}}", `${C.length}`), q = ((N = I.popover) == null ? void 0 : N.showButtons) || E("showButtons"), ee = [
      "next",
      "previous",
      ...Z ? ["close"] : []
    ].filter((wt) => !(q != null && q.length) || q.includes(wt)), xt = ((b = I.popover) == null ? void 0 : b.onNextClick) || E("onNextClick"), Tt = ((A = I.popover) == null ? void 0 : A.onPrevClick) || E("onPrevClick"), Nt = ((_ = I.popover) == null ? void 0 : _.onCloseClick) || E("onCloseClick");
    He({
      ...I,
      popover: {
        showButtons: ee,
        nextBtnText: R ? void 0 : X,
        disableButtons: [...Q ? [] : ["previous"]],
        showProgress: G,
        progressText: K,
        onNextClick: xt || (() => {
          R ? d(l + 1) : p();
        }),
        onPrevClick: Tt || (() => {
          d(l - 1);
        }),
        onCloseClick: Nt || (() => {
          p();
        }),
        ...(I == null ? void 0 : I.popover) || {}
      }
    });
  }
  function p(l = !0) {
    const h = y("__activeElement"), f = y("__activeStep"), v = y("__activeOnDestroyed"), x = E("onDestroyStarted");
    if (l && x) {
      const A = !h || (h == null ? void 0 : h.id) === "driver-dummy-element";
      x(A ? void 0 : h, f, {
        config: E(),
        state: y(),
        driver: L()
      });
      return;
    }
    const N = (f == null ? void 0 : f.onDeselected) || E("onDeselected"), b = E("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), Zn(), ni(), Jn(), Gn(), Bn(), je(), h && f) {
      const A = h.id === "driver-dummy-element";
      N && N(A ? void 0 : h, f, {
        config: E(),
        state: y(),
        driver: L()
      }), b && b(A ? void 0 : h, f, {
        config: E(),
        state: y(),
        driver: L()
      });
    }
    v && v.focus();
  }
  const m = {
    isActive: () => y("isInitialized") || !1,
    refresh: J,
    drive: (l = 0) => {
      c(), d(l);
    },
    setConfig: ye,
    setSteps: (l) => {
      je(), ye({
        ...E(),
        steps: l
      });
    },
    getConfig: E,
    getState: y,
    getActiveIndex: () => y("activeIndex"),
    isFirstStep: () => y("activeIndex") === 0,
    isLastStep: () => {
      const l = E("steps") || [], h = y("activeIndex");
      return h !== void 0 && h === l.length - 1;
    },
    getActiveStep: () => y("activeStep"),
    getActiveElement: () => y("activeElement"),
    getPreviousElement: () => y("previousElement"),
    getPreviousStep: () => y("previousStep"),
    moveNext: r,
    movePrevious: i,
    moveTo: s,
    hasNextStep: () => {
      const l = E("steps") || [], h = y("activeIndex");
      return h !== void 0 && !!l[h + 1];
    },
    hasPreviousStep: () => {
      const l = E("steps") || [], h = y("activeIndex");
      return h !== void 0 && !!l[h - 1];
    },
    highlight: (l) => {
      c(), He({
        ...l,
        popover: l.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...l.popover
        } : void 0
      });
    },
    destroy: () => {
      p(!1);
    }
  };
  return Fn(m), m;
}
function ri() {
  const { client: e, config: t } = lt(), [n, r] = F([]), [i, s] = F(!0), [o, u] = F(null), [c, d] = F(null), p = We(null), m = t.userId || "", l = z(async () => {
    if (m)
      try {
        s(!0), u(null);
        const v = await e.getAssignedGuides(m, t.schoolYear);
        r(v);
      } catch (v) {
        u(v instanceof Error ? v : new Error("Failed to fetch guides"));
      } finally {
        s(!1);
      }
  }, [e, m, t.schoolYear]);
  ce(() => {
    l();
  }, [l]), ce(() => () => {
    p.current && p.current.destroy();
  }, []);
  const h = z((v) => {
    const x = n.find((A) => A.id === v);
    if (!x) return;
    d(x);
    const N = x.steps.sort((A, _) => A.stepOrder - _.stepOrder).map((A) => ({
      element: A.elementSelector || void 0,
      popover: {
        title: A.title,
        description: A.description,
        side: A.side
      }
    }));
    p.current && p.current.destroy();
    const b = ii({
      showProgress: !0,
      steps: N,
      onDestroyed: () => {
        d(null), e.recordGuideCompletion(m, v).then(() => {
          r((A) => A.filter((_) => _.id !== v));
        });
      }
    });
    p.current = b, b.drive();
  }, [n, e, m]), f = z(async (v) => {
    m && (await e.recordGuideCompletion(m, v), r((x) => x.filter((N) => N.id !== v)));
  }, [e, m]);
  return {
    guides: n,
    isLoading: i,
    error: o,
    startGuide: h,
    dismissGuide: f,
    activeGuide: c,
    refresh: l
  };
}
function si({ handbook: e, onAcknowledge: t, isAcknowledging: n }) {
  return /* @__PURE__ */ S("div", { className: "guideops-modal-overlay", children: /* @__PURE__ */ xe("div", { className: "guideops-modal", children: [
    /* @__PURE__ */ xe("div", { className: "guideops-modal-header", children: [
      /* @__PURE__ */ S("h2", { className: "guideops-modal-title", children: e.title }),
      /* @__PURE__ */ S("p", { className: "guideops-modal-subtitle", children: "Please read and acknowledge the following before continuing." })
    ] }),
    /* @__PURE__ */ S("div", { className: "guideops-modal-content", children: e.contentUrl ? /* @__PURE__ */ S(
      "iframe",
      {
        src: e.contentUrl,
        title: e.title,
        className: "guideops-modal-iframe"
      }
    ) : e.contentHtml ? /* @__PURE__ */ S(
      "div",
      {
        className: "guideops-modal-html",
        dangerouslySetInnerHTML: { __html: e.contentHtml }
      }
    ) : /* @__PURE__ */ S("p", { className: "guideops-modal-empty", children: "No content available for this handbook." }) }),
    /* @__PURE__ */ S("div", { className: "guideops-modal-footer", children: /* @__PURE__ */ S(
      "button",
      {
        onClick: t,
        disabled: n,
        className: "guideops-acknowledge-btn",
        children: n ? "Processing..." : "I Acknowledge"
      }
    ) })
  ] }) });
}
function di({ children: e, fallback: t, loadingComponent: n }) {
  const { pendingHandbooks: r, isLoading: i, acknowledge: s, hasAllAcknowledged: o } = Pn(), [u, c] = F(!1);
  if (i)
    return /* @__PURE__ */ S(he, { children: n || t || /* @__PURE__ */ S(oi, {}) });
  if (o)
    return /* @__PURE__ */ S(he, { children: e });
  const d = r[0];
  return d ? /* @__PURE__ */ S(
    si,
    {
      handbook: d,
      onAcknowledge: async () => {
        c(!0);
        try {
          await s(d.id);
        } finally {
          c(!1);
        }
      },
      isAcknowledging: u
    }
  ) : /* @__PURE__ */ S(he, { children: e });
}
function oi() {
  return /* @__PURE__ */ xe("div", { className: "guideops-loading", children: [
    /* @__PURE__ */ S("div", { className: "guideops-spinner" }),
    /* @__PURE__ */ S("p", { children: "Loading..." })
  ] });
}
function pi({ autoStart: e = !1 }) {
  const { guides: t, startGuide: n, activeGuide: r } = ri(), i = We(!1);
  return ce(() => {
    if (e && t.length > 0 && !r && !i.current) {
      i.current = !0;
      const s = setTimeout(() => {
        n(t[0].id);
      }, 500);
      return () => clearTimeout(s);
    }
  }, [e, t, r, n]), null;
}
export {
  ui as GuideOpsProvider,
  pi as GuideRenderer,
  di as HandbookGate,
  si as HandbookModal,
  ri as useGuides,
  Pn as useHandbookAcknowledgment
};
