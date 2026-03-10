import { jsx as o, jsxs as b, Fragment as x } from "react/jsx-runtime";
import { createContext as _, useMemo as M, useState as w, useCallback as A, useEffect as O, useContext as U, useRef as R } from "react";
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
async function L(e, n, t) {
  var u;
  const s = await e.getAccessToken(), r = await fetch(e.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${s}`
    },
    body: JSON.stringify({ query: n, variables: t })
  });
  if (!r.ok)
    throw new Error(`GraphQL request failed: ${r.status} ${r.statusText}`);
  const a = await r.json();
  if ((u = a.errors) != null && u.length)
    throw new Error(a.errors[0].message);
  return a.data;
}
function J(e) {
  return {
    async getAssignedGuides(n, t) {
      return (await L(
        e,
        F,
        { azureAdObjectId: n, schoolYear: t }
      )).assignedGuides;
    },
    async getPendingHandbooks(n, t) {
      return (await L(
        e,
        W,
        { azureAdObjectId: n, schoolYear: t }
      )).pendingHandbooks;
    },
    async recordAcknowledgment(n, t, s) {
      return (await L(
        e,
        B,
        { input: { azureAdObjectId: n, handbookId: t, schoolYear: s } }
      )).recordAcknowledgment;
    },
    async recordGuideCompletion(n, t) {
      await L(
        e,
        K,
        { azureAdObjectId: n, guideId: t }
      );
    }
  };
}
const j = _(null);
function Y() {
  const e = U(j);
  if (!e)
    throw new Error("useGuideOpsContext must be used within a <GuideOpsProvider>");
  return e;
}
function se({ config: e, children: n }) {
  const t = M(() => J(e), [e]), s = e.userId || "", [r, a] = w([]), [u, p] = w(!0), [i, l] = w(null), [c, h] = w(null), [g, N] = w(0), k = A(async () => {
    if (s)
      try {
        p(!0), l(null);
        const d = await t.getAssignedGuides(s, e.schoolYear);
        a(d);
      } catch (d) {
        l(d instanceof Error ? d : new Error("Failed to fetch guides"));
      } finally {
        p(!1);
      }
  }, [t, s, e.schoolYear]);
  O(() => {
    k();
  }, [k]);
  const C = A((d) => {
    const f = r.find((v) => v.id === d);
    f && (h(f), N(0));
  }, [r]), G = A(() => {
    if (!c) return;
    const d = c.id;
    h(null), N(0), t.recordGuideCompletion(s, d).then(() => {
      a((f) => f.filter((v) => v.id !== d));
    });
  }, [c, t, s]), E = A(() => {
    if (!c) return;
    const d = c.steps.slice().sort((f, v) => f.stepOrder - v.stepOrder);
    g < d.length - 1 ? N((f) => f + 1) : G();
  }, [c, g, G]), m = A(() => {
    g > 0 && N((d) => d - 1);
  }, [g]), y = A(async (d) => {
    s && (await t.recordGuideCompletion(s, d), a((f) => f.filter((v) => v.id !== d)));
  }, [t, s]), S = M(() => ({
    client: t,
    config: e,
    guides: r,
    isLoading: u,
    error: i,
    activeGuide: c,
    currentStepIndex: g,
    startGuide: C,
    dismissGuide: y,
    nextStep: E,
    prevStep: m,
    closeGuide: G,
    refresh: k
  }), [t, e, r, u, i, c, g, C, y, E, m, G, k]);
  return /* @__PURE__ */ o(j.Provider, { value: S, children: n });
}
function Q() {
  const { client: e, config: n } = Y(), [t, s] = w([]), [r, a] = w(!0), [u, p] = w(null), i = n.userId || "", l = A(async () => {
    if (i)
      try {
        a(!0), p(null);
        const h = await e.getPendingHandbooks(i, n.schoolYear);
        s(h);
      } catch (h) {
        p(h instanceof Error ? h : new Error("Failed to fetch handbooks"));
      } finally {
        a(!1);
      }
  }, [e, i, n.schoolYear]);
  O(() => {
    l();
  }, [l]);
  const c = A(async (h) => {
    if (i)
      try {
        await e.recordAcknowledgment(i, h, n.schoolYear), s((g) => g.filter((N) => N.id !== h));
      } catch (g) {
        throw p(g instanceof Error ? g : new Error("Failed to record acknowledgment")), g;
      }
  }, [e, i, n.schoolYear]);
  return {
    pendingHandbooks: t,
    isLoading: r,
    error: u,
    acknowledge: c,
    hasAllAcknowledged: !r && t.length === 0,
    refresh: l
  };
}
function V() {
  const e = Y();
  return {
    guides: e.guides,
    isLoading: e.isLoading,
    error: e.error,
    startGuide: e.startGuide,
    dismissGuide: e.dismissGuide,
    activeGuide: e.activeGuide,
    currentStepIndex: e.currentStepIndex,
    nextStep: e.nextStep,
    prevStep: e.prevStep,
    closeGuide: e.closeGuide,
    refresh: e.refresh
  };
}
function X({ handbook: e, onAcknowledge: n, isAcknowledging: t }) {
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
        onClick: n,
        disabled: t,
        className: "guideops-acknowledge-btn",
        children: t ? "Processing..." : "I Acknowledge"
      }
    ) })
  ] }) });
}
function re({ children: e, fallback: n, loadingComponent: t }) {
  const { pendingHandbooks: s, isLoading: r, acknowledge: a, hasAllAcknowledged: u } = Q(), [p, i] = w(!1);
  if (r)
    return /* @__PURE__ */ o(x, { children: t || n || /* @__PURE__ */ o(Z, {}) });
  if (u)
    return /* @__PURE__ */ o(x, { children: e });
  const l = s[0];
  return l ? /* @__PURE__ */ o(
    X,
    {
      handbook: l,
      onAcknowledge: async () => {
        i(!0);
        try {
          await a(l.id);
        } finally {
          i(!1);
        }
      },
      isAcknowledging: p
    }
  ) : /* @__PURE__ */ o(x, { children: e });
}
function Z() {
  return /* @__PURE__ */ b("div", { className: "guideops-loading", children: [
    /* @__PURE__ */ o("div", { className: "guideops-spinner" }),
    /* @__PURE__ */ o("p", { children: "Loading..." })
  ] });
}
function ee({ targetSelector: e, onClick: n }) {
  const [t, s] = w(null);
  if (O(() => {
    if (!e) {
      s(null);
      return;
    }
    const l = () => {
      const c = document.querySelector(e);
      s(c ? c.getBoundingClientRect() : null);
    };
    return l(), window.addEventListener("resize", l), window.addEventListener("scroll", l, !0), () => {
      window.removeEventListener("resize", l), window.removeEventListener("scroll", l, !0);
    };
  }, [e]), !t)
    return /* @__PURE__ */ o("div", { className: "guideops-overlay", onClick: n });
  const r = 8, a = t.top - r, u = t.left - r, p = t.width + r * 2, i = t.height + r * 2;
  return /* @__PURE__ */ b(x, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: 0, left: 0, right: 0, height: Math.max(0, a) },
        onClick: n
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: a + i, left: 0, right: 0, bottom: 0 },
        onClick: n
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: a, left: 0, width: Math.max(0, u), height: i },
        onClick: n
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-overlay-segment",
        style: { top: a, left: u + p, right: 0, height: i },
        onClick: n
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: "guideops-highlight-ring",
        style: { top: a, left: u, width: p, height: i }
      }
    )
  ] });
}
function te({
  step: e,
  stepIndex: n,
  totalSteps: t,
  onNext: s,
  onPrev: r,
  onClose: a
}) {
  const u = R(null), [p, i] = w(null), [l, c] = w("bottom"), [h, g] = w(!1), N = n === 0, k = n === t - 1;
  O(() => {
    const G = () => {
      if (!e.elementSelector) {
        g(!0);
        return;
      }
      const E = document.querySelector(e.elementSelector);
      if (!E) {
        g(!0);
        return;
      }
      g(!1);
      const m = E.getBoundingClientRect(), y = u.current, S = (y == null ? void 0 : y.offsetWidth) ?? 320, d = (y == null ? void 0 : y.offsetHeight) ?? 200, f = 16, v = ["top", "bottom", "left", "right"].includes(e.side) ? e.side : "bottom", $ = {
        bottom: {
          top: m.bottom + f,
          left: m.left + m.width / 2 - S / 2
        },
        top: {
          top: m.top - d - f,
          left: m.left + m.width / 2 - S / 2
        },
        right: {
          top: m.top + m.height / 2 - d / 2,
          left: m.right + f
        },
        left: {
          top: m.top + m.height / 2 - d / 2,
          left: m.left - S - f
        }
      }, T = [v, "bottom", "top", "right", "left"], P = /* @__PURE__ */ new Set();
      for (const H of T) {
        if (P.has(H)) continue;
        P.add(H);
        const I = $[H], D = I.top >= 0 && I.top + d <= window.innerHeight, q = I.left >= 0 && I.left + S <= window.innerWidth;
        if (D && q) {
          i({
            top: Math.max(8, Math.min(I.top, window.innerHeight - d - 8)),
            left: Math.max(8, Math.min(I.left, window.innerWidth - S - 8))
          }), c(H);
          return;
        }
      }
      const z = $[v];
      i({
        top: Math.max(8, Math.min(z.top, window.innerHeight - d - 8)),
        left: Math.max(8, Math.min(z.left, window.innerWidth - S - 8))
      }), c(v);
    };
    return requestAnimationFrame(G), window.addEventListener("resize", G), window.addEventListener("scroll", G, !0), () => {
      window.removeEventListener("resize", G), window.removeEventListener("scroll", G, !0);
    };
  }, [e]);
  const C = h ? {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  } : p ? { position: "fixed", top: p.top, left: p.left } : { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return /* @__PURE__ */ b(
    "div",
    {
      ref: u,
      className: `guideops-step-popover guideops-step-popover--${l}`,
      style: C,
      children: [
        !h && p && /* @__PURE__ */ o("div", { className: `guideops-step-arrow guideops-step-arrow--${l}` }),
        /* @__PURE__ */ b("div", { className: "guideops-step-header", children: [
          /* @__PURE__ */ b("span", { className: "guideops-step-progress", children: [
            "Step ",
            n + 1,
            " of ",
            t
          ] }),
          /* @__PURE__ */ o("button", { className: "guideops-step-close", onClick: a, "aria-label": "Close guide", children: "×" })
        ] }),
        /* @__PURE__ */ b("div", { className: "guideops-step-body", children: [
          /* @__PURE__ */ o("h3", { className: "guideops-step-title", children: e.title }),
          /* @__PURE__ */ o("p", { className: "guideops-step-description", children: e.description })
        ] }),
        /* @__PURE__ */ b("div", { className: "guideops-step-footer", children: [
          !N && /* @__PURE__ */ o("button", { className: "guideops-step-btn guideops-step-btn--secondary", onClick: r, children: "Previous" }),
          /* @__PURE__ */ o("button", { className: "guideops-step-btn guideops-step-btn--primary", onClick: s, children: k ? "Done" : "Next" })
        ] })
      ]
    }
  );
}
function ie({ autoStart: e = !1 }) {
  const { guides: n, startGuide: t, activeGuide: s, currentStepIndex: r, nextStep: a, prevStep: u, closeGuide: p } = V(), i = R(!1);
  if (O(() => {
    if (e && n.length > 0 && !s && !i.current) {
      i.current = !0;
      const h = setTimeout(() => {
        t(n[0].id);
      }, 500);
      return () => clearTimeout(h);
    }
  }, [e, n, s, t]), !s) return null;
  const l = s.steps.slice().sort((h, g) => h.stepOrder - g.stepOrder), c = l[r];
  return c ? /* @__PURE__ */ b(x, { children: [
    /* @__PURE__ */ o(ee, { targetSelector: c.elementSelector || void 0 }),
    /* @__PURE__ */ o(
      te,
      {
        step: c,
        stepIndex: r,
        totalSteps: l.length,
        onNext: a,
        onPrev: u,
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
