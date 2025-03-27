import { defineComponent as S, useAttrs as j, computed as x, createBlock as L, openBlock as p, resolveDynamicComponent as We, mergeProps as O, unref as y, withCtx as z, createElementBlock as b, createCommentVNode as C, toDisplayString as $, ref as I, watch as Pe, createElementVNode as g, normalizeClass as P, renderSlot as _, Fragment as W, renderList as H, createTextVNode as Y, resolveComponent as Ye, createVNode as X, createSlots as Ze, normalizeProps as et, guardReactiveProps as tt, onMounted as nt, isRef as rt, h as pe, provide as st, Transition as Ce, Teleport as ot } from "vue";
import at from "vuedraggable";
import se from "axios";
const lt = ["textContent"], it = /* @__PURE__ */ S({
  __name: "DXButton",
  props: {
    as: { default: "button" },
    label: { default: "" },
    href: { default: "" },
    icon: { default: "" },
    text: { type: Boolean, default: !1 },
    outlined: { type: Boolean, default: !1 },
    rounded: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    iconPosition: { default: "left" },
    severity: { default: "primary" },
    size: { default: "base" }
  },
  setup(e) {
    const n = e, t = j(), s = x(() => [
      "btn",
      "cursor-pointer",
      `btn-${n.severity}`,
      `btn-${n.size}`,
      n.icon ? "btn-icon" : "",
      n.text ? "btn-text" : "",
      n.outlined ? "btn-outlined" : "",
      n.rounded ? "btn-rounded" : "",
      n.disabled ? "btn-disabled" : ""
    ].filter(Boolean));
    return (r, o) => (p(), L(We(n.as), O(y(t), {
      href: n.as === "a" && !n.disabled ? n.href : void 0,
      disabled: n.disabled,
      class: s.value
    }), {
      default: z(() => [
        n.label ? (p(), b("span", {
          key: 0,
          textContent: $(n.label)
        }, null, 8, lt)) : C("", !0)
      ]),
      _: 1
    }, 16, ["href", "disabled", "class"]));
  }
});
function De(e, n) {
  const t = I(null), s = I(e.id || `toggle-${crypto.randomUUID()}`), r = x(() => Array.isArray(e.modelValue) ? e.modelValue.some((a) => JSON.stringify(a) === JSON.stringify(e.value)) : JSON.stringify(e.modelValue) === JSON.stringify(e.value) || e.modelValue === !0);
  return Pe(
    () => e.indeterminate,
    (a) => {
      t.value && (t.value.indeterminate = !!a);
    },
    { immediate: !0 }
  ), { isChecked: r, inputRef: t, updateValue: () => {
    let a;
    Array.isArray(e.modelValue) ? r.value ? a = e.modelValue.filter((c) => JSON.stringify(c) !== JSON.stringify(e.value)) : a = [...e.modelValue, e.value] : a = e.value !== void 0 ? r.value ? null : e.value : !e.modelValue, n("update:modelValue", a);
  }, uniqueId: s };
}
const ct = ["id", "checked"], Ve = /* @__PURE__ */ S({
  __name: "DXCheckbox",
  props: {
    modelValue: {},
    value: {},
    indeterminate: { type: Boolean },
    id: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = j(), { isChecked: o, inputRef: a, updateValue: c, uniqueId: l } = De(t, s);
    return (u, i) => (p(), b("input", O({
      ref_key: "inputRef",
      ref: a,
      id: y(l),
      type: "checkbox",
      checked: y(o),
      onChange: i[0] || (i[0] = //@ts-ignore
      (...d) => y(c) && y(c)(...d))
    }, y(r), { class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" }), null, 16, ct));
  }
}), ut = ["checked"], dt = /* @__PURE__ */ S({
  __name: "DXRadio",
  props: {
    modelValue: {},
    value: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = j(), o = x(() => JSON.stringify(t.modelValue) === JSON.stringify(t.value)), a = () => s("update:modelValue", t.value);
    return (c, l) => (p(), b("input", O({
      type: "radio",
      checked: o.value,
      onChange: a
    }, y(r), { class: "w-4 h-4 cursor-pointer border-secondary focus:ring-2 focus:ring-primary checked:bg-primary checked:border-primary dark:border-secondary dark:focus:ring-primary dark:checked:bg-primary dark:checked:border-primary" }), null, 16, ut));
  }
}), ft = { class: "relative inline-flex items-center cursor-pointer" }, pt = ["checked", "id"], gt = /* @__PURE__ */ S({
  __name: "DXToggle",
  props: {
    modelValue: {},
    value: {},
    indeterminate: { type: Boolean },
    id: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = j(), { isChecked: o, inputRef: a, updateValue: c, uniqueId: l } = De(t, s), u = x(() => t.indeterminate && !o.value);
    return (i, d) => (p(), b("label", ft, [
      g("input", O({
        ref_key: "inputRef",
        ref: a,
        type: "checkbox",
        checked: y(o),
        onChange: d[0] || (d[0] = //@ts-ignore
        (...f) => y(c) && y(c)(...f))
      }, y(r), {
        id: y(l),
        class: "sr-only peer"
      }), null, 16, pt),
      g("span", {
        class: P(["w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 transition-all duration-200 ease-in-out", {
          "bg-yellow-500": u.value,
          "peer-checked:bg-blue-600": y(o)
        }])
      }, [
        g("span", {
          class: P(["absolute top-1/2 left-1 w-3 h-3 bg-white border border-gray-600 rounded-full shadow-md transform -translate-y-1/2 transition-all duration-200 ease-in-out", {
            "translate-x-0": !y(o) && !u.value,
            "translate-x-4": y(o),
            "left-1/2 -translate-x-1/2": u.value
          }])
        }, null, 2)
      ], 2)
    ]));
  }
}), mt = { class: "relative w-full" }, ht = { class: "flex items-center" }, bt = { class: "relative flex-1" }, yt = { class: "absolute inset-y-0 left-2 flex items-center pointer-events-none" }, vt = ["for"], xt = { class: "absolute inset-y-0 right-2 flex items-center pointer-events-none" }, kt = ["textContent"], ce = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DXFloatingLabel",
  props: {
    label: {},
    state: {},
    message: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = j(), o = x(() => r.id || `input-${Math.random().toString(36).substr(2, 9)}`), a = x(() => `block w-full px-2.5 pb-2.5 pt-4 text-sm bg-transparent rounded-lg border peer appearance-none focus:outline-none focus:ring-0 focus:shadow-none dark:bg-gray-900 ${{
      default: "text-gray-900 border-gray-300 focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500",
      success: "text-green-600 border-green-500 focus:border-green-600 dark:text-green-400 dark:border-green-500 dark:focus:border-green-400",
      error: "text-red-600 border-red-500 focus:border-red-600 dark:text-red-400 dark:border-red-500 dark:focus:border-red-400"
    }[t.state || "default"]}`), c = x(() => !!t.modelValue && t.modelValue.toString().trim().length > 0), l = x(() => {
      const i = "absolute text-sm duration-300 transform left-3", d = t.state === "error" ? "text-red-600 dark:text-red-400" : t.state === "success" ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400 peer-focus:text-blue-600 peer-focus:dark:text-blue-500", v = c.value ? "top-2 scale-75 -translate-y-4" : "peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2 peer-placeholder-shown:translate-y-0 " + "top-2 scale-100";
      return `${i} ${v} peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${d}`;
    }), u = x(() => t.state === "error" ? "text-red-600 dark:text-red-400" : t.state === "success" ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400");
    return (i, d) => (p(), b("div", mt, [
      g("div", ht, [
        _(i.$slots, "outer-left"),
        g("div", bt, [
          g("div", yt, [
            _(i.$slots, "inner-left")
          ]),
          _(i.$slots, "control", {
            id: o.value,
            class: P(["peer w-full px-3", a.value]),
            value: i.modelValue,
            onInput: d[0] || (d[0] = (f) => s("update:modelValue", f.target.value))
          }),
          g("label", {
            for: o.value,
            class: P(["bg-white dark:bg-gray-900", l.value])
          }, $(i.label), 11, vt),
          g("div", xt, [
            _(i.$slots, "inner-right")
          ])
        ]),
        _(i.$slots, "outer-right")
      ]),
      _(i.$slots, "bottom"),
      i.message ? (p(), b("p", {
        key: 0,
        class: P([u.value, "mt-1 text-sm"]),
        textContent: $(i.message)
      }, null, 10, kt)) : C("", !0)
    ]));
  }
}), wt = { class: "relative w-full" }, _t = { class: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" }, St = ["value"], It = {
  type: "button",
  class: "absolute inset-y-0 end-0 flex items-center pe-3"
}, Te = /* @__PURE__ */ S({
  __name: "DXSearchInput",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = n, s = j();
    return (r, o) => (p(), b("div", wt, [
      g("div", _t, [
        _(r.$slots, "left-icon")
      ]),
      g("input", O(y(s), {
        value: r.modelValue,
        onInput: o[0] || (o[0] = (a) => t("update:modelValue", a.target.value)),
        class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      }), null, 16, St),
      g("button", It, [
        _(r.$slots, "right-icon")
      ])
    ]));
  }
}), $t = ["id", "value", "onInput"], Pt = /* @__PURE__ */ S({
  __name: "DXInput",
  props: {
    label: {},
    state: {},
    message: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = n, s = j();
    return (r, o) => (p(), L(ce, {
      label: r.label,
      state: r.state,
      message: r.message,
      modelValue: r.modelValue,
      "onUpdate:modelValue": o[0] || (o[0] = (a) => t("update:modelValue", a))
    }, {
      control: z(({ id: a, class: c, value: l, onInput: u }) => [
        g("input", O(y(s), {
          id: a,
          value: l,
          onInput: u,
          placeholder: " ",
          class: c
        }), null, 16, $t)
      ]),
      _: 1
    }, 8, ["label", "state", "message", "modelValue"]));
  }
}), Ct = ["id", "value", "onInput"], Dt = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DXTextarea",
  props: {
    label: {},
    state: {},
    message: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = n, s = j();
    return (r, o) => (p(), L(ce, {
      label: r.label,
      state: r.state,
      message: r.message,
      modelValue: r.modelValue,
      "onUpdate:modelValue": o[0] || (o[0] = (a) => t("update:modelValue", a))
    }, {
      control: z(({ id: a, class: c, value: l, onInput: u }) => [
        g("textarea", O(y(s), {
          id: a,
          value: l,
          onInput: u,
          placeholder: " ",
          class: [c, "min-h-[6rem] resize-none"]
        }), null, 16, Ct)
      ]),
      _: 1
    }, 8, ["label", "state", "message", "modelValue"]));
  }
}), Vt = { class: "w-full" }, Tt = ["for"], Xt = { class: "relative flex items-center" }, jt = { class: "relative flex-1" }, At = { class: "absolute inset-y-0 left-2 flex items-center pointer-events-none" }, zt = { class: "absolute inset-y-0 right-2 flex items-center pointer-events-none" }, Xe = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DXInputWrapper",
  props: {
    label: {},
    state: {},
    message: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = j(), o = x(() => r.id || `input-${Math.random().toString(36).substr(2, 9)}`), a = x(() => `block w-full px-2.5 py-2 text-sm bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 dark:bg-gray-900 ${{
      default: "text-gray-900 border-gray-300 focus:border-blue-600 dark:text-white dark:border-gray-600 dark:focus:border-blue-500",
      success: "text-green-600 border-green-500 focus:border-green-600 dark:text-green-400 dark:border-green-500 dark:focus:border-green-400",
      error: "text-red-600 border-red-500 focus:border-red-600 dark:text-red-400 dark:border-red-500 dark:focus:border-red-400"
    }[t.state || "default"]}`), c = x(() => t.state === "error" ? "text-red-600 dark:text-red-400" : t.state === "success" ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400");
    return (l, u) => (p(), b("div", Vt, [
      g("label", {
        for: o.value,
        class: P(["block text-sm font-medium mb-1", {
          "text-red-600 dark:text-red-400": l.state === "error",
          "text-green-600 dark:text-green-400": l.state === "success",
          "text-gray-700 dark:text-gray-300": !l.state || l.state === "default"
        }])
      }, $(l.label), 11, Tt),
      g("div", Xt, [
        _(l.$slots, "outer-left"),
        g("div", jt, [
          g("div", At, [
            _(l.$slots, "inner-left")
          ]),
          _(l.$slots, "control", {
            id: o.value,
            class: P(["px-2", a.value]),
            value: l.modelValue,
            onInput: u[0] || (u[0] = (i) => s("update:modelValue", i.target.value))
          }),
          g("div", zt, [
            _(l.$slots, "inner-right")
          ])
        ]),
        _(l.$slots, "outer-right")
      ]),
      _(l.$slots, "bottom"),
      l.message ? (p(), b("p", {
        key: 0,
        class: P([c.value, "mt-1 text-sm"])
      }, $(l.message), 3)) : C("", !0)
    ]));
  }
}), Lt = ["id"], Ot = ["onClick"], Et = ["value", "onInput"], Ft = /* @__PURE__ */ S({
  inheritAttrs: !1,
  __name: "DXTagInput",
  props: {
    label: {},
    state: {},
    message: {},
    modelValue: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = j(), o = I(""), a = x(
      () => t.modelValue.split(",").map((i) => i.trim()).filter((i) => i.length > 0)
    );
    function c() {
      const i = o.value.trim();
      if (!i) return;
      const d = i.split(",").map((f) => f.trim()).filter((f) => f.length && !a.value.includes(f));
      if (d.length) {
        const f = [...a.value, ...d].join(",");
        s("update:modelValue", f);
      }
      o.value = "";
    }
    function l(i) {
      const d = [...a.value];
      d.splice(i, 1), s("update:modelValue", d.join(","));
    }
    function u(i) {
      (i.key === "Tab" || i.key === ",") && (i.preventDefault(), c());
    }
    return (i, d) => (p(), L(Xe, {
      label: i.label,
      state: i.state,
      message: i.message,
      modelValue: o.value,
      "onUpdate:modelValue": d[0] || (d[0] = (f) => o.value = f)
    }, {
      control: z(({ id: f, class: h, value: v, onInput: k }) => [
        g("div", {
          id: f,
          class: P([h, "flex flex-wrap gap-1 items-center px-2 py-2 min-h-[2.75rem]"])
        }, [
          (p(!0), b(W, null, H(a.value, (m, A) => (p(), b("span", {
            key: m + A,
            class: "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1"
          }, [
            Y($(m) + " ", 1),
            g("button", {
              type: "button",
              onClick: (E) => l(A),
              class: "text-blue-700 hover:text-red-500 font-bold cursor-pointer"
            }, " × ", 8, Ot)
          ]))), 128)),
          g("input", O(y(r), {
            value: v,
            onInput: k,
            onKeydown: u,
            onBlur: c,
            placeholder: " ",
            class: "bg-transparent outline-none border-none flex-1 text-sm min-w-[4rem]"
          }), null, 16, Et)
        ], 10, Lt)
      ]),
      _: 1
    }, 8, ["label", "state", "message", "modelValue"]));
  }
});
function Mt(e, n = "id") {
  const t = I(/* @__PURE__ */ new Set()), s = (u) => {
    const i = u[n];
    t.value.has(i) ? t.value.delete(i) : t.value.add(i);
  }, r = () => {
    t.value.size === e.length ? t.value.clear() : t.value = new Set(e.map((u) => u[n]));
  }, o = () => {
    t.value.clear();
  }, a = (u) => t.value.has(u[n]), c = x(() => t.value.size === e.length && e.length > 0), l = x(() => t.value.size > 0 && t.value.size < e.length);
  return {
    selectedItems: t,
    toggleSelection: s,
    selectAll: r,
    clearSelection: o,
    isSelected: a,
    isAllSelected: c,
    isIndeterminate: l
  };
}
const Rt = { class: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" }, Bt = {
  scope: "col",
  class: "flex items-center gap-3 px-2 py-3"
}, Nt = { key: 0 }, je = /* @__PURE__ */ S({
  __name: "DXTableHead",
  props: {
    columns: {},
    selectable: { type: Boolean },
    orderable: { type: Boolean },
    isAllSelected: { type: Boolean }
  },
  emits: ["toggle-select-all"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = x({
      get: () => t.isAllSelected,
      set: (o) => s("toggle-select-all", o)
    });
    return (o, a) => (p(), b("thead", Rt, [
      g("tr", null, [
        g("th", Bt, [
          o.orderable ? (p(), b("span", Nt, "☰")) : C("", !0),
          o.selectable ? (p(), L(y(Ve), {
            key: 1,
            type: "checkbox",
            modelValue: r.value,
            "onUpdate:modelValue": a[0] || (a[0] = (c) => r.value = c)
          }, null, 8, ["modelValue"])) : C("", !0)
        ]),
        (p(!0), b(W, null, H(o.columns, (c) => (p(), b("th", {
          scope: "col",
          key: c.name,
          class: P(["px-6 py-3", c.extraClass || ""])
        }, [
          _(o.$slots, "header", { column: c }, () => [
            Y($(c.label), 1)
          ])
        ], 2))), 128))
      ])
    ]));
  }
}), Ut = { class: "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" }, Ht = { class: "flex gap-3 items-center px-2 py-4" }, qt = {
  key: 0,
  class: "drag-handle cursor-grab"
}, Ae = /* @__PURE__ */ S({
  __name: "DXTableRow",
  props: {
    row: {},
    columns: {},
    selectable: { type: Boolean },
    isSelected: { type: Boolean },
    orderable: { type: Boolean }
  },
  emits: ["toggle:select"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = x({
      get: () => t.isSelected,
      set: (o) => s("toggle:select", o)
    });
    return (o, a) => {
      const c = Ye("DXCheckbox");
      return p(), b("tr", Ut, [
        g("td", Ht, [
          o.orderable ? (p(), b("span", qt, "☰")) : C("", !0),
          o.selectable ? (p(), L(c, {
            key: 1,
            type: "checkbox",
            modelValue: r.value,
            "onUpdate:modelValue": a[0] || (a[0] = (l) => r.value = l)
          }, null, 8, ["modelValue"])) : C("", !0)
        ]),
        (p(!0), b(W, null, H(o.columns, (l) => (p(), b("td", {
          key: l.name,
          class: "px-6 py-4"
        }, [
          _(o.$slots, "cell-" + l, {
            row: o.row,
            value: o.row[l.name],
            column: l
          }, () => [
            Y($(o.row[l.name]), 1)
          ])
        ]))), 128))
      ]);
    };
  }
}), Qt = { class: "relative overflow-x-auto shadow-md sm:rounded-lg" }, Jt = { class: "w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" }, ze = /* @__PURE__ */ S({
  __name: "DXTable",
  props: {
    rows: {},
    columns: {},
    selectable: { type: Boolean },
    orderable: { type: Boolean },
    selectionKey: {},
    selectedRows: {}
  },
  emits: ["update:selected", "update:rows"],
  setup(e, { emit: n }) {
    const t = e, s = n, { toggleSelection: r, selectAll: o, isSelected: a, isAllSelected: c, isIndeterminate: l } = Mt(
      t.rows,
      t.selectionKey
    ), u = x(() => t.columns && t.columns.length > 0 ? t.columns : t.rows.length > 0 ? Object.keys(t.rows[0]).map((d) => ({ label: d, name: d })) : []), i = () => s("update:rows", t.rows);
    return (d, f) => (p(), b("div", Qt, [
      g("table", Jt, [
        X(je, {
          columns: u.value,
          selectable: d.selectable,
          orderable: d.orderable,
          isAllSelected: y(c),
          isIndeterminate: y(l),
          onToggleSelectAll: y(o)
        }, {
          header: z(({ column: h }) => [
            _(d.$slots, "header", { column: h })
          ]),
          _: 3
        }, 8, ["columns", "selectable", "orderable", "isAllSelected", "isIndeterminate", "onToggleSelectAll"]),
        X(y(at), {
          tag: "tbody",
          list: d.rows,
          "item-key": "id",
          "ghost-class": "ghost",
          handle: ".drag-handle",
          onEnd: i
        }, {
          item: z(({ element: h }) => [
            X(Ae, {
              row: h,
              columns: u.value,
              selectable: d.selectable,
              orderable: d.orderable,
              isSelected: y(a)(h),
              "onToggle:select": y(r)
            }, Ze({ _: 2 }, [
              H(u.value, (v) => ({
                name: `cell-${v.name}`,
                fn: z((k) => [
                  _(d.$slots, "cell-" + v.name, et(tt(k)))
                ])
              }))
            ]), 1032, ["row", "columns", "selectable", "orderable", "isSelected", "onToggle:select"])
          ]),
          _: 3
        }, 8, ["list"])
      ])
    ]));
  }
});
function Gt(e, n, t = "search") {
  const s = I([]), r = I(!0), o = I(null), a = I(1), c = I(10), l = I(0), u = x(() => Math.ceil(l.value / c.value)), i = I(""), d = I({}), f = async () => {
    r.value = !0, o.value = null;
    try {
      const v = await se.get(e, {
        ...n,
        params: {
          page: a.value,
          limit: c.value,
          [t]: i.value,
          // Fixed search key
          ...d.value
          // Additional filters
        }
      });
      s.value = v.data.data, l.value = v.data.total;
    } catch (v) {
      console.error("Error fetching data:", v), o.value = "Failed to load data.";
    } finally {
      r.value = !1;
    }
  };
  return nt(f), Pe([a, c, i, d], f), {
    tableData: s,
    loading: r,
    error: o,
    fetchData: f,
    // Pagination
    currentPage: a,
    pageSize: c,
    totalItems: l,
    totalPages: u,
    // Search & Filtering
    searchQuery: i,
    filters: d,
    updateFilters: (v) => {
      d.value = { ...d.value, ...v }, a.value = 1;
    }
  };
}
const Kt = { class: "text-sm text-gray-500 font-medium" }, Le = /* @__PURE__ */ S({
  __name: "DXPaginationInfo",
  props: {
    currentPage: {},
    pageSize: {},
    totalItems: {}
  },
  setup(e) {
    const n = e, t = x(() => (n.currentPage - 1) * n.pageSize + 1), s = x(() => Math.min(n.currentPage * n.pageSize, n.totalItems));
    return (r, o) => (p(), b("div", Kt, " Showing " + $(t.value) + " - " + $(s.value) + " of " + $(n.totalItems), 1));
  }
}), Wt = { "aria-label": "Page navigation example" }, Yt = { class: "inline-flex -space-x-px text-base h-10" }, Zt = ["disabled"], en = ["onClick"], tn = {
  key: 1,
  disabled: "",
  class: "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
}, nn = ["disabled"], Oe = /* @__PURE__ */ S({
  __name: "DXPaginationControls",
  props: {
    currentPage: {},
    totalPages: {}
  },
  emits: ["update:page"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = x(() => t.currentPage === 1), o = x(() => t.currentPage === t.totalPages || t.totalPages === 0), a = x(() => {
      const l = [], { currentPage: u, totalPages: i } = t;
      if (i <= 7)
        for (let d = 1; d <= i; d++) l.push(d);
      else {
        l.push(1, 2, 3), u > 5 && l.push("...");
        const d = Math.max(4, u - 1), f = Math.min(i - 3, u + 1);
        for (let h = d; h <= f; h++)
          l.includes(h) || l.push(h);
        u < i - 4 && l.push("..."), l.push(i - 1, i);
      }
      return l;
    }), c = (l) => {
      typeof l == "number" && l >= 1 && l <= t.totalPages && s("update:page", l);
    };
    return (l, u) => (p(), b("nav", Wt, [
      g("ul", Yt, [
        g("li", null, [
          g("button", {
            onClick: u[0] || (u[0] = (i) => c(t.currentPage - 1)),
            disabled: r.value,
            class: "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          }, " Previous ", 8, Zt)
        ]),
        (p(!0), b(W, null, H(a.value, (i) => (p(), b("li", { key: i }, [
          i !== "..." ? (p(), b("button", {
            key: 0,
            onClick: (d) => c(i),
            class: P([
              "flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 dark:border-gray-700",
              t.currentPage === i ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white" : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            ])
          }, $(i), 11, en)) : (p(), b("button", tn, " ... "))
        ]))), 128)),
        g("li", null, [
          g("button", {
            onClick: u[1] || (u[1] = (i) => c(t.currentPage + 1)),
            disabled: o.value,
            class: "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          }, " Next ", 8, nn)
        ])
      ])
    ]));
  }
}), rn = ["value"], Ee = /* @__PURE__ */ S({
  __name: "DXPaginationSize",
  props: {
    pageSize: {}
  },
  emits: ["update:pageSize"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = (o) => {
      const a = o.target;
      s("update:pageSize", parseInt(a.value));
    };
    return (o, a) => (p(), b("div", null, [
      g("select", {
        onChange: r,
        class: "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
        value: t.pageSize
      }, a[0] || (a[0] = [
        g("option", { value: 5 }, "5", -1),
        g("option", { value: 10 }, "10", -1),
        g("option", { value: 25 }, "25", -1)
      ]), 40, rn)
    ]));
  }
}), sn = { class: "flex flex-col md:flex-row justify-between items-center my-4 pt-4" }, Fe = /* @__PURE__ */ S({
  __name: "DXPagination",
  props: {
    currentPage: {},
    pageSize: {},
    totalItems: {}
  },
  emits: ["update:page", "update:pageSize"],
  setup(e, { emit: n }) {
    const t = e, s = n, r = x(() => Math.ceil(t.totalItems / t.pageSize)), o = (c) => {
      s("update:page", c);
    }, a = (c) => {
      s("update:pageSize", c), s("update:page", 1);
    };
    return (c, l) => (p(), b("div", sn, [
      X(Le, {
        currentPage: t.currentPage,
        pageSize: t.pageSize,
        totalItems: t.totalItems
      }, null, 8, ["currentPage", "pageSize", "totalItems"]),
      X(Oe, {
        currentPage: t.currentPage,
        totalPages: r.value,
        "onUpdate:page": o
      }, null, 8, ["currentPage", "totalPages"]),
      X(Ee, {
        pageSize: t.pageSize,
        "onUpdate:pageSize": a
      }, null, 8, ["pageSize"])
    ]));
  }
}), on = { class: "p-5" }, an = { class: "flex justify-between items-center mb-5" }, ln = { class: "w-1/3" }, cn = { class: "max-w-1/2" }, un = /* @__PURE__ */ S({
  __name: "DXListing",
  props: {
    type: { default: "table" },
    listUrl: {},
    axiosConfig: {},
    selectable: { type: Boolean },
    orderingUrl: {},
    orderable: { type: Boolean },
    columns: {}
  },
  setup(e) {
    const n = e, t = I([]), {
      tableData: s,
      searchQuery: r,
      currentPage: o,
      pageSize: a,
      totalItems: c
    } = Gt(n.listUrl, n.axiosConfig), l = (i) => {
      t.value = i;
    }, u = (i) => {
      s.value = i;
    };
    return (i, d) => (p(), b("div", on, [
      g("div", an, [
        g("div", ln, [
          X(y(Te), {
            modelValue: y(r),
            "onUpdate:modelValue": d[0] || (d[0] = (f) => rt(r) ? r.value = f : null),
            placeholder: "Search"
          }, null, 8, ["modelValue"])
        ]),
        g("div", cn, [
          _(i.$slots, "actions")
        ])
      ]),
      X(ze, O({
        rows: y(s),
        columns: i.columns,
        selectable: i.selectable,
        selectedRows: t.value,
        orderable: i.orderable
      }, i.$slots, {
        "onUpdate:selected": l,
        "onUpdate:rows": u
      }), null, 16, ["rows", "columns", "selectable", "selectedRows", "orderable"]),
      X(Fe, {
        currentPage: y(o),
        pageSize: y(a),
        totalItems: y(c),
        "onUpdate:page": d[1] || (d[1] = (f) => o.value = f),
        "onUpdate:pageSize": d[2] || (d[2] = (f) => a.value = f)
      }, null, 8, ["currentPage", "pageSize", "totalItems"])
    ]));
  }
}), Me = /^[a-z0-9]+(-[a-z0-9]+)*$/, Z = (e, n, t, s = "") => {
  const r = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (r.length < 2 || r.length > 3)
      return null;
    s = r.shift().slice(1);
  }
  if (r.length > 3 || !r.length)
    return null;
  if (r.length > 1) {
    const c = r.pop(), l = r.pop(), u = {
      // Allow provider without '@': "provider:prefix:name"
      provider: r.length > 0 ? r[0] : s,
      prefix: l,
      name: c
    };
    return n && !Q(u) ? null : u;
  }
  const o = r[0], a = o.split("-");
  if (a.length > 1) {
    const c = {
      provider: s,
      prefix: a.shift(),
      name: a.join("-")
    };
    return n && !Q(c) ? null : c;
  }
  if (t && s === "") {
    const c = {
      provider: s,
      prefix: "",
      name: o
    };
    return n && !Q(c, t) ? null : c;
  }
  return null;
}, Q = (e, n) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((n && e.prefix === "" || e.prefix) && e.name) : !1, Re = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), K = Object.freeze({
  rotate: 0,
  vFlip: !1,
  hFlip: !1
}), ee = Object.freeze({
  ...Re,
  ...K
}), oe = Object.freeze({
  ...ee,
  body: "",
  hidden: !1
});
function dn(e, n) {
  const t = {};
  !e.hFlip != !n.hFlip && (t.hFlip = !0), !e.vFlip != !n.vFlip && (t.vFlip = !0);
  const s = ((e.rotate || 0) + (n.rotate || 0)) % 4;
  return s && (t.rotate = s), t;
}
function ge(e, n) {
  const t = dn(e, n);
  for (const s in oe)
    s in K ? s in e && !(s in t) && (t[s] = K[s]) : s in n ? t[s] = n[s] : s in e && (t[s] = e[s]);
  return t;
}
function fn(e, n) {
  const t = e.icons, s = e.aliases || /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  function o(a) {
    if (t[a])
      return r[a] = [];
    if (!(a in r)) {
      r[a] = null;
      const c = s[a] && s[a].parent, l = c && o(c);
      l && (r[a] = [c].concat(l));
    }
    return r[a];
  }
  return Object.keys(t).concat(Object.keys(s)).forEach(o), r;
}
function pn(e, n, t) {
  const s = e.icons, r = e.aliases || /* @__PURE__ */ Object.create(null);
  let o = {};
  function a(c) {
    o = ge(
      s[c] || r[c],
      o
    );
  }
  return a(n), t.forEach(a), ge(e, o);
}
function Be(e, n) {
  const t = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return t;
  e.not_found instanceof Array && e.not_found.forEach((r) => {
    n(r, null), t.push(r);
  });
  const s = fn(e);
  for (const r in s) {
    const o = s[r];
    o && (n(r, pn(e, r, o)), t.push(r));
  }
  return t;
}
const gn = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Re
};
function ne(e, n) {
  for (const t in n)
    if (t in e && typeof e[t] != typeof n[t])
      return !1;
  return !0;
}
function Ne(e) {
  if (typeof e != "object" || e === null)
    return null;
  const n = e;
  if (typeof n.prefix != "string" || !e.icons || typeof e.icons != "object" || !ne(e, gn))
    return null;
  const t = n.icons;
  for (const r in t) {
    const o = t[r];
    if (
      // Name cannot be empty
      !r || // Must have body
      typeof o.body != "string" || // Check other props
      !ne(
        o,
        oe
      )
    )
      return null;
  }
  const s = n.aliases || /* @__PURE__ */ Object.create(null);
  for (const r in s) {
    const o = s[r], a = o.parent;
    if (
      // Name cannot be empty
      !r || // Parent must be set and point to existing icon
      typeof a != "string" || !t[a] && !s[a] || // Check other props
      !ne(
        o,
        oe
      )
    )
      return null;
  }
  return n;
}
const me = /* @__PURE__ */ Object.create(null);
function mn(e, n) {
  return {
    provider: e,
    prefix: n,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function M(e, n) {
  const t = me[e] || (me[e] = /* @__PURE__ */ Object.create(null));
  return t[n] || (t[n] = mn(e, n));
}
function Ue(e, n) {
  return Ne(n) ? Be(n, (t, s) => {
    s ? e.icons[t] = s : e.missing.add(t);
  }) : [];
}
function hn(e, n, t) {
  try {
    if (typeof t.body == "string")
      return e.icons[n] = { ...t }, !0;
  } catch {
  }
  return !1;
}
let U = !1;
function He(e) {
  return typeof e == "boolean" && (U = e), U;
}
function bn(e) {
  const n = typeof e == "string" ? Z(e, !0, U) : e;
  if (n) {
    const t = M(n.provider, n.prefix), s = n.name;
    return t.icons[s] || (t.missing.has(s) ? null : void 0);
  }
}
function yn(e, n) {
  const t = Z(e, !0, U);
  if (!t)
    return !1;
  const s = M(t.provider, t.prefix);
  return n ? hn(s, t.name, n) : (s.missing.add(t.name), !0);
}
function vn(e, n) {
  if (typeof e != "object")
    return !1;
  if (typeof n != "string" && (n = e.provider || ""), U && !n && !e.prefix) {
    let r = !1;
    return Ne(e) && (e.prefix = "", Be(e, (o, a) => {
      yn(o, a) && (r = !0);
    })), r;
  }
  const t = e.prefix;
  if (!Q({
    prefix: t,
    name: "a"
  }))
    return !1;
  const s = M(n, t);
  return !!Ue(s, e);
}
const qe = Object.freeze({
  width: null,
  height: null
}), Qe = Object.freeze({
  // Dimensions
  ...qe,
  // Transformations
  ...K
}), xn = /(-?[0-9.]*[0-9]+[0-9.]*)/g, kn = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function he(e, n, t) {
  if (n === 1)
    return e;
  if (t = t || 100, typeof e == "number")
    return Math.ceil(e * n * t) / t;
  if (typeof e != "string")
    return e;
  const s = e.split(xn);
  if (s === null || !s.length)
    return e;
  const r = [];
  let o = s.shift(), a = kn.test(o);
  for (; ; ) {
    if (a) {
      const c = parseFloat(o);
      isNaN(c) ? r.push(o) : r.push(Math.ceil(c * n * t) / t);
    } else
      r.push(o);
    if (o = s.shift(), o === void 0)
      return r.join("");
    a = !a;
  }
}
function wn(e, n = "defs") {
  let t = "";
  const s = e.indexOf("<" + n);
  for (; s >= 0; ) {
    const r = e.indexOf(">", s), o = e.indexOf("</" + n);
    if (r === -1 || o === -1)
      break;
    const a = e.indexOf(">", o);
    if (a === -1)
      break;
    t += e.slice(r + 1, o).trim(), e = e.slice(0, s).trim() + e.slice(a + 1);
  }
  return {
    defs: t,
    content: e
  };
}
function _n(e, n) {
  return e ? "<defs>" + e + "</defs>" + n : n;
}
function Sn(e, n, t) {
  const s = wn(e);
  return _n(s.defs, n + s.content + t);
}
const In = (e) => e === "unset" || e === "undefined" || e === "none";
function $n(e, n) {
  const t = {
    ...ee,
    ...e
  }, s = {
    ...Qe,
    ...n
  }, r = {
    left: t.left,
    top: t.top,
    width: t.width,
    height: t.height
  };
  let o = t.body;
  [t, s].forEach((k) => {
    const m = [], A = k.hFlip, E = k.vFlip;
    let T = k.rotate;
    A ? E ? T += 2 : (m.push(
      "translate(" + (r.width + r.left).toString() + " " + (0 - r.top).toString() + ")"
    ), m.push("scale(-1 1)"), r.top = r.left = 0) : E && (m.push(
      "translate(" + (0 - r.left).toString() + " " + (r.height + r.top).toString() + ")"
    ), m.push("scale(1 -1)"), r.top = r.left = 0);
    let D;
    switch (T < 0 && (T -= Math.floor(T / 4) * 4), T = T % 4, T) {
      case 1:
        D = r.height / 2 + r.top, m.unshift(
          "rotate(90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
      case 2:
        m.unshift(
          "rotate(180 " + (r.width / 2 + r.left).toString() + " " + (r.height / 2 + r.top).toString() + ")"
        );
        break;
      case 3:
        D = r.width / 2 + r.left, m.unshift(
          "rotate(-90 " + D.toString() + " " + D.toString() + ")"
        );
        break;
    }
    T % 2 === 1 && (r.left !== r.top && (D = r.left, r.left = r.top, r.top = D), r.width !== r.height && (D = r.width, r.width = r.height, r.height = D)), m.length && (o = Sn(
      o,
      '<g transform="' + m.join(" ") + '">',
      "</g>"
    ));
  });
  const a = s.width, c = s.height, l = r.width, u = r.height;
  let i, d;
  a === null ? (d = c === null ? "1em" : c === "auto" ? u : c, i = he(d, l / u)) : (i = a === "auto" ? l : a, d = c === null ? he(i, u / l) : c === "auto" ? u : c);
  const f = {}, h = (k, m) => {
    In(m) || (f[k] = m.toString());
  };
  h("width", i), h("height", d);
  const v = [r.left, r.top, l, u];
  return f.viewBox = v.join(" "), {
    attributes: f,
    viewBox: v,
    body: o
  };
}
const Pn = /\sid="(\S+)"/g, Cn = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Dn = 0;
function Vn(e, n = Cn) {
  const t = [];
  let s;
  for (; s = Pn.exec(e); )
    t.push(s[1]);
  if (!t.length)
    return e;
  const r = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return t.forEach((o) => {
    const a = typeof n == "function" ? n(o) : n + (Dn++).toString(), c = o.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + c + ')([")]|\\.[a-z])', "g"),
      "$1" + a + r + "$3"
    );
  }), e = e.replace(new RegExp(r, "g"), ""), e;
}
const ae = /* @__PURE__ */ Object.create(null);
function Tn(e, n) {
  ae[e] = n;
}
function le(e) {
  return ae[e] || ae[""];
}
function ue(e) {
  let n;
  if (typeof e.resources == "string")
    n = [e.resources];
  else if (n = e.resources, !(n instanceof Array) || !n.length)
    return null;
  return {
    // API hosts
    resources: n,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === !0,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== !1
  };
}
const de = /* @__PURE__ */ Object.create(null), B = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], J = [];
for (; B.length > 0; )
  B.length === 1 || Math.random() > 0.5 ? J.push(B.shift()) : J.push(B.pop());
de[""] = ue({
  resources: ["https://api.iconify.design"].concat(J)
});
function Xn(e, n) {
  const t = ue(n);
  return t === null ? !1 : (de[e] = t, !0);
}
function fe(e) {
  return de[e];
}
const jn = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let be = jn();
function An(e, n) {
  const t = fe(e);
  if (!t)
    return 0;
  let s;
  if (!t.maxURL)
    s = 0;
  else {
    let r = 0;
    t.resources.forEach((a) => {
      r = Math.max(r, a.length);
    });
    const o = n + ".json?icons=";
    s = t.maxURL - r - t.path.length - o.length;
  }
  return s;
}
function zn(e) {
  return e === 404;
}
const Ln = (e, n, t) => {
  const s = [], r = An(e, n), o = "icons";
  let a = {
    type: o,
    provider: e,
    prefix: n,
    icons: []
  }, c = 0;
  return t.forEach((l, u) => {
    c += l.length + 1, c >= r && u > 0 && (s.push(a), a = {
      type: o,
      provider: e,
      prefix: n,
      icons: []
    }, c = l.length), a.icons.push(l);
  }), s.push(a), s;
};
function On(e) {
  if (typeof e == "string") {
    const n = fe(e);
    if (n)
      return n.path;
  }
  return "/";
}
const En = (e, n, t) => {
  if (!be) {
    t("abort", 424);
    return;
  }
  let s = On(n.provider);
  switch (n.type) {
    case "icons": {
      const o = n.prefix, c = n.icons.join(","), l = new URLSearchParams({
        icons: c
      });
      s += o + ".json?" + l.toString();
      break;
    }
    case "custom": {
      const o = n.uri;
      s += o.slice(0, 1) === "/" ? o.slice(1) : o;
      break;
    }
    default:
      t("abort", 400);
      return;
  }
  let r = 503;
  be(e + s).then((o) => {
    const a = o.status;
    if (a !== 200) {
      setTimeout(() => {
        t(zn(a) ? "abort" : "next", a);
      });
      return;
    }
    return r = 501, o.json();
  }).then((o) => {
    if (typeof o != "object" || o === null) {
      setTimeout(() => {
        o === 404 ? t("abort", o) : t("next", r);
      });
      return;
    }
    setTimeout(() => {
      t("success", o);
    });
  }).catch(() => {
    t("next", r);
  });
}, Fn = {
  prepare: Ln,
  send: En
};
function Mn(e) {
  const n = {
    loaded: [],
    missing: [],
    pending: []
  }, t = /* @__PURE__ */ Object.create(null);
  e.sort((r, o) => r.provider !== o.provider ? r.provider.localeCompare(o.provider) : r.prefix !== o.prefix ? r.prefix.localeCompare(o.prefix) : r.name.localeCompare(o.name));
  let s = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((r) => {
    if (s.name === r.name && s.prefix === r.prefix && s.provider === r.provider)
      return;
    s = r;
    const o = r.provider, a = r.prefix, c = r.name, l = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), u = l[a] || (l[a] = M(o, a));
    let i;
    c in u.icons ? i = n.loaded : a === "" || u.missing.has(c) ? i = n.missing : i = n.pending;
    const d = {
      provider: o,
      prefix: a,
      name: c
    };
    i.push(d);
  }), n;
}
function Je(e, n) {
  e.forEach((t) => {
    const s = t.loaderCallbacks;
    s && (t.loaderCallbacks = s.filter((r) => r.id !== n));
  });
}
function Rn(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = !0, setTimeout(() => {
    e.pendingCallbacksFlag = !1;
    const n = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!n.length)
      return;
    let t = !1;
    const s = e.provider, r = e.prefix;
    n.forEach((o) => {
      const a = o.icons, c = a.pending.length;
      a.pending = a.pending.filter((l) => {
        if (l.prefix !== r)
          return !0;
        const u = l.name;
        if (e.icons[u])
          a.loaded.push({
            provider: s,
            prefix: r,
            name: u
          });
        else if (e.missing.has(u))
          a.missing.push({
            provider: s,
            prefix: r,
            name: u
          });
        else
          return t = !0, !0;
        return !1;
      }), a.pending.length !== c && (t || Je([e], o.id), o.callback(
        a.loaded.slice(0),
        a.missing.slice(0),
        a.pending.slice(0),
        o.abort
      ));
    });
  }));
}
let Bn = 0;
function Nn(e, n, t) {
  const s = Bn++, r = Je.bind(null, t, s);
  if (!n.pending.length)
    return r;
  const o = {
    id: s,
    icons: n,
    callback: e,
    abort: r
  };
  return t.forEach((a) => {
    (a.loaderCallbacks || (a.loaderCallbacks = [])).push(o);
  }), r;
}
function Un(e, n = !0, t = !1) {
  const s = [];
  return e.forEach((r) => {
    const o = typeof r == "string" ? Z(r, n, t) : r;
    o && s.push(o);
  }), s;
}
var Hn = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: !1,
  dataAfterTimeout: !1
};
function qn(e, n, t, s) {
  const r = e.resources.length, o = e.random ? Math.floor(Math.random() * r) : e.index;
  let a;
  if (e.random) {
    let w = e.resources.slice(0);
    for (a = []; w.length > 1; ) {
      const V = Math.floor(Math.random() * w.length);
      a.push(w[V]), w = w.slice(0, V).concat(w.slice(V + 1));
    }
    a = a.concat(w);
  } else
    a = e.resources.slice(o).concat(e.resources.slice(0, o));
  const c = Date.now();
  let l = "pending", u = 0, i, d = null, f = [], h = [];
  typeof s == "function" && h.push(s);
  function v() {
    d && (clearTimeout(d), d = null);
  }
  function k() {
    l === "pending" && (l = "aborted"), v(), f.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), f = [];
  }
  function m(w, V) {
    V && (h = []), typeof w == "function" && h.push(w);
  }
  function A() {
    return {
      startTime: c,
      payload: n,
      status: l,
      queriesSent: u,
      queriesPending: f.length,
      subscribe: m,
      abort: k
    };
  }
  function E() {
    l = "failed", h.forEach((w) => {
      w(void 0, i);
    });
  }
  function T() {
    f.forEach((w) => {
      w.status === "pending" && (w.status = "aborted");
    }), f = [];
  }
  function D(w, V, R) {
    const q = V !== "success";
    switch (f = f.filter((F) => F !== w), l) {
      case "pending":
        break;
      case "failed":
        if (q || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (V === "abort") {
      i = R, E();
      return;
    }
    if (q) {
      i = R, f.length || (a.length ? te() : E());
      return;
    }
    if (v(), T(), !e.random) {
      const F = e.resources.indexOf(w.resource);
      F !== -1 && F !== e.index && (e.index = F);
    }
    l = "completed", h.forEach((F) => {
      F(R);
    });
  }
  function te() {
    if (l !== "pending")
      return;
    v();
    const w = a.shift();
    if (w === void 0) {
      if (f.length) {
        d = setTimeout(() => {
          v(), l === "pending" && (T(), E());
        }, e.timeout);
        return;
      }
      E();
      return;
    }
    const V = {
      status: "pending",
      resource: w,
      callback: (R, q) => {
        D(V, R, q);
      }
    };
    f.push(V), u++, d = setTimeout(te, e.rotate), t(w, n, V.callback);
  }
  return setTimeout(te), A;
}
function Ge(e) {
  const n = {
    ...Hn,
    ...e
  };
  let t = [];
  function s() {
    t = t.filter((c) => c().status === "pending");
  }
  function r(c, l, u) {
    const i = qn(
      n,
      c,
      l,
      (d, f) => {
        s(), u && u(d, f);
      }
    );
    return t.push(i), i;
  }
  function o(c) {
    return t.find((l) => c(l)) || null;
  }
  return {
    query: r,
    find: o,
    setIndex: (c) => {
      n.index = c;
    },
    getIndex: () => n.index,
    cleanup: s
  };
}
function ye() {
}
const re = /* @__PURE__ */ Object.create(null);
function Qn(e) {
  if (!re[e]) {
    const n = fe(e);
    if (!n)
      return;
    const t = Ge(n), s = {
      config: n,
      redundancy: t
    };
    re[e] = s;
  }
  return re[e];
}
function Jn(e, n, t) {
  let s, r;
  if (typeof e == "string") {
    const o = le(e);
    if (!o)
      return t(void 0, 424), ye;
    r = o.send;
    const a = Qn(e);
    a && (s = a.redundancy);
  } else {
    const o = ue(e);
    if (o) {
      s = Ge(o);
      const a = e.resources ? e.resources[0] : "", c = le(a);
      c && (r = c.send);
    }
  }
  return !s || !r ? (t(void 0, 424), ye) : s.query(n, r, t)().abort;
}
function ve() {
}
function Gn(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = !0, setTimeout(() => {
    e.iconsLoaderFlag = !1, Rn(e);
  }));
}
function Kn(e) {
  const n = [], t = [];
  return e.forEach((s) => {
    (s.match(Me) ? n : t).push(s);
  }), {
    valid: n,
    invalid: t
  };
}
function N(e, n, t) {
  function s() {
    const r = e.pendingIcons;
    n.forEach((o) => {
      r && r.delete(o), e.icons[o] || e.missing.add(o);
    });
  }
  if (t && typeof t == "object")
    try {
      if (!Ue(e, t).length) {
        s();
        return;
      }
    } catch (r) {
      console.error(r);
    }
  s(), Gn(e);
}
function xe(e, n) {
  e instanceof Promise ? e.then((t) => {
    n(t);
  }).catch(() => {
    n(null);
  }) : n(e);
}
function Wn(e, n) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(n).sort() : e.iconsToLoad = n, e.iconsQueueFlag || (e.iconsQueueFlag = !0, setTimeout(() => {
    e.iconsQueueFlag = !1;
    const { provider: t, prefix: s } = e, r = e.iconsToLoad;
    if (delete e.iconsToLoad, !r || !r.length)
      return;
    const o = e.loadIcon;
    if (e.loadIcons && (r.length > 1 || !o)) {
      xe(
        e.loadIcons(r, s, t),
        (i) => {
          N(e, r, i);
        }
      );
      return;
    }
    if (o) {
      r.forEach((i) => {
        const d = o(i, s, t);
        xe(d, (f) => {
          const h = f ? {
            prefix: s,
            icons: {
              [i]: f
            }
          } : null;
          N(e, [i], h);
        });
      });
      return;
    }
    const { valid: a, invalid: c } = Kn(r);
    if (c.length && N(e, c, null), !a.length)
      return;
    const l = s.match(Me) ? le(t) : null;
    if (!l) {
      N(e, a, null);
      return;
    }
    l.prepare(t, s, a).forEach((i) => {
      Jn(t, i, (d) => {
        N(e, i.icons, d);
      });
    });
  }));
}
const Yn = (e, n) => {
  const t = Un(e, !0, He()), s = Mn(t);
  if (!s.pending.length) {
    let l = !0;
    return n && setTimeout(() => {
      l && n(
        s.loaded,
        s.missing,
        s.pending,
        ve
      );
    }), () => {
      l = !1;
    };
  }
  const r = /* @__PURE__ */ Object.create(null), o = [];
  let a, c;
  return s.pending.forEach((l) => {
    const { provider: u, prefix: i } = l;
    if (i === c && u === a)
      return;
    a = u, c = i, o.push(M(u, i));
    const d = r[u] || (r[u] = /* @__PURE__ */ Object.create(null));
    d[i] || (d[i] = []);
  }), s.pending.forEach((l) => {
    const { provider: u, prefix: i, name: d } = l, f = M(u, i), h = f.pendingIcons || (f.pendingIcons = /* @__PURE__ */ new Set());
    h.has(d) || (h.add(d), r[u][i].push(d));
  }), o.forEach((l) => {
    const u = r[l.provider][l.prefix];
    u.length && Wn(l, u);
  }), n ? Nn(n, s, o) : ve;
};
function Zn(e, n) {
  const t = {
    ...e
  };
  for (const s in n) {
    const r = n[s], o = typeof r;
    s in qe ? (r === null || r && (o === "string" || o === "number")) && (t[s] = r) : o === typeof t[s] && (t[s] = s === "rotate" ? r % 4 : r);
  }
  return t;
}
const er = /[\s,]+/;
function tr(e, n) {
  n.split(er).forEach((t) => {
    switch (t.trim()) {
      case "horizontal":
        e.hFlip = !0;
        break;
      case "vertical":
        e.vFlip = !0;
        break;
    }
  });
}
function nr(e, n = 0) {
  const t = e.replace(/^-?[0-9.]*/, "");
  function s(r) {
    for (; r < 0; )
      r += 4;
    return r % 4;
  }
  if (t === "") {
    const r = parseInt(e);
    return isNaN(r) ? 0 : s(r);
  } else if (t !== e) {
    let r = 0;
    switch (t) {
      case "%":
        r = 25;
        break;
      case "deg":
        r = 90;
    }
    if (r) {
      let o = parseFloat(e.slice(0, e.length - t.length));
      return isNaN(o) ? 0 : (o = o / r, o % 1 === 0 ? s(o) : 0);
    }
  }
  return n;
}
function rr(e, n) {
  let t = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const s in n)
    t += " " + s + '="' + n[s] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + t + ">" + e + "</svg>";
}
function sr(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function or(e) {
  return "data:image/svg+xml," + sr(e);
}
function ar(e) {
  return 'url("' + or(e) + '")';
}
const ke = {
  ...Qe,
  inline: !1
}, lr = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": !0,
  role: "img"
}, ir = {
  display: "inline-block"
}, ie = {
  backgroundColor: "currentColor"
}, Ke = {
  backgroundColor: "transparent"
}, we = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, _e = {
  webkitMask: ie,
  mask: ie,
  background: Ke
};
for (const e in _e) {
  const n = _e[e];
  for (const t in we)
    n[e + t] = we[t];
}
const G = {};
["horizontal", "vertical"].forEach((e) => {
  const n = e.slice(0, 1) + "Flip";
  G[e + "-flip"] = n, G[e.slice(0, 1) + "-flip"] = n, G[e + "Flip"] = n;
});
function Se(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ie = (e, n) => {
  const t = Zn(ke, n), s = { ...lr }, r = n.mode || "svg", o = {}, a = n.style, c = typeof a == "object" && !(a instanceof Array) ? a : {};
  for (let k in n) {
    const m = n[k];
    if (m !== void 0)
      switch (k) {
        // Properties to ignore
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          t[k] = m === !0 || m === "true" || m === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof m == "string" && tr(t, m);
          break;
        // Color: override style
        case "color":
          o.color = m;
          break;
        // Rotation as string
        case "rotate":
          typeof m == "string" ? t[k] = nr(m) : typeof m == "number" && (t[k] = m);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          m !== !0 && m !== "true" && delete s["aria-hidden"];
          break;
        default: {
          const A = G[k];
          A ? (m === !0 || m === "true" || m === 1) && (t[A] = !0) : ke[k] === void 0 && (s[k] = m);
        }
      }
  }
  const l = $n(e, t), u = l.attributes;
  if (t.inline && (o.verticalAlign = "-0.125em"), r === "svg") {
    s.style = {
      ...o,
      ...c
    }, Object.assign(s, u);
    let k = 0, m = n.id;
    return typeof m == "string" && (m = m.replace(/-/g, "_")), s.innerHTML = Vn(l.body, m ? () => m + "ID" + k++ : "iconifyVue"), pe("svg", s);
  }
  const { body: i, width: d, height: f } = e, h = r === "mask" || (r === "bg" ? !1 : i.indexOf("currentColor") !== -1), v = rr(i, {
    ...u,
    width: d + "",
    height: f + ""
  });
  return s.style = {
    ...o,
    "--svg": ar(v),
    width: Se(u.width),
    height: Se(u.height),
    ...ir,
    ...h ? ie : Ke,
    ...c
  }, pe("span", s);
};
He(!0);
Tn("", Fn);
if (typeof document < "u" && typeof window < "u") {
  const e = window;
  if (e.IconifyPreload !== void 0) {
    const n = e.IconifyPreload, t = "Invalid IconifyPreload syntax.";
    typeof n == "object" && n !== null && (n instanceof Array ? n : [n]).forEach((s) => {
      try {
        // Check if item is an object and not null/array
        (typeof s != "object" || s === null || s instanceof Array || // Check for 'icons' and 'prefix'
        typeof s.icons != "object" || typeof s.prefix != "string" || // Add icon set
        !vn(s)) && console.error(t);
      } catch {
        console.error(t);
      }
    });
  }
  if (e.IconifyProviders !== void 0) {
    const n = e.IconifyProviders;
    if (typeof n == "object" && n !== null)
      for (let t in n) {
        const s = "IconifyProviders[" + t + "] is invalid.";
        try {
          const r = n[t];
          if (typeof r != "object" || !r || r.resources === void 0)
            continue;
          Xn(t, r) || console.error(s);
        } catch {
          console.error(s);
        }
      }
  }
}
const cr = {
  ...ee,
  body: ""
}, $e = S({
  // Do not inherit other attributes: it is handled by render()
  inheritAttrs: !1,
  // Set initial data
  data() {
    return {
      // Current icon name
      _name: "",
      // Loading
      _loadingIcon: null,
      // Mounted status
      iconMounted: !1,
      // Callback counter to trigger re-render
      counter: 0
    };
  },
  mounted() {
    this.iconMounted = !0;
  },
  unmounted() {
    this.abortLoading();
  },
  methods: {
    abortLoading() {
      this._loadingIcon && (this._loadingIcon.abort(), this._loadingIcon = null);
    },
    // Get data for icon to render or null
    getIcon(e, n, t) {
      if (typeof e == "object" && e !== null && typeof e.body == "string")
        return this._name = "", this.abortLoading(), {
          data: e
        };
      let s;
      if (typeof e != "string" || (s = Z(e, !1, !0)) === null)
        return this.abortLoading(), null;
      let r = bn(s);
      if (!r)
        return (!this._loadingIcon || this._loadingIcon.name !== e) && (this.abortLoading(), this._name = "", r !== null && (this._loadingIcon = {
          name: e,
          abort: Yn([s], () => {
            this.counter++;
          })
        })), null;
      if (this.abortLoading(), this._name !== e && (this._name = e, n && n(e)), t) {
        r = Object.assign({}, r);
        const a = t(r.body, s.name, s.prefix, s.provider);
        typeof a == "string" && (r.body = a);
      }
      const o = ["iconify"];
      return s.prefix !== "" && o.push("iconify--" + s.prefix), s.provider !== "" && o.push("iconify--" + s.provider), { data: r, classes: o };
    }
  },
  // Render icon
  render() {
    this.counter;
    const e = this.$attrs, n = this.iconMounted || e.ssr ? this.getIcon(e.icon, e.onLoad, e.customise) : null;
    if (!n)
      return Ie(cr, e);
    let t = e;
    return n.classes && (t = {
      ...e,
      class: (typeof e.class == "string" ? e.class + " " : "") + n.classes.join(" ")
    }), Ie({
      ...ee,
      ...n.data
    }, t);
  }
}), ur = { class: "text-sm font-medium" }, dr = {
  key: 0,
  class: "font-medium me-2"
}, fr = ["innerHTML"], pr = { key: 1 }, gr = /* @__PURE__ */ S({
  __name: "DXAlert",
  props: {
    label: {},
    message: {},
    html: {},
    icon: {},
    bordered: { type: Boolean },
    accent: { type: Boolean },
    dismissible: { type: Boolean },
    severity: {}
  },
  setup(e, { expose: n }) {
    const t = e, s = I(!0), r = {
      primary: ["text-blue-800", "dark:text-blue-400", "bg-blue-50", "dark:bg-gray-800", "border-blue-300", "dark:border-blue-800"],
      secondary: ["text-gray-800", "dark:text-gray-300", "bg-gray-50", "dark:bg-gray-800", "border-gray-300", "dark:border-gray-600"],
      success: ["text-green-800", "dark:text-green-400", "bg-green-50", "dark:bg-gray-800", "border-green-300", "dark:border-green-800"],
      danger: ["text-red-800", "dark:text-red-400", "bg-red-50", "dark:bg-gray-800", "border-red-300", "dark:border-red-800"],
      warning: ["text-yellow-800", "dark:text-yellow-400", "bg-yellow-50", "dark:bg-gray-800", "border-yellow-300", "dark:border-yellow-800"],
      info: ["text-blue-800", "dark:text-blue-400", "bg-blue-50", "dark:bg-gray-800", "border-blue-300", "dark:border-blue-800"],
      light: ["text-gray-700", "dark:text-white", "bg-white", "dark:bg-gray-800", "border-gray-200", "dark:border-gray-700"],
      dark: ["text-gray-800", "dark:text-gray-300", "bg-gray-100", "dark:bg-gray-800", "border-gray-400", "dark:border-gray-700"]
    }, o = x(() => {
      const l = r[t.severity] || [], [u, i, d, f, h, v] = l;
      let k = "";
      return t.accent ? k = `border-t-4 ${h} ${v} rounded-t-none` : t.bordered && (k = `border ${h} ${v}`), [
        u,
        i,
        d,
        f,
        k
      ];
    }), a = x(() => {
      var l, u;
      return `${((l = r[t.severity]) == null ? void 0 : l[0]) || ""} ${((u = r[t.severity]) == null ? void 0 : u[1]) || ""}`;
    });
    function c() {
      s.value = !1;
    }
    return n({ dismiss: c }), st("dismiss", c), (l, u) => (p(), L(Ce, {
      "enter-active-class": "transition-opacity duration-300",
      "enter-from-class": "opacity-0",
      "leave-active-class": "transition-opacity duration-300",
      "leave-to-class": "opacity-0"
    }, {
      default: z(() => [
        s.value ? (p(), b("div", {
          key: 0,
          class: P(["flex items-center p-4 mb-4 text-sm rounded-lg", o.value]),
          role: "alert"
        }, [
          l.icon ? (p(), L(y($e), {
            key: 0,
            icon: l.icon,
            class: "shrink-0 inline w-6 h-6 me-3"
          }, null, 8, ["icon"])) : C("", !0),
          g("div", ur, [
            l.label ? (p(), b("span", dr, $(l.label), 1)) : C("", !0),
            _(l.$slots, "default", {}, () => [
              l.html ? (p(), b("span", {
                key: 0,
                innerHTML: l.html
              }, null, 8, fr)) : l.message ? (p(), b("span", pr, $(l.message), 1)) : C("", !0)
            ])
          ]),
          l.dismissible ? (p(), b("button", {
            key: 1,
            onClick: u[0] || (u[0] = (i) => s.value = !1),
            type: "button",
            class: P(["ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 hover:bg-opacity-50 inline-flex items-center justify-center h-8 w-8", [
              r[t.severity][2],
              r[t.severity][0],
              r[t.severity][3],
              "focus:ring-opacity-50"
            ]]),
            "aria-label": "Close"
          }, [
            X(y($e), {
              icon: "heroicons:x-mark",
              class: P(["w-6 h-6 cursor-pointer", a.value])
            }, null, 8, ["class"]),
            u[1] || (u[1] = g("span", { class: "sr-only" }, "Close", -1))
          ], 2)) : C("", !0)
        ], 2)) : C("", !0)
      ]),
      _: 3
    }));
  }
}), mr = {
  key: 0,
  class: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
}, hr = { class: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3" }, br = /* @__PURE__ */ S({
  __name: "DXLoader",
  props: {
    visible: { type: Boolean }
  },
  setup(e) {
    return (n, t) => (p(), L(ot, { to: "body" }, [
      X(Ce, {
        "enter-active-class": "transition-opacity duration-300",
        "enter-from-class": "opacity-0",
        "enter-to-class": "opacity-100",
        "leave-active-class": "transition-opacity duration-300",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0"
      }, {
        default: z(() => [
          n.visible ? (p(), b("div", mr, [
            g("div", hr, [
              t[1] || (t[1] = g("svg", {
                class: "w-5 h-5 animate-spin text-primary",
                fill: "none",
                viewBox: "0 0 24 24"
              }, [
                g("circle", {
                  class: "opacity-25",
                  cx: "12",
                  cy: "12",
                  r: "10",
                  stroke: "currentColor",
                  "stroke-width": "4"
                }),
                g("path", {
                  class: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                })
              ], -1)),
              g("span", null, [
                _(n.$slots, "default", {}, () => [
                  t[0] || (t[0] = Y("Loading..."))
                ])
              ])
            ])
          ])) : C("", !0)
        ]),
        _: 3
      })
    ]));
  }
});
function wr(e, n) {
  const t = x(() => {
    if (typeof e == "string")
      try {
        return JSON.parse(e);
      } catch (s) {
        throw new Error("Invalid JSON format for options: " + s);
      }
    return e;
  });
  return n && n(t.value), {
    parsedOptions: t
  };
}
function _r(e) {
  const n = I({ ...e.initialValues }), t = I(!1), s = I(!1), r = I(""), o = I({}), a = I(!1);
  return {
    form: n,
    loading: t,
    success: s,
    serverError: r,
    errors: o,
    isEditMode: a,
    fetchInitialData: async (u) => {
      try {
        const i = await se.get(u), d = e.transformResponse ? e.transformResponse(i.data) : i.data;
        n.value = { ...n.value, ...d }, a.value = !0;
      } catch {
        r.value = "Failed to load data";
      }
    },
    handleSubmit: async (u, i = "post") => {
      var d, f;
      o.value = {}, r.value = "", s.value = !1;
      try {
        if (e.validationSchema) {
          const h = await e.validationSchema.validate(n.value, {
            abortEarly: !1
          });
          n.value = { ...h };
        }
        t.value = !0, await se[i](u, n.value), s.value = !0;
      } catch (h) {
        if (h.name === "ValidationError")
          for (const v of h.inner)
            o.value[v.path] = v.message;
        else
          r.value = ((f = (d = h.response) == null ? void 0 : d.data) == null ? void 0 : f.detail) || "Something went wrong";
      } finally {
        t.value = !1;
      }
    }
  };
}
const yr = {
  DXButton: it,
  DXCheckbox: Ve,
  DXRadio: dt,
  DXToggle: gt,
  DXFloatingLabel: ce,
  DXInputWrapper: Xe,
  DXInput: Pt,
  DXTextarea: Dt,
  DXTagInput: Ft,
  DXSearchInput: Te,
  DXTable: ze,
  DXLoader: br,
  DXTableHead: je,
  DXTableRow: Ae,
  DXListing: un,
  DXPagination: Fe,
  DXPaginationInfo: Le,
  DXPaginationControls: Oe,
  DXPaginationSize: Ee,
  DXAlert: gr
}, Sr = {
  install: (e) => {
    for (const [n, t] of Object.entries(yr))
      e.component(n, t);
  }
};
export {
  gr as DXAlert,
  it as DXButton,
  Ve as DXCheckbox,
  ce as DXFloatingLabel,
  Pt as DXInput,
  Xe as DXInputWrapper,
  un as DXListing,
  br as DXLoader,
  Fe as DXPagination,
  Oe as DXPaginationControls,
  Le as DXPaginationInfo,
  Ee as DXPaginationSize,
  dt as DXRadio,
  Te as DXSearchInput,
  ze as DXTable,
  je as DXTableHead,
  Ae as DXTableRow,
  Ft as DXTagInput,
  Dt as DXTextarea,
  gt as DXToggle,
  Sr as DynamixPlugin,
  _r as useForm,
  wr as useParsedOptions
};
