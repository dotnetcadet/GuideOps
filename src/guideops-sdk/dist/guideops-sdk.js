import { jsx as o, jsxs as b, Fragment as S } from "react/jsx-runtime";
import { createContext as q, useMemo as _, useContext as U, useState as v, useCallback as y, useEffect as E, useRef as M } from "react";
const F = `
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
`, W = `
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
`, B = `
  mutation RecordAcknowledgment($input: RecordAcknowledgmentInput!) {
    recordAcknowledgment(input: $input) {
      id
      handbookId
      acknowledgedAt
    }
  }
`, K = `
  mutation RecordGuideCompletion($azureAdObjectId: String!, $guideId: Int!) {
    recordGuideCompletion(azureAdObjectId: $azureAdObjectId, guideId: $guideId) {
      id
    }
  }
`;
async function C(e, t, n) {
  var h;
  const r = await e.getAccessToken(), d = await fetch(e.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${r}`
    },
    body: JSON.stringify({ query: t, variables: n })
  });
  if (!d.ok)
    throw new Error(`GraphQL request failed: ${d.status} ${d.statusText}`);
  const l = await d.json();
  if ((h = l.errors) != null && h.length)
    throw new Error(l.errors[0].message);
  return l.data;
}
function J(e) {
  return {
    async getAssignedGuides(t, n) {
      return (await C(
        e,
        F,
        { azureAdObjectId: t, schoolYear: n }
      )).assignedGuides;
    },
    async getPendingHandbooks(t, n) {
      return (await C(
        e,
        W,
        { azureAdObjectId: t, schoolYear: n }
      )).pendingHandbooks;
    },
    async recordAcknowledgment(t, n, r) {
      return (await C(
        e,
        B,
        { input: { azureAdObjectId: t, handbookId: n, schoolYear: r } }
      )).recordAcknowledgment;
    },
    async recordGuideCompletion(t, n) {
      await C(
        e,
        K,
        { azureAdObjectId: t, guideId: n }
      );
    }
  };
}
const R = q(null);
function j() {
  const e = U(R);
  if (!e)
    throw new Error("useGuideOpsContext must be used within a <GuideOpsProvider>");
  return e;
}
function se({ config: e, children: t }) {
  const n = _(() => ({
    client: J(e),
    config: e
  }), [e]);
  return /* @__PURE__ */ o(R.Provider, { value: n, children: t });
}
function Q() {
  const { client: e, config: t } = j(), [n, r] = v([]), [d, l] = v(!0), [h, p] = v(null), s = t.userId || "", a = y(async () => {
    if (s)
      try {
        l(!0), p(null);
        const u = await e.getPendingHandbooks(s, t.schoolYear);
        r(u);
      } catch (u) {
        p(u instanceof Error ? u : new Error("Failed to fetch handbooks"));
      } finally {
        l(!1);
      }
  }, [e, s, t.schoolYear]);
  E(() => {
    a();
  }, [a]);
  const g = y(async (u) => {
    if (s)
      try {
        await e.recordAcknowledgment(s, u, t.schoolYear), r((c) => c.filter((G) => G.id !== u));
      } catch (c) {
        throw p(c instanceof Error ? c : new Error("Failed to record acknowledgment")), c;
      }
  }, [e, s, t.schoolYear]);
  return {
    pendingHandbooks: n,
    isLoading: d,
    error: h,
    acknowledge: g,
    hasAllAcknowledged: !d && n.length === 0,
    refresh: a
  };
}
function V() {
  const { client: e, config: t } = j(), [n, r] = v([]), [d, l] = v(!0), [h, p] = v(null), [s, a] = v(null), [g, u] = v(0), c = t.userId || "", G = y(async () => {
    if (c)
      try {
        l(!0), p(null);
        const i = await e.getAssignedGuides(c, t.schoolYear);
        r(i);
      } catch (i) {
        p(i instanceof Error ? i : new Error("Failed to fetch guides"));
      } finally {
        l(!1);
      }
  }, [e, c, t.schoolYear]);
  E(() => {
    G();
  }, [G]);
  const H = y((i) => {
    const f = n.find((w) => w.id === i);
    f && (a(f), u(0));
  }, [n]), k = y(() => {
    if (!s) return;
    const i = s.id;
    a(null), u(0), e.recordGuideCompletion(c, i).then(() => {
      r((f) => f.filter((w) => w.id !== i));
    });
  }, [s, e, c]), N = y(() => {
    if (!s) return;
    const i = s.steps.slice().sort((f, w) => f.stepOrder - w.stepOrder);
    g < i.length - 1 ? u((f) => f + 1) : k();
  }, [s, g, k]), I = y(() => {
    g > 0 && u((i) => i - 1);
  }, [g]), m = y(async (i) => {
    c && (await e.recordGuideCompletion(c, i), r((f) => f.filter((w) => w.id !== i)));
  }, [e, c]);
  return {
    guides: n,
    isLoading: d,
    error: h,
    startGuide: H,
    dismissGuide: m,
    activeGuide: s,
    currentStepIndex: g,
    nextStep: N,
    prevStep: I,
    closeGuide: k,
    refresh: G
  };
}
function X({ handbook: e, onAcknowledge: t, isAcknowledging: n }) {
  return /* @__PURE__ */ o("div", { className: "guideops-modal-overlay", children: /* @__PURE__ */ b("div", { className: "guideops-modal", children: [
    /* @__PURE__ */ b("div", { className: "guideops-modal-header", children: [
      /* @__PURE__ */ o("h2", { className: "guideops-modal-title", children: e.title }),
      /* @__PURE__ */ o("p", { className: "guideops-modal-subtitle", children: "Please read and acknowledge the following before continuing." })
    ] }),
    /* @__PURE__ */ o("div", { className: "guideops-modal-content", children: e.contentUrl ? /* @__PURE__ */ o(
      "iframe",
      {
        src: e.contentUrl,
        title: e.title,
        className: "guideops-modal-iframe"
      }
    ) : e.contentHtml ? /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-modal-html",
        dangerouslySetInnerHTML: { __html: e.contentHtml }
      }
    ) : /* @__PURE__ */ o("p", { className: "guideops-modal-empty", children: "No content available for this handbook." }) }),
    /* @__PURE__ */ o("div", { className: "guideops-modal-footer", children: /* @__PURE__ */ o(
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
function re({ children: e, fallback: t, loadingComponent: n }) {
  const { pendingHandbooks: r, isLoading: d, acknowledge: l, hasAllAcknowledged: h } = Q(), [p, s] = v(!1);
  if (d)
    return /* @__PURE__ */ o(S, { children: n || t || /* @__PURE__ */ o(Z, {}) });
  if (h)
    return /* @__PURE__ */ o(S, { children: e });
  const a = r[0];
  return a ? /* @__PURE__ */ o(
    X,
    {
      handbook: a,
      onAcknowledge: async () => {
        s(!0);
        try {
          await l(a.id);
        } finally {
          s(!1);
        }
      },
      isAcknowledging: p
    }
  ) : /* @__PURE__ */ o(S, { children: e });
}
function Z() {
  return /* @__PURE__ */ b("div", { className: "guideops-loading", children: [
    /* @__PURE__ */ o("div", { className: "guideops-spinner" }),
    /* @__PURE__ */ o("p", { children: "Loading..." })
  ] });
}
function ee({ targetSelector: e, onClick: t }) {
  const [n, r] = v(null);
  if (E(() => {
    if (!e) {
      r(null);
      return;
    }
    const a = () => {
      const g = document.querySelector(e);
      r(g ? g.getBoundingClientRect() : null);
    };
    return a(), window.addEventListener("resize", a), window.addEventListener("scroll", a, !0), () => {
      window.removeEventListener("resize", a), window.removeEventListener("scroll", a, !0);
    };
  }, [e]), !n)
    return /* @__PURE__ */ o("div", { className: "guideops-overlay", onClick: t });
  const d = 8, l = n.top - d, h = n.left - d, p = n.width + d * 2, s = n.height + d * 2;
  return /* @__PURE__ */ b(S, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: 0, left: 0, right: 0, height: Math.max(0, l) },
        onClick: t
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: l + s, left: 0, right: 0, bottom: 0 },
        onClick: t
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: l, left: 0, width: Math.max(0, h), height: s },
        onClick: t
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: l, left: h + p, right: 0, height: s },
        onClick: t
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-highlight-ring",
        style: { top: l, left: h, width: p, height: s }
      }
    )
  ] });
}
function te({
  step: e,
  stepIndex: t,
  totalSteps: n,
  onNext: r,
  onPrev: d,
  onClose: l
}) {
  const h = M(null), [p, s] = v(null), [a, g] = v("bottom"), [u, c] = v(!1), G = t === 0, H = t === n - 1;
  E(() => {
    const N = () => {
      if (!e.elementSelector) {
        c(!0);
        return;
      }
      const I = document.querySelector(e.elementSelector);
      if (!I) {
        c(!0);
        return;
      }
      c(!1);
      const m = I.getBoundingClientRect(), i = h.current, f = (i == null ? void 0 : i.offsetWidth) ?? 320, w = (i == null ? void 0 : i.offsetHeight) ?? 200, O = 16, L = ["top", "bottom", "left", "right"].includes(e.side) ? e.side : "bottom", $ = {
        bottom: {
          top: m.bottom + O,
          left: m.left + m.width / 2 - f / 2
        },
        top: {
          top: m.top - w - O,
          left: m.left + m.width / 2 - f / 2
        },
        right: {
          top: m.top + m.height / 2 - w / 2,
          left: m.right + O
        },
        left: {
          top: m.top + m.height / 2 - w / 2,
          left: m.left - f - O
        }
      }, Y = [L, "bottom", "top", "right", "left"], P = /* @__PURE__ */ new Set();
      for (const x of Y) {
        if (P.has(x)) continue;
        P.add(x);
        const A = $[x], T = A.top >= 0 && A.top + w <= window.innerHeight, D = A.left >= 0 && A.left + f <= window.innerWidth;
        if (T && D) {
          s({
            top: Math.max(8, Math.min(A.top, window.innerHeight - w - 8)),
            left: Math.max(8, Math.min(A.left, window.innerWidth - f - 8))
          }), g(x);
          return;
        }
      }
      const z = $[L];
      s({
        top: Math.max(8, Math.min(z.top, window.innerHeight - w - 8)),
        left: Math.max(8, Math.min(z.left, window.innerWidth - f - 8))
      }), g(L);
    };
    return requestAnimationFrame(N), window.addEventListener("resize", N), window.addEventListener("scroll", N, !0), () => {
      window.removeEventListener("resize", N), window.removeEventListener("scroll", N, !0);
    };
  }, [e]);
  const k = u ? {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  } : p ? { position: "fixed", top: p.top, left: p.left } : { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return /* @__PURE__ */ b(
    "div",
    {
      ref: h,
      className: `guideops-step-popover guideops-step-popover--${a}`,
      style: k,
      children: [
        !u && p && /* @__PURE__ */ o("div", { className: `guideops-step-arrow guideops-step-arrow--${a}` }),
        /* @__PURE__ */ b("div", { className: "guideops-step-header", children: [
          /* @__PURE__ */ b("span", { className: "guideops-step-progress", children: [
            "Step ",
            t + 1,
            " of ",
            n
          ] }),
          /* @__PURE__ */ o("button", { className: "guideops-step-close", onClick: l, "aria-label": "Close guide", children: "×" })
        ] }),
        /* @__PURE__ */ b("div", { className: "guideops-step-body", children: [
          /* @__PURE__ */ o("h3", { className: "guideops-step-title", children: e.title }),
          /* @__PURE__ */ o("p", { className: "guideops-step-description", children: e.description })
        ] }),
        /* @__PURE__ */ b("div", { className: "guideops-step-footer", children: [
          !G && /* @__PURE__ */ o("button", { className: "guideops-step-btn guideops-step-btn--secondary", onClick: d, children: "Previous" }),
          /* @__PURE__ */ o("button", { className: "guideops-step-btn guideops-step-btn--primary", onClick: r, children: H ? "Done" : "Next" })
        ] })
      ]
    }
  );
}
function ie({ autoStart: e = !1 }) {
  const { guides: t, startGuide: n, activeGuide: r, currentStepIndex: d, nextStep: l, prevStep: h, closeGuide: p } = V(), s = M(!1);
  if (E(() => {
    if (e && t.length > 0 && !r && !s.current) {
      s.current = !0;
      const u = setTimeout(() => {
        n(t[0].id);
      }, 500);
      return () => clearTimeout(u);
    }
  }, [e, t, r, n]), !r) return null;
  const a = r.steps.slice().sort((u, c) => u.stepOrder - c.stepOrder), g = a[d];
  return g ? /* @__PURE__ */ b(S, { children: [
    /* @__PURE__ */ o(ee, { targetSelector: g.elementSelector || void 0 }),
    /* @__PURE__ */ o(
      te,
      {
        step: g,
        stepIndex: d,
        totalSteps: a.length,
        onNext: l,
        onPrev: h,
        onClose: p
      }
    )
  ] }) : null;
}
export {
  se as GuideOpsProvider,
  ee as GuideOverlay,
  ie as GuideRenderer,
  te as GuideStepPopover,
  re as HandbookGate,
  X as HandbookModal,
  V as useGuides,
  Q as useHandbookAcknowledgment
};
