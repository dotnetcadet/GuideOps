var bo = Object.defineProperty;
var wo = (n, e, t) => e in n ? bo(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var g = (n, e, t) => wo(n, typeof e != "symbol" ? e + "" : e, t);
import { jsx as U, jsxs as In, Fragment as on } from "react/jsx-runtime";
import * as P from "react";
import { useMemo as Ni, createContext as Eo, useContext as ko, useState as fe, useCallback as nt, useEffect as Mt, useRef as Ai } from "react";
function _t(n, e) {
  if (!!!n)
    throw new Error(e);
}
function So(n) {
  return typeof n == "object" && n !== null;
}
function Oo(n, e) {
  if (!!!n)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const xo = /\r\n|[\n\r]/g;
function Nn(n, e) {
  let t = 0, r = 1;
  for (const i of n.body.matchAll(xo)) {
    if (typeof i.index == "number" || Oo(!1), i.index >= e)
      break;
    t = i.index + i[0].length, r += 1;
  }
  return {
    line: r,
    column: e + 1 - t
  };
}
function Co(n) {
  return Di(
    n.source,
    Nn(n.source, n.start)
  );
}
function Di(n, e) {
  const t = n.locationOffset.column - 1, r = "".padStart(t) + n.body, i = e.line - 1, s = n.locationOffset.line - 1, o = e.line + s, c = e.line === 1 ? t : 0, a = e.column + c, u = `${n.name}:${o}:${a}
`, l = r.split(/\r\n|[\n\r]/g), d = l[i];
  if (d.length > 120) {
    const f = Math.floor(a / 80), h = a % 80, p = [];
    for (let y = 0; y < d.length; y += 80)
      p.push(d.slice(y, y + 80));
    return u + kr([
      [`${o} |`, p[0]],
      ...p.slice(1, f + 1).map((y) => ["|", y]),
      ["|", "^".padStart(h)],
      ["|", p[f + 1]]
    ]);
  }
  return u + kr([
    // Lines specified like this: ["prefix", "string"],
    [`${o - 1} |`, l[i - 1]],
    [`${o} |`, d],
    ["|", "^".padStart(a)],
    [`${o + 1} |`, l[i + 1]]
  ]);
}
function kr(n) {
  const e = n.filter(([r, i]) => i !== void 0), t = Math.max(...e.map(([r]) => r.length));
  return e.map(([r, i]) => r.padStart(t) + (i ? " " + i : "")).join(`
`);
}
function To(n) {
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
class Jn extends Error {
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
    const { nodes: o, source: c, positions: a, path: u, originalError: l, extensions: d } = To(t);
    super(e), this.name = "GraphQLError", this.path = u ?? void 0, this.originalError = l ?? void 0, this.nodes = Sr(
      Array.isArray(o) ? o : o ? [o] : void 0
    );
    const f = Sr(
      (r = this.nodes) === null || r === void 0 ? void 0 : r.map((p) => p.loc).filter((p) => p != null)
    );
    this.source = c ?? (f == null || (i = f[0]) === null || i === void 0 ? void 0 : i.source), this.positions = a ?? (f == null ? void 0 : f.map((p) => p.start)), this.locations = a && c ? a.map((p) => Nn(c, p)) : f == null ? void 0 : f.map((p) => Nn(p.source, p.start));
    const h = So(
      l == null ? void 0 : l.extensions
    ) ? l == null ? void 0 : l.extensions : void 0;
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
    }), l != null && l.stack ? Object.defineProperty(this, "stack", {
      value: l.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Jn) : Object.defineProperty(this, "stack", {
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

` + Co(t.loc));
    else if (this.source && this.locations)
      for (const t of this.locations)
        e += `

` + Di(this.source, t);
    return e;
  }
  toJSON() {
    const e = {
      message: this.message
    };
    return this.locations != null && (e.locations = this.locations), this.path != null && (e.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (e.extensions = this.extensions), e;
  }
}
function Sr(n) {
  return n === void 0 || n.length === 0 ? void 0 : n;
}
function V(n, e, t) {
  return new Jn(`Syntax Error: ${t}`, {
    source: n,
    positions: [e]
  });
}
class _o {
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
class Ri {
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
const Fi = {
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
}, Io = new Set(Object.keys(Fi));
function Or(n) {
  const e = n == null ? void 0 : n.kind;
  return typeof e == "string" && Io.has(e);
}
var Z;
(function(n) {
  n.QUERY = "query", n.MUTATION = "mutation", n.SUBSCRIPTION = "subscription";
})(Z || (Z = {}));
var An;
(function(n) {
  n.QUERY = "QUERY", n.MUTATION = "MUTATION", n.SUBSCRIPTION = "SUBSCRIPTION", n.FIELD = "FIELD", n.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", n.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", n.INLINE_FRAGMENT = "INLINE_FRAGMENT", n.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", n.SCHEMA = "SCHEMA", n.SCALAR = "SCALAR", n.OBJECT = "OBJECT", n.FIELD_DEFINITION = "FIELD_DEFINITION", n.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", n.INTERFACE = "INTERFACE", n.UNION = "UNION", n.ENUM = "ENUM", n.ENUM_VALUE = "ENUM_VALUE", n.INPUT_OBJECT = "INPUT_OBJECT", n.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(An || (An = {}));
var S;
(function(n) {
  n.NAME = "Name", n.DOCUMENT = "Document", n.OPERATION_DEFINITION = "OperationDefinition", n.VARIABLE_DEFINITION = "VariableDefinition", n.SELECTION_SET = "SelectionSet", n.FIELD = "Field", n.ARGUMENT = "Argument", n.FRAGMENT_SPREAD = "FragmentSpread", n.INLINE_FRAGMENT = "InlineFragment", n.FRAGMENT_DEFINITION = "FragmentDefinition", n.VARIABLE = "Variable", n.INT = "IntValue", n.FLOAT = "FloatValue", n.STRING = "StringValue", n.BOOLEAN = "BooleanValue", n.NULL = "NullValue", n.ENUM = "EnumValue", n.LIST = "ListValue", n.OBJECT = "ObjectValue", n.OBJECT_FIELD = "ObjectField", n.DIRECTIVE = "Directive", n.NAMED_TYPE = "NamedType", n.LIST_TYPE = "ListType", n.NON_NULL_TYPE = "NonNullType", n.SCHEMA_DEFINITION = "SchemaDefinition", n.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", n.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", n.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", n.FIELD_DEFINITION = "FieldDefinition", n.INPUT_VALUE_DEFINITION = "InputValueDefinition", n.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", n.UNION_TYPE_DEFINITION = "UnionTypeDefinition", n.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", n.ENUM_VALUE_DEFINITION = "EnumValueDefinition", n.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", n.DIRECTIVE_DEFINITION = "DirectiveDefinition", n.SCHEMA_EXTENSION = "SchemaExtension", n.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", n.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", n.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", n.UNION_TYPE_EXTENSION = "UnionTypeExtension", n.ENUM_TYPE_EXTENSION = "EnumTypeExtension", n.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension", n.TYPE_COORDINATE = "TypeCoordinate", n.MEMBER_COORDINATE = "MemberCoordinate", n.ARGUMENT_COORDINATE = "ArgumentCoordinate", n.DIRECTIVE_COORDINATE = "DirectiveCoordinate", n.DIRECTIVE_ARGUMENT_COORDINATE = "DirectiveArgumentCoordinate";
})(S || (S = {}));
function Dn(n) {
  return n === 9 || n === 32;
}
function at(n) {
  return n >= 48 && n <= 57;
}
function Pi(n) {
  return n >= 97 && n <= 122 || // A-Z
  n >= 65 && n <= 90;
}
function Mi(n) {
  return Pi(n) || n === 95;
}
function No(n) {
  return Pi(n) || at(n) || n === 95;
}
function Ao(n) {
  var e;
  let t = Number.MAX_SAFE_INTEGER, r = null, i = -1;
  for (let o = 0; o < n.length; ++o) {
    var s;
    const c = n[o], a = Do(c);
    a !== c.length && (r = (s = r) !== null && s !== void 0 ? s : o, i = o, o !== 0 && a < t && (t = a));
  }
  return n.map((o, c) => c === 0 ? o : o.slice(t)).slice(
    (e = r) !== null && e !== void 0 ? e : 0,
    i + 1
  );
}
function Do(n) {
  let e = 0;
  for (; e < n.length && Dn(n.charCodeAt(e)); )
    ++e;
  return e;
}
function Ro(n, e) {
  const t = n.replace(/"""/g, '\\"""'), r = t.split(/\r\n|[\n\r]/g), i = r.length === 1, s = r.length > 1 && r.slice(1).every((h) => h.length === 0 || Dn(h.charCodeAt(0))), o = t.endsWith('\\"""'), c = n.endsWith('"') && !o, a = n.endsWith("\\"), u = c || a, l = (
    // add leading and trailing new lines only if it improves readability
    !i || n.length > 70 || u || s || o
  );
  let d = "";
  const f = i && Dn(n.charCodeAt(0));
  return (l && !f || s) && (d += `
`), d += t, (l || u) && (d += `
`), '"""' + d + '"""';
}
var w;
(function(n) {
  n.SOF = "<SOF>", n.EOF = "<EOF>", n.BANG = "!", n.DOLLAR = "$", n.AMP = "&", n.PAREN_L = "(", n.PAREN_R = ")", n.DOT = ".", n.SPREAD = "...", n.COLON = ":", n.EQUALS = "=", n.AT = "@", n.BRACKET_L = "[", n.BRACKET_R = "]", n.BRACE_L = "{", n.PIPE = "|", n.BRACE_R = "}", n.NAME = "Name", n.INT = "Int", n.FLOAT = "Float", n.STRING = "String", n.BLOCK_STRING = "BlockString", n.COMMENT = "Comment";
})(w || (w = {}));
class Fo {
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
    const t = new Ri(w.SOF, 0, 0, 0, 0);
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
    if (e.kind !== w.EOF)
      do
        if (e.next)
          e = e.next;
        else {
          const t = Mo(this, e.end);
          e.next = t, t.prev = e, e = t;
        }
      while (e.kind === w.COMMENT);
    return e;
  }
}
function Po(n) {
  return n === w.BANG || n === w.DOLLAR || n === w.AMP || n === w.PAREN_L || n === w.PAREN_R || n === w.DOT || n === w.SPREAD || n === w.COLON || n === w.EQUALS || n === w.AT || n === w.BRACKET_L || n === w.BRACKET_R || n === w.BRACE_L || n === w.PIPE || n === w.BRACE_R;
}
function ze(n) {
  return n >= 0 && n <= 55295 || n >= 57344 && n <= 1114111;
}
function Ht(n, e) {
  return Li(n.charCodeAt(e)) && ji(n.charCodeAt(e + 1));
}
function Li(n) {
  return n >= 55296 && n <= 56319;
}
function ji(n) {
  return n >= 56320 && n <= 57343;
}
function Oe(n, e) {
  const t = n.source.body.codePointAt(e);
  if (t === void 0)
    return w.EOF;
  if (t >= 32 && t <= 126) {
    const r = String.fromCodePoint(t);
    return r === '"' ? `'"'` : `"${r}"`;
  }
  return "U+" + t.toString(16).toUpperCase().padStart(4, "0");
}
function j(n, e, t, r, i) {
  const s = n.line, o = 1 + t - n.lineStart;
  return new Ri(e, t, r, s, o, i);
}
function Mo(n, e) {
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
        return Lo(n, i);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return j(n, w.BANG, i, i + 1);
      case 36:
        return j(n, w.DOLLAR, i, i + 1);
      case 38:
        return j(n, w.AMP, i, i + 1);
      case 40:
        return j(n, w.PAREN_L, i, i + 1);
      case 41:
        return j(n, w.PAREN_R, i, i + 1);
      case 46:
        if (t.charCodeAt(i + 1) === 46 && t.charCodeAt(i + 2) === 46)
          return j(n, w.SPREAD, i, i + 3);
        break;
      case 58:
        return j(n, w.COLON, i, i + 1);
      case 61:
        return j(n, w.EQUALS, i, i + 1);
      case 64:
        return j(n, w.AT, i, i + 1);
      case 91:
        return j(n, w.BRACKET_L, i, i + 1);
      case 93:
        return j(n, w.BRACKET_R, i, i + 1);
      case 123:
        return j(n, w.BRACE_L, i, i + 1);
      case 124:
        return j(n, w.PIPE, i, i + 1);
      case 125:
        return j(n, w.BRACE_R, i, i + 1);
      // StringValue
      case 34:
        return t.charCodeAt(i + 1) === 34 && t.charCodeAt(i + 2) === 34 ? Wo(n, i) : Vo(n, i);
    }
    if (at(s) || s === 45)
      return jo(n, i, s);
    if (Mi(s))
      return zo(n, i);
    throw V(
      n.source,
      i,
      s === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : ze(s) || Ht(t, i) ? `Unexpected character: ${Oe(n, i)}.` : `Invalid character: ${Oe(n, i)}.`
    );
  }
  return j(n, w.EOF, r, r);
}
function Lo(n, e) {
  const t = n.source.body, r = t.length;
  let i = e + 1;
  for (; i < r; ) {
    const s = t.charCodeAt(i);
    if (s === 10 || s === 13)
      break;
    if (ze(s))
      ++i;
    else if (Ht(t, i))
      i += 2;
    else
      break;
  }
  return j(
    n,
    w.COMMENT,
    e,
    i,
    t.slice(e + 1, i)
  );
}
function jo(n, e, t) {
  const r = n.source.body;
  let i = e, s = t, o = !1;
  if (s === 45 && (s = r.charCodeAt(++i)), s === 48) {
    if (s = r.charCodeAt(++i), at(s))
      throw V(
        n.source,
        i,
        `Invalid number, unexpected digit after 0: ${Oe(
          n,
          i
        )}.`
      );
  } else
    i = an(n, i, s), s = r.charCodeAt(i);
  if (s === 46 && (o = !0, s = r.charCodeAt(++i), i = an(n, i, s), s = r.charCodeAt(i)), (s === 69 || s === 101) && (o = !0, s = r.charCodeAt(++i), (s === 43 || s === 45) && (s = r.charCodeAt(++i)), i = an(n, i, s), s = r.charCodeAt(i)), s === 46 || Mi(s))
    throw V(
      n.source,
      i,
      `Invalid number, expected digit but got: ${Oe(
        n,
        i
      )}.`
    );
  return j(
    n,
    o ? w.FLOAT : w.INT,
    e,
    i,
    r.slice(e, i)
  );
}
function an(n, e, t) {
  if (!at(t))
    throw V(
      n.source,
      e,
      `Invalid number, expected digit but got: ${Oe(
        n,
        e
      )}.`
    );
  const r = n.source.body;
  let i = e + 1;
  for (; at(r.charCodeAt(i)); )
    ++i;
  return i;
}
function Vo(n, e) {
  const t = n.source.body, r = t.length;
  let i = e + 1, s = i, o = "";
  for (; i < r; ) {
    const c = t.charCodeAt(i);
    if (c === 34)
      return o += t.slice(s, i), j(n, w.STRING, e, i + 1, o);
    if (c === 92) {
      o += t.slice(s, i);
      const a = t.charCodeAt(i + 1) === 117 ? t.charCodeAt(i + 2) === 123 ? Bo(n, i) : qo(n, i) : Uo(n, i);
      o += a.value, i += a.size, s = i;
      continue;
    }
    if (c === 10 || c === 13)
      break;
    if (ze(c))
      ++i;
    else if (Ht(t, i))
      i += 2;
    else
      throw V(
        n.source,
        i,
        `Invalid character within String: ${Oe(
          n,
          i
        )}.`
      );
  }
  throw V(n.source, i, "Unterminated string.");
}
function Bo(n, e) {
  const t = n.source.body;
  let r = 0, i = 3;
  for (; i < 12; ) {
    const s = t.charCodeAt(e + i++);
    if (s === 125) {
      if (i < 5 || !ze(r))
        break;
      return {
        value: String.fromCodePoint(r),
        size: i
      };
    }
    if (r = r << 4 | Xe(s), r < 0)
      break;
  }
  throw V(
    n.source,
    e,
    `Invalid Unicode escape sequence: "${t.slice(
      e,
      e + i
    )}".`
  );
}
function qo(n, e) {
  const t = n.source.body, r = xr(t, e + 2);
  if (ze(r))
    return {
      value: String.fromCodePoint(r),
      size: 6
    };
  if (Li(r) && t.charCodeAt(e + 6) === 92 && t.charCodeAt(e + 7) === 117) {
    const i = xr(t, e + 8);
    if (ji(i))
      return {
        value: String.fromCodePoint(r, i),
        size: 12
      };
  }
  throw V(
    n.source,
    e,
    `Invalid Unicode escape sequence: "${t.slice(e, e + 6)}".`
  );
}
function xr(n, e) {
  return Xe(n.charCodeAt(e)) << 12 | Xe(n.charCodeAt(e + 1)) << 8 | Xe(n.charCodeAt(e + 2)) << 4 | Xe(n.charCodeAt(e + 3));
}
function Xe(n) {
  return n >= 48 && n <= 57 ? n - 48 : n >= 65 && n <= 70 ? n - 55 : n >= 97 && n <= 102 ? n - 87 : -1;
}
function Uo(n, e) {
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
  throw V(
    n.source,
    e,
    `Invalid character escape sequence: "${t.slice(
      e,
      e + 2
    )}".`
  );
}
function Wo(n, e) {
  const t = n.source.body, r = t.length;
  let i = n.lineStart, s = e + 3, o = s, c = "";
  const a = [];
  for (; s < r; ) {
    const u = t.charCodeAt(s);
    if (u === 34 && t.charCodeAt(s + 1) === 34 && t.charCodeAt(s + 2) === 34) {
      c += t.slice(o, s), a.push(c);
      const l = j(
        n,
        w.BLOCK_STRING,
        e,
        s + 3,
        // Return a string of the lines joined with U+000A.
        Ao(a).join(`
`)
      );
      return n.line += a.length - 1, n.lineStart = i, l;
    }
    if (u === 92 && t.charCodeAt(s + 1) === 34 && t.charCodeAt(s + 2) === 34 && t.charCodeAt(s + 3) === 34) {
      c += t.slice(o, s), o = s + 1, s += 4;
      continue;
    }
    if (u === 10 || u === 13) {
      c += t.slice(o, s), a.push(c), u === 13 && t.charCodeAt(s + 1) === 10 ? s += 2 : ++s, c = "", o = s, i = s;
      continue;
    }
    if (ze(u))
      ++s;
    else if (Ht(t, s))
      s += 2;
    else
      throw V(
        n.source,
        s,
        `Invalid character within String: ${Oe(
          n,
          s
        )}.`
      );
  }
  throw V(n.source, s, "Unterminated string.");
}
function zo(n, e) {
  const t = n.source.body, r = t.length;
  let i = e + 1;
  for (; i < r; ) {
    const s = t.charCodeAt(i);
    if (No(s))
      ++i;
    else
      break;
  }
  return j(
    n,
    w.NAME,
    e,
    i,
    t.slice(e, i)
  );
}
const $o = 10, Vi = 2;
function Kn(n) {
  return Gt(n, []);
}
function Gt(n, e) {
  switch (typeof n) {
    case "string":
      return JSON.stringify(n);
    case "function":
      return n.name ? `[function ${n.name}]` : "[function]";
    case "object":
      return Qo(n, e);
    default:
      return String(n);
  }
}
function Qo(n, e) {
  if (n === null)
    return "null";
  if (e.includes(n))
    return "[Circular]";
  const t = [...e, n];
  if (Ho(n)) {
    const r = n.toJSON();
    if (r !== n)
      return typeof r == "string" ? r : Gt(r, t);
  } else if (Array.isArray(n))
    return Yo(n, t);
  return Go(n, t);
}
function Ho(n) {
  return typeof n.toJSON == "function";
}
function Go(n, e) {
  const t = Object.entries(n);
  return t.length === 0 ? "{}" : e.length > Vi ? "[" + Jo(n) + "]" : "{ " + t.map(
    ([i, s]) => i + ": " + Gt(s, e)
  ).join(", ") + " }";
}
function Yo(n, e) {
  if (n.length === 0)
    return "[]";
  if (e.length > Vi)
    return "[Array]";
  const t = Math.min($o, n.length), r = n.length - t, i = [];
  for (let s = 0; s < t; ++s)
    i.push(Gt(n[s], e));
  return r === 1 ? i.push("... 1 more item") : r > 1 && i.push(`... ${r} more items`), "[" + i.join(", ") + "]";
}
function Jo(n) {
  const e = Object.prototype.toString.call(n).replace(/^\[object /, "").replace(/]$/, "");
  if (e === "Object" && typeof n.constructor == "function") {
    const t = n.constructor.name;
    if (typeof t == "string" && t !== "")
      return t;
  }
  return e;
}
const Ko = globalThis.process && // eslint-disable-next-line no-undef
process.env.NODE_ENV === "production", Xo = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  Ko ? function(e, t) {
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
        const o = Kn(e);
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
class Bi {
  constructor(e, t = "GraphQL request", r = {
    line: 1,
    column: 1
  }) {
    typeof e == "string" || _t(!1, `Body must be a string. Received: ${Kn(e)}.`), this.body = e, this.name = t, this.locationOffset = r, this.locationOffset.line > 0 || _t(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || _t(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function Zo(n) {
  return Xo(n, Bi);
}
function ea(n, e) {
  const t = new ta(n, e), r = t.parseDocument();
  return Object.defineProperty(r, "tokenCount", {
    enumerable: !1,
    value: t.tokenCount
  }), r;
}
class ta {
  constructor(e, t = {}) {
    const { lexer: r, ...i } = t;
    if (r)
      this._lexer = r;
    else {
      const s = Zo(e) ? e : new Bi(e);
      this._lexer = new Fo(s);
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
    const e = this.expectToken(w.NAME);
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
        w.SOF,
        this.parseDefinition,
        w.EOF
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
    if (this.peek(w.BRACE_L))
      return this.parseOperationDefinition();
    const e = this.peekDescription(), t = e ? this._lexer.lookahead() : this._lexer.token;
    if (e && t.kind === w.BRACE_L)
      throw V(
        this._lexer.source,
        this._lexer.token.start,
        "Unexpected description, descriptions are not supported on shorthand queries."
      );
    if (t.kind === w.NAME) {
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
        throw V(
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
    if (this.peek(w.BRACE_L))
      return this.node(e, {
        kind: S.OPERATION_DEFINITION,
        operation: Z.QUERY,
        description: void 0,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const t = this.parseDescription(), r = this.parseOperationType();
    let i;
    return this.peek(w.NAME) && (i = this.parseName()), this.node(e, {
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
    const e = this.expectToken(w.NAME);
    switch (e.value) {
      case "query":
        return Z.QUERY;
      case "mutation":
        return Z.MUTATION;
      case "subscription":
        return Z.SUBSCRIPTION;
    }
    throw this.unexpected(e);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      w.PAREN_L,
      this.parseVariableDefinition,
      w.PAREN_R
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
      type: (this.expectToken(w.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(w.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const e = this._lexer.token;
    return this.expectToken(w.DOLLAR), this.node(e, {
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
        w.BRACE_L,
        this.parseSelection,
        w.BRACE_R
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
    return this.peek(w.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const e = this._lexer.token, t = this.parseName();
    let r, i;
    return this.expectOptionalToken(w.COLON) ? (r = t, i = this.parseName()) : i = t, this.node(e, {
      kind: S.FIELD,
      alias: r,
      name: i,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(w.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(e) {
    const t = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(w.PAREN_L, t, w.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(e = !1) {
    const t = this._lexer.token, r = this.parseName();
    return this.expectToken(w.COLON), this.node(t, {
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
    this.expectToken(w.SPREAD);
    const t = this.expectOptionalKeyword("on");
    return !t && this.peek(w.NAME) ? this.node(e, {
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
      case w.BRACKET_L:
        return this.parseList(e);
      case w.BRACE_L:
        return this.parseObject(e);
      case w.INT:
        return this.advanceLexer(), this.node(t, {
          kind: S.INT,
          value: t.value
        });
      case w.FLOAT:
        return this.advanceLexer(), this.node(t, {
          kind: S.FLOAT,
          value: t.value
        });
      case w.STRING:
      case w.BLOCK_STRING:
        return this.parseStringLiteral();
      case w.NAME:
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
      case w.DOLLAR:
        if (e)
          if (this.expectToken(w.DOLLAR), this._lexer.token.kind === w.NAME) {
            const r = this._lexer.token.value;
            throw V(
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
      block: e.kind === w.BLOCK_STRING
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
      values: this.any(w.BRACKET_L, t, w.BRACKET_R)
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
      fields: this.any(w.BRACE_L, t, w.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(e) {
    const t = this._lexer.token, r = this.parseName();
    return this.expectToken(w.COLON), this.node(t, {
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
    for (; this.peek(w.AT); )
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
    return this.expectToken(w.AT), this.node(t, {
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
    if (this.expectOptionalToken(w.BRACKET_L)) {
      const r = this.parseTypeReference();
      this.expectToken(w.BRACKET_R), t = this.node(e, {
        kind: S.LIST_TYPE,
        type: r
      });
    } else
      t = this.parseNamedType();
    return this.expectOptionalToken(w.BANG) ? this.node(e, {
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
    return this.peek(w.STRING) || this.peek(w.BLOCK_STRING);
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
      w.BRACE_L,
      this.parseOperationTypeDefinition,
      w.BRACE_R
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
    this.expectToken(w.COLON);
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
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(w.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      w.BRACE_L,
      this.parseFieldDefinition,
      w.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const e = this._lexer.token, t = this.parseDescription(), r = this.parseName(), i = this.parseArgumentDefs();
    this.expectToken(w.COLON);
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
      w.PAREN_L,
      this.parseInputValueDef,
      w.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const e = this._lexer.token, t = this.parseDescription(), r = this.parseName();
    this.expectToken(w.COLON);
    const i = this.parseTypeReference();
    let s;
    this.expectOptionalToken(w.EQUALS) && (s = this.parseConstValueLiteral());
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
    return this.expectOptionalToken(w.EQUALS) ? this.delimitedMany(w.PIPE, this.parseNamedType) : [];
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
      w.BRACE_L,
      this.parseEnumValueDefinition,
      w.BRACE_R
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
      throw V(
        this._lexer.source,
        this._lexer.token.start,
        `${Ot(
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
      w.BRACE_L,
      this.parseInputValueDef,
      w.BRACE_R
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
    if (e.kind === w.NAME)
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
      w.BRACE_L,
      this.parseOperationTypeDefinition,
      w.BRACE_R
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
    this.expectKeyword("directive"), this.expectToken(w.AT);
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
    return this.delimitedMany(w.PIPE, this.parseDirectiveLocation);
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
    if (Object.prototype.hasOwnProperty.call(An, t.value))
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
    const e = this._lexer.token, t = this.expectOptionalToken(w.AT), r = this.parseName();
    let i;
    !t && this.expectOptionalToken(w.DOT) && (i = this.parseName());
    let s;
    return (t || i) && this.expectOptionalToken(w.PAREN_L) && (s = this.parseName(), this.expectToken(w.COLON), this.expectToken(w.PAREN_R)), t ? s ? this.node(e, {
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
    return this._options.noLocation !== !0 && (t.loc = new _o(
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
    throw V(
      this._lexer.source,
      t.start,
      `Expected ${qi(e)}, found ${Ot(t)}.`
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
    if (t.kind === w.NAME && t.value === e)
      this.advanceLexer();
    else
      throw V(
        this._lexer.source,
        t.start,
        `Expected "${e}", found ${Ot(t)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(e) {
    const t = this._lexer.token;
    return t.kind === w.NAME && t.value === e ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(e) {
    const t = e ?? this._lexer.token;
    return V(
      this._lexer.source,
      t.start,
      `Unexpected ${Ot(t)}.`
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
    if (t.kind !== w.EOF && (++this._tokenCounter, e !== void 0 && this._tokenCounter > e))
      throw V(
        this._lexer.source,
        t.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
}
function Ot(n) {
  const e = n.value;
  return qi(n.kind) + (e != null ? ` "${e}"` : "");
}
function qi(n) {
  return Po(n) ? `"${n}"` : n;
}
function na(n) {
  return `"${n.replace(ra, ia)}"`;
}
const ra = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function ia(n) {
  return sa[n.charCodeAt(0)];
}
const sa = [
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
], Xn = Object.freeze({});
function re(n, e, t = Fi) {
  const r = /* @__PURE__ */ new Map();
  for (const v of Object.values(S))
    r.set(v, oa(e, v));
  let i, s = Array.isArray(n), o = [n], c = -1, a = [], u = n, l, d;
  const f = [], h = [];
  do {
    c++;
    const v = c === o.length, b = v && a.length !== 0;
    if (v) {
      if (l = h.length === 0 ? void 0 : f[f.length - 1], u = d, d = h.pop(), b)
        if (s) {
          u = u.slice();
          let k = 0;
          for (const [O, I] of a) {
            const R = O - k;
            I === null ? (u.splice(R, 1), k++) : u[R] = I;
          }
        } else {
          u = { ...u };
          for (const [k, O] of a)
            u[k] = O;
        }
      c = i.index, o = i.keys, a = i.edits, s = i.inArray, i = i.prev;
    } else if (d) {
      if (l = s ? c : o[c], u = d[l], u == null)
        continue;
      f.push(l);
    }
    let E;
    if (!Array.isArray(u)) {
      var p, y;
      Or(u) || _t(!1, `Invalid AST Node: ${Kn(u)}.`);
      const k = v ? (p = r.get(u.kind)) === null || p === void 0 ? void 0 : p.leave : (y = r.get(u.kind)) === null || y === void 0 ? void 0 : y.enter;
      if (E = k == null ? void 0 : k.call(e, u, l, d, f, h), E === Xn)
        break;
      if (E === !1) {
        if (!v) {
          f.pop();
          continue;
        }
      } else if (E !== void 0 && (a.push([l, E]), !v))
        if (Or(E))
          u = E;
        else {
          f.pop();
          continue;
        }
    }
    if (E === void 0 && b && a.push([l, u]), v)
      f.pop();
    else {
      var m;
      i = {
        inArray: s,
        index: c,
        keys: o,
        edits: a,
        prev: i
      }, s = Array.isArray(u), o = s ? u : (m = t[u.kind]) !== null && m !== void 0 ? m : [], c = -1, a = [], d && h.push(d), d = u;
    }
  } while (i !== void 0);
  return a.length !== 0 ? a[a.length - 1][1] : n;
}
function oa(n, e) {
  const t = n[e];
  return typeof t == "object" ? t : typeof t == "function" ? {
    enter: t,
    leave: void 0
  } : {
    enter: n.enter,
    leave: n.leave
  };
}
function aa(n) {
  return re(n, ua);
}
const ca = 80, ua = {
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
      const e = cn(n.variableDefinitions) ? N(`(
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
    leave: ({ selections: n }) => K(n)
  },
  Field: {
    leave({ alias: n, name: e, arguments: t, directives: r, selectionSet: i }) {
      const s = N("", n, ": ") + e;
      let o = s + N("(", x(t, ", "), ")");
      return o.length > ca && (o = s + N(`(
`, It(x(t, `
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
    leave: ({ value: n, block: e }) => e ? Ro(n) : na(n)
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
`) + x(["schema", x(e, " "), K(t)], " ")
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
        K(i)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: n, name: e, arguments: t, type: r, directives: i }) => N("", n, `
`) + e + (cn(t) ? N(`(
`, It(x(t, `
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
        K(i)
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
`) + x(["enum", e, x(t, " "), K(r)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: n, name: e, directives: t }) => N("", n, `
`) + x([e, x(t, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: n, name: e, directives: t, fields: r }) => N("", n, `
`) + x(["input", e, x(t, " "), K(r)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: n, name: e, arguments: t, repeatable: r, locations: i }) => N("", n, `
`) + "directive @" + e + (cn(t) ? N(`(
`, It(x(t, `
`)), `
)`) : N("(", x(t, ", "), ")")) + (r ? " repeatable" : "") + " on " + x(i, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: n, operationTypes: e }) => x(
      ["extend schema", x(n, " "), K(e)],
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
        K(r)
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
        K(r)
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
    leave: ({ name: n, directives: e, values: t }) => x(["extend enum", n, x(e, " "), K(t)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: n, directives: e, fields: t }) => x(["extend input", n, x(e, " "), K(t)], " ")
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
function K(n) {
  return N(`{
`, It(x(n, `
`)), `
}`);
}
function N(n, e, t = "") {
  return e != null && e !== "" ? n + e + t : "";
}
function It(n) {
  return N("  ", n.replace(/\n/g, `
  `));
}
function cn(n) {
  var e;
  return (e = n == null ? void 0 : n.some((t) => t.includes(`
`))) !== null && e !== void 0 ? e : !1;
}
var Rn = function(n, e) {
  return Rn = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
  }, Rn(n, e);
};
function J(n, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  Rn(n, e);
  function t() {
    this.constructor = n;
  }
  n.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var Lt = function() {
  return Lt = Object.assign || function(e) {
    for (var t, r = 1, i = arguments.length; r < i; r++) {
      t = arguments[r];
      for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
    }
    return e;
  }, Lt.apply(this, arguments);
};
function la(n, e, t, r) {
  function i(s) {
    return s instanceof t ? s : new t(function(o) {
      o(s);
    });
  }
  return new (t || (t = Promise))(function(s, o) {
    function c(l) {
      try {
        u(r.next(l));
      } catch (d) {
        o(d);
      }
    }
    function a(l) {
      try {
        u(r.throw(l));
      } catch (d) {
        o(d);
      }
    }
    function u(l) {
      l.done ? s(l.value) : i(l.value).then(c, a);
    }
    u((r = r.apply(n, e || [])).next());
  });
}
function Ui(n, e) {
  var t = { label: 0, sent: function() {
    if (s[0] & 1) throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, i, s, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return o.next = c(0), o.throw = c(1), o.return = c(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function c(u) {
    return function(l) {
      return a([u, l]);
    };
  }
  function a(u) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, u[0] && (t = 0)), t; ) try {
      if (r = 1, i && (s = u[0] & 2 ? i.return : u[0] ? i.throw || ((s = i.return) && s.call(i), 0) : i.next) && !(s = s.call(i, u[1])).done) return s;
      switch (i = 0, s && (u = [u[0] & 2, s.value]), u[0]) {
        case 0:
        case 1:
          s = u;
          break;
        case 4:
          return t.label++, { value: u[1], done: !1 };
        case 5:
          t.label++, i = u[1], u = [0];
          continue;
        case 7:
          u = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (s = t.trys, !(s = s.length > 0 && s[s.length - 1]) && (u[0] === 6 || u[0] === 2)) {
            t = 0;
            continue;
          }
          if (u[0] === 3 && (!s || u[1] > s[0] && u[1] < s[3])) {
            t.label = u[1];
            break;
          }
          if (u[0] === 6 && t.label < s[1]) {
            t.label = s[1], s = u;
            break;
          }
          if (s && t.label < s[2]) {
            t.label = s[2], t.ops.push(u);
            break;
          }
          s[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      u = e.call(n, t);
    } catch (l) {
      u = [6, l], i = 0;
    } finally {
      r = s = 0;
    }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function Me(n) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && n[e], r = 0;
  if (t) return t.call(n);
  if (n && typeof n.length == "number") return {
    next: function() {
      return n && r >= n.length && (n = void 0), { value: n && n[r++], done: !n };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Le(n, e) {
  var t = typeof Symbol == "function" && n[Symbol.iterator];
  if (!t) return n;
  var r = t.call(n), i, s = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; ) s.push(i.value);
  } catch (c) {
    o = { error: c };
  } finally {
    try {
      i && !i.done && (t = r.return) && t.call(r);
    } finally {
      if (o) throw o.error;
    }
  }
  return s;
}
function je(n, e, t) {
  if (t || arguments.length === 2) for (var r = 0, i = e.length, s; r < i; r++)
    (s || !(r in e)) && (s || (s = Array.prototype.slice.call(e, 0, r)), s[r] = e[r]);
  return n.concat(s || Array.prototype.slice.call(e));
}
function De(n) {
  return this instanceof De ? (this.v = n, this) : new De(n);
}
function fa(n, e, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = t.apply(n, e || []), i, s = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), c("next"), c("throw"), c("return", o), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function o(h) {
    return function(p) {
      return Promise.resolve(p).then(h, d);
    };
  }
  function c(h, p) {
    r[h] && (i[h] = function(y) {
      return new Promise(function(m, v) {
        s.push([h, y, m, v]) > 1 || a(h, y);
      });
    }, p && (i[h] = p(i[h])));
  }
  function a(h, p) {
    try {
      u(r[h](p));
    } catch (y) {
      f(s[0][3], y);
    }
  }
  function u(h) {
    h.value instanceof De ? Promise.resolve(h.value.v).then(l, d) : f(s[0][2], h);
  }
  function l(h) {
    a("next", h);
  }
  function d(h) {
    a("throw", h);
  }
  function f(h, p) {
    h(p), s.shift(), s.length && a(s[0][0], s[0][1]);
  }
}
function ha(n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = n[Symbol.asyncIterator], t;
  return e ? e.call(n) : (n = typeof Me == "function" ? Me(n) : n[Symbol.iterator](), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function r(s) {
    t[s] = n[s] && function(o) {
      return new Promise(function(c, a) {
        o = n[s](o), i(c, a, o.done, o.value);
      });
    };
  }
  function i(s, o, c, a) {
    Promise.resolve(a).then(function(u) {
      s({ value: u, done: c });
    }, o);
  }
}
function L(n) {
  return typeof n == "function";
}
function Zn(n) {
  var e = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, t = n(e);
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
var un = Zn(function(n) {
  return function(t) {
    n(this), this.message = t ? t.length + ` errors occurred during unsubscription:
` + t.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function jt(n, e) {
  if (n) {
    var t = n.indexOf(e);
    0 <= t && n.splice(t, 1);
  }
}
var mt = (function() {
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
            for (var c = Me(o), a = c.next(); !a.done; a = c.next()) {
              var u = a.value;
              u.remove(this);
            }
          } catch (y) {
            e = { error: y };
          } finally {
            try {
              a && !a.done && (t = c.return) && t.call(c);
            } finally {
              if (e) throw e.error;
            }
          }
        else
          o.remove(this);
      var l = this.initialTeardown;
      if (L(l))
        try {
          l();
        } catch (y) {
          s = y instanceof un ? y.errors : [y];
        }
      var d = this._finalizers;
      if (d) {
        this._finalizers = null;
        try {
          for (var f = Me(d), h = f.next(); !h.done; h = f.next()) {
            var p = h.value;
            try {
              Cr(p);
            } catch (y) {
              s = s ?? [], y instanceof un ? s = je(je([], Le(s)), Le(y.errors)) : s.push(y);
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
        throw new un(s);
    }
  }, n.prototype.add = function(e) {
    var t;
    if (e && e !== this)
      if (this.closed)
        Cr(e);
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
    t === e ? this._parentage = null : Array.isArray(t) && jt(t, e);
  }, n.prototype.remove = function(e) {
    var t = this._finalizers;
    t && jt(t, e), e instanceof n && e._removeParent(this);
  }, n.EMPTY = (function() {
    var e = new n();
    return e.closed = !0, e;
  })(), n;
})(), Wi = mt.EMPTY;
function zi(n) {
  return n instanceof mt || n && "closed" in n && L(n.remove) && L(n.add) && L(n.unsubscribe);
}
function Cr(n) {
  L(n) ? n() : n.unsubscribe();
}
var da = {
  Promise: void 0
}, pa = {
  setTimeout: function(n, e) {
    for (var t = [], r = 2; r < arguments.length; r++)
      t[r - 2] = arguments[r];
    return setTimeout.apply(void 0, je([n, e], Le(t)));
  },
  clearTimeout: function(n) {
    return clearTimeout(n);
  },
  delegate: void 0
};
function $i(n) {
  pa.setTimeout(function() {
    throw n;
  });
}
function Tr() {
}
function Nt(n) {
  n();
}
var er = (function(n) {
  J(e, n);
  function e(t) {
    var r = n.call(this) || this;
    return r.isStopped = !1, t ? (r.destination = t, zi(t) && t.add(r)) : r.destination = va, r;
  }
  return e.create = function(t, r, i) {
    return new ct(t, r, i);
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
})(mt), ma = (function() {
  function n(e) {
    this.partialObserver = e;
  }
  return n.prototype.next = function(e) {
    var t = this.partialObserver;
    if (t.next)
      try {
        t.next(e);
      } catch (r) {
        xt(r);
      }
  }, n.prototype.error = function(e) {
    var t = this.partialObserver;
    if (t.error)
      try {
        t.error(e);
      } catch (r) {
        xt(r);
      }
    else
      xt(e);
  }, n.prototype.complete = function() {
    var e = this.partialObserver;
    if (e.complete)
      try {
        e.complete();
      } catch (t) {
        xt(t);
      }
  }, n;
})(), ct = (function(n) {
  J(e, n);
  function e(t, r, i) {
    var s = n.call(this) || this, o;
    return L(t) || !t ? o = {
      next: t ?? void 0,
      error: r ?? void 0,
      complete: i ?? void 0
    } : o = t, s.destination = new ma(o), s;
  }
  return e;
})(er);
function xt(n) {
  $i(n);
}
function ya(n) {
  throw n;
}
var va = {
  closed: !0,
  next: Tr,
  error: ya,
  complete: Tr
}, tr = (function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
})();
function Yt(n) {
  return n;
}
function ga(n) {
  return n.length === 0 ? Yt : n.length === 1 ? n[0] : function(t) {
    return n.reduce(function(r, i) {
      return i(r);
    }, t);
  };
}
var M = (function() {
  function n(e) {
    e && (this._subscribe = e);
  }
  return n.prototype.lift = function(e) {
    var t = new n();
    return t.source = this, t.operator = e, t;
  }, n.prototype.subscribe = function(e, t, r) {
    var i = this, s = wa(e) ? e : new ct(e, t, r);
    return Nt(function() {
      var o = i, c = o.operator, a = o.source;
      s.add(c ? c.call(s, a) : a ? i._subscribe(s) : i._trySubscribe(s));
    }), s;
  }, n.prototype._trySubscribe = function(e) {
    try {
      return this._subscribe(e);
    } catch (t) {
      e.error(t);
    }
  }, n.prototype.forEach = function(e, t) {
    var r = this;
    return t = _r(t), new t(function(i, s) {
      var o = new ct({
        next: function(c) {
          try {
            e(c);
          } catch (a) {
            s(a), o.unsubscribe();
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
  }, n.prototype[tr] = function() {
    return this;
  }, n.prototype.pipe = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    return ga(e)(this);
  }, n.prototype.toPromise = function(e) {
    var t = this;
    return e = _r(e), new e(function(r, i) {
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
function _r(n) {
  var e;
  return (e = n ?? da.Promise) !== null && e !== void 0 ? e : Promise;
}
function ba(n) {
  return n && L(n.next) && L(n.error) && L(n.complete);
}
function wa(n) {
  return n && n instanceof er || ba(n) && zi(n);
}
function Ea(n) {
  return L(n == null ? void 0 : n.lift);
}
function ee(n) {
  return function(e) {
    if (Ea(e))
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
function ce(n, e, t, r, i) {
  return new ka(n, e, t, r, i);
}
var ka = (function(n) {
  J(e, n);
  function e(t, r, i, s, o, c) {
    var a = n.call(this, t) || this;
    return a.onFinalize = o, a.shouldUnsubscribe = c, a._next = r ? function(u) {
      try {
        r(u);
      } catch (l) {
        t.error(l);
      }
    } : n.prototype._next, a._error = s ? function(u) {
      try {
        s(u);
      } catch (l) {
        t.error(l);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._error, a._complete = i ? function() {
      try {
        i();
      } catch (u) {
        t.error(u);
      } finally {
        this.unsubscribe();
      }
    } : n.prototype._complete, a;
  }
  return e.prototype.unsubscribe = function() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      n.prototype.unsubscribe.call(this), !r && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }, e;
})(er), Sa = Zn(function(n) {
  return function() {
    n(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), $e = (function(n) {
  J(e, n);
  function e() {
    var t = n.call(this) || this;
    return t.closed = !1, t.currentObservers = null, t.observers = [], t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
  }
  return e.prototype.lift = function(t) {
    var r = new Ir(this, this);
    return r.operator = t, r;
  }, e.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Sa();
  }, e.prototype.next = function(t) {
    var r = this;
    Nt(function() {
      var i, s;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var o = Me(r.currentObservers), c = o.next(); !c.done; c = o.next()) {
            var a = c.value;
            a.next(t);
          }
        } catch (u) {
          i = { error: u };
        } finally {
          try {
            c && !c.done && (s = o.return) && s.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, e.prototype.error = function(t) {
    var r = this;
    Nt(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = t;
        for (var i = r.observers; i.length; )
          i.shift().error(t);
      }
    });
  }, e.prototype.complete = function() {
    var t = this;
    Nt(function() {
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
    var r = this, i = this, s = i.hasError, o = i.isStopped, c = i.observers;
    return s || o ? Wi : (this.currentObservers = null, c.push(t), new mt(function() {
      r.currentObservers = null, jt(c, t);
    }));
  }, e.prototype._checkFinalizedStatuses = function(t) {
    var r = this, i = r.hasError, s = r.thrownError, o = r.isStopped;
    i ? t.error(s) : o && t.complete();
  }, e.prototype.asObservable = function() {
    var t = new M();
    return t.source = this, t;
  }, e.create = function(t, r) {
    return new Ir(t, r);
  }, e;
})(M), Ir = (function(n) {
  J(e, n);
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
    return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t)) !== null && i !== void 0 ? i : Wi;
  }, e;
})($e), Oa = (function(n) {
  J(e, n);
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
})($e), nr = {
  now: function() {
    return (nr.delegate || Date).now();
  },
  delegate: void 0
}, Qi = (function(n) {
  J(e, n);
  function e(t, r, i) {
    t === void 0 && (t = 1 / 0), r === void 0 && (r = 1 / 0), i === void 0 && (i = nr);
    var s = n.call(this) || this;
    return s._bufferSize = t, s._windowTime = r, s._timestampProvider = i, s._buffer = [], s._infiniteTimeWindow = !0, s._infiniteTimeWindow = r === 1 / 0, s._bufferSize = Math.max(1, t), s._windowTime = Math.max(1, r), s;
  }
  return e.prototype.next = function(t) {
    var r = this, i = r.isStopped, s = r._buffer, o = r._infiniteTimeWindow, c = r._timestampProvider, a = r._windowTime;
    i || (s.push(t), !o && s.push(c.now() + a)), this._trimBuffer(), n.prototype.next.call(this, t);
  }, e.prototype._subscribe = function(t) {
    this._throwIfClosed(), this._trimBuffer();
    for (var r = this._innerSubscribe(t), i = this, s = i._infiniteTimeWindow, o = i._buffer, c = o.slice(), a = 0; a < c.length && !t.closed; a += s ? 1 : 2)
      t.next(c[a]);
    return this._checkFinalizedStatuses(t), r;
  }, e.prototype._trimBuffer = function() {
    var t = this, r = t._bufferSize, i = t._timestampProvider, s = t._buffer, o = t._infiniteTimeWindow, c = (o ? 1 : 2) * r;
    if (r < 1 / 0 && c < s.length && s.splice(0, s.length - c), !o) {
      for (var a = i.now(), u = 0, l = 1; l < s.length && s[l] <= a; l += 2)
        u = l;
      u && s.splice(0, u + 1);
    }
  }, e;
})($e), xa = (function(n) {
  J(e, n);
  function e(t, r) {
    return n.call(this) || this;
  }
  return e.prototype.schedule = function(t, r) {
    return this;
  }, e;
})(mt), Nr = {
  setInterval: function(n, e) {
    for (var t = [], r = 2; r < arguments.length; r++)
      t[r - 2] = arguments[r];
    return setInterval.apply(void 0, je([n, e], Le(t)));
  },
  clearInterval: function(n) {
    return clearInterval(n);
  },
  delegate: void 0
}, Hi = (function(n) {
  J(e, n);
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
    return i === void 0 && (i = 0), Nr.setInterval(t.flush.bind(t, this), i);
  }, e.prototype.recycleAsyncId = function(t, r, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === !1)
      return r;
    r != null && Nr.clearInterval(r);
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
      this.work = this.state = this.scheduler = null, this.pending = !1, jt(s, this), r != null && (this.id = this.recycleAsyncId(i, r, null)), this.delay = null, n.prototype.unsubscribe.call(this);
    }
  }, e;
})(xa), Ca = 1, ln, Fn = {};
function Ar(n) {
  return n in Fn ? (delete Fn[n], !0) : !1;
}
var Gi = {
  setImmediate: function(n) {
    var e = Ca++;
    return Fn[e] = !0, ln || (ln = Promise.resolve()), ln.then(function() {
      return Ar(e) && n();
    }), e;
  },
  clearImmediate: function(n) {
    Ar(n);
  }
}, Ta = Gi.setImmediate, _a = Gi.clearImmediate, Dr = {
  setImmediate: function() {
    for (var n = [], e = 0; e < arguments.length; e++)
      n[e] = arguments[e];
    return Ta.apply(void 0, je([], Le(n)));
  },
  clearImmediate: function(n) {
    return _a(n);
  },
  delegate: void 0
}, Ia = (function(n) {
  J(e, n);
  function e(t, r) {
    var i = n.call(this, t, r) || this;
    return i.scheduler = t, i.work = r, i;
  }
  return e.prototype.requestAsyncId = function(t, r, i) {
    return i === void 0 && (i = 0), i !== null && i > 0 ? n.prototype.requestAsyncId.call(this, t, r, i) : (t.actions.push(this), t._scheduled || (t._scheduled = Dr.setImmediate(t.flush.bind(t, void 0))));
  }, e.prototype.recycleAsyncId = function(t, r, i) {
    var s;
    if (i === void 0 && (i = 0), i != null ? i > 0 : this.delay > 0)
      return n.prototype.recycleAsyncId.call(this, t, r, i);
    var o = t.actions;
    r != null && ((s = o[o.length - 1]) === null || s === void 0 ? void 0 : s.id) !== r && (Dr.clearImmediate(r), t._scheduled === r && (t._scheduled = void 0));
  }, e;
})(Hi), Rr = (function() {
  function n(e, t) {
    t === void 0 && (t = n.now), this.schedulerActionCtor = e, this.now = t;
  }
  return n.prototype.schedule = function(e, t, r) {
    return t === void 0 && (t = 0), new this.schedulerActionCtor(this, e).schedule(r, t);
  }, n.now = nr.now, n;
})(), Yi = (function(n) {
  J(e, n);
  function e(t, r) {
    r === void 0 && (r = Rr.now);
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
})(Rr), Na = (function(n) {
  J(e, n);
  function e() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return e.prototype.flush = function(t) {
    this._active = !0;
    var r = this._scheduled;
    this._scheduled = void 0;
    var i = this.actions, s;
    t = t || i.shift();
    do
      if (s = t.execute(t.state, t.delay))
        break;
    while ((t = i[0]) && t.id === r && i.shift());
    if (this._active = !1, s) {
      for (; (t = i[0]) && t.id === r && i.shift(); )
        t.unsubscribe();
      throw s;
    }
  }, e;
})(Yi), Aa = new Na(Ia), Da = new Yi(Hi), Ra = Da, ut = new M(function(n) {
  return n.complete();
});
function Fa(n) {
  return n && L(n.schedule);
}
function Pa(n) {
  return n[n.length - 1];
}
function Ji(n) {
  return Fa(Pa(n)) ? n.pop() : void 0;
}
var Ki = (function(n) {
  return n && typeof n.length == "number" && typeof n != "function";
});
function Xi(n) {
  return L(n == null ? void 0 : n.then);
}
function Zi(n) {
  return L(n[tr]);
}
function es(n) {
  return Symbol.asyncIterator && L(n == null ? void 0 : n[Symbol.asyncIterator]);
}
function ts(n) {
  return new TypeError("You provided " + (n !== null && typeof n == "object" ? "an invalid object" : "'" + n + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Ma() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var ns = Ma();
function rs(n) {
  return L(n == null ? void 0 : n[ns]);
}
function is(n) {
  return fa(this, arguments, function() {
    var t, r, i, s;
    return Ui(this, function(o) {
      switch (o.label) {
        case 0:
          t = n.getReader(), o.label = 1;
        case 1:
          o.trys.push([1, , 9, 10]), o.label = 2;
        case 2:
          return [4, De(t.read())];
        case 3:
          return r = o.sent(), i = r.value, s = r.done, s ? [4, De(void 0)] : [3, 5];
        case 4:
          return [2, o.sent()];
        case 5:
          return [4, De(i)];
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
function ss(n) {
  return L(n == null ? void 0 : n.getReader);
}
function ye(n) {
  if (n instanceof M)
    return n;
  if (n != null) {
    if (Zi(n))
      return La(n);
    if (Ki(n))
      return ja(n);
    if (Xi(n))
      return Va(n);
    if (es(n))
      return os(n);
    if (rs(n))
      return Ba(n);
    if (ss(n))
      return qa(n);
  }
  throw ts(n);
}
function La(n) {
  return new M(function(e) {
    var t = n[tr]();
    if (L(t.subscribe))
      return t.subscribe(e);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function ja(n) {
  return new M(function(e) {
    for (var t = 0; t < n.length && !e.closed; t++)
      e.next(n[t]);
    e.complete();
  });
}
function Va(n) {
  return new M(function(e) {
    n.then(function(t) {
      e.closed || (e.next(t), e.complete());
    }, function(t) {
      return e.error(t);
    }).then(null, $i);
  });
}
function Ba(n) {
  return new M(function(e) {
    var t, r;
    try {
      for (var i = Me(n), s = i.next(); !s.done; s = i.next()) {
        var o = s.value;
        if (e.next(o), e.closed)
          return;
      }
    } catch (c) {
      t = { error: c };
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
function os(n) {
  return new M(function(e) {
    Ua(n, e).catch(function(t) {
      return e.error(t);
    });
  });
}
function qa(n) {
  return os(is(n));
}
function Ua(n, e) {
  var t, r, i, s;
  return la(this, void 0, void 0, function() {
    var o, c;
    return Ui(this, function(a) {
      switch (a.label) {
        case 0:
          a.trys.push([0, 5, 6, 11]), t = ha(n), a.label = 1;
        case 1:
          return [4, t.next()];
        case 2:
          if (r = a.sent(), !!r.done) return [3, 4];
          if (o = r.value, e.next(o), e.closed)
            return [2];
          a.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return c = a.sent(), i = { error: c }, [3, 11];
        case 6:
          return a.trys.push([6, , 9, 10]), r && !r.done && (s = t.return) ? [4, s.call(t)] : [3, 8];
        case 7:
          a.sent(), a.label = 8;
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
function rr(n, e) {
  return e === void 0 && (e = 0), ee(function(t, r) {
    t.subscribe(ce(r, function(i) {
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
function as(n, e) {
  return e === void 0 && (e = 0), ee(function(t, r) {
    r.add(n.schedule(function() {
      return t.subscribe(r);
    }, e));
  });
}
function Wa(n, e) {
  return ye(n).pipe(as(e), rr(e));
}
function za(n, e) {
  return ye(n).pipe(as(e), rr(e));
}
function $a(n, e) {
  return new M(function(t) {
    var r = 0;
    return e.schedule(function() {
      r === n.length ? t.complete() : (t.next(n[r++]), t.closed || this.schedule());
    });
  });
}
function Qa(n, e) {
  return new M(function(t) {
    var r;
    return Ee(t, e, function() {
      r = n[ns](), Ee(t, e, function() {
        var i, s, o;
        try {
          i = r.next(), s = i.value, o = i.done;
        } catch (c) {
          t.error(c);
          return;
        }
        o ? t.complete() : t.next(s);
      }, 0, !0);
    }), function() {
      return L(r == null ? void 0 : r.return) && r.return();
    };
  });
}
function cs(n, e) {
  if (!n)
    throw new Error("Iterable cannot be null");
  return new M(function(t) {
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
function Ha(n, e) {
  return cs(is(n), e);
}
function Ga(n, e) {
  if (n != null) {
    if (Zi(n))
      return Wa(n, e);
    if (Ki(n))
      return $a(n, e);
    if (Xi(n))
      return za(n, e);
    if (es(n))
      return cs(n, e);
    if (rs(n))
      return Qa(n, e);
    if (ss(n))
      return Ha(n, e);
  }
  throw ts(n);
}
function be(n, e) {
  return e ? Ga(n, e) : ye(n);
}
function ge() {
  for (var n = [], e = 0; e < arguments.length; e++)
    n[e] = arguments[e];
  var t = Ji(n);
  return be(n, t);
}
function us(n, e) {
  var t = L(n) ? n : function() {
    return n;
  }, r = function(i) {
    return i.error(t());
  };
  return new M(r);
}
var Fr;
(function(n) {
  n.NEXT = "N", n.ERROR = "E", n.COMPLETE = "C";
})(Fr || (Fr = {}));
var fn = (function() {
  function n(e, t, r) {
    this.kind = e, this.value = t, this.error = r, this.hasValue = e === "N";
  }
  return n.prototype.observe = function(e) {
    return Ya(this, e);
  }, n.prototype.do = function(e, t, r) {
    var i = this, s = i.kind, o = i.value, c = i.error;
    return s === "N" ? e == null ? void 0 : e(o) : s === "E" ? t == null ? void 0 : t(c) : r == null ? void 0 : r();
  }, n.prototype.accept = function(e, t, r) {
    var i;
    return L((i = e) === null || i === void 0 ? void 0 : i.next) ? this.observe(e) : this.do(e, t, r);
  }, n.prototype.toObservable = function() {
    var e = this, t = e.kind, r = e.value, i = e.error, s = t === "N" ? ge(r) : t === "E" ? us(function() {
      return i;
    }) : t === "C" ? ut : 0;
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
function Ya(n, e) {
  var t, r, i, s = n, o = s.kind, c = s.value, a = s.error;
  if (typeof o != "string")
    throw new TypeError('Invalid notification, missing "kind"');
  o === "N" ? (t = e.next) === null || t === void 0 || t.call(e, c) : o === "E" ? (r = e.error) === null || r === void 0 || r.call(e, a) : (i = e.complete) === null || i === void 0 || i.call(e);
}
var Ja = Zn(function(n) {
  return function() {
    n(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function Ka(n, e) {
  var t = typeof e == "object";
  return new Promise(function(r, i) {
    var s = !1, o;
    n.subscribe({
      next: function(c) {
        o = c, s = !0;
      },
      error: i,
      complete: function() {
        s ? r(o) : t ? r(e.defaultValue) : i(new Ja());
      }
    });
  });
}
function Xa(n) {
  return n instanceof Date && !isNaN(n);
}
function he(n, e) {
  return ee(function(t, r) {
    var i = 0;
    t.subscribe(ce(r, function(s) {
      r.next(n.call(e, s, i++));
    }));
  });
}
function Za(n, e, t, r, i, s, o, c) {
  var a = [], u = 0, l = 0, d = !1, f = function() {
    d && !a.length && !u && e.complete();
  }, h = function(y) {
    return u < r ? p(y) : a.push(y);
  }, p = function(y) {
    u++;
    var m = !1;
    ye(t(y, l++)).subscribe(ce(e, function(v) {
      e.next(v);
    }, function() {
      m = !0;
    }, void 0, function() {
      if (m)
        try {
          u--;
          for (var v = function() {
            var b = a.shift();
            o || p(b);
          }; a.length && u < r; )
            v();
          f();
        } catch (b) {
          e.error(b);
        }
    }));
  };
  return n.subscribe(ce(e, h, function() {
    d = !0, f();
  })), function() {
  };
}
function Te(n, e, t) {
  return t === void 0 && (t = 1 / 0), L(e) ? Te(function(r, i) {
    return he(function(s, o) {
      return e(r, s, i, o);
    })(ye(n(r, i)));
  }, t) : (typeof e == "number" && (t = e), ee(function(r, i) {
    return Za(r, i, n, t);
  }));
}
function ec(n) {
  return Te(Yt, n);
}
function tc() {
  return ec(1);
}
function hn() {
  for (var n = [], e = 0; e < arguments.length; e++)
    n[e] = arguments[e];
  return tc()(be(n, Ji(n)));
}
function nc(n, e, t) {
  return t === void 0 && (t = Ra), new M(function(r) {
    var i = Xa(n) ? +n - t.now() : n;
    i < 0 && (i = 0);
    var s = 0;
    return t.schedule(function() {
      r.closed || (r.next(s++), r.complete());
    }, i);
  });
}
function ls(n, e) {
  return ee(function(t, r) {
    var i = 0;
    t.subscribe(ce(r, function(s) {
      return n.call(e, s, i++) && r.next(s);
    }));
  });
}
function At(n) {
  return ee(function(e, t) {
    var r = null, i = !1, s;
    r = e.subscribe(ce(t, void 0, void 0, function(o) {
      s = ye(n(o, At(n)(e))), r ? (r.unsubscribe(), r = null, s.subscribe(t)) : i = !0;
    })), i && (r.unsubscribe(), r = null, s.subscribe(t));
  });
}
function rc(n, e) {
  return e === void 0 && (e = Yt), n = n ?? ic, ee(function(t, r) {
    var i, s = !0;
    t.subscribe(ce(r, function(o) {
      var c = e(o);
      (s || !n(i, c)) && (s = !1, i = c, r.next(o));
    }));
  });
}
function ic(n, e) {
  return n === e;
}
function sc(n) {
  return ee(function(e, t) {
    try {
      e.subscribe(t);
    } finally {
      t.add(n);
    }
  });
}
function oc() {
  return ee(function(n, e) {
    n.subscribe(ce(e, function(t) {
      e.next(fn.createNext(t));
    }, function() {
      e.next(fn.createComplete()), e.complete();
    }, function(t) {
      e.next(fn.createError(t)), e.complete();
    }));
  });
}
function lt(n) {
  n === void 0 && (n = {});
  var e = n.connector, t = e === void 0 ? function() {
    return new $e();
  } : e, r = n.resetOnError, i = r === void 0 ? !0 : r, s = n.resetOnComplete, o = s === void 0 ? !0 : s, c = n.resetOnRefCountZero, a = c === void 0 ? !0 : c;
  return function(u) {
    var l, d, f, h = 0, p = !1, y = !1, m = function() {
      d == null || d.unsubscribe(), d = void 0;
    }, v = function() {
      m(), l = f = void 0, p = y = !1;
    }, b = function() {
      var E = l;
      v(), E == null || E.unsubscribe();
    };
    return ee(function(E, k) {
      h++, !y && !p && m();
      var O = f = f ?? t();
      k.add(function() {
        h--, h === 0 && !y && !p && (d = dn(b, a));
      }), O.subscribe(k), !l && h > 0 && (l = new ct({
        next: function(I) {
          return O.next(I);
        },
        error: function(I) {
          y = !0, m(), d = dn(v, i, I), O.error(I);
        },
        complete: function() {
          p = !0, m(), d = dn(v, o), O.complete();
        }
      }), ye(E).subscribe(l));
    })(u);
  };
}
function dn(n, e) {
  for (var t = [], r = 2; r < arguments.length; r++)
    t[r - 2] = arguments[r];
  if (e === !0) {
    n();
    return;
  }
  if (e !== !1) {
    var i = new ct({
      next: function() {
        i.unsubscribe(), n();
      }
    });
    return ye(e.apply(void 0, je([], Le(t)))).subscribe(i);
  }
}
function ir(n, e, t) {
  var r, i, s, o, c = !1;
  return n && typeof n == "object" ? (r = n.bufferSize, o = r === void 0 ? 1 / 0 : r, i = n.windowTime, e = i === void 0 ? 1 / 0 : i, s = n.refCount, c = s === void 0 ? !1 : s, t = n.scheduler) : o = n ?? 1 / 0, lt({
    connector: function() {
      return new Qi(o, e, t);
    },
    resetOnError: !0,
    resetOnComplete: !1,
    resetOnRefCountZero: c
  });
}
function ft(n, e, t) {
  var r = L(n) || e || t ? { next: n, error: e, complete: t } : n;
  return r ? ee(function(i, s) {
    var o;
    (o = r.subscribe) === null || o === void 0 || o.call(r);
    var c = !0;
    i.subscribe(ce(s, function(a) {
      var u;
      (u = r.next) === null || u === void 0 || u.call(r, a), s.next(a);
    }, function() {
      var a;
      c = !1, (a = r.complete) === null || a === void 0 || a.call(r), s.complete();
    }, function(a) {
      var u;
      c = !1, (u = r.error) === null || u === void 0 || u.call(r, a), s.error(a);
    }, function() {
      var a, u;
      c && ((a = r.unsubscribe) === null || a === void 0 || a.call(r)), (u = r.finalize) === null || u === void 0 || u.call(r);
    }));
  }) : Yt;
}
const fs = !1;
function X(n) {
  try {
    return n();
  } catch {
  }
}
const Pn = (
  // We don't expect the Function constructor ever to be invoked at runtime, as
  // long as at least one of globalThis, window, self, or global is defined, so
  // we are under no obligation to make it easy for static analysis tools to
  // detect syntactic usage of the Function constructor. If you think you can
  X(() => globalThis) || X(() => window) || X(() => self) || X(() => global) || // improve your static analysis to detect this obfuscation, think again. This
  // is an arms race you cannot win, at least not in JavaScript.
  X(function() {
    return X.constructor("return this")();
  })
), sr = "4.1.6", Pr = /* @__PURE__ */ new Map();
function hs(n) {
  const e = Pr.get(n) || 1;
  return Pr.set(n, e + 1), `${n}:${e}:${Math.random().toString(36).slice(2)}`;
}
function ac(n, e = 0) {
  const t = hs("stringifyForDisplay");
  return JSON.stringify(n, (r, i) => i === void 0 ? t : i, e).split(JSON.stringify(t)).join("<undefined>");
}
const Mr = "Invariant Violation";
class or extends Error {
  constructor(e = Mr) {
    super(e), this.name = Mr, Object.setPrototypeOf(this, or.prototype);
  }
}
const ds = ["debug", "log", "warn", "error", "silent"];
let cc = ds.indexOf("silent");
function A(n, ...e) {
  if (!n)
    throw Y(...e);
}
function Jt(n) {
  return function(e, ...t) {
    if (ds.indexOf(n) >= cc) {
      const r = console[n] || console.log;
      if (typeof e == "number") {
        const i = e;
        e = ps(i), e || (e = ms(i, t), t = []);
      }
      r(e, ...t);
    }
  };
}
A.debug = Jt("debug");
A.log = Jt("log");
A.warn = Jt("warn");
A.error = Jt("error");
function Y(n, ...e) {
  return new or(ps(n, e) || ms(n, e));
}
const Lr = Symbol.for("ApolloErrorMessageHandler_" + sr);
function Mn(n) {
  if (typeof n == "string")
    return n;
  try {
    return ac(n, 2).slice(0, 1e3);
  } catch {
    return "<non-serializable>";
  }
}
function ps(n, e = []) {
  if (n)
    return Pn[Lr] && Pn[Lr](n, e.map(Mn));
}
function ms(n, e = []) {
  if (n)
    return typeof n == "string" ? e.reduce((t, r) => t.replace(/%[sdfo]/, Mn(r)), n) : `An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#${encodeURIComponent(JSON.stringify({
      version: sr,
      message: n,
      args: e.map(Mn)
    }))}`;
}
function Ve(n, e, t, r) {
  if (t.kind === S.INT || t.kind === S.FLOAT)
    n[e.value] = Number(t.value);
  else if (t.kind === S.BOOLEAN || t.kind === S.STRING)
    n[e.value] = t.value;
  else if (t.kind === S.OBJECT) {
    const i = {};
    t.fields.map((s) => Ve(i, s.name, s.value, r)), n[e.value] = i;
  } else if (t.kind === S.VARIABLE) {
    const i = (r || {})[t.name.value];
    n[e.value] = i;
  } else if (t.kind === S.LIST)
    n[e.value] = t.values.map((i) => {
      const s = {};
      return Ve(s, e, i, r), s[e.value];
    });
  else if (t.kind === S.ENUM)
    n[e.value] = t.value;
  else if (t.kind === S.NULL)
    n[e.value] = null;
  else
    throw Y(19, e.value, t.kind);
}
function ar(n, e) {
  if (n.arguments && n.arguments.length) {
    const t = {};
    return n.arguments.forEach(({ name: r, value: i }) => Ve(t, r, i, e)), t;
  }
  return null;
}
const ys = typeof X(() => window.document.createElement) == "function", uc = Symbol.for("apollo.cacheSize"), ue = { ...Pn[uc] };
function Be(n, e) {
  var t;
  return ((t = n.definitions.find((r) => r.kind === "OperationDefinition" && !!r.name)) == null ? void 0 : t.name.value) ?? e;
}
const lc = () => /* @__PURE__ */ Object.create(null), { forEach: fc, slice: jr } = Array.prototype, { hasOwnProperty: hc } = Object.prototype;
class ie {
  constructor(e = !0, t = lc) {
    this.weakness = e, this.makeData = t;
  }
  lookup() {
    return this.lookupArray(arguments);
  }
  lookupArray(e) {
    let t = this;
    return fc.call(e, (r) => t = t.getChildTrie(r)), hc.call(t, "data") ? t.data : t.data = this.makeData(jr.call(e));
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
      s && (t = s.removeArray(jr.call(e, 1)), !s.data && !s.weak && !(s.strong && s.strong.size) && i.delete(r));
    } else
      t = this.data, delete this.data;
    return t;
  }
  getChildTrie(e) {
    const t = this.mapFor(e, !0);
    let r = t.get(e);
    return r || t.set(e, r = new ie(this.weakness, this.makeData)), r;
  }
  mapFor(e, t) {
    return this.weakness && dc(e) ? this.weak || (t ? this.weak = /* @__PURE__ */ new WeakMap() : void 0) : this.strong || (t ? this.strong = /* @__PURE__ */ new Map() : void 0);
  }
}
function dc(n) {
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
function pc() {
}
class Ln {
  constructor(e = 1 / 0, t = pc) {
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
function jn() {
}
const mc = jn, yc = typeof WeakRef < "u" ? WeakRef : function(n) {
  return { deref: () => n };
}, vc = typeof WeakMap < "u" ? WeakMap : Map, gc = typeof FinalizationRegistry < "u" ? FinalizationRegistry : function() {
  return {
    register: jn,
    unregister: jn
  };
}, bc = 10024;
class Vt {
  constructor(e = 1 / 0, t = mc) {
    this.max = e, this.dispose = t, this.map = new vc(), this.newest = null, this.oldest = null, this.unfinalizedNodes = /* @__PURE__ */ new Set(), this.finalizationScheduled = !1, this.size = 0, this.finalize = () => {
      const r = this.unfinalizedNodes.values();
      for (let i = 0; i < bc; i++) {
        const s = r.next().value;
        if (!s)
          break;
        this.unfinalizedNodes.delete(s);
        const o = s.key;
        delete s.key, s.keyRef = new yc(o), this.registry.register(o, s, s);
      }
      this.unfinalizedNodes.size > 0 ? queueMicrotask(this.finalize) : this.finalizationScheduled = !1;
    }, this.registry = new gc(this.deleteNode.bind(this));
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
const pn = /* @__PURE__ */ new WeakSet();
function vs(n) {
  n.size <= (n.max || -1) || pn.has(n) || (pn.add(n), setTimeout(() => {
    n.clean(), pn.delete(n);
  }, 100));
}
const cr = function(n, e) {
  const t = new Vt(n, e);
  return t.set = function(r, i) {
    const s = Vt.prototype.set.call(this, r, i);
    return vs(this), s;
  }, t;
}, wc = function(n, e) {
  const t = new Ln(n, e);
  return t.set = function(r, i) {
    const s = Ln.prototype.set.call(this, r, i);
    return vs(this), s;
  }, t;
};
function gs(n, { max: e, makeCacheKey: t = (r) => r }) {
  const r = new ie(!0), i = new cr(e);
  return (...s) => {
    const o = r.lookupArray(t(s)), c = i.get(o);
    if (c) {
      if (c.error)
        throw c.error;
      return c.result;
    }
    const a = i.set(o, {});
    try {
      return a.result = n(...s);
    } catch (u) {
      throw a.error = u, u;
    }
  };
}
const de = gs((n, e) => {
  A(n && n.kind === "Document", 1);
  const t = n.definitions.filter((r) => r.kind === "OperationDefinition");
  e && A(
    t.length == 1 && t[0].operation === e,
    4,
    e,
    e,
    t[0].operation
  ), re(n, {
    Field(r, i, s, o) {
      var c;
      if (r.alias && (r.alias.value === "__typename" || r.alias.value.startsWith("__ac_")) && r.alias.value !== r.name.value) {
        let a = n, u = [];
        for (const l of o)
          a = a[l], a.kind === S.FIELD && u.push(((c = a.alias) == null ? void 0 : c.value) || a.name.value);
        throw u.splice(-1, 1, r.name.value), Y(
          5,
          r.alias.value,
          u.join("."),
          t[0].operation,
          Be(n, "(anonymous)")
        );
      }
    }
  });
}, {
  max: ue.checkDocument || 2e3
});
function Ec(n) {
  return n.length === 0 ? ut : new M((e) => {
    const { length: t } = n, r = new Array(t), i = /* @__PURE__ */ new Map();
    n.forEach((a, u) => {
      i.has(a) || i.set(a, /* @__PURE__ */ new Set()), i.get(a).add(u);
    });
    let s = i.size, o = i.size, c;
    i.forEach((a, u) => {
      let l = !1;
      const d = u.subscribe({
        next: (f) => {
          a.forEach((h) => r[h] = f), l || (l = !0, o--), o || (c || (c = new Set(n.filter((h) => h.dirty))), c.delete(u), c.size || (e.next(r.slice()), c = void 0));
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
function yt(n = []) {
  const e = {};
  return n.forEach((t) => {
    e[t.name.value] = t;
  }), e;
}
function Q(n) {
  return n !== null && typeof n == "object";
}
const { hasOwnProperty: kc } = Object.prototype, Sc = function(n, e, t) {
  return this.merge(n[t], e[t]);
}, Vr = (n) => isNaN(+n) ? {} : [];
class qe {
  constructor(e = {}) {
    g(this, "options");
    g(this, "reconciler");
    g(this, "isObject", Q);
    g(this, "pastCopies", /* @__PURE__ */ new Set());
    this.options = e, this.reconciler = e.reconciler || Sc;
  }
  merge(e, t, r = {}) {
    const i = r.atPath;
    if (i != null && i.length) {
      const [s, ...o] = i;
      e === void 0 && (e = Vr(s));
      let c = e[s];
      c === void 0 && o.length && (c = Vr(o[0]));
      const a = this.merge(c, t, {
        ...r,
        atPath: o
      });
      return c !== a && (e = this.shallowCopyForMerge(e), e[s] = a), e;
    }
    return Array.isArray(e) && Array.isArray(t) && this.options.arrayMerge === "truncate" && e.length > t.length && (e = e.slice(0, t.length), this.pastCopies.add(e)), Q(t) && Q(e) ? (Object.keys(t).forEach((s) => {
      if (kc.call(e, s)) {
        const o = e[s];
        if (t[s] !== o) {
          const c = this.reconciler(e, t, s);
          c !== o && (e = this.shallowCopyForMerge(e), e[s] = c);
        }
      } else
        e = this.shallowCopyForMerge(e), e[s] = t[s];
    }), e) : t;
  }
  shallowCopyForMerge(e) {
    return Q(e) && (this.pastCopies.has(e) || (Array.isArray(e) ? e = e.slice(0) : e = {
      __proto__: Object.getPrototypeOf(e),
      ...e
    }, this.pastCopies.add(e))), e;
  }
}
function ur(n) {
  const e = {}, t = n && n.variableDefinitions;
  return t && t.length && t.forEach((r) => {
    r.defaultValue && Ve(e, r.variable.name, r.defaultValue);
  }), e;
}
function Kt(n, e) {
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
function Oc(n, e) {
  let t = e;
  const r = [];
  return n.definitions.forEach((s) => {
    if (s.kind === "OperationDefinition")
      throw Y(
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
function xc(n) {
  A(n.kind === "Document", 6), A(n.definitions.length <= 1, 7);
  const e = n.definitions[0];
  return A(e.kind === "FragmentDefinition", 8), e;
}
function vt(n) {
  return n.definitions.filter((e) => e.kind === "FragmentDefinition");
}
function bs(n) {
  de(n);
  let e;
  for (let t of n.definitions) {
    if (t.kind === "OperationDefinition")
      return t;
    t.kind === "FragmentDefinition" && !e && (e = t);
  }
  if (e)
    return e;
  throw Y(12);
}
function le(n) {
  return de(n), n.definitions.filter((e) => e.kind === "OperationDefinition")[0];
}
function Cc(n) {
  const e = le(n);
  return A(e && e.operation === "query", 13), e;
}
const ae = Object.assign(function(e) {
  return JSON.stringify(e, Tc);
}, {
  reset() {
    Ze = new wc(
      ue.canonicalStringify || 1e3
      /* defaultCacheSizes.canonicalStringify */
    );
  }
});
let Ze;
ae.reset();
function Tc(n, e) {
  if (e && typeof e == "object") {
    const t = Object.getPrototypeOf(e);
    if (t === Object.prototype || t === null) {
      const r = Object.keys(e);
      if (r.every(_c))
        return e;
      const i = JSON.stringify(r);
      let s = Ze.get(i);
      if (!s) {
        r.sort();
        const c = JSON.stringify(r);
        s = Ze.get(c) || r, Ze.set(i, s), Ze.set(c, s);
      }
      const o = Object.create(t);
      return s.forEach((c) => {
        o[c] = e[c];
      }), o;
    }
  }
  return e;
}
function _c(n, e, t) {
  return e === 0 || t[e - 1] <= n;
}
const Ic = [
  "connection",
  "include",
  "skip",
  "client",
  "rest",
  "export",
  "nonreactive",
  "stream"
];
let Ge = ae;
const ws = Object.assign(function(n, e, t) {
  if (e && t && t.connection && t.connection.key) {
    if (t.connection.filter && t.connection.filter.length > 0) {
      const i = t.connection.filter ? t.connection.filter : [];
      i.sort();
      const s = {};
      i.forEach((c) => {
        s[c] = e[c];
      });
      const o = Ge(s);
      if (o !== "{}")
        return `${t.connection.key}(${o})`;
    }
    return t.connection.key;
  }
  let r = n;
  if (e) {
    const i = Ge(e);
    i !== "{}" && (r += `(${i})`);
  }
  return t && Object.keys(t).forEach((i) => {
    Ic.indexOf(i) === -1 && (t[i] && Object.keys(t[i]).length ? r += `@${i}(${Ge(t[i])})` : r += `@${i}`);
  }), r;
}, {
  setStringify(n) {
    const e = Ge;
    return Ge = n, e;
  }
});
function _e(n) {
  var e;
  return !!((e = n.errors) != null && e.length);
}
function Ie(n, e, t) {
  const r = new Set(n), i = r.size;
  return re(e, {
    Directive(s) {
      if (r.delete(s.name.value) && (!t || !r.size))
        return Xn;
    }
  }), t ? !r.size : r.size < i;
}
function Nc(n) {
  let e = !1;
  return re(n, {
    Directive: {
      enter(t) {
        if (t.name.value === "client" && t.arguments && (e = t.arguments.some((r) => r.name.value === "always" && r.value.kind === "BooleanValue" && r.value.value === !0), e))
          return Xn;
      }
    }
  }), e;
}
const B = Array.isArray;
function Ac(n) {
  return Q(n) && n.kind === "Document" && Array.isArray(n.definitions);
}
function gt(n) {
  return n.kind === "Field";
}
function lr(n) {
  return Array.isArray(n) && n.length > 0;
}
function Re(n) {
  return { __ref: String(n) };
}
function Dc(n) {
  let e = n[0] || {};
  const t = n.length;
  if (t > 1) {
    const r = new qe();
    for (let i = 1; i < t; ++i)
      e = r.merge(e, n[i]);
  }
  return e;
}
function ke(n, e) {
  return G(n, e, e.variables && {
    variables: G({
      ...n && n.variables,
      ...e.variables
    })
  });
}
function Vn(n) {
  return n.catch(() => {
  }), n;
}
function Rc(n, e) {
  de(e);
  const t = Br(""), r = Br(""), i = (m) => {
    for (let v = 0, b; v < m.length && (b = m[v]); ++v)
      if (!B(b)) {
        if (b.kind === S.OPERATION_DEFINITION)
          return t(b.name && b.name.value);
        if (b.kind === S.FRAGMENT_DEFINITION)
          return r(b.name.value);
      }
    return A.error(14), null;
  };
  let s = 0;
  for (let m = e.definitions.length - 1; m >= 0; --m)
    e.definitions[m].kind === S.OPERATION_DEFINITION && ++s;
  const o = Fc(n), c = (m) => lr(m) && m.map(o).some((v) => v && v.remove), a = /* @__PURE__ */ new Map();
  let u = !1;
  const l = {
    enter(m) {
      if (c(m.directives))
        return u = !0, null;
    }
  }, d = re(e, {
    // These two AST node types share the same implementation, defined above.
    Field: l,
    InlineFragment: l,
    VariableDefinition: {
      enter() {
        return !1;
      }
    },
    Variable: {
      enter(m, v, b, E, k) {
        const O = i(k);
        O && O.variables.add(m.name.value);
      }
    },
    FragmentSpread: {
      enter(m, v, b, E, k) {
        if (c(m.directives))
          return u = !0, null;
        const O = i(k);
        O && O.fragmentSpreads.add(m.name.value);
      }
    },
    FragmentDefinition: {
      enter(m, v, b, E) {
        a.set(JSON.stringify(E), m);
      },
      leave(m, v, b, E) {
        const k = a.get(JSON.stringify(E));
        if (m === k)
          return m;
        if (
          // This logic applies only if the document contains one or more
          // operations, since removing all fragments from a document containing
          // only fragments makes the document useless.
          s > 0 && m.selectionSet.selections.every((O) => O.kind === S.FIELD && O.name.value === "__typename")
        )
          return r(m.name.value).removed = !0, u = !0, null;
      }
    },
    Directive: {
      leave(m) {
        if (o(m))
          return u = !0, null;
      }
    }
  });
  if (!u)
    return e;
  const f = (m) => (m.transitiveVars || (m.transitiveVars = new Set(m.variables), m.removed || m.fragmentSpreads.forEach((v) => {
    f(r(v)).transitiveVars.forEach((b) => {
      m.transitiveVars.add(b);
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
  return Pc(re(d, {
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
              variableDefinitions: m.variableDefinitions.filter((b) => v.has(b.variable.name.value))
            };
        }
      }
    }
  }));
}
function Br(n) {
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
function Fc(n) {
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
function Es(n, e) {
  return !n || n.selectionSet.selections.every((t) => t.kind === S.FRAGMENT_SPREAD && Es(e[t.name.value], e));
}
function Pc(n) {
  return Es(le(n) || xc(n), yt(vt(n))) ? null : n;
}
function Mc(n) {
  return re(n, {
    FragmentSpread(e) {
      var t;
      if (!((t = e.directives) != null && t.some(({ name: r }) => r.value === "unmask")))
        return null;
    }
  });
}
function Qe(n) {
  return n.alias ? n.alias.value : n.name.value;
}
function Xt({ directives: n }, e) {
  return !n || !n.length ? !0 : jc(n).every(({ directive: t, ifArgument: r }) => {
    let i = !1;
    return r.value.kind === "Variable" ? (i = e && e[r.value.name.value], A(i !== void 0, 15, t.name.value)) : i = r.value.value, t.name.value === "skip" ? !i : i;
  });
}
function Lc({ name: { value: n } }) {
  return n === "skip" || n === "include";
}
function jc(n) {
  const e = [];
  return n && n.length && n.forEach((t) => {
    if (!Lc(t))
      return;
    const r = t.arguments, i = t.name.value;
    A(r && r.length === 1, 16, i);
    const s = r[0];
    A(s.name && s.name.value === "if", 17, i);
    const o = s.value;
    A(o && (o.kind === "Variable" || o.kind === "BooleanValue"), 18, i), e.push({ directive: t, ifArgument: s });
  }), e;
}
function Vc(n, e) {
  let t = null;
  n.directives && (t = {}, n.directives.forEach((i) => {
    t[i.name.value] = {}, i.arguments && i.arguments.forEach(({ name: s, value: o }) => Ve(t[i.name.value], s, o, e));
  }));
  let r = null;
  return n.arguments && n.arguments.length && (r = {}, n.arguments.forEach(({ name: i, value: s }) => Ve(r, i, s, e))), ws(n.name.value, r, t);
}
function et(n) {
  const e = {
    data: n.data
  };
  return n.error && (e.error = n.error), e;
}
function Bn(n, e = () => {
}) {
  return (t) => new M((r) => {
    let i = e();
    return t.subscribe({
      next(s) {
        let o;
        try {
          o = n(s, i);
        } catch (c) {
          r.error(c);
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
const { toString: qr, hasOwnProperty: Bc } = Object.prototype, Ur = Function.prototype.toString, qn = /* @__PURE__ */ new Map();
function D(n, e) {
  try {
    return Un(n, e);
  } finally {
    qn.clear();
  }
}
function Un(n, e) {
  if (n === e)
    return !0;
  const t = qr.call(n), r = qr.call(e);
  if (t !== r)
    return !1;
  switch (t) {
    case "[object Array]":
      if (n.length !== e.length)
        return !1;
    // Fall through to object case...
    case "[object Object]": {
      if (zr(n, e))
        return !0;
      const i = Wr(n), s = Wr(e), o = i.length;
      if (o !== s.length)
        return !1;
      for (let c = 0; c < o; ++c)
        if (!Bc.call(e, i[c]))
          return !1;
      for (let c = 0; c < o; ++c) {
        const a = i[c];
        if (!Un(n[a], e[a]))
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
      if (zr(n, e))
        return !0;
      const i = n.entries(), s = t === "[object Map]";
      for (; ; ) {
        const o = i.next();
        if (o.done)
          break;
        const [c, a] = o.value;
        if (!e.has(c) || s && !Un(a, e.get(c)))
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
      const i = Ur.call(n);
      return i !== Ur.call(e) ? !1 : !Wc(i, Uc);
    }
  }
  return !1;
}
function Wr(n) {
  return Object.keys(n).filter(qc, n);
}
function qc(n) {
  return this[n] !== void 0;
}
const Uc = "{ [native code] }";
function Wc(n, e) {
  const t = n.length - e.length;
  return t >= 0 && n.indexOf(e, t) === t;
}
function zr(n, e) {
  let t = qn.get(n);
  if (t) {
    if (t.has(e))
      return !0;
  } else
    qn.set(n, t = /* @__PURE__ */ new Set());
  return t.add(e), !1;
}
function ks(n, { data: e, ...t }, { data: r, ...i }, s) {
  return D(t, i) && Dt(bs(n).selectionSet, e, r, {
    fragmentMap: yt(vt(n)),
    variables: s
  });
}
function Dt(n, e, t, r) {
  if (e === t)
    return !0;
  const i = /* @__PURE__ */ new Set();
  return n.selections.every((s) => {
    if (i.has(s) || (i.add(s), !Xt(s, r.variables)) || $r(s))
      return !0;
    if (gt(s)) {
      const o = Qe(s), c = e && e[o], a = t && t[o], u = s.selectionSet;
      if (!u)
        return D(c, a);
      const l = Array.isArray(c), d = Array.isArray(a);
      if (l !== d)
        return !1;
      if (l && d) {
        const f = c.length;
        if (a.length !== f)
          return !1;
        for (let h = 0; h < f; ++h)
          if (!Dt(u, c[h], a[h], r))
            return !1;
        return !0;
      }
      return Dt(u, c, a, r);
    } else {
      const o = Kt(s, r.fragmentMap);
      if (o)
        return $r(o) ? !0 : Dt(
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
function $r(n) {
  return !!n.directives && n.directives.some(zc);
}
function zc(n) {
  return n.name.value === "nonreactive";
}
function $c(n, e) {
  let t, r;
  function i(s) {
    return s !== t && (t = s, r = e(t)), r;
  }
  return Object.assign(n.pipe(he(i), ir({ bufferSize: 1, refCount: !0 })), {
    getCurrentResult: () => i(n.getCurrentResult())
  });
}
const Qc = gs(function(e, t, r) {
  return $c(e, r);
}, { max: 1, makeCacheKey: (n) => n.slice(0, 2) }), Ss = Symbol.for("apollo.result.extensions"), pe = Symbol.for("apollo.result.streamInfo"), Os = Symbol.for("apollo.observableQuery.variablesUnknown");
let z = null;
const Qr = {};
let Hc = 1;
const Gc = () => class {
  constructor() {
    this.id = [
      "slot",
      Hc++,
      Date.now(),
      Math.random().toString(36).slice(2)
    ].join(":");
  }
  hasValue() {
    for (let e = z; e; e = e.parent)
      if (this.id in e.slots) {
        const t = e.slots[this.id];
        if (t === Qr)
          break;
        return e !== z && (z.slots[this.id] = t), !0;
      }
    return z && (z.slots[this.id] = Qr), !1;
  }
  getValue() {
    if (this.hasValue())
      return z.slots[this.id];
  }
  withValue(e, t, r, i) {
    const s = {
      __proto__: null,
      [this.id]: e
    }, o = z;
    z = { parent: o, slots: s };
    try {
      return t.apply(i, r);
    } finally {
      z = o;
    }
  }
  // Capture the current context and wrap a callback function so that it
  // reestablishes the captured context when called.
  static bind(e) {
    const t = z;
    return function() {
      const r = z;
      try {
        return z = t, e.apply(this, arguments);
      } finally {
        z = r;
      }
    };
  }
  // Immediately run a callback function without any captured context.
  static noContext(e, t, r) {
    if (z) {
      const i = z;
      try {
        return z = null, e.apply(r, t);
      } finally {
        z = i;
      }
    } else
      return e.apply(r, t);
  }
};
function Hr(n) {
  try {
    return n();
  } catch {
  }
}
const mn = "@wry/context:Slot", Yc = (
  // Prefer globalThis when available.
  // https://github.com/benjamn/wryware/issues/347
  Hr(() => globalThis) || // Fall back to global, which works in Node.js and may be converted by some
  // bundlers to the appropriate identifier (window, self, ...) depending on the
  // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
  Hr(() => global) || // Otherwise, use a dummy host that's local to this module. We used to fall
  // back to using the Array constructor as a namespace, but that was flagged in
  // https://github.com/benjamn/wryware/issues/347, and can be avoided.
  /* @__PURE__ */ Object.create(null)
), Gr = Yc, Zt = Gr[mn] || // Earlier versions of this package stored the globalKey property on the Array
// constructor, so we check there as well, to prevent Slot class duplication.
Array[mn] || (function(n) {
  try {
    Object.defineProperty(Gr, mn, {
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
})(Gc()), { bind: mf, noContext: yf } = Zt, en = new Zt(), { hasOwnProperty: Jc } = Object.prototype, fr = Array.from || function(n) {
  const e = [];
  return n.forEach((t) => e.push(t)), e;
};
function hr(n) {
  const { unsubscribe: e } = n;
  typeof e == "function" && (n.unsubscribe = void 0, e());
}
const ht = [], Kc = 100;
function Ue(n, e) {
  if (!n)
    throw new Error(e || "assertion failure");
}
function xs(n, e) {
  const t = n.length;
  return (
    // Unknown values are not equal to each other.
    t > 0 && // Both values must be ordinary (or both exceptional) to be equal.
    t === e.length && // The underlying value or exception must be the same.
    n[t - 1] === e[t - 1]
  );
}
function Cs(n) {
  switch (n.length) {
    case 0:
      throw new Error("unknown value");
    case 1:
      return n[0];
    case 2:
      throw n[1];
  }
}
function Ts(n) {
  return n.slice(0);
}
class tn {
  constructor(e) {
    this.fn = e, this.parents = /* @__PURE__ */ new Set(), this.childValues = /* @__PURE__ */ new Map(), this.dirtyChildren = null, this.dirty = !0, this.recomputing = !1, this.value = [], this.deps = null, ++tn.count;
  }
  peek() {
    if (this.value.length === 1 && !me(this))
      return Yr(this), this.value[0];
  }
  // This is the most important method of the Entry API, because it
  // determines whether the cached this.value can be returned immediately,
  // or must be recomputed. The overall performance of the caching system
  // depends on the truth of the following observations: (1) this.dirty is
  // usually false, (2) this.dirtyChildren is usually null/empty, and thus
  // (3) valueGet(this.value) is usually returned without recomputation.
  recompute(e) {
    return Ue(!this.recomputing, "already recomputing"), Yr(this), me(this) ? Xc(this, e) : Cs(this.value);
  }
  setDirty() {
    this.dirty || (this.dirty = !0, _s(this), hr(this));
  }
  dispose() {
    this.setDirty(), Rs(this), dr(this, (e, t) => {
      e.setDirty(), Fs(e, this);
    });
  }
  forget() {
    this.dispose();
  }
  dependOn(e) {
    e.add(this), this.deps || (this.deps = ht.pop() || /* @__PURE__ */ new Set()), this.deps.add(e);
  }
  forgetDeps() {
    this.deps && (fr(this.deps).forEach((e) => e.delete(this)), this.deps.clear(), ht.push(this.deps), this.deps = null);
  }
}
tn.count = 0;
function Yr(n) {
  const e = en.getValue();
  if (e)
    return n.parents.add(e), e.childValues.has(n) || e.childValues.set(n, []), me(n) ? Ns(e, n) : As(e, n), e;
}
function Xc(n, e) {
  return Rs(n), en.withValue(n, Zc, [n, e]), tu(n, e) && eu(n), Cs(n.value);
}
function Zc(n, e) {
  n.recomputing = !0;
  const { normalizeResult: t } = n;
  let r;
  t && n.value.length === 1 && (r = Ts(n.value)), n.value.length = 0;
  try {
    if (n.value[0] = n.fn.apply(null, e), t && r && !xs(r, n.value))
      try {
        n.value[0] = t(n.value[0], r[0]);
      } catch {
      }
  } catch (i) {
    n.value[1] = i;
  }
  n.recomputing = !1;
}
function me(n) {
  return n.dirty || !!(n.dirtyChildren && n.dirtyChildren.size);
}
function eu(n) {
  n.dirty = !1, !me(n) && Is(n);
}
function _s(n) {
  dr(n, Ns);
}
function Is(n) {
  dr(n, As);
}
function dr(n, e) {
  const t = n.parents.size;
  if (t) {
    const r = fr(n.parents);
    for (let i = 0; i < t; ++i)
      e(r[i], n);
  }
}
function Ns(n, e) {
  Ue(n.childValues.has(e)), Ue(me(e));
  const t = !me(n);
  if (!n.dirtyChildren)
    n.dirtyChildren = ht.pop() || /* @__PURE__ */ new Set();
  else if (n.dirtyChildren.has(e))
    return;
  n.dirtyChildren.add(e), t && _s(n);
}
function As(n, e) {
  Ue(n.childValues.has(e)), Ue(!me(e));
  const t = n.childValues.get(e);
  t.length === 0 ? n.childValues.set(e, Ts(e.value)) : xs(t, e.value) || n.setDirty(), Ds(n, e), !me(n) && Is(n);
}
function Ds(n, e) {
  const t = n.dirtyChildren;
  t && (t.delete(e), t.size === 0 && (ht.length < Kc && ht.push(t), n.dirtyChildren = null));
}
function Rs(n) {
  n.childValues.size > 0 && n.childValues.forEach((e, t) => {
    Fs(n, t);
  }), n.forgetDeps(), Ue(n.dirtyChildren === null);
}
function Fs(n, e) {
  e.parents.delete(n), n.childValues.delete(e), Ds(n, e);
}
function tu(n, e) {
  if (typeof n.subscribe == "function")
    try {
      hr(n), n.unsubscribe = n.subscribe.apply(null, e);
    } catch {
      return n.setDirty(), !1;
    }
  return !0;
}
const nu = {
  setDirty: !0,
  dispose: !0,
  forget: !0
  // Fully remove parent Entry from LRU cache and computation graph
};
function Ps(n) {
  const e = /* @__PURE__ */ new Map();
  function t(r) {
    const i = en.getValue();
    if (i) {
      let s = e.get(r);
      s || e.set(r, s = /* @__PURE__ */ new Set()), i.dependOn(s);
    }
  }
  return t.dirty = function(i, s) {
    const o = e.get(i);
    if (o) {
      const c = s && Jc.call(nu, s) ? s : "setDirty";
      fr(o).forEach((a) => a[c]()), e.delete(i), hr(o);
    }
  }, t;
}
let Jr;
function Ms(...n) {
  return (Jr || (Jr = new ie(typeof WeakMap == "function"))).lookupArray(n);
}
const yn = /* @__PURE__ */ new Set();
function dt(n, { max: e = Math.pow(2, 16), keyArgs: t, makeCacheKey: r = Ms, normalizeResult: i, subscribe: s, cache: o = Ln } = /* @__PURE__ */ Object.create(null)) {
  const c = typeof o == "function" ? new o(e, (f) => f.dispose()) : o, a = function() {
    const f = r.apply(null, t ? t.apply(null, arguments) : arguments);
    if (f === void 0)
      return n.apply(null, arguments);
    let h = c.get(f);
    h || (c.set(f, h = new tn(n)), h.normalizeResult = i, h.subscribe = s, h.forget = () => c.delete(f));
    const p = h.recompute(Array.prototype.slice.call(arguments));
    return c.set(f, h), yn.add(c), en.hasValue() || (yn.forEach((y) => y.clean()), yn.clear()), p;
  };
  Object.defineProperty(a, "size", {
    get: () => c.size,
    configurable: !1,
    enumerable: !1
  }), Object.freeze(a.options = {
    max: e,
    keyArgs: t,
    makeCacheKey: r,
    normalizeResult: i,
    subscribe: s,
    cache: c
  });
  function u(f) {
    const h = f && c.get(f);
    h && h.setDirty();
  }
  a.dirtyKey = u, a.dirty = function() {
    u(r.apply(null, arguments));
  };
  function l(f) {
    const h = f && c.get(f);
    if (h)
      return h.peek();
  }
  a.peekKey = l, a.peek = function() {
    return l(r.apply(null, arguments));
  };
  function d(f) {
    return f ? c.delete(f) : !1;
  }
  return a.forgetKey = d, a.forget = function() {
    return d(r.apply(null, arguments));
  }, a.makeCacheKey = r, a.getKey = t ? function() {
    return r.apply(null, t.apply(null, arguments));
  } : r, Object.freeze(a);
}
function ru(...n) {
  return Ms.bind(null, ...n);
}
class iu {
  constructor() {
    // This code path can never be reached, so we won't implement it.
    g(this, "startRequest");
  }
  isIncrementalResult(e) {
    return !1;
  }
  prepareRequest(e) {
    return A(!Ie(["defer", "stream"], e.query), 67), e;
  }
  extractErrors() {
  }
}
function su(n, { client: e }) {
  const t = {
    query: n.query,
    variables: n.variables || {},
    extensions: n.extensions || {},
    operationName: Be(n.query),
    operationType: le(n.query).operation
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
function ou(n, e) {
  const t = { ...n }, r = new Set(Object.keys(n));
  return re(e, {
    Variable(i, s, o) {
      o && o.kind !== "VariableDefinition" && r.delete(i.name.value);
    }
  }), r.forEach((i) => {
    delete t[i];
  }), t;
}
class $ {
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
    return new $(() => ut);
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
      return $.empty();
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
  static split(e, t, r = new $((i, s) => s(i))) {
    const i = new $((s, o) => e(s) ? t.request(s, o) : r.request(s, o));
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
    return e.request(su(t, r), () => ut);
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
    return $.from(e);
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
    return this.concat($.split(e, t, r));
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
    const r = new $((i, s) => e.request(i, (o) => t.request(o, s)));
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
    throw Y(65);
  }
}
const Wn = $.execute;
function au(n) {
  return n;
}
class se {
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
    return new se(au, { cache: !1 });
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
  static split(e, t, r = se.identity()) {
    return Object.assign(new se(
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
      const e = new ie();
      this.performWork = dt(se.prototype.performWork.bind(this), {
        makeCacheKey: (t) => {
          const r = this.getCacheKey(t);
          if (r)
            return A(Array.isArray(r), 20), e.lookupArray(r);
        },
        max: ue["documentTransform.cache"],
        cache: Vt
      });
    }
  }
  performWork(e) {
    return de(e), this.transform(e);
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
    return Object.assign(new se(
      (t) => e.transformDocument(this.transformDocument(t)),
      // Reasonably assume both transforms handle their own caching
      { cache: !1 }
    ), {
      left: this,
      right: e
    });
  }
}
let vn;
const Fe = Object.assign((n) => {
  let e = vn.get(n);
  return e || (e = aa(n), vn.set(n, e)), e;
}, {
  reset() {
    vn = new cr(
      ue.print || 2e3
      /* defaultCacheSizes.print */
    );
  }
});
Fe.reset();
function F(n) {
  return !!(n && typeof n == "object" && typeof n.__ref == "string");
}
const Kr = {
  kind: S.FIELD,
  name: {
    kind: S.NAME,
    value: "__typename"
  }
}, Ls = Object.assign(function(n) {
  return re(n, {
    SelectionSet: {
      enter(e, t, r) {
        if (r && r.kind === S.OPERATION_DEFINITION)
          return;
        const { selections: i } = e;
        if (!i || i.some((c) => c.kind === S.FIELD && (c.name.value === "__typename" || c.name.value.lastIndexOf("__", 0) === 0)))
          return;
        const o = r;
        if (!(o.kind === S.FIELD && o.directives && o.directives.some((c) => c.name.value === "export")))
          return {
            ...e,
            selections: [...i, Kr]
          };
      }
    }
  });
}, {
  added(n) {
    return n === Kr;
  }
});
function js(n, e) {
  var t;
  return ((t = le(n)) == null ? void 0 : t.operation) === e;
}
function cu(n) {
  return js(n, "mutation");
}
function uu(n) {
  return js(n, "subscription");
}
function Vs(n) {
  return n === 7 || n === 8;
}
function Rt(n) {
  return !Vs(n);
}
class lu {
  constructor() {
    g(this, "assumeImmutableResults", !1);
    g(this, "fragmentWatches", new ie(!0));
    /**
     * Can be overridden by subclasses to delay calling the provided callback
     * until after all broadcasts have been completed - e.g. in a cache scenario
     * where many watchers are notified in parallel.
     */
    g(this, "onAfterBroadcast", (e) => e());
    // Make sure we compute the same (===) fragment query document every
    // time we receive the same fragment in readFragment.
    g(this, "getFragmentDoc", dt(Oc, {
      max: ue["cache.fragmentQueryDocuments"] || 1e3,
      cache: Vt,
      makeCacheKey: ru(this)
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
    const { fragment: t, fragmentName: r, from: i } = e, s = this.getFragmentDoc(t, r), c = (Array.isArray(i) ? i : [i]).map((h) => h == null ? h : this.toCacheId(h));
    if (!Array.isArray(i)) {
      const h = this.watchSingleFragment(c[0], s, e);
      return i === null ? h : Qc(h, Symbol.for("apollo.transform.individualResult"), (p) => ({
        ...p,
        data: p.data ?? {}
      }));
    }
    let a;
    function u(h) {
      const p = h.reduce((y, m, v) => (y.data.push(m.data), y.complete && (y.complete = m.complete), y.dataState = y.complete ? "complete" : "partial", m.missing && (y.missing || (y.missing = {}), y.missing[v] = m.missing), y), {
        data: [],
        dataState: "complete",
        complete: !0
      });
      return D(a, p) || (a = p), a;
    }
    if (c.length === 0)
      return hu;
    let l = !1;
    const d = c.map((h) => this.watchSingleFragment(h, s, e)), f = Ec(d).pipe(he(u), ft({
      subscribe: () => l = !0,
      unsubscribe: () => l = !1
    }), ir({ bufferSize: 1, refCount: !0 }));
    return Object.assign(f, {
      getCurrentResult: () => {
        if (l && a)
          return a;
        const h = d.map((p) => p.getCurrentResult());
        return u(h);
      }
    });
  }
  watchSingleFragment(e, t, r) {
    if (e === null)
      return fu;
    const { optimistic: i = !0, variables: s } = r, o = [
      t,
      ae({ id: e, optimistic: i, variables: s })
    ], c = this.fragmentWatches.lookupArray(o);
    if (!c.observable) {
      let l = function(f) {
        const h = f.result;
        return (!u || !ks(t, { data: u.data }, { data: h }, r.variables)) && (u = {
          data: h,
          dataState: f.complete ? "complete" : "partial",
          complete: f.complete
        }, f.missing && (u.missing = f.missing.missing)), u;
      }, a = !1, u;
      const d = new M((f) => {
        a = !0;
        const h = this.watch({
          variables: s,
          returnPartialData: !0,
          id: e,
          query: t,
          optimistic: i,
          immediate: !0,
          callback: (p) => {
            d.dirty = !0, this.onAfterBroadcast(() => {
              f.next(l(p)), d.dirty = !1;
            });
          }
        });
        return () => {
          a = !1, h(), this.fragmentWatches.removeArray(o);
        };
      }).pipe(rc(), lt({
        connector: () => new Qi(1),
        // debounce so a synchronous unsubscribe+resubscribe doesn't tear down the watch and create a new one
        resetOnRefCountZero: () => nc(0)
      }));
      c.observable = Object.assign(d, {
        dirty: !1,
        getCurrentResult: () => a && u ? u : l(this.diff({
          id: e,
          query: t,
          returnPartialData: !0,
          optimistic: i,
          variables: s
        }))
      });
    }
    return c.observable;
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
const Xr = Object.freeze({
  data: null,
  dataState: "complete",
  complete: !0
}), fu = Object.assign(new M((n) => {
  n.next(Xr);
}), { dirty: !1, getCurrentResult: () => Xr }), Zr = Object.freeze({
  data: [],
  dataState: "complete",
  complete: !0
}), hu = Object.assign(new M((n) => {
  n.next(Zr);
}), { getCurrentResult: () => Zr });
class pr extends Error {
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
    this.__proto__ = pr.prototype;
  }
}
const { hasOwnProperty: W } = Object.prototype;
function Bs({ __typename: n, id: e, _id: t }, r) {
  if (typeof n == "string" && (r && (r.keyObject = e != null ? { id: e } : t != null ? { _id: t } : void 0), e == null && t != null && (e = t), e != null))
    return `${n}:${typeof e == "number" || typeof e == "string" ? e : JSON.stringify(e)}`;
}
const du = {
  dataIdFromObject: Bs,
  resultCaching: !0
};
function pu(n) {
  return G(du, n);
}
const qs = /^[_a-z][_0-9a-z]*/i;
function We(n) {
  const e = n.match(qs);
  return e ? e[0] : n;
}
function zn(n, e, t) {
  return Q(e) ? B(e) ? e.every((r) => zn(n, r, t)) : n.selections.every((r) => {
    if (gt(r) && Xt(r, t)) {
      const i = Qe(r);
      return W.call(e, i) && (!r.selectionSet || zn(r.selectionSet, e[i], t));
    }
    return !0;
  }) : !1;
}
function Ne(n) {
  return Q(n) && !F(n) && !B(n);
}
function mu() {
  return new qe();
}
function Us(n, e) {
  const t = yt(vt(n));
  return {
    fragmentMap: t,
    lookupFragment(r) {
      let i = t[r];
      return !i && e && (i = e.lookup(r)), i || null;
    }
  };
}
const Ft = {}, gn = () => Ft, ei = {};
class nn {
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
    g(this, "getFieldValue", (e, t) => F(e) ? this.get(e.__ref, t) : e && e[t]);
    // Returns true for non-normalized StoreObjects and non-dangling
    // References, indicating that readField(name, objOrRef) has a chance of
    // working. Useful for filtering out dangling references from lists.
    g(this, "canRead", (e) => F(e) ? this.has(e.__ref) : typeof e == "object");
    // Bound function that converts an id or an object with a __typename and
    // primary key fields to a Reference object. If called with a Reference object,
    // that same Reference object is returned. Pass true for mergeIntoStore to persist
    // an object into the store.
    g(this, "toReference", (e, t) => {
      if (typeof e == "string")
        return Re(e);
      if (F(e))
        return e;
      const [r] = this.policies.identify(e);
      if (r) {
        const i = Re(r);
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
    if (this.group.depend(e, t), W.call(this.data, e)) {
      const r = this.data[e];
      if (r && W.call(r, t))
        return r[t];
    }
    if (t === "__typename" && W.call(this.policies.rootTypenamesById, e))
      return this.policies.rootTypenamesById[e];
    if (this instanceof ne)
      return this.parent.get(e, t);
  }
  lookup(e, t) {
    if (t && this.group.depend(e, "__exists"), W.call(this.data, e))
      return this.data[e];
    if (this instanceof ne)
      return this.parent.lookup(e, t);
    if (this.policies.rootTypenamesById[e])
      return {};
  }
  merge(e, t) {
    let r;
    F(e) && (e = e.__ref), F(t) && (t = t.__ref);
    const i = typeof e == "string" ? this.lookup(r = e) : e, s = typeof t == "string" ? this.lookup(r = t) : t;
    if (!s)
      return;
    A(typeof r == "string", 99);
    const o = new qe({
      reconciler: gu
    }).merge(i, s);
    if (this.data[r] = o, o !== i && (delete this.refs[r], this.group.caching)) {
      const c = {};
      i || (c.__exists = 1), Object.keys(s).forEach((a) => {
        if (!i || i[a] !== o[a]) {
          c[a] = 1;
          const u = We(a);
          u !== a && !this.policies.hasKeyArgs(o.__typename, u) && (c[u] = 1), o[a] === void 0 && !(this instanceof ne) && delete o[a];
        }
      }), c.__typename && !(i && i.__typename) && // Since we return default root __typename strings
      // automatically from store.get, we don't need to dirty the
      // ROOT_QUERY.__typename field if merged.__typename is equal
      // to the default string (usually "Query").
      this.policies.rootTypenamesById[r] === o.__typename && delete c.__typename, Object.keys(c).forEach((a) => this.group.dirty(r, a));
    }
  }
  modify(e, t, r) {
    const i = this.lookup(e);
    if (i) {
      const s = {};
      let o = !1, c = !0;
      const a = {
        DELETE: Ft,
        INVALIDATE: ei,
        isReference: F,
        toReference: this.toReference,
        canRead: this.canRead,
        readField: (u, l) => this.policies.readField(typeof u == "string" ? {
          fieldName: u,
          from: l || Re(e)
        } : u, { store: this })
      };
      if (Object.keys(i).forEach((u) => {
        const l = We(u);
        let d = i[u];
        if (d === void 0)
          return;
        const f = typeof t == "function" ? t : t[u] || (r ? void 0 : t[l]);
        if (f) {
          let h = f === gn ? Ft : f(d, {
            ...a,
            fieldName: l,
            storeFieldName: u,
            storage: this.getStorage(e, u)
          });
          h === ei ? this.group.dirty(e, u) : (h === Ft && (h = void 0), h !== d && (s[u] = h, o = !0, d = h));
        }
        d !== void 0 && (c = !1);
      }), o)
        return this.merge(e, s), c && (this instanceof ne ? this.data[e] = void 0 : delete this.data[e], this.group.dirty(e, "__exists")), !0;
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
        [o]: gn
      } : gn, !!r);
    }
    return !1;
  }
  evict(e, t) {
    let r = !1;
    return e.id && (W.call(this.data, e.id) && (r = this.delete(e.id, e.fieldName, e.args)), this instanceof ne && this !== t && (r = this.parent.evict(e, t) || r), (e.fieldName || r) && this.group.dirty(e.id, e.fieldName || "__exists")), r;
  }
  clear() {
    this.replace(null);
  }
  extract() {
    const e = this.toObject(), t = [];
    return this.getRootIdSet().forEach((r) => {
      W.call(this.policies.rootTypenamesById, r) || t.push(r);
    }), t.length && (e.__META = { extraRootIds: t.sort() }), e;
  }
  replace(e) {
    if (Object.keys(this.data).forEach((t) => {
      e && W.call(e, t) || this.delete(t);
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
    return Object.keys(this.rootIds).forEach(e.add, e), this instanceof ne ? this.parent.getRootIdSet(e) : Object.keys(this.policies.rootTypenamesById).forEach(e.add, e), e;
  }
  // The goal of garbage collection is to remove IDs from the Root layer of the
  // store that are no longer reachable starting from any IDs that have been
  // explicitly retained (see retain and release, above). Returns an array of
  // dataId strings that were removed from the store.
  gc() {
    const e = this.getRootIdSet(), t = this.toObject();
    e.forEach((i) => {
      W.call(t, i) && (Object.keys(this.findChildRefIds(i)).forEach(e.add, e), delete t[i]);
    });
    const r = Object.keys(t);
    if (r.length) {
      let i = this;
      for (; i instanceof ne; )
        i = i.parent;
      r.forEach((s) => i.delete(s));
    }
    return r;
  }
  findChildRefIds(e) {
    if (!W.call(this.refs, e)) {
      const t = this.refs[e] = {}, r = this.data[e];
      if (!r)
        return t;
      const i = /* @__PURE__ */ new Set([r]);
      i.forEach((s) => {
        F(s) && (t[s.__ref] = !0), Q(s) && Object.keys(s).forEach((o) => {
          const c = s[o];
          Q(c) && i.add(c);
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
class Ws {
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
    this.d = this.caching ? Ps() : null, this.keyMaker = new ie();
  }
  depend(e, t) {
    if (this.d) {
      this.d(bn(e, t));
      const r = We(t);
      r !== t && this.d(bn(e, r)), this.parent && this.parent.depend(e, t);
    }
  }
  dirty(e, t) {
    this.d && this.d.dirty(
      bn(e, t),
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
function bn(n, e) {
  return e + "#" + n;
}
function ti(n, e) {
  rt(n) && n.group.depend(e, "__exists");
}
class yu extends nn {
  constructor({ policies: t, resultCaching: r = !0, seed: i }) {
    super(t, new Ws(r));
    g(this, "stump", new vu(this));
    g(this, "storageTrie", new ie());
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
nn.Root = yu;
class ne extends nn {
  constructor(t, r, i, s) {
    super(r.policies, s);
    g(this, "id");
    g(this, "parent");
    g(this, "replay");
    g(this, "group");
    this.id = t, this.parent = r, this.replay = i, this.group = s, i(this);
  }
  addLayer(t, r) {
    return new ne(t, this, r, this.group);
  }
  removeLayer(t) {
    const r = this.parent.removeLayer(t);
    return t === this.id ? (this.group.caching && Object.keys(this.data).forEach((i) => {
      const s = this.data[i], o = r.lookup(i);
      o ? s ? s !== o && Object.keys(s).forEach((c) => {
        D(s[c], o[c]) || this.group.dirty(i, c);
      }) : (this.group.dirty(i, "__exists"), Object.keys(o).forEach((c) => {
        this.group.dirty(i, c);
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
    return W.call(this.data, t) ? {
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
class vu extends ne {
  constructor(e) {
    super("EntityStore.Stump", e, () => {
    }, new Ws(e.group.caching, e.group));
  }
  removeLayer() {
    return this;
  }
  merge(e, t) {
    return this.parent.merge(e, t);
  }
}
function gu(n, e, t) {
  const r = n[t], i = e[t];
  return D(r, i) ? r : i;
}
function rt(n) {
  return !!(n && n.supportsResultCaching);
}
const zs = new Zt();
function bu(n) {
  var r, i;
  const e = (r = n.directives) == null ? void 0 : r.find(({ name: s }) => s.value === "unmask");
  if (!e)
    return "mask";
  const t = (i = e.arguments) == null ? void 0 : i.find(({ name: s }) => s.value === "mode");
  return t && "value" in t.value && t.value.value === "migrate" ? "migrate" : "unmask";
}
function $s(n, e, t) {
  return zs.withValue(!0, () => tt(n, e, t, !1));
}
function wu(n, e) {
  if (e.has(n))
    return e.get(n);
  const t = Array.isArray(n) ? [] : {};
  return e.set(n, t), t;
}
function tt(n, e, t, r, i) {
  const { knownChanged: s } = t, o = wu(n, t.mutableTargets);
  if (Array.isArray(n)) {
    for (const [c, a] of Array.from(n.entries())) {
      if (a === null) {
        o[c] = null;
        continue;
      }
      const u = tt(a, e, t, r);
      s.has(u) && s.add(o), o[c] = u;
    }
    return s.has(o) ? o : n;
  }
  for (const c of e.selections) {
    let a;
    if (r && s.add(o), c.kind === S.FIELD) {
      const u = Qe(c), l = c.selectionSet;
      if (a = o[u] || n[u], a === void 0)
        continue;
      if (l && a !== null) {
        const d = tt(n[u], l, t, r);
        s.has(d) && (a = d);
      }
      o[u] = a;
    }
    if (c.kind === S.INLINE_FRAGMENT && (!c.typeCondition || t.cache.fragmentMatches(c, n.__typename)) && (a = tt(n, c.selectionSet, t, r)), c.kind === S.FRAGMENT_SPREAD) {
      const u = c.name.value, l = t.fragmentMap[u] || (t.fragmentMap[u] = t.cache.lookupFragment(u));
      A(l, 39, u);
      const d = bu(c);
      d !== "mask" && (a = tt(n, l.selectionSet, t, d === "migrate"));
    }
    s.has(a) && s.add(o);
  }
  return "__typename" in n && !("__typename" in o) && (o.__typename = n.__typename), Object.keys(o).length !== Object.keys(n).length && s.add(o), s.has(o) ? o : n;
}
function Eu(n, e, t, r) {
  const i = e.definitions.filter((o) => o.kind === S.FRAGMENT_DEFINITION);
  typeof r > "u" && (A(i.length === 1, 41, i.length), r = i[0].name.value);
  const s = i.find((o) => o.name.value === r);
  return A(!!s, 42, r), n == null || D(n, {}) ? n : $s(n, s.selectionSet, {
    operationName: s.name.value,
    fragmentMap: yt(vt(e)),
    cache: t,
    mutableTargets: /* @__PURE__ */ new WeakMap(),
    knownChanged: /* @__PURE__ */ new WeakSet()
  });
}
function ku(n, e, t) {
  var i;
  const r = le(e);
  return A(r, 43), n == null ? n : $s(n, r.selectionSet, {
    operationType: r.operation,
    operationName: (i = r.name) == null ? void 0 : i.value,
    fragmentMap: yt(vt(e)),
    cache: t,
    mutableTargets: /* @__PURE__ */ new WeakMap(),
    knownChanged: /* @__PURE__ */ new WeakSet()
  });
}
const ni = {};
function mr(n) {
  const e = JSON.stringify(n);
  return ni[e] || (ni[e] = {});
}
function ri(n) {
  const e = mr(n);
  return e.keyFieldsFn || (e.keyFieldsFn = (t, r) => {
    const i = (o, c) => r.readField(c, o), s = r.keyObject = yr(n, (o) => {
      let c = Pe(
        r.storeObject,
        o,
        // Using context.readField to extract paths from context.storeObject
        // allows the extraction to see through Reference objects and respect
        // custom read functions.
        i
      );
      return c === void 0 && t !== r.storeObject && W.call(t, o[0]) && (c = Pe(t, o, Hs)), A(c !== void 0, 102, o.join("."), t), c;
    });
    return `${r.typename}:${JSON.stringify(s)}`;
  });
}
function ii(n) {
  const e = mr(n);
  return e.keyArgsFn || (e.keyArgsFn = (t, { field: r, variables: i, fieldName: s }) => {
    const o = yr(n, (a) => {
      const u = a[0], l = u.charAt(0);
      if (l === "@") {
        if (r && lr(r.directives)) {
          const d = u.slice(1), f = r.directives.find((p) => p.name.value === d), h = f && ar(f, i);
          return h && Pe(
            h,
            // If keyPath.length === 1, this code calls extractKeyPath with an
            // empty path, which works because it uses directiveArgs as the
            // extracted value.
            a.slice(1)
          );
        }
        return;
      }
      if (l === "$") {
        const d = u.slice(1);
        if (i && W.call(i, d)) {
          const f = a.slice(0);
          return f[0] = d, Pe(i, f);
        }
        return;
      }
      if (t)
        return Pe(t, a);
    }), c = JSON.stringify(o);
    return (t || c !== "{}") && (s += ":" + c), s;
  });
}
function yr(n, e) {
  const t = new qe();
  return Qs(n).reduce((r, i) => {
    let s = e(i);
    if (s !== void 0) {
      for (let o = i.length - 1; o >= 0; --o)
        s = { [i[o]]: s };
      r = t.merge(r, s);
    }
    return r;
  }, {});
}
function Qs(n) {
  const e = mr(n);
  if (!e.paths) {
    const t = e.paths = [], r = [];
    n.forEach((i, s) => {
      B(i) ? (Qs(i).forEach((o) => t.push(r.concat(o))), r.length = 0) : (r.push(i), B(n[s + 1]) || (t.push(r.slice(0)), r.length = 0));
    });
  }
  return e.paths;
}
function Hs(n, e) {
  return n[e];
}
function Pe(n, e, t) {
  return t = t || Hs, Gs(e.reduce(function r(i, s) {
    return B(i) ? i.map((o) => r(o, s)) : i && t(i, s);
  }, n));
}
function Gs(n) {
  return Q(n) ? B(n) ? n.map(Gs) : yr(Object.keys(n).sort(), (e) => Pe(n, e)) : n;
}
const Ys = new Zt(), si = /* @__PURE__ */ new WeakMap();
function it(n) {
  let e = si.get(n);
  return e || si.set(n, e = {
    vars: /* @__PURE__ */ new Set(),
    dep: Ps()
  }), e;
}
function oi(n) {
  it(n).vars.forEach((e) => e.forgetCache(n));
}
function Su(n) {
  it(n).vars.forEach((e) => e.attachCache(n));
}
function Ou(n) {
  const e = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set(), r = function(s) {
    if (arguments.length > 0) {
      if (n !== s) {
        n = s, e.forEach((c) => {
          it(c).dep.dirty(r), xu(c);
        });
        const o = Array.from(t);
        t.clear(), o.forEach((c) => c(n));
      }
    } else {
      const o = Ys.getValue();
      o && (i(o), it(o).dep(r));
    }
    return n;
  };
  r.onNextChange = (s) => (t.add(s), () => {
    t.delete(s);
  });
  const i = r.attachCache = (s) => (e.add(s), it(s).vars.add(r), r);
  return r.forgetCache = (s) => e.delete(s), r;
}
function xu(n) {
  n.broadcastWatches && n.broadcastWatches();
}
function $n(n) {
  return n.args !== void 0 ? n.args : n.field ? ar(n.field, n.variables) : null;
}
const Cu = () => {
}, ai = (n, e) => e.fieldName, ci = (n, e, { mergeObjects: t }) => t(n, e), ui = (n, e) => e, Tu = (n, e, { streamFieldInfo: t, existingData: r }) => {
  if (!n && !r)
    return e;
  const i = [], s = n ?? r, o = t != null && t.isLastChunk ? e.length : Math.max(s.length, e.length);
  for (let c = 0; c < o; c++)
    i[c] = e[c] === void 0 ? s[c] : e[c];
  return i;
};
class _u {
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
      dataIdFromObject: Bs,
      ...e
    }, this.cache = this.config.cache, this.setRootTypename("Query"), this.setRootTypename("Mutation"), this.setRootTypename("Subscription"), e.possibleTypes && this.addPossibleTypes(e.possibleTypes), e.typePolicies && this.addTypePolicies(e.typePolicies);
  }
  identify(e, t) {
    var l;
    const r = this, i = t && (t.typename || ((l = t.storeObject) == null ? void 0 : l.__typename)) || e.__typename;
    if (i === this.rootTypenamesById.ROOT_QUERY)
      return ["ROOT_QUERY"];
    const s = t && t.storeObject || e, o = {
      ...t,
      typename: i,
      storeObject: s,
      readField: t && t.readField || ((...d) => {
        const f = vr(d, s);
        return r.readField(f, {
          store: r.cache.data,
          variables: f.variables
        });
      })
    };
    let c;
    const a = i && this.getTypePolicy(i);
    let u = a && a.keyFn || this.config.dataIdFromObject;
    return zs.withValue(!0, () => {
      for (; u; ) {
        const d = u({ ...e, ...s }, o);
        if (B(d))
          u = ri(d);
        else {
          c = d;
          break;
        }
      }
    }), c = c ? String(c) : void 0, o.keyObject ? [c, o.keyObject] : [c];
  }
  addTypePolicies(e) {
    Object.keys(e).forEach((t) => {
      const { queryType: r, mutationType: i, subscriptionType: s, ...o } = e[t];
      r && this.setRootTypename("Query", t), i && this.setRootTypename("Mutation", t), s && this.setRootTypename("Subscription", t), W.call(this.toBeAdded, t) ? this.toBeAdded[t].push(o) : this.toBeAdded[t] = [o];
    });
  }
  updateTypePolicy(e, t, r) {
    const i = this.getTypePolicy(e), { keyFields: s, fields: o } = t;
    function c(a, u) {
      a.merge = typeof u == "function" ? u : u === !0 ? ci : u === !1 ? ui : a.merge;
    }
    c(i, t.merge), i.keyFn = // Pass false to disable normalization for this typename.
    s === !1 ? Cu : B(s) ? ri(s) : typeof s == "function" ? s : i.keyFn, o && Object.keys(o).forEach((a) => {
      let u = r[a];
      (!u || (u == null ? void 0 : u.typename) !== e) && (u = r[a] = { typename: e });
      const l = o[a];
      if (typeof l == "function")
        u.read = l;
      else {
        const { keyArgs: d, read: f, merge: h } = l;
        u.keyFn = // Pass false to disable argument-based differentiation of
        // field identities.
        d === !1 ? ai : B(d) ? ii(d) : typeof d == "function" ? d : u.keyFn, typeof f == "function" && (u.read = f), c(u, h);
      }
      u.read && u.merge && (u.keyFn = u.keyFn || ai);
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
        const i = r.match(qs);
        (!i || i[0] !== r) && this.fuzzySubtypes.set(r, new RegExp(r));
      });
    });
  }
  getTypePolicy(e) {
    if (!W.call(this.typePolicies, e)) {
      const r = this.typePolicies[e] = {};
      r.fields = {};
      let i = this.supertypeMap.get(e);
      !i && this.fuzzySubtypes.size && (i = this.getSupertypeSet(e, !0), this.fuzzySubtypes.forEach((s, o) => {
        if (s.test(e)) {
          const c = this.supertypeMap.get(o);
          c && c.forEach((a) => i.add(a));
        }
      })), i && i.size && i.forEach((s) => {
        const { fields: o, ...c } = this.getTypePolicy(s);
        Object.assign(r, c), Object.assign(r.fields, o);
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
      const o = this.getSupertypeSet(t, !0), c = [o], a = (l) => {
        const d = this.getSupertypeSet(l, !1);
        d && d.size && c.indexOf(d) < 0 && c.push(d);
      };
      let u = !!(r && this.fuzzySubtypes.size);
      for (let l = 0; l < c.length; ++l) {
        const d = c[l];
        if (d.has(s))
          return o.has(s) || o.add(s), !0;
        d.forEach(a), u && // Start checking fuzzy subtypes only after exhausting all
        // non-fuzzy subtypes (after the final iteration of the loop).
        l === c.length - 1 && // We could wait to compare fragment.selectionSet to result
        // after we verify the supertype, but this check is often less
        // expensive than that search, and we will have to do the
        // comparison anyway whenever we find a potential match.
        zn(e.selectionSet, r, i) && (u = !1, this.fuzzySubtypes.forEach((f, h) => {
          const p = t.match(f);
          p && p[0] === t && a(h);
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
      const c = {
        typename: t,
        fieldName: r,
        field: e.field || null,
        variables: e.variables
      }, a = $n(e);
      for (; o; ) {
        const u = o(a, c);
        if (B(u))
          o = ii(u);
        else {
          s = u || r;
          break;
        }
      }
    }
    return s === void 0 && (s = e.field ? Vc(e.field, e.variables) : ws(r, $n(e))), s === !1 ? r : r === We(s) ? s : r + ":" + s;
  }
  readField(e, t) {
    const r = e.from;
    if (!r || !(e.field || e.fieldName))
      return;
    if (e.typename === void 0) {
      const l = t.store.getFieldValue(r, "__typename");
      l && (e.typename = l);
    }
    const s = this.getStoreFieldName(e), o = We(s), c = t.store.getFieldValue(r, s), a = this.getFieldPolicy(e.typename, o), u = a && a.read;
    if (u) {
      const l = Js(this, r, e, t, t.store.getStorage(F(r) ? r.__ref : r, s));
      return Ys.withValue(this.cache, u, [
        c,
        l
      ]);
    }
    return c;
  }
  getReadFunction(e, t) {
    const r = this.getFieldPolicy(e, t);
    return r && r.read;
  }
  getMergeFunction(e, t, r) {
    let i = this.getFieldPolicy(e, t), s = i && i.merge;
    return !s && r && (i = this.getTypePolicy(r), s = i && i.merge), s;
  }
  runMergeFunction(e, t, { field: r, typename: i, merge: s, path: o }, c, a) {
    var f, h, p;
    const u = e;
    if (s === ci)
      return Ks(c.store)(e, t);
    if (s === ui)
      return t;
    c.overwrite && (e = void 0);
    const l = (p = (h = (f = c.extensions) == null ? void 0 : f[pe]) == null ? void 0 : h.deref()) == null ? void 0 : p.peekArray(o);
    if (l) {
      const { current: y, previous: m } = l;
      if (m && D(m.incoming, t) && D(m.streamFieldInfo, y))
        return m.result;
    }
    const d = s(e, t, Iu(
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
        variables: c.variables,
        path: o
      },
      c,
      a || {},
      u
    ));
    return l && (l.previous = {
      incoming: t,
      streamFieldInfo: l.current,
      result: d
    }), d;
  }
}
function Js(n, e, t, r, i) {
  const s = n.getStoreFieldName(t), o = We(s), c = t.variables || r.variables, { toReference: a, canRead: u } = r.store;
  return {
    args: $n(t),
    field: t.field || null,
    fieldName: o,
    storeFieldName: s,
    variables: c,
    isReference: F,
    toReference: a,
    storage: i,
    cache: n.cache,
    canRead: u,
    readField(...l) {
      return n.readField(vr(l, e, c), r);
    },
    mergeObjects: Ks(r.store)
  };
}
function Iu(n, e, t, r, i, s) {
  var a;
  const o = {
    ...Js(n, e, t, r, i),
    extensions: r.extensions,
    existingData: s
  }, c = r.extensions;
  if (c && pe in c) {
    const { [pe]: u, ...l } = c, d = (a = u == null ? void 0 : u.deref()) == null ? void 0 : a.peekArray(t.path);
    d && (o.streamFieldInfo = d.current), o.extensions = Object.keys(l).length === 0 ? void 0 : l;
  }
  return o;
}
function vr(n, e, t) {
  const { 0: r, 1: i, length: s } = n;
  let o;
  return typeof r == "string" ? o = {
    fieldName: r,
    // Default to objectOrReference only when no second argument was
    // passed for the from parameter, not when undefined is explicitly
    // passed as the second argument.
    from: s > 1 ? i : e
  } : (o = { ...r }, W.call(o, "from") || (o.from = e)), o.variables === void 0 && (o.variables = t), o;
}
function Ks(n) {
  return function(t, r) {
    if (B(t) || B(r))
      throw Y(106);
    if (Q(t) && Q(r)) {
      const i = n.getFieldValue(t, "__typename"), s = n.getFieldValue(r, "__typename");
      if (i && s && i !== s)
        return r;
      if (F(t) && Ne(r))
        return n.merge(t.__ref, r), t;
      if (Ne(t) && F(r))
        return n.merge(t, r.__ref), r;
      if (Ne(t) && Ne(r))
        return { ...t, ...r };
    }
    return r;
  };
}
function li(n) {
  return [n.selectionSet, n.objectOrReference, n.context];
}
class Nu {
  constructor(e) {
    // cached version of executeSelectionSet
    g(this, "executeSelectionSet");
    // cached version of executeSubSelectedArray
    g(this, "executeSubSelectedArray");
    g(this, "config");
    g(this, "knownResults", /* @__PURE__ */ new WeakMap());
    this.config = e, this.executeSelectionSet = dt((t) => {
      const r = li(t), i = this.executeSelectionSet.peek(...r);
      return i || (ti(t.context.store, t.enclosingRef.__ref), this.execSelectionSetImpl(t));
    }, {
      max: ue["inMemoryCache.executeSelectionSet"] || 5e4,
      keyArgs: li,
      // Note that the parameters of makeCacheKey are determined by the
      // array returned by keyArgs.
      makeCacheKey(t, r, i) {
        if (rt(i.store))
          return i.store.makeCacheKey(t, F(r) ? r.__ref : r, i.varString);
      }
    }), this.executeSubSelectedArray = dt((t) => (ti(t.context.store, t.enclosingRef.__ref), this.execSubSelectedArrayImpl(t)), {
      max: ue["inMemoryCache.executeSubSelectedArray"] || 1e4,
      makeCacheKey({ field: t, array: r, context: i }) {
        if (rt(i.store))
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
      ...ur(Cc(t)),
      ...i
    };
    const c = Re(r), a = this.executeSelectionSet({
      selectionSet: bs(t).selectionSet,
      objectOrReference: c,
      enclosingRef: c,
      context: {
        store: e,
        query: t,
        policies: o,
        variables: i,
        varString: ae(i),
        ...Us(t, this.config.fragments)
      }
    });
    let u;
    a.missing && (u = new pr(Au(a.missing), a.missing, t, i));
    const l = !u, { result: d } = a;
    return {
      result: l ? d : s ? Object.keys(d).length === 0 ? null : d : null,
      complete: l,
      missing: u
    };
  }
  isFresh(e, t, r, i) {
    if (rt(i.store) && this.knownResults.get(e) === r) {
      const s = this.executeSelectionSet.peek(r, t, i);
      if (s && e === s.result)
        return !0;
    }
    return !1;
  }
  // Uncached version of executeSelectionSet.
  execSelectionSetImpl({ selectionSet: e, objectOrReference: t, enclosingRef: r, context: i }) {
    if (F(t) && !i.policies.rootTypenamesById[t.__ref] && !i.store.has(t.__ref))
      return {
        result: {},
        missing: `Dangling reference to missing ${t.__ref} object`
      };
    const { variables: s, policies: o, store: c } = i, a = c.getFieldValue(t, "__typename"), u = [];
    let l;
    const d = new qe();
    typeof a == "string" && !o.rootIdsByTypename[a] && u.push({ __typename: a });
    function f(v, b) {
      return v.missing && (l = d.merge(l, {
        [b]: v.missing
      })), v.result;
    }
    const h = new Set(e.selections);
    h.forEach((v) => {
      if (Xt(v, s))
        if (gt(v)) {
          let b = o.readField({
            fieldName: v.name.value,
            field: v,
            variables: i.variables,
            from: t
          }, i);
          const E = Qe(v);
          b === void 0 ? Ls.added(v) || (l = d.merge(l, {
            [E]: `Can't find field '${v.name.value}' on ${F(t) ? t.__ref + " object" : "object " + JSON.stringify(t, null, 2)}`
          })) : B(b) ? b.length > 0 && (b = f(this.executeSubSelectedArray({
            field: v,
            array: b,
            enclosingRef: r,
            context: i
          }), E)) : v.selectionSet && b != null && (b = f(this.executeSelectionSet({
            selectionSet: v.selectionSet,
            objectOrReference: b,
            enclosingRef: F(b) ? b : r,
            context: i
          }), E)), b !== void 0 && u.push({ [E]: b });
        } else {
          const b = Kt(v, i.lookupFragment);
          if (!b && v.kind === S.FRAGMENT_SPREAD)
            throw Y(107, v.name.value);
          b && o.fragmentMatches(b, a) && b.selectionSet.selections.forEach(h.add, h);
        }
    });
    const y = { result: Dc(u), missing: l }, m = y;
    return m.result && this.knownResults.set(m.result, e), m;
  }
  // Uncached version of executeSubSelectedArray.
  execSubSelectedArrayImpl({ field: e, array: t, enclosingRef: r, context: i }) {
    let s, o = new qe();
    function c(a, u) {
      return a.missing && (s = o.merge(s, { [u]: a.missing })), a.result;
    }
    return e.selectionSet && (t = t.filter((a) => a === void 0 || i.store.canRead(a))), t = t.map((a, u) => a === null ? null : B(a) ? c(this.executeSubSelectedArray({
      field: e,
      array: a,
      enclosingRef: r,
      context: i
    }), u) : e.selectionSet ? c(this.executeSelectionSet({
      selectionSet: e.selectionSet,
      objectOrReference: a,
      enclosingRef: F(a) ? a : r,
      context: i
    }), u) : a), {
      result: t,
      missing: s
    };
  }
}
function Au(n) {
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
function wn(n, e, t) {
  const r = `${e}${t}`;
  let i = n.flavors.get(r);
  return i || n.flavors.set(r, i = n.clientOnly === e && n.deferred === t ? n : {
    ...n,
    clientOnly: e,
    deferred: t
  }), i;
}
class Du {
  constructor(e, t, r) {
    g(this, "cache");
    g(this, "reader");
    g(this, "fragments");
    this.cache = e, this.reader = t, this.fragments = r;
  }
  writeToStore(e, { query: t, result: r, dataId: i, variables: s, overwrite: o, extensions: c }) {
    const a = le(t), u = mu();
    s = {
      ...ur(a),
      ...s
    };
    const l = {
      store: e,
      written: {},
      merge(f, h) {
        return u.merge(f, h);
      },
      variables: s,
      varString: ae(s),
      ...Us(t, this.fragments),
      overwrite: !!o,
      incomingById: /* @__PURE__ */ new Map(),
      clientOnly: !1,
      deferred: !1,
      flavors: /* @__PURE__ */ new Map(),
      extensions: c
    }, d = this.processSelectionSet({
      result: r || {},
      dataId: i,
      selectionSet: a.selectionSet,
      mergeTree: { map: /* @__PURE__ */ new Map() },
      context: l,
      path: []
    });
    if (!F(d))
      throw Y(109, r);
    return l.incomingById.forEach(({ storeObject: f, mergeTree: h, fieldNodeSet: p }, y) => {
      const m = Re(y);
      if (h && h.map.size) {
        const v = this.applyMerges(h, m, f, l);
        if (F(v))
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
    const { policies: c } = this.cache;
    let a = {};
    const u = e && c.rootTypenamesById[e] || Hn(t, r, i.fragmentMap) || e && i.store.get(e, "__typename");
    typeof u == "string" && (a.__typename = u);
    const l = (...f) => {
      const h = vr(f, a, i.variables);
      if (F(h.from)) {
        const p = i.incomingById.get(h.from.__ref);
        if (p) {
          const y = c.readField({
            ...h,
            from: p.storeObject
          }, i);
          if (y !== void 0)
            return y;
        }
      }
      return c.readField(h, i);
    }, d = /* @__PURE__ */ new Set();
    this.flattenFields(
      r,
      t,
      // This WriteContext will be the default context value for fields returned
      // by the flattenFields method, but some fields may be assigned a modified
      // context, depending on the presence of @client and other directives.
      i,
      u
    ).forEach((f, h) => {
      var v;
      const p = Qe(h), y = t[p], m = [...o, h.name.value];
      if (d.add(h), y !== void 0) {
        const b = c.getStoreFieldName({
          typename: u,
          fieldName: h.name.value,
          field: h,
          variables: f.variables
        }), E = fi(s, b);
        let k = this.processFieldValue(
          y,
          h,
          // Reset context.clientOnly and context.deferred to their default
          // values before processing nested selection sets.
          h.selectionSet ? wn(f, !1, !1) : f,
          E,
          m
        ), O;
        h.selectionSet && (F(k) || Ne(k)) && (O = l("__typename", k));
        const I = c.getMergeFunction(u, h.name.value, O);
        I ? E.info = {
          // TODO Check compatibility against any existing childTree.field?
          field: h,
          typename: u,
          merge: I,
          path: m
        } : Ie(["stream"], h) && Array.isArray(k) && ((v = f.extensions) != null && v[pe]) ? E.info = {
          field: h,
          typename: u,
          merge: Tu,
          path: m
        } : hi(s, b), a = f.merge(a, {
          [b]: k
        });
      }
    });
    try {
      const [f, h] = c.identify(t, {
        typename: u,
        selectionSet: r,
        fragmentMap: i.fragmentMap,
        storeObject: a,
        readField: l
      });
      e = e || f, h && (a = i.merge(a, h));
    } catch (f) {
      if (!e)
        throw f;
    }
    if (typeof e == "string") {
      const f = Re(e), h = i.written[e] || (i.written[e] = []);
      if (h.indexOf(r) >= 0 || (h.push(r), this.reader && this.reader.isFresh(t, f, r, i)))
        return f;
      const p = i.incomingById.get(e);
      return p ? (p.storeObject = i.merge(p.storeObject, a), p.mergeTree = Qn(p.mergeTree, s), d.forEach((y) => p.fieldNodeSet.add(y))) : i.incomingById.set(e, {
        storeObject: a,
        // Save a reference to mergeTree only if it is not empty, because
        // empty MergeTrees may be recycled by maybeRecycleChildMergeTree and
        // reused for entirely different parts of the result tree.
        mergeTree: Bt(s) ? void 0 : s,
        fieldNodeSet: d
      }), f;
    }
    return a;
  }
  processFieldValue(e, t, r, i, s) {
    return !t.selectionSet || e === null ? e : B(e) ? e.map((o, c) => {
      const a = this.processFieldValue(o, t, r, fi(i, c), [...s, c]);
      return hi(i, c), a;
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
  flattenFields(e, t, r, i = Hn(t, e, r.fragmentMap)) {
    const s = /* @__PURE__ */ new Map(), { policies: o } = this.cache, c = new ie(!1);
    return (function a(u, l) {
      const d = c.lookup(
        u,
        // Because we take inheritedClientOnly and inheritedDeferred into
        // consideration here (in addition to selectionSet), it's possible for
        // the same selection set to be flattened more than once, if it appears
        // in the query with different @client and/or @directive configurations.
        l.clientOnly,
        l.deferred
      );
      d.visited || (d.visited = !0, u.selections.forEach((f) => {
        if (!Xt(f, r.variables))
          return;
        let { clientOnly: h, deferred: p } = l;
        if (
          // Since the presence of @client or @defer on this field can only
          // cause clientOnly or deferred to become true, we can skip the
          // forEach loop if both clientOnly and deferred are already true.
          !(h && p) && lr(f.directives) && f.directives.forEach((y) => {
            const m = y.name.value;
            if (m === "client" && (h = !0), m === "defer") {
              const v = ar(y, r.variables);
              (!v || v.if !== !1) && (p = !0);
            }
          }), gt(f)
        ) {
          const y = s.get(f);
          y && (h = h && y.clientOnly, p = p && y.deferred), s.set(f, wn(r, h, p));
        } else {
          const y = Kt(f, r.lookupFragment);
          if (!y && f.kind === S.FRAGMENT_SPREAD)
            throw Y(111, f.name.value);
          y && o.fragmentMatches(y, i, t, r.variables) && a(y.selectionSet, wn(r, h, p));
        }
      }));
    })(e, r), s;
  }
  applyMerges(e, t, r, i, s) {
    if (e.map.size && !F(r)) {
      const o = (
        // Items in the same position in different arrays are not
        // necessarily related to each other, so when incoming is an array
        // we process its elements as if there was no existing data.
        !B(r) && // Likewise, existing must be either a Reference or a StoreObject
        // in order for its fields to be safe to merge with the fields of
        // the incoming object.
        (F(t) || Ne(t)) ? t : void 0
      ), c = r;
      o && !s && (s = [F(o) ? o.__ref : o]);
      let a;
      const u = (l, d) => B(l) ? typeof d == "number" ? l[d] : void 0 : i.store.getFieldValue(l, String(d));
      e.map.forEach((l, d) => {
        const f = u(o, d), h = u(c, d);
        if (h === void 0)
          return;
        s && s.push(d);
        const p = this.applyMerges(l, f, h, i, s);
        p !== h && (a = a || /* @__PURE__ */ new Map(), a.set(d, p)), s && A(s.pop() === d);
      }), a && (r = B(c) ? c.slice(0) : { ...c }, a.forEach((l, d) => {
        r[d] = l;
      }));
    }
    return e.info ? this.cache.policies.runMergeFunction(t, r, e.info, i, s && i.store.getStorage(...s)) : r;
  }
}
const Xs = [];
function fi({ map: n }, e) {
  return n.has(e) || n.set(e, Xs.pop() || { map: /* @__PURE__ */ new Map() }), n.get(e);
}
function Qn(n, e) {
  if (n === e || !e || Bt(e))
    return n;
  if (!n || Bt(n))
    return e;
  const t = n.info && e.info ? {
    ...n.info,
    ...e.info
  } : n.info || e.info, r = n.map.size && e.map.size, i = r ? /* @__PURE__ */ new Map() : n.map.size ? n.map : e.map, s = { info: t, map: i };
  if (r) {
    const o = new Set(e.map.keys());
    n.map.forEach((c, a) => {
      s.map.set(a, Qn(c, e.map.get(a))), o.delete(a);
    }), o.forEach((c) => {
      s.map.set(c, Qn(e.map.get(c), n.map.get(c)));
    });
  }
  return s;
}
function Bt(n) {
  return !n || !(n.info || n.map.size);
}
function hi({ map: n }, e) {
  const t = n.get(e);
  t && Bt(t) && (Xs.push(t), n.delete(e));
}
function Hn(n, e, t) {
  let r;
  for (const i of e.selections)
    if (gt(i)) {
      if (i.name.value === "__typename")
        return n[Qe(i)];
    } else r ? r.push(i) : r = [i];
  if (typeof n.__typename == "string")
    return n.__typename;
  if (r)
    for (const i of r) {
      const s = Hn(n, Kt(i, t).selectionSet, t);
      if (typeof s == "string")
        return s;
    }
}
class Ru extends lu {
  constructor(t = {}) {
    super();
    g(this, "data");
    g(this, "optimisticData");
    g(this, "config");
    g(this, "watches", /* @__PURE__ */ new Set());
    g(this, "storeReader");
    g(this, "storeWriter");
    g(this, "addTypenameTransform", new se(Ls));
    g(this, "maybeBroadcastWatch");
    // Override the default value, since InMemoryCache result objects are frozen
    // in development and expected to remain logically immutable in production.
    g(this, "assumeImmutableResults", !0);
    // Dynamically imported code can augment existing typePolicies or
    // possibleTypes by calling cache.policies.addTypePolicies or
    // cache.policies.addPossibletypes.
    g(this, "policies");
    g(this, "makeVar", Ou);
    g(this, "txCount", 0);
    this.config = pu(t), this.policies = new _u({
      cache: this,
      dataIdFromObject: this.config.dataIdFromObject,
      possibleTypes: this.config.possibleTypes,
      typePolicies: this.config.typePolicies
    }), this.init();
  }
  init() {
    const t = this.data = new nn.Root({
      policies: this.policies,
      resultCaching: this.config.resultCaching
    });
    this.optimisticData = t.stump, this.resetResultCache();
  }
  resetResultCache() {
    const { fragments: t } = this.config;
    this.addTypenameTransform.resetCache(), t == null || t.resetCaches(), this.storeWriter = new Du(this, this.storeReader = new Nu({ cache: this, fragments: t }), t), this.maybeBroadcastWatch = dt((r, i) => this.broadcastWatch(r, i), {
      max: ue["inMemoryCache.maybeBroadcastWatch"] || 5e3,
      makeCacheKey: (r) => {
        const i = r.optimistic ? this.optimisticData : this.data;
        if (rt(i)) {
          const { optimistic: s, id: o, variables: c } = r;
          return i.makeCacheKey(
            r.query,
            // Different watches can have the same query, optimistic
            // status, rootId, and variables, but if their callbacks are
            // different, the (identical) result needs to be delivered to
            // each distinct callback. The easiest way to achieve that
            // separation is to include c.callback in the cache key for
            // maybeBroadcastWatch calls. See issue #5733.
            r.callback,
            ae({ optimistic: s, id: o, variables: c })
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
    if (W.call(t, "id") && !t.id)
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
    return this.watches.size || Su(this), this.watches.add(t), t.immediate && this.maybeBroadcastWatch(t), () => {
      this.watches.delete(t) && !this.watches.size && oi(this), this.maybeBroadcastWatch.forget(t);
    };
  }
  gc(t) {
    ae.reset(), Fe.reset();
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
    if (F(t))
      return t.__ref;
    try {
      return this.policies.identify(t)[0];
    } catch {
    }
  }
  evict(t) {
    if (!t.id) {
      if (W.call(t, "id"))
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
    return this.init(), ae.reset(), t && t.discardWatches ? (this.watches.forEach((r) => this.maybeBroadcastWatch.forget(r)), this.watches.clear(), oi(this)) : this.broadcastWatches(), Promise.resolve();
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
    let c;
    const a = (l) => {
      const { data: d, optimisticData: f } = this;
      ++this.txCount, l && (this.data = this.optimisticData = l);
      try {
        return c = r(this);
      } finally {
        --this.txCount, this.data = d, this.optimisticData = f;
      }
    }, u = /* @__PURE__ */ new Set();
    return o && !this.txCount && this.broadcastWatches({
      ...t,
      onWatchUpdated(l) {
        return u.add(l), !1;
      }
    }), typeof i == "string" ? this.optimisticData = this.optimisticData.addLayer(i, a) : i === !1 ? a(this.data) : a(), typeof s == "string" && (this.optimisticData = this.optimisticData.removeLayer(s)), o && u.size ? (this.broadcastWatches({
      ...t,
      onWatchUpdated(l, d) {
        const f = o.call(this, l, d);
        return f !== !1 && u.delete(l), f;
      }
    }), u.size && u.forEach((l) => this.maybeBroadcastWatch.dirty(l))) : this.broadcastWatches(t), c;
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
    r && (t.optimistic && typeof r.optimistic == "string" && (s.fromOptimisticTransaction = !0), r.onWatchUpdated && r.onWatchUpdated.call(this, t, s, i) === !1) || (!i || !D(i.result, s.result)) && t.callback(t.lastDiff = s, i);
  }
}
function bt(n, e) {
  return typeof n == "object" && n !== null && n[Symbol.for("apollo.error")] === e;
}
function wt(n) {
  Object.defineProperty(n, Symbol.for("apollo.error"), {
    value: n.name,
    enumerable: !1,
    writable: !1,
    configurable: !1
  });
}
function di(n) {
  return n.map((e) => e.message || "Error message not found.").join(`
`);
}
const st = class st extends Error {
  constructor(t) {
    super(st.formatMessage(t, {
      defaultFormatMessage: di
    }));
    /**
    * The raw list of errors returned by the top-level `errors` field in the
    * multipart HTTP subscription response.
    */
    g(this, "errors");
    this.name = "CombinedProtocolErrors", this.errors = t, wt(this), Object.setPrototypeOf(this, st.prototype);
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
    return bt(t, "CombinedProtocolErrors");
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
g(st, "formatMessage", di);
let qt = st;
function Fu(n) {
  return n !== null && typeof n == "object" && typeof n.message == "string" && typeof n.name == "string" && (typeof n.stack == "string" || typeof n.stack > "u");
}
class gr extends Error {
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
    return bt(e, "UnconventionalError");
  }
  constructor(e) {
    super("An error of unexpected shape occurred.", { cause: e }), this.name = "UnconventionalError", wt(this), Object.setPrototypeOf(this, gr.prototype);
  }
}
function pi(n) {
  return n.filter((e) => e).map((e) => e.message || "Error message not found.").join(`
`);
}
const ot = class ot extends Error {
  constructor(t, r = t.errors || []) {
    super(ot.formatMessage(r, {
      result: t,
      defaultFormatMessage: pi
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
    this.errors = r, this.data = t.data, this.extensions = t.extensions, this.name = "CombinedGraphQLErrors", wt(this), Object.setPrototypeOf(this, ot.prototype);
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
    return bt(t, "CombinedGraphQLErrors");
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
g(ot, "formatMessage", pi);
let we = ot;
const Pu = /* @__PURE__ */ new WeakSet();
function Mu(n) {
  Pu.add(n);
}
class rn extends Error {
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
    this.name = "ServerError", this.response = r.response, this.statusCode = r.response.status, this.bodyText = r.bodyText, wt(this), Object.setPrototypeOf(this, rn.prototype);
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
    return bt(t, "ServerError");
  }
}
class sn extends Error {
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
    this.name = "ServerParseError", this.response = r.response, this.statusCode = r.response.status, this.bodyText = r.bodyText, wt(this), Object.setPrototypeOf(this, sn.prototype);
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
    return bt(t, "ServerParseError");
  }
}
const Ut = Symbol();
function Lu(n) {
  return "extensions" in n ? qt.is(n.extensions[Ut]) : !1;
}
function ju(n) {
  return Fu(n) ? n : typeof n == "string" ? new Error(n, { cause: n }) : new gr(n);
}
var _;
(function(n) {
  n[n.loading = 1] = "loading", n[n.setVariables = 2] = "setVariables", n[n.fetchMore = 3] = "fetchMore", n[n.refetch = 4] = "refetch", n[n.poll = 6] = "poll", n[n.ready = 7] = "ready", n[n.error = 8] = "error", n[n.streaming = 9] = "streaming";
})(_ || (_ = {}));
const { assign: mi } = Object, Ce = {
  loading: !0,
  networkStatus: _.loading,
  data: void 0,
  dataState: "empty",
  partial: !0
}, En = {
  loading: !1,
  networkStatus: _.ready,
  data: void 0,
  dataState: "empty",
  partial: !0
};
var Ii;
Ii = Symbol.observable;
class kn {
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
    g(this, Ii);
    g(this, "@@observable");
    g(this, "stableLastResult");
    // Turns polling on or off based on this.options.pollInterval.
    g(this, "didWarnCacheOnlyPolling", !1);
    g(this, "dirty", !1);
    g(this, "notifyTimeout");
    g(this, "activeOperations", /* @__PURE__ */ new Set());
    g(this, "operator", Bn((e) => {
      const { query: t, variables: r, meta: i } = e;
      if (e.source === "setResult")
        return { query: t, variables: r, result: e.value, meta: i };
      if (e.kind === "C" || !Ye(e, this))
        return;
      let s;
      const o = this.subject.getValue();
      if (e.source === "cache") {
        if (s = e.value, s.networkStatus === _.ready && s.partial && (!this.options.returnPartialData || o.result.networkStatus === _.error) && this.options.fetchPolicy !== "cache-only")
          return;
      } else if (e.source === "network")
        this.waitForNetworkResult && (this.waitForNetworkResult = !1, this.resubscribeCache()), s = e.kind === "E" ? {
          ...Ye(o, e) ? o.result : { data: void 0, dataState: "empty", partial: !0 },
          error: e.error,
          networkStatus: _.error,
          loading: !1
        } : e.value, e.kind === "E" && s.dataState === "streaming" && (s.dataState = "complete"), s.error && (i.shouldEmit = 1);
      else if (e.source === "newNetworkStatus") {
        const c = Ye(o, e) ? o.result : this.getInitialResult(i.fetchPolicy), { resetError: a } = e.value, u = a ? void 0 : c.error, l = u ? _.error : _.ready;
        s = {
          ...c,
          error: u,
          networkStatus: l
        };
      }
      return A(s), s.error || delete s.error, s.networkStatus = this.calculateNetworkStatus(s.networkStatus), s.loading = Rt(s.networkStatus), s = this.maskResult(s), { query: t, variables: r, result: s, meta: i };
    }));
    this.queryManager = e, this.waitForNetworkResult = t.fetchPolicy === "network-only", this.isTornDown = !1, this.subscribeToMore = this.subscribeToMore.bind(this), this.maskResult = this.maskResult.bind(this);
    const { watchQuery: { fetchPolicy: i = "cache-first" } = {} } = e.defaultOptions, {
      fetchPolicy: s = i,
      // Make sure we don't store "standby" as the initialFetchPolicy.
      initialFetchPolicy: o = s === "standby" ? i : s
    } = t;
    t[Os] && (A(s === "standby", 80), this.variablesUnknown = !0), this.lastQuery = r, this.options = {
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
    const c = le(this.query);
    this.queryName = c && c.name && c.name.value;
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
    this.subject = new Oa({
      query: this.query,
      variables: this.variables,
      result: Ce,
      meta: {}
    });
    const e = this.subject.pipe(ft({
      subscribe: () => {
        this.subject.observed || (this.reobserve(), setTimeout(() => this.updatePolling()));
      },
      unsubscribe: () => {
        this.subject.observed || this.tearDownQuery();
      }
    }), Bn(({ query: t, variables: r, result: i, meta: s }, o) => {
      const { shouldEmit: c } = s;
      if (i === Ce && (o.previous = void 0, o.previousVariables = void 0), this.options.fetchPolicy === "standby" || c === 2)
        return;
      if (c === 1)
        return l();
      const { previous: a, previousVariables: u } = o;
      if (a) {
        const d = this.queryManager.getDocumentInfo(t), f = this.queryManager.dataMasking, h = f ? d.nonReactiveQuery : t;
        if ((f || d.hasNonreactiveDirective ? ks(h, a, i, r) : D(a, i)) && D(u, r))
          return;
      }
      if (c === 3 && (!this.options.notifyOnNetworkStatusChange || D(a, i)))
        return;
      return l();
      function l() {
        return o.previous = i, o.previousVariables = r, i;
      }
    }, () => ({})));
    this.pipe = e.pipe.bind(e), this.subscribe = e.subscribe.bind(e), this.input = new $e(), this.input.complete = () => {
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
        return En;
      default:
        return Ce;
    }
  }
  resubscribeCache() {
    var a;
    const { variables: e, fetchPolicy: t } = this.options, r = this.query, i = t === "standby" || t === "no-cache" || this.waitForNetworkResult, s = !Ye({ query: r, variables: e }, this.unsubscribeFromCache) && !this.waitForNetworkResult;
    if ((i || s) && ((a = this.unsubscribeFromCache) == null || a.call(this)), i || !s)
      return;
    const o = {
      query: r,
      variables: e,
      optimistic: !0,
      watcher: this,
      callback: (u) => {
        const l = this.queryManager.getDocumentInfo(r);
        if ((l.hasClientExports || l.hasForcedResolvers) && (o.lastDiff = void 0), o.lastOwnDiff === u)
          return;
        const { result: d } = this.subject.getValue();
        !u.complete && // If we are trying to deliver an incomplete cache result, we avoid
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
        d === Ce || d === En) || D(d.data, u.result) || this.scheduleNotify();
      }
    }, c = this.cache.watch(o);
    this.unsubscribeFromCache = Object.assign(() => {
      this.unsubscribeFromCache = void 0, c();
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
    return t === Ce && (t = this.getInitialResult()), D(this.stableLastResult, t) || (this.stableLastResult = t), this.stableLastResult;
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
    return t === "no-cache" ? r.fetchPolicy = "no-cache" : r.fetchPolicy = "network-only", e && !D(this.variables, e) && (r.variables = this.options.variables = this.getVariablesWithDefaults({ ...this.variables, ...e })), this._lastWrite = void 0, this._reobserve(r, {
      newNetworkStatus: _.refetch
    });
  }
  fetchMore({ query: e, variables: t, context: r, errorPolicy: i, updateQuery: s }) {
    A(
      this.options.fetchPolicy !== "cache-only",
      82,
      Be(this.query, "(anonymous)")
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
    let c = !1;
    const a = this.options.fetchPolicy !== "no-cache";
    a || A(s, 83);
    const { finalize: u, pushNotification: l } = this.pushOperation(_.fetchMore);
    l({
      source: "newNetworkStatus",
      kind: "N",
      value: {}
    }, {
      shouldEmit: 3
      /* EmitBehavior.networkStatusChange */
    });
    const { promise: d, operator: f } = yi(), { observable: h } = this.queryManager.fetchObservableWithInfo(o, { networkStatus: _.fetchMore, exposeExtensions: !0 }), p = h.pipe(f, ls((y) => y.kind === "N" && y.source === "network")).subscribe({
      next: (y) => {
        c = !1;
        const m = y.value, v = m[Ss];
        if (Vs(y.value.networkStatus) && u(), a) {
          const b = this.getCacheDiff();
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
              if (E.watcher === this && !D(k.result, b.result)) {
                c = !0;
                const O = this.getCurrentResult();
                Rt(m.networkStatus) && l({
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
          const b = this.getCurrentResult(), E = s(b.data, {
            fetchMoreResult: m.data,
            variables: o.variables
          });
          l({
            kind: "N",
            value: {
              ...b,
              networkStatus: _.ready,
              // will be overwritten anyways, just here for types sake
              loading: !1,
              data: E,
              dataState: b.dataState === "streaming" ? "streaming" : "complete"
            },
            source: "network"
          });
        }
      }
    });
    return Vn(d.then((y) => et(this.maskResult(y))).finally(() => {
      if (p.unsubscribe(), u(), a && !c) {
        const y = this.getCurrentResult();
        y.dataState === "streaming" ? l({
          kind: "N",
          source: "network",
          value: {
            ...y,
            dataState: "complete",
            networkStatus: _.ready
          }
        }) : l({
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
        i && this.updateQuery((c, a) => i(c, {
          subscriptionData: r,
          ...a
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
    mi(this.options, t), this.updatePolling();
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
    return e = this.getVariablesWithDefaults(e), D(this.variables, e) ? et(this.getCurrentResult()) : (this.options.variables = e, this.hasObservers() ? this._reobserve({
      // Reset options.fetchPolicy to its original value.
      fetchPolicy: this.options.initialFetchPolicy,
      variables: e
    }, { newNetworkStatus: _.setVariables }) : et(this.getCurrentResult()));
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
    const c = () => {
      o = !0;
    }, a = (
      // we cannot use `tap` here, since it allows only for a "before subscription"
      // hook with `subscribe` and we care for "directly before and after subscription"
      (m) => new M((v) => {
        try {
          return m.subscribe({
            next(b) {
              o = !0, v.next(b);
            },
            error: (b) => v.error(b),
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
    let { observable: u, fromLink: l } = this.queryManager.fetchObservableWithInfo(e, {
      networkStatus: t,
      query: r,
      onCacheHit: c,
      fetchQueryOperator: a,
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
    u = u.pipe(i, lt());
    const y = u.pipe(ft({
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
    return { fromLink: l, subscription: y, observable: u };
  }
  updatePolling() {
    if (this.queryManager.ssrMode)
      return;
    const { pollingInfo: e, options: { fetchPolicy: t, pollInterval: r } } = this, i = () => {
      const { options: a } = this;
      return !a.pollInterval || !this.hasObservers() || a.fetchPolicy === "cache-only" || a.fetchPolicy === "standby";
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
      var a, u;
      if (i())
        return this.cancelPolling();
      this.pollingInfo && (!Rt(this.networkStatus) && !((u = (a = this.options).skipPollAttempt) != null && u.call(a)) ? this._reobserve({
        // Most fetchPolicy options don't make sense to use in a polling context, as
        // users wouldn't want to be polling the cache directly. However, network-only and
        // no-cache are both useful for when the user wants to control whether or not the
        // polled results are written to the cache.
        fetchPolicy: this.options.initialFetchPolicy === "no-cache" ? "no-cache" : "network-only"
      }, {
        newNetworkStatus: _.poll
      }).then(c, c) : c());
    }, c = () => {
      const a = this.pollingInfo;
      a && (clearTimeout(a.timeout), a.timeout = setTimeout(o, a.interval));
    };
    c();
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
    ), s = this.variables, o = this.options.fetchPolicy, c = G(this.options, e || {});
    this.variablesUnknown && (this.variablesUnknown = c.fetchPolicy === "standby");
    const a = i ? (
      // Disposable Observable fetches receive a shallow copy of this.options
      // (merged with newOptions), leaving this.options unmodified.
      c
    ) : mi(this.options, c), u = this.transformDocument(a.query);
    this.lastQuery = u, e && "variables" in e && (a.variables = this.getVariablesWithDefaults(e.variables)), i || (this.updatePolling(), e && e.variables && !D(e.variables, s) && // Don't mess with the fetchPolicy if it's currently "standby".
    a.fetchPolicy !== "standby" && // If we're changing the fetchPolicy anyway, don't try to change it here
    // using applyNextFetchPolicy. The explicit options.fetchPolicy wins.
    (a.fetchPolicy === o || // A `nextFetchPolicy` function has even higher priority, though,
    // so in that case `applyNextFetchPolicy` must be called.
    typeof a.nextFetchPolicy == "function") && (this.applyNextFetchPolicy("variables-changed", a), r === void 0 && (r = _.setVariables)));
    const l = this.networkStatus;
    r || (r = _.loading, l !== _.loading && (e != null && e.variables) && !D(e.variables, s) && (r = _.setVariables), a.fetchPolicy === "standby" && (r = _.ready)), a.fetchPolicy === "standby" && this.cancelPolling(), this.resubscribeCache();
    const { promise: d, operator: f } = yi(
      // This default value should only be used when using a `fetchPolicy` of
      // `standby` since that fetch policy completes without emitting a
      // result. Since we are converting this to a QueryResult type, we
      // omit the extra fields from ApolloQueryResult in the default value.
      a.fetchPolicy === "standby" ? { data: void 0 } : void 0
    ), { subscription: h, observable: p, fromLink: y } = this.fetch(a, r, u, f);
    !i && (y || !this.linkSubscription) && (this.linkSubscription && this.linkSubscription.unsubscribe(), this.linkSubscription = h);
    const m = Object.assign(Vn(d.then((v) => et(this.maskResult(v))).finally(() => {
      !this.hasObservers() && this.activeOperations.size === 0 && this.tearDownQuery();
    })), {
      retain: () => {
        const v = p.subscribe({}), b = () => v.unsubscribe();
        return d.then(b, b), m;
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
      D(r.result, this.getCacheDiff({ optimistic: !1 }).result) ? this.reobserveCacheFirst() : this.input.next({
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
      pushNotification: (c, a) => {
        t || this.input.next({
          ...c,
          query: r,
          variables: i,
          meta: { ...a }
        });
      }
    };
  }
  calculateNetworkStatus(e) {
    if (e === _.streaming)
      return e;
    const t = Array.from(this.activeOperations.values()).reverse().find((r) => Ye(r, this) && r.override !== void 0);
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
    this.setResult(e ? En : Ce, {
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
function Ye(n, e) {
  return !!(n && e && n.query === e.query && D(n.variables, e.variables));
}
function yi(n) {
  let e = n, t, r;
  const i = new Promise((o, c) => {
    t = o, r = c;
  }), s = ft({
    next(o) {
      if (o.kind === "E")
        return r(o.error);
      o.kind === "N" && o.source !== "newNetworkStatus" && !o.value.loading && (e = o.value);
    },
    finalize: () => {
      if (e)
        t(e);
      else {
        const o = "The operation was aborted.", c = "AbortError";
        r(typeof DOMException < "u" ? new DOMException(o, c) : Object.assign(new Error(o), { name: c }));
      }
    }
  });
  return { promise: i, operator: s };
}
const vi = {}, Ae = /* @__PURE__ */ new WeakMap();
function Sn(n, e) {
  const t = n[e];
  typeof t == "function" && (n[e] = function() {
    return Ae.set(
      n,
      // The %1e15 allows the count to wrap around to 0 safely every
      // quadrillion evictions, so there's no risk of overflow. To be
      // clear, this is more of a pedantic principle than something
      // that matters in any conceivable practical scenario.
      (Ae.get(n) + 1) % 1e15
    ), t.apply(this, arguments);
  });
}
const gi = /* @__PURE__ */ new WeakMap();
class On {
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
    const r = this.cache = e.cache, i = (gi.get(e) || 0) + 1;
    gi.set(e, i), this.id = i + "", this.observableQuery = t, this.queryManager = e, Ae.has(r) || (Ae.set(r, 0), Sn(r, "evict"), Sn(r, "modify"), Sn(r, "reset"));
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
    r.dmCount === Ae.get(this.cache) && D(t, r.variables) && D(e.data, r.result.data) && // We have to compare these values because its possible the final chunk
    // emitted in the incremental result is just `hasNext: false`. This
    // ensures we trigger a cache write when we get `isLastChunk: true`.
    ((i = e.extensions) == null ? void 0 : i[pe]) === ((s = r.result.extensions) == null ? void 0 : s[pe]));
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
    var l;
    const o = {
      query: t,
      variables: r,
      returnPartialData: !0,
      optimistic: !0
    };
    (l = this.observableQuery) == null || l.resetNotifications();
    const c = s === 0, a = c ? void 0 : this.cache.diff(o);
    let u = this.maybeHandleIncrementalResult(a == null ? void 0 : a.result, e, t);
    return c || (xn(u, i) ? this.cache.batch({
      onWatchUpdated: (d, f) => {
        d.watcher === this.observableQuery && (d.lastOwnDiff = f);
      },
      update: (d) => {
        if (this.shouldWrite(u, r))
          d.writeQuery({
            query: t,
            data: u.data,
            variables: r,
            overwrite: s === 1,
            extensions: u.extensions
          }), this.lastWrite = {
            result: u,
            variables: r,
            dmCount: Ae.get(this.cache)
          };
        else if (a && a.complete) {
          u = { ...u, data: a.result };
          return;
        }
        const f = d.diff(o);
        f.complete && (u = { ...u, data: f.result });
      }
    }) : this.lastWrite = void 0), u;
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
    if (t.errorPolicy === "ignore" && (o = { ...o, errors: [] }), _e(o) && t.errorPolicy === "none")
      return Promise.resolve(o);
    const c = () => ({
      ...o,
      dataState: this.hasNext ? "streaming" : "complete"
    });
    if (!s && xn(o, t.errorPolicy)) {
      i.push({
        result: o.data,
        dataId: "ROOT_MUTATION",
        query: t.document,
        variables: t.variables,
        extensions: o.extensions
      });
      const { updateQueries: u } = t;
      u && this.queryManager.getObservableQueries("all").forEach((l) => {
        const d = l && l.queryName;
        if (!d || !Object.hasOwnProperty.call(u, d))
          return;
        const f = u[d], { query: h, variables: p } = l, { result: y, complete: m } = l.getCacheDiff({ optimistic: !1 });
        if (m && y) {
          const v = f(y, {
            mutationResult: c(),
            queryName: h && Be(h) || void 0,
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
    let a = t.refetchQueries;
    if (typeof a == "function" && (a = a(c())), i.length > 0 || (a || "").length > 0 || t.update || t.onQueryUpdated || t.removeOptimistic) {
      const u = [];
      if (this.queryManager.refetchQueries({
        updateCache: (l) => {
          s || i.forEach((f) => l.write(f));
          const { update: d } = t;
          if (d) {
            if (!s) {
              const f = l.diff({
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
            this.hasNext || d(l, o, {
              context: t.context,
              variables: t.variables
            });
          }
          !s && !t.keepRootFields && !this.hasNext && l.modify({
            id: "ROOT_MUTATION",
            fields(f, { fieldName: h, DELETE: p }) {
              return h === "__typename" ? f : p;
            }
          });
        },
        include: a,
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
      }).forEach((l) => u.push(l)), t.awaitRefetchQueries || t.onQueryUpdated)
        return Promise.all(u).then(() => o);
    }
    return Promise.resolve(o);
  }
  markMutationOptimistic(e, t) {
    const r = typeof e == "function" ? e(t.variables, { IGNORE: vi }) : e;
    return r === vi ? !1 : (this.cache.recordOptimisticTransaction((i) => {
      try {
        this.markMutationResult({ data: r }, t, i);
      } catch (s) {
        A.error(s);
      }
    }, this.id), !0);
  }
  markSubscriptionResult(e, { document: t, variables: r, errorPolicy: i, cacheWriteBehavior: s }) {
    s !== 0 && (xn(e, i) && this.cache.write({
      query: t,
      result: e.data,
      dataId: "ROOT_SUBSCRIPTION",
      variables: r,
      extensions: e.extensions
    }), this.queryManager.broadcastQueries());
  }
}
function xn(n, e = "none") {
  const t = e === "ignore" || e === "all";
  let r = !_e(n);
  return !r && t && n.data && (r = !0), r;
}
class Vu {
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
    g(this, "transformCache", new cr(
      ue["queryManager.getDocumentInfo"] || 2e3
      /* defaultCacheSizes["queryManager.getDocumentInfo"] */
    ));
    g(this, "requestIdCounter", 1);
    // Use protected instead of private field so
    // @apollo/experimental-nextjs-app-support can access type info.
    g(this, "inFlightLinkObservables", new ie(!1));
    g(this, "noCacheWarningsByCause", /* @__PURE__ */ new WeakSet());
    const t = new se(
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
    this.obsQueries.forEach((e) => e.stop()), this.cancelPendingFetches(Y(87));
  }
  cancelPendingFetches(e) {
    this.fetchCancelFns.forEach((t) => t(e)), this.fetchCancelFns.clear();
  }
  async mutate({ mutation: e, variables: t, optimisticResponse: r, updateQueries: i, refetchQueries: s = [], awaitRefetchQueries: o = !1, update: c, onQueryUpdated: a, fetchPolicy: u, errorPolicy: l, keepRootFields: d, context: f }) {
    const h = new On(this);
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
      cacheWriteBehavior: u === "no-cache" ? 0 : 2,
      errorPolicy: l,
      context: f,
      updateQueries: i,
      update: c,
      keepRootFields: d
    });
    return this.broadcastQueries(), new Promise((v, b) => {
      const E = {};
      return this.getObservableFromLink(e, {
        ...f,
        optimisticResponse: m ? r : void 0
      }, t, u, {}, !1).observable.pipe(bi(), Te((k) => {
        const O = { ...k };
        return be(h.markMutationResult(O, {
          document: e,
          variables: t,
          cacheWriteBehavior: u === "no-cache" ? 0 : 2,
          errorPolicy: l,
          context: f,
          update: c,
          updateQueries: i,
          awaitRefetchQueries: o,
          refetchQueries: s,
          removeOptimistic: m ? h.id : void 0,
          onQueryUpdated: a,
          keepRootFields: d
        }));
      })).pipe(he((k) => {
        if (_e(k) && l === "none")
          throw new we(Cn(k));
        return y && (y.loading = !1, y.error = null), k;
      })).subscribe({
        next: (k) => {
          if (this.broadcastQueries(), !h.hasNext) {
            const O = {
              data: this.maskOperation({
                document: e,
                data: k.data,
                fetchPolicy: u,
                cause: E
              })
            };
            _e(k) && (O.error = new we(k)), Object.keys(k.extensions || {}).length && (O.extensions = k.extensions), v(O);
          }
        },
        error: (k) => {
          if (y && (y.loading = !1, y.error = k), m && this.cache.removeOptimistic(h.id), this.broadcastQueries(), l === "ignore")
            return v({ data: void 0 });
          if (l === "all")
            return v({ data: void 0, error: k });
          b(k);
        }
      });
    });
  }
  fetchQuery(e, t) {
    return de(e.query, Z.QUERY), (async () => Ka(this.fetchObservableWithInfo(e, {
      networkStatus: t
    }).observable.pipe(Bn((r) => {
      switch (r.kind) {
        case "E":
          throw r.error;
        case "N":
          if (r.source !== "newNetworkStatus")
            return et(r.value);
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
      const i = le(e), s = {
        // TODO These three calls (hasClientExports, shouldForceResolvers, and
        // usesNonreactiveDirective) are performing independent full traversals
        // of the transformed document. We should consider merging these
        // traversals into a single pass in the future, though the work is
        // cached after the first time.
        hasClientExports: Ie(["client", "export"], e, !0),
        hasForcedResolvers: Nc(e),
        hasNonreactiveDirective: Ie(["nonreactive"], e),
        hasIncrementalDirective: Ie(["defer"], e),
        nonReactiveQuery: Bu(e),
        clientQuery: Ie(["client"], e) ? e : null,
        serverQuery: Rc([
          { name: "client", remove: !0 },
          { name: "connection" },
          { name: "nonreactive" },
          { name: "unmask" }
        ], e),
        operationType: i == null ? void 0 : i.operation,
        defaultVars: ur(i),
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
    de(e.query, Z.QUERY);
    const t = this.transform(e.query);
    return e = {
      ...e,
      variables: this.getVariables(t, e.variables)
    }, typeof e.notifyOnNetworkStatusChange > "u" && (e.notifyOnNetworkStatusChange = !0), new kn({
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
    return this.cancelPendingFetches(Y(89)), this.obsQueries.forEach((t) => {
      t.reset();
    }), this.mutationStore && (this.mutationStore = {}), this.cache.reset(e);
  }
  getObservableQueries(e = "active") {
    const t = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set();
    return Array.isArray(e) && e.forEach((o) => {
      if (typeof o == "string")
        r.set(o, o), i.set(o, !1);
      else if (Ac(o)) {
        const c = Fe(this.transform(o));
        r.set(c, Be(o)), i.set(c, !1);
      } else Q(o) && o.query && s.add(o);
    }), this.obsQueries.forEach((o) => {
      const c = Fe(this.transform(o.options.query));
      if (e === "all") {
        t.add(o);
        return;
      }
      const { queryName: a, options: { fetchPolicy: u } } = o;
      e === "active" && u === "standby" || (e === "active" || a && i.has(a) || c && i.has(c)) && (t.add(o), a && i.set(a, !0), c && i.set(c, !0));
    }), s.size && s.forEach((o) => {
      const c = new kn({
        queryManager: this,
        options: {
          ...ke(this.defaultOptions.watchQuery, o),
          fetchPolicy: "network-only"
        }
      });
      t.add(c);
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
    const { fetchPolicy: i = "cache-first", errorPolicy: s = "none", context: o = {}, extensions: c = {} } = e;
    de(t, Z.SUBSCRIPTION), t = this.transform(t), r = this.getVariables(t, r);
    let a;
    const u = (this.getDocumentInfo(t).hasClientExports ? be(this.localState.getExportedVariables({
      client: this.client,
      document: t,
      variables: r,
      context: o
    })) : ge(r)).pipe(Te((l) => {
      const { observable: d, restart: f } = this.getObservableFromLink(t, o, l, i, c), h = new On(this);
      return a = f, d.pipe(he((p) => {
        h.markSubscriptionResult(p, {
          document: t,
          variables: l,
          errorPolicy: s,
          cacheWriteBehavior: i === "no-cache" ? 0 : 2
        });
        const y = {
          data: p.data ?? void 0
        };
        return _e(p) ? y.error = new we(p) : Lu(p) && (y.error = p.extensions[Ut], delete p.extensions[Ut]), p.extensions && Object.keys(p.extensions).length && (y.extensions = p.extensions), y.error && s === "none" && (y.data = void 0), s === "ignore" && delete y.error, y;
      }), At((p) => ge(s === "ignore" ? {
        data: void 0
      } : { data: void 0, error: p })), ls((p) => !!(p.data || p.error)));
    }));
    return Object.assign(u, { restart: () => a == null ? void 0 : a() });
  }
  broadcastQueries() {
    this.onBroadcast && this.onBroadcast(), this.obsQueries.forEach((e) => e.notify());
  }
  getObservableFromLink(e, t, r, i, s, o = (t == null ? void 0 : t.queryDeduplication) ?? this.queryDeduplication) {
    let c = {};
    const { serverQuery: a, clientQuery: u, operationType: l, hasIncrementalDirective: d } = this.getDocumentInfo(e), f = Be(e), h = {
      client: this.client
    };
    if (a) {
      const { inFlightLinkObservables: p, link: y } = this;
      try {
        let v = function(b) {
          return new M((E) => {
            function k() {
              return b.subscribe({
                next: E.next.bind(E),
                complete: E.complete.bind(E),
                error: E.error.bind(E)
              });
            }
            let O = k();
            return c.restart || (c.restart = () => {
              O.unsubscribe(), O = k();
            }), () => {
              O.unsubscribe(), c.restart = void 0;
            };
          });
        };
        const m = this.incrementalHandler.prepareRequest({
          query: a,
          variables: r,
          context: {
            ...this.defaultContext,
            ...t,
            queryDeduplication: o
          },
          extensions: s
        });
        if (t = m.context, o) {
          const b = Fe(a), E = ae(r);
          c = p.lookup(b, E), c.observable || (c.observable = Wn(y, m, h).pipe(
            v,
            sc(() => {
              p.peek(b, E) === c && p.remove(b, E);
            }),
            // We don't want to replay the last emitted value for
            // subscriptions and instead opt to wait to receive updates until
            // the subscription emits new values.
            l === Z.SUBSCRIPTION ? lt() : ir({ refCount: !0 })
          ));
        } else
          c.observable = Wn(y, m, h).pipe(v);
      } catch (m) {
        c.observable = us(() => m);
      }
    } else
      c.observable = ge({ data: {} });
    if (u) {
      const { operation: p } = le(e);
      A(
        !d,
        94,
        p[0].toUpperCase() + p.slice(1),
        f ?? "(anonymous)"
      ), c.observable = c.observable.pipe(Te((y) => be(this.localState.execute({
        client: this.client,
        document: u,
        remoteResult: y,
        context: t,
        variables: r,
        fetchPolicy: i
      }))));
    }
    return {
      restart: () => {
        var p;
        return (p = c.restart) == null ? void 0 : p.call(c);
      },
      observable: c.observable.pipe(At((p) => {
        throw p = ju(p), Mu(p), p;
      }))
    };
  }
  getResultsFromLink(e, { queryInfo: t, cacheWriteBehavior: r, observableQuery: i, exposeExtensions: s }) {
    const o = t.lastRequestId = this.generateRequestId(), { errorPolicy: c } = e, a = this.cache.transformForLink(e.query);
    return this.getObservableFromLink(a, e.context, e.variables, e.fetchPolicy).observable.pipe(he((u) => {
      const l = t.markQueryResult(u, {
        ...e,
        document: a,
        cacheWriteBehavior: r
      }), d = _e(l);
      if (d && c === "none")
        throw t.resetLastWrite(), i == null || i.resetNotifications(), new we(Cn(l));
      const f = {
        data: l.data,
        ...t.hasNext ? {
          loading: !0,
          networkStatus: _.streaming,
          dataState: "streaming",
          partial: !0
        } : {
          dataState: l.data ? "complete" : "empty",
          loading: !1,
          networkStatus: _.ready,
          partial: !l.data
        }
      };
      return s && "extensions" in l && (f[Ss] = l.extensions), d && (c === "none" && (f.data = void 0, f.dataState = "empty"), c !== "ignore" && (f.error = new we(Cn(l)), f.dataState !== "streaming" && (f.networkStatus = _.error))), f;
    }), At((u) => {
      if (o >= t.lastRequestId && c === "none")
        throw t.resetLastWrite(), i == null || i.resetNotifications(), u;
      const l = {
        data: void 0,
        dataState: "empty",
        loading: !1,
        networkStatus: _.ready,
        partial: !0
      };
      return c !== "ignore" && (l.error = u, l.networkStatus = _.error), ge(l);
    }));
  }
  fetchObservableWithInfo(e, {
    // The initial networkStatus for this fetch, most often
    // NetworkStatus.loading, but also possibly fetchMore, poll, refetch,
    // or setVariables.
    networkStatus: t = _.loading,
    query: r = e.query,
    fetchQueryOperator: i = (a) => a,
    onCacheHit: s = () => {
    },
    observableQuery: o,
    exposeExtensions: c
  }) {
    const a = this.getVariables(r, e.variables);
    let { fetchPolicy: u = "cache-first", errorPolicy: l = "none", returnPartialData: d = !1, notifyOnNetworkStatusChange: f = !0, context: h = {} } = e;
    this.prioritizeCacheValues && (u === "network-only" || u === "cache-and-network") && (u = "cache-first");
    const p = Object.assign({}, e, {
      query: r,
      variables: a,
      fetchPolicy: u,
      errorPolicy: l,
      returnPartialData: d,
      notifyOnNetworkStatusChange: f,
      context: h
    }), y = new On(this, o), m = (O) => {
      p.variables = O;
      const I = u === "no-cache" ? 0 : t === _.refetch && p.refetchWritePolicy !== "merge" ? 1 : 2, R = this.fetchQueryByPolicy(p, {
        queryInfo: y,
        cacheWriteBehavior: I,
        onCacheHit: s,
        observableQuery: o,
        exposeExtensions: c
      });
      return R.observable = R.observable.pipe(i), // If we're in standby, postpone advancing options.fetchPolicy using
      // applyNextFetchPolicy.
      p.fetchPolicy !== "standby" && (o == null || o.applyNextFetchPolicy("after-fetch", e)), R;
    }, v = () => {
      this.fetchCancelFns.delete(y.id);
    };
    this.fetchCancelFns.set(y.id, (O) => {
      b.next({
        kind: "E",
        error: O,
        source: "network"
      });
    });
    const b = new $e();
    let E, k;
    if (this.getDocumentInfo(p.query).hasClientExports)
      E = be(this.localState.getExportedVariables({
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
      observable: new M((O) => {
        O.add(v), E.subscribe(O), b.subscribe(O);
      }).pipe(lt()),
      fromLink: k
    };
  }
  refetchQueries({ updateCache: e, include: t, optimistic: r = !1, removeOptimistic: i = r ? hs("refetchQueries") : void 0, onQueryUpdated: s }) {
    const o = /* @__PURE__ */ new Map();
    t && this.getObservableQueries(t).forEach((a) => {
      if (a.options.fetchPolicy === "cache-only" || a.variablesUnknown)
        return;
      const u = a.getCurrentResult();
      o.set(a, {
        oq: a,
        lastDiff: {
          result: u == null ? void 0 : u.data,
          complete: !(u != null && u.partial)
        }
      });
    });
    const c = /* @__PURE__ */ new Map();
    if (e) {
      const a = /* @__PURE__ */ new Set();
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
        onWatchUpdated(u, l, d) {
          const f = u.watcher;
          if (f instanceof kn && !a.has(f)) {
            if (a.add(f), s) {
              o.delete(f);
              let h = s(f, l, d);
              return h === !0 && (h = f.refetch().retain(
                /* create a persistent subscription on the query */
              )), h !== !1 && c.set(f, h), h;
            }
            s !== null && f.options.fetchPolicy !== "cache-only" && o.set(f, { oq: f, lastDiff: d, diff: l });
          }
        }
      });
    }
    return o.size && o.forEach(({ oq: a, lastDiff: u, diff: l }) => {
      let d;
      s && (l || (l = a.getCacheDiff()), d = s(a, l, u)), (!s || d === !0) && (d = a.refetch().retain(
        /* create a persistent subscription on the query */
      )), d !== !1 && c.set(a, d);
    }), i && this.cache.removeOptimistic(i), c;
  }
  maskOperation(e) {
    const { document: t, data: r } = e;
    return this.dataMasking ? ku(r, t, this.cache) : r;
  }
  maskFragment(e) {
    const { data: t, fragment: r, fragmentName: i } = e;
    return this.dataMasking ? Eu(t, r, this.cache, i) : t;
  }
  fetchQueryByPolicy({ query: e, variables: t, fetchPolicy: r, errorPolicy: i, returnPartialData: s, context: o }, { cacheWriteBehavior: c, onCacheHit: a, queryInfo: u, observableQuery: l, exposeExtensions: d }) {
    const f = () => this.cache.diff({
      query: e,
      variables: t,
      returnPartialData: !0,
      optimistic: !0
    }), h = (y, m) => {
      const v = y.result, b = (k) => (!y.complete && !s && (k = void 0), {
        // TODO: Handle partial data
        data: k,
        dataState: y.complete ? "complete" : k ? "partial" : "empty",
        loading: Rt(m),
        networkStatus: m,
        partial: !y.complete
      }), E = (k) => ge({
        kind: "N",
        value: b(k),
        source: "cache"
      });
      return (
        // Don't attempt to run forced resolvers if we have incomplete cache
        // data and partial isn't allowed since this result would get set to
        // `undefined` anyways in `toResult`.
        (y.complete || s) && this.getDocumentInfo(e).hasForcedResolvers ? (a(), be(this.localState.execute({
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
          value: b(k.data || void 0),
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
      cacheWriteBehavior: c,
      queryInfo: u,
      observableQuery: l,
      exposeExtensions: d
    }).pipe(bi(), oc(), he((y) => ({
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
          observable: hn(h(y, _.loading), p())
        } : { fromLink: !0, observable: p() };
      }
      case "cache-and-network": {
        const y = f();
        return y.complete || s ? {
          fromLink: !0,
          observable: hn(h(y, _.loading), p())
        } : { fromLink: !0, observable: p() };
      }
      case "cache-only":
        return {
          fromLink: !1,
          observable: hn(h(f(), _.ready))
        };
      case "network-only":
        return { fromLink: !0, observable: p() };
      case "no-cache":
        return { fromLink: !0, observable: p() };
      case "standby":
        return { fromLink: !1, observable: ut };
    }
  }
}
function bi() {
  let n = !1;
  return ft({
    next() {
      n = !0;
    },
    complete() {
      A(n, 98);
    }
  });
}
function Bu(n) {
  return re(n, {
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
function Cn(n) {
  var i;
  if (((i = n.extensions) == null ? void 0 : i[pe]) == null)
    return n;
  const { extensions: { [pe]: e, ...t }, ...r } = n;
  return Object.keys(t).length > 0 && (r.extensions = t), r;
}
class qu {
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
    g(this, "maskedFragmentTransform", new se(Mc));
    const { cache: t, documentTransform: r, ssrMode: i = !1, ssrForceFetchDelay: s = 0, queryDeduplication: o = !0, defaultOptions: c, defaultContext: a, assumeImmutableResults: u = t.assumeImmutableResults, localState: l, devtools: d, dataMasking: f, link: h, incrementalHandler: p = new iu(), experiments: y = [] } = e;
    this.link = h, this.cache = t, this.queryDeduplication = o, this.defaultOptions = c || {}, this.devtoolsConfig = {
      ...d,
      enabled: (d == null ? void 0 : d.enabled) ?? fs
    }, this.watchQuery = this.watchQuery.bind(this), this.query = this.query.bind(this), this.mutate = this.mutate.bind(this), this.watchFragment = this.watchFragment.bind(this), this.resetStore = this.resetStore.bind(this), this.reFetchObservableQueries = this.refetchObservableQueries = this.refetchObservableQueries.bind(this), this.version = sr, this.queryManager = new Vu({
      client: this,
      defaultOptions: this.defaultOptions,
      defaultContext: a,
      documentTransform: r,
      queryDeduplication: o,
      ssrMode: i,
      dataMasking: !!f,
      clientOptions: e,
      incrementalHandler: p,
      assumeImmutableResults: u,
      onBroadcast: this.devtoolsConfig.enabled ? () => {
        this.devToolsHookCb && this.devToolsHookCb();
      } : void 0,
      localState: l
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
    return this.defaultOptions.watchQuery && (e = ke(this.defaultOptions.watchQuery, e)), this.queryManager.watchQuery(e);
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
    return this.defaultOptions.query && (e = ke(this.defaultOptions.query, e)), this.queryManager.query(e);
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
    const t = ke(G({
      fetchPolicy: "network-only",
      errorPolicy: "none"
    }, this.defaultOptions.mutate), e);
    return de(t.mutation, Z.MUTATION), this.queryManager.mutate(t);
  }
  /**
   * This subscribes to a graphql subscription according to the options specified and returns an
   * `Observable` which either emits received data or an error.
   */
  subscribe(e) {
    const t = {}, r = this.queryManager.startGraphQLSubscription(e), i = r.pipe(he((s) => ({
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
    return Wn(this.link, e, { client: this });
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
    t.forEach((o, c) => {
      r.push(c), i.push(o);
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
const { hasOwnProperty: wi } = Object.prototype;
function Uu(n) {
  return Q(n) && "payload" in n;
}
async function* Wu(n) {
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
  const c = n.body.getReader();
  let a = !1, u = !1, l;
  const d = () => u && s[0] == "-" && s[1] == "-";
  try {
    for (; !a; ) {
      ({ value: l, done: a } = await c.read());
      const h = typeof l == "string" ? l : e.decode(l), p = s.length - i.length + 1;
      s += h;
      let y = s.indexOf(i, p);
      for (; y > -1 && !d(); ) {
        u = !0;
        let m;
        [m, s] = [
          s.slice(0, y),
          s.slice(y + i.length)
        ];
        const v = m.indexOf(`\r
\r
`), E = $u(m.slice(0, v))["content-type"];
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
    c.cancel();
  }
}
async function zu(n, e) {
  for await (const t of Wu(n)) {
    const r = Zs(n, t);
    if (Object.keys(r).length != 0)
      if (Uu(r)) {
        if (Object.keys(r).length === 1 && r.payload === null)
          return;
        let i = { ...r.payload };
        "errors" in r && (i.extensions = {
          ...i.extensions,
          [Ut]: new qt(r.errors ?? [])
        }), e(i);
      } else
        e(r);
  }
}
function $u(n) {
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
function Zs(n, e) {
  if (n.status >= 300)
    throw new rn(`Response not successful: Received status code ${n.status}`, { response: n, bodyText: e });
  try {
    return JSON.parse(e);
  } catch (t) {
    throw new sn(t, { response: n, bodyText: e });
  }
}
function Qu(n, e) {
  try {
    return JSON.parse(e);
  } catch (t) {
    throw new sn(t, { response: n, bodyText: e });
  }
}
function Hu(n, e) {
  const t = n.headers.get("content-type");
  return t != null && t.includes("application/graphql-response+json") ? Qu(n, e) : Zs(n, e);
}
function Gu(n) {
  return (e) => e.text().then((t) => {
    const r = Hu(e, t);
    if (!Array.isArray(r) && !wi.call(r, "data") && !wi.call(r, "errors"))
      throw new rn(`Server response was malformed for query '${Array.isArray(n) ? n.map((i) => i.operationName) : n.operationName}'.`, { response: e, bodyText: t });
    return r;
  });
}
const Yu = {
  includeQuery: !0,
  includeExtensions: !0,
  preserveHeaderCase: !1
}, Ju = {
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
}, Ku = {
  method: "POST"
}, Xu = {
  http: Yu,
  headers: Ju,
  options: Ku
}, Zu = (n, e) => e(n);
function el(n, e, ...t) {
  let r = {}, i = {};
  t.forEach((l) => {
    var d;
    r = {
      ...r,
      ...l.options,
      headers: {
        ...r.headers,
        ...l.headers
      }
    }, l.credentials && (r.credentials = l.credentials), r.headers.accept = (((d = l.http) == null ? void 0 : d.accept) || []).concat(r.headers.accept).join(","), i = {
      ...i,
      ...l.http
    };
  }), r.headers = tl(r.headers, i.preserveHeaderCase);
  const { operationName: s, extensions: o, variables: c, query: a } = n, u = { operationName: s, variables: c };
  return i.includeExtensions && Object.keys(o || {}).length && (u.extensions = o), i.includeQuery && (u.query = e(a, Fe)), {
    options: r,
    body: u
  };
}
function tl(n, e) {
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
const nl = (n, e) => {
  const r = n.getContext().uri;
  return r || (typeof e == "function" ? e(n) : e || "/graphql");
};
function rl(n, e) {
  const t = [], r = (u, l) => {
    t.push(`${u}=${encodeURIComponent(l)}`);
  };
  if ("query" in e && r("query", e.query), e.operationName && r("operationName", e.operationName), e.variables) {
    let u;
    try {
      u = JSON.stringify(e.variables);
    } catch (l) {
      return { parseError: l };
    }
    r("variables", u);
  }
  if (e.extensions) {
    let u;
    try {
      u = JSON.stringify(e.extensions);
    } catch (l) {
      return { parseError: l };
    }
    r("extensions", u);
  }
  let i = "", s = n;
  const o = n.indexOf("#");
  o !== -1 && (i = n.substr(o), s = n.substr(0, o));
  const c = s.indexOf("?") === -1 ? "?" : "&";
  return { newURI: s + c + t.join("&") + i };
}
const il = X(() => fetch);
function sl() {
}
class ol extends $ {
  constructor(e = {}) {
    let {
      uri: t = "/graphql",
      // use default global fetch if nothing passed in
      fetch: r,
      print: i = Zu,
      includeExtensions: s,
      preserveHeaderCase: o,
      useGETForQueries: c,
      includeUnusedVariables: a = !1,
      ...u
    } = e;
    const l = {
      http: G({ includeExtensions: s, preserveHeaderCase: o }),
      options: u.fetchOptions,
      credentials: u.credentials,
      headers: u.headers
    };
    super((d) => {
      let f = nl(d, t);
      const h = d.getContext(), p = { ...h.http };
      uu(d.query) && (p.accept = [
        "multipart/mixed;boundary=graphql;subscriptionSpec=1.0",
        ...p.accept || []
      ]);
      const y = {
        http: p,
        options: h.fetchOptions,
        credentials: h.credentials,
        headers: h.headers
      }, { options: m, body: v } = el(d, i, Xu, l, y);
      v.variables && !a && (v.variables = ou(v.variables, d.query));
      let b = new AbortController(), E = () => {
        b = void 0;
      };
      if (m.signal) {
        const k = m.signal, O = () => {
          b == null || b.abort(k.reason);
        };
        k.addEventListener("abort", O, { once: !0 }), E = () => {
          b == null || b.signal.removeEventListener("abort", E), b = void 0, k.removeEventListener("abort", O), E = sl;
        }, b.signal.addEventListener("abort", E, {
          once: !0
        });
      }
      return m.signal = b.signal, c && !cu(d.query) && (m.method = "GET"), new M((k) => {
        if (m.method === "GET") {
          const { newURI: R, parseError: te } = rl(f, v);
          if (te)
            throw te;
          f = R;
        } else
          m.body = JSON.stringify(v);
        const O = r || X(() => fetch) || il, I = k.next.bind(k);
        return O(f, m).then((R) => {
          var ve;
          d.setContext({ response: R });
          const te = (ve = R.headers) == null ? void 0 : ve.get("content-type");
          return te !== null && /^multipart\/mixed/i.test(te) ? zu(R, I) : Gu(d)(R).then(I);
        }).then(() => {
          E(), k.complete();
        }).catch((R) => {
          E(), k.error(R);
        }), () => {
          b && b.abort();
        };
      });
    });
  }
}
class al extends $ {
  constructor(e = {}) {
    super((t, r) => {
      const i = t.client, s = i.queryManager.clientOptions, o = t.getContext();
      {
        const { name: c, version: a, transport: u = "headers" } = G({}, s.clientAwareness, e.clientAwareness, o.clientAwareness);
        u === "headers" && t.setContext(({ headers: l }) => ({
          headers: G(
            // setting these first so that they can be overridden by user-provided headers
            {
              "apollographql-client-name": c,
              "apollographql-client-version": a
            },
            l
          )
        }));
      }
      {
        const { transport: c = "extensions" } = G({}, s.enhancedClientAwareness, e.enhancedClientAwareness);
        c === "extensions" && (t.extensions = G(
          // setting these first so that it can be overridden by user-provided extensions
          {
            clientLibrary: {
              name: "@apollo/client",
              version: i.version
            }
          },
          t.extensions
        )), c === "headers" && t.setContext(({ headers: a }) => ({
          headers: G(
            // setting these first so that they can be overridden by user-provided headers
            {
              "apollographql-library-name": "@apollo/client",
              "apollographql-library-version": i.version
            },
            a
          )
        }));
      }
      return r(t);
    });
  }
}
class cl extends $ {
  constructor(e = {}) {
    const { left: t, right: r, request: i } = $.from([
      new al(e),
      new ol(e)
    ]);
    super(i), Object.assign(this, { left: t, right: r });
  }
}
var Pt = /* @__PURE__ */ new Map(), Gn = /* @__PURE__ */ new Map(), eo = !0, Wt = !1;
function to(n) {
  return n.replace(/[\s,]+/g, " ").trim();
}
function ul(n) {
  return to(n.source.body.substring(n.start, n.end));
}
function ll(n) {
  var e = /* @__PURE__ */ new Set(), t = [];
  return n.definitions.forEach(function(r) {
    if (r.kind === "FragmentDefinition") {
      var i = r.name.value, s = ul(r.loc), o = Gn.get(i);
      o && !o.has(s) ? eo && console.warn("Warning: fragment with name " + i + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : o || Gn.set(i, o = /* @__PURE__ */ new Set()), o.add(s), e.has(s) || (e.add(s), t.push(r));
    } else
      t.push(r);
  }), Lt(Lt({}, n), { definitions: t });
}
function fl(n) {
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
function hl(n) {
  var e = to(n);
  if (!Pt.has(e)) {
    var t = ea(n, {
      experimentalFragmentVariables: Wt,
      allowLegacyFragmentVariables: Wt
    });
    if (!t || t.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Pt.set(e, fl(ll(t)));
  }
  return Pt.get(e);
}
function oe(n) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  typeof n == "string" && (n = [n]);
  var r = n[0];
  return e.forEach(function(i, s) {
    i && i.kind === "Document" ? r += i.loc.source.body : r += i, r += n[s + 1];
  }), hl(r);
}
function dl() {
  Pt.clear(), Gn.clear();
}
function pl() {
  eo = !1;
}
function ml() {
  Wt = !0;
}
function yl() {
  Wt = !1;
}
var Je = {
  gql: oe,
  resetCaches: dl,
  disableFragmentWarnings: pl,
  enableExperimentalFragmentVariables: ml,
  disableExperimentalFragmentVariables: yl
};
(function(n) {
  n.gql = Je.gql, n.resetCaches = Je.resetCaches, n.disableFragmentWarnings = Je.disableFragmentWarnings, n.enableExperimentalFragmentVariables = Je.enableExperimentalFragmentVariables, n.disableExperimentalFragmentVariables = Je.disableExperimentalFragmentVariables;
})(oe || (oe = {}));
oe.default = oe;
const Ei = Symbol.for("__APOLLO_CONTEXT__");
function br() {
  A("createContext" in P, 37);
  let n = P.createContext[Ei];
  return n || (Object.defineProperty(P.createContext, Ei, {
    value: n = P.createContext({}),
    enumerable: !1,
    writable: !1,
    configurable: !0
  }), n.displayName = "ApolloContext"), n;
}
const vl = ({ client: n, children: e }) => {
  const t = br(), r = P.useContext(t), i = P.useMemo(() => ({
    ...r,
    client: n || r.client
  }), [r, n]);
  return A(i.client, 38), P.createElement(t.Provider, { value: i }, e);
};
function wr(n) {
  const e = P.useContext(br()), t = n || e.client;
  return A(!!t, 28), t;
}
function gl(n, e) {
  const t = P.useRef(void 0);
  return (!t.current || !D(t.current.deps, e)) && (t.current = { value: n(), deps: e }), t.current.value;
}
const bl = Symbol.for("apollo.skipToken"), wl = Symbol.for("apollo.hook.wrappers");
function El(n, e, t) {
  var s;
  const r = [
    t.queryManager,
    // if we are a hook (not `preloadQuery`), we are guaranteed to be inside of
    // a React render and can use context
    n.startsWith("use") ? (
      // eslint-disable-next-line react-hooks/rules-of-hooks
      P.useContext(br())
    ) : void 0
  ];
  let i = e;
  for (const o of r) {
    const c = (s = o == null ? void 0 : o[wl]) == null ? void 0 : s[n];
    c && (i = c(i));
  }
  return i;
}
const kl = ys ? P.useLayoutEffect : P.useEffect, Sl = "useSyncExternalStore", Ol = P[Sl], xl = X(() => navigator.product) == "ReactNative", Cl = (
  // Following advice found in this comment from @domenic (maintainer of jsdom):
  // https://github.com/jsdom/jsdom/issues/1537#issuecomment-229405327
  //
  // Since we control the version of Jest and jsdom used when running Apollo
  // Client tests, and that version is recent enough to include " jsdom/x.y.z"
  // at the end of the user agent string, I believe this case is all we need to
  // check. Testing for "Node.js" was recommended for backwards compatibility
  // with older version of jsdom, but we don't have that problem.
  X(() => navigator.userAgent.indexOf("jsdom") >= 0) || !1
), Tl = (ys || xl) && !Cl, _l = Ol || ((n, e, t) => {
  const r = e(), [{ inst: i }, s] = P.useState({
    inst: { value: r, getSnapshot: e }
  });
  return Tl ? P.useLayoutEffect(() => {
    Object.assign(i, { value: r, getSnapshot: e }), Tn(i) && s({ inst: i });
  }, [n, r, e]) : Object.assign(i, { value: r, getSnapshot: e }), P.useEffect(() => (Tn(i) && s({ inst: i }), n(function() {
    Tn(i) && s({ inst: i });
  })), [n]), r;
});
function Tn({ value: n, getSnapshot: e }) {
  try {
    return n !== e();
  } catch {
    return !0;
  }
}
function ki(n, e) {
  const t = wr(e == null ? void 0 : e.client), [r, i] = P.useState(() => Si(t)), s = P.useRef({
    result: r,
    mutationId: 0,
    isMounted: !0,
    client: t,
    mutation: n,
    options: e
  });
  kl(() => {
    Object.assign(s.current, { client: t, options: e, mutation: n });
  });
  const o = P.useCallback((a = {}) => {
    const { options: u, mutation: l } = s.current, d = { ...u, mutation: l }, f = a.client || s.current.client, h = typeof a.context == "function" ? a.context(u == null ? void 0 : u.context) : a.context;
    !s.current.result.loading && s.current.isMounted && i(s.current.result = {
      loading: !0,
      error: void 0,
      data: void 0,
      called: !0,
      client: f
    });
    const p = ++s.current.mutationId, y = ke(d, {
      ...a,
      context: h
    });
    return Vn(f.mutate(y).then((m) => {
      var O, I;
      const { data: v, error: b } = m, E = a.onError || ((O = s.current.options) == null ? void 0 : O.onError);
      if (b && E && E(b, y), p === s.current.mutationId) {
        const R = {
          called: !0,
          loading: !1,
          data: v,
          error: b,
          client: f
        };
        s.current.isMounted && !D(s.current.result, R) && i(s.current.result = R);
      }
      const k = a.onCompleted || ((I = s.current.options) == null ? void 0 : I.onCompleted);
      return b || k == null || k(m.data, y), m;
    }, (m) => {
      var b;
      if (p === s.current.mutationId && s.current.isMounted) {
        const E = {
          loading: !1,
          error: m,
          data: void 0,
          called: !0,
          client: f
        };
        D(s.current.result, E) || i(s.current.result = E);
      }
      const v = a.onError || ((b = s.current.options) == null ? void 0 : b.onError);
      throw v && v(m, y), m;
    }));
  }, []), c = P.useCallback(() => {
    if (s.current.isMounted) {
      const a = Si(s.current.client);
      Object.assign(s.current, { mutationId: 0, result: a }), i(a);
    }
  }, []);
  return P.useEffect(() => {
    const a = s.current;
    return a.isMounted = !0, () => {
      a.isMounted = !1;
    };
  }, []), [o, { reset: c, ...r }];
}
function Si(n) {
  return {
    data: void 0,
    error: void 0,
    called: !1,
    loading: !1,
    client: n
  };
}
const Ke = Symbol();
function zt(n, ...[e]) {
  "use no memo";
  return El("useQuery", Il, wr(typeof e == "object" ? e.client : void 0))(n, e);
}
function Il(n, e = {}) {
  const t = wr(typeof e == "object" ? e.client : void 0), { ssr: r } = typeof e == "object" ? e : {}, i = Nl(n, e, t.defaultOptions.watchQuery);
  function s(h) {
    const p = t.watchQuery(i);
    return {
      client: t,
      query: n,
      observable: p,
      resultData: {
        current: p.getCurrentResult(),
        // Reuse previousData from previous InternalState (if any) to provide
        // continuity of previousData even if/when the query or client changes.
        previousData: h == null ? void 0 : h.resultData.current.data,
        variables: p.variables
      }
    };
  }
  let [o, c] = P.useState(s);
  (t !== o.client || n !== o.query) && c(o = s(o));
  const { observable: a, resultData: u } = o;
  Al(i, a), Rl(
    u,
    // might get mutated during render
    a,
    // might get mutated during render
    i
  );
  const l = Dl(a, u, r), d = P.useMemo(() => ({
    refetch: a.refetch.bind(a),
    fetchMore: a.fetchMore.bind(a),
    updateQuery: a.updateQuery.bind(a),
    startPolling: a.startPolling.bind(a),
    stopPolling: a.stopPolling.bind(a),
    subscribeToMore: a.subscribeToMore.bind(a)
  }), [a]), f = u.previousData;
  return P.useMemo(() => {
    const { partial: h, ...p } = l;
    return {
      ...p,
      client: t,
      observable: a,
      variables: a.variables,
      previousData: f,
      ...d
    };
  }, [l, t, a, f, d]);
}
const no = Symbol();
function Nl(n, e, t) {
  return gl(() => {
    if (e === bl) {
      const i = {
        ...ke(t, {
          query: n,
          fetchPolicy: "standby"
        }),
        [Os]: !0
      };
      return i[no] = !0, i;
    }
    const r = ke(t, { ...e, query: n });
    return e.skip && (r.initialFetchPolicy = e.initialFetchPolicy || e.fetchPolicy, r.fetchPolicy = "standby"), r;
  }, [n, e, t]);
}
function Al(n, e) {
  "use no memo";
  n.fetchPolicy || (n.fetchPolicy = e.options.initialFetchPolicy);
}
function Dl(n, e, t) {
  "use no memo";
  const r = n.options.fetchPolicy;
  return _l(P.useCallback((i) => {
    const s = n.pipe(rr(Aa)).subscribe((o) => {
      const c = e.current;
      // Avoid rerendering if the result is the same
      D(c, o) && // Force rerender if the value was emitted because variables
      // changed, such as when calling `refetch(newVars)` which returns
      // the same data when `notifyOnNetworkStatusChange` is `false`.
      D(e.variables, n.variables) || (e.variables = n.variables, c.data && !D(c.data, o.data) && (e.previousData = c.data), e.current = o, i());
    });
    return () => {
      setTimeout(() => s.unsubscribe());
    };
  }, [n, e]), () => e.current, () => r !== "standby" && t === !1 || r === "no-cache" ? zt.ssrDisabledResult : e.current);
}
function Rl(n, e, t) {
  "use no memo";
  if (e[Ke] && !D(e[Ke], t)) {
    e[Ke][no] && !t.initialFetchPolicy && (t.initialFetchPolicy = t.fetchPolicy), Fl(e[Ke], t) ? e.reobserve(t) : e.applyOptions(t);
    const r = e.getCurrentResult();
    D(r.data, n.current.data) || (n.previousData = n.current.data || n.previousData), n.current = r, n.variables = e.variables;
  }
  e[Ke] = t;
}
function Fl(n, e) {
  return n.query !== e.query || !D(n.variables, e.variables) || n.fetchPolicy !== e.fetchPolicy && (e.fetchPolicy === "standby" || n.fetchPolicy === "standby");
}
zt.ssrDisabledResult = {
  loading: !0,
  data: void 0,
  dataState: "empty",
  error: void 0,
  networkStatus: _.loading,
  partial: !0
};
function Pl() {
  return {
    async getAssignedGuides(n, e) {
      const t = oe`
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
      `, { data: r, loading: i } = zt(t, {
        variables: {
          azureAdObjectId: n,
          schoolYear: e
        }
      });
      return console.log(r), new Promise((s, o) => s(r.assignedGuides));
    },
    async getPendingHandbooks(n, e) {
      const t = oe`
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
      `, { data: r, loading: i } = zt(t, {
        variables: {
          azureAdObjectId: n,
          schoolYear: e
        }
      });
      return console.log(r), new Promise((s, o) => s(r.pendingHandbooks));
    },
    async recordAcknowledgment(n, e, t) {
      const r = oe`
        mutation RecordAcknowledgment($input: RecordAcknowledgmentInput!) {
          recordAcknowledgment(input: $input) {
            id
            handbookId
            acknowledgedAt
          }
        }
      `, [i] = ki(r, {
        variables: {
          azureAdObjectId: n,
          handbookId: e,
          schoolYear: t
        }
      }), { data: s } = await i({ variables: {
        azureAdObjectId: n,
        handbookId: e,
        schoolYear: t
      } });
      return s.recordAcknowledgment;
    },
    async recordGuideCompletion(n, e) {
      const t = oe`
        mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
          recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
            id
          }
        }
      `, [r] = ki(t, {
        variables: {
          azureAdObjectId: n,
          guideId: e
        }
      }), { data: i } = await r({ variables: {
        azureAdObjectId: n,
        guideId: e
      } });
    }
  };
}
class Ml extends $ {
  constructor(e) {
    super((t, r) => {
      const { ...i } = t;
      return Object.defineProperty(i, "client", {
        enumerable: !1,
        value: t.client
      }), new M((s) => {
        let o = !1;
        return Promise.resolve(i).then((c) => e(t.getContext(), c)).then(t.setContext).then(() => {
          o || r(t).subscribe(s);
        }).catch(s.error.bind(s)), () => {
          o = !0;
        };
      });
    });
  }
}
function Ll() {
  const { config: n } = Er();
  return Ni(() => {
    const e = new cl({
      uri: n.userId
    }), t = new Ml(async ({ headers: r }) => {
      try {
        const i = n.getAccessToken();
        return {
          headers: {
            ...r,
            authorization: `Bearer ${i}`
          }
        };
      } catch {
        return { headers: r };
      }
    });
    return new qu({
      link: t.concat(e),
      cache: new Ru(),
      defaultOptions: {
        watchQuery: { fetchPolicy: "cache-and-network" }
      }
    });
  }, [n]);
}
const ro = Eo(null);
function Er() {
  const n = ko(ro);
  if (!n)
    throw new Error("useGuideOpsContext must be used within a <GuideOpsProvider>");
  return n;
}
function vf({ config: n, children: e }) {
  const t = Ni(() => ({
    client: Pl(),
    config: n
  }), [n]), r = Ll();
  return /* @__PURE__ */ U(ro.Provider, { value: t, children: /* @__PURE__ */ U(vl, { client: r, children: e }) });
}
function jl() {
  const { client: n, config: e } = Er(), [t, r] = fe([]), [i, s] = fe(!0), [o, c] = fe(null), a = e.userId || "", u = nt(async () => {
    if (a)
      try {
        s(!0), c(null);
        const d = await n.getPendingHandbooks(a, e.schoolYear);
        r(d);
      } catch (d) {
        c(d instanceof Error ? d : new Error("Failed to fetch handbooks"));
      } finally {
        s(!1);
      }
  }, [n, a, e.schoolYear]);
  Mt(() => {
    u();
  }, [u]);
  const l = nt(async (d) => {
    if (a)
      try {
        await n.recordAcknowledgment(a, d, e.schoolYear), r((f) => f.filter((h) => h.id !== d));
      } catch (f) {
        throw c(f instanceof Error ? f : new Error("Failed to record acknowledgment")), f;
      }
  }, [n, a, e.schoolYear]);
  return {
    pendingHandbooks: t,
    isLoading: i,
    error: o,
    acknowledge: l,
    hasAllAcknowledged: !i && t.length === 0,
    refresh: u
  };
}
let Yn = {}, io;
function _n(n = {}) {
  Yn = {
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
function C(n) {
  return n ? Yn[n] : Yn;
}
function Vl(n) {
  io = n;
}
function H() {
  return io;
}
let $t = {};
function Ct(n, e) {
  $t[n] = e;
}
function Se(n) {
  var e;
  (e = $t[n]) == null || e.call($t);
}
function Bl() {
  $t = {};
}
function Tt(n, e, t, r) {
  return (n /= r / 2) < 1 ? t / 2 * n * n + e : -t / 2 * (--n * (n - 2) - 1) + e;
}
function so(n) {
  const e = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
  return n.flatMap((t) => {
    const r = t.matches(e), i = Array.from(t.querySelectorAll(e));
    return [...r ? [t] : [], ...i];
  }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && Wl(t));
}
function oo(n) {
  if (!n || Ul(n))
    return;
  const e = C("smoothScroll"), t = n.offsetHeight > window.innerHeight;
  n.scrollIntoView({
    // Removing the smooth scrolling for elements which exist inside the scrollable parent
    // This was causing the highlight to not properly render
    behavior: !e || ql(n) ? "auto" : "smooth",
    inline: "center",
    block: t ? "start" : "center"
  });
}
function ql(n) {
  if (!n || !n.parentElement)
    return;
  const e = n.parentElement;
  return e.scrollHeight > e.clientHeight;
}
function Ul(n) {
  const e = n.getBoundingClientRect();
  return e.top >= 0 && e.left >= 0 && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function Wl(n) {
  return !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length);
}
let Qt = {};
function q(n, e) {
  Qt[n] = e;
}
function T(n) {
  return n ? Qt[n] : Qt;
}
function Oi() {
  Qt = {};
}
function zl(n, e, t, r) {
  let i = T("__activeStagePosition");
  const s = i || t.getBoundingClientRect(), o = r.getBoundingClientRect(), c = Tt(n, s.x, o.x - s.x, e), a = Tt(n, s.y, o.y - s.y, e), u = Tt(n, s.width, o.width - s.width, e), l = Tt(n, s.height, o.height - s.height, e);
  i = {
    x: c,
    y: a,
    width: u,
    height: l
  }, co(i), q("__activeStagePosition", i);
}
function ao(n) {
  if (!n)
    return;
  const e = n.getBoundingClientRect(), t = {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height
  };
  q("__activeStagePosition", t), co(t);
}
function $l() {
  const n = T("__activeStagePosition"), e = T("__overlaySvg");
  if (!n)
    return;
  if (!e) {
    console.warn("No stage svg found.");
    return;
  }
  const t = window.innerWidth, r = window.innerHeight;
  e.setAttribute("viewBox", `0 0 ${t} ${r}`);
}
function Ql(n) {
  const e = Hl(n);
  document.body.appendChild(e), fo(e, (t) => {
    t.target.tagName === "path" && Se("overlayClick");
  }), q("__overlaySvg", e);
}
function co(n) {
  const e = T("__overlaySvg");
  if (!e) {
    Ql(n);
    return;
  }
  const t = e.firstElementChild;
  if ((t == null ? void 0 : t.tagName) !== "path")
    throw new Error("no path element found in stage svg");
  t.setAttribute("d", uo(n));
}
function Hl(n) {
  const e = window.innerWidth, t = window.innerHeight, r = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  r.classList.add("driver-overlay", "driver-overlay-animated"), r.setAttribute("viewBox", `0 0 ${e} ${t}`), r.setAttribute("xmlSpace", "preserve"), r.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), r.setAttribute("version", "1.1"), r.setAttribute("preserveAspectRatio", "xMinYMin slice"), r.style.fillRule = "evenodd", r.style.clipRule = "evenodd", r.style.strokeLinejoin = "round", r.style.strokeMiterlimit = "2", r.style.zIndex = "10000", r.style.position = "fixed", r.style.top = "0", r.style.left = "0", r.style.width = "100%", r.style.height = "100%";
  const i = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return i.setAttribute("d", uo(n)), i.style.fill = C("overlayColor") || "rgb(0,0,0)", i.style.opacity = `${C("overlayOpacity")}`, i.style.pointerEvents = "auto", i.style.cursor = "auto", r.appendChild(i), r;
}
function uo(n) {
  const e = window.innerWidth, t = window.innerHeight, r = C("stagePadding") || 0, i = C("stageRadius") || 0, s = n.width + r * 2, o = n.height + r * 2, c = Math.min(i, s / 2, o / 2), a = Math.floor(Math.max(c, 0)), u = n.x - r + a, l = n.y - r, d = s - a * 2, f = o - a * 2;
  return `M${e},0L0,0L0,${t}L${e},${t}L${e},0Z
    M${u},${l} h${d} a${a},${a} 0 0 1 ${a},${a} v${f} a${a},${a} 0 0 1 -${a},${a} h-${d} a${a},${a} 0 0 1 -${a},-${a} v-${f} a${a},${a} 0 0 1 ${a},-${a} z`;
}
function Gl() {
  const n = T("__overlaySvg");
  n && n.remove();
}
function Yl() {
  const n = document.getElementById("driver-dummy-element");
  if (n)
    return n;
  let e = document.createElement("div");
  return e.id = "driver-dummy-element", e.style.width = "0", e.style.height = "0", e.style.pointerEvents = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.top = "50%", e.style.left = "50%", document.body.appendChild(e), e;
}
function xi(n) {
  const { element: e } = n;
  let t = typeof e == "function" ? e() : typeof e == "string" ? document.querySelector(e) : e;
  t || (t = Yl()), Kl(t, n);
}
function Jl() {
  const n = T("__activeElement"), e = T("__activeStep");
  n && (ao(n), $l(), po(n, e));
}
function Kl(n, e) {
  var t;
  const r = Date.now(), i = T("__activeStep"), s = T("__activeElement") || n, o = !s || s === n, c = n.id === "driver-dummy-element", a = s.id === "driver-dummy-element", u = C("animate"), l = e.onHighlightStarted || C("onHighlightStarted"), d = (e == null ? void 0 : e.onHighlighted) || C("onHighlighted"), f = (i == null ? void 0 : i.onDeselected) || C("onDeselected"), h = C(), p = T();
  !o && f && f(a ? void 0 : s, i, {
    config: h,
    state: p,
    driver: H()
  }), l && l(c ? void 0 : n, e, {
    config: h,
    state: p,
    driver: H()
  });
  const y = !o && u;
  let m = !1;
  nf(), q("previousStep", i), q("previousElement", s), q("activeStep", e), q("activeElement", n);
  const v = () => {
    if (T("__transitionCallback") !== v)
      return;
    const b = Date.now() - r, E = 400 - b <= 400 / 2;
    e.popover && E && !m && y && (Ci(n, e), m = !0), C("animate") && b < 400 ? zl(b, 400, s, n) : (ao(n), d && d(c ? void 0 : n, e, {
      config: C(),
      state: T(),
      driver: H()
    }), q("__transitionCallback", void 0), q("__previousStep", i), q("__previousElement", s), q("__activeStep", e), q("__activeElement", n)), window.requestAnimationFrame(v);
  };
  q("__transitionCallback", v), window.requestAnimationFrame(v), oo(n), !y && e.popover && Ci(n, e), s.classList.remove("driver-active-element", "driver-no-interaction"), s.removeAttribute("aria-haspopup"), s.removeAttribute("aria-expanded"), s.removeAttribute("aria-controls"), ((t = e.disableActiveInteraction) != null ? t : C("disableActiveInteraction")) && n.classList.add("driver-no-interaction"), n.classList.add("driver-active-element"), n.setAttribute("aria-haspopup", "dialog"), n.setAttribute("aria-expanded", "true"), n.setAttribute("aria-controls", "driver-popover-content");
}
function Xl() {
  var n;
  (n = document.getElementById("driver-dummy-element")) == null || n.remove(), document.querySelectorAll(".driver-active-element").forEach((e) => {
    e.classList.remove("driver-active-element", "driver-no-interaction"), e.removeAttribute("aria-haspopup"), e.removeAttribute("aria-expanded"), e.removeAttribute("aria-controls");
  });
}
function pt() {
  const n = T("__resizeTimeout");
  n && window.cancelAnimationFrame(n), q("__resizeTimeout", window.requestAnimationFrame(Jl));
}
function Zl(n) {
  var e;
  if (!T("isInitialized") || !(n.key === "Tab" || n.keyCode === 9))
    return;
  const t = T("__activeElement"), r = (e = T("popover")) == null ? void 0 : e.wrapper, i = so([
    ...r ? [r] : [],
    ...t ? [t] : []
  ]), s = i[0], o = i[i.length - 1];
  if (n.preventDefault(), n.shiftKey) {
    const c = i[i.indexOf(document.activeElement) - 1] || o;
    c == null || c.focus();
  } else {
    const c = i[i.indexOf(document.activeElement) + 1] || s;
    c == null || c.focus();
  }
}
function lo(n) {
  var e;
  ((e = C("allowKeyboardControl")) == null || e) && (n.key === "Escape" ? Se("escapePress") : n.key === "ArrowRight" ? Se("arrowRightPress") : n.key === "ArrowLeft" && Se("arrowLeftPress"));
}
function fo(n, e, t) {
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
function ef() {
  window.addEventListener("keyup", lo, !1), window.addEventListener("keydown", Zl, !1), window.addEventListener("resize", pt), window.addEventListener("scroll", pt);
}
function tf() {
  window.removeEventListener("keyup", lo), window.removeEventListener("resize", pt), window.removeEventListener("scroll", pt);
}
function nf() {
  const n = T("popover");
  n && (n.wrapper.style.display = "none");
}
function Ci(n, e) {
  var t, r;
  let i = T("popover");
  i && document.body.removeChild(i.wrapper), i = sf(), document.body.appendChild(i.wrapper);
  const {
    title: s,
    description: o,
    showButtons: c,
    disableButtons: a,
    showProgress: u,
    nextBtnText: l = C("nextBtnText") || "Next &rarr;",
    prevBtnText: d = C("prevBtnText") || "&larr; Previous",
    progressText: f = C("progressText") || "{current} of {total}"
  } = e.popover || {};
  i.nextButton.innerHTML = l, i.previousButton.innerHTML = d, i.progress.innerHTML = f, s ? (i.title.innerHTML = s, i.title.style.display = "block") : i.title.style.display = "none", o ? (i.description.innerHTML = o, i.description.style.display = "block") : i.description.style.display = "none";
  const h = c || C("showButtons"), p = u || C("showProgress") || !1, y = (h == null ? void 0 : h.includes("next")) || (h == null ? void 0 : h.includes("previous")) || p;
  i.closeButton.style.display = h.includes("close") ? "block" : "none", y ? (i.footer.style.display = "flex", i.progress.style.display = p ? "block" : "none", i.nextButton.style.display = h.includes("next") ? "block" : "none", i.previousButton.style.display = h.includes("previous") ? "block" : "none") : i.footer.style.display = "none";
  const m = a || C("disableButtons") || [];
  m != null && m.includes("next") && (i.nextButton.disabled = !0, i.nextButton.classList.add("driver-popover-btn-disabled")), m != null && m.includes("previous") && (i.previousButton.disabled = !0, i.previousButton.classList.add("driver-popover-btn-disabled")), m != null && m.includes("close") && (i.closeButton.disabled = !0, i.closeButton.classList.add("driver-popover-btn-disabled"));
  const v = i.wrapper;
  v.style.display = "block", v.style.left = "", v.style.top = "", v.style.bottom = "", v.style.right = "", v.id = "driver-popover-content", v.setAttribute("role", "dialog"), v.setAttribute("aria-labelledby", "driver-popover-title"), v.setAttribute("aria-describedby", "driver-popover-description");
  const b = i.arrow;
  b.className = "driver-popover-arrow";
  const E = ((t = e.popover) == null ? void 0 : t.popoverClass) || C("popoverClass") || "";
  v.className = `driver-popover ${E}`.trim(), fo(
    i.wrapper,
    (R) => {
      var te, ve, Et;
      const He = R.target, kt = ((te = e.popover) == null ? void 0 : te.onNextClick) || C("onNextClick"), xe = ((ve = e.popover) == null ? void 0 : ve.onPrevClick) || C("onPrevClick"), St = ((Et = e.popover) == null ? void 0 : Et.onCloseClick) || C("onCloseClick");
      if (He.closest(".driver-popover-next-btn"))
        return kt ? kt(n, e, {
          config: C(),
          state: T(),
          driver: H()
        }) : Se("nextClick");
      if (He.closest(".driver-popover-prev-btn"))
        return xe ? xe(n, e, {
          config: C(),
          state: T(),
          driver: H()
        }) : Se("prevClick");
      if (He.closest(".driver-popover-close-btn"))
        return St ? St(n, e, {
          config: C(),
          state: T(),
          driver: H()
        }) : Se("closeClick");
    },
    (R) => !(i != null && i.description.contains(R)) && !(i != null && i.title.contains(R)) && typeof R.className == "string" && R.className.includes("driver-popover")
  ), q("popover", i);
  const k = ((r = e.popover) == null ? void 0 : r.onPopoverRender) || C("onPopoverRender");
  k && k(i, {
    config: C(),
    state: T(),
    driver: H()
  }), po(n, e), oo(v);
  const O = n.classList.contains("driver-dummy-element"), I = so([v, ...O ? [] : [n]]);
  I.length > 0 && I[0].focus();
}
function ho() {
  const n = T("popover");
  if (!(n != null && n.wrapper))
    return;
  const e = n.wrapper.getBoundingClientRect(), t = C("stagePadding") || 0, r = C("popoverOffset") || 0;
  return {
    width: e.width + t + r,
    height: e.height + t + r,
    realWidth: e.width,
    realHeight: e.height
  };
}
function Ti(n, e) {
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
function _i(n, e) {
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
function po(n, e) {
  const t = T("popover");
  if (!t)
    return;
  const { align: r = "start", side: i = "left" } = (e == null ? void 0 : e.popover) || {}, s = r, o = n.id === "driver-dummy-element" ? "over" : i, c = C("stagePadding") || 0, a = ho(), u = t.arrow.getBoundingClientRect(), l = n.getBoundingClientRect(), d = l.top - a.height;
  let f = d >= 0;
  const h = window.innerHeight - (l.bottom + a.height);
  let p = h >= 0;
  const y = l.left - a.width;
  let m = y >= 0;
  const v = window.innerWidth - (l.right + a.width);
  let b = v >= 0;
  const E = !f && !p && !m && !b;
  let k = o;
  if (o === "top" && f ? b = m = p = !1 : o === "bottom" && p ? b = m = f = !1 : o === "left" && m ? b = f = p = !1 : o === "right" && b && (m = f = p = !1), o === "over") {
    const O = window.innerWidth / 2 - a.realWidth / 2, I = window.innerHeight / 2 - a.realHeight / 2;
    t.wrapper.style.left = `${O}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${I}px`, t.wrapper.style.bottom = "auto";
  } else if (E) {
    const O = window.innerWidth / 2 - (a == null ? void 0 : a.realWidth) / 2, I = 10;
    t.wrapper.style.left = `${O}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${I}px`, t.wrapper.style.top = "auto";
  } else if (m) {
    const O = Math.min(
      y,
      window.innerWidth - (a == null ? void 0 : a.realWidth) - u.width
    ), I = Ti(s, {
      elementDimensions: l,
      popoverDimensions: a,
      popoverPadding: c,
      popoverArrowDimensions: u
    });
    t.wrapper.style.left = `${O}px`, t.wrapper.style.top = `${I}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", k = "left";
  } else if (b) {
    const O = Math.min(
      v,
      window.innerWidth - (a == null ? void 0 : a.realWidth) - u.width
    ), I = Ti(s, {
      elementDimensions: l,
      popoverDimensions: a,
      popoverPadding: c,
      popoverArrowDimensions: u
    });
    t.wrapper.style.right = `${O}px`, t.wrapper.style.top = `${I}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", k = "right";
  } else if (f) {
    const O = Math.min(
      d,
      window.innerHeight - a.realHeight - u.width
    );
    let I = _i(s, {
      elementDimensions: l,
      popoverDimensions: a,
      popoverPadding: c,
      popoverArrowDimensions: u
    });
    t.wrapper.style.top = `${O}px`, t.wrapper.style.left = `${I}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", k = "top";
  } else if (p) {
    const O = Math.min(
      h,
      window.innerHeight - (a == null ? void 0 : a.realHeight) - u.width
    );
    let I = _i(s, {
      elementDimensions: l,
      popoverDimensions: a,
      popoverPadding: c,
      popoverArrowDimensions: u
    });
    t.wrapper.style.left = `${I}px`, t.wrapper.style.bottom = `${O}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", k = "bottom";
  }
  E ? t.arrow.classList.add("driver-popover-arrow-none") : rf(s, k, n);
}
function rf(n, e, t) {
  const r = T("popover");
  if (!r)
    return;
  const i = t.getBoundingClientRect(), s = ho(), o = r.arrow, c = s.width, a = window.innerWidth, u = i.width, l = i.left, d = s.height, f = window.innerHeight, h = i.top, p = i.height;
  o.className = "driver-popover-arrow";
  let y = e, m = n;
  if (e === "top" ? (l + u <= 0 ? (y = "right", m = "end") : l + u - c <= 0 && (y = "top", m = "start"), l >= a ? (y = "left", m = "end") : l + c >= a && (y = "top", m = "end")) : e === "bottom" ? (l + u <= 0 ? (y = "right", m = "start") : l + u - c <= 0 && (y = "bottom", m = "start"), l >= a ? (y = "left", m = "start") : l + c >= a && (y = "bottom", m = "end")) : e === "left" ? (h + p <= 0 ? (y = "bottom", m = "end") : h + p - d <= 0 && (y = "left", m = "start"), h >= f ? (y = "top", m = "end") : h + d >= f && (y = "left", m = "end")) : e === "right" && (h + p <= 0 ? (y = "bottom", m = "start") : h + p - d <= 0 && (y = "right", m = "start"), h >= f ? (y = "top", m = "start") : h + d >= f && (y = "right", m = "end")), !y)
    o.classList.add("driver-popover-arrow-none");
  else {
    o.classList.add(`driver-popover-arrow-side-${y}`), o.classList.add(`driver-popover-arrow-align-${m}`);
    const v = t.getBoundingClientRect(), b = o.getBoundingClientRect(), E = C("stagePadding") || 0, k = v.left - E < window.innerWidth && v.right + E > 0 && v.top - E < window.innerHeight && v.bottom + E > 0;
    e === "bottom" && k && (b.x > v.x && b.x + b.width < v.x + v.width ? r.wrapper.style.transform = "translateY(0)" : (o.classList.remove(`driver-popover-arrow-align-${m}`), o.classList.add("driver-popover-arrow-none"), r.wrapper.style.transform = `translateY(-${E / 2}px)`));
  }
}
function sf() {
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
  const c = document.createElement("span");
  c.classList.add("driver-popover-navigation-btns");
  const a = document.createElement("button");
  a.type = "button", a.classList.add("driver-popover-prev-btn"), a.innerHTML = "&larr; Previous";
  const u = document.createElement("button");
  return u.type = "button", u.classList.add("driver-popover-next-btn"), u.innerHTML = "Next &rarr;", c.appendChild(a), c.appendChild(u), s.appendChild(o), s.appendChild(c), n.appendChild(i), n.appendChild(e), n.appendChild(t), n.appendChild(r), n.appendChild(s), {
    wrapper: n,
    arrow: e,
    title: t,
    description: r,
    footer: s,
    previousButton: a,
    nextButton: u,
    closeButton: i,
    footerButtons: c,
    progress: o
  };
}
function of() {
  var n;
  const e = T("popover");
  e && ((n = e.wrapper.parentElement) == null || n.removeChild(e.wrapper));
}
function af(n = {}) {
  _n(n);
  function e() {
    C("allowClose") && l();
  }
  function t() {
    const f = C("overlayClickBehavior");
    if (C("allowClose") && f === "close") {
      l();
      return;
    }
    if (typeof f == "function") {
      const h = T("__activeStep"), p = T("__activeElement");
      f(p, h, {
        config: C(),
        state: T(),
        driver: H()
      });
      return;
    }
    f === "nextStep" && r();
  }
  function r() {
    const f = T("activeIndex"), h = C("steps") || [];
    if (typeof f > "u")
      return;
    const p = f + 1;
    h[p] ? u(p) : l();
  }
  function i() {
    const f = T("activeIndex"), h = C("steps") || [];
    if (typeof f > "u")
      return;
    const p = f - 1;
    h[p] ? u(p) : l();
  }
  function s(f) {
    (C("steps") || [])[f] ? u(f) : l();
  }
  function o() {
    var f;
    if (T("__transitionCallback"))
      return;
    const h = T("activeIndex"), p = T("__activeStep"), y = T("__activeElement");
    if (typeof h > "u" || typeof p > "u" || typeof T("activeIndex") > "u")
      return;
    const m = ((f = p.popover) == null ? void 0 : f.onPrevClick) || C("onPrevClick");
    if (m)
      return m(y, p, {
        config: C(),
        state: T(),
        driver: H()
      });
    i();
  }
  function c() {
    var f;
    if (T("__transitionCallback"))
      return;
    const h = T("activeIndex"), p = T("__activeStep"), y = T("__activeElement");
    if (typeof h > "u" || typeof p > "u")
      return;
    const m = ((f = p.popover) == null ? void 0 : f.onNextClick) || C("onNextClick");
    if (m)
      return m(y, p, {
        config: C(),
        state: T(),
        driver: H()
      });
    r();
  }
  function a() {
    T("isInitialized") || (q("isInitialized", !0), document.body.classList.add("driver-active", C("animate") ? "driver-fade" : "driver-simple"), ef(), Ct("overlayClick", t), Ct("escapePress", e), Ct("arrowLeftPress", o), Ct("arrowRightPress", c));
  }
  function u(f = 0) {
    var h, p, y, m, v, b, E, k;
    const O = C("steps");
    if (!O) {
      console.error("No steps to drive through"), l();
      return;
    }
    if (!O[f]) {
      l();
      return;
    }
    q("__activeOnDestroyed", document.activeElement), q("activeIndex", f);
    const I = O[f], R = O[f + 1], te = O[f - 1], ve = ((h = I.popover) == null ? void 0 : h.doneBtnText) || C("doneBtnText") || "Done", Et = C("allowClose"), He = typeof ((p = I.popover) == null ? void 0 : p.showProgress) < "u" ? (y = I.popover) == null ? void 0 : y.showProgress : C("showProgress"), kt = (((m = I.popover) == null ? void 0 : m.progressText) || C("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${f + 1}`).replace("{{total}}", `${O.length}`), xe = ((v = I.popover) == null ? void 0 : v.showButtons) || C("showButtons"), St = [
      "next",
      "previous",
      ...Et ? ["close"] : []
    ].filter((go) => !(xe != null && xe.length) || xe.includes(go)), mo = ((b = I.popover) == null ? void 0 : b.onNextClick) || C("onNextClick"), yo = ((E = I.popover) == null ? void 0 : E.onPrevClick) || C("onPrevClick"), vo = ((k = I.popover) == null ? void 0 : k.onCloseClick) || C("onCloseClick");
    xi({
      ...I,
      popover: {
        showButtons: St,
        nextBtnText: R ? void 0 : ve,
        disableButtons: [...te ? [] : ["previous"]],
        showProgress: He,
        progressText: kt,
        onNextClick: mo || (() => {
          R ? u(f + 1) : l();
        }),
        onPrevClick: yo || (() => {
          u(f - 1);
        }),
        onCloseClick: vo || (() => {
          l();
        }),
        ...(I == null ? void 0 : I.popover) || {}
      }
    });
  }
  function l(f = !0) {
    const h = T("__activeElement"), p = T("__activeStep"), y = T("__activeOnDestroyed"), m = C("onDestroyStarted");
    if (f && m) {
      const E = !h || (h == null ? void 0 : h.id) === "driver-dummy-element";
      m(E ? void 0 : h, p, {
        config: C(),
        state: T(),
        driver: H()
      });
      return;
    }
    const v = (p == null ? void 0 : p.onDeselected) || C("onDeselected"), b = C("onDestroyed");
    if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), tf(), of(), Xl(), Gl(), Bl(), Oi(), h && p) {
      const E = h.id === "driver-dummy-element";
      v && v(E ? void 0 : h, p, {
        config: C(),
        state: T(),
        driver: H()
      }), b && b(E ? void 0 : h, p, {
        config: C(),
        state: T(),
        driver: H()
      });
    }
    y && y.focus();
  }
  const d = {
    isActive: () => T("isInitialized") || !1,
    refresh: pt,
    drive: (f = 0) => {
      a(), u(f);
    },
    setConfig: _n,
    setSteps: (f) => {
      Oi(), _n({
        ...C(),
        steps: f
      });
    },
    getConfig: C,
    getState: T,
    getActiveIndex: () => T("activeIndex"),
    isFirstStep: () => T("activeIndex") === 0,
    isLastStep: () => {
      const f = C("steps") || [], h = T("activeIndex");
      return h !== void 0 && h === f.length - 1;
    },
    getActiveStep: () => T("activeStep"),
    getActiveElement: () => T("activeElement"),
    getPreviousElement: () => T("previousElement"),
    getPreviousStep: () => T("previousStep"),
    moveNext: r,
    movePrevious: i,
    moveTo: s,
    hasNextStep: () => {
      const f = C("steps") || [], h = T("activeIndex");
      return h !== void 0 && !!f[h + 1];
    },
    hasPreviousStep: () => {
      const f = C("steps") || [], h = T("activeIndex");
      return h !== void 0 && !!f[h - 1];
    },
    highlight: (f) => {
      a(), xi({
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
      l(!1);
    }
  };
  return Vl(d), d;
}
function cf() {
  const { client: n, config: e } = Er(), [t, r] = fe([]), [i, s] = fe(!0), [o, c] = fe(null), [a, u] = fe(null), l = Ai(null), d = e.userId || "", f = nt(async () => {
    if (d)
      try {
        s(!0), c(null);
        const y = await n.getAssignedGuides(d, e.schoolYear);
        r(y);
      } catch (y) {
        c(y instanceof Error ? y : new Error("Failed to fetch guides"));
      } finally {
        s(!1);
      }
  }, [n, d, e.schoolYear]);
  Mt(() => {
    f();
  }, [f]), Mt(() => () => {
    l.current && l.current.destroy();
  }, []);
  const h = nt((y) => {
    const m = t.find((E) => E.id === y);
    if (!m) return;
    u(m);
    const v = m.steps.sort((E, k) => E.stepOrder - k.stepOrder).map((E) => ({
      element: E.elementSelector || void 0,
      popover: {
        title: E.title,
        description: E.description,
        side: E.side
      }
    }));
    l.current && l.current.destroy();
    const b = af({
      showProgress: !0,
      steps: v,
      onDestroyed: () => {
        u(null), n.recordGuideCompletion(d, y).then(() => {
          r((E) => E.filter((k) => k.id !== y));
        });
      }
    });
    l.current = b, b.drive();
  }, [t, n, d]), p = nt(async (y) => {
    d && (await n.recordGuideCompletion(d, y), r((m) => m.filter((v) => v.id !== y)));
  }, [n, d]);
  return {
    guides: t,
    isLoading: i,
    error: o,
    startGuide: h,
    dismissGuide: p,
    activeGuide: a,
    refresh: f
  };
}
function uf({ handbook: n, onAcknowledge: e, isAcknowledging: t }) {
  return /* @__PURE__ */ U("div", { className: "guideops-modal-overlay", children: /* @__PURE__ */ In("div", { className: "guideops-modal", children: [
    /* @__PURE__ */ In("div", { className: "guideops-modal-header", children: [
      /* @__PURE__ */ U("h2", { className: "guideops-modal-title", children: n.title }),
      /* @__PURE__ */ U("p", { className: "guideops-modal-subtitle", children: "Please read and acknowledge the following before continuing." })
    ] }),
    /* @__PURE__ */ U("div", { className: "guideops-modal-content", children: n.contentUrl ? /* @__PURE__ */ U(
      "iframe",
      {
        src: n.contentUrl,
        title: n.title,
        className: "guideops-modal-iframe"
      }
    ) : n.contentHtml ? /* @__PURE__ */ U(
      "div",
      {
        className: "guideops-modal-html",
        dangerouslySetInnerHTML: { __html: n.contentHtml }
      }
    ) : /* @__PURE__ */ U("p", { className: "guideops-modal-empty", children: "No content available for this handbook." }) }),
    /* @__PURE__ */ U("div", { className: "guideops-modal-footer", children: /* @__PURE__ */ U(
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
function gf({ children: n, fallback: e, loadingComponent: t }) {
  const { pendingHandbooks: r, isLoading: i, acknowledge: s, hasAllAcknowledged: o } = jl(), [c, a] = fe(!1);
  if (i)
    return /* @__PURE__ */ U(on, { children: t || e || /* @__PURE__ */ U(lf, {}) });
  if (o)
    return /* @__PURE__ */ U(on, { children: n });
  const u = r[0];
  return u ? /* @__PURE__ */ U(
    uf,
    {
      handbook: u,
      onAcknowledge: async () => {
        a(!0);
        try {
          await s(u.id);
        } finally {
          a(!1);
        }
      },
      isAcknowledging: c
    }
  ) : /* @__PURE__ */ U(on, { children: n });
}
function lf() {
  return /* @__PURE__ */ In("div", { className: "guideops-loading", children: [
    /* @__PURE__ */ U("div", { className: "guideops-spinner" }),
    /* @__PURE__ */ U("p", { children: "Loading..." })
  ] });
}
function bf({ autoStart: n = !1 }) {
  const { guides: e, startGuide: t, activeGuide: r } = cf(), i = Ai(!1);
  return Mt(() => {
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
  vf as GuideOpsProvider,
  bf as GuideRenderer,
  gf as HandbookGate,
  uf as HandbookModal,
  cf as useGuides,
  jl as useHandbookAcknowledgment
};
