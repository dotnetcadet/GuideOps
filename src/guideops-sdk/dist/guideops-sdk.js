var to = Object.defineProperty;
var no = (n, e, t) => e in n ? to(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => no(n, typeof e != "symbol" ? e + "" : e, t);
import { jsx as q, jsxs as xn, Fragment as rn } from "react/jsx-runtime";
import * as we from "react";
import { useMemo as vi, createContext as ro, useContext as io, useState as ue, useCallback as Xe, useEffect as Pt, useRef as gi } from "react";
function Tt(n, e) {
  if (!!!n)
    throw new Error(e);
}
function so(n) {
  return typeof n == "object" && n !== null;
}
function oo(n, e) {
  if (!!!n)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const ao = /\r\n|[\n\r]/g;
function Tn(n, e) {
  let t = 0, r = 1;
  for (const i of n.body.matchAll(ao)) {
    if (typeof i.index == "number" || oo(!1), i.index >= e)
      break;
    t = i.index + i[0].length, r += 1;
  }
  return {
    line: r,
    column: e + 1 - t
  };
}
function co(n) {
  return bi(
    n.source,
    Tn(n.source, n.start)
  );
}
function bi(n, e) {
  const t = n.locationOffset.column - 1, r = "".padStart(t) + n.body, i = e.line - 1, s = n.locationOffset.line - 1, o = e.line + s, a = e.line === 1 ? t : 0, c = e.column + a, l = `${n.name}:${o}:${c}
`, u = r.split(/\r\n|[\n\r]/g), d = u[i];
  if (d.length > 120) {
    const f = Math.floor(c / 80), h = c % 80, p = [];
    for (let y = 0; y < d.length; y += 80)
      p.push(d.slice(y, y + 80));
    return l + hr([
      [`${o} |`, p[0]],
      ...p.slice(1, f + 1).map((y) => ["|", y]),
      ["|", "^".padStart(h)],
      ["|", p[f + 1]]
    ]);
  }
  return l + hr([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, u[i - 1]],
    [`${o} |`, d],
    ["|", "^".padStart(c)],
    [`${o + 1} |`, u[i + 1]]
  ]);
}
function hr(n) {
  const e = n.filter(([r, i]) => i !== void 0), t = Math.max(...e.map(([r]) => r.length));
  return e.map(([r, i]) => r.padStart(t) + (i ? " " + i : "")).join(`
`);
}
function lo(n) {
  const e = n[0];
  return e == null || "kind" in e || "length" in e ? {
    nodes: e,
    source: n[1],
    positions: n[2],
    path: n[3],
    originalError: n[4],
    extensions: n[5]
  } : e;
}
class zn extends Error {
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
  constructor(e, ...t) {
    var r, i, s;
    const { nodes: o, source: a, positions: c, path: l, originalError: u, extensions: d } = lo(t);
    super(e), this.name = "GraphQLError", this.path = l ?? void 0, this.originalError = u ?? void 0, this.nodes = dr(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const f = dr(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((p) => p.loc).filter((p) => p != null)
    );
    this.source = a ?? (f == null || (i = f[0]) === null || i === void 0 ? void 0 : i.source), this.positions = c ?? (f == null ? void 0 : f.map((p) => p.start)), this.locations = c && a ? c.map((p) => Tn(a, p)) : f == null ? void 0 : f.map((p) => Tn(p.source, p.start));
    const h = so(
      u == null ? void 0 : u.extensions
    ) ? u == null ? void 0 : u.extensions : void 0;
    this.extensions = (s = d ?? h) !== null && s !== void 0 ? s : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
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
    }), u != null && u.stack ? Object.defineProperty(this, "stack", {
      value: u.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, zn) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (const t of this.nodes)
        t.loc && (e += `

` + co(t.loc));
    else if (this.source && this.locations)
      for (const t of this.locations)
        e += `

` + bi(this.source, t);
    return e;
  }
  toJSON() {
    const e = {
      message: this.message
    };
    return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
  }
}
function dr(n) {
  return n === void 0 || n.length === 0 ? void 0 : n;
}
function j(n, e, t) {
  return new zn(`Syntax Error: ${t}`, {
    source: n,
    positions: [e]
  });
}
class uo {
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
  constructor(e, t, r) {
    this.start = e.start, this.end = t.end, this.startToken = e, this.endToken = t, this.source = r;
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
class wi {
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
  constructor(e, t, r, i, s, o) {
    this.kind = e, this.start = t, this.end = r, this.line = i, this.column = s, this.value = o, this.prev = null, this.next = null;
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
const Ei = {
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
}, fo = new Set(Object.keys(Ei));
function pr(n) {
  const e = n == null ? void 0 : n.kind;
  return typeof e == "string" && fo.has(e);
}
var J;
(function(n) {
  n.QUERY = "query", n.MUTATION = "mutation", n.SUBSCRIPTION = "subscription";
})(J || (J = {}));
var Cn;
(function(n) {
  n.QUERY = "QUERY", n.MUTATION = "MUTATION", n.SUBSCRIPTION = "SUBSCRIPTION", n.FIELD = "FIELD", n.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", n.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", n.INLINE_FRAGMENT = "INLINE_FRAGMENT", n.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", n.SCHEMA = "SCHEMA", n.SCALAR = "SCALAR", n.OBJECT = "OBJECT", n.FIELD_DEFINITION = "FIELD_DEFINITION", n.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", n.INTERFACE = "INTERFACE", n.UNION = "UNION", n.ENUM = "ENUM", n.ENUM_VALUE = "ENUM_VALUE", n.INPUT_OBJECT = "INPUT_OBJECT", n.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(Cn || (Cn = {}));
var S;
(function(n) {
  n.NAME = "Name", n.DOCUMENT = "Document", n.OPERATION_DEFINITION = "OperationDefinition", n.VARIABLE_DEFINITION = "VariableDefinition", n.SELECTION_SET = "SelectionSet", n.FIELD = "Field", n.ARGUMENT = "Argument", n.FRAGMENT_SPREAD = "FragmentSpread", n.INLINE_FRAGMENT = "InlineFragment", n.FRAGMENT_DEFINITION = "FragmentDefinition", n.VARIABLE = "Variable", n.INT = "IntValue", n.FLOAT = "FloatValue", n.STRING = "StringValue", n.BOOLEAN = "BooleanValue", n.NULL = "NullValue", n.ENUM = "EnumValue", n.LIST = "ListValue", n.OBJECT = "ObjectValue", n.OBJECT_FIELD = "ObjectField", n.DIRECTIVE = "Directive", n.NAMED_TYPE = "NamedType", n.LIST_TYPE = "ListType", n.NON_NULL_TYPE = "NonNullType", n.SCHEMA_DEFINITION = "SchemaDefinition", n.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", n.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", n.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", n.FIELD_DEFINITION = "FieldDefinition", n.INPUT_VALUE_DEFINITION = "InputValueDefinition", n.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", n.UNION_TYPE_DEFINITION = "UnionTypeDefinition", n.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", n.ENUM_VALUE_DEFINITION = "EnumValueDefinition", n.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", n.DIRECTIVE_DEFINITION = "DirectiveDefinition", n.SCHEMA_EXTENSION = "SchemaExtension", n.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", n.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", n.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", n.UNION_TYPE_EXTENSION = "UnionTypeExtension", n.ENUM_TYPE_EXTENSION = "EnumTypeExtension", n.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension", n.TYPE_COORDINATE = "TypeCoordinate", n.MEMBER_COORDINATE = "MemberCoordinate", n.ARGUMENT_COORDINATE = "ArgumentCoordinate", n.DIRECTIVE_COORDINATE = "DirectiveCoordinate", n.DIRECTIVE_ARGUMENT_COORDINATE = "DirectiveArgumentCoordinate";
})(S || (S = {}));
function _n(n) {
  return n === 9 || n === 32;
}
function rt(n) {
  return n >= 48 && n <= 57;
}
function ki(n) {
  return n >= 97 && n <= 122 || // A-Z
  n >= 65 && n <= 90;
}
function Si(n) {
  return ki(n) || n === 95;
}
function ho(n) {
  return ki(n) || rt(n) || n === 95;
}
function po(n) {
  var e;
  let t = Number.MAX_SAFE_INTEGER, r = null, i = -1;
  for (let o = 0; o < n.length; ++o) {
    var s;
    const a = n[o], c = mo(a);
    c !== a.length && (r = (s = r) !== null && s !== void 0 ? s : o, i = o, o !== 0 && c < t && (t = c));
  }
  return n.map((o, a) => a === 0 ? o : o.slice(t)).slice(
    (e = r) !== null && e !== void 0 ? e : 0,
    i + 1
  );
}
function mo(n) {
  let e = 0;
  for (; e < n.length && _n(n.charCodeAt(e)); )
    ++e;
  return e;
}
function yo(n, e) {
  const t = n.replace(/"""/g, '\\"""'), r = t.split(/\r\n|[\n\r]/g), i = r.length === 1, s = r.length > 1 && r.slice(1).every((h) => h.length === 0 || _n(h.charCodeAt(0))), o = t.endsWith('\\"""'), a = n.endsWith('"') && !o, c = n.endsWith("\\"), l = a || c, u = (
    // add leading and trailing new lines only if it improves readability
    !i || n.length > 70 || l || s || o
  );
  let d = "";
  const f = i && _n(n.charCodeAt(0));
  return (u && !f || s) && (d += `
`), d += t, (u || l) && (d += `
`), '"""' + d + '"""';
}
var b;
(function(n) {
  n.SOF = "<SOF>", n.EOF = "<EOF>", n.BANG = "!", n.DOLLAR = "$", n.AMP = "&", n.PAREN_L = "(", n.PAREN_R = ")", n.DOT = ".", n.SPREAD = "...", n.COLON = ":", n.EQUALS = "=", n.AT = "@", n.BRACKET_L = "[", n.BRACKET_R = "]", n.BRACE_L = "{", n.PIPE = "|", n.BRACE_R = "}", n.NAME = "Name", n.INT = "Int", n.FLOAT = "Float", n.STRING = "String", n.BLOCK_STRING = "BlockString", n.COMMENT = "Comment";
})(b || (b = {}));
class vo {
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
  constructor(e) {
    const t = new wi(b.SOF, 0, 0, 0, 0);
    this.source = e, this.lastToken = t, this.token = t, this.line = 1, this.lineStart = 0;
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
    let e = this.token;
    if (e.kind !== b.EOF)
      do
        if (e.next)
          e = e.next;
        else {
          const t = bo(this, e.end);
          e.next = t, t.prev = e, e = t;
        }
      while (e.kind === b.COMMENT);
    return e;
  }
}
function go(n) {
  return n === b.BANG || n === b.DOLLAR || n === b.AMP || n === b.PAREN_L || n === b.PAREN_R || n === b.DOT || n === b.SPREAD || n === b.COLON || n === b.EQUALS || n === b.AT || n === b.BRACKET_L || n === b.BRACKET_R || n === b.BRACE_L || n === b.PIPE || n === b.BRACE_R;
}
function qe(n) {
  return n >= 0 && n <= 55295 || n >= 57344 && n <= 1114111;
}
function $t(n, e) {
  return Oi(n.charCodeAt(e)) && xi(n.charCodeAt(e + 1));
}
function Oi(n) {
  return n >= 55296 && n <= 56319;
}
function xi(n) {
  return n >= 56320 && n <= 57343;
}
function Se(n, e) {
  const t = n.source.body.codePointAt(e);
  if (t === void 0)
    return b.EOF;
  if (t >= 32 && t <= 126) {
    const r = String.fromCodePoint(t);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + t.toString(16).toUpperCase().padStart(4, "0");
}
function L(n, e, t, r, i) {
  const s = n.line, o = 1 + t - n.lineStart;
  return new wi(e, t, r, s, o, i);
}
function bo(n, e) {
  const t = n.source.body, r = t.length;
  let i = e;
  for (; i < r; ) {
    const s = t.charCodeAt(i);
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
        ++i, ++n.line, n.lineStart = i;
        continue;
      case 13:
        t.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++n.line, n.lineStart = i;
        continue;
      // Comment
      case 35:
        return wo(n, i);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return L(n, b.BANG, i, i + 1);
      case 36:
        return L(n, b.DOLLAR, i, i + 1);
      case 38:
        return L(n, b.AMP, i, i + 1);
      case 40:
        return L(n, b.PAREN_L, i, i + 1);
      case 41:
        return L(n, b.PAREN_R, i, i + 1);
      case 46:
        if (t.charCodeAt(i + 1) === 46 && t.charCodeAt(i + 2) === 46)
          return L(n, b.SPREAD, i, i + 3);
        break;
      case 58:
        return L(n, b.COLON, i, i + 1);
      case 61:
        return L(n, b.EQUALS, i, i + 1);
      case 64:
        return L(n, b.AT, i, i + 1);
      case 91:
        return L(n, b.BRACKET_L, i, i + 1);
      case 93:
        return L(n, b.BRACKET_R, i, i + 1);
      case 123:
        return L(n, b.BRACE_L, i, i + 1);
      case 124:
        return L(n, b.PIPE, i, i + 1);
      case 125:
        return L(n, b.BRACE_R, i, i + 1);
      // StringValue
      case 34:
        return t.charCodeAt(i + 1) === 34 && t.charCodeAt(i + 2) === 34 ? To(n, i) : ko(n, i);
    }
    if (rt(s) || s === 45)
      return Eo(n, i, s);
    if (Si(s))
      return Co(n, i);
    throw j(
      n.source,
      i,
      s === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : qe(s) || $t(t, i) ? `Unexpected character: ${Se(n, i)}.` : `Invalid character: ${Se(n, i)}.`
    );
  }
  return L(n, b.EOF, r, r);
}
function wo(n, e) {
  const t = n.source.body, r = t.length;
  let i = e + 1;
  for (; i < r; ) {
    const s = t.charCodeAt(i);
    if (s === 10 || s === 13)
      break;
    if (qe(s))
      ++i;
    else if ($t(t, i))
      i += 2;
    else
      break;
  }
  return L(
    n,
    b.COMMENT,
    e,
    i,
    t.slice(e + 1, i)
  );
}
function Eo(n, e, t) {
  const r = n.source.body;
  let i = e, s = t, o = !1;
  if (s === 45 && (s = r.charCodeAt(++i)), s === 48) {
    if (s = r.charCodeAt(++i), rt(s))
      throw j(
        n.source,
        i,
        `Invalid number, unexpected digit after 0: ${Se(
          n,
          i
        )}.`
      );
  } else
    i = sn(n, i, s), s = r.charCodeAt(i);
  if (s === 46 && (o = !0, s = r.charCodeAt(++i), i = sn(n, i, s), s = r.charCodeAt(i)), (s === 69 || s === 101) && (o = !0, s = r.charCodeAt(++i), (s === 43 || s === 45) && (s = r.charCodeAt(++i)), i = sn(n, i, s), s = r.charCodeAt(i)), s === 46 || Si(s))
    throw j(
      n.source,
      i,
      `Invalid number, expected digit but got: ${Se(
        n,
        i
      )}.`
    );
  return L(
    n,
    o ? b.FLOAT : b.INT,
    e,
    i,
    r.slice(e, i)
  );
}
function sn(n, e, t) {
  if (!rt(t))
    throw j(
      n.source,
      e,
      `Invalid number, expected digit but got: ${Se(
        n,
        e
      )}.`
    );
  const r = n.source.body;
  let i = e + 1;
  for (; rt(r.charCodeAt(i)); )
    ++i;
  return i;
}
function ko(n, e) {
  const t = n.source.body, r = t.length;
  let i = e + 1, s = i, o = "";
  for (; i < r; ) {
    const a = t.charCodeAt(i);
    if (a === 34)
      return o += t.slice(s, i), L(n, b.STRING, e, i + 1, o);
    if (a === 92) {
      o += t.slice(s, i);
      const c = t.charCodeAt(i + 1) === 117 ? t.charCodeAt(i + 2) === 123 ? So(n, i) : Oo(n, i) : xo(n, i);
      o += c.value, i += c.size, s = i;
      continue;
    }
    if (a === 10 || a === 13)
      break;
    if (qe(a))
      ++i;
    else if ($t(t, i))
      i += 2;
    else
      throw j(
        n.source,
        i,
        `Invalid character within String: ${Se(
          n,
          i
        )}.`
      );
  }
  throw j(n.source, i, "Unterminated string.");
}
function So(n, e) {
  const t = n.source.body;
  let r = 0, i = 3;
  for (; i < 12; ) {
    const s = t.charCodeAt(e + i++);
    if (s === 125) {
      if (i < 5 || !qe(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: i
      };
    }
    if (r = r << 4 | He(s), r < 0)
      break;
  }
  throw j(
    n.source,
    e,
    `Invalid Unicode escape sequence: "${t.slice(
      e,
      e + i
    )}".`
  );
}
function Oo(n, e) {
  const t = n.source.body, r = mr(t, e + 2);
  if (qe(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Oi(r) && t.charCodeAt(e + 6) === 92 && t.charCodeAt(e + 7) === 117) {
    const i = mr(t, e + 8);
    if (xi(i))
      return {
        value: String.fromCodePoint(r, i),
        size: 12
      };
  }
  throw j(
    n.source,
    e,
    `Invalid Unicode escape sequence: "${t.slice(e, e + 6)}".`
  );
}
function mr(n, e) {
  return He(n.charCodeAt(e)) << 12 | He(n.charCodeAt(e + 1)) << 8 | He(n.charCodeAt(e + 2)) << 4 | He(n.charCodeAt(e + 3));
}
function He(n) {
  return n >= 48 && n <= 57 ? n - 48 : n >= 65 && n <= 70 ? n - 55 : n >= 97 && n <= 102 ? n - 87 : -1;
}
function xo(n, e) {
  const t = n.source.body;
  switch (t.charCodeAt(e + 1)) {
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
  throw j(
    n.source,
    e,
    `Invalid character escape sequence: "${t.slice(
      e,
      e + 2
    )}".`
  );
}
function To(n, e) {
  const t = n.source.body, r = t.length;
  let i = n.lineStart, s = e + 3, o = s, a = "";
  const c = [];
  for (; s < r; ) {
    const l = t.charCodeAt(s);
    if (l === 34 && t.charCodeAt(s + 1) === 34 && t.charCodeAt(s + 2) === 34) {
      a += t.slice(o, s), c.push(a);
      const u = L(
        n,
        b.BLOCK_STRING,
        e,
        s + 3,
        // Return a string of the lines joined with U+000A.
        po(c).join(`
`)
      );
      return n.line += c.length - 1, n.lineStart = i, u;
    }
    if (l === 92 && t.charCodeAt(s + 1) === 34 && t.charCodeAt(s + 2) === 34 && t.charCodeAt(s + 3) === 34) {
      a += t.slice(o, s), o = s + 1, s += 4;
      continue;
    }
    if (l === 10 || l === 13) {
      a += t.slice(o, s), c.push(a), l === 13 && t.charCodeAt(s + 1) === 10 ? s += 2 : ++s, a = "", o = s, i = s;
      continue;
    }
    if (qe(l))
      ++s;
    else if ($t(t, s))
      s += 2;
    else
      throw j(
        n.source,
        s,
        `Invalid character within String: ${Se(
          n,
          s
        )}.`
      );
  }
  throw j(n.source, s, "Unterminated string.");
}
function Co(n, e) {
  const t = n.source.body, r = t.length;
  let i = e + 1;
  for (; i < r; ) {
    const s = t.charCodeAt(i);
    if (ho(s))
      ++i;
    else
      break;
  }
  return L(
    n,
    b.NAME,
    e,
    i,
    t.slice(e, i)
  );
}
const _o = 10, Ti = 2;
function $n(n) {
  return Qt(n, []);
}
function Qt(n, e) {
  switch (typeof n) {
    case "string":
      return JSON.stringify(n);
    case "function":
      return n.name ? `[function ${n.name}]` : "[function]";
    case "object":
      return No(n, e);
    default:
      return String(n);
  }
}
function No(n, e) {
  if (n === null)
    return "null";
  if (e.includes(n))
    return "[Circular]";
  const t = [...e, n];
  if (Io(n)) {
    const r = n.toJSON();
    if (r !== n)
      return typeof r == "string" ? r : Qt(r, t);
  } else if (Array.isArray(n))
    return Do(n, t);
  return Ao(n, t);
}
function Io(n) {
  return typeof n.toJSON == "function";
}
function Ao(n, e) {
  const t = Object.entries(n);
  return t.length === 0 ? "{}" : e.length > Ti ? "[" + Ro(n) + "]" : "{ " + t.map(
    ([i, s]) => i + ": " + Qt(s, e)
  ).join(", ") + " }";
}
function Do(n, e) {
  if (n.length === 0)
    return "[]";
  if (e.length > Ti)
    return "[Array]";
  const t = Math.min(_o, n.length), r = n.length - t, i = [];
  for (let s = 0; s < t; ++s)
    i.push(Qt(n[s], e));
  return r === 1 ? i.push("... 1 more item") : r > 1 && i.push(`... ${r} more items`), "[" + i.join(", ") + "]";
}
function Ro(n) {
  const e = Object.prototype.toString.call(n).replace(/^\[object /, "").replace(/]$/, "");
  if (e === "Object" && typeof n.constructor == "function") {
    const t = n.constructor.name;
    if (typeof t == "string" && t !== "")
      return t;
  }
  return e;
}
const Fo = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production", Po = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Fo ? function(e, t) {
    return e instanceof t;
  } : function(e, t) {
    if (e instanceof t)
      return !0;
    if (typeof e == "object" && e !== null) {
      var r;
      const i = t.prototype[Symbol.toStringTag], s = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in e ? e[Symbol.toStringTag] : (r = e.constructor) === null || r === void 0 ? void 0 : r.name
      );
      if (i === s) {
        const o = $n(e);
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
class Ci {
  constructor(e, t = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof e == "string" || Tt(!1, `Body must be a string. Received: ${$n(e)}.`), this.body = e, this.name = t, this.locationOffset = r, this.locationOffset.line > 0 || Tt(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Tt(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Mo(n) {
  return Po(n, Ci);
}
function Lo(n, e) {
  const t = new jo(n, e), r = t.parseDocument();
  return Object.defineProperty(r, "tokenCount", {
    enumerable: !1,
    value: t.tokenCount
  }), r;
}
class jo {
  constructor(e, t = {}) {
    const { lexer: r, ...i } = t;
    if (r)
      this._lexer = r;
    else {
      const s = Mo(e) ? e : new Ci(e);
      this._lexer = new vo(s);
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
    const e = this.expectToken(b.NAME);
    return this.node(e, {
      kind: S.NAME,
      value: e.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: S.DOCUMENT,
      definitions: this.many(
        b.SOF,
        this.parseDefinition,
        b.EOF
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
    if (this.peek(b.BRACE_L))
      return this.parseOperationDefinition();
    const e = this.peekDescription(), t = e ? this._lexer.lookahead() : this._lexer.token;
    if (e && t.kind === b.BRACE_L)
      throw j(
        this._lexer.source,
        this._lexer.token.start,
        "Unexpected description, descriptions are not supported on shorthand queries."
      );
    if (t.kind === b.NAME) {
      switch (t.value) {
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
      switch (t.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
      }
      if (e)
        throw j(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, only GraphQL definitions support descriptions."
        );
      switch (t.value) {
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(t);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const e = this._lexer.token;
    if (this.peek(b.BRACE_L))
      return this.node(e, {
        kind: S.OPERATION_DEFINITION,
        operation: J.QUERY,
        description: void 0,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const t = this.parseDescription(), r = this.parseOperationType();
    let i;
    return this.peek(b.NAME) && (i = this.parseName()), this.node(e, {
      kind: S.OPERATION_DEFINITION,
      operation: r,
      description: t,
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
    const e = this.expectToken(b.NAME);
    switch (e.value) {
      case "query":
        return J.QUERY;
      case "mutation":
        return J.MUTATION;
      case "subscription":
        return J.SUBSCRIPTION;
    }
    throw this.unexpected(e);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      b.PAREN_L,
      this.parseVariableDefinition,
      b.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: S.VARIABLE_DEFINITION,
      description: this.parseDescription(),
      variable: this.parseVariable(),
      type: (this.expectToken(b.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(b.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const e = this._lexer.token;
    return this.expectToken(b.DOLLAR), this.node(e, {
      kind: S.VARIABLE,
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
      kind: S.SELECTION_SET,
      selections: this.many(
        b.BRACE_L,
        this.parseSelection,
        b.BRACE_R
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
    return this.peek(b.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const e = this._lexer.token, t = this.parseName();
    let r, i;
    return this.expectOptionalToken(b.COLON) ? (r = t, i = this.parseName()) : i = t, this.node(e, {
      kind: S.FIELD,
      alias: r,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(b.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(e) {
    const t = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(b.PAREN_L, t, b.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(e = !1) {
    const t = this._lexer.token, r = this.parseName();
    return this.expectToken(b.COLON), this.node(t, {
      kind: S.ARGUMENT,
      name: r,
      value: this.parseValueLiteral(e)
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
    const e = this._lexer.token;
    this.expectToken(b.SPREAD);
    const t = this.expectOptionalKeyword("on");
    return !t && this.peek(b.NAME) ? this.node(e, {
      kind: S.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(e, {
      kind: S.INLINE_FRAGMENT,
      typeCondition: t ? this.parseNamedType() : void 0,
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
    const e = this._lexer.token, t = this.parseDescription();
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
      kind: S.FRAGMENT_DEFINITION,
      description: t,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(e, {
      kind: S.FRAGMENT_DEFINITION,
      description: t,
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
  parseValueLiteral(e) {
    const t = this._lexer.token;
    switch (t.kind) {
      case b.BRACKET_L:
        return this.parseList(e);
      case b.BRACE_L:
        return this.parseObject(e);
      case b.INT:
        return this.advanceLexer(), this.node(t, {
          kind: S.INT,
          value: t.value
        });
      case b.FLOAT:
        return this.advanceLexer(), this.node(t, {
          kind: S.FLOAT,
          value: t.value
        });
      case b.STRING:
      case b.BLOCK_STRING:
        return this.parseStringLiteral();
      case b.NAME:
        switch (this.advanceLexer(), t.value) {
          case "true":
            return this.node(t, {
              kind: S.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(t, {
              kind: S.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(t, {
              kind: S.NULL
            });
          default:
            return this.node(t, {
              kind: S.ENUM,
              value: t.value
            });
        }
      case b.DOLLAR:
        if (e)
          if (this.expectToken(b.DOLLAR), this._lexer.token.kind === b.NAME) {
            const r = this._lexer.token.value;
            throw j(
              this._lexer.source,
              t.start,
              `Unexpected variable "$${r}" in constant value.`
            );
          } else
            throw this.unexpected(t);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const e = this._lexer.token;
    return this.advanceLexer(), this.node(e, {
      kind: S.STRING,
      value: e.value,
      block: e.kind === b.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(e) {
    const t = () => this.parseValueLiteral(e);
    return this.node(this._lexer.token, {
      kind: S.LIST,
      values: this.any(b.BRACKET_L, t, b.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(e) {
    const t = () => this.parseObjectField(e);
    return this.node(this._lexer.token, {
      kind: S.OBJECT,
      fields: this.any(b.BRACE_L, t, b.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(e) {
    const t = this._lexer.token, r = this.parseName();
    return this.expectToken(b.COLON), this.node(t, {
      kind: S.OBJECT_FIELD,
      name: r,
      value: this.parseValueLiteral(e)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(e) {
    const t = [];
    for (; this.peek(b.AT); )
      t.push(this.parseDirective(e));
    return t;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(e) {
    const t = this._lexer.token;
    return this.expectToken(b.AT), this.node(t, {
      kind: S.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(e)
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
    const e = this._lexer.token;
    let t;
    if (this.expectOptionalToken(b.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(b.BRACKET_R), t = this.node(e, {
        kind: S.LIST_TYPE,
        type: r
      });
    } else
      t = this.parseNamedType();
    return this.expectOptionalToken(b.BANG) ? this.node(e, {
      kind: S.NON_NULL_TYPE,
      type: t
    }) : t;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: S.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(b.STRING) || this.peek(b.BLOCK_STRING);
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
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("schema");
    const r = this.parseConstDirectives(), i = this.many(
      b.BRACE_L,
      this.parseOperationTypeDefinition,
      b.BRACE_R
    );
    return this.node(e, {
      kind: S.SCHEMA_DEFINITION,
      description: t,
      directives: r,
      operationTypes: i
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const e = this._lexer.token, t = this.parseOperationType();
    this.expectToken(b.COLON);
    const r = this.parseNamedType();
    return this.node(e, {
      kind: S.OPERATION_TYPE_DEFINITION,
      operation: t,
      type: r
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("scalar");
    const r = this.parseName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: S.SCALAR_TYPE_DEFINITION,
      description: t,
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
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("type");
    const r = this.parseName(), i = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(e, {
      kind: S.OBJECT_TYPE_DEFINITION,
      description: t,
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(b.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      b.BRACE_L,
      this.parseFieldDefinition,
      b.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const e = this._lexer.token, t = this.parseDescription(), r = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(b.COLON);
    const s = this.parseTypeReference(), o = this.parseConstDirectives();
    return this.node(e, {
      kind: S.FIELD_DEFINITION,
      description: t,
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
      b.PAREN_L,
      this.parseInputValueDef,
      b.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const e = this._lexer.token, t = this.parseDescription(), r = this.parseName();
    this.expectToken(b.COLON);
    const i = this.parseTypeReference();
    let s;
    this.expectOptionalToken(b.EQUALS) && (s = this.parseConstValueLiteral());
    const o = this.parseConstDirectives();
    return this.node(e, {
      kind: S.INPUT_VALUE_DEFINITION,
      description: t,
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
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("interface");
    const r = this.parseName(), i = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), o = this.parseFieldsDefinition();
    return this.node(e, {
      kind: S.INTERFACE_TYPE_DEFINITION,
      description: t,
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
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("union");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: S.UNION_TYPE_DEFINITION,
      description: t,
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
    return this.expectOptionalToken(b.EQUALS) ? this.delimitedMany(b.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("enum");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: S.ENUM_TYPE_DEFINITION,
      description: t,
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
      b.BRACE_L,
      this.parseEnumValueDefinition,
      b.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const e = this._lexer.token, t = this.parseDescription(), r = this.parseEnumValueName(), i = this.parseConstDirectives();
    return this.node(e, {
      kind: S.ENUM_VALUE_DEFINITION,
      description: t,
      name: r,
      directives: i
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw j(
        this._lexer.source,
        this._lexer.token.start,
        `${kt(
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
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("input");
    const r = this.parseName(), i = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: S.INPUT_OBJECT_TYPE_DEFINITION,
      description: t,
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
      b.BRACE_L,
      this.parseInputValueDef,
      b.BRACE_R
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
    const e = this._lexer.lookahead();
    if (e.kind === b.NAME)
      switch (e.value) {
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
    throw this.unexpected(e);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const t = this.parseConstDirectives(), r = this.optionalMany(
      b.BRACE_L,
      this.parseOperationTypeDefinition,
      b.BRACE_R
    );
    if (t.length === 0 && r.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: S.SCHEMA_EXTENSION,
      directives: t,
      operationTypes: r
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const t = this.parseName(), r = this.parseConstDirectives();
    if (r.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: S.SCALAR_TYPE_EXTENSION,
      name: t,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const t = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    if (r.length === 0 && i.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: S.OBJECT_TYPE_EXTENSION,
      name: t,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const t = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
    if (r.length === 0 && i.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: S.INTERFACE_TYPE_EXTENSION,
      name: t,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const t = this.parseName(), r = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: S.UNION_TYPE_EXTENSION,
      name: t,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const t = this.parseName(), r = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: S.ENUM_TYPE_EXTENSION,
      name: t,
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
    const e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const t = this.parseName(), r = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    if (r.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: S.INPUT_OBJECT_TYPE_EXTENSION,
      name: t,
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
    const e = this._lexer.token, t = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(b.AT);
    const r = this.parseName(), i = this.parseArgumentDefs(), s = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const o = this.parseDirectiveLocations();
    return this.node(e, {
      kind: S.DIRECTIVE_DEFINITION,
      description: t,
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
    return this.delimitedMany(b.PIPE, this.parseDirectiveLocation);
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
    const e = this._lexer.token, t = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Cn, t.value))
      return t;
    throw this.unexpected(e);
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
    const e = this._lexer.token, t = this.expectOptionalToken(b.AT), r = this.parseName();
    let i;
    !t && this.expectOptionalToken(b.DOT) && (i = this.parseName());
    let s;
    return (t || i) && this.expectOptionalToken(b.PAREN_L) && (s = this.parseName(), this.expectToken(b.COLON), this.expectToken(b.PAREN_R)), t ? s ? this.node(e, {
      kind: S.DIRECTIVE_ARGUMENT_COORDINATE,
      name: r,
      argumentName: s
    }) : this.node(e, {
      kind: S.DIRECTIVE_COORDINATE,
      name: r
    }) : i ? s ? this.node(e, {
      kind: S.ARGUMENT_COORDINATE,
      name: r,
      fieldName: i,
      argumentName: s
    }) : this.node(e, {
      kind: S.MEMBER_COORDINATE,
      name: r,
      memberName: i
    }) : this.node(e, {
      kind: S.TYPE_COORDINATE,
      name: r
    });
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(e, t) {
    return this._options.noLocation !== !0 && (t.loc = new uo(
      e,
      this._lexer.lastToken,
      this._lexer.source
    )), t;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(e) {
    return this._lexer.token.kind === e;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(e) {
    const t = this._lexer.token;
    if (t.kind === e)
      return this.advanceLexer(), t;
    throw j(
      this._lexer.source,
      t.start,
      `Expected ${_i(e)}, found ${kt(t)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(e) {
    return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(e) {
    const t = this._lexer.token;
    if (t.kind === b.NAME && t.value === e)
      this.advanceLexer();
    else
      throw j(
        this._lexer.source,
        t.start,
        `Expected "${e}", found ${kt(t)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(e) {
    const t = this._lexer.token;
    return t.kind === b.NAME && t.value === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(e) {
    const t = e ?? this._lexer.token;
    return j(
      this._lexer.source,
      t.start,
      `Unexpected ${kt(t)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(e, t, r) {
    this.expectToken(e);
    const i = [];
    for (; !this.expectOptionalToken(r); )
      i.push(t.call(this));
    return i;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(e, t, r) {
    if (this.expectOptionalToken(e)) {
      const i = [];
      do
        i.push(t.call(this));
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
  many(e, t, r) {
    this.expectToken(e);
    const i = [];
    do
      i.push(t.call(this));
    while (!this.expectOptionalToken(r));
    return i;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(e, t) {
    this.expectOptionalToken(e);
    const r = [];
    do
      r.push(t.call(this));
    while (this.expectOptionalToken(e));
    return r;
  }
  advanceLexer() {
    const { maxTokens: e } = this._options, t = this._lexer.advance();
    if (t.kind !== b.EOF && (++this._tokenCounter, e !== void 0 && this._tokenCounter > e))
      throw j(
        this._lexer.source,
        t.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
}
function kt(n) {
  const e = n.value;
  return _i(n.kind) + (e != null ? ` "${e}"` : "");
}
function _i(n) {
  return go(n) ? `"${n}"` : n;
}
function Vo(n) {
  return `"${n.replace(Bo, qo)}"`;
}
const Bo = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function qo(n) {
  return Uo[n.charCodeAt(0)];
}
const Uo = [
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
], Qn = Object.freeze({});
function ee(n, e, t = Ei) {
  const r = /* @__PURE__ */ new Map();
  for (const v of Object.values(S))
    r.set(v, Wo(e, v));
  let i, s = Array.isArray(n), o = [n], a = -1, c = [], l = n, u, d;
  const f = [], h = [];
  do {
    a++;
    const v = a === o.length, w = v && c.length !== 0;
    if (v) {
      if (u = h.length === 0 ? void 0 : f[f.length - 1], l = d, d = h.pop(), w)
        if (s) {
          l = l.slice();
          let k = 0;
          for (const [O, I] of c) {
            const D = O - k;
            I === null ? (l.splice(D, 1), k++) : l[D] = I;
          }
        } else {
          l = { ...l };
          for (const [k, O] of c)
            l[k] = O;
        }
      a = i.index, o = i.keys, c = i.edits, s = i.inArray, i = i.prev;
    } else if (d) {
      if (u = s ? a : o[a], l = d[u], l == null)
        continue;
      f.push(u);
    }
    let E;
    if (!Array.isArray(l)) {
      var p, y;
      pr(l) || Tt(!1, `Invalid AST Node: ${$n(l)}.`);
      const k = v ? (p = r.get(l.kind)) === null || p === void 0 ? void 0 : p.leave : (y = r.get(l.kind)) === null || y === void 0 ? void 0 : y.enter;
      if (E = k == null ? void 0 : k.call(e, l, u, d, f, h), E === Qn)
        break;
      if (E === !1) {
        if (!v) {
          f.pop();
          continue;
        }
      } else if (E !== void 0 && (c.push([u, E]), !v))
        if (pr(E))
          l = E;
        else {
          f.pop();
          continue;
        }
    }
    if (E === void 0 && w && c.push([u, l]), v)
      f.pop();
    else {
      var m;
      i = {
        inArray: s,
        index: a,
        keys: o,
        edits: c,
        prev: i
      }, s = Array.isArray(l), o = s ? l : (m = t[l.kind]) !== null && m !== void 0 ? m : [], a = -1, c = [], d && h.push(d), d = l;
    }
  } while (i !== void 0);
  return c.length !== 0 ? c[c.length - 1][1] : n;
}
function Wo(n, e) {
  const t = n[e];
  return typeof t == "object" ? t : typeof t == "function" ? {
    enter: t,
    leave: void 0
  } : {
    enter: n.enter,
    leave: n.leave
  };
}
function zo(n) {
  return ee(n, Qo);
}
const $o = 80, Qo = {
  Name: {
    leave: (n) => n.value
  },
  Variable: {
    leave: (n) => "$" + n.name
  },
  // Document
  Document: {
    leave: (n) => x(n.definitions, `

`)
  },
  OperationDefinition: {
    leave(n) {
      const e = on(n.variableDefinitions) ? N(`(
`, x(n.variableDefinitions, `
`), `
)`) : N("(", x(n.variableDefinitions, ", "), ")"), t = N("", n.description, `
`) + x(
        [
          n.operation,
          x([n.name, e]),
          x(n.directives, " ")
        ],
        " "
      );
      return (t === "query" ? "" : t + " ") + n.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: n, type: e, defaultValue: t, directives: r, description: i }) => N("", i, `
`) + n + ": " + e + N(" = ", t) + N(" ", x(r, " "))
  },
  SelectionSet: {
    leave: ({ selections: n }) => Y(n)
  },
  Field: {
    leave({ alias: n, name: e, arguments: t, directives: r, selectionSet: i }) {
      const s = N("", n, ": ") + e;
      let o = s + N("(", x(t, ", "), ")");
      return o.length > $o && (o = s + N(`(
`, Ct(x(t, `
`)), `
)`)), x([o, x(r, " "), i], " ");
    }
  },
  Argument: {
    leave: ({ name: n, value: e }) => n + ": " + e
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: n, directives: e }) => "..." + n + N(" ", x(e, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: n, directives: e, selectionSet: t }) => x(
      [
        "...",
        N("on ", n),
        x(e, " "),
        t
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({
      name: n,
      typeCondition: e,
      variableDefinitions: t,
      directives: r,
      selectionSet: i,
      description: s
    }) => N("", s, `
`) + // Note: fragment variable definitions are experimental and may be changed
    // or removed in the future.
    `fragment ${n}${N("(", x(t, ", "), ")")} on ${e} ${N("", x(r, " "), " ")}` + i
  },
  // Value
  IntValue: {
    leave: ({ value: n }) => n
  },
  FloatValue: {
    leave: ({ value: n }) => n
  },
  StringValue: {
    leave: ({ value: n, block: e }) => e ? yo(n) : Vo(n)
  },
  BooleanValue: {
    leave: ({ value: n }) => n ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: n }) => n
  },
  ListValue: {
    leave: ({ values: n }) => "[" + x(n, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: n }) => "{" + x(n, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: n, value: e }) => n + ": " + e
  },
  // Directive
  Directive: {
    leave: ({ name: n, arguments: e }) => "@" + n + N("(", x(e, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: n }) => n
  },
  ListType: {
    leave: ({ type: n }) => "[" + n + "]"
  },
  NonNullType: {
    leave: ({ type: n }) => n + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: n, directives: e, operationTypes: t }) => N("", n, `
`) + x(["schema", x(e, " "), Y(t)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: n, type: e }) => n + ": " + e
  },
  ScalarTypeDefinition: {
    leave: ({ description: n, name: e, directives: t }) => N("", n, `
`) + x(["scalar", e, x(t, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: n, name: e, interfaces: t, directives: r, fields: i }) => N("", n, `
`) + x(
      [
        "type",
        e,
        N("implements ", x(t, " & ")),
        x(r, " "),
        Y(i)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: n, name: e, arguments: t, type: r, directives: i }) => N("", n, `
`) + e + (on(t) ? N(`(
`, Ct(x(t, `
`)), `
)`) : N("(", x(t, ", "), ")")) + ": " + r + N(" ", x(i, " "))
  },
  InputValueDefinition: {
    leave: ({ description: n, name: e, type: t, defaultValue: r, directives: i }) => N("", n, `
`) + x(
      [e + ": " + t, N("= ", r), x(i, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: n, name: e, interfaces: t, directives: r, fields: i }) => N("", n, `
`) + x(
      [
        "interface",
        e,
        N("implements ", x(t, " & ")),
        x(r, " "),
        Y(i)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: n, name: e, directives: t, types: r }) => N("", n, `
`) + x(
      ["union", e, x(t, " "), N("= ", x(r, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: n, name: e, directives: t, values: r }) => N("", n, `
`) + x(["enum", e, x(t, " "), Y(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: n, name: e, directives: t }) => N("", n, `
`) + x([e, x(t, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: n, name: e, directives: t, fields: r }) => N("", n, `
`) + x(["input", e, x(t, " "), Y(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: n, name: e, arguments: t, repeatable: r, locations: i }) => N("", n, `
`) + "directive @" + e + (on(t) ? N(`(
`, Ct(x(t, `
`)), `
)`) : N("(", x(t, ", "), ")")) + (r ? " repeatable" : "") + " on " + x(i, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: n, operationTypes: e }) => x(
      ["extend schema", x(n, " "), Y(e)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: n, directives: e }) => x(["extend scalar", n, x(e, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: n, interfaces: e, directives: t, fields: r }) => x(
      [
        "extend type",
        n,
        N("implements ", x(e, " & ")),
        x(t, " "),
        Y(r)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: n, interfaces: e, directives: t, fields: r }) => x(
      [
        "extend interface",
        n,
        N("implements ", x(e, " & ")),
        x(t, " "),
        Y(r)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: n, directives: e, types: t }) => x(
      [
        "extend union",
        n,
        x(e, " "),
        N("= ", x(t, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: n, directives: e, values: t }) => x(["extend enum", n, x(e, " "), Y(t)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: n, directives: e, fields: t }) => x(["extend input", n, x(e, " "), Y(t)], " ")
  },
  // Schema Coordinates
  TypeCoordinate: {
    leave: ({ name: n }) => n
  },
  MemberCoordinate: {
    leave: ({ name: n, memberName: e }) => x([n, N(".", e)])
  },
  ArgumentCoordinate: {
    leave: ({ name: n, fieldName: e, argumentName: t }) => x([n, N(".", e), N("(", t, ":)")])
  },
  DirectiveCoordinate: {
    leave: ({ name: n }) => x(["@", n])
  },
  DirectiveArgumentCoordinate: {
    leave: ({ name: n, argumentName: e }) => x(["@", n, N("(", e, ":)")])
  }
};
function x(n, e = "") {
  var t;
  return (t = n == null ? void 0 : n.filter((r) => r).join(e)) !== null && t !== void 0 ? t : "";
}
function Y(n) {
  return N(`{
`, Ct(x(n, `
`)), `
}`);
}
function N(n, e, t = "") {
  return e != null && e !== "" ? n + e + t : "";
}
function Ct(n) {
  return N("  ", n.replace(/\n/g, `
  `));
}
function on(n) {
  var e;
  return (e = n == null ? void 0 : n.some((t) => t.includes(`
`))) !== null && e !== void 0 ? e : !1;
}
var Nn = function(n, e) {
  return Nn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }, Nn(n, e);
};
function te(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Nn(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var Mt = function() {
  return Mt = Object.assign || function(e) {
    for (var t, r = 1, i = arguments.length; r < i; r++) {
      t = arguments[r];
      for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    }
    return e;
  }, Mt.apply(this, arguments);
};
function Go(n, e, t, r) {
  function i(s) {
    return s instanceof t ? s : new t(function(o) {
      o(s);
    });
  }
  return new (t || (t = Promise))(function(s, o) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      u.done ? s(u.value) : i(u.value).then(a, c);
    }
    l((r = r.apply(n, e || [])).next());
  });
}
function Ni(n, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1) throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, i, s, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return o.next = a(0), o.throw = a(1), o.return = a(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function a(l) {
    return function(u) {
      return c([l, u]);
    };
  }
  function c(l) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, l[0] && (t = 0)), t; ) try {
      if (r = 1, i && (s = l[0] & 2 ? i.return : l[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, l[1])).done) return s;
      switch (i = 0, s && (l = [l[0] & 2, s.value]), l[0]) {
        case 0:
        case 1:
          s = l;
          break;
        case 4:
          return t.label++, { value: l[1], done: !1 };
        case 5:
          t.label++, i = l[1], l = [0];
          continue;
        case 7:
          l = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (l[0] === 6 || l[0] === 2)) {
            t = 0;
            continue;
          }
          if (l[0] === 3 && (!s || l[1] > s[0] && l[1] < s[3])) {
            t.label = l[1];
            break;
          }
          if (l[0] === 6 && t.label < s[1]) {
            t.label = s[1], s = l;
            break;
          }
          if (s && t.label < s[2]) {
            t.label = s[2], t.ops.push(l);
            break;
          }
          s[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      l = e.call(n, t);
    } catch (u) {
      l = [6, u], i = 0;
    } finally {
      r = s = 0;
    }
    if (l[0] & 5) throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
function Pe(n) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && n[e], r = 0;
  if (t) return t.call(n);
  if (n && typeof n.length == "number") return {
    next: function() {
      return n && r >= n.length && (n = void 0), { value: n && n[r++], done: !n };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function it(n, e) {
  var t = typeof Symbol == "function" && n[Symbol.iterator];
  if (!t) return n;
  var r = t.call(n), i, s = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; ) s.push(i.value);
  } catch (a) {
    o = { error: a };
  } finally {
    try {
      i && !i.done && (t = r.return) && t.call(r);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}
function st(n, e, t) {
  if (t || arguments.length === 2) for (var r = 0, i = e.length, s; r < i; r++)
    (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return n.concat(s || Array.prototype.slice.call(e));
}
function Ae(n) {
  return this instanceof Ae ? (this.v = n, this) : new Ae(n);
}
function Ho(n, e, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(n, e || []), i, s = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", o), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function o(h) {
    return function(p) {
      return Promise.resolve(p).then(h, d);
    };
  }
  function a(h, p) {
    r[h] && (i[h] = function(y) {
      return new Promise(function(m, v) {
        s.push([h, y, m, v]) > 1 || c(h, y);
      });
    }, p && (i[h] = p(i[h])));
  }
  function c(h, p) {
    try {
      l(r[h](p));
    } catch (y) {
      f(s[0][3], y);
    }
  }
  function l(h) {
    h.value instanceof Ae ? Promise.resolve(h.value.v).then(u, d) : f(s[0][2], h);
  }
  function u(h) {
    c("next", h);
  }
  function d(h) {
    c("throw", h);
  }
  function f(h, p) {
    h(p), s.shift(), s.length && c(s[0][0], s[0][1]);
  }
}
function Yo(n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = n[Symbol.asyncIterator], t;
  return e ? e.call(n) : (n = typeof Pe == "function" ? Pe(n) : n[Symbol.iterator](), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function r(s) {
    t[s] = n[s] && function(o) {
      return new Promise(function(a, c) {
        o = n[s](o), i(a, c, o.done, o.value);
      });
    };
  }
  function i(s, o, a, c) {
    Promise.resolve(c).then(function(l) {
      s({ value: l, done: a });
    }, o);
  }
}
function M(n) {
  return typeof n == "function";
}
function Gn(n) {
  var e = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, t = n(e);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var an = Gn(function(n) {
  return function(t) {
    n(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function Lt(n, e) {
  if (n) {
    var t = n.indexOf(e);
    0 <= t && n.splice(t, 1);
  }
}
var dt = (function() {
  function n(e) {
    this.initialTeardown = e, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return n.prototype.unsubscribe = function() {
    var e, t, r, i, s;
    if (!this.closed) {
      this.closed = !0;
      var o = this._parentage;
      if (o)
        if (this._parentage = null, Array.isArray(o))
          try {
            for (var a = Pe(o), c = a.next(); !c.done; c = a.next()) {
              var l = c.value;
              l.remove(this);
            }
          } catch (y) {
            e = { error: y };
          } finally {
            try {
              c && !c.done && (t = a.return) && t.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
        else
          o.remove(this);
      var u = this.initialTeardown;
      if (M(u))
        try {
          u();
        } catch (y) {
          s = y instanceof an ? y.errors : [y];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var f = Pe(d), h = f.next(); !h.done; h = f.next()) {
            var p = h.value;
            try {
              yr(p);
            } catch (y) {
              s = s ?? [], y instanceof an ? s = st(st([], it(s)), it(y.errors)) : s.push(y);
            }
          }
        } catch (y) {
          r = { error: y };
        } finally {
          try {
            h && !h.done && (i = f.return) && i.call(f);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (s)
        throw new an(s);
    }
  }, n.prototype.add = function(e) {
    var t;
    if (e && e !== this)
      if (this.closed)
        yr(e);
      else {
        if (e instanceof n) {
          if (e.closed || e._hasParent(this))
            return;
          e._addParent(this);
        }
        (this._finalizers = (t = this._finalizers) !== null && t !== void 0 ? t : []).push(e);
      }
  }, n.prototype._hasParent = function(e) {
    var t = this._parentage;
    return t === e || Array.isArray(t) && t.includes(e);
  }, n.prototype._addParent = function(e) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(e), t) : t ? [t, e] : e;
  }, n.prototype._removeParent = function(e) {
    var t = this._parentage;
    t === e ? this._parentage = null : Array.isArray(t) && Lt(t, e);
  }, n.prototype.remove = function(e) {
    var t = this._finalizers;
    t && Lt(t, e), e instanceof n && e._removeParent(this);
  }, n.EMPTY = (function() {
    var e = new n();
    return e.closed = !0, e;
  })(), n;
})(), Ii = dt.EMPTY;
function Ai(n) {
  return n instanceof dt || n && "closed" in n && M(n.remove) && M(n.add) && M(n.unsubscribe);
}
function yr(n) {
  M(n) ? n() : n.unsubscribe();
}
var Jo = {
  Promise: void 0
}, Ko = {
  setTimeout: function(n, e) {
    for (var t = [], r = 2; r < arguments.length; r++)
      t[r - 2] = arguments[r];
    return setTimeout.apply(void 0, st([n, e], it(t)));
  },
  clearTimeout: function(n) {
    return clearTimeout(n);
  },
  delegate: void 0
};
function Di(n) {
  Ko.setTimeout(function() {
    throw n;
  });
}
function vr() {
}
function _t(n) {
  n();
}
var Hn = (function(n) {
  te(e, n);
  function e(t) {
    var r = n.call(this) || this;
    return r.isStopped = !1, t ? (r.destination = t, Ai(t) && t.add(r)) : r.destination = ea, r;
  }
  return e.create = function(t, r, i) {
    return new ot(t, r, i);
  }, e.prototype.next = function(t) {
    this.isStopped || this._next(t);
  }, e.prototype.error = function(t) {
    this.isStopped || (this.isStopped = !0, this._error(t));
  }, e.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, e.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, n.prototype.unsubscribe.call(this), this.destination = null);
  }, e.prototype._next = function(t) {
    this.destination.next(t);
  }, e.prototype._error = function(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }, e.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, e;
})(dt), Xo = (function() {
  function n(e) {
    this.partialObserver = e;
  }
  return n.prototype.next = function(e) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(e);
      } catch (r) {
        St(r);
      }
  }, n.prototype.error = function(e) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(e);
      } catch (r) {
        St(r);
      }
    else
      St(e);
  }, n.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (t) {
        St(t);
      }
  }, n;
})(), ot = (function(n) {
  te(e, n);
  function e(t, r, i) {
    var s = n.call(this) || this, o;
    return M(t) || !t ? o = {
      next: t ?? void 0,
      error: r ?? void 0,
      complete: i ?? void 0
    } : o = t, s.destination = new Xo(o), s;
  }
  return e;
})(Hn);
function St(n) {
  Di(n);
}
function Zo(n) {
  throw n;
}
var ea = {
  closed: !0,
  next: vr,
  error: Zo,
  complete: vr
}, Yn = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Gt(n) {
  return n;
}
function ta(n) {
  return n.length === 0 ? Gt : n.length === 1 ? n[0] : function(t) {
    return n.reduce(function(r, i) {
      return i(r);
    }, t);
  };
}
var F = (function() {
  function n(e) {
    e && (this._subscribe = e);
  }
  return n.prototype.lift = function(e) {
    var t = new n();
    return t.source = this, t.operator = e, t;
  }, n.prototype.subscribe = function(e, t, r) {
    var i = this, s = ra(e) ? e : new ot(e, t, r);
    return _t(function() {
      var o = i, a = o.operator, c = o.source;
      s.add(a ? a.call(s, c) : c ? i._subscribe(s) : i._trySubscribe(s));
    }), s;
  }, n.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (t) {
      e.error(t);
    }
  }, n.prototype.forEach = function(e, t) {
    var r = this;
    return t = gr(t), new t(function(i, s) {
      var o = new ot({
        next: function(a) {
          try {
            e(a);
          } catch (c) {
            s(c), o.unsubscribe();
          }
        },
        error: s,
        complete: i
      });
      r.subscribe(o);
    });
  }, n.prototype._subscribe = function(e) {
    var t;
    return (t = this.source) === null || t === void 0 ? void 0 : t.subscribe(e);
  }, n.prototype[Yn] = function() {
    return this;
  }, n.prototype.pipe = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return ta(e)(this);
  }, n.prototype.toPromise = function(e) {
    var t = this;
    return e = gr(e), new e(function(r, i) {
      var s;
      t.subscribe(function(o) {
        return s = o;
      }, function(o) {
        return i(o);
      }, function() {
        return r(s);
      });
    });
  }, n.create = function(e) {
    return new n(e);
  }, n;
})();
function gr(n) {
  var e;
  return (e = n ?? Jo.Promise) !== null && e !== void 0 ? e : Promise;
}
function na(n) {
  return n && M(n.next) && M(n.error) && M(n.complete);
}
function ra(n) {
  return n && n instanceof Hn || na(n) && Ai(n);
}
function ia(n) {
  return M(n == null ? void 0 : n.lift);
}
function K(n) {
  return function(e) {
    if (ia(e))
      return e.lift(function(t) {
        try {
          return n(t, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function se(n, e, t, r, i) {
  return new sa(n, e, t, r, i);
}
var sa = (function(n) {
  te(e, n);
  function e(t, r, i, s, o, a) {
    var c = n.call(this, t) || this;
    return c.onFinalize = o, c.shouldUnsubscribe = a, c._next = r ? function(l) {
      try {
        r(l);
      } catch (u) {
        t.error(u);
      }
    } : n.prototype._next, c._error = s ? function(l) {
      try {
        s(l);
      } catch (u) {
        t.error(u);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._error, c._complete = i ? function() {
      try {
        i();
      } catch (l) {
        t.error(l);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._complete, c;
  }
  return e.prototype.unsubscribe = function() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      n.prototype.unsubscribe.call(this), !r && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }, e;
})(Hn), oa = Gn(function(n) {
  return function() {
    n(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Ue = (function(n) {
  te(e, n);
  function e() {
    var t = n.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return e.prototype.lift = function(t) {
    var r = new br(this, this);
    return r.operator = t, r;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new oa();
  }, e.prototype.next = function(t) {
    var r = this;
    _t(function() {
      var i, s;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var o = Pe(r.currentObservers), a = o.next(); !a.done; a = o.next()) {
            var c = a.value;
            c.next(t);
          }
        } catch (l) {
          i = { error: l };
        } finally {
          try {
            a && !a.done && (s = o.return) && s.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, e.prototype.error = function(t) {
    var r = this;
    _t(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = t;
        for (var i = r.observers; i.length; )
          i.shift().error(t);
      }
    });
  }, e.prototype.complete = function() {
    var t = this;
    _t(function() {
      if (t._throwIfClosed(), !t.isStopped) {
        t.isStopped = !0;
        for (var r = t.observers; r.length; )
          r.shift().complete();
      }
    });
  }, e.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(e.prototype, "observed", {
    get: function() {
      var t;
      return ((t = this.observers) === null || t === void 0 ? void 0 : t.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._trySubscribe = function(t) {
    return this._throwIfClosed(), n.prototype._trySubscribe.call(this, t);
  }, e.prototype._subscribe = function(t) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t);
  }, e.prototype._innerSubscribe = function(t) {
    var r = this, i = this, s = i.hasError, o = i.isStopped, a = i.observers;
    return s || o ? Ii : (this.currentObservers = null, a.push(t), new dt(function() {
      r.currentObservers = null, Lt(a, t);
    }));
  }, e.prototype._checkFinalizedStatuses = function(t) {
    var r = this, i = r.hasError, s = r.thrownError, o = r.isStopped;
    i ? t.error(s) : o && t.complete();
  }, e.prototype.asObservable = function() {
    var t = new F();
    return t.source = this, t;
  }, e.create = function(t, r) {
    return new br(t, r);
  }, e;
})(F), br = (function(n) {
  te(e, n);
  function e(t, r) {
    var i = n.call(this) || this;
    return i.destination = t, i.source = r, i;
  }
  return e.prototype.next = function(t) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || i === void 0 || i.call(r, t);
  }, e.prototype.error = function(t) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || i === void 0 || i.call(r, t);
  }, e.prototype.complete = function() {
    var t, r;
    (r = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null || r === void 0 || r.call(t);
  }, e.prototype._subscribe = function(t) {
    var r, i;
    return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t)) !== null && i !== void 0 ? i : Ii;
  }, e;
})(Ue), aa = (function(n) {
  te(e, n);
  function e(t) {
    var r = n.call(this) || this;
    return r._value = t, r;
  }
  return Object.defineProperty(e.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), e.prototype._subscribe = function(t) {
    var r = n.prototype._subscribe.call(this, t);
    return !r.closed && t.next(this._value), r;
  }, e.prototype.getValue = function() {
    var t = this, r = t.hasError, i = t.thrownError, s = t._value;
    if (r)
      throw i;
    return this._throwIfClosed(), s;
  }, e.prototype.next = function(t) {
    n.prototype.next.call(this, this._value = t);
  }, e;
})(Ue), Jn = {
  now: function() {
    return (Jn.delegate || Date).now();
  },
  delegate: void 0
}, Ri = (function(n) {
  te(e, n);
  function e(t, r, i) {
    t === void 0 && (t = 1 / 0), r === void 0 && (r = 1 / 0), i === void 0 && (i = Jn);
    var s = n.call(this) || this;
    return s._bufferSize = t, s._windowTime = r, s._timestampProvider = i, s._buffer = [], s._infiniteTimeWindow = !0, s._infiniteTimeWindow = r === 1 / 0, s._bufferSize = Math.max(1, t), s._windowTime = Math.max(1, r), s;
  }
  return e.prototype.next = function(t) {
    var r = this, i = r.isStopped, s = r._buffer, o = r._infiniteTimeWindow, a = r._timestampProvider, c = r._windowTime;
    i || (s.push(t), !o && s.push(a.now() + c)), this._trimBuffer(), n.prototype.next.call(this, t);
  }, e.prototype._subscribe = function(t) {
    this._throwIfClosed(), this._trimBuffer();
    for (var r = this._innerSubscribe(t), i = this, s = i._infiniteTimeWindow, o = i._buffer, a = o.slice(), c = 0; c < a.length && !t.closed; c += s ? 1 : 2)
      t.next(a[c]);
    return this._checkFinalizedStatuses(t), r;
  }, e.prototype._trimBuffer = function() {
    var t = this, r = t._bufferSize, i = t._timestampProvider, s = t._buffer, o = t._infiniteTimeWindow, a = (o ? 1 : 2) * r;
    if (r < 1 / 0 && a < s.length && s.splice(0, s.length - a), !o) {
      for (var c = i.now(), l = 0, u = 1; u < s.length && s[u] <= c; u += 2)
        l = u;
      l && s.splice(0, l + 1);
    }
  }, e;
})(Ue), ca = (function(n) {
  te(e, n);
  function e(t, r) {
    return n.call(this) || this;
  }
  return e.prototype.schedule = function(t, r) {
    return this;
  }, e;
})(dt), wr = {
  setInterval: function(n, e) {
    for (var t = [], r = 2; r < arguments.length; r++)
      t[r - 2] = arguments[r];
    return setInterval.apply(void 0, st([n, e], it(t)));
  },
  clearInterval: function(n) {
    return clearInterval(n);
  },
  delegate: void 0
}, la = (function(n) {
  te(e, n);
  function e(t, r) {
    var i = n.call(this, t, r) || this;
    return i.scheduler = t, i.work = r, i.pending = !1, i;
  }
  return e.prototype.schedule = function(t, r) {
    var i;
    if (r === void 0 && (r = 0), this.closed)
      return this;
    this.state = t;
    var s = this.id, o = this.scheduler;
    return s != null && (this.id = this.recycleAsyncId(o, s, r)), this.pending = !0, this.delay = r, this.id = (i = this.id) !== null && i !== void 0 ? i : this.requestAsyncId(o, this.id, r), this;
  }, e.prototype.requestAsyncId = function(t, r, i) {
    return i === void 0 && (i = 0), wr.setInterval(t.flush.bind(t, this), i);
  }, e.prototype.recycleAsyncId = function(t, r, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === !1)
      return r;
    r != null && wr.clearInterval(r);
  }, e.prototype.execute = function(t, r) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var i = this._execute(t, r);
    if (i)
      return i;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, e.prototype._execute = function(t, r) {
    var i = !1, s;
    try {
      this.work(t);
    } catch (o) {
      i = !0, s = o || new Error("Scheduled action threw falsy error");
    }
    if (i)
      return this.unsubscribe(), s;
  }, e.prototype.unsubscribe = function() {
    if (!this.closed) {
      var t = this, r = t.id, i = t.scheduler, s = i.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, Lt(s, this), r != null && (this.id = this.recycleAsyncId(i, r, null)), this.delay = null, n.prototype.unsubscribe.call(this);
    }
  }, e;
})(ca), Er = (function() {
  function n(e, t) {
    t === void 0 && (t = n.now), this.schedulerActionCtor = e, this.now = t;
  }
  return n.prototype.schedule = function(e, t, r) {
    return t === void 0 && (t = 0), new this.schedulerActionCtor(this, e).schedule(r, t);
  }, n.now = Jn.now, n;
})(), ua = (function(n) {
  te(e, n);
  function e(t, r) {
    r === void 0 && (r = Er.now);
    var i = n.call(this, t, r) || this;
    return i.actions = [], i._active = !1, i;
  }
  return e.prototype.flush = function(t) {
    var r = this.actions;
    if (this._active) {
      r.push(t);
      return;
    }
    var i;
    this._active = !0;
    do
      if (i = t.execute(t.state, t.delay))
        break;
    while (t = r.shift());
    if (this._active = !1, i) {
      for (; t = r.shift(); )
        t.unsubscribe();
      throw i;
    }
  }, e;
})(Er), fa = new ua(la), ha = fa, at = new F(function(n) {
  return n.complete();
});
function da(n) {
  return n && M(n.schedule);
}
function pa(n) {
  return n[n.length - 1];
}
function Fi(n) {
  return da(pa(n)) ? n.pop() : void 0;
}
var Pi = (function(n) {
  return n && typeof n.length == "number" && typeof n != "function";
});
function Mi(n) {
  return M(n == null ? void 0 : n.then);
}
function Li(n) {
  return M(n[Yn]);
}
function ji(n) {
  return Symbol.asyncIterator && M(n == null ? void 0 : n[Symbol.asyncIterator]);
}
function Vi(n) {
  return new TypeError("You provided " + (n !== null && typeof n == "object" ? "an invalid object" : "'" + n + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function ma() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var Bi = ma();
function qi(n) {
  return M(n == null ? void 0 : n[Bi]);
}
function Ui(n) {
  return Ho(this, arguments, function() {
    var t, r, i, s;
    return Ni(this, function(o) {
      switch (o.label) {
        case 0:
          t = n.getReader(), o.label = 1;
        case 1:
          o.trys.push([1, , 9, 10]), o.label = 2;
        case 2:
          return [4, Ae(t.read())];
        case 3:
          return r = o.sent(), i = r.value, s = r.done, s ? [4, Ae(void 0)] : [3, 5];
        case 4:
          return [2, o.sent()];
        case 5:
          return [4, Ae(i)];
        case 6:
          return [4, o.sent()];
        case 7:
          return o.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return t.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Wi(n) {
  return M(n == null ? void 0 : n.getReader);
}
function me(n) {
  if (n instanceof F)
    return n;
  if (n != null) {
    if (Li(n))
      return ya(n);
    if (Pi(n))
      return va(n);
    if (Mi(n))
      return ga(n);
    if (ji(n))
      return zi(n);
    if (qi(n))
      return ba(n);
    if (Wi(n))
      return wa(n);
  }
  throw Vi(n);
}
function ya(n) {
  return new F(function(e) {
    var t = n[Yn]();
    if (M(t.subscribe))
      return t.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function va(n) {
  return new F(function(e) {
    for (var t = 0; t < n.length && !e.closed; t++)
      e.next(n[t]);
    e.complete();
  });
}
function ga(n) {
  return new F(function(e) {
    n.then(function(t) {
      e.closed || (e.next(t), e.complete());
    }, function(t) {
      return e.error(t);
    }).then(null, Di);
  });
}
function ba(n) {
  return new F(function(e) {
    var t, r;
    try {
      for (var i = Pe(n), s = i.next(); !s.done; s = i.next()) {
        var o = s.value;
        if (e.next(o), e.closed)
          return;
      }
    } catch (a) {
      t = { error: a };
    } finally {
      try {
        s && !s.done && (r = i.return) && r.call(i);
      } finally {
        if (t) throw t.error;
      }
    }
    e.complete();
  });
}
function zi(n) {
  return new F(function(e) {
    Ea(n, e).catch(function(t) {
      return e.error(t);
    });
  });
}
function wa(n) {
  return zi(Ui(n));
}
function Ea(n, e) {
  var t, r, i, s;
  return Go(this, void 0, void 0, function() {
    var o, a;
    return Ni(this, function(c) {
      switch (c.label) {
        case 0:
          c.trys.push([0, 5, 6, 11]), t = Yo(n), c.label = 1;
        case 1:
          return [4, t.next()];
        case 2:
          if (r = c.sent(), !!r.done) return [3, 4];
          if (o = r.value, e.next(o), e.closed)
            return [2];
          c.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return a = c.sent(), i = { error: a }, [3, 11];
        case 6:
          return c.trys.push([6, , 9, 10]), r && !r.done && (s = t.return) ? [4, s.call(t)] : [3, 8];
        case 7:
          c.sent(), c.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return e.complete(), [2];
      }
    });
  });
}
function Ee(n, e, t, r, i) {
  r === void 0 && (r = 0), i === void 0 && (i = !1);
  var s = e.schedule(function() {
    t(), i ? n.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if (n.add(s), !i)
    return s;
}
function $i(n, e) {
  return e === void 0 && (e = 0), K(function(t, r) {
    t.subscribe(se(r, function(i) {
      return Ee(r, n, function() {
        return r.next(i);
      }, e);
    }, function() {
      return Ee(r, n, function() {
        return r.complete();
      }, e);
    }, function(i) {
      return Ee(r, n, function() {
        return r.error(i);
      }, e);
    }));
  });
}
function Qi(n, e) {
  return e === void 0 && (e = 0), K(function(t, r) {
    r.add(n.schedule(function() {
      return t.subscribe(r);
    }, e));
  });
}
function ka(n, e) {
  return me(n).pipe(Qi(e), $i(e));
}
function Sa(n, e) {
  return me(n).pipe(Qi(e), $i(e));
}
function Oa(n, e) {
  return new F(function(t) {
    var r = 0;
    return e.schedule(function() {
      r === n.length ? t.complete() : (t.next(n[r++]), t.closed || this.schedule());
    });
  });
}
function xa(n, e) {
  return new F(function(t) {
    var r;
    return Ee(t, e, function() {
      r = n[Bi](), Ee(t, e, function() {
        var i, s, o;
        try {
          i = r.next(), s = i.value, o = i.done;
        } catch (a) {
          t.error(a);
          return;
        }
        o ? t.complete() : t.next(s);
      }, 0, !0);
    }), function() {
      return M(r == null ? void 0 : r.return) && r.return();
    };
  });
}
function Gi(n, e) {
  if (!n)
    throw new Error("Iterable cannot be null");
  return new F(function(t) {
    Ee(t, e, function() {
      var r = n[Symbol.asyncIterator]();
      Ee(t, e, function() {
        r.next().then(function(i) {
          i.done ? t.complete() : t.next(i.value);
        });
      }, 0, !0);
    });
  });
}
function Ta(n, e) {
  return Gi(Ui(n), e);
}
function Ca(n, e) {
  if (n != null) {
    if (Li(n))
      return ka(n, e);
    if (Pi(n))
      return Oa(n, e);
    if (Mi(n))
      return Sa(n, e);
    if (ji(n))
      return Gi(n, e);
    if (qi(n))
      return xa(n, e);
    if (Wi(n))
      return Ta(n, e);
  }
  throw Vi(n);
}
function ge(n, e) {
  return e ? Ca(n, e) : me(n);
}
function ve() {
  for (var n = [], e = 0; e < arguments.length; e++)
    n[e] = arguments[e];
  var t = Fi(n);
  return ge(n, t);
}
function Hi(n, e) {
  var t = M(n) ? n : function() {
    return n;
  }, r = function(i) {
    return i.error(t());
  };
  return new F(r);
}
var kr;
(function(n) {
  n.NEXT = "N", n.ERROR = "E", n.COMPLETE = "C";
})(kr || (kr = {}));
var cn = (function() {
  function n(e, t, r) {
    this.kind = e, this.value = t, this.error = r, this.hasValue = e === "N";
  }
  return n.prototype.observe = function(e) {
    return _a(this, e);
  }, n.prototype.do = function(e, t, r) {
    var i = this, s = i.kind, o = i.value, a = i.error;
    return s === "N" ? e == null ? void 0 : e(o) : s === "E" ? t == null ? void 0 : t(a) : r == null ? void 0 : r();
  }, n.prototype.accept = function(e, t, r) {
    var i;
    return M((i = e) === null || i === void 0 ? void 0 : i.next) ? this.observe(e) : this.do(e, t, r);
  }, n.prototype.toObservable = function() {
    var e = this, t = e.kind, r = e.value, i = e.error, s = t === "N" ? ve(r) : t === "E" ? Hi(function() {
      return i;
    }) : t === "C" ? at : 0;
    if (!s)
      throw new TypeError("Unexpected notification kind " + t);
    return s;
  }, n.createNext = function(e) {
    return new n("N", e);
  }, n.createError = function(e) {
    return new n("E", void 0, e);
  }, n.createComplete = function() {
    return n.completeNotification;
  }, n.completeNotification = new n("C"), n;
})();
function _a(n, e) {
  var t, r, i, s = n, o = s.kind, a = s.value, c = s.error;
  if (typeof o != "string")
    throw new TypeError('Invalid notification, missing "kind"');
  o === "N" ? (t = e.next) === null || t === void 0 || t.call(e, a) : o === "E" ? (r = e.error) === null || r === void 0 || r.call(e, c) : (i = e.complete) === null || i === void 0 || i.call(e);
}
var Na = Gn(function(n) {
  return function() {
    n(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function Ia(n, e) {
  var t = typeof e == "object";
  return new Promise(function(r, i) {
    var s = !1, o;
    n.subscribe({
      next: function(a) {
        o = a, s = !0;
      },
      error: i,
      complete: function() {
        s ? r(o) : t ? r(e.defaultValue) : i(new Na());
      }
    });
  });
}
function Aa(n) {
  return n instanceof Date && !isNaN(n);
}
function fe(n, e) {
  return K(function(t, r) {
    var i = 0;
    t.subscribe(se(r, function(s) {
      r.next(n.call(e, s, i++));
    }));
  });
}
function Da(n, e, t, r, i, s, o, a) {
  var c = [], l = 0, u = 0, d = !1, f = function() {
    d && !c.length && !l && e.complete();
  }, h = function(y) {
    return l < r ? p(y) : c.push(y);
  }, p = function(y) {
    l++;
    var m = !1;
    me(t(y, u++)).subscribe(se(e, function(v) {
      e.next(v);
    }, function() {
      m = !0;
    }, void 0, function() {
      if (m)
        try {
          l--;
          for (var v = function() {
            var w = c.shift();
            o || p(w);
          }; c.length && l < r; )
            v();
          f();
        } catch (w) {
          e.error(w);
        }
    }));
  };
  return n.subscribe(se(e, h, function() {
    d = !0, f();
  })), function() {
  };
}
function Te(n, e, t) {
  return t === void 0 && (t = 1 / 0), M(e) ? Te(function(r, i) {
    return fe(function(s, o) {
      return e(r, s, i, o);
    })(me(n(r, i)));
  }, t) : (typeof e == "number" && (t = e), K(function(r, i) {
    return Da(r, i, n, t);
  }));
}
function Ra(n) {
  return Te(Gt, n);
}
function Fa() {
  return Ra(1);
}
function ln() {
  for (var n = [], e = 0; e < arguments.length; e++)
    n[e] = arguments[e];
  return Fa()(ge(n, Fi(n)));
}
function Pa(n, e, t) {
  return t === void 0 && (t = ha), new F(function(r) {
    var i = Aa(n) ? +n - t.now() : n;
    i < 0 && (i = 0);
    var s = 0;
    return t.schedule(function() {
      r.closed || (r.next(s++), r.complete());
    }, i);
  });
}
function Yi(n, e) {
  return K(function(t, r) {
    var i = 0;
    t.subscribe(se(r, function(s) {
      return n.call(e, s, i++) && r.next(s);
    }));
  });
}
function Nt(n) {
  return K(function(e, t) {
    var r = null, i = !1, s;
    r = e.subscribe(se(t, void 0, void 0, function(o) {
      s = me(n(o, Nt(n)(e))), r ? (r.unsubscribe(), r = null, s.subscribe(t)) : i = !0;
    })), i && (r.unsubscribe(), r = null, s.subscribe(t));
  });
}
function Ma(n, e) {
  return e === void 0 && (e = Gt), n = n ?? La, K(function(t, r) {
    var i, s = !0;
    t.subscribe(se(r, function(o) {
      var a = e(o);
      (s || !n(i, a)) && (s = !1, i = a, r.next(o));
    }));
  });
}
function La(n, e) {
  return n === e;
}
function ja(n) {
  return K(function(e, t) {
    try {
      e.subscribe(t);
    } finally {
      t.add(n);
    }
  });
}
function Va() {
  return K(function(n, e) {
    n.subscribe(se(e, function(t) {
      e.next(cn.createNext(t));
    }, function() {
      e.next(cn.createComplete()), e.complete();
    }, function(t) {
      e.next(cn.createError(t)), e.complete();
    }));
  });
}
function ct(n) {
  n === void 0 && (n = {});
  var e = n.connector, t = e === void 0 ? function() {
    return new Ue();
  } : e, r = n.resetOnError, i = r === void 0 ? !0 : r, s = n.resetOnComplete, o = s === void 0 ? !0 : s, a = n.resetOnRefCountZero, c = a === void 0 ? !0 : a;
  return function(l) {
    var u, d, f, h = 0, p = !1, y = !1, m = function() {
      d == null || d.unsubscribe(), d = void 0;
    }, v = function() {
      m(), u = f = void 0, p = y = !1;
    }, w = function() {
      var E = u;
      v(), E == null || E.unsubscribe();
    };
    return K(function(E, k) {
      h++, !y && !p && m();
      var O = f = f ?? t();
      k.add(function() {
        h--, h === 0 && !y && !p && (d = un(w, c));
      }), O.subscribe(k), !u && h > 0 && (u = new ot({
        next: function(I) {
          return O.next(I);
        },
        error: function(I) {
          y = !0, m(), d = un(v, i, I), O.error(I);
        },
        complete: function() {
          p = !0, m(), d = un(v, o), O.complete();
        }
      }), me(E).subscribe(u));
    })(l);
  };
}
function un(n, e) {
  for (var t = [], r = 2; r < arguments.length; r++)
    t[r - 2] = arguments[r];
  if (e === !0) {
    n();
    return;
  }
  if (e !== !1) {
    var i = new ot({
      next: function() {
        i.unsubscribe(), n();
      }
    });
    return me(e.apply(void 0, st([], it(t)))).subscribe(i);
  }
}
function Kn(n, e, t) {
  var r, i, s, o, a = !1;
  return n && typeof n == "object" ? (r = n.bufferSize, o = r === void 0 ? 1 / 0 : r, i = n.windowTime, e = i === void 0 ? 1 / 0 : i, s = n.refCount, a = s === void 0 ? !1 : s, t = n.scheduler) : o = n ?? 1 / 0, ct({
    connector: function() {
      return new Ri(o, e, t);
    },
    resetOnError: !0,
    resetOnComplete: !1,
    resetOnRefCountZero: a
  });
}
function lt(n, e, t) {
  var r = M(n) || e || t ? { next: n, error: e, complete: t } : n;
  return r ? K(function(i, s) {
    var o;
    (o = r.subscribe) === null || o === void 0 || o.call(r);
    var a = !0;
    i.subscribe(se(s, function(c) {
      var l;
      (l = r.next) === null || l === void 0 || l.call(r, c), s.next(c);
    }, function() {
      var c;
      a = !1, (c = r.complete) === null || c === void 0 || c.call(r), s.complete();
    }, function(c) {
      var l;
      a = !1, (l = r.error) === null || l === void 0 || l.call(r, c), s.error(c);
    }, function() {
      var c, l;
      a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)), (l = r.finalize) === null || l === void 0 || l.call(r);
    }));
  }) : Gt;
}
const Ji = !1;
function le(n) {
  try {
    return n();
  } catch {
  }
}
const In = (
  // We don't expect the Function constructor ever to be invoked at runtime, as
  // long as at least one of globalThis, window, self, or global is defined, so
  // we are under no obligation to make it easy for static analysis tools to
  // detect syntactic usage of the Function constructor. If you think you can
  le(() => globalThis) || le(() => window) || le(() => self) || le(() => global) || // improve your static analysis to detect this obfuscation, think again. This
  // is an arms race you cannot win, at least not in JavaScript.
  le(function() {
    return le.constructor("return this")();
  })
), Xn = "4.1.6", Sr = /* @__PURE__ */ new Map();
function Ki(n) {
  const e = Sr.get(n) || 1;
  return Sr.set(n, e + 1), `${n}:${e}:${Math.random().toString(36).slice(2)}`;
}
function Ba(n, e = 0) {
  const t = Ki("stringifyForDisplay");
  return JSON.stringify(n, (r, i) => i === void 0 ? t : i, e).split(JSON.stringify(t)).join("<undefined>");
}
const Or = "Invariant Violation";
class Zn extends Error {
  constructor(e = Or) {
    super(e), this.name = Or, Object.setPrototypeOf(this, Zn.prototype);
  }
}
const Xi = ["debug", "log", "warn", "error", "silent"];
let qa = Xi.indexOf("silent");
function A(n, ...e) {
  if (!n)
    throw H(...e);
}
function Ht(n) {
  return function(e, ...t) {
    if (Xi.indexOf(n) >= qa) {
      const r = console[n] || console.log;
      if (typeof e == "number") {
        const i = e;
        e = Zi(i), e || (e = es(i, t), t = []);
      }
      r(e, ...t);
    }
  };
}
A.debug = Ht("debug");
A.log = Ht("log");
A.warn = Ht("warn");
A.error = Ht("error");
function H(n, ...e) {
  return new Zn(Zi(n, e) || es(n, e));
}
const xr = Symbol.for("ApolloErrorMessageHandler_" + Xn);
function An(n) {
  if (typeof n == "string")
    return n;
  try {
    return Ba(n, 2).slice(0, 1e3);
  } catch {
    return "<non-serializable>";
  }
}
function Zi(n, e = []) {
  if (n)
    return In[xr] && In[xr](n, e.map(An));
}
function es(n, e = []) {
  if (n)
    return typeof n == "string" ? e.reduce((t, r) => t.replace(/%[sdfo]/, An(r)), n) : `An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#${encodeURIComponent(JSON.stringify({
      version: Xn,
      message: n,
      args: e.map(An)
    }))}`;
}
function Me(n, e, t, r) {
  if (t.kind === S.INT || t.kind === S.FLOAT)
    n[e.value] = Number(t.value);
  else if (t.kind === S.BOOLEAN || t.kind === S.STRING)
    n[e.value] = t.value;
  else if (t.kind === S.OBJECT) {
    const i = {};
    t.fields.map((s) => Me(i, s.name, s.value, r)), n[e.value] = i;
  } else if (t.kind === S.VARIABLE) {
    const i = (r || {})[t.name.value];
    n[e.value] = i;
  } else if (t.kind === S.LIST)
    n[e.value] = t.values.map((i) => {
      const s = {};
      return Me(s, e, i, r), s[e.value];
    });
  else if (t.kind === S.ENUM)
    n[e.value] = t.value;
  else if (t.kind === S.NULL)
    n[e.value] = null;
  else
    throw H(19, e.value, t.kind);
}
function er(n, e) {
  if (n.arguments && n.arguments.length) {
    const t = {};
    return n.arguments.forEach(({ name: r, value: i }) => Me(t, r, i, e)), t;
  }
  return null;
}
const Ua = Symbol.for("apollo.cacheSize"), oe = { ...In[Ua] };
function Le(n, e) {
  var t;
  return ((t = n.definitions.find((r) => r.kind === "OperationDefinition" && !!r.name)) == null ? void 0 : t.name.value) ?? e;
}
const Wa = () => /* @__PURE__ */ Object.create(null), { forEach: za, slice: Tr } = Array.prototype, { hasOwnProperty: $a } = Object.prototype;
class ne {
  constructor(e = !0, t = Wa) {
    this.weakness = e, this.makeData = t;
  }
  lookup() {
    return this.lookupArray(arguments);
  }
  lookupArray(e) {
    let t = this;
    return za.call(e, (r) => t = t.getChildTrie(r)), $a.call(t, "data") ? t.data : t.data = this.makeData(Tr.call(e));
  }
  peek() {
    return this.peekArray(arguments);
  }
  peekArray(e) {
    let t = this;
    for (let r = 0, i = e.length; t && r < i; ++r) {
      const s = t.mapFor(e[r], !1);
      t = s && s.get(e[r]);
    }
    return t && t.data;
  }
  remove() {
    return this.removeArray(arguments);
  }
  removeArray(e) {
    let t;
    if (e.length) {
      const r = e[0], i = this.mapFor(r, !1), s = i && i.get(r);
      s && (t = s.removeArray(Tr.call(e, 1)), !s.data && !s.weak && !(s.strong && s.strong.size) && i.delete(r));
    } else
      t = this.data, delete this.data;
    return t;
  }
  getChildTrie(e) {
    const t = this.mapFor(e, !0);
    let r = t.get(e);
    return r || t.set(e, r = new ne(this.weakness, this.makeData)), r;
  }
  mapFor(e, t) {
    return this.weakness && Qa(e) ? this.weak || (t ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (t ? this.strong = /* @__PURE__ */ new Map() : void 0);
  }
}
function Qa(n) {
  switch (typeof n) {
    case "object":
      if (n === null)
        break;
    // Fall through to return true...
    case "function":
      return !0;
  }
  return !1;
}
function Ga() {
}
class Dn {
  constructor(e = 1 / 0, t = Ga) {
    this.max = e, this.dispose = t, this.map = /* @__PURE__ */ new Map(), this.newest = null, this.oldest = null;
  }
  has(e) {
    return this.map.has(e);
  }
  get(e) {
    const t = this.getNode(e);
    return t && t.value;
  }
  get size() {
    return this.map.size;
  }
  getNode(e) {
    const t = this.map.get(e);
    if (t && t !== this.newest) {
      const { older: r, newer: i } = t;
      i && (i.older = r), r && (r.newer = i), t.older = this.newest, t.older.newer = t, t.newer = null, this.newest = t, t === this.oldest && (this.oldest = i);
    }
    return t;
  }
  set(e, t) {
    let r = this.getNode(e);
    return r ? r.value = t : (r = {
      key: e,
      value: t,
      newer: null,
      older: this.newest
    }, this.newest && (this.newest.newer = r), this.newest = r, this.oldest = this.oldest || r, this.map.set(e, r), r.value);
  }
  clean() {
    for (; this.oldest && this.map.size > this.max; )
      this.delete(this.oldest.key);
  }
  delete(e) {
    const t = this.map.get(e);
    return t ? (t === this.newest && (this.newest = t.older), t === this.oldest && (this.oldest = t.newer), t.newer && (t.newer.older = t.older), t.older && (t.older.newer = t.newer), this.map.delete(e), this.dispose(t.value, e), !0) : !1;
  }
}
function Rn() {
}
const Ha = Rn, Ya = typeof WeakRef < "u" ? WeakRef : function(n) {
  return { deref: () => n };
}, Ja = typeof WeakMap < "u" ? WeakMap : Map, Ka = typeof FinalizationRegistry < "u" ? FinalizationRegistry : function() {
  return {
    register: Rn,
    unregister: Rn
  };
}, Xa = 10024;
class jt {
  constructor(e = 1 / 0, t = Ha) {
    this.max = e, this.dispose = t, this.map = new Ja(), this.newest = null, this.oldest = null, this.unfinalizedNodes = /* @__PURE__ */ new Set(), this.finalizationScheduled = !1, this.size = 0, this.finalize = () => {
      const r = this.unfinalizedNodes.values();
      for (let i = 0; i < Xa; i++) {
        const s = r.next().value;
        if (!s)
          break;
        this.unfinalizedNodes.delete(s);
        const o = s.key;
        delete s.key, s.keyRef = new Ya(o), this.registry.register(o, s, s);
      }
      this.unfinalizedNodes.size > 0 ? queueMicrotask(this.finalize) : this.finalizationScheduled = !1;
    }, this.registry = new Ka(this.deleteNode.bind(this));
  }
  has(e) {
    return this.map.has(e);
  }
  get(e) {
    const t = this.getNode(e);
    return t && t.value;
  }
  getNode(e) {
    const t = this.map.get(e);
    if (t && t !== this.newest) {
      const { older: r, newer: i } = t;
      i && (i.older = r), r && (r.newer = i), t.older = this.newest, t.older.newer = t, t.newer = null, this.newest = t, t === this.oldest && (this.oldest = i);
    }
    return t;
  }
  set(e, t) {
    let r = this.getNode(e);
    return r ? r.value = t : (r = {
      key: e,
      value: t,
      newer: null,
      older: this.newest
    }, this.newest && (this.newest.newer = r), this.newest = r, this.oldest = this.oldest || r, this.scheduleFinalization(r), this.map.set(e, r), this.size++, r.value);
  }
  clean() {
    for (; this.oldest && this.size > this.max; )
      this.deleteNode(this.oldest);
  }
  deleteNode(e) {
    e === this.newest && (this.newest = e.older), e === this.oldest && (this.oldest = e.newer), e.newer && (e.newer.older = e.older), e.older && (e.older.newer = e.newer), this.size--;
    const t = e.key || e.keyRef && e.keyRef.deref();
    this.dispose(e.value, t), e.keyRef ? this.registry.unregister(e) : this.unfinalizedNodes.delete(e), t && this.map.delete(t);
  }
  delete(e) {
    const t = this.map.get(e);
    return t ? (this.deleteNode(t), !0) : !1;
  }
  scheduleFinalization(e) {
    this.unfinalizedNodes.add(e), this.finalizationScheduled || (this.finalizationScheduled = !0, queueMicrotask(this.finalize));
  }
}
const fn = /* @__PURE__ */ new WeakSet();
function ts(n) {
  n.size <= (n.max || -1) || fn.has(n) || (fn.add(n), setTimeout(() => {
    n.clean(), fn.delete(n);
  }, 100));
}
const tr = function(n, e) {
  const t = new jt(n, e);
  return t.set = function(r, i) {
    const s = jt.prototype.set.call(this, r, i);
    return ts(this), s;
  }, t;
}, Za = function(n, e) {
  const t = new Dn(n, e);
  return t.set = function(r, i) {
    const s = Dn.prototype.set.call(this, r, i);
    return ts(this), s;
  }, t;
};
function ns(n, { max: e, makeCacheKey: t = (r) => r }) {
  const r = new ne(!0), i = new tr(e);
  return (...s) => {
    const o = r.lookupArray(t(s)), a = i.get(o);
    if (a) {
      if (a.error)
        throw a.error;
      return a.result;
    }
    const c = i.set(o, {});
    try {
      return c.result = n(...s);
    } catch (l) {
      throw c.error = l, l;
    }
  };
}
const he = ns((n, e) => {
  A(n && n.kind === "Document", 1);
  const t = n.definitions.filter((r) => r.kind === "OperationDefinition");
  e && A(
    t.length == 1 && t[0].operation === e,
    4,
    e,
    e,
    t[0].operation
  ), ee(n, {
    Field(r, i, s, o) {
      var a;
      if (r.alias && (r.alias.value === "__typename" || r.alias.value.startsWith("__ac_")) && r.alias.value !== r.name.value) {
        let c = n, l = [];
        for (const u of o)
          c = c[u], c.kind === S.FIELD && l.push(((a = c.alias) == null ? void 0 : a.value) || c.name.value);
        throw l.splice(-1, 1, r.name.value), H(
          5,
          r.alias.value,
          l.join("."),
          t[0].operation,
          Le(n, "(anonymous)")
        );
      }
    }
  });
}, {
  max: oe.checkDocument || 2e3
});
function ec(n) {
  return n.length === 0 ? at : new F((e) => {
    const { length: t } = n, r = new Array(t), i = /* @__PURE__ */ new Map();
    n.forEach((c, l) => {
      i.has(c) || i.set(c, /* @__PURE__ */ new Set()), i.get(c).add(l);
    });
    let s = i.size, o = i.size, a;
    i.forEach((c, l) => {
      let u = !1;
      const d = l.subscribe({
        next: (f) => {
          c.forEach((h) => r[h] = f), u || (u = !0, o--), o || (a || (a = new Set(n.filter((h) => h.dirty))), a.delete(l), a.size || (e.next(r.slice()), a = void 0));
        },
        complete: () => {
          s--, s || e.complete();
        },
        error: e.error.bind(e)
      });
      e.add(d);
    });
  });
}
function G(...n) {
  const e = {};
  return n.forEach((t) => {
    t && Reflect.ownKeys(t).forEach((r) => {
      const i = t[r];
      i !== void 0 && (e[r] = i);
    });
  }), e;
}
function pt(n = []) {
  const e = {};
  return n.forEach((t) => {
    e[t.name.value] = t;
  }), e;
}
function $(n) {
  return n !== null && typeof n == "object";
}
const { hasOwnProperty: tc } = Object.prototype, nc = function(n, e, t) {
  return this.merge(n[t], e[t]);
}, Cr = (n) => isNaN(+n) ? {} : [];
class je {
  constructor(e = {}) {
    g(this, "options");
    g(this, "reconciler");
    g(this, "isObject", $);
    g(this, "pastCopies", /* @__PURE__ */ new Set());
    this.options = e, this.reconciler = e.reconciler || nc;
  }
  merge(e, t, r = {}) {
    const i = r.atPath;
    if (i != null && i.length) {
      const [s, ...o] = i;
      e === void 0 && (e = Cr(s));
      let a = e[s];
      a === void 0 && o.length && (a = Cr(o[0]));
      const c = this.merge(a, t, {
        ...r,
        atPath: o
      });
      return a !== c && (e = this.shallowCopyForMerge(e), e[s] = c), e;
    }
    return Array.isArray(e) && Array.isArray(t) && this.options.arrayMerge === "truncate" && e.length > t.length && (e = e.slice(0, t.length), this.pastCopies.add(e)), $(t) && $(e) ? (Object.keys(t).forEach((s) => {
      if (tc.call(e, s)) {
        const o = e[s];
        if (t[s] !== o) {
          const a = this.reconciler(e, t, s);
          a !== o && (e = this.shallowCopyForMerge(e), e[s] = a);
        }
      } else
        e = this.shallowCopyForMerge(e), e[s] = t[s];
    }), e) : t;
  }
  shallowCopyForMerge(e) {
    return $(e) && (this.pastCopies.has(e) || (Array.isArray(e) ? e = e.slice(0) : e = {
      __proto__: Object.getPrototypeOf(e),
      ...e
    }, this.pastCopies.add(e))), e;
  }
}
function nr(n) {
  const e = {}, t = n && n.variableDefinitions;
  return t && t.length && t.forEach((r) => {
    r.defaultValue && Me(e, r.variable.name, r.defaultValue);
  }), e;
}
function Yt(n, e) {
  switch (n.kind) {
    case "InlineFragment":
      return n;
    case "FragmentSpread": {
      const t = n.name.value;
      if (typeof e == "function")
        return e(t);
      const r = e && e[t];
      return A(r, 9, t), r || null;
    }
    default:
      return null;
  }
}
function rc(n, e) {
  let t = e;
  const r = [];
  return n.definitions.forEach((s) => {
    if (s.kind === "OperationDefinition")
      throw H(
        10,
        s.operation,
        s.name ? ` named '${s.name.value}'` : ""
      );
    s.kind === "FragmentDefinition" && r.push(s);
  }), typeof t > "u" && (A(r.length === 1, 11, r.length), t = r[0].name.value), {
    ...n,
    definitions: [
      {
        kind: "OperationDefinition",
        // OperationTypeNode is an enum
        operation: "query",
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "FragmentSpread",
              name: {
                kind: "Name",
                value: t
              }
            }
          ]
        }
      },
      ...n.definitions
    ]
  };
}
function ic(n) {
  A(n.kind === "Document", 6), A(n.definitions.length <= 1, 7);
  const e = n.definitions[0];
  return A(e.kind === "FragmentDefinition", 8), e;
}
function mt(n) {
  return n.definitions.filter((e) => e.kind === "FragmentDefinition");
}
function rs(n) {
  he(n);
  let e;
  for (let t of n.definitions) {
    if (t.kind === "OperationDefinition")
      return t;
    t.kind === "FragmentDefinition" && !e && (e = t);
  }
  if (e)
    return e;
  throw H(12);
}
function ae(n) {
  return he(n), n.definitions.filter((e) => e.kind === "OperationDefinition")[0];
}
function sc(n) {
  const e = ae(n);
  return A(e && e.operation === "query", 13), e;
}
const ie = Object.assign(function(e) {
  return JSON.stringify(e, oc);
}, {
  reset() {
    Ye = new Za(
      oe.canonicalStringify || 1e3
      /* defaultCacheSizes.canonicalStringify */
    );
  }
});
let Ye;
ie.reset();
function oc(n, e) {
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t === Object.prototype || t === null) {
      const r = Object.keys(e);
      if (r.every(ac))
        return e;
      const i = JSON.stringify(r);
      let s = Ye.get(i);
      if (!s) {
        r.sort();
        const a = JSON.stringify(r);
        s = Ye.get(a) || r, Ye.set(i, s), Ye.set(a, s);
      }
      const o = Object.create(t);
      return s.forEach((a) => {
        o[a] = e[a];
      }), o;
    }
  }
  return e;
}
function ac(n, e, t) {
  return e === 0 || t[e - 1] <= n;
}
const cc = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export",
  "nonreactive",
  "stream"
];
let $e = ie;
const is = Object.assign(function(n, e, t) {
  if (e && t && t.connection && t.connection.key) {
    if (t.connection.filter && t.connection.filter.length > 0) {
      const i = t.connection.filter ? t.connection.filter : [];
      i.sort();
      const s = {};
      i.forEach((a) => {
        s[a] = e[a];
      });
      const o = $e(s);
      if (o !== "{}")
        return `${t.connection.key}(${o})`;
    }
    return t.connection.key;
  }
  let r = n;
  if (e) {
    const i = $e(e);
    i !== "{}" && (r += `(${i})`);
  }
  return t && Object.keys(t).forEach((i) => {
    cc.indexOf(i) === -1 && (t[i] && Object.keys(t[i]).length ? r += `@${i}(${$e(t[i])})` : r += `@${i}`);
  }), r;
}, {
  setStringify(n) {
    const e = $e;
    return $e = n, e;
  }
});
function Ce(n) {
  var e;
  return !!((e = n.errors) != null && e.length);
}
function _e(n, e, t) {
  const r = new Set(n), i = r.size;
  return ee(e, {
    Directive(s) {
      if (r.delete(s.name.value) && (!t || !r.size))
        return Qn;
    }
  }), t ? !r.size : r.size < i;
}
function lc(n) {
  let e = !1;
  return ee(n, {
    Directive: {
      enter(t) {
        if (t.name.value === "client" && t.arguments && (e = t.arguments.some((r) => r.name.value === "always" && r.value.kind === "BooleanValue" && r.value.value === !0), e))
          return Qn;
      }
    }
  }), e;
}
const V = Array.isArray;
function uc(n) {
  return $(n) && n.kind === "Document" && Array.isArray(n.definitions);
}
function yt(n) {
  return n.kind === "Field";
}
function rr(n) {
  return Array.isArray(n) && n.length > 0;
}
function De(n) {
  return { __ref: String(n) };
}
function fc(n) {
  let e = n[0] || {};
  const t = n.length;
  if (t > 1) {
    const r = new je();
    for (let i = 1; i < t; ++i)
      e = r.merge(e, n[i]);
  }
  return e;
}
function It(n, e) {
  return G(n, e, e.variables && {
    variables: G({
      ...n && n.variables,
      ...e.variables
    })
  });
}
function _r(n) {
  return n.catch(() => {
  }), n;
}
function hc(n, e) {
  he(e);
  const t = Nr(""), r = Nr(""), i = (m) => {
    for (let v = 0, w; v < m.length && (w = m[v]); ++v)
      if (!V(w)) {
        if (w.kind === S.OPERATION_DEFINITION)
          return t(w.name && w.name.value);
        if (w.kind === S.FRAGMENT_DEFINITION)
          return r(w.name.value);
      }
    return A.error(14), null;
  };
  let s = 0;
  for (let m = e.definitions.length - 1; m >= 0; --m)
    e.definitions[m].kind === S.OPERATION_DEFINITION && ++s;
  const o = dc(n), a = (m) => rr(m) && m.map(o).some((v) => v && v.remove), c = /* @__PURE__ */ new Map();
  let l = !1;
  const u = {
    enter(m) {
      if (a(m.directives))
        return l = !0, null;
    }
  }, d = ee(e, {
    // These two AST node types share the same implementation, defined above.
    Field: u,
    InlineFragment: u,
    VariableDefinition: {
      enter() {
        return !1;
      }
    },
    Variable: {
      enter(m, v, w, E, k) {
        const O = i(k);
        O && O.variables.add(m.name.value);
      }
    },
    FragmentSpread: {
      enter(m, v, w, E, k) {
        if (a(m.directives))
          return l = !0, null;
        const O = i(k);
        O && O.fragmentSpreads.add(m.name.value);
      }
    },
    FragmentDefinition: {
      enter(m, v, w, E) {
        c.set(JSON.stringify(E), m);
      },
      leave(m, v, w, E) {
        const k = c.get(JSON.stringify(E));
        if (m === k)
          return m;
        if (
          // This logic applies only if the document contains one or more
          // operations, since removing all fragments from a document containing
          // only fragments makes the document useless.
          s > 0 && m.selectionSet.selections.every((O) => O.kind === S.FIELD && O.name.value === "__typename")
        )
          return r(m.name.value).removed = !0, l = !0, null;
      }
    },
    Directive: {
      leave(m) {
        if (o(m))
          return l = !0, null;
      }
    }
  });
  if (!l)
    return e;
  const f = (m) => (m.transitiveVars || (m.transitiveVars = new Set(m.variables), m.removed || m.fragmentSpreads.forEach((v) => {
    f(r(v)).transitiveVars.forEach((w) => {
      m.transitiveVars.add(w);
    });
  })), m), h = /* @__PURE__ */ new Set();
  d.definitions.forEach((m) => {
    m.kind === S.OPERATION_DEFINITION ? f(t(m.name && m.name.value)).fragmentSpreads.forEach((v) => {
      h.add(v);
    }) : m.kind === S.FRAGMENT_DEFINITION && // If there are no operations in the document, then all fragment
    // definitions count as usages of their own fragment names. This heuristic
    // prevents accidentally removing all fragment definitions from the
    // document just because it contains no operations that use the fragments.
    s === 0 && !r(m.name.value).removed && h.add(m.name.value);
  }), h.forEach((m) => {
    f(r(m)).fragmentSpreads.forEach((v) => {
      h.add(v);
    });
  });
  const p = (m) => !!// A fragment definition will be removed if there are no spreads that refer
  // to it, or the fragment was explicitly removed because it had no fields
  // other than __typename.
  (!h.has(m) || r(m).removed), y = {
    enter(m) {
      if (p(m.name.value))
        return null;
    }
  };
  return pc(ee(d, {
    // If the fragment is going to be removed, then leaving any dangling
    // FragmentSpread nodes with the same name would be a mistake.
    FragmentSpread: y,
    // This is where the fragment definition is actually removed.
    FragmentDefinition: y,
    OperationDefinition: {
      leave(m) {
        if (m.variableDefinitions) {
          const v = f(
            // If an operation is anonymous, we use the empty string as its key.
            t(m.name && m.name.value)
          ).transitiveVars;
          if (v.size < m.variableDefinitions.length)
            return {
              ...m,
              variableDefinitions: m.variableDefinitions.filter((w) => v.has(w.variable.name.value))
            };
        }
      }
    }
  }));
}
function Nr(n) {
  const e = /* @__PURE__ */ new Map();
  return function(r = n) {
    let i = e.get(r);
    return i || e.set(r, i = {
      // Variable and fragment spread names used directly within this
      // operation or fragment definition, as identified by key. These sets
      // will be populated during the first traversal of the document in
      // removeDirectivesFromDocument below.
      variables: /* @__PURE__ */ new Set(),
      fragmentSpreads: /* @__PURE__ */ new Set()
    }), i;
  };
}
function dc(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  return n.forEach((r) => {
    r && (r.name ? e.set(r.name, r) : r.test && t.set(r.test, r));
  }), (r) => {
    let i = e.get(r.name.value);
    return !i && t.size && t.forEach((s, o) => {
      o(r) && (i = s);
    }), i;
  };
}
function ss(n, e) {
  return !n || n.selectionSet.selections.every((t) => t.kind === S.FRAGMENT_SPREAD && ss(e[t.name.value], e));
}
function pc(n) {
  return ss(ae(n) || ic(n), pt(mt(n))) ? null : n;
}
function mc(n) {
  return ee(n, {
    FragmentSpread(e) {
      var t;
      if (!((t = e.directives) != null && t.some(({ name: r }) => r.value === "unmask")))
        return null;
    }
  });
}
function We(n) {
  return n.alias ? n.alias.value : n.name.value;
}
function Jt({ directives: n }, e) {
  return !n || !n.length ? !0 : vc(n).every(({ directive: t, ifArgument: r }) => {
    let i = !1;
    return r.value.kind === "Variable" ? (i = e && e[r.value.name.value], A(i !== void 0, 15, t.name.value)) : i = r.value.value, t.name.value === "skip" ? !i : i;
  });
}
function yc({ name: { value: n } }) {
  return n === "skip" || n === "include";
}
function vc(n) {
  const e = [];
  return n && n.length && n.forEach((t) => {
    if (!yc(t))
      return;
    const r = t.arguments, i = t.name.value;
    A(r && r.length === 1, 16, i);
    const s = r[0];
    A(s.name && s.name.value === "if", 17, i);
    const o = s.value;
    A(o && (o.kind === "Variable" || o.kind === "BooleanValue"), 18, i), e.push({ directive: t, ifArgument: s });
  }), e;
}
function gc(n, e) {
  let t = null;
  n.directives && (t = {}, n.directives.forEach((i) => {
    t[i.name.value] = {}, i.arguments && i.arguments.forEach(({ name: s, value: o }) => Me(t[i.name.value], s, o, e));
  }));
  let r = null;
  return n.arguments && n.arguments.length && (r = {}, n.arguments.forEach(({ name: i, value: s }) => Me(r, i, s, e))), is(n.name.value, r, t);
}
function Je(n) {
  const e = {
    data: n.data
  };
  return n.error && (e.error = n.error), e;
}
function Fn(n, e = () => {
}) {
  return (t) => new F((r) => {
    let i = e();
    return t.subscribe({
      next(s) {
        let o;
        try {
          o = n(s, i);
        } catch (a) {
          r.error(a);
        }
        o !== void 0 && r.next(o);
      },
      error(s) {
        r.error(s);
      },
      complete() {
        r.complete();
      }
    });
  });
}
const { toString: Ir, hasOwnProperty: bc } = Object.prototype, Ar = Function.prototype.toString, Pn = /* @__PURE__ */ new Map();
function P(n, e) {
  try {
    return Mn(n, e);
  } finally {
    Pn.clear();
  }
}
function Mn(n, e) {
  if (n === e)
    return !0;
  const t = Ir.call(n), r = Ir.call(e);
  if (t !== r)
    return !1;
  switch (t) {
    case "[object Array]":
      if (n.length !== e.length)
        return !1;
    // Fall through to object case...
    case "[object Object]": {
      if (Rr(n, e))
        return !0;
      const i = Dr(n), s = Dr(e), o = i.length;
      if (o !== s.length)
        return !1;
      for (let a = 0; a < o; ++a)
        if (!bc.call(e, i[a]))
          return !1;
      for (let a = 0; a < o; ++a) {
        const c = i[a];
        if (!Mn(n[c], e[c]))
          return !1;
      }
      return !0;
    }
    case "[object Error]":
      return n.name === e.name && n.message === e.message;
    case "[object Number]":
      if (n !== n)
        return e !== e;
    // Fall through to shared +a === +b case...
    case "[object Boolean]":
    case "[object Date]":
      return +n == +e;
    case "[object RegExp]":
    case "[object String]":
      return n == `${e}`;
    case "[object Map]":
    case "[object Set]": {
      if (n.size !== e.size)
        return !1;
      if (Rr(n, e))
        return !0;
      const i = n.entries(), s = t === "[object Map]";
      for (; ; ) {
        const o = i.next();
        if (o.done)
          break;
        const [a, c] = o.value;
        if (!e.has(a) || s && !Mn(c, e.get(a)))
          return !1;
      }
      return !0;
    }
    case "[object Uint16Array]":
    case "[object Uint8Array]":
    // Buffer, in Node.js.
    case "[object Uint32Array]":
    case "[object Int32Array]":
    case "[object Int8Array]":
    case "[object Int16Array]":
    case "[object ArrayBuffer]":
      n = new Uint8Array(n), e = new Uint8Array(e);
    // Fall through...
    case "[object DataView]": {
      let i = n.byteLength;
      if (i === e.byteLength)
        for (; i-- && n[i] === e[i]; )
          ;
      return i === -1;
    }
    case "[object AsyncFunction]":
    case "[object GeneratorFunction]":
    case "[object AsyncGeneratorFunction]":
    case "[object Function]": {
      const i = Ar.call(n);
      return i !== Ar.call(e) ? !1 : !kc(i, Ec);
    }
  }
  return !1;
}
function Dr(n) {
  return Object.keys(n).filter(wc, n);
}
function wc(n) {
  return this[n] !== void 0;
}
const Ec = "{ [native code] }";
function kc(n, e) {
  const t = n.length - e.length;
  return t >= 0 && n.indexOf(e, t) === t;
}
function Rr(n, e) {
  let t = Pn.get(n);
  if (t) {
    if (t.has(e))
      return !0;
  } else
    Pn.set(n, t = /* @__PURE__ */ new Set());
  return t.add(e), !1;
}
function os(n, { data: e, ...t }, { data: r, ...i }, s) {
  return P(t, i) && At(rs(n).selectionSet, e, r, {
    fragmentMap: pt(mt(n)),
    variables: s
  });
}
function At(n, e, t, r) {
  if (e === t)
    return !0;
  const i = /* @__PURE__ */ new Set();
  return n.selections.every((s) => {
    if (i.has(s) || (i.add(s), !Jt(s, r.variables)) || Fr(s))
      return !0;
    if (yt(s)) {
      const o = We(s), a = e && e[o], c = t && t[o], l = s.selectionSet;
      if (!l)
        return P(a, c);
      const u = Array.isArray(a), d = Array.isArray(c);
      if (u !== d)
        return !1;
      if (u && d) {
        const f = a.length;
        if (c.length !== f)
          return !1;
        for (let h = 0; h < f; ++h)
          if (!At(l, a[h], c[h], r))
            return !1;
        return !0;
      }
      return At(l, a, c, r);
    } else {
      const o = Yt(s, r.fragmentMap);
      if (o)
        return Fr(o) ? !0 : At(
          o.selectionSet,
          // Notice that we reuse the same aResult and bResult values here,
          // since the fragment ...spread does not specify a field name, but
          // consists of multiple fields (within the fragment's selection set)
          // that should be applied to the current result value(s).
          e,
          t,
          r
        );
    }
  });
}
function Fr(n) {
  return !!n.directives && n.directives.some(Sc);
}
function Sc(n) {
  return n.name.value === "nonreactive";
}
function Oc(n, e) {
  let t, r;
  function i(s) {
    return s !== t && (t = s, r = e(t)), r;
  }
  return Object.assign(n.pipe(fe(i), Kn({ bufferSize: 1, refCount: !0 })), {
    getCurrentResult: () => i(n.getCurrentResult())
  });
}
const xc = ns(function(e, t, r) {
  return Oc(e, r);
}, { max: 1, makeCacheKey: (n) => n.slice(0, 2) }), as = Symbol.for("apollo.result.extensions"), de = Symbol.for("apollo.result.streamInfo"), Tc = Symbol.for("apollo.observableQuery.variablesUnknown");
let W = null;
const Pr = {};
let Cc = 1;
const _c = () => class {
  constructor() {
    this.id = [
      "slot",
      Cc++,
      Date.now(),
      Math.random().toString(36).slice(2)
    ].join(":");
  }
  hasValue() {
    for (let e = W; e; e = e.parent)
      if (this.id in e.slots) {
        const t = e.slots[this.id];
        if (t === Pr)
          break;
        return e !== W && (W.slots[this.id] = t), !0;
      }
    return W && (W.slots[this.id] = Pr), !1;
  }
  getValue() {
    if (this.hasValue())
      return W.slots[this.id];
  }
  withValue(e, t, r, i) {
    const s = {
      __proto__: null,
      [this.id]: e
    }, o = W;
    W = { parent: o, slots: s };
    try {
      return t.apply(i, r);
    } finally {
      W = o;
    }
  }
  // Capture the current context and wrap a callback function so that it
  // reestablishes the captured context when called.
  static bind(e) {
    const t = W;
    return function() {
      const r = W;
      try {
        return W = t, e.apply(this, arguments);
      } finally {
        W = r;
      }
    };
  }
  // Immediately run a callback function without any captured context.
  static noContext(e, t, r) {
    if (W) {
      const i = W;
      try {
        return W = null, e.apply(r, t);
      } finally {
        W = i;
      }
    } else
      return e.apply(r, t);
  }
};
function Mr(n) {
  try {
    return n();
  } catch {
  }
}
const hn = "@wry/context:Slot", Nc = (
  // Prefer globalThis when available.
  // https://github.com/benjamn/wryware/issues/347
  Mr(() => globalThis) || // Fall back to global, which works in Node.js and may be converted by some
  // bundlers to the appropriate identifier (window, self, ...) depending on the
  // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
  Mr(() => global) || // Otherwise, use a dummy host that's local to this module. We used to fall
  // back to using the Array constructor as a namespace, but that was flagged in
  // https://github.com/benjamn/wryware/issues/347, and can be avoided.
  /* @__PURE__ */ Object.create(null)
), Lr = Nc, Kt = Lr[hn] || // Earlier versions of this package stored the globalKey property on the Array
// constructor, so we check there as well, to prevent Slot class duplication.
Array[hn] || (function(n) {
  try {
    Object.defineProperty(Lr, hn, {
      value: n,
      enumerable: !1,
      writable: !1,
      // When it was possible for globalHost to be the Array constructor (a
      // legacy Slot dedup strategy), it was important for the property to be
      // configurable:true so it could be deleted. That does not seem to be as
      // important when globalHost is the global object, but I don't want to
      // cause similar problems again, and configurable:true seems safest.
      // https://github.com/endojs/endo/issues/576#issuecomment-1178274008
      configurable: !0
    });
  } finally {
    return n;
  }
})(_c()), { bind: Mu, noContext: Lu } = Kt, Xt = new Kt(), { hasOwnProperty: Ic } = Object.prototype, ir = Array.from || function(n) {
  const e = [];
  return n.forEach((t) => e.push(t)), e;
};
function sr(n) {
  const { unsubscribe: e } = n;
  typeof e == "function" && (n.unsubscribe = void 0, e());
}
const ut = [], Ac = 100;
function Ve(n, e) {
  if (!n)
    throw new Error(e || "assertion failure");
}
function cs(n, e) {
  const t = n.length;
  return (
    // Unknown values are not equal to each other.
    t > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    t === e.length && // The underlying value or exception must be the same.
    n[t - 1] === e[t - 1]
  );
}
function ls(n) {
  switch (n.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return n[0];
    case 2:
      throw n[1];
  }
}
function us(n) {
  return n.slice(0);
}
class Zt {
  constructor(e) {
    this.fn = e, this.parents = /* @__PURE__ */ new Set(), this.childValues = /* @__PURE__ */ new Map(), this.dirtyChildren = null, this.dirty = !0, this.recomputing = !1, this.value = [], this.deps = null, ++Zt.count;
  }
  peek() {
    if (this.value.length === 1 && !pe(this))
      return jr(this), this.value[0];
  }
  // This is the most important method of the Entry API, because it
  // determines whether the cached this.value can be returned immediately,
  // or must be recomputed. The overall performance of the caching system
  // depends on the truth of the following observations: (1) this.dirty is
  // usually false, (2) this.dirtyChildren is usually null/empty, and thus
  // (3) valueGet(this.value) is usually returned without recomputation.
  recompute(e) {
    return Ve(!this.recomputing, "already recomputing"), jr(this), pe(this) ? Dc(this, e) : ls(this.value);
  }
  setDirty() {
    this.dirty || (this.dirty = !0, fs(this), sr(this));
  }
  dispose() {
    this.setDirty(), ys(this), or(this, (e, t) => {
      e.setDirty(), vs(e, this);
    });
  }
  forget() {
    this.dispose();
  }
  dependOn(e) {
    e.add(this), this.deps || (this.deps = ut.pop() || /* @__PURE__ */ new Set()), this.deps.add(e);
  }
  forgetDeps() {
    this.deps && (ir(this.deps).forEach((e) => e.delete(this)), this.deps.clear(), ut.push(this.deps), this.deps = null);
  }
}
Zt.count = 0;
function jr(n) {
  const e = Xt.getValue();
  if (e)
    return n.parents.add(e), e.childValues.has(n) || e.childValues.set(n, []), pe(n) ? ds(e, n) : ps(e, n), e;
}
function Dc(n, e) {
  return ys(n), Xt.withValue(n, Rc, [n, e]), Pc(n, e) && Fc(n), ls(n.value);
}
function Rc(n, e) {
  n.recomputing = !0;
  const { normalizeResult: t } = n;
  let r;
  t && n.value.length === 1 && (r = us(n.value)), n.value.length = 0;
  try {
    if (n.value[0] = n.fn.apply(null, e), t && r && !cs(r, n.value))
      try {
        n.value[0] = t(n.value[0], r[0]);
      } catch {
      }
  } catch (i) {
    n.value[1] = i;
  }
  n.recomputing = !1;
}
function pe(n) {
  return n.dirty || !!(n.dirtyChildren && n.dirtyChildren.size);
}
function Fc(n) {
  n.dirty = !1, !pe(n) && hs(n);
}
function fs(n) {
  or(n, ds);
}
function hs(n) {
  or(n, ps);
}
function or(n, e) {
  const t = n.parents.size;
  if (t) {
    const r = ir(n.parents);
    for (let i = 0; i < t; ++i)
      e(r[i], n);
  }
}
function ds(n, e) {
  Ve(n.childValues.has(e)), Ve(pe(e));
  const t = !pe(n);
  if (!n.dirtyChildren)
    n.dirtyChildren = ut.pop() || /* @__PURE__ */ new Set();
  else if (n.dirtyChildren.has(e))
    return;
  n.dirtyChildren.add(e), t && fs(n);
}
function ps(n, e) {
  Ve(n.childValues.has(e)), Ve(!pe(e));
  const t = n.childValues.get(e);
  t.length === 0 ? n.childValues.set(e, us(e.value)) : cs(t, e.value) || n.setDirty(), ms(n, e), !pe(n) && hs(n);
}
function ms(n, e) {
  const t = n.dirtyChildren;
  t && (t.delete(e), t.size === 0 && (ut.length < Ac && ut.push(t), n.dirtyChildren = null));
}
function ys(n) {
  n.childValues.size > 0 && n.childValues.forEach((e, t) => {
    vs(n, t);
  }), n.forgetDeps(), Ve(n.dirtyChildren === null);
}
function vs(n, e) {
  e.parents.delete(n), n.childValues.delete(e), ms(n, e);
}
function Pc(n, e) {
  if (typeof n.subscribe == "function")
    try {
      sr(n), n.unsubscribe = n.subscribe.apply(null, e);
    } catch {
      return n.setDirty(), !1;
    }
  return !0;
}
const Mc = {
  setDirty: !0,
  dispose: !0,
  forget: !0
  // Fully remove parent Entry from LRU cache and computation graph
};
function gs(n) {
  const e = /* @__PURE__ */ new Map();
  function t(r) {
    const i = Xt.getValue();
    if (i) {
      let s = e.get(r);
      s || e.set(r, s = /* @__PURE__ */ new Set()), i.dependOn(s);
    }
  }
  return t.dirty = function(i, s) {
    const o = e.get(i);
    if (o) {
      const a = s && Ic.call(Mc, s) ? s : "setDirty";
      ir(o).forEach((c) => c[a]()), e.delete(i), sr(o);
    }
  }, t;
}
let Vr;
function bs(...n) {
  return (Vr || (Vr = new ne(typeof WeakMap == "function"))).lookupArray(n);
}
const dn = /* @__PURE__ */ new Set();
function ft(n, { max: e = Math.pow(2, 16), keyArgs: t, makeCacheKey: r = bs, normalizeResult: i, subscribe: s, cache: o = Dn } = /* @__PURE__ */ Object.create(null)) {
  const a = typeof o == "function" ? new o(e, (f) => f.dispose()) : o, c = function() {
    const f = r.apply(null, t ? t.apply(null, arguments) : arguments);
    if (f === void 0)
      return n.apply(null, arguments);
    let h = a.get(f);
    h || (a.set(f, h = new Zt(n)), h.normalizeResult = i, h.subscribe = s, h.forget = () => a.delete(f));
    const p = h.recompute(Array.prototype.slice.call(arguments));
    return a.set(f, h), dn.add(a), Xt.hasValue() || (dn.forEach((y) => y.clean()), dn.clear()), p;
  };
  Object.defineProperty(c, "size", {
    get: () => a.size,
    configurable: !1,
    enumerable: !1
  }), Object.freeze(c.options = {
    max: e,
    keyArgs: t,
    makeCacheKey: r,
    normalizeResult: i,
    subscribe: s,
    cache: a
  });
  function l(f) {
    const h = f && a.get(f);
    h && h.setDirty();
  }
  c.dirtyKey = l, c.dirty = function() {
    l(r.apply(null, arguments));
  };
  function u(f) {
    const h = f && a.get(f);
    if (h)
      return h.peek();
  }
  c.peekKey = u, c.peek = function() {
    return u(r.apply(null, arguments));
  };
  function d(f) {
    return f ? a.delete(f) : !1;
  }
  return c.forgetKey = d, c.forget = function() {
    return d(r.apply(null, arguments));
  }, c.makeCacheKey = r, c.getKey = t ? function() {
    return r.apply(null, t.apply(null, arguments));
  } : r, Object.freeze(c);
}
function Lc(...n) {
  return bs.bind(null, ...n);
}
class jc {
  constructor() {
    // This code path can never be reached, so we won't implement it.
    g(this, "startRequest");
  }
  isIncrementalResult(e) {
    return !1;
  }
  prepareRequest(e) {
    return A(!_e(["defer", "stream"], e.query), 67), e;
  }
  extractErrors() {
  }
}
function Vc(n, { client: e }) {
  const t = {
    query: n.query,
    variables: n.variables || {},
    extensions: n.extensions || {},
    operationName: Le(n.query),
    operationType: ae(n.query).operation
  };
  let r = { ...n.context };
  const i = (o) => {
    typeof o == "function" ? r = { ...r, ...o(s()) } : r = { ...r, ...o };
  }, s = () => Object.freeze({ ...r });
  return Object.defineProperty(t, "setContext", {
    enumerable: !1,
    value: i
  }), Object.defineProperty(t, "getContext", {
    enumerable: !1,
    value: s
  }), Object.defineProperty(t, "client", {
    enumerable: !1,
    value: e
  }), t;
}
function Bc(n, e) {
  const t = { ...n }, r = new Set(Object.keys(n));
  return ee(e, {
    Variable(i, s, o) {
      o && o.kind !== "VariableDefinition" && r.delete(i.name.value);
    }
  }), r.forEach((i) => {
    delete t[i];
  }), t;
}
class z {
  constructor(e) {
    /**
    * @internal
    * Used to iterate through all links that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
    g(this, "left");
    /**
    * @internal
    * Used to iterate through all links that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
    g(this, "right");
    e && (this.request = e);
  }
  /**
   * Creates a link that completes immediately and does not emit a result.
   *
   * @example
   *
   * ```ts
   * const link = ApolloLink.empty();
   * ```
   */
  static empty() {
    return new z(() => at);
  }
  /**
   * Composes multiple links into a single composed link that executes each
   * provided link in serial order.
   *
   * @example
   *
   * ```ts
   * import { from, HttpLink, ApolloLink } from "@apollo/client";
   * import { RetryLink } from "@apollo/client/link/retry";
   * import MyAuthLink from "../auth";
   *
   * const link = ApolloLink.from([
   *   new RetryLink(),
   *   new MyAuthLink(),
   *   new HttpLink({ uri: "http://localhost:4000/graphql" }),
   * ]);
   * ```
   *
   * @param links - An array of `ApolloLink` instances or request handlers that
   * are executed in serial order.
   */
  static from(e) {
    if (e.length === 0)
      return z.empty();
    const [t, ...r] = e;
    return t.concat(...r);
  }
  /**
   * Creates a link that conditionally routes a request to different links.
   *
   * @example
   *
   * ```ts
   * import { ApolloLink, HttpLink } from "@apollo/client";
   *
   * const link = ApolloLink.split(
   *   (operation) => operation.getContext().version === 1,
   *   new HttpLink({ uri: "http://localhost:4000/v1/graphql" }),
   *   new HttpLink({ uri: "http://localhost:4000/v2/graphql" })
   * );
   * ```
   *
   * @param test - A predicate function that receives the current `operation`
   * and returns a boolean indicating which link to execute. Returning `true`
   * executes the `left` link. Returning `false` executes the `right` link.
   *
   * @param left - The link that executes when the `test` function returns
   * `true`.
   *
   * @param right - The link that executes when the `test` function returns
   * `false`. If the `right` link is not provided, the request is forwarded to
   * the next link in the chain.
   */
  static split(e, t, r = new z((i, s) => s(i))) {
    const i = new z((s, o) => e(s) ? t.request(s, o) : r.request(s, o));
    return Object.assign(i, { left: t, right: r });
  }
  /**
   * Executes a GraphQL request against a link. The `execute` function begins
   * the request by calling the request handler of the link.
   *
   * @example
   *
   * ```ts
   * const observable = ApolloLink.execute(link, { query, variables }, { client });
   *
   * observable.subscribe({
   *   next(value) {
   *     console.log("Received", value);
   *   },
   *   error(error) {
   *     console.error("Oops got error", error);
   *   },
   *   complete() {
   *     console.log("Request complete");
   *   },
   * });
   * ```
   *
   * @param link - The `ApolloLink` instance to execute the request.
   *
   * @param request - The GraphQL request details, such as the `query` and
   * `variables`.
   *
   * @param context - The execution context for the request, such as the
   * `client` making the request.
   */
  static execute(e, t, r) {
    return e.request(Vc(t, r), () => at);
  }
  /**
   * Combines multiple links into a single composed link.
   *
   * @example
   *
   * ```ts
   * const link = ApolloLink.concat(firstLink, secondLink, thirdLink);
   * ```
   *
   * @param links - The links to concatenate into a single link. Each link will
   * execute in serial order.
   *
   * @deprecated Use `ApolloLink.from` instead. `ApolloLink.concat` will be
   * removed in a future major version.
   */
  static concat(...e) {
    return z.from(e);
  }
  /**
   * Concatenates a link that conditionally routes a request to different links.
   *
   * @example
   *
   * ```ts
   * import { ApolloLink, HttpLink } from "@apollo/client";
   *
   * const previousLink = new ApolloLink((operation, forward) => {
   *   // Handle the request
   *
   *   return forward(operation);
   * });
   *
   * const link = previousLink.split(
   *   (operation) => operation.getContext().version === 1,
   *   new HttpLink({ uri: "http://localhost:4000/v1/graphql" }),
   *   new HttpLink({ uri: "http://localhost:4000/v2/graphql" })
   * );
   * ```
   *
   * @param test - A predicate function that receives the current `operation`
   * and returns a boolean indicating which link to execute. Returning `true`
   * executes the `left` link. Returning `false` executes the `right` link.
   *
   * @param left - The link that executes when the `test` function returns
   * `true`.
   *
   * @param right - The link that executes when the `test` function returns
   * `false`. If the `right` link is not provided, the request is forwarded to
   * the next link in the chain.
   */
  split(e, t, r) {
    return this.concat(z.split(e, t, r));
  }
  /**
   * Combines the link with other links into a single composed link.
   *
   * @example
   *
   * ```ts
   * import { ApolloLink, HttpLink } from "@apollo/client";
   *
   * const previousLink = new ApolloLink((operation, forward) => {
   *   // Handle the request
   *
   *   return forward(operation);
   * });
   *
   * const link = previousLink.concat(
   *   link1,
   *   link2,
   *   new HttpLink({ uri: "http://localhost:4000/graphql" })
   * );
   * ```
   */
  concat(...e) {
    return e.length === 0 ? this : e.reduce(this.combine.bind(this), this);
  }
  combine(e, t) {
    const r = new z((i, s) => e.request(i, (o) => t.request(o, s)));
    return Object.assign(r, { left: e, right: t });
  }
  /**
   * Runs the request handler for the provided operation.
   *
   * > [!NOTE]
   * > This is called by the `ApolloLink.execute` function for you and should
   * > not be called directly. Prefer using `ApolloLink.execute` to make the
   * > request instead.
   */
  request(e, t) {
    throw H(65);
  }
}
const Ln = z.execute;
function qc(n) {
  return n;
}
class re {
  constructor(e, t = {}) {
    g(this, "transform");
    g(this, "cached");
    g(this, "resultCache", /* @__PURE__ */ new WeakSet());
    /**
    * @internal
    * Used to iterate through all transforms that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
    g(this, "left");
    /**
    * @internal
    * Used to iterate through all transforms that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
    g(this, "right");
    this.transform = e, t.getCacheKey && (this.getCacheKey = t.getCacheKey), this.cached = t.cache !== !1, this.resetCache();
  }
  // This default implementation of getCacheKey can be overridden by providing
  // options.getCacheKey to the DocumentTransform constructor. In general, a
  // getCacheKey function may either return an array of keys (often including
  // the document) to be used as a cache key, or undefined to indicate the
  // transform for this document should not be cached.
  getCacheKey(e) {
    return [e];
  }
  /**
   * Creates a DocumentTransform that returns the input document unchanged.
   *
   * @returns The input document
   */
  static identity() {
    return new re(qc, { cache: !1 });
  }
  /**
   * Creates a DocumentTransform that conditionally applies one of two transforms.
   *
   * @param predicate - Function that determines which transform to apply
   * @param left - Transform to apply when `predicate` returns `true`
   * @param right - Transform to apply when `predicate` returns `false`. If not provided, it defaults to `DocumentTransform.identity()`.
   * @returns A DocumentTransform that conditionally applies a document transform based on the predicate
   *
   * @example
   *
   * ```ts
   * import { isQueryOperation } from "@apollo/client/utilities";
   *
   * const conditionalTransform = DocumentTransform.split(
   *   (document) => isQueryOperation(document),
   *   queryTransform,
   *   mutationTransform
   * );
   * ```
   */
  static split(e, t, r = re.identity()) {
    return Object.assign(new re(
      (i) => (e(i) ? t : r).transformDocument(i),
      // Reasonably assume both `left` and `right` transforms handle their own caching
      { cache: !1 }
    ), { left: t, right: r });
  }
  /**
   * Resets the internal cache of this transform, if it is cached.
   */
  resetCache() {
    if (this.cached) {
      const e = new ne();
      this.performWork = ft(re.prototype.performWork.bind(this), {
        makeCacheKey: (t) => {
          const r = this.getCacheKey(t);
          if (r)
            return A(Array.isArray(r), 20), e.lookupArray(r);
        },
        max: oe["documentTransform.cache"],
        cache: jt
      });
    }
  }
  performWork(e) {
    return he(e), this.transform(e);
  }
  /**
   * Transforms a GraphQL document using the configured transform function.
   *
   * @remarks
   *
   * Note that `transformDocument` caches the transformed document. Calling
   * `transformDocument` again with the already-transformed document will
   * immediately return it.
   *
   * @param document - The GraphQL document to transform
   * @returns The transformed document
   *
   * @example
   *
   * ```ts
   * const document = gql`
   *   # ...
   * `;
   *
   * const documentTransform = new DocumentTransform(transformFn);
   * const transformedDocument = documentTransform.transformDocument(document);
   * ```
   */
  transformDocument(e) {
    if (this.resultCache.has(e))
      return e;
    const t = this.performWork(e);
    return this.resultCache.add(t), t;
  }
  /**
   * Combines this document transform with another document transform. The
   * returned document transform first applies the current document transform,
   * then applies the other document transform.
   *
   * @param otherTransform - The transform to apply after this one
   * @returns A new DocumentTransform that applies both transforms in sequence
   *
   * @example
   *
   * ```ts
   * const combinedTransform = addTypenameTransform.concat(
   *   removeDirectivesTransform
   * );
   * ```
   */
  concat(e) {
    return Object.assign(new re(
      (t) => e.transformDocument(this.transformDocument(t)),
      // Reasonably assume both transforms handle their own caching
      { cache: !1 }
    ), {
      left: this,
      right: e
    });
  }
}
let pn;
const Re = Object.assign((n) => {
  let e = pn.get(n);
  return e || (e = zo(n), pn.set(n, e)), e;
}, {
  reset() {
    pn = new tr(
      oe.print || 2e3
      /* defaultCacheSizes.print */
    );
  }
});
Re.reset();
function R(n) {
  return !!(n && typeof n == "object" && typeof n.__ref == "string");
}
const Br = {
  kind: S.FIELD,
  name: {
    kind: S.NAME,
    value: "__typename"
  }
}, ws = Object.assign(function(n) {
  return ee(n, {
    SelectionSet: {
      enter(e, t, r) {
        if (r && r.kind === S.OPERATION_DEFINITION)
          return;
        const { selections: i } = e;
        if (!i || i.some((a) => a.kind === S.FIELD && (a.name.value === "__typename" || a.name.value.lastIndexOf("__", 0) === 0)))
          return;
        const o = r;
        if (!(o.kind === S.FIELD && o.directives && o.directives.some((a) => a.name.value === "export")))
          return {
            ...e,
            selections: [...i, Br]
          };
      }
    }
  });
}, {
  added(n) {
    return n === Br;
  }
});
function Es(n, e) {
  var t;
  return ((t = ae(n)) == null ? void 0 : t.operation) === e;
}
function Uc(n) {
  return Es(n, "mutation");
}
function Wc(n) {
  return Es(n, "subscription");
}
function ks(n) {
  return n === 7 || n === 8;
}
function Dt(n) {
  return !ks(n);
}
class zc {
  constructor() {
    g(this, "assumeImmutableResults", !1);
    g(this, "fragmentWatches", new ne(!0));
    /**
     * Can be overridden by subclasses to delay calling the provided callback
     * until after all broadcasts have been completed - e.g. in a cache scenario
     * where many watchers are notified in parallel.
     */
    g(this, "onAfterBroadcast", (e) => e());
    // Make sure we compute the same (===) fragment query document every
    // time we receive the same fragment in readFragment.
    g(this, "getFragmentDoc", ft(rc, {
      max: oe["cache.fragmentQueryDocuments"] || 1e3,
      cache: jt,
      makeCacheKey: Lc(this)
    }));
  }
  // Function used to lookup a fragment when a fragment definition is not part
  // of the GraphQL document. This is useful for caches, such as InMemoryCache,
  // that register fragments ahead of time so they can be referenced by name.
  lookupFragment(e) {
    return null;
  }
  // Transactional API
  /**
   * Executes multiple cache operations as a single batch, ensuring that
   * watchers are only notified once after all operations complete. This is
   * useful for improving performance when making multiple cache updates, as it
   * prevents unnecessary re-renders or query refetches between individual
   * operations.
   *
   * The `batch` method supports both optimistic and non-optimistic updates, and
   * provides fine-grained control over which cache layer receives the updates
   * and when watchers are notified.
   *
   * For usage instructions, see [Interacting with cached data: `cache.batch`](https://www.apollographql.com/docs/react/caching/cache-interaction#using-cachebatch).
   *
   * @example
   *
   * ```js
   * cache.batch({
   *   update(cache) {
   *     cache.writeQuery({
   *       query: GET_TODOS,
   *       data: { todos: updatedTodos },
   *     });
   *     cache.evict({ id: "Todo:123" });
   *   },
   * });
   * ```
   *
   * @example
   *
   * ```js
   * // Optimistic update with a custom layer ID
   * cache.batch({
   *   optimistic: "add-todo-optimistic",
   *   update(cache) {
   *     cache.modify({
   *       fields: {
   *         todos(existing = []) {
   *           return [...existing, newTodoRef];
   *         },
   *       },
   *     });
   *   },
   * });
   * ```
   *
   * @returns The return value of the `update` function.
   */
  batch(e) {
    const t = typeof e.optimistic == "string" ? e.optimistic : e.optimistic === !1 ? null : void 0;
    let r;
    return this.performTransaction(() => r = e.update(this), t), r;
  }
  recordOptimisticTransaction(e, t) {
    this.performTransaction(e, t);
  }
  // Optional API
  // Called once per input document, allowing the cache to make static changes
  // to the query, such as adding __typename fields.
  transformDocument(e) {
    return e;
  }
  // Called before each ApolloLink request, allowing the cache to make dynamic
  // changes to the query, such as filling in missing fragment definitions.
  transformForLink(e) {
    return e;
  }
  identify(e) {
  }
  gc() {
    return [];
  }
  modify(e) {
    return !1;
  }
  readQuery(e, t = !!e.optimistic) {
    return this.read({
      ...e,
      rootId: e.id || "ROOT_QUERY",
      optimistic: t
    });
  }
  /**
  * Watches the cache store of the fragment according to the options specified
  * and returns an `Observable`. We can subscribe to this
  * `Observable` and receive updated results through an
  * observer when the cache store changes.
  * 
  * You must pass in a GraphQL document with a single fragment or a document
  * with multiple fragments that represent what you are reading. If you pass
  * in a document with multiple fragments then you must also specify a
  * `fragmentName`.
  * 
  * @since 3.10.0
  * @param options - An object of type `WatchFragmentOptions` that allows
  * the cache to identify the fragment and optionally specify whether to react
  * to optimistic updates.
  */
  watchFragment(e) {
    const { fragment: t, fragmentName: r, from: i } = e, s = this.getFragmentDoc(t, r), a = (Array.isArray(i) ? i : [i]).map((h) => h == null ? h : this.toCacheId(h));
    if (!Array.isArray(i)) {
      const h = this.watchSingleFragment(a[0], s, e);
      return i === null ? h : xc(h, Symbol.for("apollo.transform.individualResult"), (p) => ({
        ...p,
        data: p.data ?? {}
      }));
    }
    let c;
    function l(h) {
      const p = h.reduce((y, m, v) => (y.data.push(m.data), y.complete && (y.complete = m.complete), y.dataState = y.complete ? "complete" : "partial", m.missing && (y.missing || (y.missing = {}), y.missing[v] = m.missing), y), {
        data: [],
        dataState: "complete",
        complete: !0
      });
      return P(c, p) || (c = p), c;
    }
    if (a.length === 0)
      return Qc;
    let u = !1;
    const d = a.map((h) => this.watchSingleFragment(h, s, e)), f = ec(d).pipe(fe(l), lt({
      subscribe: () => u = !0,
      unsubscribe: () => u = !1
    }), Kn({ bufferSize: 1, refCount: !0 }));
    return Object.assign(f, {
      getCurrentResult: () => {
        if (u && c)
          return c;
        const h = d.map((p) => p.getCurrentResult());
        return l(h);
      }
    });
  }
  watchSingleFragment(e, t, r) {
    if (e === null)
      return $c;
    const { optimistic: i = !0, variables: s } = r, o = [
      t,
      ie({ id: e, optimistic: i, variables: s })
    ], a = this.fragmentWatches.lookupArray(o);
    if (!a.observable) {
      let u = function(f) {
        const h = f.result;
        return (!l || !os(t, { data: l.data }, { data: h }, r.variables)) && (l = {
          data: h,
          dataState: f.complete ? "complete" : "partial",
          complete: f.complete
        }, f.missing && (l.missing = f.missing.missing)), l;
      }, c = !1, l;
      const d = new F((f) => {
        c = !0;
        const h = this.watch({
          variables: s,
          returnPartialData: !0,
          id: e,
          query: t,
          optimistic: i,
          immediate: !0,
          callback: (p) => {
            d.dirty = !0, this.onAfterBroadcast(() => {
              f.next(u(p)), d.dirty = !1;
            });
          }
        });
        return () => {
          c = !1, h(), this.fragmentWatches.removeArray(o);
        };
      }).pipe(Ma(), ct({
        connector: () => new Ri(1),
        // debounce so a synchronous unsubscribe+resubscribe doesn't tear down the watch and create a new one
        resetOnRefCountZero: () => Pa(0)
      }));
      a.observable = Object.assign(d, {
        dirty: !1,
        getCurrentResult: () => c && l ? l : u(this.diff({
          id: e,
          query: t,
          returnPartialData: !0,
          optimistic: i,
          variables: s
        }))
      });
    }
    return a.observable;
  }
  readFragment(e, t = !!e.optimistic) {
    const r = e.from !== void 0 ? this.toCacheId(e.from) : e.id;
    return this.read({
      ...e,
      query: this.getFragmentDoc(e.fragment, e.fragmentName),
      rootId: r,
      optimistic: t
    });
  }
  writeQuery({ id: e, data: t, ...r }) {
    return this.write(Object.assign(r, {
      dataId: e || "ROOT_QUERY",
      result: t
    }));
  }
  writeFragment({ data: e, fragment: t, fragmentName: r, ...i }) {
    const s = i.from !== void 0 ? this.toCacheId(i.from) : i.id;
    return this.write(Object.assign(i, {
      query: this.getFragmentDoc(t, r),
      dataId: s,
      result: e
    }));
  }
  updateQuery(e, t) {
    return this.batch({
      update(r) {
        const i = r.readQuery(e), s = t(i);
        return s == null ? i : (r.writeQuery({ ...e, data: s }), s);
      }
    });
  }
  updateFragment(e, t) {
    return this.batch({
      update(r) {
        const i = r.readFragment(e), s = t(i);
        return s == null ? i : (r.writeFragment({ ...e, data: s }), s);
      }
    });
  }
  toCacheId(e) {
    return typeof e == "string" ? e : this.identify(e);
  }
}
const qr = Object.freeze({
  data: null,
  dataState: "complete",
  complete: !0
}), $c = Object.assign(new F((n) => {
  n.next(qr);
}), { dirty: !1, getCurrentResult: () => qr }), Ur = Object.freeze({
  data: [],
  dataState: "complete",
  complete: !0
}), Qc = Object.assign(new F((n) => {
  n.next(Ur);
}), { getCurrentResult: () => Ur });
class ar extends Error {
  constructor(t, r, i, s) {
    super(t);
    g(this, "message");
    g(this, "path");
    g(this, "query");
    g(this, "variables");
    g(this, "missing");
    if (this.message = t, this.path = r, this.query = i, this.variables = s, this.name = "MissingFieldError", Array.isArray(this.path)) {
      this.missing = this.message;
      for (let o = this.path.length - 1; o >= 0; --o)
        this.missing = { [this.path[o]]: this.missing };
    } else
      this.missing = this.path;
    this.__proto__ = ar.prototype;
  }
}
const { hasOwnProperty: U } = Object.prototype;
function Ss({ __typename: n, id: e, _id: t }, r) {
  if (typeof n == "string" && (r && (r.keyObject = e != null ? { id: e } : t != null ? { _id: t } : void 0), e == null && t != null && (e = t), e != null))
    return `${n}:${typeof e == "number" || typeof e == "string" ? e : JSON.stringify(e)}`;
}
const Gc = {
  dataIdFromObject: Ss,
  resultCaching: !0
};
function Hc(n) {
  return G(Gc, n);
}
const Os = /^[_a-z][_0-9a-z]*/i;
function Be(n) {
  const e = n.match(Os);
  return e ? e[0] : n;
}
function jn(n, e, t) {
  return $(e) ? V(e) ? e.every((r) => jn(n, r, t)) : n.selections.every((r) => {
    if (yt(r) && Jt(r, t)) {
      const i = We(r);
      return U.call(e, i) && (!r.selectionSet || jn(r.selectionSet, e[i], t));
    }
    return !0;
  }) : !1;
}
function Ne(n) {
  return $(n) && !R(n) && !V(n);
}
function Yc() {
  return new je();
}
function xs(n, e) {
  const t = pt(mt(n));
  return {
    fragmentMap: t,
    lookupFragment(r) {
      let i = t[r];
      return !i && e && (i = e.lookup(r)), i || null;
    }
  };
}
const Rt = {}, mn = () => Rt, Wr = {};
class en {
  constructor(e, t) {
    g(this, "policies");
    g(this, "group");
    g(this, "data", {});
    // Maps root entity IDs to the number of times they have been retained, minus
    // the number of times they have been released. Retained entities keep other
    // entities they reference (even indirectly) from being garbage collected.
    g(this, "rootIds", {});
    // Lazily tracks { __ref: <dataId> } strings contained by this.data[dataId].
    g(this, "refs", {});
    // Bound function that can be passed around to provide easy access to fields
    // of Reference objects as well as ordinary objects.
    g(this, "getFieldValue", (e, t) => R(e) ? this.get(e.__ref, t) : e && e[t]);
    // Returns true for non-normalized StoreObjects and non-dangling
    // References, indicating that readField(name, objOrRef) has a chance of
    // working. Useful for filtering out dangling references from lists.
    g(this, "canRead", (e) => R(e) ? this.has(e.__ref) : typeof e == "object");
    // Bound function that converts an id or an object with a __typename and
    // primary key fields to a Reference object. If called with a Reference object,
    // that same Reference object is returned. Pass true for mergeIntoStore to persist
    // an object into the store.
    g(this, "toReference", (e, t) => {
      if (typeof e == "string")
        return De(e);
      if (R(e))
        return e;
      const [r] = this.policies.identify(e);
      if (r) {
        const i = De(r);
        return t && this.merge(r, e), i;
      }
    });
    this.policies = e, this.group = t;
  }
  // Although the EntityStore class is abstract, it contains concrete
  // implementations of the various NormalizedCache interface methods that
  // are inherited by the Root and Layer subclasses.
  toObject() {
    return { ...this.data };
  }
  has(e) {
    return this.lookup(e, !0) !== void 0;
  }
  get(e, t) {
    if (this.group.depend(e, t), U.call(this.data, e)) {
      const r = this.data[e];
      if (r && U.call(r, t))
        return r[t];
    }
    if (t === "__typename" && U.call(this.policies.rootTypenamesById, e))
      return this.policies.rootTypenamesById[e];
    if (this instanceof Z)
      return this.parent.get(e, t);
  }
  lookup(e, t) {
    if (t && this.group.depend(e, "__exists"), U.call(this.data, e))
      return this.data[e];
    if (this instanceof Z)
      return this.parent.lookup(e, t);
    if (this.policies.rootTypenamesById[e])
      return {};
  }
  merge(e, t) {
    let r;
    R(e) && (e = e.__ref), R(t) && (t = t.__ref);
    const i = typeof e == "string" ? this.lookup(r = e) : e, s = typeof t == "string" ? this.lookup(r = t) : t;
    if (!s)
      return;
    A(typeof r == "string", 99);
    const o = new je({
      reconciler: Xc
    }).merge(i, s);
    if (this.data[r] = o, o !== i && (delete this.refs[r], this.group.caching)) {
      const a = {};
      i || (a.__exists = 1), Object.keys(s).forEach((c) => {
        if (!i || i[c] !== o[c]) {
          a[c] = 1;
          const l = Be(c);
          l !== c && !this.policies.hasKeyArgs(o.__typename, l) && (a[l] = 1), o[c] === void 0 && !(this instanceof Z) && delete o[c];
        }
      }), a.__typename && !(i && i.__typename) && // Since we return default root __typename strings
      // automatically from store.get, we don't need to dirty the
      // ROOT_QUERY.__typename field if merged.__typename is equal
      // to the default string (usually "Query").
      this.policies.rootTypenamesById[r] === o.__typename && delete a.__typename, Object.keys(a).forEach((c) => this.group.dirty(r, c));
    }
  }
  modify(e, t, r) {
    const i = this.lookup(e);
    if (i) {
      const s = {};
      let o = !1, a = !0;
      const c = {
        DELETE: Rt,
        INVALIDATE: Wr,
        isReference: R,
        toReference: this.toReference,
        canRead: this.canRead,
        readField: (l, u) => this.policies.readField(typeof l == "string" ? {
          fieldName: l,
          from: u || De(e)
        } : l, { store: this })
      };
      if (Object.keys(i).forEach((l) => {
        const u = Be(l);
        let d = i[l];
        if (d === void 0)
          return;
        const f = typeof t == "function" ? t : t[l] || (r ? void 0 : t[u]);
        if (f) {
          let h = f === mn ? Rt : f(d, {
            ...c,
            fieldName: u,
            storeFieldName: l,
            storage: this.getStorage(e, l)
          });
          h === Wr ? this.group.dirty(e, l) : (h === Rt && (h = void 0), h !== d && (s[l] = h, o = !0, d = h));
        }
        d !== void 0 && (a = !1);
      }), o)
        return this.merge(e, s), a && (this instanceof Z ? this.data[e] = void 0 : delete this.data[e], this.group.dirty(e, "__exists")), !0;
    }
    return !1;
  }
  // If called with only one argument, removes the entire entity
  // identified by dataId. If called with a fieldName as well, removes all
  // fields of that entity whose names match fieldName according to the
  // fieldNameFromStoreName helper function. If called with a fieldName
  // and variables, removes all fields of that entity whose names match fieldName
  // and whose arguments when cached exactly match the variables passed.
  delete(e, t, r) {
    const i = this.lookup(e);
    if (i) {
      const s = this.getFieldValue(i, "__typename"), o = t && r ? this.policies.getStoreFieldName({ typename: s, fieldName: t, args: r }) : t;
      return this.modify(e, o ? {
        [o]: mn
      } : mn, !!r);
    }
    return !1;
  }
  evict(e, t) {
    let r = !1;
    return e.id && (U.call(this.data, e.id) && (r = this.delete(e.id, e.fieldName, e.args)), this instanceof Z && this !== t && (r = this.parent.evict(e, t) || r), (e.fieldName || r) && this.group.dirty(e.id, e.fieldName || "__exists")), r;
  }
  clear() {
    this.replace(null);
  }
  extract() {
    const e = this.toObject(), t = [];
    return this.getRootIdSet().forEach((r) => {
      U.call(this.policies.rootTypenamesById, r) || t.push(r);
    }), t.length && (e.__META = { extraRootIds: t.sort() }), e;
  }
  replace(e) {
    if (Object.keys(this.data).forEach((t) => {
      e && U.call(e, t) || this.delete(t);
    }), e) {
      const { __META: t, ...r } = e;
      Object.keys(r).forEach((i) => {
        this.merge(i, r[i]);
      }), t && t.extraRootIds.forEach(this.retain, this);
    }
  }
  retain(e) {
    return this.rootIds[e] = (this.rootIds[e] || 0) + 1;
  }
  release(e) {
    if (this.rootIds[e] > 0) {
      const t = --this.rootIds[e];
      return t || delete this.rootIds[e], t;
    }
    return 0;
  }
  // Return a Set<string> of all the ID strings that have been retained by
  // this layer/root *and* any layers/roots beneath it.
  getRootIdSet(e = /* @__PURE__ */ new Set()) {
    return Object.keys(this.rootIds).forEach(e.add, e), this instanceof Z ? this.parent.getRootIdSet(e) : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e), e;
  }
  // The goal of garbage collection is to remove IDs from the Root layer of the
  // store that are no longer reachable starting from any IDs that have been
  // explicitly retained (see retain and release, above). Returns an array of
  // dataId strings that were removed from the store.
  gc() {
    const e = this.getRootIdSet(), t = this.toObject();
    e.forEach((i) => {
      U.call(t, i) && (Object.keys(this.findChildRefIds(i)).forEach(e.add, e), delete t[i]);
    });
    const r = Object.keys(t);
    if (r.length) {
      let i = this;
      for (; i instanceof Z; )
        i = i.parent;
      r.forEach((s) => i.delete(s));
    }
    return r;
  }
  findChildRefIds(e) {
    if (!U.call(this.refs, e)) {
      const t = this.refs[e] = {}, r = this.data[e];
      if (!r)
        return t;
      const i = /* @__PURE__ */ new Set([r]);
      i.forEach((s) => {
        R(s) && (t[s.__ref] = !0), $(s) && Object.keys(s).forEach((o) => {
          const a = s[o];
          $(a) && i.add(a);
        });
      });
    }
    return this.refs[e];
  }
  makeCacheKey() {
    return this.group.keyMaker.lookupArray(arguments);
  }
  get supportsResultCaching() {
    return this.group.caching;
  }
}
class Ts {
  constructor(e, t = null) {
    g(this, "caching");
    g(this, "parent");
    g(this, "d", null);
    // Used by the EntityStore#makeCacheKey method to compute cache keys
    // specific to this CacheGroup.
    g(this, "keyMaker");
    this.caching = e, this.parent = t, this.resetCaching();
  }
  resetCaching() {
    this.d = this.caching ? gs() : null, this.keyMaker = new ne();
  }
  depend(e, t) {
    if (this.d) {
      this.d(yn(e, t));
      const r = Be(t);
      r !== t && this.d(yn(e, r)), this.parent && this.parent.depend(e, t);
    }
  }
  dirty(e, t) {
    this.d && this.d.dirty(
      yn(e, t),
      // When storeFieldName === "__exists", that means the entity identified
      // by dataId has either disappeared from the cache or was newly added,
      // so the result caching system would do well to "forget everything it
      // knows" about that object. To achieve that kind of invalidation, we
      // not only dirty the associated result cache entry, but also remove it
      // completely from the dependency graph. For the optimism implementation
      // details, see https://github.com/benjamn/optimism/pull/195.
      t === "__exists" ? "forget" : "setDirty"
    );
  }
}
function yn(n, e) {
  return e + "#" + n;
}
function zr(n, e) {
  Ze(n) && n.group.depend(e, "__exists");
}
class Jc extends en {
  constructor({ policies: t, resultCaching: r = !0, seed: i }) {
    super(t, new Ts(r));
    g(this, "stump", new Kc(this));
    g(this, "storageTrie", new ne());
    i && this.replace(i);
  }
  addLayer(t, r) {
    return this.stump.addLayer(t, r);
  }
  removeLayer() {
    return this;
  }
  getStorage() {
    return this.storageTrie.lookupArray(arguments);
  }
}
en.Root = Jc;
class Z extends en {
  constructor(t, r, i, s) {
    super(r.policies, s);
    g(this, "id");
    g(this, "parent");
    g(this, "replay");
    g(this, "group");
    this.id = t, this.parent = r, this.replay = i, this.group = s, i(this);
  }
  addLayer(t, r) {
    return new Z(t, this, r, this.group);
  }
  removeLayer(t) {
    const r = this.parent.removeLayer(t);
    return t === this.id ? (this.group.caching && Object.keys(this.data).forEach((i) => {
      const s = this.data[i], o = r.lookup(i);
      o ? s ? s !== o && Object.keys(s).forEach((a) => {
        P(s[a], o[a]) || this.group.dirty(i, a);
      }) : (this.group.dirty(i, "__exists"), Object.keys(o).forEach((a) => {
        this.group.dirty(i, a);
      })) : this.delete(i);
    }), r) : r === this.parent ? this : r.addLayer(this.id, this.replay);
  }
  toObject() {
    return {
      ...this.parent.toObject(),
      ...this.data
    };
  }
  findChildRefIds(t) {
    const r = this.parent.findChildRefIds(t);
    return U.call(this.data, t) ? {
      ...r,
      ...super.findChildRefIds(t)
    } : r;
  }
  getStorage(...t) {
    let r = this.parent;
    for (; r.parent; )
      r = r.parent;
    return r.getStorage(...t);
  }
}
class Kc extends Z {
  constructor(e) {
    super("EntityStore.Stump", e, () => {
    }, new Ts(e.group.caching, e.group));
  }
  removeLayer() {
    return this;
  }
  merge(e, t) {
    return this.parent.merge(e, t);
  }
}
function Xc(n, e, t) {
  const r = n[t], i = e[t];
  return P(r, i) ? r : i;
}
function Ze(n) {
  return !!(n && n.supportsResultCaching);
}
const Cs = new Kt();
function Zc(n) {
  var r, i;
  const e = (r = n.directives) == null ? void 0 : r.find(({ name: s }) => s.value === "unmask");
  if (!e)
    return "mask";
  const t = (i = e.arguments) == null ? void 0 : i.find(({ name: s }) => s.value === "mode");
  return t && "value" in t.value && t.value.value === "migrate" ? "migrate" : "unmask";
}
function _s(n, e, t) {
  return Cs.withValue(!0, () => Ke(n, e, t, !1));
}
function el(n, e) {
  if (e.has(n))
    return e.get(n);
  const t = Array.isArray(n) ? [] : {};
  return e.set(n, t), t;
}
function Ke(n, e, t, r, i) {
  const { knownChanged: s } = t, o = el(n, t.mutableTargets);
  if (Array.isArray(n)) {
    for (const [a, c] of Array.from(n.entries())) {
      if (c === null) {
        o[a] = null;
        continue;
      }
      const l = Ke(c, e, t, r);
      s.has(l) && s.add(o), o[a] = l;
    }
    return s.has(o) ? o : n;
  }
  for (const a of e.selections) {
    let c;
    if (r && s.add(o), a.kind === S.FIELD) {
      const l = We(a), u = a.selectionSet;
      if (c = o[l] || n[l], c === void 0)
        continue;
      if (u && c !== null) {
        const d = Ke(n[l], u, t, r);
        s.has(d) && (c = d);
      }
      o[l] = c;
    }
    if (a.kind === S.INLINE_FRAGMENT && (!a.typeCondition || t.cache.fragmentMatches(a, n.__typename)) && (c = Ke(n, a.selectionSet, t, r)), a.kind === S.FRAGMENT_SPREAD) {
      const l = a.name.value, u = t.fragmentMap[l] || (t.fragmentMap[l] = t.cache.lookupFragment(l));
      A(u, 39, l);
      const d = Zc(a);
      d !== "mask" && (c = Ke(n, u.selectionSet, t, d === "migrate"));
    }
    s.has(c) && s.add(o);
  }
  return "__typename" in n && !("__typename" in o) && (o.__typename = n.__typename), Object.keys(o).length !== Object.keys(n).length && s.add(o), s.has(o) ? o : n;
}
function tl(n, e, t, r) {
  const i = e.definitions.filter((o) => o.kind === S.FRAGMENT_DEFINITION);
  typeof r > "u" && (A(i.length === 1, 41, i.length), r = i[0].name.value);
  const s = i.find((o) => o.name.value === r);
  return A(!!s, 42, r), n == null || P(n, {}) ? n : _s(n, s.selectionSet, {
    operationName: s.name.value,
    fragmentMap: pt(mt(e)),
    cache: t,
    mutableTargets: /* @__PURE__ */ new WeakMap(),
    knownChanged: /* @__PURE__ */ new WeakSet()
  });
}
function nl(n, e, t) {
  var i;
  const r = ae(e);
  return A(r, 43), n == null ? n : _s(n, r.selectionSet, {
    operationType: r.operation,
    operationName: (i = r.name) == null ? void 0 : i.value,
    fragmentMap: pt(mt(e)),
    cache: t,
    mutableTargets: /* @__PURE__ */ new WeakMap(),
    knownChanged: /* @__PURE__ */ new WeakSet()
  });
}
const $r = {};
function cr(n) {
  const e = JSON.stringify(n);
  return $r[e] || ($r[e] = {});
}
function Qr(n) {
  const e = cr(n);
  return e.keyFieldsFn || (e.keyFieldsFn = (t, r) => {
    const i = (o, a) => r.readField(a, o), s = r.keyObject = lr(n, (o) => {
      let a = Fe(
        r.storeObject,
        o,
        // Using context.readField to extract paths from context.storeObject
        // allows the extraction to see through Reference objects and respect
        // custom read functions.
        i
      );
      return a === void 0 && t !== r.storeObject && U.call(t, o[0]) && (a = Fe(t, o, Is)), A(a !== void 0, 102, o.join("."), t), a;
    });
    return `${r.typename}:${JSON.stringify(s)}`;
  });
}
function Gr(n) {
  const e = cr(n);
  return e.keyArgsFn || (e.keyArgsFn = (t, { field: r, variables: i, fieldName: s }) => {
    const o = lr(n, (c) => {
      const l = c[0], u = l.charAt(0);
      if (u === "@") {
        if (r && rr(r.directives)) {
          const d = l.slice(1), f = r.directives.find((p) => p.name.value === d), h = f && er(f, i);
          return h && Fe(
            h,
            // If keyPath.length === 1, this code calls extractKeyPath with an
            // empty path, which works because it uses directiveArgs as the
            // extracted value.
            c.slice(1)
          );
        }
        return;
      }
      if (u === "$") {
        const d = l.slice(1);
        if (i && U.call(i, d)) {
          const f = c.slice(0);
          return f[0] = d, Fe(i, f);
        }
        return;
      }
      if (t)
        return Fe(t, c);
    }), a = JSON.stringify(o);
    return (t || a !== "{}") && (s += ":" + a), s;
  });
}
function lr(n, e) {
  const t = new je();
  return Ns(n).reduce((r, i) => {
    let s = e(i);
    if (s !== void 0) {
      for (let o = i.length - 1; o >= 0; --o)
        s = { [i[o]]: s };
      r = t.merge(r, s);
    }
    return r;
  }, {});
}
function Ns(n) {
  const e = cr(n);
  if (!e.paths) {
    const t = e.paths = [], r = [];
    n.forEach((i, s) => {
      V(i) ? (Ns(i).forEach((o) => t.push(r.concat(o))), r.length = 0) : (r.push(i), V(n[s + 1]) || (t.push(r.slice(0)), r.length = 0));
    });
  }
  return e.paths;
}
function Is(n, e) {
  return n[e];
}
function Fe(n, e, t) {
  return t = t || Is, As(e.reduce(function r(i, s) {
    return V(i) ? i.map((o) => r(o, s)) : i && t(i, s);
  }, n));
}
function As(n) {
  return $(n) ? V(n) ? n.map(As) : lr(Object.keys(n).sort(), (e) => Fe(n, e)) : n;
}
const Ds = new Kt(), Hr = /* @__PURE__ */ new WeakMap();
function et(n) {
  let e = Hr.get(n);
  return e || Hr.set(n, e = {
    vars: /* @__PURE__ */ new Set(),
    dep: gs()
  }), e;
}
function Yr(n) {
  et(n).vars.forEach((e) => e.forgetCache(n));
}
function rl(n) {
  et(n).vars.forEach((e) => e.attachCache(n));
}
function il(n) {
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set(), r = function(s) {
    if (arguments.length > 0) {
      if (n !== s) {
        n = s, e.forEach((a) => {
          et(a).dep.dirty(r), sl(a);
        });
        const o = Array.from(t);
        t.clear(), o.forEach((a) => a(n));
      }
    } else {
      const o = Ds.getValue();
      o && (i(o), et(o).dep(r));
    }
    return n;
  };
  r.onNextChange = (s) => (t.add(s), () => {
    t.delete(s);
  });
  const i = r.attachCache = (s) => (e.add(s), et(s).vars.add(r), r);
  return r.forgetCache = (s) => e.delete(s), r;
}
function sl(n) {
  n.broadcastWatches && n.broadcastWatches();
}
function Vn(n) {
  return n.args !== void 0 ? n.args : n.field ? er(n.field, n.variables) : null;
}
const ol = () => {
}, Jr = (n, e) => e.fieldName, Kr = (n, e, { mergeObjects: t }) => t(n, e), Xr = (n, e) => e, al = (n, e, { streamFieldInfo: t, existingData: r }) => {
  if (!n && !r)
    return e;
  const i = [], s = n ?? r, o = t != null && t.isLastChunk ? e.length : Math.max(s.length, e.length);
  for (let a = 0; a < o; a++)
    i[a] = e[a] === void 0 ? s[a] : e[a];
  return i;
};
class cl {
  constructor(e) {
    g(this, "config");
    g(this, "typePolicies", {});
    g(this, "toBeAdded", {});
    // Map from subtype names to sets of supertype names. Note that this
    // representation inverts the structure of possibleTypes (whose keys are
    // supertypes and whose values are arrays of subtypes) because it tends
    // to be much more efficient to search upwards than downwards.
    g(this, "supertypeMap", /* @__PURE__ */ new Map());
    // Any fuzzy subtypes specified by possibleTypes will be converted to
    // RegExp objects and recorded here. Every key of this map can also be
    // found in supertypeMap. In many cases this Map will be empty, which
    // means no fuzzy subtype checking will happen in fragmentMatches.
    g(this, "fuzzySubtypes", /* @__PURE__ */ new Map());
    g(this, "cache");
    g(this, "rootIdsByTypename", {});
    g(this, "rootTypenamesById", {});
    g(this, "usingPossibleTypes", !1);
    this.config = e, this.config = {
      dataIdFromObject: Ss,
      ...e
    }, this.cache = this.config.cache, this.setRootTypename("Query"), this.setRootTypename("Mutation"), this.setRootTypename("Subscription"), e.possibleTypes && this.addPossibleTypes(e.possibleTypes), e.typePolicies && this.addTypePolicies(e.typePolicies);
  }
  identify(e, t) {
    var u;
    const r = this, i = t && (t.typename || ((u = t.storeObject) == null ? void 0 : u.__typename)) || e.__typename;
    if (i === this.rootTypenamesById.ROOT_QUERY)
      return ["ROOT_QUERY"];
    const s = t && t.storeObject || e, o = {
      ...t,
      typename: i,
      storeObject: s,
      readField: t && t.readField || ((...d) => {
        const f = ur(d, s);
        return r.readField(f, {
          store: r.cache.data,
          variables: f.variables
        });
      })
    };
    let a;
    const c = i && this.getTypePolicy(i);
    let l = c && c.keyFn || this.config.dataIdFromObject;
    return Cs.withValue(!0, () => {
      for (; l; ) {
        const d = l({ ...e, ...s }, o);
        if (V(d))
          l = Qr(d);
        else {
          a = d;
          break;
        }
      }
    }), a = a ? String(a) : void 0, o.keyObject ? [a, o.keyObject] : [a];
  }
  addTypePolicies(e) {
    Object.keys(e).forEach((t) => {
      const { queryType: r, mutationType: i, subscriptionType: s, ...o } = e[t];
      r && this.setRootTypename("Query", t), i && this.setRootTypename("Mutation", t), s && this.setRootTypename("Subscription", t), U.call(this.toBeAdded, t) ? this.toBeAdded[t].push(o) : this.toBeAdded[t] = [o];
    });
  }
  updateTypePolicy(e, t, r) {
    const i = this.getTypePolicy(e), { keyFields: s, fields: o } = t;
    function a(c, l) {
      c.merge = typeof l == "function" ? l : l === !0 ? Kr : l === !1 ? Xr : c.merge;
    }
    a(i, t.merge), i.keyFn = // Pass false to disable normalization for this typename.
    s === !1 ? ol : V(s) ? Qr(s) : typeof s == "function" ? s : i.keyFn, o && Object.keys(o).forEach((c) => {
      let l = r[c];
      (!l || (l == null ? void 0 : l.typename) !== e) && (l = r[c] = { typename: e });
      const u = o[c];
      if (typeof u == "function")
        l.read = u;
      else {
        const { keyArgs: d, read: f, merge: h } = u;
        l.keyFn = // Pass false to disable argument-based differentiation of
        // field identities.
        d === !1 ? Jr : V(d) ? Gr(d) : typeof d == "function" ? d : l.keyFn, typeof f == "function" && (l.read = f), a(l, h);
      }
      l.read && l.merge && (l.keyFn = l.keyFn || Jr);
    });
  }
  setRootTypename(e, t = e) {
    const r = "ROOT_" + e.toUpperCase(), i = this.rootTypenamesById[r];
    t !== i && (A(!i || i === e, 103, e), i && delete this.rootIdsByTypename[i], this.rootIdsByTypename[t] = r, this.rootTypenamesById[r] = t);
  }
  addPossibleTypes(e) {
    this.usingPossibleTypes = !0, Object.keys(e).forEach((t) => {
      this.getSupertypeSet(t, !0), e[t].forEach((r) => {
        this.getSupertypeSet(r, !0).add(t);
        const i = r.match(Os);
        (!i || i[0] !== r) && this.fuzzySubtypes.set(r, new RegExp(r));
      });
    });
  }
  getTypePolicy(e) {
    if (!U.call(this.typePolicies, e)) {
      const r = this.typePolicies[e] = {};
      r.fields = {};
      let i = this.supertypeMap.get(e);
      !i && this.fuzzySubtypes.size && (i = this.getSupertypeSet(e, !0), this.fuzzySubtypes.forEach((s, o) => {
        if (s.test(e)) {
          const a = this.supertypeMap.get(o);
          a && a.forEach((c) => i.add(c));
        }
      })), i && i.size && i.forEach((s) => {
        const { fields: o, ...a } = this.getTypePolicy(s);
        Object.assign(r, a), Object.assign(r.fields, o);
      });
    }
    const t = this.toBeAdded[e];
    return t && t.length && t.splice(0).forEach((r) => {
      this.updateTypePolicy(e, r, this.typePolicies[e].fields);
    }), this.typePolicies[e];
  }
  getFieldPolicy(e, t) {
    if (e)
      return this.getTypePolicy(e).fields[t];
  }
  getSupertypeSet(e, t) {
    let r = this.supertypeMap.get(e);
    return !r && t && this.supertypeMap.set(e, r = /* @__PURE__ */ new Set()), r;
  }
  fragmentMatches(e, t, r, i) {
    if (!e.typeCondition)
      return !0;
    if (!t)
      return !1;
    const s = e.typeCondition.name.value;
    if (t === s)
      return !0;
    if (this.usingPossibleTypes && this.supertypeMap.has(s)) {
      const o = this.getSupertypeSet(t, !0), a = [o], c = (u) => {
        const d = this.getSupertypeSet(u, !1);
        d && d.size && a.indexOf(d) < 0 && a.push(d);
      };
      let l = !!(r && this.fuzzySubtypes.size);
      for (let u = 0; u < a.length; ++u) {
        const d = a[u];
        if (d.has(s))
          return o.has(s) || o.add(s), !0;
        d.forEach(c), l && // Start checking fuzzy subtypes only after exhausting all
        // non-fuzzy subtypes (after the final iteration of the loop).
        u === a.length - 1 && // We could wait to compare fragment.selectionSet to result
        // after we verify the supertype, but this check is often less
        // expensive than that search, and we will have to do the
        // comparison anyway whenever we find a potential match.
        jn(e.selectionSet, r, i) && (l = !1, this.fuzzySubtypes.forEach((f, h) => {
          const p = t.match(f);
          p && p[0] === t && c(h);
        }));
      }
    }
    return !1;
  }
  hasKeyArgs(e, t) {
    const r = this.getFieldPolicy(e, t);
    return !!(r && r.keyFn);
  }
  getStoreFieldName(e) {
    const { typename: t, fieldName: r } = e, i = this.getFieldPolicy(t, r);
    let s, o = i && i.keyFn;
    if (o && t) {
      const a = {
        typename: t,
        fieldName: r,
        field: e.field || null,
        variables: e.variables
      }, c = Vn(e);
      for (; o; ) {
        const l = o(c, a);
        if (V(l))
          o = Gr(l);
        else {
          s = l || r;
          break;
        }
      }
    }
    return s === void 0 && (s = e.field ? gc(e.field, e.variables) : is(r, Vn(e))), s === !1 ? r : r === Be(s) ? s : r + ":" + s;
  }
  readField(e, t) {
    const r = e.from;
    if (!r || !(e.field || e.fieldName))
      return;
    if (e.typename === void 0) {
      const u = t.store.getFieldValue(r, "__typename");
      u && (e.typename = u);
    }
    const s = this.getStoreFieldName(e), o = Be(s), a = t.store.getFieldValue(r, s), c = this.getFieldPolicy(e.typename, o), l = c && c.read;
    if (l) {
      const u = Rs(this, r, e, t, t.store.getStorage(R(r) ? r.__ref : r, s));
      return Ds.withValue(this.cache, l, [
        a,
        u
      ]);
    }
    return a;
  }
  getReadFunction(e, t) {
    const r = this.getFieldPolicy(e, t);
    return r && r.read;
  }
  getMergeFunction(e, t, r) {
    let i = this.getFieldPolicy(e, t), s = i && i.merge;
    return !s && r && (i = this.getTypePolicy(r), s = i && i.merge), s;
  }
  runMergeFunction(e, t, { field: r, typename: i, merge: s, path: o }, a, c) {
    var f, h, p;
    const l = e;
    if (s === Kr)
      return Fs(a.store)(e, t);
    if (s === Xr)
      return t;
    a.overwrite && (e = void 0);
    const u = (p = (h = (f = a.extensions) == null ? void 0 : f[de]) == null ? void 0 : h.deref()) == null ? void 0 : p.peekArray(o);
    if (u) {
      const { current: y, previous: m } = u;
      if (m && P(m.incoming, t) && P(m.streamFieldInfo, y))
        return m.result;
    }
    const d = s(e, t, ll(
      this,
      // Unlike options.readField for read functions, we do not fall
      // back to the current object if no foreignObjOrRef is provided,
      // because it's not clear what the current object should be for
      // merge functions: the (possibly undefined) existing object, or
      // the incoming object? If you think your merge function needs
      // to read sibling fields in order to produce a new value for
      // the current field, you might want to rethink your strategy,
      // because that's a recipe for making merge behavior sensitive
      // to the order in which fields are written into the cache.
      // However, readField(name, ref) is useful for merge functions
      // that need to deduplicate child objects and references.
      void 0,
      {
        typename: i,
        fieldName: r.name.value,
        field: r,
        variables: a.variables,
        path: o
      },
      a,
      c || {},
      l
    ));
    return u && (u.previous = {
      incoming: t,
      streamFieldInfo: u.current,
      result: d
    }), d;
  }
}
function Rs(n, e, t, r, i) {
  const s = n.getStoreFieldName(t), o = Be(s), a = t.variables || r.variables, { toReference: c, canRead: l } = r.store;
  return {
    args: Vn(t),
    field: t.field || null,
    fieldName: o,
    storeFieldName: s,
    variables: a,
    isReference: R,
    toReference: c,
    storage: i,
    cache: n.cache,
    canRead: l,
    readField(...u) {
      return n.readField(ur(u, e, a), r);
    },
    mergeObjects: Fs(r.store)
  };
}
function ll(n, e, t, r, i, s) {
  var c;
  const o = {
    ...Rs(n, e, t, r, i),
    extensions: r.extensions,
    existingData: s
  }, a = r.extensions;
  if (a && de in a) {
    const { [de]: l, ...u } = a, d = (c = l == null ? void 0 : l.deref()) == null ? void 0 : c.peekArray(t.path);
    d && (o.streamFieldInfo = d.current), o.extensions = Object.keys(u).length === 0 ? void 0 : u;
  }
  return o;
}
function ur(n, e, t) {
  const { 0: r, 1: i, length: s } = n;
  let o;
  return typeof r == "string" ? o = {
    fieldName: r,
    // Default to objectOrReference only when no second argument was
    // passed for the from parameter, not when undefined is explicitly
    // passed as the second argument.
    from: s > 1 ? i : e
  } : (o = { ...r }, U.call(o, "from") || (o.from = e)), o.variables === void 0 && (o.variables = t), o;
}
function Fs(n) {
  return function(t, r) {
    if (V(t) || V(r))
      throw H(106);
    if ($(t) && $(r)) {
      const i = n.getFieldValue(t, "__typename"), s = n.getFieldValue(r, "__typename");
      if (i && s && i !== s)
        return r;
      if (R(t) && Ne(r))
        return n.merge(t.__ref, r), t;
      if (Ne(t) && R(r))
        return n.merge(t, r.__ref), r;
      if (Ne(t) && Ne(r))
        return { ...t, ...r };
    }
    return r;
  };
}
function Zr(n) {
  return [n.selectionSet, n.objectOrReference, n.context];
}
class ul {
  constructor(e) {
    // cached version of executeSelectionSet
    g(this, "executeSelectionSet");
    // cached version of executeSubSelectedArray
    g(this, "executeSubSelectedArray");
    g(this, "config");
    g(this, "knownResults", /* @__PURE__ */ new WeakMap());
    this.config = e, this.executeSelectionSet = ft((t) => {
      const r = Zr(t), i = this.executeSelectionSet.peek(...r);
      return i || (zr(t.context.store, t.enclosingRef.__ref), this.execSelectionSetImpl(t));
    }, {
      max: oe["inMemoryCache.executeSelectionSet"] || 5e4,
      keyArgs: Zr,
      // Note that the parameters of makeCacheKey are determined by the
      // array returned by keyArgs.
      makeCacheKey(t, r, i) {
        if (Ze(i.store))
          return i.store.makeCacheKey(t, R(r) ? r.__ref : r, i.varString);
      }
    }), this.executeSubSelectedArray = ft((t) => (zr(t.context.store, t.enclosingRef.__ref), this.execSubSelectedArrayImpl(t)), {
      max: oe["inMemoryCache.executeSubSelectedArray"] || 1e4,
      makeCacheKey({ field: t, array: r, context: i }) {
        if (Ze(i.store))
          return i.store.makeCacheKey(t, r, i.varString);
      }
    });
  }
  /**
   * Given a store and a query, return as much of the result as possible and
   * identify if any data was missing from the store.
   */
  diffQueryAgainstStore({ store: e, query: t, rootId: r = "ROOT_QUERY", variables: i, returnPartialData: s = !0 }) {
    const o = this.config.cache.policies;
    i = {
      ...nr(sc(t)),
      ...i
    };
    const a = De(r), c = this.executeSelectionSet({
      selectionSet: rs(t).selectionSet,
      objectOrReference: a,
      enclosingRef: a,
      context: {
        store: e,
        query: t,
        policies: o,
        variables: i,
        varString: ie(i),
        ...xs(t, this.config.fragments)
      }
    });
    let l;
    c.missing && (l = new ar(fl(c.missing), c.missing, t, i));
    const u = !l, { result: d } = c;
    return {
      result: u ? d : s ? Object.keys(d).length === 0 ? null : d : null,
      complete: u,
      missing: l
    };
  }
  isFresh(e, t, r, i) {
    if (Ze(i.store) && this.knownResults.get(e) === r) {
      const s = this.executeSelectionSet.peek(r, t, i);
      if (s && e === s.result)
        return !0;
    }
    return !1;
  }
  // Uncached version of executeSelectionSet.
  execSelectionSetImpl({ selectionSet: e, objectOrReference: t, enclosingRef: r, context: i }) {
    if (R(t) && !i.policies.rootTypenamesById[t.__ref] && !i.store.has(t.__ref))
      return {
        result: {},
        missing: `Dangling reference to missing ${t.__ref} object`
      };
    const { variables: s, policies: o, store: a } = i, c = a.getFieldValue(t, "__typename"), l = [];
    let u;
    const d = new je();
    typeof c == "string" && !o.rootIdsByTypename[c] && l.push({ __typename: c });
    function f(v, w) {
      return v.missing && (u = d.merge(u, {
        [w]: v.missing
      })), v.result;
    }
    const h = new Set(e.selections);
    h.forEach((v) => {
      if (Jt(v, s))
        if (yt(v)) {
          let w = o.readField({
            fieldName: v.name.value,
            field: v,
            variables: i.variables,
            from: t
          }, i);
          const E = We(v);
          w === void 0 ? ws.added(v) || (u = d.merge(u, {
            [E]: `Can't find field '${v.name.value}' on ${R(t) ? t.__ref + " object" : "object " + JSON.stringify(t, null, 2)}`
          })) : V(w) ? w.length > 0 && (w = f(this.executeSubSelectedArray({
            field: v,
            array: w,
            enclosingRef: r,
            context: i
          }), E)) : v.selectionSet && w != null && (w = f(this.executeSelectionSet({
            selectionSet: v.selectionSet,
            objectOrReference: w,
            enclosingRef: R(w) ? w : r,
            context: i
          }), E)), w !== void 0 && l.push({ [E]: w });
        } else {
          const w = Yt(v, i.lookupFragment);
          if (!w && v.kind === S.FRAGMENT_SPREAD)
            throw H(107, v.name.value);
          w && o.fragmentMatches(w, c) && w.selectionSet.selections.forEach(h.add, h);
        }
    });
    const y = { result: fc(l), missing: u }, m = y;
    return m.result && this.knownResults.set(m.result, e), m;
  }
  // Uncached version of executeSubSelectedArray.
  execSubSelectedArrayImpl({ field: e, array: t, enclosingRef: r, context: i }) {
    let s, o = new je();
    function a(c, l) {
      return c.missing && (s = o.merge(s, { [l]: c.missing })), c.result;
    }
    return e.selectionSet && (t = t.filter((c) => c === void 0 || i.store.canRead(c))), t = t.map((c, l) => c === null ? null : V(c) ? a(this.executeSubSelectedArray({
      field: e,
      array: c,
      enclosingRef: r,
      context: i
    }), l) : e.selectionSet ? a(this.executeSelectionSet({
      selectionSet: e.selectionSet,
      objectOrReference: c,
      enclosingRef: R(c) ? c : r,
      context: i
    }), l) : c), {
      result: t,
      missing: s
    };
  }
}
function fl(n) {
  try {
    JSON.stringify(n, (e, t) => {
      if (typeof t == "string")
        throw t;
      return t;
    });
  } catch (e) {
    return e;
  }
}
function vn(n, e, t) {
  const r = `${e}${t}`;
  let i = n.flavors.get(r);
  return i || n.flavors.set(r, i = n.clientOnly === e && n.deferred === t ? n : {
    ...n,
    clientOnly: e,
    deferred: t
  }), i;
}
class hl {
  constructor(e, t, r) {
    g(this, "cache");
    g(this, "reader");
    g(this, "fragments");
    this.cache = e, this.reader = t, this.fragments = r;
  }
  writeToStore(e, { query: t, result: r, dataId: i, variables: s, overwrite: o, extensions: a }) {
    const c = ae(t), l = Yc();
    s = {
      ...nr(c),
      ...s
    };
    const u = {
      store: e,
      written: {},
      merge(f, h) {
        return l.merge(f, h);
      },
      variables: s,
      varString: ie(s),
      ...xs(t, this.fragments),
      overwrite: !!o,
      incomingById: /* @__PURE__ */ new Map(),
      clientOnly: !1,
      deferred: !1,
      flavors: /* @__PURE__ */ new Map(),
      extensions: a
    }, d = this.processSelectionSet({
      result: r || {},
      dataId: i,
      selectionSet: c.selectionSet,
      mergeTree: { map: /* @__PURE__ */ new Map() },
      context: u,
      path: []
    });
    if (!R(d))
      throw H(109, r);
    return u.incomingById.forEach(({ storeObject: f, mergeTree: h, fieldNodeSet: p }, y) => {
      const m = De(y);
      if (h && h.map.size) {
        const v = this.applyMerges(h, m, f, u);
        if (R(v))
          return;
        f = v;
      }
      e.merge(y, f);
    }), e.retain(d.__ref), d;
  }
  processSelectionSet({
    dataId: e,
    result: t,
    selectionSet: r,
    context: i,
    // This object allows processSelectionSet to report useful information
    // to its callers without explicitly returning that information.
    mergeTree: s,
    path: o
  }) {
    const { policies: a } = this.cache;
    let c = {};
    const l = e && a.rootTypenamesById[e] || qn(t, r, i.fragmentMap) || e && i.store.get(e, "__typename");
    typeof l == "string" && (c.__typename = l);
    const u = (...f) => {
      const h = ur(f, c, i.variables);
      if (R(h.from)) {
        const p = i.incomingById.get(h.from.__ref);
        if (p) {
          const y = a.readField({
            ...h,
            from: p.storeObject
          }, i);
          if (y !== void 0)
            return y;
        }
      }
      return a.readField(h, i);
    }, d = /* @__PURE__ */ new Set();
    this.flattenFields(
      r,
      t,
      // This WriteContext will be the default context value for fields returned
      // by the flattenFields method, but some fields may be assigned a modified
      // context, depending on the presence of @client and other directives.
      i,
      l
    ).forEach((f, h) => {
      var v;
      const p = We(h), y = t[p], m = [...o, h.name.value];
      if (d.add(h), y !== void 0) {
        const w = a.getStoreFieldName({
          typename: l,
          fieldName: h.name.value,
          field: h,
          variables: f.variables
        }), E = ei(s, w);
        let k = this.processFieldValue(
          y,
          h,
          // Reset context.clientOnly and context.deferred to their default
          // values before processing nested selection sets.
          h.selectionSet ? vn(f, !1, !1) : f,
          E,
          m
        ), O;
        h.selectionSet && (R(k) || Ne(k)) && (O = u("__typename", k));
        const I = a.getMergeFunction(l, h.name.value, O);
        I ? E.info = {
          // TODO Check compatibility against any existing childTree.field?
          field: h,
          typename: l,
          merge: I,
          path: m
        } : _e(["stream"], h) && Array.isArray(k) && ((v = f.extensions) != null && v[de]) ? E.info = {
          field: h,
          typename: l,
          merge: al,
          path: m
        } : ti(s, w), c = f.merge(c, {
          [w]: k
        });
      }
    });
    try {
      const [f, h] = a.identify(t, {
        typename: l,
        selectionSet: r,
        fragmentMap: i.fragmentMap,
        storeObject: c,
        readField: u
      });
      e = e || f, h && (c = i.merge(c, h));
    } catch (f) {
      if (!e)
        throw f;
    }
    if (typeof e == "string") {
      const f = De(e), h = i.written[e] || (i.written[e] = []);
      if (h.indexOf(r) >= 0 || (h.push(r), this.reader && this.reader.isFresh(t, f, r, i)))
        return f;
      const p = i.incomingById.get(e);
      return p ? (p.storeObject = i.merge(p.storeObject, c), p.mergeTree = Bn(p.mergeTree, s), d.forEach((y) => p.fieldNodeSet.add(y))) : i.incomingById.set(e, {
        storeObject: c,
        // Save a reference to mergeTree only if it is not empty, because
        // empty MergeTrees may be recycled by maybeRecycleChildMergeTree and
        // reused for entirely different parts of the result tree.
        mergeTree: Vt(s) ? void 0 : s,
        fieldNodeSet: d
      }), f;
    }
    return c;
  }
  processFieldValue(e, t, r, i, s) {
    return !t.selectionSet || e === null ? e : V(e) ? e.map((o, a) => {
      const c = this.processFieldValue(o, t, r, ei(i, a), [...s, a]);
      return ti(i, a), c;
    }) : this.processSelectionSet({
      result: e,
      selectionSet: t.selectionSet,
      context: r,
      mergeTree: i,
      path: s
    });
  }
  // Implements https://spec.graphql.org/draft/#sec-Field-Collection, but with
  // some additions for tracking @client and @defer directives.
  flattenFields(e, t, r, i = qn(t, e, r.fragmentMap)) {
    const s = /* @__PURE__ */ new Map(), { policies: o } = this.cache, a = new ne(!1);
    return (function c(l, u) {
      const d = a.lookup(
        l,
        // Because we take inheritedClientOnly and inheritedDeferred into
        // consideration here (in addition to selectionSet), it's possible for
        // the same selection set to be flattened more than once, if it appears
        // in the query with different @client and/or @directive configurations.
        u.clientOnly,
        u.deferred
      );
      d.visited || (d.visited = !0, l.selections.forEach((f) => {
        if (!Jt(f, r.variables))
          return;
        let { clientOnly: h, deferred: p } = u;
        if (
          // Since the presence of @client or @defer on this field can only
          // cause clientOnly or deferred to become true, we can skip the
          // forEach loop if both clientOnly and deferred are already true.
          !(h && p) && rr(f.directives) && f.directives.forEach((y) => {
            const m = y.name.value;
            if (m === "client" && (h = !0), m === "defer") {
              const v = er(y, r.variables);
              (!v || v.if !== !1) && (p = !0);
            }
          }), yt(f)
        ) {
          const y = s.get(f);
          y && (h = h && y.clientOnly, p = p && y.deferred), s.set(f, vn(r, h, p));
        } else {
          const y = Yt(f, r.lookupFragment);
          if (!y && f.kind === S.FRAGMENT_SPREAD)
            throw H(111, f.name.value);
          y && o.fragmentMatches(y, i, t, r.variables) && c(y.selectionSet, vn(r, h, p));
        }
      }));
    })(e, r), s;
  }
  applyMerges(e, t, r, i, s) {
    if (e.map.size && !R(r)) {
      const o = (
        // Items in the same position in different arrays are not
        // necessarily related to each other, so when incoming is an array
        // we process its elements as if there was no existing data.
        !V(r) && // Likewise, existing must be either a Reference or a StoreObject
        // in order for its fields to be safe to merge with the fields of
        // the incoming object.
        (R(t) || Ne(t)) ? t : void 0
      ), a = r;
      o && !s && (s = [R(o) ? o.__ref : o]);
      let c;
      const l = (u, d) => V(u) ? typeof d == "number" ? u[d] : void 0 : i.store.getFieldValue(u, String(d));
      e.map.forEach((u, d) => {
        const f = l(o, d), h = l(a, d);
        if (h === void 0)
          return;
        s && s.push(d);
        const p = this.applyMerges(u, f, h, i, s);
        p !== h && (c = c || /* @__PURE__ */ new Map(), c.set(d, p)), s && A(s.pop() === d);
      }), c && (r = V(a) ? a.slice(0) : { ...a }, c.forEach((u, d) => {
        r[d] = u;
      }));
    }
    return e.info ? this.cache.policies.runMergeFunction(t, r, e.info, i, s && i.store.getStorage(...s)) : r;
  }
}
const Ps = [];
function ei({ map: n }, e) {
  return n.has(e) || n.set(e, Ps.pop() || { map: /* @__PURE__ */ new Map() }), n.get(e);
}
function Bn(n, e) {
  if (n === e || !e || Vt(e))
    return n;
  if (!n || Vt(n))
    return e;
  const t = n.info && e.info ? {
    ...n.info,
    ...e.info
  } : n.info || e.info, r = n.map.size && e.map.size, i = r ? /* @__PURE__ */ new Map() : n.map.size ? n.map : e.map, s = { info: t, map: i };
  if (r) {
    const o = new Set(e.map.keys());
    n.map.forEach((a, c) => {
      s.map.set(c, Bn(a, e.map.get(c))), o.delete(c);
    }), o.forEach((a) => {
      s.map.set(a, Bn(e.map.get(a), n.map.get(a)));
    });
  }
  return s;
}
function Vt(n) {
  return !n || !(n.info || n.map.size);
}
function ti({ map: n }, e) {
  const t = n.get(e);
  t && Vt(t) && (Ps.push(t), n.delete(e));
}
function qn(n, e, t) {
  let r;
  for (const i of e.selections)
    if (yt(i)) {
      if (i.name.value === "__typename")
        return n[We(i)];
    } else r ? r.push(i) : r = [i];
  if (typeof n.__typename == "string")
    return n.__typename;
  if (r)
    for (const i of r) {
      const s = qn(n, Yt(i, t).selectionSet, t);
      if (typeof s == "string")
        return s;
    }
}
class dl extends zc {
  constructor(t = {}) {
    super();
    g(this, "data");
    g(this, "optimisticData");
    g(this, "config");
    g(this, "watches", /* @__PURE__ */ new Set());
    g(this, "storeReader");
    g(this, "storeWriter");
    g(this, "addTypenameTransform", new re(ws));
    g(this, "maybeBroadcastWatch");
    // Override the default value, since InMemoryCache result objects are frozen
    // in development and expected to remain logically immutable in production.
    g(this, "assumeImmutableResults", !0);
    // Dynamically imported code can augment existing typePolicies or
    // possibleTypes by calling cache.policies.addTypePolicies or
    // cache.policies.addPossibletypes.
    g(this, "policies");
    g(this, "makeVar", il);
    g(this, "txCount", 0);
    this.config = Hc(t), this.policies = new cl({
      cache: this,
      dataIdFromObject: this.config.dataIdFromObject,
      possibleTypes: this.config.possibleTypes,
      typePolicies: this.config.typePolicies
    }), this.init();
  }
  init() {
    const t = this.data = new en.Root({
      policies: this.policies,
      resultCaching: this.config.resultCaching
    });
    this.optimisticData = t.stump, this.resetResultCache();
  }
  resetResultCache() {
    const { fragments: t } = this.config;
    this.addTypenameTransform.resetCache(), t == null || t.resetCaches(), this.storeWriter = new hl(this, this.storeReader = new ul({ cache: this, fragments: t }), t), this.maybeBroadcastWatch = ft((r, i) => this.broadcastWatch(r, i), {
      max: oe["inMemoryCache.maybeBroadcastWatch"] || 5e3,
      makeCacheKey: (r) => {
        const i = r.optimistic ? this.optimisticData : this.data;
        if (Ze(i)) {
          const { optimistic: s, id: o, variables: a } = r;
          return i.makeCacheKey(
            r.query,
            // Different watches can have the same query, optimistic
            // status, rootId, and variables, but if their callbacks are
            // different, the (identical) result needs to be delivered to
            // each distinct callback. The easiest way to achieve that
            // separation is to include c.callback in the cache key for
            // maybeBroadcastWatch calls. See issue #5733.
            r.callback,
            ie({ optimistic: s, id: o, variables: a })
          );
        }
      }
    }), (/* @__PURE__ */ new Set([this.data.group, this.optimisticData.group])).forEach((r) => r.resetCaching());
  }
  restore(t) {
    return this.init(), t && this.data.replace(t), this;
  }
  extract(t = !1) {
    return (t ? this.optimisticData : this.data).extract();
  }
  read(t) {
    const {
      // Since read returns data or null, without any additional metadata
      // about whether/where there might have been missing fields, the
      // default behavior cannot be returnPartialData = true (like it is
      // for the diff method), since defaulting to true would violate the
      // integrity of the T in the return type. However, partial data may
      // be useful in some cases, so returnPartialData:true may be
      // specified explicitly.
      returnPartialData: r = !1
    } = t;
    return this.storeReader.diffQueryAgainstStore({
      ...t,
      store: t.optimistic ? this.optimisticData : this.data,
      config: this.config,
      returnPartialData: r
    }).result;
  }
  write(t) {
    try {
      return ++this.txCount, this.storeWriter.writeToStore(this.data, t);
    } finally {
      !--this.txCount && t.broadcast !== !1 && this.broadcastWatches();
    }
  }
  modify(t) {
    if (U.call(t, "id") && !t.id)
      return !1;
    const r = t.optimistic ? this.optimisticData : this.data;
    try {
      return ++this.txCount, r.modify(t.id || "ROOT_QUERY", t.fields, !1);
    } finally {
      !--this.txCount && t.broadcast !== !1 && this.broadcastWatches();
    }
  }
  diff(t) {
    return this.storeReader.diffQueryAgainstStore({
      ...t,
      store: t.optimistic ? this.optimisticData : this.data,
      rootId: t.id || "ROOT_QUERY",
      config: this.config
    });
  }
  watch(t) {
    return this.watches.size || rl(this), this.watches.add(t), t.immediate && this.maybeBroadcastWatch(t), () => {
      this.watches.delete(t) && !this.watches.size && Yr(this), this.maybeBroadcastWatch.forget(t);
    };
  }
  gc(t) {
    ie.reset(), Re.reset();
    const r = this.optimisticData.gc();
    return t && !this.txCount && t.resetResultCache && this.resetResultCache(), r;
  }
  // Call this method to ensure the given root ID remains in the cache after
  // garbage collection, along with its transitive child entities. Note that
  // the cache automatically retains all directly written entities. By default,
  // the retainment persists after optimistic updates are removed. Pass true
  // for the optimistic argument if you would prefer for the retainment to be
  // discarded when the top-most optimistic layer is removed. Returns the
  // resulting (non-negative) retainment count.
  retain(t, r) {
    return (r ? this.optimisticData : this.data).retain(t);
  }
  // Call this method to undo the effect of the retain method, above. Once the
  // retainment count falls to zero, the given ID will no longer be preserved
  // during garbage collection, though it may still be preserved by other safe
  // entities that refer to it. Returns the resulting (non-negative) retainment
  // count, in case that's useful.
  release(t, r) {
    return (r ? this.optimisticData : this.data).release(t);
  }
  // Returns the canonical ID for a given StoreObject, obeying typePolicies
  // and keyFields (and dataIdFromObject, if you still use that). At minimum,
  // the object must contain a __typename and any primary key fields required
  // to identify entities of that type. If you pass a query result object, be
  // sure that none of the primary key fields have been renamed by aliasing.
  // If you pass a Reference object, its __ref ID string will be returned.
  identify(t) {
    if (R(t))
      return t.__ref;
    try {
      return this.policies.identify(t)[0];
    } catch {
    }
  }
  evict(t) {
    if (!t.id) {
      if (U.call(t, "id"))
        return !1;
      t = { ...t, id: "ROOT_QUERY" };
    }
    try {
      return ++this.txCount, this.optimisticData.evict(t, this.data);
    } finally {
      !--this.txCount && t.broadcast !== !1 && this.broadcastWatches();
    }
  }
  reset(t) {
    return this.init(), ie.reset(), t && t.discardWatches ? (this.watches.forEach((r) => this.maybeBroadcastWatch.forget(r)), this.watches.clear(), Yr(this)) : this.broadcastWatches(), Promise.resolve();
  }
  removeOptimistic(t) {
    const r = this.optimisticData.removeLayer(t);
    r !== this.optimisticData && (this.optimisticData = r, this.broadcastWatches());
  }
  /**
  * Executes multiple cache operations as a single batch, ensuring that
  * watchers are only notified once after all operations complete. This is
  * useful for improving performance when making multiple cache updates, as it
  * prevents unnecessary re-renders or query refetches between individual
  * operations.
  * 
  * The `batch` method supports both optimistic and non-optimistic updates, and
  * provides fine-grained control over which cache layer receives the updates
  * and when watchers are notified.
  * 
  * For usage instructions, see [Interacting with cached data: `cache.batch`](https://www.apollographql.com/docs/react/caching/cache-interaction#using-cachebatch).
  * 
  * @example
  * 
  * ```js
  * cache.batch({
  *   update(cache) {
  *     cache.writeQuery({
  *       query: GET_TODOS,
  *       data: { todos: updatedTodos },
  *     });
  *     cache.evict({ id: "Todo:123" });
  *   },
  * });
  * ```
  * 
  * @example
  * 
  * ```js
  * // Optimistic update with a custom layer ID
  * cache.batch({
  *   optimistic: "add-todo-optimistic",
  *   update(cache) {
  *     cache.modify({
  *       fields: {
  *         todos(existing = []) {
  *           return [...existing, newTodoRef];
  *         },
  *       },
  *     });
  *   },
  * });
  * ```
  * 
  * @returns The return value of the `update` function.
  */
  batch(t) {
    const { update: r, optimistic: i = !0, removeOptimistic: s, onWatchUpdated: o } = t;
    let a;
    const c = (u) => {
      const { data: d, optimisticData: f } = this;
      ++this.txCount, u && (this.data = this.optimisticData = u);
      try {
        return a = r(this);
      } finally {
        --this.txCount, this.data = d, this.optimisticData = f;
      }
    }, l = /* @__PURE__ */ new Set();
    return o && !this.txCount && this.broadcastWatches({
      ...t,
      onWatchUpdated(u) {
        return l.add(u), !1;
      }
    }), typeof i == "string" ? this.optimisticData = this.optimisticData.addLayer(i, c) : i === !1 ? c(this.data) : c(), typeof s == "string" && (this.optimisticData = this.optimisticData.removeLayer(s)), o && l.size ? (this.broadcastWatches({
      ...t,
      onWatchUpdated(u, d) {
        const f = o.call(this, u, d);
        return f !== !1 && l.delete(u), f;
      }
    }), l.size && l.forEach((u) => this.maybeBroadcastWatch.dirty(u))) : this.broadcastWatches(t), a;
  }
  performTransaction(t, r) {
    return this.batch({
      update: t,
      optimistic: r || r !== null
    });
  }
  transformDocument(t) {
    return this.addTypenameTransform.transformDocument(this.addFragmentsToDocument(t));
  }
  fragmentMatches(t, r) {
    return this.policies.fragmentMatches(t, r);
  }
  lookupFragment(t) {
    var r;
    return ((r = this.config.fragments) == null ? void 0 : r.lookup(t)) || null;
  }
  resolvesClientField(t, r) {
    return !!this.policies.getReadFunction(t, r);
  }
  broadcastWatches(t) {
    if (!this.txCount) {
      const r = this.onAfterBroadcast, i = /* @__PURE__ */ new Set();
      this.onAfterBroadcast = (s) => {
        i.add(s);
      };
      try {
        this.watches.forEach((s) => this.maybeBroadcastWatch(s, t)), i.forEach((s) => s());
      } finally {
        this.onAfterBroadcast = r;
      }
    }
  }
  addFragmentsToDocument(t) {
    const { fragments: r } = this.config;
    return r ? r.transform(t) : t;
  }
  // This method is wrapped by maybeBroadcastWatch, which is called by
  // broadcastWatches, so that we compute and broadcast results only when
  // the data that would be broadcast might have changed. It would be
  // simpler to check for changes after recomputing a result but before
  // broadcasting it, but this wrapping approach allows us to skip both
  // the recomputation and the broadcast, in most cases.
  broadcastWatch(t, r) {
    const { lastDiff: i } = t, s = this.diff(t);
    r && (t.optimistic && typeof r.optimistic == "string" && (s.fromOptimisticTransaction = !0), r.onWatchUpdated && r.onWatchUpdated.call(this, t, s, i) === !1) || (!i || !P(i.result, s.result)) && t.callback(t.lastDiff = s, i);
  }
}
function vt(n, e) {
  return typeof n == "object" && n !== null && n[Symbol.for("apollo.error")] === e;
}
function gt(n) {
  Object.defineProperty(n, Symbol.for("apollo.error"), {
    value: n.name,
    enumerable: !1,
    writable: !1,
    configurable: !1
  });
}
function ni(n) {
  return n.map((e) => e.message || "Error message not found.").join(`
`);
}
const tt = class tt extends Error {
  constructor(t) {
    super(tt.formatMessage(t, {
      defaultFormatMessage: ni
    }));
    /**
    * The raw list of errors returned by the top-level `errors` field in the
    * multipart HTTP subscription response.
    */
    g(this, "errors");
    this.name = "CombinedProtocolErrors", this.errors = t, gt(this), Object.setPrototypeOf(this, tt.prototype);
  }
  /**
   * A method that determines whether an error is a `CombinedProtocolErrors`
   * object. This method enables TypeScript to narrow the error type.
   *
   * @example
   *
   * ```ts
   * if (CombinedProtocolErrors.is(error)) {
   *   // TypeScript now knows `error` is a CombinedProtocolErrors object
   *   console.log(error.errors);
   * }
   * ```
   */
  static is(t) {
    return vt(t, "CombinedProtocolErrors");
  }
};
/**
* A function that formats the error message used for the error's `message`
* property. Override this method to provide your own formatting.
* 
* @remarks
* 
* The `formatMessage` function is called by the `CombinedProtocolErrors`
* constructor to provide a formatted message as the `message` property of the
* `CombinedProtocolErrors` object. Follow the ["Providing a custom message
* formatter"](https://www.apollographql.com/docs/react/api/errors/CombinedProtocolErrors#providing-a-custom-message-formatter) guide to learn how to modify the message format.
* 
* @param errors - The array of GraphQL errors returned from the server in the
* `errors` field of the response.
* @param options - Additional context that could be useful when formatting
* the message.
*/
g(tt, "formatMessage", ni);
let Bt = tt;
function pl(n) {
  return n !== null && typeof n == "object" && typeof n.message == "string" && typeof n.name == "string" && (typeof n.stack == "string" || typeof n.stack > "u");
}
class fr extends Error {
  /**
   * A method that determines whether an error is an `UnconventionalError`
   * object. This method enables TypeScript to narrow the error type.
   *
   * @example
   *
   * ```ts
   * if (UnconventionalError.is(error)) {
   *   // TypeScript now knows `error` is a UnconventionalError object
   *   console.log("What caused this?", error.cause);
   * }
   * ```
   */
  static is(e) {
    return vt(e, "UnconventionalError");
  }
  constructor(e) {
    super("An error of unexpected shape occurred.", { cause: e }), this.name = "UnconventionalError", gt(this), Object.setPrototypeOf(this, fr.prototype);
  }
}
function ri(n) {
  return n.filter((e) => e).map((e) => e.message || "Error message not found.").join(`
`);
}
const nt = class nt extends Error {
  constructor(t, r = t.errors || []) {
    super(nt.formatMessage(r, {
      result: t,
      defaultFormatMessage: ri
    }));
    /**
    * The raw list of GraphQL errors returned by the `errors` field in the GraphQL response.
    */
    g(this, "errors");
    /**
    * Partial data returned in the `data` field of the GraphQL response.
    */
    g(this, "data");
    /**
    * Extensions returned by the `extensions` field in the GraphQL response.
    */
    g(this, "extensions");
    this.errors = r, this.data = t.data, this.extensions = t.extensions, this.name = "CombinedGraphQLErrors", gt(this), Object.setPrototypeOf(this, nt.prototype);
  }
  /**
  * A method that determines whether an error is a `CombinedGraphQLErrors`
  * object. This method enables TypeScript to narrow the error type.
  * 
  * @example
  * 
  * ```ts
  * if (CombinedGraphQLErrors.is(error)) {
  *   // TypeScript now knows `error` is a `CombinedGraphQLErrors` object
  *   console.log(error.errors);
  * }
  * ```
  */
  static is(t) {
    return vt(t, "CombinedGraphQLErrors");
  }
};
/**
* A function that formats the error message used for the error's `message`
* property. Override this method to provide your own formatting.
* 
* @remarks
* 
* The `formatMessage` function is called by the `CombinedGraphQLErrors`
* constructor to provide a formatted message as the `message` property of the
* `CombinedGraphQLErrors` object. Follow the ["Providing a custom message
* formatter"](https://www.apollographql.com/docs/react/api/errors/CombinedGraphQLErrors#providing-a-custom-message-formatter) guide to learn how to modify the message format.
* 
* @param errors - The array of GraphQL errors returned from the server in
* the `errors` field of the response.
* @param options - Additional context that could be useful when formatting
* the message.
*/
g(nt, "formatMessage", ri);
let be = nt;
const ml = /* @__PURE__ */ new WeakSet();
function yl(n) {
  ml.add(n);
}
class tn extends Error {
  constructor(t, r) {
    super(t);
    /**
    * The raw [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object provided by the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
    */
    g(this, "response");
    /**
    * The status code returned by the server in the response. This is provided as
    * a shortcut for `response.status`.
    */
    g(this, "statusCode");
    /**
    * The raw response body text.
    */
    g(this, "bodyText");
    this.name = "ServerError", this.response = r.response, this.statusCode = r.response.status, this.bodyText = r.bodyText, gt(this), Object.setPrototypeOf(this, tn.prototype);
  }
  /**
   * A method that determines whether an error is a `ServerError` object. This
   * method enables TypeScript to narrow the error type.
   *
   * @example
   *
   * ```ts
   * if (ServerError.is(error)) {
   *   // TypeScript now knows `error` is a ServerError object
   *   console.log(error.errors);
   * }
   * ```
   */
  static is(t) {
    return vt(t, "ServerError");
  }
}
class nn extends Error {
  constructor(t, r) {
    super(t instanceof Error ? t.message : "Could not parse server response", { cause: t });
    /**
    * The raw [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object provided by the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
    */
    g(this, "response");
    /**
    * The status code returned by the server in the response. This is provided
    * as a shortcut for `response.status`.
    */
    g(this, "statusCode");
    /**
    * The raw response body text.
    */
    g(this, "bodyText");
    this.name = "ServerParseError", this.response = r.response, this.statusCode = r.response.status, this.bodyText = r.bodyText, gt(this), Object.setPrototypeOf(this, nn.prototype);
  }
  /**
   * A method that determines whether an error is a `ServerParseError`
   * object. This method enables TypeScript to narrow the error type.
   *
   * @example
   *
   * ```ts
   * if (ServerParseError.is(error)) {
   *   // TypeScript now knows `error` is a ServerParseError object
   *   console.log(error.statusCode);
   * }
   * ```
   */
  static is(t) {
    return vt(t, "ServerParseError");
  }
}
const qt = Symbol();
function vl(n) {
  return "extensions" in n ? Bt.is(n.extensions[qt]) : !1;
}
function gl(n) {
  return pl(n) ? n : typeof n == "string" ? new Error(n, { cause: n }) : new fr(n);
}
var _;
(function(n) {
  n[n.loading = 1] = "loading", n[n.setVariables = 2] = "setVariables", n[n.fetchMore = 3] = "fetchMore", n[n.refetch = 4] = "refetch", n[n.poll = 6] = "poll", n[n.ready = 7] = "ready", n[n.error = 8] = "error", n[n.streaming = 9] = "streaming";
})(_ || (_ = {}));
const { assign: ii } = Object, xe = {
  loading: !0,
  networkStatus: _.loading,
  data: void 0,
  dataState: "empty",
  partial: !0
}, gn = {
  loading: !1,
  networkStatus: _.ready,
  data: void 0,
  dataState: "empty",
  partial: !0
};
var yi;
yi = Symbol.observable;
class bn {
  constructor({ queryManager: e, options: t, transformedQuery: r = e.transform(t.query) }) {
    g(this, "options");
    g(this, "queryName");
    g(this, "variablesUnknown", !1);
    /**
    * @internal will be read and written from `QueryInfo`
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
    g(this, "_lastWrite");
    g(this, "unsubscribeFromCache");
    g(this, "input");
    g(this, "subject");
    g(this, "isTornDown");
    g(this, "queryManager");
    g(this, "subscriptions", /* @__PURE__ */ new Set());
    /**
     * If an `ObservableQuery` is created with a `network-only` fetch policy,
     * it should actually start receiving cache updates, but not before it has
     * received the first result from the network.
     */
    g(this, "waitForNetworkResult");
    g(this, "lastQuery");
    g(this, "linkSubscription");
    g(this, "pollingInfo");
    // We can't use Observable['subscribe'] here as the type as it conflicts with
    // the ability to infer T from Subscribable<T>. This limits the surface area
    // to the non-deprecated signature which works properly with type inference.
    /**
     * Subscribes to the `ObservableQuery`.
     * @param observerOrNext - Either an RxJS `Observer` with some or all callback methods,
     * or the `next` handler that is called for each value emitted from the subscribed Observable.
     * @returns A subscription reference to the registered handlers.
     */
    g(this, "subscribe");
    /**
     * Used to stitch together functional operators into a chain.
     *
     * @example
     *
     * ```ts
     * import { filter, map } from 'rxjs';
     *
     * observableQuery
     *   .pipe(
     *     filter(...),
     *     map(...),
     *   )
     *   .subscribe(x => console.log(x));
     * ```
     *
     * @returns The Observable result of all the operators having been called
     * in the order they were passed in.
     */
    g(this, "pipe");
    g(this, yi);
    g(this, "@@observable");
    g(this, "stableLastResult");
    // Turns polling on or off based on this.options.pollInterval.
    g(this, "didWarnCacheOnlyPolling", !1);
    g(this, "dirty", !1);
    g(this, "notifyTimeout");
    g(this, "activeOperations", /* @__PURE__ */ new Set());
    g(this, "operator", Fn((e) => {
      const { query: t, variables: r, meta: i } = e;
      if (e.source === "setResult")
        return { query: t, variables: r, result: e.value, meta: i };
      if (e.kind === "C" || !Qe(e, this))
        return;
      let s;
      const o = this.subject.getValue();
      if (e.source === "cache") {
        if (s = e.value, s.networkStatus === _.ready && s.partial && (!this.options.returnPartialData || o.result.networkStatus === _.error) && this.options.fetchPolicy !== "cache-only")
          return;
      } else if (e.source === "network")
        this.waitForNetworkResult && (this.waitForNetworkResult = !1, this.resubscribeCache()), s = e.kind === "E" ? {
          ...Qe(o, e) ? o.result : { data: void 0, dataState: "empty", partial: !0 },
          error: e.error,
          networkStatus: _.error,
          loading: !1
        } : e.value, e.kind === "E" && s.dataState === "streaming" && (s.dataState = "complete"), s.error && (i.shouldEmit = 1);
      else if (e.source === "newNetworkStatus") {
        const a = Qe(o, e) ? o.result : this.getInitialResult(i.fetchPolicy), { resetError: c } = e.value, l = c ? void 0 : a.error, u = l ? _.error : _.ready;
        s = {
          ...a,
          error: l,
          networkStatus: u
        };
      }
      return A(s), s.error || delete s.error, s.networkStatus = this.calculateNetworkStatus(s.networkStatus), s.loading = Dt(s.networkStatus), s = this.maskResult(s), { query: t, variables: r, result: s, meta: i };
    }));
    this.queryManager = e, this.waitForNetworkResult = t.fetchPolicy === "network-only", this.isTornDown = !1, this.subscribeToMore = this.subscribeToMore.bind(this), this.maskResult = this.maskResult.bind(this);
    const { watchQuery: { fetchPolicy: i = "cache-first" } = {} } = e.defaultOptions, {
      fetchPolicy: s = i,
      // Make sure we don't store "standby" as the initialFetchPolicy.
      initialFetchPolicy: o = s === "standby" ? i : s
    } = t;
    t[Tc] && (A(s === "standby", 80), this.variablesUnknown = !0), this.lastQuery = r, this.options = {
      ...t,
      // Remember the initial options.fetchPolicy so we can revert back to this
      // policy when variables change. This information can also be specified
      // (or overridden) by providing options.initialFetchPolicy explicitly.
      initialFetchPolicy: o,
      // This ensures this.options.fetchPolicy always has a string value, in
      // case options.fetchPolicy was not provided.
      fetchPolicy: s,
      variables: this.getVariablesWithDefaults(t.variables)
    }, this.initializeObservablesQueue(), this["@@observable"] = () => this, Symbol.observable && (this[Symbol.observable] = () => this);
    const a = ae(this.query);
    this.queryName = a && a.name && a.name.value;
  }
  // The `query` computed property will always reflect the document transformed
  // by the last run query. `this.options.query` will always reflect the raw
  // untransformed query to ensure document transforms with runtime conditionals
  // are run on the original document.
  get query() {
    return this.lastQuery;
  }
  /**
   * An object containing the variables that were provided for the query.
   */
  get variables() {
    return this.options.variables;
  }
  get networkStatus() {
    return this.subject.getValue().result.networkStatus;
  }
  get cache() {
    return this.queryManager.cache;
  }
  initializeObservablesQueue() {
    this.subject = new aa({
      query: this.query,
      variables: this.variables,
      result: xe,
      meta: {}
    });
    const e = this.subject.pipe(lt({
      subscribe: () => {
        this.subject.observed || (this.reobserve(), setTimeout(() => this.updatePolling()));
      },
      unsubscribe: () => {
        this.subject.observed || this.tearDownQuery();
      }
    }), Fn(({ query: t, variables: r, result: i, meta: s }, o) => {
      const { shouldEmit: a } = s;
      if (i === xe && (o.previous = void 0, o.previousVariables = void 0), this.options.fetchPolicy === "standby" || a === 2)
        return;
      if (a === 1)
        return u();
      const { previous: c, previousVariables: l } = o;
      if (c) {
        const d = this.queryManager.getDocumentInfo(t), f = this.queryManager.dataMasking, h = f ? d.nonReactiveQuery : t;
        if ((f || d.hasNonreactiveDirective ? os(h, c, i, r) : P(c, i)) && P(l, r))
          return;
      }
      if (a === 3 && (!this.options.notifyOnNetworkStatusChange || P(c, i)))
        return;
      return u();
      function u() {
        return o.previous = i, o.previousVariables = r, i;
      }
    }, () => ({})));
    this.pipe = e.pipe.bind(e), this.subscribe = e.subscribe.bind(e), this.input = new Ue(), this.input.complete = () => {
    }, this.input.pipe(this.operator).subscribe(this.subject);
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  getCacheDiff({ optimistic: e = !0 } = {}) {
    return this.cache.diff({
      query: this.query,
      variables: this.variables,
      returnPartialData: !0,
      optimistic: e
    });
  }
  getInitialResult(e) {
    let t = e || this.options.fetchPolicy;
    this.queryManager.prioritizeCacheValues && (t === "network-only" || t === "cache-and-network") && (t = "cache-first");
    const r = () => {
      const i = this.getCacheDiff(), s = this.options.returnPartialData || i.complete ? i.result ?? void 0 : void 0;
      return this.maskResult({
        data: s,
        dataState: i.complete ? "complete" : s === void 0 ? "empty" : "partial",
        loading: !i.complete,
        networkStatus: i.complete ? _.ready : _.loading,
        partial: !i.complete
      });
    };
    switch (t) {
      case "cache-only":
        return {
          ...r(),
          loading: !1,
          networkStatus: _.ready
        };
      case "cache-first":
        return r();
      case "cache-and-network":
        return {
          ...r(),
          loading: !0,
          networkStatus: _.loading
        };
      case "standby":
        return gn;
      default:
        return xe;
    }
  }
  resubscribeCache() {
    var c;
    const { variables: e, fetchPolicy: t } = this.options, r = this.query, i = t === "standby" || t === "no-cache" || this.waitForNetworkResult, s = !Qe({ query: r, variables: e }, this.unsubscribeFromCache) && !this.waitForNetworkResult;
    if ((i || s) && ((c = this.unsubscribeFromCache) == null || c.call(this)), i || !s)
      return;
    const o = {
      query: r,
      variables: e,
      optimistic: !0,
      watcher: this,
      callback: (l) => {
        const u = this.queryManager.getDocumentInfo(r);
        if ((u.hasClientExports || u.hasForcedResolvers) && (o.lastDiff = void 0), o.lastOwnDiff === l)
          return;
        const { result: d } = this.subject.getValue();
        !l.complete && // If we are trying to deliver an incomplete cache result, we avoid
        // reporting it if the query has errored, otherwise we let the broadcast try
        // and repair the partial result by refetching the query. This check avoids
        // a situation where a query that errors and another succeeds with
        // overlapping data does not report the partial data result to the errored
        // query.
        //
        // See https://github.com/apollographql/apollo-client/issues/11400 for more
        // information on this issue.
        (d.error || // Prevent to schedule a notify directly after the `ObservableQuery`
        // has been `reset` (which will set the `previousResult` to `uninitialized` or `empty`)
        // as in those cases, `resetCache` will manually call `refetch` with more intentional timing.
        d === xe || d === gn) || P(d.data, l.result) || this.scheduleNotify();
      }
    }, a = this.cache.watch(o);
    this.unsubscribeFromCache = Object.assign(() => {
      this.unsubscribeFromCache = void 0, a();
    }, { query: r, variables: e });
  }
  getCurrentResult() {
    const { result: e } = this.subject.getValue();
    let t = (
      // if the `current` result is in an error state, we will always return that
      // error state, even if we have no observers
      e.networkStatus === _.error || // if we have observers, we are watching the cache and
      // this.subject.getValue() will always be up to date
      this.hasObservers() || // if we are using a `no-cache` fetch policy in which case this
      // `ObservableQuery` cannot have been updated from the outside - in
      // that case, we prefer to keep the current value
      this.options.fetchPolicy === "no-cache" ? e : this.getInitialResult()
    );
    return t === xe && (t = this.getInitialResult()), P(this.stableLastResult, t) || (this.stableLastResult = t), this.stableLastResult;
  }
  /**
   * Update the variables of this observable query, and fetch the new results.
   * This method should be preferred over `setVariables` in most use cases.
   *
   * Returns a `ResultPromise` with an additional `.retain()` method. Calling
   * `.retain()` keeps the network operation running even if the `ObservableQuery`
   * no longer requires the result.
   *
   * Note: `refetch()` guarantees that a value will be emitted from the
   * observable, even if the result is deep equal to the previous value.
   *
   * @param variables - The new set of variables. If there are missing variables,
   * the previous values of those variables will be used.
   */
  refetch(e) {
    const { fetchPolicy: t } = this.options, r = {
      // Always disable polling for refetches.
      pollInterval: 0
    };
    return t === "no-cache" ? r.fetchPolicy = "no-cache" : r.fetchPolicy = "network-only", e && !P(this.variables, e) && (r.variables = this.options.variables = this.getVariablesWithDefaults({ ...this.variables, ...e })), this._lastWrite = void 0, this._reobserve(r, {
      newNetworkStatus: _.refetch
    });
  }
  fetchMore({ query: e, variables: t, context: r, errorPolicy: i, updateQuery: s }) {
    A(
      this.options.fetchPolicy !== "cache-only",
      82,
      Le(this.query, "(anonymous)")
    );
    const o = {
      ...G(this.options, { errorPolicy: "none" }, {
        query: e,
        context: r,
        errorPolicy: i
      }),
      variables: e ? t : {
        ...this.variables,
        ...t
      },
      // The fetchMore request goes immediately to the network and does
      // not automatically write its result to the cache (hence no-cache
      // instead of network-only), because we allow the caller of
      // fetchMore to provide an updateQuery callback that determines how
      // the data gets written to the cache.
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: this.options.notifyOnNetworkStatusChange
    };
    o.query = this.transformDocument(o.query), this.lastQuery = e ? this.transformDocument(this.options.query) : o.query;
    let a = !1;
    const c = this.options.fetchPolicy !== "no-cache";
    c || A(s, 83);
    const { finalize: l, pushNotification: u } = this.pushOperation(_.fetchMore);
    u({
      source: "newNetworkStatus",
      kind: "N",
      value: {}
    }, {
      shouldEmit: 3
      /* EmitBehavior.networkStatusChange */
    });
    const { promise: d, operator: f } = si(), { observable: h } = this.queryManager.fetchObservableWithInfo(o, { networkStatus: _.fetchMore, exposeExtensions: !0 }), p = h.pipe(f, Yi((y) => y.kind === "N" && y.source === "network")).subscribe({
      next: (y) => {
        a = !1;
        const m = y.value, v = m[as];
        if (ks(y.value.networkStatus) && l(), c) {
          const w = this.getCacheDiff();
          this.cache.batch({
            update: (E) => {
              s ? E.updateQuery({
                query: this.query,
                variables: this.variables,
                returnPartialData: !0,
                optimistic: !1,
                extensions: v
              }, (k) => s(k, {
                fetchMoreResult: m.data,
                variables: o.variables
              })) : E.writeQuery({
                query: o.query,
                variables: o.variables,
                data: m.data,
                extensions: v
              });
            },
            onWatchUpdated: (E, k) => {
              if (E.watcher === this && !P(k.result, w.result)) {
                a = !0;
                const O = this.getCurrentResult();
                Dt(m.networkStatus) && u({
                  kind: "N",
                  source: "network",
                  value: {
                    ...O,
                    networkStatus: m.networkStatus === _.error ? _.ready : m.networkStatus,
                    // will be overwritten anyways, just here for types sake
                    loading: !1,
                    data: k.result,
                    dataState: m.dataState === "streaming" ? "streaming" : "complete"
                  }
                });
              }
            }
          });
        } else {
          const w = this.getCurrentResult(), E = s(w.data, {
            fetchMoreResult: m.data,
            variables: o.variables
          });
          u({
            kind: "N",
            value: {
              ...w,
              networkStatus: _.ready,
              // will be overwritten anyways, just here for types sake
              loading: !1,
              data: E,
              dataState: w.dataState === "streaming" ? "streaming" : "complete"
            },
            source: "network"
          });
        }
      }
    });
    return _r(d.then((y) => Je(this.maskResult(y))).finally(() => {
      if (p.unsubscribe(), l(), c && !a) {
        const y = this.getCurrentResult();
        y.dataState === "streaming" ? u({
          kind: "N",
          source: "network",
          value: {
            ...y,
            dataState: "complete",
            networkStatus: _.ready
          }
        }) : u({
          kind: "N",
          source: "newNetworkStatus",
          value: {}
        }, {
          shouldEmit: 1
          /* EmitBehavior.force */
        });
      }
    }));
  }
  // XXX the subscription variables are separate from the query variables.
  // if you want to update subscription variables, right now you have to do that separately,
  // and you can only do it by stopping the subscription and then subscribing again with new variables.
  /**
   * A function that enables you to execute a [subscription](https://www.apollographql.com/docs/react/data/subscriptions/), usually to subscribe to specific fields that were included in the query.
   *
   * This function returns _another_ function that you can call to terminate the subscription.
   */
  subscribeToMore(e) {
    const t = this.queryManager.startGraphQLSubscription({
      query: e.document,
      variables: e.variables,
      context: e.context
    }).subscribe({
      next: (r) => {
        const { updateQuery: i, onError: s } = e, { error: o } = r;
        if (o) {
          s ? s(o) : A.error(84, o);
          return;
        }
        i && this.updateQuery((a, c) => i(a, {
          subscriptionData: r,
          ...c
        }));
      }
    });
    return this.subscriptions.add(t), () => {
      this.subscriptions.delete(t) && t.unsubscribe();
    };
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  applyOptions(e) {
    const t = G(this.options, e || {});
    ii(this.options, t), this.updatePolling();
  }
  /**
   * Update the variables of this observable query, and fetch the new results
   * if they've changed. Most users should prefer `refetch` instead of
   * `setVariables` in order to to be properly notified of results even when
   * they come from the cache.
   *
   * Note: `setVariables()` guarantees that a value will be emitted from the
   * observable, even if the result is deeply equal to the previous value.
   *
   * Note: the promise will resolve with the last emitted result
   * when either the variables match the current variables or there
   * are no subscribers to the query.
   *
   * @param variables - The new set of variables. If there are missing variables,
   * the previous values of those variables will be used.
   */
  async setVariables(e) {
    return e = this.getVariablesWithDefaults(e), P(this.variables, e) ? Je(this.getCurrentResult()) : (this.options.variables = e, this.hasObservers() ? this._reobserve({
      // Reset options.fetchPolicy to its original value.
      fetchPolicy: this.options.initialFetchPolicy,
      variables: e
    }, { newNetworkStatus: _.setVariables }) : Je(this.getCurrentResult()));
  }
  /**
   * A function that enables you to update the query's cached result without executing a followup GraphQL operation.
   *
   * See [using updateQuery and updateFragment](https://www.apollographql.com/docs/react/caching/cache-interaction/#using-updatequery-and-updatefragment) for additional information.
   */
  updateQuery(e) {
    const { queryManager: t } = this, { result: r, complete: i } = this.getCacheDiff({ optimistic: !1 }), s = e(r, {
      variables: this.variables,
      complete: !!i,
      previousData: r
    });
    s && (this.cache.writeQuery({
      query: this.options.query,
      data: s,
      variables: this.variables
    }), t.broadcastQueries());
  }
  /**
   * A function that instructs the query to begin re-executing at a specified interval (in milliseconds).
   */
  startPolling(e) {
    this.options.pollInterval = e, this.updatePolling();
  }
  /**
   * A function that instructs the query to stop polling after a previous call to `startPolling`.
   */
  stopPolling() {
    this.options.pollInterval = 0, this.updatePolling();
  }
  // Update options.fetchPolicy according to options.nextFetchPolicy.
  applyNextFetchPolicy(e, t) {
    if (t.nextFetchPolicy) {
      const { fetchPolicy: r = "cache-first", initialFetchPolicy: i = r } = t;
      r === "standby" || (typeof t.nextFetchPolicy == "function" ? t.fetchPolicy = t.nextFetchPolicy.call(t, r, { reason: e, options: t, observable: this, initialFetchPolicy: i }) : e === "variables-changed" ? t.fetchPolicy = i : t.fetchPolicy = t.nextFetchPolicy);
    }
    return t.fetchPolicy;
  }
  fetch(e, t, r, i) {
    const s = this.options.fetchPolicy;
    e.context ?? (e.context = {});
    let o = !1;
    const a = () => {
      o = !0;
    }, c = (
      // we cannot use `tap` here, since it allows only for a "before subscription"
      // hook with `subscribe` and we care for "directly before and after subscription"
      (m) => new F((v) => {
        try {
          return m.subscribe({
            next(w) {
              o = !0, v.next(w);
            },
            error: (w) => v.error(w),
            complete: () => v.complete()
          });
        } finally {
          o || (h.override = t, this.input.next({
            kind: "N",
            source: "newNetworkStatus",
            value: {
              resetError: !0
            },
            query: d,
            variables: f,
            meta: {
              shouldEmit: 3,
              /*
               * The moment this notification is emitted, `nextFetchPolicy`
               * might already have switched from a `network-only` to a
               * `cache-something` policy, so we want to ensure that the
               * loading state emit doesn't accidentally read from the cache
               * in those cases.
               */
              fetchPolicy: s
            }
          }));
        }
      })
    );
    let { observable: l, fromLink: u } = this.queryManager.fetchObservableWithInfo(e, {
      networkStatus: t,
      query: r,
      onCacheHit: a,
      fetchQueryOperator: c,
      observableQuery: this
    });
    const { query: d, variables: f } = this, h = {
      abort: () => {
        y.unsubscribe();
      },
      query: d,
      variables: f
    };
    this.activeOperations.add(h);
    let p = t == _.refetch || t == _.setVariables;
    l = l.pipe(i, ct());
    const y = l.pipe(lt({
      next: (m) => {
        m.source === "newNetworkStatus" || m.kind === "N" && m.value.loading ? h.override = t : delete h.override;
      },
      finalize: () => this.activeOperations.delete(h)
    })).subscribe({
      next: (m) => {
        const v = {};
        p && m.kind === "N" && "loading" in m.value && !m.value.loading && (p = !1, v.shouldEmit = 1), this.input.next({ ...m, query: d, variables: f, meta: v });
      }
    });
    return { fromLink: u, subscription: y, observable: l };
  }
  updatePolling() {
    if (this.queryManager.ssrMode)
      return;
    const { pollingInfo: e, options: { fetchPolicy: t, pollInterval: r } } = this, i = () => {
      const { options: c } = this;
      return !c.pollInterval || !this.hasObservers() || c.fetchPolicy === "cache-only" || c.fetchPolicy === "standby";
    };
    if (i()) {
      this.cancelPolling();
      return;
    }
    if ((e == null ? void 0 : e.interval) === r)
      return;
    const s = e || (this.pollingInfo = {});
    s.interval = r;
    const o = () => {
      var c, l;
      if (i())
        return this.cancelPolling();
      this.pollingInfo && (!Dt(this.networkStatus) && !((l = (c = this.options).skipPollAttempt) != null && l.call(c)) ? this._reobserve({
        // Most fetchPolicy options don't make sense to use in a polling context, as
        // users wouldn't want to be polling the cache directly. However, network-only and
        // no-cache are both useful for when the user wants to control whether or not the
        // polled results are written to the cache.
        fetchPolicy: this.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only"
      }, {
        newNetworkStatus: _.poll
      }).then(a, a) : a());
    }, a = () => {
      const c = this.pollingInfo;
      c && (clearTimeout(c.timeout), c.timeout = setTimeout(o, c.interval));
    };
    a();
  }
  // This differs from stopPolling in that it does not set pollInterval to 0
  cancelPolling() {
    this.pollingInfo && (clearTimeout(this.pollingInfo.timeout), delete this.pollingInfo);
  }
  /**
   * Reevaluate the query, optionally against new options. New options will be
   * merged with the current options when given.
   *
   * Note: `variables` can be reset back to their defaults (typically empty) by calling `reobserve` with
   * `variables: undefined`.
   */
  reobserve(e) {
    return this._reobserve(e);
  }
  _reobserve(e, t) {
    this.isTornDown = !1;
    let { newNetworkStatus: r } = t || {};
    this.queryManager.obsQueries.add(this);
    const i = (
      // Refetching uses a disposable Observable to allow refetches using different
      // options, without permanently altering the options of the
      // original ObservableQuery.
      r === _.refetch || // Polling uses a disposable Observable so the polling options (which force
      // fetchPolicy to be "network-only" or "no-cache") won't override the original options.
      r === _.poll
    ), s = this.variables, o = this.options.fetchPolicy, a = G(this.options, e || {});
    this.variablesUnknown && (this.variablesUnknown = a.fetchPolicy === "standby");
    const c = i ? (
      // Disposable Observable fetches receive a shallow copy of this.options
      // (merged with newOptions), leaving this.options unmodified.
      a
    ) : ii(this.options, a), l = this.transformDocument(c.query);
    this.lastQuery = l, e && "variables" in e && (c.variables = this.getVariablesWithDefaults(e.variables)), i || (this.updatePolling(), e && e.variables && !P(e.variables, s) && // Don't mess with the fetchPolicy if it's currently "standby".
    c.fetchPolicy !== "standby" && // If we're changing the fetchPolicy anyway, don't try to change it here
    // using applyNextFetchPolicy. The explicit options.fetchPolicy wins.
    (c.fetchPolicy === o || // A `nextFetchPolicy` function has even higher priority, though,
    // so in that case `applyNextFetchPolicy` must be called.
    typeof c.nextFetchPolicy == "function") && (this.applyNextFetchPolicy("variables-changed", c), r === void 0 && (r = _.setVariables)));
    const u = this.networkStatus;
    r || (r = _.loading, u !== _.loading && (e != null && e.variables) && !P(e.variables, s) && (r = _.setVariables), c.fetchPolicy === "standby" && (r = _.ready)), c.fetchPolicy === "standby" && this.cancelPolling(), this.resubscribeCache();
    const { promise: d, operator: f } = si(
      // This default value should only be used when using a `fetchPolicy` of
      // `standby` since that fetch policy completes without emitting a
      // result. Since we are converting this to a QueryResult type, we
      // omit the extra fields from ApolloQueryResult in the default value.
      c.fetchPolicy === "standby" ? { data: void 0 } : void 0
    ), { subscription: h, observable: p, fromLink: y } = this.fetch(c, r, l, f);
    !i && (y || !this.linkSubscription) && (this.linkSubscription && this.linkSubscription.unsubscribe(), this.linkSubscription = h);
    const m = Object.assign(_r(d.then((v) => Je(this.maskResult(v))).finally(() => {
      !this.hasObservers() && this.activeOperations.size === 0 && this.tearDownQuery();
    })), {
      retain: () => {
        const v = p.subscribe({}), w = () => v.unsubscribe();
        return d.then(w, w), m;
      }
    });
    return m;
  }
  hasObservers() {
    return this.subject.observed;
  }
  /**
   * Tears down the `ObservableQuery` and stops all active operations by sending a `complete` notification.
   */
  stop() {
    this.subject.complete(), this.initializeObservablesQueue(), this.tearDownQuery();
  }
  tearDownQuery() {
    var e;
    this.isTornDown || (this.resetNotifications(), (e = this.unsubscribeFromCache) == null || e.call(this), this.linkSubscription && (this.linkSubscription.unsubscribe(), delete this.linkSubscription), this.stopPolling(), this.subscriptions.forEach((t) => t.unsubscribe()), this.subscriptions.clear(), this.queryManager.obsQueries.delete(this), this.isTornDown = !0, this.abortActiveOperations(), this._lastWrite = void 0);
  }
  transformDocument(e) {
    return this.queryManager.transform(e);
  }
  maskResult(e) {
    const t = this.queryManager.maskOperation({
      document: this.query,
      data: e.data,
      fetchPolicy: this.options.fetchPolicy,
      cause: this
    });
    return t === e.data ? e : { ...e, data: t };
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  resetNotifications() {
    this.notifyTimeout && (clearTimeout(this.notifyTimeout), this.notifyTimeout = void 0), this.dirty = !1;
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  scheduleNotify() {
    this.dirty || (this.dirty = !0, this.notifyTimeout || (this.notifyTimeout = setTimeout(() => this.notify(!0), 0)));
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  notify(e = !1) {
    if (!e) {
      const r = this.queryManager.getDocumentInfo(this.query);
      if (r.hasClientExports || r.hasForcedResolvers)
        return;
    }
    const { dirty: t } = this;
    if (this.resetNotifications(), t && (this.options.fetchPolicy === "cache-only" || this.options.fetchPolicy === "cache-and-network" || !this.activeOperations.size)) {
      const r = this.getCacheDiff();
      // `fromOptimisticTransaction` is not available through the `cache.diff`
      // code path, so we need to check it this way
      P(r.result, this.getCacheDiff({ optimistic: !1 }).result) ? this.reobserveCacheFirst() : this.input.next({
        kind: "N",
        value: {
          data: r.result,
          dataState: r.complete ? "complete" : r.result ? "partial" : "empty",
          networkStatus: _.ready,
          loading: !1,
          error: void 0,
          partial: !r.complete
        },
        source: "cache",
        query: this.query,
        variables: this.variables,
        meta: {}
      });
    }
  }
  pushOperation(e) {
    let t = !1;
    const { query: r, variables: i } = this, s = () => {
      this.activeOperations.delete(o);
    }, o = {
      override: e,
      abort: () => {
        t = !0, s();
      },
      query: r,
      variables: i
    };
    return this.activeOperations.add(o), {
      finalize: s,
      pushNotification: (a, c) => {
        t || this.input.next({
          ...a,
          query: r,
          variables: i,
          meta: { ...c }
        });
      }
    };
  }
  calculateNetworkStatus(e) {
    if (e === _.streaming)
      return e;
    const t = Array.from(this.activeOperations.values()).reverse().find((r) => Qe(r, this) && r.override !== void 0);
    return (t == null ? void 0 : t.override) ?? e;
  }
  abortActiveOperations() {
    this.activeOperations.forEach((e) => e.abort());
  }
  /**
  * @internal
  * Called from `clearStore`.
  *
  * - resets the query to its initial state
  * - cancels all active operations and their subscriptions
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  reset() {
    const e = this.options.fetchPolicy === "cache-only";
    this.setResult(e ? gn : xe, {
      shouldEmit: e ? 1 : 2
    }), this.abortActiveOperations();
  }
  /**
  * @internal
  * 
  * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
  */
  setResult(e, t) {
    this.input.next({
      source: "setResult",
      kind: "N",
      value: e,
      query: this.query,
      variables: this.variables,
      meta: { ...t }
    });
  }
  // Reobserve with fetchPolicy effectively set to "cache-first", triggering
  // delivery of any new data from the cache, possibly falling back to the network
  // if any cache data are missing. This allows _complete_ cache results to be
  // delivered without also kicking off unnecessary network requests when
  // this.options.fetchPolicy is "cache-and-network" or "network-only". When
  // this.options.fetchPolicy is any other policy ("cache-first", "cache-only",
  // "standby", or "no-cache"), we call this.reobserve() as usual.
  reobserveCacheFirst() {
    const { fetchPolicy: e, nextFetchPolicy: t } = this.options;
    e === "cache-and-network" || e === "network-only" ? this.reobserve({
      fetchPolicy: "cache-first",
      // Use a temporary nextFetchPolicy function that replaces itself with the
      // previous nextFetchPolicy value and returns the original fetchPolicy.
      nextFetchPolicy(r, i) {
        return this.nextFetchPolicy = t, typeof this.nextFetchPolicy == "function" ? this.nextFetchPolicy(r, i) : e;
      }
    }) : this.reobserve();
  }
  getVariablesWithDefaults(e) {
    return this.queryManager.getVariables(this.query, e);
  }
}
function Qe(n, e) {
  return !!(n && e && n.query === e.query && P(n.variables, e.variables));
}
function si(n) {
  let e = n, t, r;
  const i = new Promise((o, a) => {
    t = o, r = a;
  }), s = lt({
    next(o) {
      if (o.kind === "E")
        return r(o.error);
      o.kind === "N" && o.source !== "newNetworkStatus" && !o.value.loading && (e = o.value);
    },
    finalize: () => {
      if (e)
        t(e);
      else {
        const o = "The operation was aborted.", a = "AbortError";
        r(typeof DOMException < "u" ? new DOMException(o, a) : Object.assign(new Error(o), { name: a }));
      }
    }
  });
  return { promise: i, operator: s };
}
const oi = {}, Ie = /* @__PURE__ */ new WeakMap();
function wn(n, e) {
  const t = n[e];
  typeof t == "function" && (n[e] = function() {
    return Ie.set(
      n,
      // The %1e15 allows the count to wrap around to 0 safely every
      // quadrillion evictions, so there's no risk of overflow. To be
      // clear, this is more of a pedantic principle than something
      // that matters in any conceivable practical scenario.
      (Ie.get(n) + 1) % 1e15
    ), t.apply(this, arguments);
  });
}
const ai = /* @__PURE__ */ new WeakMap();
class En {
  constructor(e, t) {
    // TODO remove soon - this should be able to be handled by cancelling old operations before starting new ones
    g(this, "lastRequestId", 1);
    g(this, "cache");
    g(this, "queryManager");
    g(this, "id");
    g(this, "observableQuery");
    g(this, "incremental");
    /**
    * @internal
    * For feud-preventing behaviour, `lastWrite` should be shared by all `QueryInfo` instances of an `ObservableQuery`.
    * In the case of a standalone `QueryInfo`, we will keep a local version.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
    g(this, "_lastWrite");
    const r = this.cache = e.cache, i = (ai.get(e) || 0) + 1;
    ai.set(e, i), this.id = i + "", this.observableQuery = t, this.queryManager = e, Ie.has(r) || (Ie.set(r, 0), wn(r, "evict"), wn(r, "modify"), wn(r, "reset"));
  }
  get lastWrite() {
    return (this.observableQuery || this)._lastWrite;
  }
  set lastWrite(e) {
    (this.observableQuery || this)._lastWrite = e;
  }
  resetLastWrite() {
    this.lastWrite = void 0;
  }
  shouldWrite(e, t) {
    var i, s;
    const { lastWrite: r } = this;
    return !(r && // If cache.evict has been called since the last time we wrote this
    // data into the cache, there's a chance writing this result into
    // the cache will repair what was evicted.
    r.dmCount === Ie.get(this.cache) && P(t, r.variables) && P(e.data, r.result.data) && // We have to compare these values because its possible the final chunk
    // emitted in the incremental result is just `hasNext: false`. This
    // ensures we trigger a cache write when we get `isLastChunk: true`.
    ((i = e.extensions) == null ? void 0 : i[de]) === ((s = r.result.extensions) == null ? void 0 : s[de]));
  }
  get hasNext() {
    return this.incremental ? this.incremental.hasNext : !1;
  }
  maybeHandleIncrementalResult(e, t, r) {
    const { incrementalHandler: i } = this.queryManager;
    return i.isIncrementalResult(t) ? (this.incremental || (this.incremental = i.startRequest({
      query: r
    })), this.incremental.handle(e, t)) : t;
  }
  markQueryResult(e, { document: t, variables: r, errorPolicy: i, cacheWriteBehavior: s }) {
    var u;
    const o = {
      query: t,
      variables: r,
      returnPartialData: !0,
      optimistic: !0
    };
    (u = this.observableQuery) == null || u.resetNotifications();
    const a = s === 0, c = a ? void 0 : this.cache.diff(o);
    let l = this.maybeHandleIncrementalResult(c == null ? void 0 : c.result, e, t);
    return a || (kn(l, i) ? this.cache.batch({
      onWatchUpdated: (d, f) => {
        d.watcher === this.observableQuery && (d.lastOwnDiff = f);
      },
      update: (d) => {
        if (this.shouldWrite(l, r))
          d.writeQuery({
            query: t,
            data: l.data,
            variables: r,
            overwrite: s === 1,
            extensions: l.extensions
          }), this.lastWrite = {
            result: l,
            variables: r,
            dmCount: Ie.get(this.cache)
          };
        else if (c && c.complete) {
          l = { ...l, data: c.result };
          return;
        }
        const f = d.diff(o);
        f.complete && (l = { ...l, data: f.result });
      }
    }) : this.lastWrite = void 0), l;
  }
  markMutationResult(e, t, r = this.cache) {
    const i = [], s = t.cacheWriteBehavior === 0;
    let o = this.maybeHandleIncrementalResult(s ? void 0 : r.diff({
      id: "ROOT_MUTATION",
      // The cache complains if passed a mutation where it expects a
      // query, so we transform mutations and subscriptions to queries
      // (only once, thanks to this.transformCache).
      query: this.queryManager.getDocumentInfo(t.document).asQuery,
      variables: t.variables,
      optimistic: !1,
      returnPartialData: !0
    }).result, e, t.document);
    if (t.errorPolicy === "ignore" && (o = { ...o, errors: [] }), Ce(o) && t.errorPolicy === "none")
      return Promise.resolve(o);
    const a = () => ({
      ...o,
      dataState: this.hasNext ? "streaming" : "complete"
    });
    if (!s && kn(o, t.errorPolicy)) {
      i.push({
        result: o.data,
        dataId: "ROOT_MUTATION",
        query: t.document,
        variables: t.variables,
        extensions: o.extensions
      });
      const { updateQueries: l } = t;
      l && this.queryManager.getObservableQueries("all").forEach((u) => {
        const d = u && u.queryName;
        if (!d || !Object.hasOwnProperty.call(l, d))
          return;
        const f = l[d], { query: h, variables: p } = u, { result: y, complete: m } = u.getCacheDiff({ optimistic: !1 });
        if (m && y) {
          const v = f(y, {
            mutationResult: a(),
            queryName: h && Le(h) || void 0,
            queryVariables: p
          });
          v && i.push({
            result: v,
            dataId: "ROOT_QUERY",
            query: h,
            variables: p
          });
        }
      });
    }
    let c = t.refetchQueries;
    if (typeof c == "function" && (c = c(a())), i.length > 0 || (c || "").length > 0 || t.update || t.onQueryUpdated || t.removeOptimistic) {
      const l = [];
      if (this.queryManager.refetchQueries({
        updateCache: (u) => {
          s || i.forEach((f) => u.write(f));
          const { update: d } = t;
          if (d) {
            if (!s) {
              const f = u.diff({
                id: "ROOT_MUTATION",
                // The cache complains if passed a mutation where it expects a
                // query, so we transform mutations and subscriptions to queries
                // (only once, thanks to this.transformCache).
                query: this.queryManager.getDocumentInfo(t.document).asQuery,
                variables: t.variables,
                optimistic: !1,
                returnPartialData: !0
              });
              f.complete && (o = {
                ...o,
                data: f.result
              });
            }
            this.hasNext || d(u, o, {
              context: t.context,
              variables: t.variables
            });
          }
          !s && !t.keepRootFields && !this.hasNext && u.modify({
            id: "ROOT_MUTATION",
            fields(f, { fieldName: h, DELETE: p }) {
              return h === "__typename" ? f : p;
            }
          });
        },
        include: c,
        // Write the final mutation.result to the root layer of the cache.
        optimistic: !1,
        // Remove the corresponding optimistic layer at the same time as we
        // write the final non-optimistic result.
        removeOptimistic: t.removeOptimistic,
        // Let the caller of client.mutate optionally determine the refetching
        // behavior for watched queries after the mutation.update function runs.
        // If no onQueryUpdated function was provided for this mutation, pass
        // null instead of undefined to disable the default refetching behavior.
        onQueryUpdated: t.onQueryUpdated || null
      }).forEach((u) => l.push(u)), t.awaitRefetchQueries || t.onQueryUpdated)
        return Promise.all(l).then(() => o);
    }
    return Promise.resolve(o);
  }
  markMutationOptimistic(e, t) {
    const r = typeof e == "function" ? e(t.variables, { IGNORE: oi }) : e;
    return r === oi ? !1 : (this.cache.recordOptimisticTransaction((i) => {
      try {
        this.markMutationResult({ data: r }, t, i);
      } catch (s) {
        A.error(s);
      }
    }, this.id), !0);
  }
  markSubscriptionResult(e, { document: t, variables: r, errorPolicy: i, cacheWriteBehavior: s }) {
    s !== 0 && (kn(e, i) && this.cache.write({
      query: t,
      result: e.data,
      dataId: "ROOT_SUBSCRIPTION",
      variables: r,
      extensions: e.extensions
    }), this.queryManager.broadcastQueries());
  }
}
function kn(n, e = "none") {
  const t = e === "ignore" || e === "all";
  let r = !Ce(n);
  return !r && t && n.data && (r = !0), r;
}
class bl {
  constructor(e) {
    g(this, "defaultOptions");
    g(this, "client");
    /**
     * The options that were passed to the ApolloClient constructor.
     */
    g(this, "clientOptions");
    g(this, "assumeImmutableResults");
    g(this, "documentTransform");
    g(this, "ssrMode");
    g(this, "defaultContext");
    g(this, "dataMasking");
    g(this, "incrementalHandler");
    g(this, "localState");
    g(this, "queryDeduplication");
    /**
     * Whether to prioritize cache values over network results when
     * `fetchObservableWithInfo` is called.
     * This will essentially turn a `"network-only"` or `"cache-and-network"`
     * fetchPolicy into a `"cache-first"` fetchPolicy, but without influencing
     * the `fetchPolicy` of the `ObservableQuery`.
     *
     * This can e.g. be used to prioritize the cache during the first render after
     * SSR.
     */
    g(this, "prioritizeCacheValues", !1);
    g(this, "onBroadcast");
    g(this, "mutationStore");
    /**
     * All ObservableQueries that currently have at least one subscriber.
     */
    g(this, "obsQueries", /* @__PURE__ */ new Set());
    // Maps from queryInfo.id strings to Promise rejection functions for
    // currently active queries and fetches.
    // Use protected instead of private field so
    // @apollo/experimental-nextjs-app-support can access type info.
    g(this, "fetchCancelFns", /* @__PURE__ */ new Map());
    g(this, "transformCache", new tr(
      oe["queryManager.getDocumentInfo"] || 2e3
      /* defaultCacheSizes["queryManager.getDocumentInfo"] */
    ));
    g(this, "requestIdCounter", 1);
    // Use protected instead of private field so
    // @apollo/experimental-nextjs-app-support can access type info.
    g(this, "inFlightLinkObservables", new ne(!1));
    g(this, "noCacheWarningsByCause", /* @__PURE__ */ new WeakSet());
    const t = new re(
      (i) => this.cache.transformDocument(i),
      // Allow the apollo cache to manage its own transform caches
      { cache: !1 }
    );
    this.client = e.client, this.defaultOptions = e.defaultOptions, this.queryDeduplication = e.queryDeduplication, this.clientOptions = e.clientOptions, this.ssrMode = e.ssrMode, this.assumeImmutableResults = e.assumeImmutableResults, this.dataMasking = e.dataMasking, this.localState = e.localState, this.incrementalHandler = e.incrementalHandler;
    const r = e.documentTransform;
    this.documentTransform = r ? t.concat(r).concat(t) : t, this.defaultContext = e.defaultContext || {}, (this.onBroadcast = e.onBroadcast) && (this.mutationStore = {});
  }
  get link() {
    return this.client.link;
  }
  get cache() {
    return this.client.cache;
  }
  /**
   * Call this method to terminate any active query processes, making it safe
   * to dispose of this QueryManager instance.
   */
  stop() {
    this.obsQueries.forEach((e) => e.stop()), this.cancelPendingFetches(H(87));
  }
  cancelPendingFetches(e) {
    this.fetchCancelFns.forEach((t) => t(e)), this.fetchCancelFns.clear();
  }
  async mutate({ mutation: e, variables: t, optimisticResponse: r, updateQueries: i, refetchQueries: s = [], awaitRefetchQueries: o = !1, update: a, onQueryUpdated: c, fetchPolicy: l, errorPolicy: u, keepRootFields: d, context: f }) {
    const h = new En(this);
    e = this.cache.transformForLink(this.transform(e));
    const { hasClientExports: p } = this.getDocumentInfo(e);
    t = this.getVariables(e, t), p && (t = await this.localState.getExportedVariables({
      client: this.client,
      document: e,
      variables: t,
      context: f
    }));
    const y = this.mutationStore && (this.mutationStore[h.id] = {
      mutation: e,
      variables: t,
      loading: !0,
      error: null
    }), m = r && h.markMutationOptimistic(r, {
      document: e,
      variables: t,
      cacheWriteBehavior: l === "no-cache" ? 0 : 2,
      errorPolicy: u,
      context: f,
      updateQueries: i,
      update: a,
      keepRootFields: d
    });
    return this.broadcastQueries(), new Promise((v, w) => {
      const E = {};
      return this.getObservableFromLink(e, {
        ...f,
        optimisticResponse: m ? r : void 0
      }, t, l, {}, !1).observable.pipe(ci(), Te((k) => {
        const O = { ...k };
        return ge(h.markMutationResult(O, {
          document: e,
          variables: t,
          cacheWriteBehavior: l === "no-cache" ? 0 : 2,
          errorPolicy: u,
          context: f,
          update: a,
          updateQueries: i,
          awaitRefetchQueries: o,
          refetchQueries: s,
          removeOptimistic: m ? h.id : void 0,
          onQueryUpdated: c,
          keepRootFields: d
        }));
      })).pipe(fe((k) => {
        if (Ce(k) && u === "none")
          throw new be(Sn(k));
        return y && (y.loading = !1, y.error = null), k;
      })).subscribe({
        next: (k) => {
          if (this.broadcastQueries(), !h.hasNext) {
            const O = {
              data: this.maskOperation({
                document: e,
                data: k.data,
                fetchPolicy: l,
                cause: E
              })
            };
            Ce(k) && (O.error = new be(k)), Object.keys(k.extensions || {}).length && (O.extensions = k.extensions), v(O);
          }
        },
        error: (k) => {
          if (y && (y.loading = !1, y.error = k), m && this.cache.removeOptimistic(h.id), this.broadcastQueries(), u === "ignore")
            return v({ data: void 0 });
          if (u === "all")
            return v({ data: void 0, error: k });
          w(k);
        }
      });
    });
  }
  fetchQuery(e, t) {
    return he(e.query, J.QUERY), (async () => Ia(this.fetchObservableWithInfo(e, {
      networkStatus: t
    }).observable.pipe(Fn((r) => {
      switch (r.kind) {
        case "E":
          throw r.error;
        case "N":
          if (r.source !== "newNetworkStatus")
            return Je(r.value);
      }
    })), {
      // This default is needed when a `standby` fetch policy is used to avoid
      // an EmptyError from rejecting this promise.
      defaultValue: { data: void 0 }
    }))();
  }
  transform(e) {
    return this.documentTransform.transformDocument(e);
  }
  getDocumentInfo(e) {
    const { transformCache: t } = this;
    if (!t.has(e)) {
      const i = ae(e), s = {
        // TODO These three calls (hasClientExports, shouldForceResolvers, and
        // usesNonreactiveDirective) are performing independent full traversals
        // of the transformed document. We should consider merging these
        // traversals into a single pass in the future, though the work is
        // cached after the first time.
        hasClientExports: _e(["client", "export"], e, !0),
        hasForcedResolvers: lc(e),
        hasNonreactiveDirective: _e(["nonreactive"], e),
        hasIncrementalDirective: _e(["defer"], e),
        nonReactiveQuery: wl(e),
        clientQuery: _e(["client"], e) ? e : null,
        serverQuery: hc([
          { name: "client", remove: !0 },
          { name: "connection" },
          { name: "nonreactive" },
          { name: "unmask" }
        ], e),
        operationType: i == null ? void 0 : i.operation,
        defaultVars: nr(i),
        // Transform any mutation or subscription operations to query operations
        // so we can read/write them from/to the cache.
        asQuery: {
          ...e,
          definitions: e.definitions.map((o) => o.kind === "OperationDefinition" && o.operation !== "query" ? { ...o, operation: "query" } : o)
        }
      };
      t.set(e, s);
    }
    const r = t.get(e);
    if (r.violation)
      throw r.violation;
    return r;
  }
  getVariables(e, t) {
    const r = this.getDocumentInfo(e).defaultVars, i = Object.entries(t ?? {}).map(([s, o]) => [s, o === void 0 ? r[s] : o]);
    return {
      ...r,
      ...Object.fromEntries(i)
    };
  }
  watchQuery(e) {
    he(e.query, J.QUERY);
    const t = this.transform(e.query);
    return e = {
      ...e,
      variables: this.getVariables(t, e.variables)
    }, typeof e.notifyOnNetworkStatusChange > "u" && (e.notifyOnNetworkStatusChange = !0), new bn({
      queryManager: this,
      options: e,
      transformedQuery: t
    });
  }
  query(e) {
    const t = this.transform(e.query);
    return this.fetchQuery({
      ...e,
      query: t
    }).then((r) => ({
      ...r,
      data: this.maskOperation({
        document: t,
        data: r == null ? void 0 : r.data,
        fetchPolicy: e.fetchPolicy
      })
    }));
  }
  generateRequestId() {
    return this.requestIdCounter++;
  }
  clearStore(e = {
    discardWatches: !0
  }) {
    return this.cancelPendingFetches(H(89)), this.obsQueries.forEach((t) => {
      t.reset();
    }), this.mutationStore && (this.mutationStore = {}), this.cache.reset(e);
  }
  getObservableQueries(e = "active") {
    const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set();
    return Array.isArray(e) && e.forEach((o) => {
      if (typeof o == "string")
        r.set(o, o), i.set(o, !1);
      else if (uc(o)) {
        const a = Re(this.transform(o));
        r.set(a, Le(o)), i.set(a, !1);
      } else $(o) && o.query && s.add(o);
    }), this.obsQueries.forEach((o) => {
      const a = Re(this.transform(o.options.query));
      if (e === "all") {
        t.add(o);
        return;
      }
      const { queryName: c, options: { fetchPolicy: l } } = o;
      e === "active" && l === "standby" || (e === "active" || c && i.has(c) || a && i.has(a)) && (t.add(o), c && i.set(c, !0), a && i.set(a, !0));
    }), s.size && s.forEach((o) => {
      const a = new bn({
        queryManager: this,
        options: {
          ...It(this.defaultOptions.watchQuery, o),
          fetchPolicy: "network-only"
        }
      });
      t.add(a);
    }), t;
  }
  refetchObservableQueries(e = !1) {
    const t = [];
    return this.getObservableQueries(e ? "all" : "active").forEach((r) => {
      const { fetchPolicy: i } = r.options;
      (e || i !== "standby") && i !== "cache-only" && t.push(r.refetch());
    }), this.broadcastQueries(), Promise.all(t);
  }
  startGraphQLSubscription(e) {
    let { query: t, variables: r } = e;
    const { fetchPolicy: i = "cache-first", errorPolicy: s = "none", context: o = {}, extensions: a = {} } = e;
    he(t, J.SUBSCRIPTION), t = this.transform(t), r = this.getVariables(t, r);
    let c;
    const l = (this.getDocumentInfo(t).hasClientExports ? ge(this.localState.getExportedVariables({
      client: this.client,
      document: t,
      variables: r,
      context: o
    })) : ve(r)).pipe(Te((u) => {
      const { observable: d, restart: f } = this.getObservableFromLink(t, o, u, i, a), h = new En(this);
      return c = f, d.pipe(fe((p) => {
        h.markSubscriptionResult(p, {
          document: t,
          variables: u,
          errorPolicy: s,
          cacheWriteBehavior: i === "no-cache" ? 0 : 2
        });
        const y = {
          data: p.data ?? void 0
        };
        return Ce(p) ? y.error = new be(p) : vl(p) && (y.error = p.extensions[qt], delete p.extensions[qt]), p.extensions && Object.keys(p.extensions).length && (y.extensions = p.extensions), y.error && s === "none" && (y.data = void 0), s === "ignore" && delete y.error, y;
      }), Nt((p) => ve(s === "ignore" ? {
        data: void 0
      } : { data: void 0, error: p })), Yi((p) => !!(p.data || p.error)));
    }));
    return Object.assign(l, { restart: () => c == null ? void 0 : c() });
  }
  broadcastQueries() {
    this.onBroadcast && this.onBroadcast(), this.obsQueries.forEach((e) => e.notify());
  }
  getObservableFromLink(e, t, r, i, s, o = (t == null ? void 0 : t.queryDeduplication) ?? this.queryDeduplication) {
    let a = {};
    const { serverQuery: c, clientQuery: l, operationType: u, hasIncrementalDirective: d } = this.getDocumentInfo(e), f = Le(e), h = {
      client: this.client
    };
    if (c) {
      const { inFlightLinkObservables: p, link: y } = this;
      try {
        let v = function(w) {
          return new F((E) => {
            function k() {
              return w.subscribe({
                next: E.next.bind(E),
                complete: E.complete.bind(E),
                error: E.error.bind(E)
              });
            }
            let O = k();
            return a.restart || (a.restart = () => {
              O.unsubscribe(), O = k();
            }), () => {
              O.unsubscribe(), a.restart = void 0;
            };
          });
        };
        const m = this.incrementalHandler.prepareRequest({
          query: c,
          variables: r,
          context: {
            ...this.defaultContext,
            ...t,
            queryDeduplication: o
          },
          extensions: s
        });
        if (t = m.context, o) {
          const w = Re(c), E = ie(r);
          a = p.lookup(w, E), a.observable || (a.observable = Ln(y, m, h).pipe(
            v,
            ja(() => {
              p.peek(w, E) === a && p.remove(w, E);
            }),
            // We don't want to replay the last emitted value for
            // subscriptions and instead opt to wait to receive updates until
            // the subscription emits new values.
            u === J.SUBSCRIPTION ? ct() : Kn({ refCount: !0 })
          ));
        } else
          a.observable = Ln(y, m, h).pipe(v);
      } catch (m) {
        a.observable = Hi(() => m);
      }
    } else
      a.observable = ve({ data: {} });
    if (l) {
      const { operation: p } = ae(e);
      A(
        !d,
        94,
        p[0].toUpperCase() + p.slice(1),
        f ?? "(anonymous)"
      ), a.observable = a.observable.pipe(Te((y) => ge(this.localState.execute({
        client: this.client,
        document: l,
        remoteResult: y,
        context: t,
        variables: r,
        fetchPolicy: i
      }))));
    }
    return {
      restart: () => {
        var p;
        return (p = a.restart) == null ? void 0 : p.call(a);
      },
      observable: a.observable.pipe(Nt((p) => {
        throw p = gl(p), yl(p), p;
      }))
    };
  }
  getResultsFromLink(e, { queryInfo: t, cacheWriteBehavior: r, observableQuery: i, exposeExtensions: s }) {
    const o = t.lastRequestId = this.generateRequestId(), { errorPolicy: a } = e, c = this.cache.transformForLink(e.query);
    return this.getObservableFromLink(c, e.context, e.variables, e.fetchPolicy).observable.pipe(fe((l) => {
      const u = t.markQueryResult(l, {
        ...e,
        document: c,
        cacheWriteBehavior: r
      }), d = Ce(u);
      if (d && a === "none")
        throw t.resetLastWrite(), i == null || i.resetNotifications(), new be(Sn(u));
      const f = {
        data: u.data,
        ...t.hasNext ? {
          loading: !0,
          networkStatus: _.streaming,
          dataState: "streaming",
          partial: !0
        } : {
          dataState: u.data ? "complete" : "empty",
          loading: !1,
          networkStatus: _.ready,
          partial: !u.data
        }
      };
      return s && "extensions" in u && (f[as] = u.extensions), d && (a === "none" && (f.data = void 0, f.dataState = "empty"), a !== "ignore" && (f.error = new be(Sn(u)), f.dataState !== "streaming" && (f.networkStatus = _.error))), f;
    }), Nt((l) => {
      if (o >= t.lastRequestId && a === "none")
        throw t.resetLastWrite(), i == null || i.resetNotifications(), l;
      const u = {
        data: void 0,
        dataState: "empty",
        loading: !1,
        networkStatus: _.ready,
        partial: !0
      };
      return a !== "ignore" && (u.error = l, u.networkStatus = _.error), ve(u);
    }));
  }
  fetchObservableWithInfo(e, {
    // The initial networkStatus for this fetch, most often
    // NetworkStatus.loading, but also possibly fetchMore, poll, refetch,
    // or setVariables.
    networkStatus: t = _.loading,
    query: r = e.query,
    fetchQueryOperator: i = (c) => c,
    onCacheHit: s = () => {
    },
    observableQuery: o,
    exposeExtensions: a
  }) {
    const c = this.getVariables(r, e.variables);
    let { fetchPolicy: l = "cache-first", errorPolicy: u = "none", returnPartialData: d = !1, notifyOnNetworkStatusChange: f = !0, context: h = {} } = e;
    this.prioritizeCacheValues && (l === "network-only" || l === "cache-and-network") && (l = "cache-first");
    const p = Object.assign({}, e, {
      query: r,
      variables: c,
      fetchPolicy: l,
      errorPolicy: u,
      returnPartialData: d,
      notifyOnNetworkStatusChange: f,
      context: h
    }), y = new En(this, o), m = (O) => {
      p.variables = O;
      const I = l === "no-cache" ? 0 : t === _.refetch && p.refetchWritePolicy !== "merge" ? 1 : 2, D = this.fetchQueryByPolicy(p, {
        queryInfo: y,
        cacheWriteBehavior: I,
        onCacheHit: s,
        observableQuery: o,
        exposeExtensions: a
      });
      return D.observable = D.observable.pipe(i), // If we're in standby, postpone advancing options.fetchPolicy using
      // applyNextFetchPolicy.
      p.fetchPolicy !== "standby" && (o == null || o.applyNextFetchPolicy("after-fetch", e)), D;
    }, v = () => {
      this.fetchCancelFns.delete(y.id);
    };
    this.fetchCancelFns.set(y.id, (O) => {
      w.next({
        kind: "E",
        error: O,
        source: "network"
      });
    });
    const w = new Ue();
    let E, k;
    if (this.getDocumentInfo(p.query).hasClientExports)
      E = ge(this.localState.getExportedVariables({
        client: this.client,
        document: p.query,
        variables: p.variables,
        context: p.context
      })).pipe(Te((O) => m(O).observable)), k = !0;
    else {
      const O = m(p.variables);
      k = O.fromLink, E = O.observable;
    }
    return {
      // Merge `observable` with `fetchCancelSubject`, in a way that completing or
      // erroring either of them will complete the merged obserable.
      observable: new F((O) => {
        O.add(v), E.subscribe(O), w.subscribe(O);
      }).pipe(ct()),
      fromLink: k
    };
  }
  refetchQueries({ updateCache: e, include: t, optimistic: r = !1, removeOptimistic: i = r ? Ki("refetchQueries") : void 0, onQueryUpdated: s }) {
    const o = /* @__PURE__ */ new Map();
    t && this.getObservableQueries(t).forEach((c) => {
      if (c.options.fetchPolicy === "cache-only" || c.variablesUnknown)
        return;
      const l = c.getCurrentResult();
      o.set(c, {
        oq: c,
        lastDiff: {
          result: l == null ? void 0 : l.data,
          complete: !(l != null && l.partial)
        }
      });
    });
    const a = /* @__PURE__ */ new Map();
    if (e) {
      const c = /* @__PURE__ */ new Set();
      this.cache.batch({
        update: e,
        // Since you can perform any combination of cache reads and/or writes in
        // the cache.batch update function, its optimistic option can be either
        // a boolean or a string, representing three distinct modes of
        // operation:
        //
        // * false: read/write only the root layer
        // * true: read/write the topmost layer
        // * string: read/write a fresh optimistic layer with that ID string
        //
        // When typeof optimistic === "string", a new optimistic layer will be
        // temporarily created within cache.batch with that string as its ID. If
        // we then pass that same string as the removeOptimistic option, we can
        // make cache.batch immediately remove the optimistic layer after
        // running the updateCache function, triggering only one broadcast.
        //
        // However, the refetchQueries method accepts only true or false for its
        // optimistic option (not string). We interpret true to mean a temporary
        // optimistic layer should be created, to allow efficiently rolling back
        // the effect of the updateCache function, which involves passing a
        // string instead of true as the optimistic option to cache.batch, when
        // refetchQueries receives optimistic: true.
        //
        // In other words, we are deliberately not supporting the use case of
        // writing to an *existing* optimistic layer (using the refetchQueries
        // updateCache function), since that would potentially interfere with
        // other optimistic updates in progress. Instead, you can read/write
        // only the root layer by passing optimistic: false to refetchQueries,
        // or you can read/write a brand new optimistic layer that will be
        // automatically removed by passing optimistic: true.
        optimistic: r && i || !1,
        // The removeOptimistic option can also be provided by itself, even if
        // optimistic === false, to remove some previously-added optimistic
        // layer safely and efficiently, like we do in markMutationResult.
        //
        // If an explicit removeOptimistic string is provided with optimistic:
        // true, the removeOptimistic string will determine the ID of the
        // temporary optimistic layer, in case that ever matters.
        removeOptimistic: i,
        onWatchUpdated(l, u, d) {
          const f = l.watcher;
          if (f instanceof bn && !c.has(f)) {
            if (c.add(f), s) {
              o.delete(f);
              let h = s(f, u, d);
              return h === !0 && (h = f.refetch().retain(
                /* create a persistent subscription on the query */
              )), h !== !1 && a.set(f, h), h;
            }
            s !== null && f.options.fetchPolicy !== "cache-only" && o.set(f, { oq: f, lastDiff: d, diff: u });
          }
        }
      });
    }
    return o.size && o.forEach(({ oq: c, lastDiff: l, diff: u }) => {
      let d;
      s && (u || (u = c.getCacheDiff()), d = s(c, u, l)), (!s || d === !0) && (d = c.refetch().retain(
        /* create a persistent subscription on the query */
      )), d !== !1 && a.set(c, d);
    }), i && this.cache.removeOptimistic(i), a;
  }
  maskOperation(e) {
    const { document: t, data: r } = e;
    return this.dataMasking ? nl(r, t, this.cache) : r;
  }
  maskFragment(e) {
    const { data: t, fragment: r, fragmentName: i } = e;
    return this.dataMasking ? tl(t, r, this.cache, i) : t;
  }
  fetchQueryByPolicy({ query: e, variables: t, fetchPolicy: r, errorPolicy: i, returnPartialData: s, context: o }, { cacheWriteBehavior: a, onCacheHit: c, queryInfo: l, observableQuery: u, exposeExtensions: d }) {
    const f = () => this.cache.diff({
      query: e,
      variables: t,
      returnPartialData: !0,
      optimistic: !0
    }), h = (y, m) => {
      const v = y.result, w = (k) => (!y.complete && !s && (k = void 0), {
        // TODO: Handle partial data
        data: k,
        dataState: y.complete ? "complete" : k ? "partial" : "empty",
        loading: Dt(m),
        networkStatus: m,
        partial: !y.complete
      }), E = (k) => ve({
        kind: "N",
        value: w(k),
        source: "cache"
      });
      return (
        // Don't attempt to run forced resolvers if we have incomplete cache
        // data and partial isn't allowed since this result would get set to
        // `undefined` anyways in `toResult`.
        (y.complete || s) && this.getDocumentInfo(e).hasForcedResolvers ? (c(), ge(this.localState.execute({
          client: this.client,
          document: e,
          remoteResult: v ? { data: v } : void 0,
          context: o,
          variables: t,
          onlyRunForcedResolvers: !0,
          returnPartialData: !0,
          fetchPolicy: r
        }).then((k) => ({
          kind: "N",
          value: w(k.data || void 0),
          source: "cache"
        })))) : i === "none" && m === _.refetch && y.missing ? E(void 0) : E(v || void 0)
      );
    }, p = () => this.getResultsFromLink({
      query: e,
      variables: t,
      context: o,
      fetchPolicy: r,
      errorPolicy: i
    }, {
      cacheWriteBehavior: a,
      queryInfo: l,
      observableQuery: u,
      exposeExtensions: d
    }).pipe(ci(), Va(), fe((y) => ({
      ...y,
      source: "network"
    })));
    switch (r) {
      default:
      case "cache-first": {
        const y = f();
        return y.complete ? {
          fromLink: !1,
          observable: h(y, _.ready)
        } : s ? {
          fromLink: !0,
          observable: ln(h(y, _.loading), p())
        } : { fromLink: !0, observable: p() };
      }
      case "cache-and-network": {
        const y = f();
        return y.complete || s ? {
          fromLink: !0,
          observable: ln(h(y, _.loading), p())
        } : { fromLink: !0, observable: p() };
      }
      case "cache-only":
        return {
          fromLink: !1,
          observable: ln(h(f(), _.ready))
        };
      case "network-only":
        return { fromLink: !0, observable: p() };
      case "no-cache":
        return { fromLink: !0, observable: p() };
      case "standby":
        return { fromLink: !1, observable: at };
    }
  }
}
function ci() {
  let n = !1;
  return lt({
    next() {
      n = !0;
    },
    complete() {
      A(n, 98);
    }
  });
}
function wl(n) {
  return ee(n, {
    FragmentSpread: (e) => {
      var t;
      if (!((t = e.directives) != null && t.some((r) => r.name.value === "unmask")))
        return {
          ...e,
          directives: [
            ...e.directives || [],
            {
              kind: S.DIRECTIVE,
              name: { kind: S.NAME, value: "nonreactive" }
            }
          ]
        };
    }
  });
}
function Sn(n) {
  var i;
  if (((i = n.extensions) == null ? void 0 : i[de]) == null)
    return n;
  const { extensions: { [de]: e, ...t }, ...r } = n;
  return Object.keys(t).length > 0 && (r.extensions = t), r;
}
class El {
  /**
   * Constructs an instance of `ApolloClient`.
   *
   * @example
   *
   * ```js
   * import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
   *
   * const cache = new InMemoryCache();
   * const link = new HttpLink({ uri: "http://localhost:4000/" });
   *
   * const client = new ApolloClient({
   *   // Provide required constructor fields
   *   cache: cache,
   *   link: link,
   *
   *   // Provide some optional constructor fields
   *   clientAwareness: {
   *     name: "react-web-client",
   *     version: "1.3",
   *   },
   *   queryDeduplication: false,
   * });
   * ```
   */
  constructor(e) {
    g(this, "link");
    g(this, "cache");
    /**
     * @deprecated `disableNetworkFetches` has been renamed to `prioritizeCacheValues`.
     */
    g(this, "disableNetworkFetches");
    g(this, "version");
    g(this, "queryDeduplication");
    g(this, "defaultOptions");
    g(this, "devtoolsConfig");
    g(this, "queryManager");
    g(this, "devToolsHookCb");
    g(this, "resetStoreCallbacks", []);
    g(this, "clearStoreCallbacks", []);
    /**
     * Refetches all of your active queries.
     *
     * `reFetchObservableQueries()` is useful if you want to bring the client back to proper state in case of a network outage
     *
     * It is important to remember that `reFetchObservableQueries()` _will_ refetch any active
     * queries. This means that any components that might be mounted will execute
     * their queries again using your network interface. If you do not want to
     * re-execute any queries then you should make sure to stop watching any
     * active queries.
     * Takes optional parameter `includeStandby` which will include queries in standby-mode when refetching.
     *
     * Note: `cache-only` queries are not refetched by this function.
     *
     * @deprecated Please use `refetchObservableQueries` instead.
     */
    g(this, "reFetchObservableQueries");
    g(this, "maskedFragmentTransform", new re(mc));
    const { cache: t, documentTransform: r, ssrMode: i = !1, ssrForceFetchDelay: s = 0, queryDeduplication: o = !0, defaultOptions: a, defaultContext: c, assumeImmutableResults: l = t.assumeImmutableResults, localState: u, devtools: d, dataMasking: f, link: h, incrementalHandler: p = new jc(), experiments: y = [] } = e;
    this.link = h, this.cache = t, this.queryDeduplication = o, this.defaultOptions = a || {}, this.devtoolsConfig = {
      ...d,
      enabled: (d == null ? void 0 : d.enabled) ?? Ji
    }, this.watchQuery = this.watchQuery.bind(this), this.query = this.query.bind(this), this.mutate = this.mutate.bind(this), this.watchFragment = this.watchFragment.bind(this), this.resetStore = this.resetStore.bind(this), this.reFetchObservableQueries = this.refetchObservableQueries = this.refetchObservableQueries.bind(this), this.version = Xn, this.queryManager = new bl({
      client: this,
      defaultOptions: this.defaultOptions,
      defaultContext: c,
      documentTransform: r,
      queryDeduplication: o,
      ssrMode: i,
      dataMasking: !!f,
      clientOptions: e,
      incrementalHandler: p,
      assumeImmutableResults: l,
      onBroadcast: this.devtoolsConfig.enabled ? () => {
        this.devToolsHookCb && this.devToolsHookCb();
      } : void 0,
      localState: u
    }), this.prioritizeCacheValues = i || s > 0, s && setTimeout(() => {
      this.prioritizeCacheValues = !1;
    }, s), this.devtoolsConfig.enabled && this.connectToDevTools(), y.forEach((m) => m.call(this, e));
  }
  set prioritizeCacheValues(e) {
    this.queryManager.prioritizeCacheValues = e;
  }
  /**
   * Whether to prioritize cache values over network results when `query` or `watchQuery` is called.
   * This will essentially turn a `"network-only"` or `"cache-and-network"` fetchPolicy into a `"cache-first"` fetchPolicy,
   * but without influencing the `fetchPolicy` of the created `ObservableQuery` long-term.
   *
   * This can e.g. be used to prioritize the cache during the first render after SSR.
   */
  get prioritizeCacheValues() {
    return this.queryManager.prioritizeCacheValues;
  }
  connectToDevTools() {
    if (typeof window > "u")
      return;
    const e = window, t = Symbol.for("apollo.devtools");
    (e[t] = e[t] || []).push(this), e.__APOLLO_CLIENT__ = this;
  }
  /**
   * The `DocumentTransform` used to modify GraphQL documents before a request
   * is made. If a custom `DocumentTransform` is not provided, this will be the
   * default document transform.
   */
  get documentTransform() {
    return this.queryManager.documentTransform;
  }
  /**
   * The configured `LocalState` instance used to enable the use of `@client`
   * fields.
   */
  get localState() {
    return this.queryManager.localState;
  }
  set localState(e) {
    this.queryManager.localState = e;
  }
  /**
   * Call this method to terminate any active client processes, making it safe
   * to dispose of this `ApolloClient` instance.
   *
   * This method performs aggressive cleanup to prevent memory leaks:
   *
   * - Unsubscribes all active `ObservableQuery` instances by emitting a `completed` event
   * - Rejects all currently running queries with "QueryManager stopped while query was in flight"
   * - Removes all queryRefs from the suspense cache
   */
  stop() {
    this.queryManager.stop();
  }
  /**
   * This watches the cache store of the query according to the options specified and
   * returns an `ObservableQuery`. We can subscribe to this `ObservableQuery` and
   * receive updated results through an observer when the cache store changes.
   *
   * Note that this method is not an implementation of GraphQL subscriptions. Rather,
   * it uses Apollo's store in order to reactively deliver updates to your query results.
   *
   * For example, suppose you call watchQuery on a GraphQL query that fetches a person's
   * first and last name and this person has a particular object identifier, provided by
   * `cache.identify`. Later, a different query fetches that same person's
   * first and last name and the first name has now changed. Then, any observers associated
   * with the results of the first query will be updated with a new result object.
   *
   * Note that if the cache does not change, the subscriber will _not_ be notified.
   *
   * See [here](https://medium.com/apollo-stack/the-concepts-of-graphql-bc68bd819be3#.3mb0cbcmc) for
   * a description of store reactivity.
   */
  watchQuery(e) {
    return this.defaultOptions.watchQuery && (e = It(this.defaultOptions.watchQuery, e)), this.queryManager.watchQuery(e);
  }
  /**
   * This resolves a single query according to the options specified and
   * returns a `Promise` which is either resolved with the resulting data
   * or rejected with an error.
   *
   * @param options - An object of type `QueryOptions` that allows us to
   * describe how this query should be treated e.g. whether it should hit the
   * server at all or just resolve from the cache, etc.
   */
  query(e) {
    return this.defaultOptions.query && (e = It(this.defaultOptions.query, e)), this.queryManager.query(e);
  }
  /**
   * This resolves a single mutation according to the options specified and returns a
   * Promise which is either resolved with the resulting data or rejected with an
   * error. In some cases both `data` and `errors` might be undefined, for example
   * when `errorPolicy` is set to `'ignore'`.
   *
   * It takes options as an object with the following keys and values:
   */
  mutate(e) {
    const t = It(G({
      fetchPolicy: "network-only",
      errorPolicy: "none"
    }, this.defaultOptions.mutate), e);
    return he(t.mutation, J.MUTATION), this.queryManager.mutate(t);
  }
  /**
   * This subscribes to a graphql subscription according to the options specified and returns an
   * `Observable` which either emits received data or an error.
   */
  subscribe(e) {
    const t = {}, r = this.queryManager.startGraphQLSubscription(e), i = r.pipe(fe((s) => ({
      ...s,
      data: this.queryManager.maskOperation({
        document: e.query,
        data: s.data,
        fetchPolicy: e.fetchPolicy,
        cause: t
      })
    })));
    return Object.assign(i, { restart: r.restart });
  }
  readQuery(e, t = !1) {
    return this.cache.readQuery({ ...e, query: this.transform(e.query) }, t);
  }
  watchFragment(e) {
    const t = this.queryManager.dataMasking;
    return this.cache.watchFragment({
      ...e,
      fragment: this.transform(e.fragment, t)
    });
  }
  readFragment(e, t = !1) {
    return this.cache.readFragment({ ...e, fragment: this.transform(e.fragment) }, t);
  }
  /**
   * Writes some data in the shape of the provided GraphQL query directly to
   * the store. This method will start at the root query. To start at a
   * specific id returned by `cache.identify` then use `writeFragment`.
   */
  writeQuery(e) {
    const t = this.cache.writeQuery(e);
    return e.broadcast !== !1 && this.queryManager.broadcastQueries(), t;
  }
  /**
   * Writes some data in the shape of the provided GraphQL fragment directly to
   * the store. This method will write to a GraphQL fragment from any arbitrary
   * id that is currently cached, unlike `writeQuery` which will only write
   * from the root query.
   *
   * You must pass in a GraphQL document with a single fragment or a document
   * with multiple fragments that represent what you are writing. If you pass
   * in a document with multiple fragments then you must also specify a
   * `fragmentName`.
   */
  writeFragment(e) {
    const t = this.cache.writeFragment(e);
    return e.broadcast !== !1 && this.queryManager.broadcastQueries(), t;
  }
  __actionHookForDevTools(e) {
    this.devToolsHookCb = e;
  }
  __requestRaw(e) {
    return Ln(this.link, e, { client: this });
  }
  /**
   * Resets your entire store by clearing out your cache and then re-executing
   * all of your active queries. This makes it so that you may guarantee that
   * there is no data left in your store from a time before you called this
   * method.
   *
   * `resetStore()` is useful when your user just logged out. You’ve removed the
   * user session, and you now want to make sure that any references to data you
   * might have fetched while the user session was active is gone.
   *
   * It is important to remember that `resetStore()` _will_ refetch any active
   * queries. This means that any components that might be mounted will execute
   * their queries again using your network interface. If you do not want to
   * re-execute any queries then you should make sure to stop watching any
   * active queries.
   */
  resetStore() {
    return Promise.resolve().then(() => this.queryManager.clearStore({
      discardWatches: !1
    })).then(() => Promise.all(this.resetStoreCallbacks.map((e) => e()))).then(() => this.refetchObservableQueries());
  }
  /**
   * Remove all data from the store. Unlike `resetStore`, `clearStore` will
   * not refetch any active queries.
   */
  clearStore() {
    return Promise.resolve().then(() => this.queryManager.clearStore({
      discardWatches: !0
    })).then(() => Promise.all(this.clearStoreCallbacks.map((e) => e())));
  }
  /**
   * Allows callbacks to be registered that are executed when the store is
   * reset. `onResetStore` returns an unsubscribe function that can be used
   * to remove registered callbacks.
   */
  onResetStore(e) {
    return this.resetStoreCallbacks.push(e), () => {
      this.resetStoreCallbacks = this.resetStoreCallbacks.filter((t) => t !== e);
    };
  }
  /**
   * Allows callbacks to be registered that are executed when the store is
   * cleared. `onClearStore` returns an unsubscribe function that can be used
   * to remove registered callbacks.
   */
  onClearStore(e) {
    return this.clearStoreCallbacks.push(e), () => {
      this.clearStoreCallbacks = this.clearStoreCallbacks.filter((t) => t !== e);
    };
  }
  /**
   * Refetches all of your active queries.
   *
   * `refetchObservableQueries()` is useful if you want to bring the client back to proper state in case of a network outage
   *
   * It is important to remember that `refetchObservableQueries()` _will_ refetch any active
   * queries. This means that any components that might be mounted will execute
   * their queries again using your network interface. If you do not want to
   * re-execute any queries then you should make sure to stop watching any
   * active queries.
   * Takes optional parameter `includeStandby` which will include queries in standby-mode when refetching.
   *
   * Note: `cache-only` queries are not refetched by this function.
   */
  refetchObservableQueries(e) {
    return this.queryManager.refetchObservableQueries(e);
  }
  /**
   * Refetches specified active queries. Similar to "refetchObservableQueries()" but with a specific list of queries.
   *
   * `refetchQueries()` is useful for use cases to imperatively refresh a selection of queries.
   *
   * It is important to remember that `refetchQueries()` _will_ refetch specified active
   * queries. This means that any components that might be mounted will execute
   * their queries again using your network interface. If you do not want to
   * re-execute any queries then you should make sure to stop watching any
   * active queries.
   */
  refetchQueries(e) {
    const t = this.queryManager.refetchQueries(e), r = [], i = [];
    t.forEach((o, a) => {
      r.push(a), i.push(o);
    });
    const s = Promise.all(i);
    return s.queries = r, s.results = i, s.catch((o) => {
    }), s;
  }
  /**
   * Get all currently active `ObservableQuery` objects, in a `Set`.
   *
   * An "active" query is one that has observers and a `fetchPolicy` other than
   * "standby" or "cache-only".
   *
   * You can include all `ObservableQuery` objects (including the inactive ones)
   * by passing "all" instead of "active", or you can include just a subset of
   * active queries by passing an array of query names or DocumentNode objects.
   *
   * Note: This method only returns queries that have active subscribers. Queries
   * without subscribers are not tracked by the client.
   */
  getObservableQueries(e = "active") {
    return this.queryManager.getObservableQueries(e);
  }
  /**
   * Exposes the cache's complete state, in a serializable format for later restoration.
   *
   * @remarks
   *
   * This can be useful for debugging in order to inspect the full state of the
   * cache.
   *
   * @param optimistic - Determines whether the result contains data from the
   * optimistic layer
   */
  extract(e) {
    return this.cache.extract(e);
  }
  /**
   * Replaces existing state in the cache (if any) with the values expressed by
   * `serializedState`.
   *
   * Called when hydrating a cache (server side rendering, or offline storage),
   * and also (potentially) during hot reloads.
   */
  restore(e) {
    return this.cache.restore(e);
  }
  /**
   * Define a new ApolloLink (or link chain) that Apollo Client will use.
   */
  setLink(e) {
    this.link = e;
  }
  get defaultContext() {
    return this.queryManager.defaultContext;
  }
  transform(e, t = !1) {
    const r = this.queryManager.transform(e);
    return t ? this.maskedFragmentTransform.transformDocument(r) : r;
  }
}
const { hasOwnProperty: li } = Object.prototype;
function kl(n) {
  return $(n) && "payload" in n;
}
async function* Sl(n) {
  var f;
  const e = new TextDecoder("utf-8"), t = (f = n.headers) == null ? void 0 : f.get("content-type"), r = t == null ? void 0 : t.match(
    /*
      ;\s*boundary=                # Match the boundary parameter
      (?:                          # either
        '([^']*)'                  # a string starting with ' doesn't contain ', ends with '
        |                          # or
        "([^"]*)"                  # a string starting with " doesn't contain ", ends with "
        |                          # or
        ([^"'].*?)                 # a string that doesn't start with ' or ", parsed non-greedily
        )                          # end of the group
      \s*                          # optional whitespace
      (?:;|$)                        # match a semicolon or end of string
    */
    /;\s*boundary=(?:'([^']+)'|"([^"]+)"|([^"'].+?))\s*(?:;|$)/i
  ), i = `\r
--` + (r ? r[1] ?? r[2] ?? r[3] ?? "-" : "-");
  let s = "";
  A(n.body && typeof n.body.getReader == "function", 62);
  const a = n.body.getReader();
  let c = !1, l = !1, u;
  const d = () => l && s[0] == "-" && s[1] == "-";
  try {
    for (; !c; ) {
      ({ value: u, done: c } = await a.read());
      const h = typeof u == "string" ? u : e.decode(u), p = s.length - i.length + 1;
      s += h;
      let y = s.indexOf(i, p);
      for (; y > -1 && !d(); ) {
        l = !0;
        let m;
        [m, s] = [
          s.slice(0, y),
          s.slice(y + i.length)
        ];
        const v = m.indexOf(`\r
\r
`), E = xl(m.slice(0, v))["content-type"];
        if (E && E.toLowerCase().indexOf("application/json") === -1)
          throw new Error("Unsupported patch content type: application/json is required.");
        const k = m.slice(v);
        k && (yield k), y = s.indexOf(i);
      }
      if (d())
        return;
    }
    throw new Error("premature end of multipart body");
  } finally {
    a.cancel();
  }
}
async function Ol(n, e) {
  for await (const t of Sl(n)) {
    const r = Ms(n, t);
    if (Object.keys(r).length != 0)
      if (kl(r)) {
        if (Object.keys(r).length === 1 && r.payload === null)
          return;
        let i = { ...r.payload };
        "errors" in r && (i.extensions = {
          ...i.extensions,
          [qt]: new Bt(r.errors ?? [])
        }), e(i);
      } else
        e(r);
  }
}
function xl(n) {
  const e = {};
  return n.split(`
`).forEach((t) => {
    const r = t.indexOf(":");
    if (r > -1) {
      const i = t.slice(0, r).trim().toLowerCase(), s = t.slice(r + 1).trim();
      e[i] = s;
    }
  }), e;
}
function Ms(n, e) {
  if (n.status >= 300)
    throw new tn(`Response not successful: Received status code ${n.status}`, { response: n, bodyText: e });
  try {
    return JSON.parse(e);
  } catch (t) {
    throw new nn(t, { response: n, bodyText: e });
  }
}
function Tl(n, e) {
  try {
    return JSON.parse(e);
  } catch (t) {
    throw new nn(t, { response: n, bodyText: e });
  }
}
function Cl(n, e) {
  const t = n.headers.get("content-type");
  return t != null && t.includes("application/graphql-response+json") ? Tl(n, e) : Ms(n, e);
}
function _l(n) {
  return (e) => e.text().then((t) => {
    const r = Cl(e, t);
    if (!Array.isArray(r) && !li.call(r, "data") && !li.call(r, "errors"))
      throw new tn(`Server response was malformed for query '${Array.isArray(n) ? n.map((i) => i.operationName) : n.operationName}'.`, { response: e, bodyText: t });
    return r;
  });
}
const Nl = {
  includeQuery: !0,
  includeExtensions: !0,
  preserveHeaderCase: !1
}, Il = {
  // headers are case insensitive (https://stackoverflow.com/a/5259004)
  accept: "application/graphql-response+json,application/json;q=0.9",
  // The content-type header describes the type of the body of the request, and
  // so it typically only is sent with requests that actually have bodies. One
  // could imagine that Apollo Client would remove this header when constructing
  // a GET request (which has no body), but we historically have not done that.
  // This means that browsers will preflight all Apollo Client requests (even
  // GET requests). Apollo Server's CSRF prevention feature (introduced in
  // AS3.7) takes advantage of this fact and does not block requests with this
  // header. If you want to drop this header from GET requests, then you should
  // probably replace it with a `apollo-require-preflight` header, or servers
  // with CSRF prevention enabled might block your GET request. See
  // https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
  // for more details.
  "content-type": "application/json"
}, Al = {
  method: "POST"
}, Dl = {
  http: Nl,
  headers: Il,
  options: Al
}, Rl = (n, e) => e(n);
function Fl(n, e, ...t) {
  let r = {}, i = {};
  t.forEach((u) => {
    var d;
    r = {
      ...r,
      ...u.options,
      headers: {
        ...r.headers,
        ...u.headers
      }
    }, u.credentials && (r.credentials = u.credentials), r.headers.accept = (((d = u.http) == null ? void 0 : d.accept) || []).concat(r.headers.accept).join(","), i = {
      ...i,
      ...u.http
    };
  }), r.headers = Pl(r.headers, i.preserveHeaderCase);
  const { operationName: s, extensions: o, variables: a, query: c } = n, l = { operationName: s, variables: a };
  return i.includeExtensions && Object.keys(o || {}).length && (l.extensions = o), i.includeQuery && (l.query = e(c, Re)), {
    options: r,
    body: l
  };
}
function Pl(n, e) {
  if (!e) {
    const i = {};
    return Object.keys(Object(n)).forEach((s) => {
      i[s.toLowerCase()] = n[s];
    }), i;
  }
  const t = {};
  Object.keys(Object(n)).forEach((i) => {
    t[i.toLowerCase()] = {
      originalName: i,
      value: n[i]
    };
  });
  const r = {};
  return Object.keys(t).forEach((i) => {
    r[t[i].originalName] = t[i].value;
  }), r;
}
const Ml = (n, e) => {
  const r = n.getContext().uri;
  return r || (typeof e == "function" ? e(n) : e || "/graphql");
};
function Ll(n, e) {
  const t = [], r = (l, u) => {
    t.push(`${l}=${encodeURIComponent(u)}`);
  };
  if ("query" in e && r("query", e.query), e.operationName && r("operationName", e.operationName), e.variables) {
    let l;
    try {
      l = JSON.stringify(e.variables);
    } catch (u) {
      return { parseError: u };
    }
    r("variables", l);
  }
  if (e.extensions) {
    let l;
    try {
      l = JSON.stringify(e.extensions);
    } catch (u) {
      return { parseError: u };
    }
    r("extensions", l);
  }
  let i = "", s = n;
  const o = n.indexOf("#");
  o !== -1 && (i = n.substr(o), s = n.substr(0, o));
  const a = s.indexOf("?") === -1 ? "?" : "&";
  return { newURI: s + a + t.join("&") + i };
}
const jl = le(() => fetch);
function Vl() {
}
class Bl extends z {
  constructor(e = {}) {
    let {
      uri: t = "/graphql",
      // use default global fetch if nothing passed in
      fetch: r,
      print: i = Rl,
      includeExtensions: s,
      preserveHeaderCase: o,
      useGETForQueries: a,
      includeUnusedVariables: c = !1,
      ...l
    } = e;
    const u = {
      http: G({ includeExtensions: s, preserveHeaderCase: o }),
      options: l.fetchOptions,
      credentials: l.credentials,
      headers: l.headers
    };
    super((d) => {
      let f = Ml(d, t);
      const h = d.getContext(), p = { ...h.http };
      Wc(d.query) && (p.accept = [
        "multipart/mixed;boundary=graphql;subscriptionSpec=1.0",
        ...p.accept || []
      ]);
      const y = {
        http: p,
        options: h.fetchOptions,
        credentials: h.credentials,
        headers: h.headers
      }, { options: m, body: v } = Fl(d, i, Dl, u, y);
      v.variables && !c && (v.variables = Bc(v.variables, d.query));
      let w = new AbortController(), E = () => {
        w = void 0;
      };
      if (m.signal) {
        const k = m.signal, O = () => {
          w == null || w.abort(k.reason);
        };
        k.addEventListener("abort", O, { once: !0 }), E = () => {
          w == null || w.signal.removeEventListener("abort", E), w = void 0, k.removeEventListener("abort", O), E = Vl;
        }, w.signal.addEventListener("abort", E, {
          once: !0
        });
      }
      return m.signal = w.signal, a && !Uc(d.query) && (m.method = "GET"), new F((k) => {
        if (m.method === "GET") {
          const { newURI: D, parseError: X } = Ll(f, v);
          if (X)
            throw X;
          f = D;
        } else
          m.body = JSON.stringify(v);
        const O = r || le(() => fetch) || jl, I = k.next.bind(k);
        return O(f, m).then((D) => {
          var ye;
          d.setContext({ response: D });
          const X = (ye = D.headers) == null ? void 0 : ye.get("content-type");
          return X !== null && /^multipart\/mixed/i.test(X) ? Ol(D, I) : _l(d)(D).then(I);
        }).then(() => {
          E(), k.complete();
        }).catch((D) => {
          E(), k.error(D);
        }), () => {
          w && w.abort();
        };
      });
    });
  }
}
class ql extends z {
  constructor(e = {}) {
    super((t, r) => {
      const i = t.client, s = i.queryManager.clientOptions, o = t.getContext();
      {
        const { name: a, version: c, transport: l = "headers" } = G({}, s.clientAwareness, e.clientAwareness, o.clientAwareness);
        l === "headers" && t.setContext(({ headers: u }) => ({
          headers: G(
            // setting these first so that they can be overridden by user-provided headers
            {
              "apollographql-client-name": a,
              "apollographql-client-version": c
            },
            u
          )
        }));
      }
      {
        const { transport: a = "extensions" } = G({}, s.enhancedClientAwareness, e.enhancedClientAwareness);
        a === "extensions" && (t.extensions = G(
          // setting these first so that it can be overridden by user-provided extensions
          {
            clientLibrary: {
              name: "@apollo/client",
              version: i.version
            }
          },
          t.extensions
        )), a === "headers" && t.setContext(({ headers: c }) => ({
          headers: G(
            // setting these first so that they can be overridden by user-provided headers
            {
              "apollographql-library-name": "@apollo/client",
              "apollographql-library-version": i.version
            },
            c
          )
        }));
      }
      return r(t);
    });
  }
}
class Ul extends z {
  constructor(e = {}) {
    const { left: t, right: r, request: i } = z.from([
      new ql(e),
      new Bl(e)
    ]);
    super(i), Object.assign(this, { left: t, right: r });
  }
}
var Ft = /* @__PURE__ */ new Map(), Un = /* @__PURE__ */ new Map(), Ls = !0, Ut = !1;
function js(n) {
  return n.replace(/[\s,]+/g, " ").trim();
}
function Wl(n) {
  return js(n.source.body.substring(n.start, n.end));
}
function zl(n) {
  var e = /* @__PURE__ */ new Set(), t = [];
  return n.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var i = r.name.value, s = Wl(r.loc), o = Un.get(i);
      o && !o.has(s) ? Ls && console.warn("Warning: fragment with name " + i + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Un.set(i, o = /* @__PURE__ */ new Set()), o.add(s), e.has(s) || (e.add(s), t.push(r));
    } else
      t.push(r);
  }), Mt(Mt({}, n), { definitions: t });
}
function $l(n) {
  var e = new Set(n.definitions);
  e.forEach(function(r) {
    r.loc && delete r.loc, Object.keys(r).forEach(function(i) {
      var s = r[i];
      s && typeof s == "object" && e.add(s);
    });
  });
  var t = n.loc;
  return t && (delete t.startToken, delete t.endToken), n;
}
function Ql(n) {
  var e = js(n);
  if (!Ft.has(e)) {
    var t = Lo(n, {
      experimentalFragmentVariables: Ut,
      allowLegacyFragmentVariables: Ut
    });
    if (!t || t.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Ft.set(e, $l(zl(t)));
  }
  return Ft.get(e);
}
function ce(n) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  typeof n == "string" && (n = [n]);
  var r = n[0];
  return e.forEach(function(i, s) {
    i && i.kind === "Document" ? r += i.loc.source.body : r += i, r += n[s + 1];
  }), Ql(r);
}
function Gl() {
  Ft.clear(), Un.clear();
}
function Hl() {
  Ls = !1;
}
function Yl() {
  Ut = !0;
}
function Jl() {
  Ut = !1;
}
var Ge = {
  gql: ce,
  resetCaches: Gl,
  disableFragmentWarnings: Hl,
  enableExperimentalFragmentVariables: Yl,
  disableExperimentalFragmentVariables: Jl
};
(function(n) {
  n.gql = Ge.gql, n.resetCaches = Ge.resetCaches, n.disableFragmentWarnings = Ge.disableFragmentWarnings, n.enableExperimentalFragmentVariables = Ge.enableExperimentalFragmentVariables, n.disableExperimentalFragmentVariables = Ge.disableExperimentalFragmentVariables;
})(ce || (ce = {}));
ce.default = ce;
const Kl = ce`
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
`, Xl = ce`
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
`, Zl = ce`
  mutation RecordAcknowledgment($input: RecordAcknowledgmentInput!) {
    recordAcknowledgment(input: $input) {
      id
      handbookId
      acknowledgedAt
    }
  }
`, eu = ce`
  mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
    recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
      id
    }
  }
`;
function tu(n) {
  return {
    async getAssignedGuides(e, t) {
      const { data: r } = await n.query({
        query: Kl,
        variables: { azureAdObjectId: e, schoolYear: t },
        fetchPolicy: "network-only"
      });
      return r.assignedGuides;
    },
    async getPendingHandbooks(e, t) {
      const { data: r } = await n.query({
        query: Xl,
        variables: { azureAdObjectId: e, schoolYear: t },
        fetchPolicy: "network-only"
      });
      return r.pendingHandbooks;
    },
    async recordAcknowledgment(e, t, r) {
      const { data: i } = await n.mutate({
        mutation: Zl,
        variables: {
          input: { azureAdObjectId: e, handbookId: t, schoolYear: r }
        }
      });
      return i.recordAcknowledgment;
    },
    async recordGuideCompletion(e, t) {
      await n.mutate({
        mutation: eu,
        variables: { azureAdObjectId: e, guideId: t }
      });
    }
  };
}
const ui = Symbol.for("__APOLLO_CONTEXT__");
function nu() {
  A("createContext" in we, 37);
  let n = we.createContext[ui];
  return n || (Object.defineProperty(we.createContext, ui, {
    value: n = we.createContext({}),
    enumerable: !1,
    writable: !1,
    configurable: !0
  }), n.displayName = "ApolloContext"), n;
}
const ru = ({ client: n, children: e }) => {
  const t = nu(), r = we.useContext(t), i = we.useMemo(() => ({
    ...r,
    client: n || r.client
  }), [r, n]);
  return A(i.client, 38), we.createElement(t.Provider, { value: i }, e);
};
class iu extends z {
  constructor(e) {
    super((t, r) => {
      const { ...i } = t;
      return Object.defineProperty(i, "client", {
        enumerable: !1,
        value: t.client
      }), new F((s) => {
        let o = !1;
        return Promise.resolve(i).then((a) => e(t.getContext(), a)).then(t.setContext).then(() => {
          o || r(t).subscribe(s);
        }).catch(s.error.bind(s)), () => {
          o = !0;
        };
      });
    });
  }
}
function su(n) {
  return vi(() => {
    const e = new Ul({
      uri: n.apiUrl
    }), t = new iu(async (r) => {
      try {
        const i = await n.getAccessToken();
        return {
          ...r,
          headers: {
            ...r.headers,
            authorization: `Bearer ${i}`
          }
        };
      } catch {
        return r;
      }
    });
    return new El({
      link: t.concat(e),
      cache: new dl(),
      defaultOptions: {
        watchQuery: { fetchPolicy: "cache-and-network" }
      }
    });
  }, [n]);
}
const Vs = ro(null);
function Bs() {
  const n = io(Vs);
  if (!n)
    throw new Error("useGuideOpsContext must be used within a <GuideOpsProvider>");
  return n;
}
function ju({ config: n, children: e }) {
  const t = su(n), r = vi(() => ({
    client: tu(t),
    config: n
  }), [t, n]);
  return /* @__PURE__ */ q(Vs.Provider, { value: r, children: /* @__PURE__ */ q(ru, { client: t, children: e }) });
}
function ou() {
  const { client: n, config: e } = Bs(), [t, r] = ue([]), [i, s] = ue(!0), [o, a] = ue(null), c = e.userId || "", l = Xe(async () => {
    if (c)
      try {
        s(!0), a(null);
        const d = await n.getPendingHandbooks(c, e.schoolYear);
        r(d);
      } catch (d) {
        a(d instanceof Error ? d : new Error("Failed to fetch handbooks"));
      } finally {
        s(!1);
      }
  }, [n, c, e.schoolYear]);
  Pt(() => {
    l();
  }, [l]);
  const u = Xe(async (d) => {
    if (c)
      try {
        await n.recordAcknowledgment(c, d, e.schoolYear), r((f) => f.filter((h) => h.id !== d));
      } catch (f) {
        throw a(f instanceof Error ? f : new Error("Failed to record acknowledgment")), f;
      }
  }, [n, c, e.schoolYear]);
  return {
    pendingHandbooks: t,
    isLoading: i,
    error: o,
    acknowledge: u,
    hasAllAcknowledged: !i && t.length === 0,
    refresh: l
  };
}
let Wn = {}, qs;
function On(n = {}) {
  Wn = {
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
    ...n
  };
}
function T(n) {
  return n ? Wn[n] : Wn;
}
function au(n) {
  qs = n;
}
function Q() {
  return qs;
}
let Wt = {};
function Ot(n, e) {
  Wt[n] = e;
}
function ke(n) {
  var e;
  (e = Wt[n]) == null || e.call(Wt);
}
function cu() {
  Wt = {};
}
function xt(n, e, t, r) {
  return (n /= r / 2) < 1 ? t / 2 * n * n + e : -t / 2 * (--n * (n - 2) - 1) + e;
}
function Us(n) {
  const e = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return n.flatMap((t) => {
    const r = t.matches(e), i = Array.from(t.querySelectorAll(e));
    return [...r ? [t] : [], ...i];
  }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && fu(t));
}
function Ws(n) {
  if (!n || uu(n))
    return;
  const e = T("smoothScroll"), t = n.offsetHeight > window.innerHeight;
  n.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !e || lu(n) ? "auto" : "smooth",
    inline: "center",
    block: t ? "start" : "center"
  });
}
function lu(n) {
  if (!n || !n.parentElement)
    return;
  const e = n.parentElement;
  return e.scrollHeight > e.clientHeight;
}
function uu(n) {
  const e = n.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function fu(n) {
  return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length);
}
let zt = {};
function B(n, e) {
  zt[n] = e;
}
function C(n) {
  return n ? zt[n] : zt;
}
function fi() {
  zt = {};
}
function hu(n, e, t, r) {
  let i = C("__activeStagePosition");
  const s = i || t.getBoundingClientRect(), o = r.getBoundingClientRect(), a = xt(n, s.x, o.x - s.x, e), c = xt(n, s.y, o.y - s.y, e), l = xt(n, s.width, o.width - s.width, e), u = xt(n, s.height, o.height - s.height, e);
  i = {
    x: a,
    y: c,
    width: l,
    height: u
  }, $s(i), B("__activeStagePosition", i);
}
function zs(n) {
  if (!n)
    return;
  const e = n.getBoundingClientRect(), t = {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height
  };
  B("__activeStagePosition", t), $s(t);
}
function du() {
  const n = C("__activeStagePosition"), e = C("__overlaySvg");
  if (!n)
    return;
  if (!e) {
    console.warn("No stage svg found.");
    return;
  }
  const t = window.innerWidth, r = window.innerHeight;
  e.setAttribute("viewBox", `0 0 ${t} ${r}`);
}
function pu(n) {
  const e = mu(n);
  document.body.appendChild(e), Hs(e, (t) => {
    t.target.tagName === "path" && ke("overlayClick");
  }), B("__overlaySvg", e);
}
function $s(n) {
  const e = C("__overlaySvg");
  if (!e) {
    pu(n);
    return;
  }
  const t = e.firstElementChild;
  if ((t == null ? void 0 : t.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  t.setAttribute("d", Qs(n));
}
function mu(n) {
  const e = window.innerWidth, t = window.innerHeight, r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  r.classList.add("driver-overlay", "driver-overlay-animated"), r.setAttribute("viewBox", `0 0 ${e} ${t}`), r.setAttribute("xmlSpace", "preserve"), r.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), r.setAttribute("version", "1.1"), r.setAttribute("preserveAspectRatio", "xMinYMin slice"), r.style.fillRule = "evenodd", r.style.clipRule = "evenodd", r.style.strokeLinejoin = "round", r.style.strokeMiterlimit = "2", r.style.zIndex = "10000", r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%";
  const i = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return i.setAttribute("d", Qs(n)), i.style.fill = T("overlayColor") || "rgb(0,0,0)", i.style.opacity = `${T("overlayOpacity")}`, i.style.pointerEvents = "auto", i.style.cursor = "auto", r.appendChild(i), r;
}
function Qs(n) {
  const e = window.innerWidth, t = window.innerHeight, r = T("stagePadding") || 0, i = T("stageRadius") || 0, s = n.width + r * 2, o = n.height + r * 2, a = Math.min(i, s / 2, o / 2), c = Math.floor(Math.max(a, 0)), l = n.x - r + c, u = n.y - r, d = s - c * 2, f = o - c * 2;
  return `M${e},0L0,0L0,${t}L${e},${t}L${e},0Z
    M${l},${u} h${d} a${c},${c} 0 0 1 ${c},${c} v${f} a${c},${c} 0 0 1 -${c},${c} h-${d} a${c},${c} 0 0 1 -${c},-${c} v-${f} a${c},${c} 0 0 1 ${c},-${c} z`;
}
function yu() {
  const n = C("__overlaySvg");
  n && n.remove();
}
function vu() {
  const n = document.getElementById("driver-dummy-element");
  if (n)
    return n;
  let e = document.createElement("div");
  return e.id = "driver-dummy-element", e.style.width = "0", e.style.height = "0", e.style.pointerEvents = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.top = "50%", e.style.left = "50%", document.body.appendChild(e), e;
}
function hi(n) {
  const { element: e } = n;
  let t = typeof e == "function" ? e() : typeof e == "string" ? document.querySelector(e) : e;
  t || (t = vu()), bu(t, n);
}
function gu() {
  const n = C("__activeElement"), e = C("__activeStep");
  n && (zs(n), du(), Js(n, e));
}
function bu(n, e) {
  var t;
  const r = Date.now(), i = C("__activeStep"), s = C("__activeElement") || n, o = !s || s === n, a = n.id === "driver-dummy-element", c = s.id === "driver-dummy-element", l = T("animate"), u = e.onHighlightStarted || T("onHighlightStarted"), d = (e == null ? void 0 : e.onHighlighted) || T("onHighlighted"), f = (i == null ? void 0 : i.onDeselected) || T("onDeselected"), h = T(), p = C();
  !o && f && f(c ? void 0 : s, i, {
    config: h,
    state: p,
    driver: Q()
  }), u && u(a ? void 0 : n, e, {
    config: h,
    state: p,
    driver: Q()
  });
  const y = !o && l;
  let m = !1;
  Ou(), B("previousStep", i), B("previousElement", s), B("activeStep", e), B("activeElement", n);
  const v = () => {
    if (C("__transitionCallback") !== v)
      return;
    const w = Date.now() - r, E = 400 - w <= 400 / 2;
    e.popover && E && !m && y && (di(n, e), m = !0), T("animate") && w < 400 ? hu(w, 400, s, n) : (zs(n), d && d(a ? void 0 : n, e, {
      config: T(),
      state: C(),
      driver: Q()
    }), B("__transitionCallback", void 0), B("__previousStep", i), B("__previousElement", s), B("__activeStep", e), B("__activeElement", n)), window.requestAnimationFrame(v);
  };
  B("__transitionCallback", v), window.requestAnimationFrame(v), Ws(n), !y && e.popover && di(n, e), s.classList.remove("driver-active-element", "driver-no-interaction"), s.removeAttribute("aria-haspopup"), s.removeAttribute("aria-expanded"), s.removeAttribute("aria-controls"), ((t = e.disableActiveInteraction) != null ? t : T("disableActiveInteraction")) && n.classList.add("driver-no-interaction"), n.classList.add("driver-active-element"), n.setAttribute("aria-haspopup", "dialog"), n.setAttribute("aria-expanded", "true"), n.setAttribute("aria-controls", "driver-popover-content");
}
function wu() {
  var n;
  (n = document.getElementById("driver-dummy-element")) == null || n.remove(), document.querySelectorAll(".driver-active-element").forEach((e) => {
    e.classList.remove("driver-active-element", "driver-no-interaction"), e.removeAttribute("aria-haspopup"), e.removeAttribute("aria-expanded"), e.removeAttribute("aria-controls");
  });
}
function ht() {
  const n = C("__resizeTimeout");
  n && window.cancelAnimationFrame(n), B("__resizeTimeout", window.requestAnimationFrame(gu));
}
function Eu(n) {
  var e;
  if (!C("isInitialized") || !(n.key === "Tab" || n.keyCode === 9))
    return;
  const t = C("__activeElement"), r = (e = C("popover")) == null ? void 0 : e.wrapper, i = Us([
    ...r ? [r] : [],
    ...t ? [t] : []
  ]), s = i[0], o = i[i.length - 1];
  if (n.preventDefault(), n.shiftKey) {
    const a = i[i.indexOf(document.activeElement) - 1] || o;
    a == null || a.focus();
  } else {
    const a = i[i.indexOf(document.activeElement) + 1] || s;
    a == null || a.focus();
  }
}
function Gs(n) {
  var e;
  ((e = T("allowKeyboardControl")) == null || e) && (n.key === "Escape" ? ke("escapePress") : n.key === "ArrowRight" ? ke("arrowRightPress") : n.key === "ArrowLeft" && ke("arrowLeftPress"));
}
function Hs(n, e, t) {
  const r = (i, s) => {
    const o = i.target;
    n.contains(o) && ((!t || t(o)) && (i.preventDefault(), i.stopPropagation(), i.stopImmediatePropagation()), s == null || s(i));
  };
  document.addEventListener("pointerdown", r, !0), document.addEventListener("mousedown", r, !0), document.addEventListener("pointerup", r, !0), document.addEventListener("mouseup", r, !0), document.addEventListener(
    "click",
    (i) => {
      r(i, e);
    },
    !0
  );
}
function ku() {
  window.addEventListener("keyup", Gs, !1), window.addEventListener("keydown", Eu, !1), window.addEventListener("resize", ht), window.addEventListener("scroll", ht);
}
function Su() {
  window.removeEventListener("keyup", Gs), window.removeEventListener("resize", ht), window.removeEventListener("scroll", ht);
}
function Ou() {
  const n = C("popover");
  n && (n.wrapper.style.display = "none");
}
function di(n, e) {
  var t, r;
  let i = C("popover");
  i && document.body.removeChild(i.wrapper), i = Tu(), document.body.appendChild(i.wrapper);
  const {
    title: s,
    description: o,
    showButtons: a,
    disableButtons: c,
    showProgress: l,
    nextBtnText: u = T("nextBtnText") || "Next &rarr;",
    prevBtnText: d = T("prevBtnText") || "&larr; Previous",
    progressText: f = T("progressText") || "{current} of {total}"
  } = e.popover || {};
  i.nextButton.innerHTML = u, i.previousButton.innerHTML = d, i.progress.innerHTML = f, s ? (i.title.innerHTML = s, i.title.style.display = "block") : i.title.style.display = "none", o ? (i.description.innerHTML = o, i.description.style.display = "block") : i.description.style.display = "none";
  const h = a || T("showButtons"), p = l || T("showProgress") || !1, y = (h == null ? void 0 : h.includes("next")) || (h == null ? void 0 : h.includes("previous")) || p;
  i.closeButton.style.display = h.includes("close") ? "block" : "none", y ? (i.footer.style.display = "flex", i.progress.style.display = p ? "block" : "none", i.nextButton.style.display = h.includes("next") ? "block" : "none", i.previousButton.style.display = h.includes("previous") ? "block" : "none") : i.footer.style.display = "none";
  const m = c || T("disableButtons") || [];
  m != null && m.includes("next") && (i.nextButton.disabled = !0, i.nextButton.classList.add("driver-popover-btn-disabled")), m != null && m.includes("previous") && (i.previousButton.disabled = !0, i.previousButton.classList.add("driver-popover-btn-disabled")), m != null && m.includes("close") && (i.closeButton.disabled = !0, i.closeButton.classList.add("driver-popover-btn-disabled"));
  const v = i.wrapper;
  v.style.display = "block", v.style.left = "", v.style.top = "", v.style.bottom = "", v.style.right = "", v.id = "driver-popover-content", v.setAttribute("role", "dialog"), v.setAttribute("aria-labelledby", "driver-popover-title"), v.setAttribute("aria-describedby", "driver-popover-description");
  const w = i.arrow;
  w.className = "driver-popover-arrow";
  const E = ((t = e.popover) == null ? void 0 : t.popoverClass) || T("popoverClass") || "";
  v.className = `driver-popover ${E}`.trim(), Hs(
    i.wrapper,
    (D) => {
      var X, ye, bt;
      const ze = D.target, wt = ((X = e.popover) == null ? void 0 : X.onNextClick) || T("onNextClick"), Oe = ((ye = e.popover) == null ? void 0 : ye.onPrevClick) || T("onPrevClick"), Et = ((bt = e.popover) == null ? void 0 : bt.onCloseClick) || T("onCloseClick");
      if (ze.closest(".driver-popover-next-btn"))
        return wt ? wt(n, e, {
          config: T(),
          state: C(),
          driver: Q()
        }) : ke("nextClick");
      if (ze.closest(".driver-popover-prev-btn"))
        return Oe ? Oe(n, e, {
          config: T(),
          state: C(),
          driver: Q()
        }) : ke("prevClick");
      if (ze.closest(".driver-popover-close-btn"))
        return Et ? Et(n, e, {
          config: T(),
          state: C(),
          driver: Q()
        }) : ke("closeClick");
    },
    (D) => !(i != null && i.description.contains(D)) && !(i != null && i.title.contains(D)) && typeof D.className == "string" && D.className.includes("driver-popover")
  ), B("popover", i);
  const k = ((r = e.popover) == null ? void 0 : r.onPopoverRender) || T("onPopoverRender");
  k && k(i, {
    config: T(),
    state: C(),
    driver: Q()
  }), Js(n, e), Ws(v);
  const O = n.classList.contains("driver-dummy-element"), I = Us([v, ...O ? [] : [n]]);
  I.length > 0 && I[0].focus();
}
function Ys() {
  const n = C("popover");
  if (!(n != null && n.wrapper))
    return;
  const e = n.wrapper.getBoundingClientRect(), t = T("stagePadding") || 0, r = T("popoverOffset") || 0;
  return {
    width: e.width + t + r,
    height: e.height + t + r,
    realWidth: e.width,
    realHeight: e.height
  };
}
function pi(n, e) {
  const { elementDimensions: t, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: s } = e;
  return n === "start" ? Math.max(
    Math.min(
      t.top - i,
      window.innerHeight - r.realHeight - s.width
    ),
    s.width
  ) : n === "end" ? Math.max(
    Math.min(
      t.top - (r == null ? void 0 : r.realHeight) + t.height + i,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - s.width
    ),
    s.width
  ) : n === "center" ? Math.max(
    Math.min(
      t.top + t.height / 2 - (r == null ? void 0 : r.realHeight) / 2,
      window.innerHeight - (r == null ? void 0 : r.realHeight) - s.width
    ),
    s.width
  ) : 0;
}
function mi(n, e) {
  const { elementDimensions: t, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: s } = e;
  return n === "start" ? Math.max(
    Math.min(
      t.left - i,
      window.innerWidth - r.realWidth - s.width
    ),
    s.width
  ) : n === "end" ? Math.max(
    Math.min(
      t.left - (r == null ? void 0 : r.realWidth) + t.width + i,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - s.width
    ),
    s.width
  ) : n === "center" ? Math.max(
    Math.min(
      t.left + t.width / 2 - (r == null ? void 0 : r.realWidth) / 2,
      window.innerWidth - (r == null ? void 0 : r.realWidth) - s.width
    ),
    s.width
  ) : 0;
}
function Js(n, e) {
  const t = C("popover");
  if (!t)
    return;
  const { align: r = "start", side: i = "left" } = (e == null ? void 0 : e.popover) || {}, s = r, o = n.id === "driver-dummy-element" ? "over" : i, a = T("stagePadding") || 0, c = Ys(), l = t.arrow.getBoundingClientRect(), u = n.getBoundingClientRect(), d = u.top - c.height;
  let f = d >= 0;
  const h = window.innerHeight - (u.bottom + c.height);
  let p = h >= 0;
  const y = u.left - c.width;
  let m = y >= 0;
  const v = window.innerWidth - (u.right + c.width);
  let w = v >= 0;
  const E = !f && !p && !m && !w;
  let k = o;
  if (o === "top" && f ? w = m = p = !1 : o === "bottom" && p ? w = m = f = !1 : o === "left" && m ? w = f = p = !1 : o === "right" && w && (m = f = p = !1), o === "over") {
    const O = window.innerWidth / 2 - c.realWidth / 2, I = window.innerHeight / 2 - c.realHeight / 2;
    t.wrapper.style.left = `${O}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${I}px`, t.wrapper.style.bottom = "auto";
  } else if (E) {
    const O = window.innerWidth / 2 - (c == null ? void 0 : c.realWidth) / 2, I = 10;
    t.wrapper.style.left = `${O}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${I}px`, t.wrapper.style.top = "auto";
  } else if (m) {
    const O = Math.min(
      y,
      window.innerWidth - (c == null ? void 0 : c.realWidth) - l.width
    ), I = pi(s, {
      elementDimensions: u,
      popoverDimensions: c,
      popoverPadding: a,
      popoverArrowDimensions: l
    });
    t.wrapper.style.left = `${O}px`, t.wrapper.style.top = `${I}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", k = "left";
  } else if (w) {
    const O = Math.min(
      v,
      window.innerWidth - (c == null ? void 0 : c.realWidth) - l.width
    ), I = pi(s, {
      elementDimensions: u,
      popoverDimensions: c,
      popoverPadding: a,
      popoverArrowDimensions: l
    });
    t.wrapper.style.right = `${O}px`, t.wrapper.style.top = `${I}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", k = "right";
  } else if (f) {
    const O = Math.min(
      d,
      window.innerHeight - c.realHeight - l.width
    );
    let I = mi(s, {
      elementDimensions: u,
      popoverDimensions: c,
      popoverPadding: a,
      popoverArrowDimensions: l
    });
    t.wrapper.style.top = `${O}px`, t.wrapper.style.left = `${I}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", k = "top";
  } else if (p) {
    const O = Math.min(
      h,
      window.innerHeight - (c == null ? void 0 : c.realHeight) - l.width
    );
    let I = mi(s, {
      elementDimensions: u,
      popoverDimensions: c,
      popoverPadding: a,
      popoverArrowDimensions: l
    });
    t.wrapper.style.left = `${I}px`, t.wrapper.style.bottom = `${O}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", k = "bottom";
  }
  E ? t.arrow.classList.add("driver-popover-arrow-none") : xu(s, k, n);
}
function xu(n, e, t) {
  const r = C("popover");
  if (!r)
    return;
  const i = t.getBoundingClientRect(), s = Ys(), o = r.arrow, a = s.width, c = window.innerWidth, l = i.width, u = i.left, d = s.height, f = window.innerHeight, h = i.top, p = i.height;
  o.className = "driver-popover-arrow";
  let y = e, m = n;
  if (e === "top" ? (u + l <= 0 ? (y = "right", m = "end") : u + l - a <= 0 && (y = "top", m = "start"), u >= c ? (y = "left", m = "end") : u + a >= c && (y = "top", m = "end")) : e === "bottom" ? (u + l <= 0 ? (y = "right", m = "start") : u + l - a <= 0 && (y = "bottom", m = "start"), u >= c ? (y = "left", m = "start") : u + a >= c && (y = "bottom", m = "end")) : e === "left" ? (h + p <= 0 ? (y = "bottom", m = "end") : h + p - d <= 0 && (y = "left", m = "start"), h >= f ? (y = "top", m = "end") : h + d >= f && (y = "left", m = "end")) : e === "right" && (h + p <= 0 ? (y = "bottom", m = "start") : h + p - d <= 0 && (y = "right", m = "start"), h >= f ? (y = "top", m = "start") : h + d >= f && (y = "right", m = "end")), !y)
    o.classList.add("driver-popover-arrow-none");
  else {
    o.classList.add(`driver-popover-arrow-side-${y}`), o.classList.add(`driver-popover-arrow-align-${m}`);
    const v = t.getBoundingClientRect(), w = o.getBoundingClientRect(), E = T("stagePadding") || 0, k = v.left - E < window.innerWidth && v.right + E > 0 && v.top - E < window.innerHeight && v.bottom + E > 0;
    e === "bottom" && k && (w.x > v.x && w.x + w.width < v.x + v.width ? r.wrapper.style.transform = "translateY(0)" : (o.classList.remove(`driver-popover-arrow-align-${m}`), o.classList.add("driver-popover-arrow-none"), r.wrapper.style.transform = `translateY(-${E / 2}px)`));
  }
}
function Tu() {
  const n = document.createElement("div");
  n.classList.add("driver-popover");
  const e = document.createElement("div");
  e.classList.add("driver-popover-arrow");
  const t = document.createElement("header");
  t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
  const r = document.createElement("div");
  r.id = "driver-popover-description", r.classList.add("driver-popover-description"), r.style.display = "none", r.innerText = "Popover description is here";
  const i = document.createElement("button");
  i.type = "button", i.classList.add("driver-popover-close-btn"), i.setAttribute("aria-label", "Close"), i.innerHTML = "&times;";
  const s = document.createElement("footer");
  s.classList.add("driver-popover-footer");
  const o = document.createElement("span");
  o.classList.add("driver-popover-progress-text"), o.innerText = "";
  const a = document.createElement("span");
  a.classList.add("driver-popover-navigation-btns");
  const c = document.createElement("button");
  c.type = "button", c.classList.add("driver-popover-prev-btn"), c.innerHTML = "&larr; Previous";
  const l = document.createElement("button");
  return l.type = "button", l.classList.add("driver-popover-next-btn"), l.innerHTML = "Next &rarr;", a.appendChild(c), a.appendChild(l), s.appendChild(o), s.appendChild(a), n.appendChild(i), n.appendChild(e), n.appendChild(t), n.appendChild(r), n.appendChild(s), {
    wrapper: n,
    arrow: e,
    title: t,
    description: r,
    footer: s,
    previousButton: c,
    nextButton: l,
    closeButton: i,
    footerButtons: a,
    progress: o
  };
}
function Cu() {
  var n;
  const e = C("popover");
  e && ((n = e.wrapper.parentElement) == null || n.removeChild(e.wrapper));
}
function _u(n = {}) {
  On(n);
  function e() {
    T("allowClose") && u();
  }
  function t() {
    const f = T("overlayClickBehavior");
    if (T("allowClose") && f === "close") {
      u();
      return;
    }
    if (typeof f == "function") {
      const h = C("__activeStep"), p = C("__activeElement");
      f(p, h, {
        config: T(),
        state: C(),
        driver: Q()
      });
      return;
    }
    f === "nextStep" && r();
  }
  function r() {
    const f = C("activeIndex"), h = T("steps") || [];
    if (typeof f > "u")
      return;
    const p = f + 1;
    h[p] ? l(p) : u();
  }
  function i() {
    const f = C("activeIndex"), h = T("steps") || [];
    if (typeof f > "u")
      return;
    const p = f - 1;
    h[p] ? l(p) : u();
  }
  function s(f) {
    (T("steps") || [])[f] ? l(f) : u();
  }
  function o() {
    var f;
    if (C("__transitionCallback"))
      return;
    const h = C("activeIndex"), p = C("__activeStep"), y = C("__activeElement");
    if (typeof h > "u" || typeof p > "u" || typeof C("activeIndex") > "u")
      return;
    const m = ((f = p.popover) == null ? void 0 : f.onPrevClick) || T("onPrevClick");
    if (m)
      return m(y, p, {
        config: T(),
        state: C(),
        driver: Q()
      });
    i();
  }
  function a() {
    var f;
    if (C("__transitionCallback"))
      return;
    const h = C("activeIndex"), p = C("__activeStep"), y = C("__activeElement");
    if (typeof h > "u" || typeof p > "u")
      return;
    const m = ((f = p.popover) == null ? void 0 : f.onNextClick) || T("onNextClick");
    if (m)
      return m(y, p, {
        config: T(),
        state: C(),
        driver: Q()
      });
    r();
  }
  function c() {
    C("isInitialized") || (B("isInitialized", !0), document.body.classList.add("driver-active", T("animate") ? "driver-fade" : "driver-simple"), ku(), Ot("overlayClick", t), Ot("escapePress", e), Ot("arrowLeftPress", o), Ot("arrowRightPress", a));
  }
  function l(f = 0) {
    var h, p, y, m, v, w, E, k;
    const O = T("steps");
    if (!O) {
      console.error("No steps to drive through"), u();
      return;
    }
    if (!O[f]) {
      u();
      return;
    }
    B("__activeOnDestroyed", document.activeElement), B("activeIndex", f);
    const I = O[f], D = O[f + 1], X = O[f - 1], ye = ((h = I.popover) == null ? void 0 : h.doneBtnText) || T("doneBtnText") || "Done", bt = T("allowClose"), ze = typeof ((p = I.popover) == null ? void 0 : p.showProgress) < "u" ? (y = I.popover) == null ? void 0 : y.showProgress : T("showProgress"), wt = (((m = I.popover) == null ? void 0 : m.progressText) || T("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${f + 1}`).replace("{{total}}", `${O.length}`), Oe = ((v = I.popover) == null ? void 0 : v.showButtons) || T("showButtons"), Et = [
      "next",
      "previous",
      ...bt ? ["close"] : []
    ].filter((eo) => !(Oe != null && Oe.length) || Oe.includes(eo)), Ks = ((w = I.popover) == null ? void 0 : w.onNextClick) || T("onNextClick"), Xs = ((E = I.popover) == null ? void 0 : E.onPrevClick) || T("onPrevClick"), Zs = ((k = I.popover) == null ? void 0 : k.onCloseClick) || T("onCloseClick");
    hi({
      ...I,
      popover: {
        showButtons: Et,
        nextBtnText: D ? void 0 : ye,
        disableButtons: [...X ? [] : ["previous"]],
        showProgress: ze,
        progressText: wt,
        onNextClick: Ks || (() => {
          D ? l(f + 1) : u();
        }),
        onPrevClick: Xs || (() => {
          l(f - 1);
        }),
        onCloseClick: Zs || (() => {
          u();
        }),
        ...(I == null ? void 0 : I.popover) || {}
      }
    });
  }
  function u(f = !0) {
    const h = C("__activeElement"), p = C("__activeStep"), y = C("__activeOnDestroyed"), m = T("onDestroyStarted");
    if (f && m) {
      const E = !h || (h == null ? void 0 : h.id) === "driver-dummy-element";
      m(E ? void 0 : h, p, {
        config: T(),
        state: C(),
        driver: Q()
      });
      return;
    }
    const v = (p == null ? void 0 : p.onDeselected) || T("onDeselected"), w = T("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), Su(), Cu(), wu(), yu(), cu(), fi(), h && p) {
      const E = h.id === "driver-dummy-element";
      v && v(E ? void 0 : h, p, {
        config: T(),
        state: C(),
        driver: Q()
      }), w && w(E ? void 0 : h, p, {
        config: T(),
        state: C(),
        driver: Q()
      });
    }
    y && y.focus();
  }
  const d = {
    isActive: () => C("isInitialized") || !1,
    refresh: ht,
    drive: (f = 0) => {
      c(), l(f);
    },
    setConfig: On,
    setSteps: (f) => {
      fi(), On({
        ...T(),
        steps: f
      });
    },
    getConfig: T,
    getState: C,
    getActiveIndex: () => C("activeIndex"),
    isFirstStep: () => C("activeIndex") === 0,
    isLastStep: () => {
      const f = T("steps") || [], h = C("activeIndex");
      return h !== void 0 && h === f.length - 1;
    },
    getActiveStep: () => C("activeStep"),
    getActiveElement: () => C("activeElement"),
    getPreviousElement: () => C("previousElement"),
    getPreviousStep: () => C("previousStep"),
    moveNext: r,
    movePrevious: i,
    moveTo: s,
    hasNextStep: () => {
      const f = T("steps") || [], h = C("activeIndex");
      return h !== void 0 && !!f[h + 1];
    },
    hasPreviousStep: () => {
      const f = T("steps") || [], h = C("activeIndex");
      return h !== void 0 && !!f[h - 1];
    },
    highlight: (f) => {
      c(), hi({
        ...f,
        popover: f.popover ? {
          showButtons: [],
          showProgress: !1,
          progressText: "",
          ...f.popover
        } : void 0
      });
    },
    destroy: () => {
      u(!1);
    }
  };
  return au(d), d;
}
function Nu() {
  const { client: n, config: e } = Bs(), [t, r] = ue([]), [i, s] = ue(!0), [o, a] = ue(null), [c, l] = ue(null), u = gi(null), d = e.userId || "", f = Xe(async () => {
    if (d)
      try {
        s(!0), a(null);
        const y = await n.getAssignedGuides(d, e.schoolYear);
        r(y);
      } catch (y) {
        a(y instanceof Error ? y : new Error("Failed to fetch guides"));
      } finally {
        s(!1);
      }
  }, [n, d, e.schoolYear]);
  Pt(() => {
    f();
  }, [f]), Pt(() => () => {
    u.current && u.current.destroy();
  }, []);
  const h = Xe((y) => {
    const m = t.find((E) => E.id === y);
    if (!m) return;
    l(m);
    const v = m.steps.sort((E, k) => E.stepOrder - k.stepOrder).map((E) => ({
      element: E.elementSelector || void 0,
      popover: {
        title: E.title,
        description: E.description,
        side: E.side
      }
    }));
    u.current && u.current.destroy();
    const w = _u({
      showProgress: !0,
      steps: v,
      onDestroyed: () => {
        l(null), n.recordGuideCompletion(d, y).then(() => {
          r((E) => E.filter((k) => k.id !== y));
        });
      }
    });
    u.current = w, w.drive();
  }, [t, n, d]), p = Xe(async (y) => {
    d && (await n.recordGuideCompletion(d, y), r((m) => m.filter((v) => v.id !== y)));
  }, [n, d]);
  return {
    guides: t,
    isLoading: i,
    error: o,
    startGuide: h,
    dismissGuide: p,
    activeGuide: c,
    refresh: f
  };
}
function Iu({ handbook: n, onAcknowledge: e, isAcknowledging: t }) {
  return /* @__PURE__ */ q("div", { className: "guideops-modal-overlay", children: /* @__PURE__ */ xn("div", { className: "guideops-modal", children: [
    /* @__PURE__ */ xn("div", { className: "guideops-modal-header", children: [
      /* @__PURE__ */ q("h2", { className: "guideops-modal-title", children: n.title }),
      /* @__PURE__ */ q("p", { className: "guideops-modal-subtitle", children: "Please read and acknowledge the following before continuing." })
    ] }),
    /* @__PURE__ */ q("div", { className: "guideops-modal-content", children: n.contentUrl ? /* @__PURE__ */ q(
      "iframe",
      {
        src: n.contentUrl,
        title: n.title,
        className: "guideops-modal-iframe"
      }
    ) : n.contentHtml ? /* @__PURE__ */ q(
      "div",
      {
        className: "guideops-modal-html",
        dangerouslySetInnerHTML: { __html: n.contentHtml }
      }
    ) : /* @__PURE__ */ q("p", { className: "guideops-modal-empty", children: "No content available for this handbook." }) }),
    /* @__PURE__ */ q("div", { className: "guideops-modal-footer", children: /* @__PURE__ */ q(
      "button",
      {
        onClick: e,
        disabled: t,
        className: "guideops-acknowledge-btn",
        children: t ? "Processing..." : "I Acknowledge"
      }
    ) })
  ] }) });
}
function Vu({ children: n, fallback: e, loadingComponent: t }) {
  const { pendingHandbooks: r, isLoading: i, acknowledge: s, hasAllAcknowledged: o } = ou(), [a, c] = ue(!1);
  if (i)
    return /* @__PURE__ */ q(rn, { children: t || e || /* @__PURE__ */ q(Au, {}) });
  if (o)
    return /* @__PURE__ */ q(rn, { children: n });
  const l = r[0];
  return l ? /* @__PURE__ */ q(
    Iu,
    {
      handbook: l,
      onAcknowledge: async () => {
        c(!0);
        try {
          await s(l.id);
        } finally {
          c(!1);
        }
      },
      isAcknowledging: a
    }
  ) : /* @__PURE__ */ q(rn, { children: n });
}
function Au() {
  return /* @__PURE__ */ xn("div", { className: "guideops-loading", children: [
    /* @__PURE__ */ q("div", { className: "guideops-spinner" }),
    /* @__PURE__ */ q("p", { children: "Loading..." })
  ] });
}
function Bu({ autoStart: n = !1 }) {
  const { guides: e, startGuide: t, activeGuide: r } = Nu(), i = gi(!1);
  return Pt(() => {
    if (n && e.length > 0 && !r && !i.current) {
      i.current = !0;
      const s = setTimeout(() => {
        t(e[0].id);
      }, 500);
      return () => clearTimeout(s);
    }
  }, [n, e, r, t]), null;
}
export {
  ju as GuideOpsProvider,
  Bu as GuideRenderer,
  Vu as HandbookGate,
  Iu as HandbookModal,
  Nu as useGuides,
  ou as useHandbookAcknowledgment
};
