/**
 * <sg-holidays> — Singapore gazetted public holidays (MOM), 2026 & 2027. Zero dependencies.
 * Dates per Ministry of Manpower. Built & maintained by SGBP (https://sgbp.tech). MIT.
 */
const SG_HOLIDAYS = {
  2026: [
    { d: "1 Jan",  day: "Thu", name: "New Year's Day" },
    { d: "17 Feb", day: "Tue", name: "Chinese New Year" },
    { d: "18 Feb", day: "Wed", name: "Chinese New Year (2nd day)" },
    { d: "21 Mar", day: "Sat", name: "Hari Raya Puasa" },
    { d: "3 Apr",  day: "Fri", name: "Good Friday" },
    { d: "1 May",  day: "Fri", name: "Labour Day" },
    { d: "27 May", day: "Wed", name: "Hari Raya Haji" },
    { d: "31 May", day: "Sun", name: "Vesak Day", obs: "Mon 1 Jun" },
    { d: "9 Aug",  day: "Sun", name: "National Day", obs: "Mon 10 Aug" },
    { d: "8 Nov",  day: "Sun", name: "Deepavali", obs: "Mon 9 Nov" },
    { d: "25 Dec", day: "Fri", name: "Christmas Day" },
  ],
  2027: [
    { d: "1 Jan",  day: "Fri", name: "New Year's Day" },
    { d: "6 Feb",  day: "Sat", name: "Chinese New Year" },
    { d: "7 Feb",  day: "Sun", name: "Chinese New Year (2nd day)", obs: "Mon 8 Feb" },
    { d: "10 Mar", day: "Wed", name: "Hari Raya Puasa" },
    { d: "26 Mar", day: "Fri", name: "Good Friday" },
    { d: "1 May",  day: "Sat", name: "Labour Day" },
    { d: "17 May", day: "Mon", name: "Hari Raya Haji" },
    { d: "20 May", day: "Thu", name: "Vesak Day" },
    { d: "9 Aug",  day: "Mon", name: "National Day" },
    { d: "28 Oct", day: "Thu", name: "Deepavali" },
    { d: "25 Dec", day: "Sat", name: "Christmas Day" },
  ],
};
class SgHolidays extends HTMLElement {
  constructor() { super(); this.attachShadow({ mode: "open" }); this.year = 2026; }
  connectedCallback() { this.render(); }
  _plain(y) { return SG_HOLIDAYS[y].map((h) => `${h.d} ${y} (${h.day}) — ${h.name}${h.obs ? " [observed " + h.obs + "]" : ""}`).join("\n"); }
  _list() {
    const out = this.shadowRoot.querySelector("#out");
    out.innerHTML = SG_HOLIDAYS[this.year].map((h) => `
      <div class="r">
        <div class="dt"><span class="day">${h.day}</span><span class="d">${h.d}</span></div>
        <div class="nm">${h.name}${h.obs ? `<span class="obs">Sunday — observed ${h.obs}</span>` : ""}</div>
      </div>`).join("");
    this.shadowRoot.querySelectorAll(".yb").forEach((b) => b.classList.toggle("on", +b.dataset.y === this.year));
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        *,*::before,*::after{box-sizing:border-box}
        :host{display:block;width:100%;max-width:520px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
        .card{border:1px solid #e2e2e2;border-radius:12px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.06);padding:16px}
        .top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap}
        .years{display:inline-flex;border:1px solid #ddd;border-radius:9px;overflow:hidden}
        .yb{font:inherit;font-size:13px;font-weight:700;padding:7px 16px;border:0;background:#fff;color:#555;cursor:pointer}
        .yb + .yb{border-left:1px solid #ddd}
        .yb.on{background:#EB0028;color:#fff}
        .copy{font:inherit;font-size:12px;font-weight:700;color:#555;background:#fff;border:1px solid #ccc;border-radius:8px;padding:7px 12px;cursor:pointer}
        #out{display:flex;flex-direction:column}
        .r{display:flex;gap:14px;align-items:center;padding:9px 4px;border-bottom:1px solid #f0f0f0}
        .r:last-child{border-bottom:0}
        .dt{display:flex;flex-direction:column;align-items:center;width:58px;flex:0 0 auto}
        .day{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#EB0028}
        .d{font-size:15px;font-weight:700;color:#111}
        .nm{font-size:14px;color:#222}
        .obs{display:block;font-size:11px;color:#888;margin-top:1px}
      </style>
      <div class="card">
        <div class="top">
          <div class="years">
            <button class="yb" data-y="2026">2026</button>
            <button class="yb" data-y="2027">2027</button>
          </div>
          <button class="copy" id="copy">Copy list</button>
        </div>
        <div id="out"></div>
      </div>`;
    const $ = (s) => this.shadowRoot.querySelector(s);
    this.shadowRoot.querySelectorAll(".yb").forEach((b) => b.addEventListener("click", () => { this.year = +b.dataset.y; this._list(); }));
    $("#copy").addEventListener("click", () => { navigator.clipboard && navigator.clipboard.writeText(this._plain(this.year)); const b = $("#copy"), o = b.textContent; b.textContent = "Copied"; setTimeout(() => b.textContent = o, 900); });
    this._list();
  }
}
if (!customElements.get("sg-holidays")) customElements.define("sg-holidays", SgHolidays);
